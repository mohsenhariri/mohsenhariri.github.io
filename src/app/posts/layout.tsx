import Container from "@/components/container";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      //{" "}
      <article className="prose dark:prose-invert text-slate-600 dark:text-slate-300 font-light font-sans">
        {children}
      </article>
    </Container>
  );
}
