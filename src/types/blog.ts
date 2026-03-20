import type { DotCMSURLContentMap, DotCMSBasicContentlet, BlockEditorNode } from "@dotcms/types";

export interface BlogAuthor {
    firstName: string;
    lastName: string;
    inode: string;
}

export interface BlogImage {
    idPath: string | null;
    title: string | null;
    width: number | null;
    height: number | null;
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
    postingDate?: string;
    body?: BlockEditorNode;
    image?: BlogImage;
    author?: BlogAuthor[];
};
