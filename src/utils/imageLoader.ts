import type { ImageLoaderProps } from "next/image";

const ImageLoader = ({ src, width = 250 }: ImageLoaderProps): string => {
    const dotcmsURL = new URL(process.env.NEXT_PUBLIC_DOTCMS_HOST!).origin;
    const imageSRC = src.includes("/dA/") ? src : `/dA/${src}`;

    return `${dotcmsURL}${imageSRC}/${width}w`;
};

export default ImageLoader;
