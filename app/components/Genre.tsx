"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Genre } from "../types";
import { tmdb } from "@/lib/tmdb";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@base-ui/react";

export const Genres = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="w-26 h-12 px-4 py-2 border border-stone-200 shadow-3xl items-center flex justify-center rounded-lg gap-2 cursor-pointer hover:scale-105 transition-transform "
      >
        <ChevronRight className="w-full h-full"/> 

        Genre
      </button>
      <div
        data-shown={isVisible}
        className={`absolute z-10 duration-300  p-5 bg-white dark:bg-black  border border-[#E4E4E7] rounded-lg mt-1  data-[shown=true]:opacity-100  opacity-0    `}
      >
        <div className="mt-1 font-semibold text-2xl text-black">Genres</div>
        <div className="text-black-700">See lists of movies by genre</div>
        <hr className="border border-[#E4E4E7] my-4 dark:dark:border-gray-700" />
        <div className="flex flex-wrap gap-4 max-w-135">
          {genres.map((genre, i) => (
            <button
              onClick={() => {
                const slug = genre.name.toLowerCase().replace(/\s+/g, "-");
                router.push(`/genre/${slug}`);
              }}
              key={i}
              className="border cursor-pointer hover:scale-105 transition-transform duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-2  border-[#E4E4E7] rounded-full flex items-center gap-2 dark:border-gray-700"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
