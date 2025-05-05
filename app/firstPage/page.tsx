import React from "react";
import { Menu } from "./menu";
import { Search } from "./search";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-serif pt-14 pb-3 text-lx text-white">
        The Holy Quran
      </h1>
      <Search />
      <Menu />
      <ChaptersList />
    </div>
  );
};

export default FirstPage;
