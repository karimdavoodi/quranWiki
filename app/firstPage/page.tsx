import React from "react";
import { Title } from "./title";
import { Menu } from "./menu";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
    return (
        <div>
            <Title />
            <Menu />
            <ChaptersList />
        </div>
    );
};

export default FirstPage;
