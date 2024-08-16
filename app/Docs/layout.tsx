import type { Metadata } from "next";
import DocLinks from "@/components/DocLinks";
export const metadata: Metadata = {
  title: "Documentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100vw] flex justify-center">
      <div className="w-full max-w-[1200px]">
        <div className="flex border-x dark:border-[#171717] sm:h-[calc(100vh-60px)] overflow-hidden">
          <div className=" shadow-md w-[250px] h-full border-r dark:border-[#171717] sticky top-[60px] lg:block hidden">
            <DocLinks />
          </div>
          <div className="w-full sm:overflow-y-scroll p-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
