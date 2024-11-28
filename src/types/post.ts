type Author = {
  name: string;
  // picture: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  contentHtml: string;
  preview?: boolean;
};
