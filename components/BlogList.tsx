import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function BlogComponent({
  blogs,
}: {
  blogs: [{ title: string; content: string }];
}) {
  return (
    <>
      {blogs.map((blog) => {
        return (
          <Card
            key={blog.title + 1}
            className="w-full max-w-[700px] border-0 border-b rounded-none mx-auto shadow-none dark:text-[#D4D4D4] text-[#444444]"
          >
            <CardHeader>
              <CardTitle className="text-black dark:text-[#ffffff] text-4xl">
                {blog.title.replaceAll("_", " ")}
              </CardTitle>
              <CardDescription>{blog.content.slice(0, 30)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className="hover:text-blue-700 hover:underline"
                href={`/Blogs/${blog.title}`}
              >
                Read more ...
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
