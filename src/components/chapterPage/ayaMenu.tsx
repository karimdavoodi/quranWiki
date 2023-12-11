import React, { useState } from "react";

import { ReactComponent as LanguageIcon } from "../../icons/language-icon.svg";
import { ReactComponent as CommentIcon } from "../../icons/speech-bubble-icon.svg";
import { ReactComponent as ShareIcon } from "../../icons/share-line-icon.svg";
import { ReactComponent as SavedIcon } from "../../icons/bookmark-add-icon.svg";
import { ReactComponent as PlayIcon } from "../../icons/play-button-icon.svg";
import Comments from "./comments";

import "./style.css";

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

    return (
        <div>
            <div className="AyaArea-aya-menu">
                <div
                    className="AyaArea-icon"
                    onClick={() => clickHandler("comment")}
                >
                    <CommentIcon />
                </div>
                <div
                    className="AyaArea-icon"
                    onClick={() => clickHandler("translate")}
                >
                    <LanguageIcon />
                </div>
                <div className="AyaArea-icon">
                    <ShareIcon />
                </div>
                <div className="AyaArea-icon">
                    <SavedIcon />
                </div>
                <div
                    className="AyaArea-icon"
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
