import { DotCMSBasicContentlet } from "@dotcms/types";
import { Button } from "@/components/Button";
import Link from "next/link";
import DotCMSImage, { type DotCMSImageSrc } from "@/components/DotCMSImage";

type BannerProps = DotCMSBasicContentlet & {
  title: string;
  caption: string;
  image?: DotCMSImageSrc;
  link?: string;
  buttonText?: string;
};

export default function Banner(props: BannerProps) {
  const { title, caption, image, link, buttonText } = props;

  return (
    <section className="banner">
      <div className="banner__content">
        <h1>{title}</h1>
        <p>{caption}</p>
        {link && buttonText && (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button className="banner__cta">{buttonText}</Button>
          </Link>
        )}
      </div>
      {image && (
        <div className="banner__image">
          <DotCMSImage
            src={image}
            width={1200}
            height={500}
            alt={title || "Banner"}
          />
        </div>
      )}
    </section>
  );
}
