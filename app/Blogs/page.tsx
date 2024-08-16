import BlogList from "@/components/BlogList";
import { getBlogs } from "../actions/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
};

export default async function Blogs() {
  const res = await getBlogs();
  return (
    <div className="mt-[20px]">
      <BlogList blogs={res.blogs} />
    </div>
  );
}
