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
  activeId?: string;
}

const TableOfContents = ({ tocGen, activeId }: ToCProps) => {
  if (!tocGen?.length) return null;

  return (
    <aside className="md:w-1/4 w-full" aria-label="Table of contents">
      <nav
        className="p-4 bg-bg-light dark:bg-bg rounded-lg border border-grey 
        dark:border-dimGrey md:sticky md:top-20"
        aria-label="Table of contents navigation"
      >
        <h2 className="text-xl font-bold mb-4">Contents</h2>
        <ul className="space-y-2">
          {tocGen.map((item) => (
            <li
              key={item.id}
              className={`
                ${item.depth > 1 ? "ml-4" : ""}
                ${activeId === item.id ? "text-accent dark:text-accent-light" : ""}
              `}
            >
              <a
                href={`#${item.id}`}
                className="hover:text-accent dark:hover:text-accent-light transition-colors"
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const AuthorList = ({
  authors,
}: {
  authors: Array<{ name?: string; email?: string }>;
}) => {
  if (!authors?.length) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-text-light">
      <span>By</span>
      {authors.map((author, index) => (
        <span key={index} className="flex items-center">
          {author.name || "Anonymous"}
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="ml-1 hover:text-accent dark:hover:text-accent-light transition-colors"
              aria-label={`Email ${author.name || "author"}`}
            >
              ✉️
            </a>
          )}
          {index < authors.length - 1 && <span className="mx-1">,</span>}
        </span>
      ))}
    </div>
  );
};

export default async function PostPage(props: Params) {
  try {
    const params = await props.params;

    console.log("params:", params);

    const post = await getPostBySlug(params.slug);

    if (!post) return notFound();

    const { tocGen, contentHtml, title, date, authors } = post;

    console.log(authors);

    // authors is a list of objects with name and email
    // [ { name: 'Anonymous' }, { email: 'name@mail.com' } ]

    return (
      <article className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <time dateTime={date} className="text-text-light">
                {new Date(date).toLocaleDateString()}
              </time>
              <AuthorList authors={authors} />
            </div>
          </header>

          <div className="flex flex-col md:flex-row gap-8">
            <TableOfContents tocGen={tocGen} />

            <article
              className="md:w-3/4 w-full prose prose-lg bg-bg-light dark:bg-bg 
              text-text dark:text-text-light rounded-lg p-6 shadow-sm"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return notFound();
  }
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
