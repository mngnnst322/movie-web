import Image from "next/image";
import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";

export default function Home() {
  return (
    <div>
      <Upcoming />
    </div>
  );
}
