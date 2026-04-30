/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { tmdb } from "@/lib/tmdb";
import { Footer } from "../components/Footer";
import { MovieSummary } from "../types";
import Navigation from "../components/Nav";

export default function Popular() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = "/movie/popular";

        const safePage = Math.max(1, Math.min(page, 500));

        const res = await tmdb.get(url, {
          params: { page: safePage },
        });

        setMovies(res.data.results);

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
      {" "}
      <Navigation />
      <div className="flex flex-col w-screen justify-center items-center gap-20   ">
        <div className="flex justify-start w-full pl-5 pt-5 mb-8">
          <p className="text-4xl text-black font-bold">Popular</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {movies.slice(0, 10).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="flex flex-col items-center w-75 hover:scale-105 transition-transform"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-t-lg shadow-md cursor-pointer"
                />
              )}

              <div className=" text-1xl font-normal pl-1.5 p-2 bg-stone-100 w-full h-fit rounded-b-lg ">
                <div className="flex items-center gap-1">
                  <img src={"star.svg"} alt="" className="h-4 w-4" />
                  <p className="text-yellow-500 font-semibold">
                    {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
                {movie.title}
              </div>
            </Link>
          ))}
        </ul>
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

        <Footer />
      </div>
    </div>
  );
}
