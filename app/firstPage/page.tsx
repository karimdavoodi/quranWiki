import React from "react";
import { Menu } from "./menu";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
    return (
        <div>
            <h1 className="font-serif pt-14 pb-3 text-lx text-white">
                The Holy Quran
            </h1>
            <h2 className="pl-8 pr-8 text-xs1 text-center">
                Please help us to understand each verse by connecting it to
                other Quran verses, Hadith, or Bible verses (by icons below each
                verse).
            </h2>
            <Menu />
            <ChaptersList />
        </div>
    );
};

export default FirstPage;
