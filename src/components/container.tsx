import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Container({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
