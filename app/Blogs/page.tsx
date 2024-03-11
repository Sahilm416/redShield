import BlogList from "@/components/BlogList";
import { getBlogs } from "../actions/blogs";
export default async function Blogs() {
  const res = await getBlogs();
  return (
    <div className="mt-[20px]">
      <BlogList blogs={res.blogs} />
    </div>
  );
}
