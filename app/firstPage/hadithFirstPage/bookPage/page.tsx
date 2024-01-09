"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BackIcon from "../../icons/back.svg";

const BookPage = () => {
    const [folder, setFolder] = useState("");
    const [chapterNumber, setChapterNumber] = useState(0);
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFolder(searchParams.get("folder") ?? "");
        setChapterNumber(Number(searchParams.get("chapterNumber")) ?? 0);
        setBookName(searchParams.get("bookName") ?? "");
        setBookAuthor(searchParams.get("bookAuthor") ?? "");
    }, []);

    const chapters = Array.from(
        { length: chapterNumber },
        (_, index) => index + 1
    );

    return (
        <div className="p-1 font-serif">
            <Link href="/firstPage/hadithFirstPage" className="flex w-12 p-1">
                <BackIcon />
                <div className="text-xs2 text-gray-100-400">Back</div>
            </Link>

            <h1 className="pt-8 text-green-300 ">{bookName}</h1>
            <h2 className=" pb-3 text-yellow-600 text-xs2">{bookAuthor}</h2>
            <hr className="opacity-10 pl-5" />

            {chapters.map((id, index) => (
                <div
                    key={index}
                    className="w-32 inline-block hover:bg-[#4f5d39]"
                >
                    <Link
                        href={{
                            pathname:
                                "/firstPage/hadithFirstPage/bookPage/chapterPage",
                            query: {
                                folder: folder,
                                chapterId: id,
                                chapterNumber: chapterNumber,
                                bookName: bookName,
                                bookAuthor: bookAuthor,
                            },
                        }}
                    >
                        <h2
                            className="pl-2 text-yellow-300 text-xs3"
                            key={index}
                        >
                            Chapter {id}
                        </h2>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BookPage;
