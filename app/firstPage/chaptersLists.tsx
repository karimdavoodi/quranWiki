import React from "react";
import Link from "next/link";

import { quranArabic } from "@/public/data/quran_ar";

export const ChaptersList = () => {
    return (
        <div>
            <hr />
            {quranArabic.map((chapter, index) => (
                <div key={index} className="w-56 inline-block">
                    <Link
                        href={{
                            pathname: "/firstPage/chapterPage",
                            query: { id: chapter.id },
                        }}
                    >
                        <div className="p-1 flex hover:bg-[#4f5d39]">
                            <div className=" text-yellow-700 pr-2">
                                {chapter.id}
                            </div>
                            <div className="text-yellow-300 font-serif text-xs3">
                                {chapter.nameEn}
                            </div>
                            <div className="text-yellow-500 ml-auto font-['uthmanV2']">
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
