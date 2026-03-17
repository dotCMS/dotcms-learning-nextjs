import NextImage from "next/image";

interface ImageComponentProps {
    fileAsset?: { inode?: string; idPath?: string } | string;
    inode?: string;
    title?: string;
}

function ImageComponent({ fileAsset, inode, title }: ImageComponentProps) {
    const imageSrc =
        inode ||
        (typeof fileAsset === "object"
            ? fileAsset?.inode || fileAsset?.idPath
            : fileAsset);

    if (!imageSrc) {
        return null;
    }

    return (
        <div className="w-full py-4 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-gray-100 rounded-2xl p-2">
                    <NextImage
                        src={imageSrc}
                        width={1200}
                        height={675}
                        alt={title || "Image"}
                        className="w-full h-auto object-cover rounded-xl"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageComponent;
