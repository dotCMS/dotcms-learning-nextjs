export interface BlogAuthor {
  firstName?: string;
  lastName?: string;
  inode?: string;
}

export interface BlogImage {
  idPath?: string;
  width?: number;
  height?: number;
}

export interface Blog {
  identifier: string;
  inode?: string;
  title?: string;
  teaser?: string;
  urlMap?: string;
  urlTitle?: string;
  modDate?: string;
  author?: BlogAuthor | BlogAuthor[];
  image?: BlogImage;
  [key: string]: unknown;
}
