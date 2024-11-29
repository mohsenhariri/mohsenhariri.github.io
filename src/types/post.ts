type Author = {
  name: string;
  // picture: string;
};

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

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
  toc?: string;
  tocGen: TocItem[];
  preview?: boolean;
};
