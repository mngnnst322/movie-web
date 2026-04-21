"use client";
import React from "react";
import { useState } from "react";
export const Navigation = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-screen h-14.75 bg-white  flex  items-center justify-between gap-2 px-4 py-2">
      <div
        className="flex
      "
      >
        <img className="w-4 h-4" src="navilogo.svg" alt="" />
        <p className="text-indigo-700 flex items-center justify-center w-[64px] h-5">
          Movie Z{" "}
        </p>
      </div>
      <div className="flex items-center justify-start gap-2">
        <button
          className="w-24.25 h-9 flex items-center justify-center border-2
        rounded-md"
        >
          <img className="w-4 h-4" src="navisum.svg" alt="" />
          <p className="text-black">Genre</p>
        </button>
        <div className="w-48 h-9 flex- items-center justify-start gap-2 border-2 rounded-md px-2">
          <img className="w-4 h-4" src="navisearch.svg" alt="" />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
