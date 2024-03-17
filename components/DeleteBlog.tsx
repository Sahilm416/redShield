"use client";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBlog } from "@/app/actions/blogs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Delteblog({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className=" rounded-sm" variant={"destructive"}>
            delete this blog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-black dark:border-[#222222]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this blog
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p>This will permanently delete the blog post</p>
          <AlertDialogFooter className="gap-5">
            <AlertDialogCancel className=" rounded-sm border-[#EBEBEB] dark:border-[#1F1F1F]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const res = await deleteBlog(title);
                if (res.status) {
                  toast.success(res.message);
                  router.push("/Blogs");
                  router.refresh();
                } else {
                  toast.error(res.message);
                }
              }}
              className=" rounded-sm bg-red-700 hover:bg-red-600 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
