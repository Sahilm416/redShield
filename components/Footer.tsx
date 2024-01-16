import Link from "next/link";
import{Zap} from "lucide-react"
export default function Footer() {
  return (
    <div className="w-full h-[150px] bg-white dark:bg-gray-900/20 border-t-2 border-[#EBEBEB] dark:border-[#1F1F1F] mt-3 flex justify-center items-center">
      <Link
        target="blanc"
        href={"https://twitter.com/sahil__501"}
        className="py-3 px-4 bg-zinc-50 dark:bg-black border hover:border-blue-500 hover:shadow-[0px_0px_5px_skyblue] flex gap-2"
      >
        Made by sahil <Zap />
      </Link>
    </div>
  );
}
