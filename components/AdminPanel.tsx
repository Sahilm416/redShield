"use client";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createNewBlog } from "@/app/actions/blogs";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const fakeLoad = async () => {
    return;
  };
  const createBlogPost = async (formData: FormData) => {
    const blog_title = formData.get("blog_title") as string;
    const blog_content = formData.get("blog_content") as string;

    if (blog_title.length < 5) {
      return toast.warning("blog title is too short");
    }
    if (blog_content.length < 10) {
      return toast.warning("blog content too short");
    }
    await fakeLoad();
    setLoading(true);
    const res = await createNewBlog({
      name: blog_title,
      content: blog_content,
    });
    if (res.status) {
      toast.success(res.message);
      router.push("/Blogs")
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-full items-center max-w-[1500px]">
        <div className="w-full p-5">
          <h1 className="text-4xl text-center font-sans">Welcome Admin</h1>
        </div>
        <div className="w-full max-w-[500px] p-5 pt-0">
          <form action={createBlogPost}>
            <Card>
              <CardHeader>
                <CardTitle>Create new blog post</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="blog_title">Title of blog</Label>
                <Input
                  required
                  id="blog_title"
                  name="blog_title"
                  type="text"
                  placeholder="Enter the title"
                />{" "}
                <br />
                <Label htmlFor="blog_content">Blog Content</Label>
                <Textarea
                  required
                  id="blog_content"
                  name="blog_content"
                  placeholder="Enter the title"
                />{" "}
                <br />
              </CardContent>
              <CardFooter className=" justify-end">
                <Button className="w-[100px]" disabled={loading} type="submit">
                  {loading ? (
                    <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]" />
                  ) : (
                    "Create blog"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
