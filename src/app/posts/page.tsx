import Link from "next/link";
import { getAllPosts } from "@/lib/post";

export default async function Blog() {
  const allPosts = await getAllPosts();

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <section className="prose prose-lg bg-bg-light dark:bg-bg text-text dark:text-text-light border border-grey dark:border-dimGrey rounded-lg p-8 shadow-sm max-w-3xl mx-auto">
          <h1>Blog Posts</h1>

          <ul className="space-y-6 list-none p-0">
            {allPosts.map((post) => (
              <li key={post.slug}>
                <article>
                  <h2 className="mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-accent dark:hover:text-accent-light transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-sm text-text-light block mb-2">
                    {post.date}
                  </time>
                  <p className="text-text-secondary dark:text-text-light">
                    {post.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
