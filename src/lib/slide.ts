import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface SlideData {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const slidesDirectory = path.join(process.cwd(), "_slides");

function isValidDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export async function getSlideBySlug(slug: string): Promise<SlideData | null> {
  const realSlug = slug.replace(/\.md$/, "");
  const slidePath = path.join(slidesDirectory, `${realSlug}.md`);

  try {
    const fileContents = await fs.readFile(slidePath, "utf8");
    const { data, content } = matter(fileContents);
    const date = isValidDate(data.date) ? data.date : new Date().toISOString();

    return {
      slug: realSlug,
      title: data.title || "Untitled",
      date,
      description: data.description || "",
      content,
    } as SlideData;
  } catch (error) {
    console.error(`Failed to load slide: ${slug}`, error);
    return null;
  }
}

async function getSlideSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(slidesDirectory);
    return files.filter((file) => file.endsWith(".md"));
  } catch (error) {
    console.error("Failed to read slides directory", error);
    return [];
  }
}

export async function getAllSlides(): Promise<SlideData[]> {
  try {
    const slugs = await getSlideSlugs();
    const slides = await Promise.all(slugs.map((slug) => getSlideBySlug(slug)));

    return slides
      .filter((slide): slide is SlideData => slide !== null)
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Failed to get all slides", error);
    return [];
  }
}
