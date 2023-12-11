import React from "react";
import { Link } from "react-router-dom";

import { quran } from "../../data/quran";
import "../../App.css";

export const ChaptersList = () => {
    return (
        <div>
            <hr />
            {quran.map((chapter, index) => (
                <Link to={`/chapter/${chapter.id}`} key={index}>
                    <div
                        className="ChaptersList"
                        onClick={() => console.log("click on ", chapter.id)}
                    >
                        <div className="ChaptersList-id">{chapter.id}</div>
                        <div className="ChaptersList-name">
                            {chapter.transliteration}
                        </div>
                        <div className="ChaptersList-ar-name">
                            {chapter.name}
                        </div>
                    </div>
                    <hr className="ChaptersList-line" />
                </Link>
            ))}
            <hr />
        </div>
    );
};
