import type { Metadata } from "next";
import DocLinks from "@/components/DocLinks";
export const metadata: Metadata = {
  title: "Red Shield",
  description: "Documentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100vw] flex justify-center">
      <div className="w-full max-w-[1500px] flex  justify-center">
        <div className="flex border-x dark:border-[#171717] sm:h-[calc(100vh-60px)] overflow-hidden">
          <div className="bg-zinc-100 dark:bg-zinc-900/20 w-[250px] h-full border-r dark:border-[#171717] sticky top-[60px] lg:block hidden">
            <DocLinks />
          </div>
          <div className=" sm:overflow-y-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
