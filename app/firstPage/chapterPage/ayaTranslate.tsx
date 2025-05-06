import React from "react";
import { quranEn } from "@/public/data/quran_en_clear";
import { quranChapterVerseToStr } from "@/app/util";

const Translate = (probs: { chapterId: number; ayaId: number }) => {
  const id = quranChapterVerseToStr(probs.chapterId, probs.ayaId);

  return (
    <div className="flex flex-row">
      <div className="text-xs3 text-left text-yellow-600 flex flex-row">
        {quranEn[id]} ({probs.ayaId})  
      </div>
    </div>
  );
};

export default Translate;
