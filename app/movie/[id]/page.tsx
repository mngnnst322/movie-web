/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"; // Энэ нь client component гэдгийг заана
import Navigation from "@/app/components/Navigation";
import { MovieSummary } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams ашиглана
import Image from "next/image";

const API_KEY = "826f50ac875ac781d67fa627ccd5498a";

export default function MovieDetails() {
  const params = useParams(); // URL-аас ID авах
  const id = params?.id;

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<MovieSummary | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Ачаалж дуусахад заавал false болгох
  }, [id]);

  if (loading) return <div>Түр хүлээнэ үү...</div>;

  return (
    <div className="w-full">
      <div className="  max-w-270 w-full mx-auto p-4 ">
        <Navigation />

        <div className="flex flex-col gap-10 w-full">
          <div className="flex justify-between gap-4 items-center">
            <div className="text-black text-4xl">
              <p>{movie?.title}</p>
              <p className="text-2xl">{movie?.release_date}</p>
            </div>
            <div className=" flex">
              <p>Rating</p>
              <div className="flex">
                <Image
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  src="/star.svg"
                  alt=""
                />
                <p className="text-[18px] ">
                  {" "}
                  {movie?.vote_average.toFixed(1)}{" "}
                </p>
                <p className="text-[#71717A] text-[16px]">/10</p>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-5">
            <img
              className="w-72.5 h-107 flex gap-4"
              width={230}
              height={340}
              alt=""
              src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
            />
            <img
              className="w-[760px]  h-107 flex gap-4"
              alt=""
              src={`https://image.tmdb.org/t/p/w300${movie?.backdrop_path}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
