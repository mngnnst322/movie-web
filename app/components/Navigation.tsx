"use client";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Genre } from "../types";
import Image from "next/image";

export default function Navigation() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <header className="py-[11.5px]">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className=" flex text-indigo-700 text-1xl gap-2 items-center"
          >
            {/* SVG logo */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66667 0.5V17.1667M13 0.5V17.1667M0.5 8.83333H17.1667M0.5 4.66667H4.66667M0.5 13H4.66667M13 13H17.1667M13 4.66667H17.1667M2.31667 0.5H15.35C16.3533 0.5 17.1667 1.31335 17.1667 2.31667V15.35C17.1667 16.3533 16.3533 17.1667 15.35 17.1667H2.31667C1.31335 17.1667 0.5 16.3533 0.5 15.35V2.31667C0.5 1.31335 1.31335 0.5 2.31667 0.5Z"
                stroke="#4338CA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Movie Z
          </Link>

          <div className="flex gap-3  ">
            <div className="relative w-144.25">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="flex gap-2 items-center z-30 font-medium text-[#181818] px-4 py-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#18181B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Genre
                </button>
                <div className="w-78  flex h-12 border-gray-100 items-center justify-start gap-2 border-2 rounded-md px-2">
                  <Image
                    width={16}
                    height={16}
                    className="w-4 h-4 justify-center items-center"
                    src="/navisearch.svg"
                    alt=""
                  />

                  <input
                    placeholder="Search..."
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div
                data-shown={isVisible}
                className="absolute duration-300 p-5 bg-white border border-[#E4E4E7] rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0"
              >
                <div className="mt-1 font-semibold text-2xl text-[#09090B]">
                  Genres
                </div>
                <div className="text-[#09090B]">
                  See lists of movies by genre
                </div>
                <hr className="border border-[#E4E4E7] my-4" />

                <div className="flex flex-wrap gap-4 max-w-135">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className="border cursor-pointer hover:opacity-80 duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-1 border-[#E4E4E7] rounded-full flex items-center gap-2"
                    >
                      {genre.name}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
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
              </div>
            </div>
          </div>

          <div>
            <button className="p-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M6.5 0.5C5.70435 1.29565 5.25736 2.37478 5.25736 3.5C5.25736 4.62522 5.70435 5.70435 6.5 6.5C7.29565 7.29565 8.37478 7.74264 9.5 7.74264C10.6252 7.74264 11.7044 7.29565 12.5 6.5C12.5 7.68669 12.1481 8.84673 11.4888 9.83342C10.8295 10.8201 9.89246 11.5892 8.7961 12.0433C7.69975 12.4974 6.49335 12.6162 5.32946 12.3847C4.16558 12.1532 3.09648 11.5818 2.25736 10.7426C1.41825 9.90353 0.846802 8.83443 0.615291 7.67054C0.38378 6.50666 0.5026 5.30026 0.956725 4.2039C1.41085 3.10754 2.17989 2.17047 3.16658 1.51118C4.15328 0.851894 5.31331 0.5 6.5 0.5Z"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
