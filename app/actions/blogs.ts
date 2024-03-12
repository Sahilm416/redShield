"use server";
import { db } from "@/utils/database/db";
export const createNewBlog = async ({
  name,
  content,
}: {
  name: string;
  content: string;
}) => {
  const title = name.replaceAll(" ", "_");

  const blogs = (await db.get("blogs")) as [
    { title: string; content: string; created: string }
  ];
  const existingBlog = blogs.find((blog) => blog.title === title);
  if (existingBlog) {
    return {
      status: false,
      message: "Blog already exists",
    };
  }

  const newBlog = {
    title: title,
    content: content,
    created: new Date().toString(),
  };

  blogs.push(newBlog);

  await db.set("blogs", blogs);
  return { status: true, message: "Blog created successfully" };
};

export const getBlogs = async () => {
  const blogs = (await db.get("blogs")) as [{ title: string; content: string }];
  return {
    status: true,
    message: "blogs fetched successfully!",
    blogs: blogs,
  };
};

export const fetchBlog = async (title: string) => {
  const blogs = (await db.get("blogs")) as { title: string; content: string }[];

  // Find the blog with the given title
  const blog = blogs.find((blog) => blog.title === title);

  if (!blog) {
    return {
      status: false,
      message: "Blog not found",
    };
  }

  // If the blog is found, return it
  return {
    status: true,
    message: "Blog found",
    blogs: blog,
  };
};

export const deleteBlog = async (title: string) => {
  const blogs = (await db.get("blogs")) as { title: string }[];

  const updatedBlogs = blogs.filter((blog) => blog.title !== title);

  await db.set("blogs", updatedBlogs);

  return {
    status: true,
    message: "Blog deleted successfully",
  };
};
