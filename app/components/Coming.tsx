/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MovieSummary } from "../types";
import axios from "axios";

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

  return (
    <div className="flex flex-col.  items-center gap-6">
      <div className="flex justify-between">
        <p className="text-4xl text-black font-bold">Upcomming</p>
        <button
          onClick={() => setDrama((prev) => prev + 10)}
          className="flex justify-center items-center text-1xl gap-1.5 cursor-pointer hover:opacity-60"
        >
          See more
          <img src="chevron-right (1).svg" alt="" className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {movies.slice(0, drama).map((movie) => (
          <div key={movie.id}>
            <div>
              <img
                width={230}
                height={340}
                alt=""
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
