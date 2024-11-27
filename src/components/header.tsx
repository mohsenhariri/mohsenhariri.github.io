import Link from "next/link";

export default function Header() {
  const linkClasses =
    "text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors";

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-8">
        <div className="text-xl font-bold">
          <Link href="/" className="text-gray-800 dark:text-gray-200">
            Kashkul of Desiderata
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
            <Link href="/about" className={linkClasses}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
