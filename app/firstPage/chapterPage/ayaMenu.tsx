"use client";
import React, { useState } from "react";

import LanguageIcon from "../../../icons/language-icon.svg";
import CommentIcon from "../../../icons/speech-bubble-icon.svg";
import ShareIcon from "../../../icons/share-line-icon.svg";
import SavedIcon from "../../../icons/bookmark-add-icon.svg";
import PlayIcon from "../../../icons/play-button-icon.svg";
import Comments from "./comments";

export const AyaMenu = (probs: { chapterId: number; ayaId: number }) => {
    const [activeComment, setActiveComment] = useState(false);
    const [activeTranslate, setActiveTraslate] = useState(false);

    const clickHandler = (id: string) => {
        if (id === "comment") {
            if (activeTranslate) {
                setActiveTraslate(false);
            }
            setActiveComment(!activeComment);
        } else if (id === "translate") {
            if (activeComment) {
                setActiveComment(false);
            }
            setActiveTraslate(!activeTranslate);
        }
    };
    const iconStyle =
        "cursor-pointer p-1 hover:border border-green-600 rounded";
    return (
        <div>
            <div className="flex p-1">
                <div
                    className={iconStyle}
                    onClick={() => clickHandler("comment")}
                >
                    <CommentIcon />
                </div>
                <div
                    className={iconStyle}
                    onClick={() => clickHandler("translate")}
                >
                    <LanguageIcon />
                </div>
                <div className={iconStyle}>
                    <ShareIcon />
                </div>
                <div className={iconStyle}>
                    <SavedIcon />
                </div>
                <div
                    className={iconStyle}
                    onClick={() => playAya(probs.chapterId, probs.ayaId)}
                >
                    <PlayIcon />
                </div>
            </div>
            {(activeComment || activeTranslate) && (
                <Comments isComment={activeComment} />
            )}
        </div>
    );
};

const playAya = (chapterId: number, ayaId: number) => {
    const chapterStr = chapterId.toString().padStart(3, "0");
    const ayaStr = ayaId.toString().padStart(3, "0");
    const id = chapterStr + ayaStr;
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
    console.log(`created audio element ${elementId}`);
    return audioElement;
};

export default AyaMenu;
