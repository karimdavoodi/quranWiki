import React, { useState } from "react";
import { AyaSubmenuType } from "../../models";
import Book1Icon from "../icons/book1.svg";
import BookIcon from "../icons/book.svg";
import ShareIcon from "../icons/share.svg";
import CopyIcon from "../icons/copy.svg";
import SavedIcon from "../icons/bookmark.svg";
import PlayIcon from "../icons/play_circle.svg";
import TranslateIcon from "../icons/translate.svg";
import Translate from "./ayaTranslate";
import Relations from "./ayaRelations";
import { quranChapterVerseToStr } from "@/app/util";
import { featureBookmark } from "@/app/constant";

const related = false; // TODO: remove this line

const AyaMenu = (props: { chapterId: number; ayaId: number }) => {
  const [subMenu, setSubmenu] = useState<AyaSubmenuType>("");

  const iconStyle = "cursor-pointer p-1 hover:border border-yellow-500 rounded";
  const iconStyleSelected = "border border-yellow-500 rounded";
  const toolTipStyle =
    "absolute pt-5 pl-0 text-xs1 opacity-0 text-menu2 hover:opacity-100";

  const handleSubMenuClick = (menu: AyaSubmenuType) => {
    setSubmenu(subMenu !== menu ? menu : "");
  };

  const handleShareClick = (chapterId: number, ayaId: number) => {
    const url = `${window.location.origin}${window.location.pathname}?id=${chapterId}&item=${ayaId}`;
    if (navigator.share) {
      navigator.share({
        title: `Quran ${chapterId}:${ayaId}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      window.alert("Link copied to clipboard");
    }
  };

  const handlePlayAyaClick = (chapterId: number, ayaId: number) => {
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

  return (
    <div>
      <div className="flex pt-1 pl-1 pr-1">
        <div className="text-left pt-1 text-xs3 text-menu2">
          {props.chapterId}:{props.ayaId}
        </div>

        {related && (
          <>
            <div
              className={`${iconStyle} ${
                subMenu === "quran" ? iconStyleSelected : ""
              }`}
              onClick={() => handleSubMenuClick("quran")}
            >
              <div className={toolTipStyle}>Related Quran verses</div>
              <Book1Icon />
            </div>
            <div
              className={`${iconStyle} ${
                subMenu === "hadith" ? iconStyleSelected : ""
              }`}
              onClick={() => handleSubMenuClick("hadith")}
            >
              <div className={toolTipStyle}>Related Hadith</div>
              <BookIcon />
            </div>
          </>
        )}

        <div
          className={`${iconStyle} ${
            subMenu === "translate" ? iconStyleSelected : ""
          }`}
          onClick={() => handleSubMenuClick("translate")}
        >
          <div className={toolTipStyle}>English</div>
          <TranslateIcon />
        </div>
        <div
          className={iconStyle}
          onClick={() => handleShareClick(props.chapterId, props.ayaId)}
        >
          <div className={toolTipStyle}>
            {navigator["share"] ? "Share" : "Copy"}
          </div>
          {navigator["share"] ? <ShareIcon /> : <CopyIcon />}
        </div>
        {featureBookmark && (
          <div className={iconStyle}>
            <div className={toolTipStyle}>Bookmark</div>
            <SavedIcon />
          </div>
        )}
        <div
          className={iconStyle}
          onClick={() => handlePlayAyaClick(props.chapterId, props.ayaId)}
        >
          <div className={toolTipStyle}>Play Verse</div>
          <PlayIcon />
        </div>
      </div>
      {subMenu === "translate" && (
        <Translate chapterId={props.chapterId} ayaId={props.ayaId} />
      )}
      {(subMenu === "quran" || subMenu === "hadith") && (
        <Relations
          chapterId={props.chapterId}
          ayaId={props.ayaId}
          submenu={subMenu}
        />
      )}
    </div>
  );
};

export default AyaMenu;
