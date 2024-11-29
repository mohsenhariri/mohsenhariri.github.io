import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_TITLE } from "@/lib/constants";
import { TocItem } from "@/types/post";

import { getAllPosts, getPostBySlug } from "@/lib/post";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

interface ToCProps {
  tocGen: TocItem[];
}

function ToC({ tocGen }: ToCProps) {
  if (!tocGen || tocGen.length === 0) return null;

  return (
    <nav className="toc mb-8 p-4 bg-bg-light dark:bg-bg rounded-lg border border-grey dark:border-dimGrey">
      <h2 className="text-xl font-bold mb-4">Contents</h2>
      <ul className="space-y-2">
        {tocGen.map((item) => (
          <li
            key={item.id}
            className={`hover:text-accent dark:hover:text-accent-light ${
              item.depth > 1 ? "ml-4" : ""
            }`}
          >
            <a href={`#${item.id}`} className="transition-colors">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function Post(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const { tocGen, contentHtml } = post;

  return (
    <div>
      <ToC tocGen={tocGen} />
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SITE_TITLE} 🦖`;

  return {
    title,
    openGraph: {
      title,
      // images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
