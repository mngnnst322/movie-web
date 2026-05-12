import { Upcoming } from "./components/Upcoming";

import { Footer } from "./components/Footer";
import { Coming } from "./components/Coming";
import { Popular } from "./components/Popular";

import Navigation from "./components/Nav";
import { Top_rated } from "./components/Top_rated";

export default function Home() {
  return (
    <div className="w-screen space-y-20 items-center justify-center dark:bg-black dark:text-white">
      <Navigation />
      <Upcoming />
      <Coming />
      <Popular />
      <Top_rated />
      <Footer />
    </div>
  );
}
