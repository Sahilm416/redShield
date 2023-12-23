"use client"
import React from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { Button } from "@/components/ui/button";


const Test = () => {
  const username = useAppSelector((state) => state.userReducer.username);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className=" text-4xl text-green-700">{username}</p>
      <Button onClick={()=>{
    
      }}>Add username</Button>
    </div>
  );
};

export default Test;
