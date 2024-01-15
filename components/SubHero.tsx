import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
export default function SubHero() {
  return (
    <div className=" w-full h-max max-h-[900px] flex flex-col pt-[20px] md:pt-[100px] items-center">
      <p className="text-[max(30px,min(5vw,40px))] font-sans font-semibold">
        Why RedShield ?
      </p>
      <div className="flex w-full justify-center max-w-[1200px]">
        <div className="flex flex-col justify-between ">
          <div className="h-[5vw] w-[5vw] border-b-2 border-r-2  border-[#A8A8A8] dark:border-[#878787] flex justify-end items-end">
            {" "}
          </div>
          <div className="h-[5vw] w-[5vw] border-t-2 border-r-2 dark:border-zinc-700">
            {" "}
          </div>
        </div>
        <div className="w-full flex flex-col mt-[5vw] mb-[5vw]">
          <div className="h-full w-full border-2 border-[#EBEBEB] dark:border-[#1F1F1F] flex flex-col md:flex-row items-center">
            <Card className="w-full h-full border-t-0 md:border-b-0 border-l-0 md:border-r border-r-0 border-b border-zinc-700 border-dashed  rounded-none text-center">
              <CardHeader className="">
                <CardTitle>Fast auth</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-400">
                Leveraging a Redis-based database, RedShield provides
                lightning-fast authentication services.
              </CardContent>
            </Card>
            <Card className="w-full border-none rounded-none text-center">
              <CardHeader className="">
                <CardTitle>Low Bandwidth Support</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-400">
                RedShield is optimized for low bandwidth environments, ensuring
                a smooth experience.
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-[5vw] w-[5vw] border-b-2 border-l-2 dark:border-zinc-700">
            {" "}
          </div>
          <div className="h-[5vw] w-[5vw] border-t-2 border-l-2 border-[#A8A8A8] dark:border-[#878787] ">
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
}
