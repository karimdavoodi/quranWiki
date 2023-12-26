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
            <div className="pt-8">{bookName}</div>
            <div className="p-3 text-left text-xs2">Chapters Ids</div>
            <hr className="opacity-10 pl-5" />

            {chapters.map((id, index) => (
                <div key={index}>
                    <Link
                        href={{
                            pathname:
                                "/firstPage/hadicFirstPage/bookPage/chapterPage",
                            query: {
                                folder: folder,
                                chapter: id,
                            },
                        }}
                    >
                        <div
                            className="pl-5 text-justify text-yellow-400"
                            key={index}
                        >
                            Chapter {id}
                        </div>
                    </Link>
                    <hr className="opacity-10 w-40 pl-5" />
                </div>
            ))}
        </div>
    );
};

export default BookPage;
