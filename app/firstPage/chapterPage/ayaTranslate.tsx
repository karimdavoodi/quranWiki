import React from "react";
import { quranEn } from "@/public/data/quran_en_clear";
import { quranChapterVerseToStr } from "@/app/util";

const Translate = (probs: { chapterId: number; ayaId: number; textSize: "small" | "medium" | "large" }) => {
  const id = quranChapterVerseToStr(probs.chapterId, probs.ayaId);

    let textSizeClass = "text-xs3";
  if (probs.textSize === "small") textSizeClass = "text-xs2";
  if (probs.textSize === "large") textSizeClass = "text-xs4";

  return (
    <div className="flex flex-row">
      <div className={`${textSizeClass} text-left text-en flex flex-row`}>
        {quranEn[id]} ({probs.ayaId})
      </div>
    </div>
  );
};

export default Translate;
