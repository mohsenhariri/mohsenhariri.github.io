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
    <div className="md:w-1/4 w-full">
      <nav className="toc p-4 bg-bg-light dark:bg-bg rounded-lg border border-grey dark:border-dimGrey md:sticky md:top-20">
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
    </div>
  );
}


// Post Component
export default async function Post(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const { tocGen, contentHtml } = post;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg border-grey">
        <div className="flex flex-col md:flex-row">
          <ToC tocGen={tocGen} />

          <div className="md:w-3/4 w-full">
            <article
              className="prose prose-lg bg-bg-light dark:bg-bg text-text dark:text-text-light border border-grey dark:border-dimGrey rounded-lg p-6 shadow-sm dark:shadow-lg transition-colors w-full"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


// Metadata and Static Params functions remain the same...
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
