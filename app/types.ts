export type MovieSummary = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  original_language: string;
  media_type: "movie" | string;
  genre_ids: number[];
  popularity: number;
  release_date: string; // ISO date string
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type Genre = {
  toLowercase(): unknown;
  id: number;
  name: string;
};
