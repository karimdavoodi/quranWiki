import React from "react";

import { ReactComponent as LanguageIcon } from "../../icons/language-icon.svg";
import { ReactComponent as CommentIcon } from "../../icons/speech-bubble-icon.svg";
import { ReactComponent as ShareIcon } from "../../icons/share-line-icon.svg";
import { ReactComponent as SavedIcon } from "../../icons/bookmark-add-icon.svg";
import { ReactComponent as PlayIcon } from "../../icons/play-button-icon.svg";

import "../../App.css";

export const AyaMenu = (probs: { chapterId: number; ayaId: number }) => {
    return (
        <div>
            <div className="AyaArea-aya-menu">
                <div className="AyaArea-icon">
                    <CommentIcon />
                </div>
                <div className="AyaArea-icon">
                    <LanguageIcon />
                </div>
                <div className="AyaArea-icon">
                    <ShareIcon />
                </div>
                <div className="AyaArea-icon">
                    <SavedIcon />
                </div>
                <div className="AyaArea-icon">
                    <PlayIcon />
                </div>
            </div>
        </div>
    );
};

export default AyaMenu;
