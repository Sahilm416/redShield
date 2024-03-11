import { fetchBlog } from "@/app/actions/blogs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Blog({ params }: { params: { id: string } }) {
  const res = await fetchBlog(params.id);
  if (!res.status) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-red-700">{res.message}</p>
      </div>
    );
  }
  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-start pt-20">
      <Card className="w-full max-w-[700px]">
        <CardHeader>
          <CardTitle className="text-black dark:text-[#ffffff] text-4xl">
            {res?.blogs?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>{res?.blogs?.content}</CardContent>
      </Card>
    </div>
  );
}
