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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreIds.join(",")}`,
      )
      .then((res) => {
        setPopular(res.data.results);
      });
  }, [genreIds]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = "/movie/popular";

        const safePage = Math.max(1, Math.min(page, 500));

        const res = await tmdb.get(url, {
          params: { page: safePage },
        });

        setPopular(res.data.results);

        const total = Math.min(res.data.total_pages || 1, 500);
        setTotalPages(total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [page]);
  const getPagination = (current: number, total: number) => {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }

    return pages;
  };
  const maxPages = Math.min(totalPages, 500);
  const pages = getPagination(page, maxPages);

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
                  setGenreIds((prev) =>
                    prev.includes(genre.id)
                      ? prev.filter((id) => id !== genre.id)
                      : [...prev, genre.id],
                  );
                }}
                key={i}
                className={`border cursor-pointer hover:scale-105 transition-transform duration-100 text-xs font-semibold py-0.5 pl-2.5 pr-2  border-[#E4E4E7] rounded-full flex items-center gap-2 dark:border-gray-700 ${genreIds.includes(genre.id) ? "bg-gray-300" : ""}`}
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
                            src="/star.svg"
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
        <div className="w-full flex items-center justify-center gap-2 mt-10 mb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40"
          >
            ← Previous
          </button>
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-xl border transition ${
                  page === p
                    ? "bg-gray-200 border-gray-300 shadow-sm font-semibold "
                    : "hover:bg-gray-100 hover:"
                }`}
              >
                {p}
              </button>
            ),
          )}
          <button
            disabled={page === maxPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40 "
          >
            Next →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
