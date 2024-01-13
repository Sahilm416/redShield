export default function SubHero() {
  return (
    <div className="w-full h-[300px] px-2">
      <div className="w-full h-full flex justify-start gap-5">
        <div className="h-full flex flex-col justify-center items-center">
            <span className="w-[20px] h-[20px]">
              {" "}
            </span>
          <span className="w-[5px] mt-[-20px] h-full bg-zinc-800 shadow-[0px_0px_20px_#27272a] dark:bg-zinc-100 dark:shadow-[0px_0px_20px_#fafafa]">
            {""}
          </span>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="">
            <span className="md:text-7xl sm:text-6xl text-5xl font-sans tracking-tighter none bg-clip-text text-transparent bg-gradient-to-b from-black via-black to-white dark:from-white dark:via-white/80 dark:to-black">
             <del className="line-through dark:text-slate-300 text-slate-500 pr-2>Fast</del">  Fast </del> Faster
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-zinc-400 max-w-[600px]">
              supersonic speed with extremely low bandwidth support
            </p>
          </div>
          <span className="w-full sm:hidden h-2 border-b m-2 border-dashed border-zinc-500 my-7">
            {""}
          </span>
        </div>
      </div>
    </div>
  );
}
