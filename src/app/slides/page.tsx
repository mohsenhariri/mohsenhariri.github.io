import Link from "next/link";
import { getAllSlides } from "@/lib/slide";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Presentations",
  description: "List of all presentations",
};

export default async function Slides() {
  try {
    const allSlides = await getAllSlides();

    if (!allSlides.length) {
      return (
        <main className="min-h-screen py-8">
          <div className="container mx-auto px-4">
            <section className="prose prose-lg bg-bg-light dark:bg-bg text-text dark:text-text-light border border-grey dark:border-dimGrey rounded-lg p-8 shadow-sm max-w-3xl mx-auto">
              <h1>Presentations</h1>
              <p>No presentations found.</p>
            </section>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <section className="prose prose-lg bg-bg-light dark:bg-bg text-text dark:text-text-light border border-grey dark:border-dimGrey rounded-lg p-8 shadow-sm max-w-3xl mx-auto">
            <h1>Presentations</h1>
            <ul className="space-y-6 list-none p-0">
              {allSlides.map((slide) => (
                <li key={slide.slug}>
                  <article>
                    <h2 className="mb-2">
                      <Link
                        href={`/slides/${slide.slug}`}
                        className="hover:text-accent dark:hover:text-accent-light transition-colors"
                      >
                        {slide.title}
                      </Link>
                    </h2>
                    <time
                      dateTime={slide.date}
                      className="text-sm text-text-light block mb-2"
                    >
                      {new Date(slide.date).toLocaleDateString()}
                    </time>
                    <p className="text-text-secondary dark:text-text-light">
                      {slide.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to load presentations:", error);
    return notFound();
  }
}
