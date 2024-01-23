import Image from "next/image";
import Secure from "@/public/static/secure.jpg";

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
        <AspectRatio ratio={16 / 9} className="">
          <Image
            src={Secure}
            alt="dashboard image"
            fill
            className="object-cover opacity-30"
          />
          <Fingerprint className="mx-auto my-auto h-full w-full p-10 opacity-100 stroke-amber-400"/>
        </AspectRatio>
      </div>
    </div>
  );
}
