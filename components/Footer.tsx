import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 w-full flex justify-center items-center">
      <div className="group/item flex items-center">
        <Link target="blanc" href={"https://twitter.com/sahil__501"}>
          <Button
            className="text-lg group-hover/item:text-blue-700"
            variant={"link"}
          >
            By sahil
          </Button>
        </Link>
        <Zap className="group-hover/item:text-blue-700" />
      </div>
    </div>
  );
};

export default Footer;
