import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostById(id: string) {
  const postPath = path.join(postsDirectory, "first.md");

  const { data, content } = matter(
    await fs.promises.readFile(postPath, "utf8")
  );

  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkHtml) // Convert markdown to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    title: data.title as string,
    date: data.date as Date,
    contentHtml,
  };
}
