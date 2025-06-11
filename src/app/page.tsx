import Image from "next/image";
import { Hero, Intro } from "@/components";

export default function Home() {

  return (
   <main className="w-full mx-auto"> 
      <Hero />
      <Intro />
   </main>
  );
}
