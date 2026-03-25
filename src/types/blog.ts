import type { DotCMSBasicContentlet } from "@dotcms/types";

export interface BlogAuthor {
  firstName: string;
  lastName: string;
}

export interface BlogImage {
  idPath?: string;
  title?: string;
}

export interface Blog extends DotCMSBasicContentlet {
  urlTitle: string;
  urlMap: string | null;
  author: BlogAuthor[];
  image: BlogImage | null;
  description?: string;
}
