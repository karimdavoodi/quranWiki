import React from "react";
import { Title } from "./title";
import { Menu } from "./menu";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
    return (
        <div>
            <Title />
            <div className="pl-14 pr-14 text-xs2">
                Please help us to understand each verse by connecting it to
                other verses, Hadic, or Bible verses.
            </div>
            <Menu />
            <ChaptersList />
        </div>
    );
};

export default FirstPage;
