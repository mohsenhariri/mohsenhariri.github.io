import Link from "next/link";

export default function Header() {
  const linkClasses =
    "text-text dark:text-text-light hover:text-accent dark:hover:text-accent-light transition-colors";

  return (
    <header className="bg-bg-light dark:bg-bg shadow-sm dark:shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-8">
        <div className="text-xl font-bold">
          <Link href="/" className="text-text dark:text-text-light">
            Desiderata Kashkul
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={linkClasses}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/posts" className={linkClasses}>
              Posts
            </Link>
          </li>
          <li>
            <Link href="/cv" className={linkClasses}>
              CV/Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
