/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MovieSummary } from "../types";
import axios from "axios";
import Link from "next/link";
import "swiper/css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export const Upcoming = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  if (movies.length === 0) {
    return (
      <div className="h-125 w-full bg-gray-800 items-center justify-center text-white">
        Loading...{" "}
      </div>
    );
  }
  const currentMovie = movies[currentIndex] || movies[0];
  const isNextdisabled = currentIndex >= 9;
  const isPrevdisabled = currentIndex <= 0;

  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      spaceBetween={50}
      navigation={true}
      pagination={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Navigation, Pagination, Autoplay]}
    >
      <SwiperSlide>
        <div
          className="w-full relative h-150 bg-cover bg-center flex justify-center items-center bg-zinc-800 transition-all relative duration-500 easa-in-out"
          style={{
            backgroundImage: currentMovie?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`
              : "none",
          }}
        >
          <div className="flex h-full w-full text-white  items-center justify-start ">
            <div className="flex items-center justify-center ">
              <button
                onClick={prevSlide}
                disabled={isPrevdisabled}
                className="flex items-center justify-center w-7 h-7 bg-white  rounded-full ml-2.5 "
              >
                <Image
                  width={20}
                  height={20}
                  src="/left.svg"
                  className="ml-2"
                  alt=""
                />
              </button>
              <div
                className="flex flex-col justify-center w-160  
     gap-4 0 pl-35 "
              >
                <p className="text-lg  font-semibold">Now Playing:</p>
                <p className="text-[34px]">{currentMovie.title}</p>
                <div className="flex">
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    src="star.svg"
                    alt=""
                  />
                  <p className="text-[18px] ">
                    {" "}
                    {currentMovie.vote_average.toFixed(1)}{" "}
                  </p>
                  <p className="text-[#71717A] text-[16px]">/10</p>
                </div>
                <p className="text-[12px] bg-[#FAFAFA;] font-normal ">
                  {currentMovie.overview}
                </p>
                <Link href={`/movie/${currentMovie.id}`}>
                  <button className="flex w-fit h-[48] items-center justify-center gap-2 px-4 rounded-lg py-2 bg-white; bg-[#F4F4F5]">
                    <img className="w-5 h-5" src="play.svg" alt="" />
                    <p className="text-black text-[14px] w-22.25 h-5">
                      Watch Trailer
                    </p>
                  </button>
                </Link>
              </div>
              <button
              onClick={nextSlide}
              disabled={isNextdisabled}
              className="flex fixed right-10 items-center justify-center mr-2.5 bg-white w-7 h-7 rounded-full "
            >
              <Image width={20} height={20} src="/right.svg" alt="" />
            </button>
            </div>
            
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 ">
            {movies.slice(0, 10).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-indigo-600 "
                    : "w-2 bg-white/50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
