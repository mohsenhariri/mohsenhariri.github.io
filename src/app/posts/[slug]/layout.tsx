export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      {children}
    </section>
  );
}

// import Link from "next/link";

// export default function BlogLayout({
//   children, // will be a page or nested layout
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <section>
//       <header>
//         <h1>My Blog</h1>
//       </header>
//       <nav>
//         <ul>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/posts">Posts</Link>
//           </li>
//           <li>
//             <Link href="/about">About</Link>
//           </li>
//         </ul>
//       </nav>
//       <main>{children}</main>
//       <footer>
//         <p>&copy; {new Date().getFullYear()} My Blog</p>
//       </footer>
//     </section>
//   );
// }
