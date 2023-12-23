"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { quran } from "../../../data/quran";
import { ArabicText } from "./arabicText";
import { AyaMenu } from "./ayaMenu";

const ChapterPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    console.log(`id is ${id}`);

    const chapter = quran.find((chapter) => chapter.id.toString() === id);

    return (
        <div className="p-1">
            <div className="pb-3 font-['uthmanV2']">
                {chapter?.id !== 1 && chapter?.id !== 9
                    ? "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                    : ""}
            </div>
            {chapter?.verses.map((aya, index) => (
                <div className="p-1" key={index}>
                    <ArabicText text={aya.text} id={aya.id} />
                    <AyaMenu chapterId={chapter.id} ayaId={aya.id} />
                    <hr className="opacity-10" />
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
