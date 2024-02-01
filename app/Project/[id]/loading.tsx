"use client"
import { Oval } from "react-loader-spinner";
const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Oval
        visible={true}
        height="40"
        width="40"
        strokeWidth="5"
        color="white"
        ariaLabel="oval-loading"
        secondaryColor="black"
      />
    </div>
  );
};

export default loading;