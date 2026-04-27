import Image from "next/image";
import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";

import { Footer } from "./components/Footer";
import { Coming } from "./components/Coming";
import { Popular } from "./components/Popular";
import { Top_radet } from "./components/Top_rated";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-360">
        <Navigation />

        <Upcoming />
        <Coming />
        <Popular />
        <Top_radet />
        <Footer />
      </div>
    </div>
  );
}
