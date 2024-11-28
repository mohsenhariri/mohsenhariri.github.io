import Link from "next/link";
import { getAllPosts } from "@/lib/post";

export default async function Blog() {
  const allPosts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="max-w-3xl mr-auto">
        {/* <div className="max-w-3xl mr-auto ml-4"> */}

        <ul className="space-y-8">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <article className="pb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted mb-4"> {post.date} </p>
                <p className="text-base text-text-secondary">
                  {post.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
