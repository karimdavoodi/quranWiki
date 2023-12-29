import React from "react";
import { ChaptersList } from "./chaptersLists";

const FirstPage = () => {
    return (
        <div>
            <h1 className="p-5 font-serif text-yellow-600">Hadith Books</h1>
            <ChaptersList />
        </div>
    );
};

export default FirstPage;
