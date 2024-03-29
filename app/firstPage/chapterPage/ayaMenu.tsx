"use client";
import React, { useState } from "react";

import Book1Icon from "../icons/book1.svg";
import BookIcon from "../icons/book.svg";
import ShareIcon from "../icons/share.svg";
import CopyIcon from "../icons/copy.svg";
import SavedIcon from "../icons/bookmark.svg";
import PlayIcon from "../icons/play_circle.svg";
import DateIcon from "../icons/calendar.svg";
import type { AyaSubmenuType } from "../../models";

import Translate from "./ayaTranslate";
import Relations from "./ayaRelations";
import AyaDate from "./ayaDate";
import { quranChapterVerseToStr } from "@/app/util";
import { featureAyaDate, featureBookmark } from "@/app/constant";

export const AyaMenu = (probs: { chapterId: number; ayaId: number }) => {
    const [subMenu, setSubmenu] = useState<AyaSubmenuType>("");

    const iconStyle =
        "cursor-pointer p-1 hover:border border-yellow-500 rounded";
    const iconStyleSeleceted = "border border-yellow-500 rounded";
    const toolTipStyle =
        "absolute pt-5 pl-0 text-xs1 opacity-0 text-yellow-500 hover:opacity-100";
    return (
        <div>
            <div className="flex p-1">
                <div
                    className={
                        iconStyle +
                        ` ${subMenu === "quran" ? iconStyleSeleceted : ""}`
                    }
                    onClick={() =>
                        setSubmenu(subMenu !== "quran" ? "quran" : "")
                    }
                >
                    <div className={toolTipStyle}>Related Quran verses</div>
                    <Book1Icon />
                </div>
                <div
                    className={
                        iconStyle +
                        ` ${subMenu === "hadith" ? iconStyleSeleceted : ""}`
                    }
                    onClick={() =>
                        setSubmenu(subMenu !== "hadith" ? "hadith" : "")
                    }
                >
                    <div className={toolTipStyle}>Related Hadith</div>
                    <BookIcon />
                </div>
                <div
                    className={
                        iconStyle +
                        ` ${subMenu === "bible" ? iconStyleSeleceted : ""}`
                    }
                    onClick={() =>
                        setSubmenu(subMenu !== "bible" ? "bible" : "")
                    }
                >
                    <div className={toolTipStyle}>Related Bible verses</div>
                    <BookIcon />
                </div>
                <div
                    className={iconStyle}
                    onClick={() => share(probs.chapterId, probs.ayaId)}
                >
                    <div className={toolTipStyle}>
                        {navigator["share"] ? "Share" : "Copy"}
                    </div>
                    {navigator["share"] ? <ShareIcon /> : <CopyIcon />}
                </div>
                {featureAyaDate && (
                    <div
                        className={iconStyle}
                        onClick={() =>
                            setSubmenu(subMenu !== "date" ? "date" : "")
                        }
                    >
                        <div className={toolTipStyle}>History</div>
                        <DateIcon />
                    </div>
                )}
                {featureBookmark && (
                    <>
                        <div className={iconStyle}>
                            <div className={toolTipStyle}>Bookmark</div>
                            <SavedIcon />
                        </div>
                    </>
                )}
                <div
                    className={iconStyle}
                    onClick={() => playAya(probs.chapterId, probs.ayaId)}
                >
                    <div className={toolTipStyle}>Play Verse</div>
                    <PlayIcon />
                </div>
            </div>
            {subMenu === "translate" && (
                <Translate chapterId={probs.chapterId} ayaId={probs.ayaId} />
            )}
            {subMenu === "date" && (
                <AyaDate chapterId={probs.chapterId} ayaId={probs.ayaId} />
            )}
            {(subMenu === "quran" ||
                subMenu === "bible" ||
                subMenu === "hadith") && (
                <Relations
                    chapterId={probs.chapterId}
                    ayaId={probs.ayaId}
                    submenu={subMenu}
                />
            )}
        </div>
    );
};

const share = (chapterId: number, ayaId: number) => {
    const url = `${window.location.origin}/${window.location.pathname}?id=${chapterId}&item=${ayaId}`;
    if (navigator.share) {
        navigator.share({
            title: `Quran ${chapterId}:${ayaId}`,
            url,
        });
        return;
    } else {
        navigator.clipboard.writeText(url);
        window.alert("Link copied to clipboard");
    }
};

const playAya = (chapterId: number, ayaId: number) => {
    const id = quranChapterVerseToStr(chapterId, ayaId);
    const url = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${id}.mp3`;
    const audioElement = getAudioElement();
    audioElement.src = url;
};

const getAudioElement = () => {
    const elementId = "audio-element";
    let audioElement = document.getElementById(elementId) as HTMLAudioElement;
    if (audioElement) {
        return audioElement;
    }

    audioElement = document.createElement("audio") as HTMLAudioElement;
    audioElement.id = elementId;
    audioElement.autoplay = true;
    document.body.appendChild(audioElement);
    return audioElement;
};

export default AyaMenu;
