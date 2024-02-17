import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import MintCard from "@/components/MintCard";
import ShowCase from "@/components/ShowCase";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
      
    >
      <Header/>

      <MintCard/>
      
    </main>
  );
}
