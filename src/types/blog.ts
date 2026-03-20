import type {
  DotCMSURLContentMap,
  DotCMSBasicContentlet,
  BlockEditorNode,
} from "@dotcms/types";

export interface BlogAuthor {
  firstName: string;
  lastName: string;
  inode: string;
  image?: BlogImage;
}

export interface BlogImage {
  idPath?: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface Blog extends DotCMSBasicContentlet {
  urlTitle: string;
  urlMap: string | null;
  author: BlogAuthor[];
  image: BlogImage | null;
  description?: string;
}

// DotCMSBasicContentlet has body?: string, but blog returns a BlockEditorNode at runtime.
// Use Omit to override body with the correct type.
export type BlogURLContentMap = Omit<DotCMSURLContentMap, "body"> & {
  description?: string;
  teaser?: string;
  publishDate?: number;
  body?: { json: BlockEditorNode };
  image?: BlogImage;
  author?: BlogAuthor[];
};
