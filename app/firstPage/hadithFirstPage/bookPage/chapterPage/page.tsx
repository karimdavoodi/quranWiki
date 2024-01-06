"use client";
import React, { useEffect, useState } from "react";

import { clearTextFormat } from "@/app/util";

type HadicChapterType = {
    metadata: {
        english: {
            title: string;
            author?: string;
            introduction?: string;
        };
    };
    hadiths: Array<{
        id: number;
        chapterId: number;
        english: {
            text: string;
            narrator: string;
        };
    }>;
};
const ChapterPage = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookIntroduction, setBookIntroduction] = useState("");
    const [hadiths, setHadics] = useState<HadicChapterType["hadiths"]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const folder = searchParams.get("folder");
        const chapter = searchParams.get("chapter");

        fetch(`/data/hadith/${folder}/${chapter}.json`)
            .then((res) => res.json())
            .then((data: HadicChapterType) => {
                setBookTitle(data?.metadata?.english?.title || "");
                setBookAuthor(data?.metadata?.english?.author || "");
                setBookIntroduction(
                    data?.metadata?.english?.introduction || ""
                );
                setHadics(data?.hadiths || []);
            });
    }, []);

    return (
        <div className="p-1">
            <div className="p-3 text-left text-xs3 font-bold text-gray-300">
                <h1 className="flex">
                    <div>Book: </div>
                    <h2 className="text-yellow-400 pl-1">{bookTitle}</h2>
                </h1>
                <div className="text-xs1">
                    <div className="flex">
                        <div>Author: </div>
                        <h3 className="text-yellow-500 pl-1">{bookAuthor}</h3>
                    </div>
                    <div className="flex">
                        <div>Topic: </div>
                        <h3 className="text-yellow-500 pl-1">
                            {bookIntroduction}
                        </h3>
                    </div>
                </div>
            </div>
            <hr className="opacity-10 w-40 pl-5" />

            {hadiths.map((hadith, index) => (
                <div key={index} className="p-2 text-justify">
                    <h4 className=" text-xs1 text-yellow-400">
                        Chapter {hadith.chapterId}, Hadith {hadith.id}
                    </h4>
                    <div className=" text-xs1 text-gray-400">
                        {hadith.english.narrator}
                    </div>
                    <div className=" text-xs2 text-gray-200">
                        {clearTextFormat(hadith.english.text)}
                    </div>
                    <hr className="opacity-30  pl-5" />
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
