import React from "react";
import { quranEn } from "@/public/data/quran_en_clear";
import { quranChapterVerseToStr } from "@/app/util";

const Translate = (probs: { chapterId: number; ayaId: number }) => {
    const id = quranChapterVerseToStr(probs.chapterId, probs.ayaId);

    return (
        <div>
            <div className="text-xs3 text-left text-orange-600 flex flex-row">
                {quranEn[id]} 
                
               <span className="ml-1"></span>
               <div className="text-xs1 pt-1 text-orange-400">  ({probs.ayaId})</div>
            </div>
        </div>
    );
};

export default Translate;
