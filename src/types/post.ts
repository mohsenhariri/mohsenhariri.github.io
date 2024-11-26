type Author = {
  name: string;
  // picture: string;
};

export type Post = {
  slug: string;
  title: string;
  date: Date;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  contentHtml: string;
  preview?: boolean;
};
