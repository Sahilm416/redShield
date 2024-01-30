import latestVersion from "latest-version";
import Link from "next/link";
export default async function Ammouncement() {
  const version = await latestVersion("redshield");
  return (
    <div className="h-[7vw] w-full flex justify-center items-center absolute md:top-[70px] top-[100px] right-0 transition-all fade-in-100">
      <Link
        className=""
        target="blanc"
        href={"https://www.npmjs.com/package/redshield"}
      >
        <div className=" h-[40px] px-2 rounded-3xl bg-zinc-50 dark:bg-[#111111] border-zinc-200 dark:border-zinc-800 flex justify-center items-center gap-2 border">
          <span className="px-2 text-green-700 bg-green-100 border border-green-700 rounded-2xl">
            New
          </span>
          <p className="dark:text-[#EDEDED] text-zinc-600">
            just released {version}
          </p>
        </div>
      </Link>
    </div>
  );
}
