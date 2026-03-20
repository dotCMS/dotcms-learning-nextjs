import { dotCMSClient } from "@/utils/dotCMSClient";
import BlogList from "@/components/BlogList";
import type { Blog } from "@/types/blog";

export interface BlogCardShow {
  image: boolean;
  date: boolean;
  description: boolean;
}

export default async function BlogListContainer(props: {
  title?: string;
  quantity?: number;
  show?: string;
}) {
  const result = await dotCMSClient.content
    .getCollection<Blog>("Blog")
    .limit(props.quantity ?? 0);

  const show: BlogCardShow = {
    image: props.show?.includes("image") ?? true,
    date: props.show?.includes("date") ?? true,
    description: props.show?.includes("description") ?? true,
  };

  return (
    <section className="w-full py-4 mb-16">
      <div className="max-w-6xl mx-auto px-4">
        {props.title && (
          <h2 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            {props.title}
          </h2>
        )}
        <BlogList blogs={result.contentlets} show={show} />
      </div>
    </section>
  );
}
