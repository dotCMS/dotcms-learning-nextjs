import Image from "next/image";

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  inode?: string;
  ctaText?: string;
}

const Card = ({
  title,
  description,
  image,
  inode,
  ctaText = "Learn more",
}: CardProps) => (
  <article className="card">
    <div className="card__image">
      {image && (
        <Image
          alt={title || ""}
          title={title}
          loading="lazy"
          decoding="async"
          src={inode || ""}
          fill={true}
        />
      )}
    </div>
    <div className="card__body">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{ctaText}</span>
    </div>
  </article>
);

export default Card;
