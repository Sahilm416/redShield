import Image from "next/image";
import lightDash from "@/public/static/light_dash.png";
import darkDash from "@/public/static/dark_dash.png";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function DashImage() {
  return (
    <div className="w-full max-w-[1200px] px-[5vw] mx-auto">
      <p className="text-[max(30px,min(3vw,50px))] font-sans font-bold text-center mb-2 dark:text-[#EDEDED] text-[#171717]">
        It's Simple
      </p>
      <p className="dark:text-[#A1A1A1] text-[#666666] text-center pb-5">
        manage all projects in one place with user management
      </p>
      <div className="overflow-hidden border border-[#EBEBEB] dark:border-[#1F1F1F] pt-5">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={lightDash}
            alt="dashboard image"
            fill
            className="object-cover dark:hidden"
          />
          <Image
            src={darkDash}
            alt="dashboard image"
            fill
            className="rounded-md object-cover hidden dark:block"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
