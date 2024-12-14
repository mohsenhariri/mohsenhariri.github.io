import { getSlideBySlug } from "@/lib/slide";
import RevealPresentation from "@/components/slide";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_TITLE } from "@/lib/constants";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function SlidePage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const slide = await getSlideBySlug(slug);

    if (!slide) {
      return notFound();
    }

    return (
      <main className="w-full h-[calc(100vh-8rem)]">
        <RevealPresentation content={slide.content} />
      </main>
    );
  } catch (error) {
    console.error("Failed to load slide:", error);
    return notFound();
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const slide = await getSlideBySlug(slug);

    if (!slide) {
      return {
        title: "Slide Not Found",
        description: "",
      };
    }

    const title = `${slide.title} | ${SITE_TITLE} 🦖`;

    return {
      title,
      description: slide.description,
      openGraph: {
        title,
        description: slide.description,
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata for slide:", error);
    return {
      title: "Slide Not Found",
      description: "",
    };
  }
}
