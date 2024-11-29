import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
// import remarkHtml from "remark-html"; // either this or remark-rehype
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw"; // to support raw HTML, like <iframe>, <img>, etc.
import { visit } from "unist-util-visit"; // to manipulate the AST, like changing the src of images
import rehypeStringify from "rehype-stringify";

import { Post } from "@/types/post";
import { Root } from "hast";
import { toString } from "hast-util-to-string";

const postsDirectory = path.join(process.cwd(), "_posts");

function rehypeImageSrcReplace() {
  // This is a custom plugin to replace the src of images
  // from _assets/ to /posts/
  // and from png/jpg to webp
  // num run optimize before this
  return function transformer(tree: Root) {
    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties && node.properties.src) {
        let src = node.properties.src;
        if (typeof src === "string") {
          if (src.startsWith("_assets/")) {
            src = src.replace("_assets/", "/posts/");
          }
          src = src.replace(/\.(png|jpe?g)$/i, ".webp");
          node.properties.src = src;
        }
      }
    });
  };
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const postPath = path.join(postsDirectory, `${realSlug}.md`);

  const fileContents = await fs.readFile(postPath, "utf8");

  const { data, content } = matter(fileContents);
  const tocGen: { id: string; text: string; depth: number }[] = []; // Table of Contents array

  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support for GFM
    .use(remarkMath) // Support for math
    // .use(remarkRehype) // plugin that turns markdown into HTML to support rehype
    .use(remarkRehype, { allowDangerousHtml: true }) // Allow HTML inside Markdown
    .use(rehypeRaw) // Process raw HTML https://github.com/rehypejs/rehype-raw

    .use(() => (tree: Root) => {
      visit(tree, "element", (node) => {
        if (
          ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName) &&
          node.properties
        ) {
          const depth = parseInt(node.tagName[1], 10); // h1 => 1, h2 => 2, etc.
          const text = toString(node); // Get the inner text of the heading
          const id = text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          node.properties.id = id;
          tocGen.push({ id, text, depth });
        }
      });
    })

    .use(rehypeDocument, {
      // Get the latest one from: <https://katex.org/docs/browser>.
      css: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
    }) // added this to support KaTeX, custom CSS
    .use(rehypeKatex) // https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
    }) // https://rehype-pretty.pages.dev/
    .use(rehypeImageSrcReplace) // Custom plugin to replace image src
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // console.log("toc", typeof toc, toc);

  return { slug: realSlug, tocGen, contentHtml, ...data } as Post;
}

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter((file) => file.endsWith(".md"));
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug)),
  );

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
