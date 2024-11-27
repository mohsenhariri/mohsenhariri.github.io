import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="bg-white dark:bg-black">{children}</main>
      <Footer />
    </div>
  );
}
