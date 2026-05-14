/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";
import Navigation from "@/app/components/Nav";
import { MovieSummary } from "@/app/types";
import { MovieCardSkeleton2 } from "../../components/skeleton2";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<MovieSummary[]>([]);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  const director = credits?.crew?.find((p: any) => p.job === "Director");
  const writers = credits?.crew?.filter(
    (p: any) => p.job === "Writer" || p.job === "Screenplay",
  );
  const cast = credits?.cast?.slice(0, 3);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
      ),
    ])
      .then(([movieRes, creditsRes, recRes]) => {
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
        setRecommendations(recRes.data.results);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="h-screen flex items-center justify-center dark:text-white dark:bg-black">
        Movie not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title & Rating Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {movie.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className="border border-gray-400 dark:border-gray-600 px-1 text-[10px] rounded">
                PG-13
              </span>
              <span>2h 40m</span>
            </div>
          </div>

          {/* Figma Style Rating Section */}
          <div className="flex items-center gap-8 self-end md:self-start">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                TMDB RATING
              </span>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-3xl">★</span>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-lg">/10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="flex items-center gap-2 text-blue-500 group-hover:text-blue-400 transition"></div>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 aspect-video md:aspect-auto md:h-112.5">
          {/* Poster */}
          <div className="w-full md:w-1/3 h-full relative">
            {!posterLoaded && <MovieCardSkeleton2 />}

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className={`w-full h-full object-cover rounded shadow-2xl transition-opacity duration-500 ${
                posterLoaded ? "opacity-100" : "opacity-0"
              }`}
              alt=""
              onLoad={() => setPosterLoaded(true)}
            />
          </div>

          {/* Backdrop */}
          <div className="w-full md:w-2/3 h-full relative">
            {!backdropLoaded && <MovieCardSkeleton2 />}

            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className={`w-full h-full object-cover rounded transition-opacity duration-500 ${
                backdropLoaded ? "opacity-100" : "opacity-0"
              }`}
              alt=""
              onLoad={() => setBackdropLoaded(true)}
            />

            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:scale-110 transition cursor-pointer">
                <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-[12px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-8 text-zinc-800 dark:text-zinc-200">
              {movie.overview}
            </p>

            <div className="border-t border-gray-200 dark:border-zinc-800 divide-y divide-gray-200 dark:divide-zinc-800 text-sm md:text-base">
              <div className="py-4 flex gap-8">
                <span className="font-bold w-20 flex-shrink-0 text-zinc-500">
                  Director
                </span>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {director?.name}
                </span>
              </div>
              <div className="py-4 flex gap-8">
                <span className="font-bold w-20 flex-shrink-0 text-zinc-500">
                  Writers
                </span>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {writers?.map((w: any) => w.name).join(" · ")}
                </span>
              </div>
              <div className="py-4 flex gap-8">
                <span className="font-bold w-20 flex-shrink-0 text-zinc-500">
                  Stars
                </span>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {cast?.map((c: any) => c.name).join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">More like this</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {recommendations?.slice(0, 5).map((rec) => (
              <Link href={`/movie/${rec.id}`} key={rec.id} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg mb-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    alt={rec.title}
                  />
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-medium">
                    {rec.vote_average.toFixed(1)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-blue-500 transition">
                  {rec.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
