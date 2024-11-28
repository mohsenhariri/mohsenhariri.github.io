import Link from "next/link";

export default function Footer() {
  const linkClasses =
    "hover:underline text-text dark:text-text-light transition-colors";

  return (
    <footer className="bg-bg-light dark:bg-bg text-text dark:text-text-light border-t border-grey dark:border-dimGrey py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <nav className="flex space-x-6 text-sm md:text-base">
          <Link href="/" className={linkClasses}>
            Home
          </Link>
          <Link href="/posts" className={linkClasses}>
            Posts
          </Link>
          <Link href="/cv" className={linkClasses}>
            Contact
          </Link>
        </nav>
        <p className="mt-4 md:mt-0 text-sm text-center md:text-left">
          ↄ {new Date().getFullYear()} My Blog
        </p>
      </div>
    </footer>
  );
}
