import Image from "next/image";
import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";
import { Navigation } from "./components/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />

      <Upcoming />
    </div>
  );
}
