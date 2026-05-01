/* eslint-disable @next/next/no-img-element */
"use client";
import { Footer } from "@/app/components/Footer";
import Navigation from "@/app/components/Nav";
import { Genre, MovieSummary } from "@/app/types";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { Pagination } from "@/app/components/Pagination";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export default function Search() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [popular, setPopular] = useState<MovieSummary[]>([]);
  const [genreIds, setGenreIds] = useState<number[]>([]);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&?language=en-US&with_genres=${genreIds.join(",")}`,
      )
      .then((res) => {
        setPopular(res.data.results);
      });
  }, [genreIds]);

  return (
    <div>
      <div className="container ">
        <Navigation />
        <div className="flex-start text-black text-4xl">Search Filter</div>
        <div className="flex ">
          <div className="flex w-[20%]  flex-wrap gap-2 justify-start h-60">
            <div className="text-3xl">
              Genres
              <p className="w-200 text-lg">See lists of movies by genre</p>
            </div>
            {genres.map((genre, i) => (
              <button
                onClick={() => {
                  setGenreIds([...genreIds, genre.id]);
                }}
                key={i}
                className="border cursor-pointer hover:scale-105 transition-transform duration-100 text-xs font-semibold py-0.5 pl-2.5 pr-2  border-[#E4E4E7] rounded-full flex items-center gap-2 dark:border-gray-700"
              >
                {genre.name}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#09090B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
          <div className="flex w-[80%] p-6  gap-6 text-gray-500 border-l-2 h-full  flex-col ">
            <div className="grid grid-cols-4 grid-rows-2 gap-4">
              {popular.slice(0, 12).map((movie) => (
                <Link href={`/movie/${movie?.id}`} key={movie.id}>
                  <div key={movie.id}>
                    <div className="w-57.5">
                      <img
                        className="rounded-t-md "
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Pagination />
      </div>
      <Footer />
    </div>
  );
}
