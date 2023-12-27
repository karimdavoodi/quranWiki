"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
    const [hadics, setHadics] = useState<HadicChapterType["hadiths"]>([]);
    const searchParams = useSearchParams();
    const folder = searchParams.get("folder");
    const chapter = Number(searchParams.get("chapter"));

    useEffect(() => {
        fetch(`/data/hadic/${folder}/${chapter}.json`)
            .then((res) => res.json())
            .then((data: HadicChapterType) => {
                setBookTitle(data?.metadata?.english?.title || "");
                setBookAuthor(data?.metadata?.english?.author || "");
                setBookIntroduction(
                    data?.metadata?.english?.introduction || ""
                );
                setHadics(data?.hadiths || []);
            });
    }, [folder, chapter]);

    return (
        <div className="p-1">
            <div className="p-3 text-left text-xs3 font-bold text-gray-300">
                <div className="flex">
                    <div>Book: </div>
                    <div className="text-yellow-400 pl-1">{bookTitle}</div>
                </div>
                <div className="text-xs1">
                    <div className="flex">
                        <div>Author: </div>
                        <div className="text-yellow-500 pl-1">{bookAuthor}</div>
                    </div>
                    <div className="flex">
                        <div>Topic: </div>
                        <div className="text-yellow-500 pl-1">
                            {bookIntroduction}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="opacity-10 w-40 pl-5" />

            {hadics.map((hadic, index) => (
                <div key={index} className="p-2 text-justify">
                    <div className=" text-xs1 text-yellow-400">
                        Chapter {hadic.chapterId}, Hadic {hadic.id}
                    </div>
                    <div className=" text-xs1 text-gray-400">
                        {hadic.english.narrator}
                    </div>
                    <div className=" text-xs2 text-gray-200">
                        {clearTextFormat(hadic.english.text)}
                    </div>
                    <hr className="opacity-30  pl-5" />
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
