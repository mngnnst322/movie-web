import React, { useEffect, useState } from "react";
import { MovieSummary } from "../types";
import { tmdb } from "@/lib/tmdb";

export const Pagination = () => {
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
    <div className="w-full flex items-center justify-center gap-2 mt-10 mb-10">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40 dark:bg-gray-700"
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
                ? "bg-gray-200 border-gray-300 shadow-sm font-semibold dark:bg-gray-700 dark:border-gray-700"
                : "hover:bg-gray-100 hover:dark:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        disabled={page === maxPages}
        onClick={() => setPage((p) => p + 1)}
        className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40 dark:bg-gray-700"
      >
        Next →
      </button>
    </div>
  );
};
