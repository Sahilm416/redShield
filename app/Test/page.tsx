"use client"
import { useSession } from "next-auth/react";
const Test = () => {
const user = useSession();

console.log(user);
  return (
    <div className="w-full h-screen flex justify-center items-center">
        
    </div>
  );
};

export default Test;
