import BlogCard from "@/components/content-types/BlogCard";
import type { Blog } from "@/types/blog";
import type { BlogCardShow } from "@/components/content-types/BlogListContainer";

interface BlogListProps {
  blogs?: Blog[];
  show?: BlogCardShow;
}

export default function BlogList({ blogs = [], show }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.identifier} {...blog} show={show} />
      ))}

      {blogs.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">No blogs available.</p>
        </div>
      )}
    </div>
  );
}
