import React from "react";
import { useParams } from "react-router-dom";

import { quran } from "../../data/quran";
import { ArabicText } from "./arabicText";
import { AyaMenu } from "./ayaMenu";

import "./style.css";

const ChapterPage = () => {
    const { id } = useParams();
    const chapter = quran.find((chapter) => chapter.id.toString() === id);

    return (
        <div className="ChapterPage">
            <div className="AyaArea-besm">
                {chapter?.id !== 1 && chapter?.id !== 9
                    ? "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                    : ""}
            </div>
            {chapter?.verses.map((aya, index) => (
                <div className="AyaArea" key={index}>
                    <ArabicText text={aya.text} id={aya.id} />
                    <AyaMenu chapterId={chapter.id} ayaId={aya.id} />
                    <hr className="AyaArea-hr" />
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
