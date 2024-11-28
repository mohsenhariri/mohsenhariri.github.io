export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <article className="prose prose-lg bg-bg-light dark:bg-bg text-text dark:text-text-light border border-grey dark:border-dimGrey rounded-lg p-6 shadow-sm dark:shadow-lg transition-colors max-w-5xl w-full">
        {children}
      </article>
    </div>
  );
}
