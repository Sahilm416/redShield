"use client";

import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default loading;
