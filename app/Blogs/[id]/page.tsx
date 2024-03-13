import { fetchBlog } from "@/app/actions/blogs";
import DeleteBlog from "@/components/DeleteBlog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/app/actions/auth";

export default async function Blog({ params }: { params: { id: string } }) {
  const res = await fetchBlog(params.id);
  if (!res.status) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-red-700">{res.message}</p>
      </div>
    );
  }

  const session = await getSession();
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center justify-start pt-14 px-3">
      <Card className="w-full max-w-[700px] rounded-none dark:border-[#222222]">
        <CardHeader>
          <CardTitle className="text-black dark:text-[#ffffff] text-4xl">
            {res?.blogs?.title.replaceAll("_", " ")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {res?.blogs?.content.split("\n").map((paragraph, index) => (
            <div className="my-3" key={index}>
              <p className=" leading-7">{paragraph}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      {session?.data?.isAdmin && (
        <div className="w-full max-w-[700px] my-5 flex justify-end">
          <DeleteBlog title={params.id} />
        </div>
      )}
    </div>
  );
}
