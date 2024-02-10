"use client";

import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]"/>
    </div>
  );
};

export default loading;
