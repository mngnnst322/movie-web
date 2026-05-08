/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MovieSummary } from "../types";
import axios from "axios";
import Link from "next/link";

const API_KEY = "826f50ac875ac781d67fa627ccd5498a";

export const Top_rated = () => {
  const [popular, setPopular] = useState<MovieSummary[]>([]);
  const [drama, setDrama] = useState(10);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=d67d8bebd0f4ff345f6505c99e9d0289&`,
      )
      .then((res) => {
        setPopular(res.data.results);
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-6 w-full">
      <div className="flex justify-between w-full ">
        <p className="text-4xl text-black font-bold dark:text-white">
          Top rated
        </p>
        <Link
          href={"/Top-rated"}
          onClick={() => setDrama((prev) => prev + 10)}
          className="flex justify-center items-center text-1xl gap-1.5 cursor-pointer hover:opacity-60"
        >
          See more
          <img src="chevron-right (1).svg" alt="" className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-4 place-items-center ">
        {popular.slice(0, drama).map((movie) => (
          <Link href={`/movie/${movie?.id}`} key={movie.id} className="w-57.5">
            <img
              className="rounded-t-md"
              width={230}
              height={340}
              alt=""
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />

            <div className="bg-stone-200 w-full  rounded-b-md h-25">
              {" "}
              <div
                className="flex justify-start items-center pt-2.5  pl-2.5
                  "
              >
                <img
                  width={24}
                  height={24}
                  className="w-5 h-5"
                  src="star.svg"
                  alt=""
                />
                <p className="text-[18px] ">
                  {" "}
                  {movie.vote_average.toFixed(1)}{" "}
                </p>
                <p className="text-[#71717A] text-[16px]">/10</p>
              </div>
              <div className="  pl-2.5 "> {movie.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
