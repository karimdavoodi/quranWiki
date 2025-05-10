import React from "react";
import Link from "next/link";

import hadiths from "@/public/data/hadith/bookNames.json";

export const ChaptersList = () => {
  return (
    <div>
      <hr />
      {hadiths.map((book, index) => (
        <div key={index} className="w-2/3 inline-block">
          <Link
            href={{
              pathname: "/firstPage/hadithFirstPage/bookPage",
              query: {
                folder: book.folder,
                chapterNumber: book.chapterNumber,
                bookName: book.title,
                bookAuthor: book.author,
              },
            }}
          >
            <div className="p-1 flex hover:bg-bgHover">
              <h2 className="text-en font-serif text-xs3">
                {book.title}
              </h2>
            </div>
          </Link>
          <hr className="opacity-10 w-auto" />
        </div>
      ))}
    </div>
  );
};
