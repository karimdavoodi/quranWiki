"use client";
import React, { useEffect, useState } from "react";
import BackIcon from "../icons/back.svg";
import { quranArabic } from "@/public/data/quran_ar";
import { ArabicText } from "./arabicText";
import { AyaMenu } from "./ayaMenu";
import Translate from "./ayaTranslate";
import Link from "next/link";
import { startBmInterval } from "@/app/util";

const ChapterPage = () => {
    const [id, setId] = useState("0");
    const [showTranslate, setShowTranslate] = useState(true);
    const [showArabic, setShowArabic] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setId(searchParams.get("id") || "0");
        const ayaId = searchParams.get("item");
        if (ayaId) {
            setTimeout(() => {
                const element = document.getElementById(`item-${ayaId}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 1000);
        }
        startBmInterval();
    }, []);

    const chapter = quranArabic.find((chapter) => chapter.id.toString() === id);

    return (
        <div className="p-1">
            <Link href="/firstPage" className="flex w-12 p-1">
                <BackIcon />
                <div className="text-xs2 text-gray-100-400">Back</div>
            </Link>
            <h1 className="font-['uthmanV2'] text-white text-lx pt-5 pb-2">
                سورة {chapter?.name}
            </h1>
            <div className="pb-3 font-['uthmanV2'] text-xs4">
                {chapter?.id !== 1 && chapter?.id !== 9
                    ? "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
                    : ""}
            </div>
            {chapter?.verses.map((aya, index) => (
                <div
                    className="p-1"
                    key={index}
                    id={`item-${aya.id}`}
                    data-item={"bookmarkable"}
                >
                    {showArabic && (
                        <div
                            onTouchStart={(e) => {
                                if (e.touches?.length > 2) {
                                    setShowTranslate(!showTranslate);
                                }
                            }}
                        >
                            <ArabicText
                                text={aya.text}
                                id={aya.id}
                                chapter={id}
                            />
                        </div>
                    )}
                    {showTranslate && (
                        <>
                            <div
                                onTouchStart={(e) => {
                                    if (e.touches?.length > 2) {
                                        setShowArabic(!showArabic);
                                    }
                                }}
                            >
                                <Translate
                                    chapterId={chapter?.id}
                                    ayaId={aya.id}
                                />
                            </div>

                            <AyaMenu chapterId={chapter.id} ayaId={aya.id} />
                            <hr className="opacity-20" />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChapterPage;
