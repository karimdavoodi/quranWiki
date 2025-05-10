import React from "react";
import Link from "next/link";

import { getChapterNames } from "@/public/data/data";

const chapterNames = getChapterNames();

export const ChaptersList = () => {
  return (
    <div>
      <hr />
      {chapterNames.map((chapter, index) => (
        <div key={index} className="w-56 inline-block">
          <Link
            href={{
              pathname: "/firstPage/chapterPage",
              query: { id: chapter.id },
            }}
          >
            <div className="p-1 flex hover:bg-bgHover">
              <div className="text-menu pr-2">{chapter.id}</div>
              <div className="text-en font-serif text-xs3">
                {chapter.nameEn}
              </div>
              <div className="text-ar ml-auto font-['uthmanV2']">
                {chapter.name}
              </div>
            </div>
          </Link>
          <hr className="opacity-10 w-auto" />
        </div>
      ))}
      <hr />
    </div>
  );
};
