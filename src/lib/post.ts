import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkGfm from 'remark-gfm'
import { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "_posts");

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const postPath = path.join(postsDirectory, `${realSlug}.md`);

  const fileContents = await fs.readFile(postPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse) // 1. Parse markdown  
    .use(remarkGfm) // 3. https://github.com/remarkjs/remark-gfm
    .use(remarkHtml) // 2. Convert markdown to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return { slug: realSlug, contentHtml, ...data } as Post;
}

export async function getPostSlugs() {
  return fs.readdir(postsDirectory);
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug))
  );

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
