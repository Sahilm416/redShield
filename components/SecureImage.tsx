import Image from "next/image";
import Secure from "@/public/static/cube.gif";

import {Fingerprint} from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function SecureImage() {
  return (
    <div className="w-full max-w-[1200px] px-[5vw] mx-auto mb-10">
      <p className="text-[max(30px,min(3vw,50px))] font-sans font-bold text-center mb-2 dark:text-[#EDEDED] text-[#171717]">
        It's Secure
      </p>
      <p className="dark:text-[#A1A1A1] text-[#666666] text-center pb-5">
        Securely integrate seamless authentication into your application with the power of JWT
      </p>
      <div className="overflow-hidden border border-[#EBEBEB] dark:border-[#1F1F1F] bg-black">
        <AspectRatio ratio={16 / 6} className="flex justify-center items-center">
          <Image
            src={Secure}
            alt="dashboard image"
            className="object-cover sm:w-60 sm:h-60 w-32 h-32"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
