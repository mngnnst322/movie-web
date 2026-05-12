/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

import { MovieSummary } from "../types";
import axios from "axios";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const API_KEY = "826f50ac875ac781d67fa627ccd5498a";

export const Coming = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [drama, setDrama] = useState(10);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <div className="h-125 w-full bg-gray-800 items-center justify-center text-white">
        Loading...{" "}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-6 w-full">
      <div className="flex justify-between w-358 px-20">
        <p className="text-4xl text-black font-bold dark:text-white">
          Upcoming
        </p>
        <Link
          href={"/upcoming"}
          onClick={() => setDrama((prev) => prev + 10)}
          className=" flex items-center justify-end text-1xl gap-1.5 cursor-pointer hover:opacity-60"
        >
          See more
          <ChevronRight className="w-4 h-4 " />
        </Link>
      </div>
      <div className="w-fit ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8  place-items-center">
          {movies.slice(0, drama).map((movie) => (
            <Link href={`/movie/${movie?.id}`} key={movie.id}>
              <div key={movie.id}>
                <div className="w-57.5">
                  <img
                    className="rounded-t-md"
                    width={230}
                    height={340}
                    alt=""
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  />

                  <div className="bg-stone-200 w-full  rounded-b-md h-25 dark:bg-zinc-800">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
