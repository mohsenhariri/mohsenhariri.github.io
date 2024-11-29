interface Author {
  name: string;
  email?: string;
}

type Authors = Author[];

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
  authors: Authors;
  excerpt: string;
  ogImage: {
    url: string;
  };
  contentHtml: string;
  toc?: string;
  tocGen: TocItem[];
  preview?: boolean;
};
