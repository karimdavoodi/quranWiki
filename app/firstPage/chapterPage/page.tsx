"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { quranArabic } from "@/public/data/quran_ar";
import { ArabicText } from "./arabicText";
import { AyaMenu } from "./ayaMenu";
import Translate from "./ayaTranslate";

const ChapterPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const chapter = quranArabic.find((chapter) => chapter.id.toString() === id);

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
                    <Translate chapterId={chapter?.id} ayaId={aya.id} />
                    <AyaMenu chapterId={chapter.id} ayaId={aya.id} />
                    <hr className="opacity-10" />
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
