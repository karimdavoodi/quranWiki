import React from "react";
import { Title } from "./title";
import { Menu } from "./menu";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
    return (
        <div>
            <Title />
            <div className="pl-8 pr-8 text-xs2 text-left">
                Please help us to understand each verse by connecting it to
                other Quran verses, Hadic, or Bible verses by icons below each
                verse.
            </div>
            <Menu />
            <ChaptersList />
        </div>
    );
};

export default FirstPage;
