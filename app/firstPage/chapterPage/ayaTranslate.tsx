import React from "react";
import { quranEn } from "@/public/data/quran_en_sahih";
import { quranChapterVerseToStr } from "@/app/util";

const Translate = (probs: { chapterId: number; ayaId: number }) => {
    const id = quranChapterVerseToStr(probs.chapterId, probs.ayaId);

    return (
        <div className="pl-0 pr-2 pt-1 text-xs3 text-justify text-gray-100">
            {quranEn[id]}
        </div>
    );
};

export default Translate;
