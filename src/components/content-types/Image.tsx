import DotCMSImage, { type DotCMSImageSrc } from "@/components/DotCMSImage";

interface ImageComponentProps {
  fileAsset?: DotCMSImageSrc;
  inode?: string;
  title?: string;
}

function ImageComponent({ fileAsset, inode, title }: ImageComponentProps) {
  const src = inode || fileAsset;

  if (!src) {
    return null;
  }

  return (
    <div className="image-section">
      <DotCMSImage
        src={src}
        width={1200}
        height={675}
        alt={title || "Image"}
        loading="lazy"
      />
    </div>
  );
}

export default ImageComponent;
