import React from "react";
import { ChaptersList } from "./chaptersLists";
import BackIcon from "../icons/back.svg";
import Link from "next/link";

const FirstPage = () => {
  return (
    <div>
      <Link href="/firstPage" className="flex w-12 p-1">
        <BackIcon />
        <div className="text-xs2 text-gray-100-400">Back</div>
      </Link>

      <h1 className="p-5 font-serif text-green-300">Hadith Books</h1>
      <ChaptersList />
    </div>
  );
};

export default FirstPage;
