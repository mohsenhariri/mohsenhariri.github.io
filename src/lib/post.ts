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

  // // First try, parse md, convert to html
  // const processedContent = await unified()
  // .use(remarkParse) // Parse markdown
  // .use(remarkHtml) // Convert markdown to HTML
  // .process(content);

  // // Second try, like the first one, but with gfm
  // const processedContent = await unified()
  // .use(remarkParse) // Parse markdown
  // .use(remarkGfm) // https://github.com/remarkjs/remark-gfm
  // .use(remarkHtml) // Convert markdown to HTML
  // .process(content);

  // // Third try, Add math support
  // // KaTeX seems to be the best option for math support in markdown
  // // so I needed to use rehype, now literally 'unified' is needed
  // const processedContent = await unified()
  //   .use(remarkParse) // Parse markdown
  //   .use(remarkGfm) // Support for GFM
  //   .use(remarkMath) // Support for math
  //   .use(remarkRehype) // plugin that turns markdown into HTML to support rehype

  //   .use(rehypeDocument, {
  //     // Get the latest one from: <https://katex.org/docs/browser>.
  //     css: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
  //   }) // added this to support KaTeX, custom CSS
  //   .use(rehypeKatex) // https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
  //   .use(rehypeStringify)
  //   // .use(remarkHtml) // rehypeStringify is the same as remarkHtml but for rehype
  //   .process(content);

  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support for GFM
    .use(remarkMath) // Support for math
    // .use(remarkRehype) // plugin that turns markdown into HTML to support rehype
    .use(remarkRehype, { allowDangerousHtml: true }) // Allow HTML inside Markdown
    .use(rehypeRaw) // Process raw HTML https://github.com/rehypejs/rehype-raw
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

  return { slug: realSlug, contentHtml, ...data } as Post;
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
