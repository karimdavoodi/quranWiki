"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BookPage = () => {
    const searchParams = useSearchParams();
    const folder = searchParams.get("folder");
    const chapterNumber = Number(searchParams.get("chapterNumber"));
    const bookName = searchParams.get("bookName");
    const bookAuthor = searchParams.get("bookAuthor");

    const chapters = Array.from(
        { length: chapterNumber },
        (_, index) => index + 1
    );

    return (
        <div className="p-1 font-serif">
            <h1 className="pt-8  text-yellow-500 ">{bookName}</h1>
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
                                chapter: id,
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
