/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Navigation } from "./Navigation";
import Image from "next/image";

export const Upcoming = () => {
  return (
    <div className="bg-emerald-600 w-360 h-150 flex justify-center items-center">
      <div className=" flex  items-center justify-between">
        <div
          className="flex flex-col justify-start w-160  
     gap-4 0 pl-35 "
        >
          <p className="text-lg  font-semibold">Now Playing:</p>
          <p className="text-[34px]">Wicked</p>
          <div className="flex">
            <Image
              width={24}
              height={24}
              className="w-6 h-6"
              src="star.svg"
              alt=""
            />
            <p className="text-[18px] "> 6.9 </p>
            <p className="text-[#71717A] text-[16px]">/10</p>
          </div>
          <p className="text-[12px] bg-[#FAFAFA;] font-normal ">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.{" "}
          </p>
          <button className="flex w-36.25 h-[48] items-center justify-center gap-2 px-4 py-2 bg-white; bg-[#F4F4F5]">
            <img className="w-5 h-5" src="play.svg" alt="" />
            <p className="text-black text-[14px] w-22.25 h-5">Watch Trailer</p>
          </button>
        </div>
        <div className="flex items-center justify-self-end  bg-white border-4 rounded-full">
          <Image
            width={20}
            height={20}
            className="w-5 h-5"
            src="/chevron-right (1).svg"
            alt=""
          />
        </div>
      </div>
      <div className=" flex justify-center items-center w-2 h-2  bg-white border-2 rounded-full"></div>
    </div>
  );
};
