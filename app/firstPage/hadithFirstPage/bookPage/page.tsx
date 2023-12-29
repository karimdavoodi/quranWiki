"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BookPage = () => {
    const searchParams = useSearchParams();
    const folder = searchParams.get("folder");
    const chapterNumber = Number(searchParams.get("chapterNumber"));
    const bookName = searchParams.get("bookName");

    const chapters = Array.from(
        { length: chapterNumber },
        (_, index) => index + 1
    );

    return (
        <div className="p-1">
            <div className="pt-8 text-yellow-500 ">{bookName}</div>
            <div className="p-3 text-left text-xs2">Chapters Ids</div>
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
                                chapter: id,
                            },
                        }}
                    >
                        <div
                            className="pl-2 text-yellow-300 text-xs3 font-serif"
                            key={index}
                        >
                            Chapter {id}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BookPage;
