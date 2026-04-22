"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
export const Navigation = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-full h-14.75 bg-white  flex  items-center justify-between gap-2 px-4 py-2">
      <div className="flex">
        <img className="w-4 h-4" src="/navilogo.svg" alt="" />
        <p className="text-indigo-700 flex items-center justify-center w-16 h-5">
          Movie Z{" "}
        </p>
      </div>
      <div className="flex items-center justify-start gap-2">
        <button
          className="w-24.25 h-9 flex items-center justify-center border-2
        rounded-md"
        >
          <Image
            width={16}
            height={16}
            className="w-4 h-4"
            src="navisum.svg"
            alt=""
          />
          <p className="text-black">Genre</p>
        </button>
        <div className="w-78 h-9 flex items-center justify-start gap-2 border-2 rounded-md px-2">
          <Image
            width={16}
            height={16}
            className="w-4 h-4 justify-center items-center"
            src="navisearch.svg"
            alt=""
          />
          <p
            className="flex 
         
            justify-center
            items-center
            text-gray-400 "
          >
            Search..
          </p>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="rounded-md border-2 w-9 h-9 flex items-center justify-center">
        <div>
          <Image
            width={16}
            height={16}
            className="w-4 h-4"
            src="moon.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
