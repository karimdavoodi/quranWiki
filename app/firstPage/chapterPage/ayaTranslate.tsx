import React from "react";
import { quranEn } from "@/public/data/quran_en_clear";
import { quranChapterVerseToStr } from "@/app/util";

const Translate = (probs: { chapterId: number; ayaId: number }) => {
    const id = quranChapterVerseToStr(probs.chapterId, probs.ayaId);

    return (
        <div>
            <div className="text-left text-xs1 text-gray-400">
                {probs.chapterId}:{probs.ayaId}
            </div>
            <div className="text-xs3 text-left text-gray-200">
                {quranEn[id]}
            </div>
        </div>
    );
};

export default Translate;
