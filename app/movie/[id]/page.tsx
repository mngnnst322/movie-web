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

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<MovieSummary[]>([]);

  const director = credits?.crew?.find(
    (person: any) => person.job === "Director",
  );

  const writers = credits?.crew?.filter(
    (person: any) => person.job === "Writer" || person.job === "Screenplay",
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 dark:bg-black dark:text-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4  dark:text-white">
        <div className="text-5xl">🎬</div>
        <h2 className="text-2xl font-semibold">Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-screen ">
      <Navigation />

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{movie.title}</h1>
            <p className="text-sm text-gray-500">
              {movie.release_date} · {movie.original_language}
            </p>
          </div>

          <p className="text-yellow-500 flex items-center gap-2">
            <img src="/star.svg" alt="" className="h-4 w-4" />
            {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>

        {movie.poster_path && (
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-md object-cover"
            />
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full md:w-2/3 rounded-md object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {movie.genres?.map((genre) => (
            <div
              key={genre.id}
              className="px-3 py-1 text-xs border border-gray-400 rounded-xl s"
            >
              {genre.name}
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm sm:text-base max-w-3xl">{movie.overview}</p>

        <div className="mt-8 space-y-4 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:gap-10 border-b pb-2 ">
            <p className="font-bold">Director</p>
            <p>{director?.name || "N/A"}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-10 border-b pb-2 ">
            <p className="font-bold">Writers</p>
            <p>
              {writers?.length
                ? writers.map((w: any) => w.name).join(", ")
                : "N/A"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-10 border-b pb-2 ">
            <p className="font-bold">Cast</p>
            <p>
              {cast?.length
                ? cast.map((actor: any) => actor.name).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={"https://www.vidking.net/embed/movie/" + id}
            className="absolute top-0 left-0 w-full h-full rounded-md"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl px-4">
        <h2 className="text-xl font-semibold mb-4">More Like This</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendations?.slice(0, 10).map((rec) => (
            <Link
              href={`/movie/${rec.id}`}
              key={rec.id}
              className="min-w-35 sm:min-w-40 hover:opacity-80"
            >
              {rec.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  className="rounded-md w-full"
                />
              ) : (
                <div className="w-full h-56 bg-gray-300 rounded-md" />
              )}
              <p className="text-sm mt-2">{rec.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
