/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Navigation } from "./Navigation";
import Image from "next/image";
import { MovieSummary } from "../types";

export const Upcoming = () => {
  const [movies, seMovies] = useState<MovieSummary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="bg-emerald-600 w-360 h-150 flex flex-col justify-center relative pr-2.5 ">
      <div className=" flex  items-center justify-between ">
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
          <button className="flex w-fit h-[48] items-center justify-center gap-2 px-4 rounded-lg py-2 bg-white; bg-[#F4F4F5]">
            <img className="w-5 h-5" src="play.svg" alt="" />
            <p className="text-black text-[14px] w-22.25 h-5">Watch Trailer</p>
          </button>
        </div>
        <div className="flex items-center justify-self-end  bg-white  rounded-full ">
          <Image
            width={20}
            height={20}
            className="w-5 h-5"
            src="/chevron-right (1).svg"
            alt=""
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 ">
        {movies.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-indigo-600 " : "w-2 bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
