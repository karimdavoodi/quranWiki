"use client";
import React, { useEffect, useState } from "react";
import BackIcon from "../icons/back.svg";
import { ArabicText } from "./arabicText";
import AyaMenu from "./ayaMenu";
import Translate from "./ayaTranslate";
import Link from "next/link";
import { startBmInterval } from "@/app/util";
import { Verse, Pages } from "../types";
import { getVerses } from "@/public/data/data";

// link page?id=1&item=1&lastId=1&lastItem=1

const ChapterPage = () => {
  const [showTranslate, setShowTranslate] = useState(-1);
  const [location, setLocation] = useState<Pages>({
    start: { chapter: 1, verse: 1 },
    end: { chapter: 1, verse: 1 },
  });

  const [settings, setSettings] = useState({
    textDisplay: "both", // "arabic", "english", or "both"
    showVerseMenu: true,
  });

  const [verses, setVerses] = useState<Verse[]>([]);
  useEffect(() => {
    const savedSettings = localStorage.getItem("quranSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings((prevSettings) => ({
        ...prevSettings,
        ...parsedSettings,
      }));
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id") || "1";
    const ayaId = searchParams.get("item") || "1";
    const lastId = searchParams.get("lastId") || id;
    const lastItem = searchParams.get("lastItem") || "0";
    const location: Pages = {
      start: { chapter: parseInt(id), verse: parseInt(ayaId) },
      end: { chapter: parseInt(lastId), verse: parseInt(lastItem) },
    };
    setLocation(location);
    const verses = getVerses(location);
    setVerses(verses);
    startBmInterval();
  }, []);

  return (
    <div className="p-1">
      <Link href="/firstPage" className="flex w-12 p-1">
        <BackIcon />
        <div className="text-xs2 text-gray-100-400">Back</div>
      </Link>
    
      {verses[0]?.id > 0 && (
        <div className="pb-3 font-['uthmanV2'] text-xs4">
          {verses[0]?.chapterId !== 1 && verses[0]?.chapterId !== 9
            ? "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ" + "\n"
            : ""}
        </div>
      )}

      {verses.map((aya, index) => (
        <div
          className="p-1"
          key={index}
          id={`item-${aya.id}`}
          data-item={"bookmarkable"}
        >
          {aya.id === 0 && (
            <div className="font-['uthmanV2'] text-xs4">
                {
                    parseStart(aya.text)
                }
                </div>
          )}

          {aya.id !== 0 && (
            <>
              {settings.showVerseMenu && (
                <AyaMenu chapterId={aya.chapterId!} ayaId={aya.id} />
              )}

              {settings.textDisplay !== "english" && (
                <div
                onClick={ () => {
                  if(showTranslate === aya.id) {
                    setShowTranslate(-1);
                  } else {
                    setShowTranslate(aya.id); 
                  }
                }
                }
                >
                  <ArabicText
                    text={aya.text}
                    id={aya.id}
                    chapter={aya.chapterId!}
                  />
                </div>
              )}
              {(settings.textDisplay !== "arabic"  || showTranslate === aya.id)&& (
                <>
                  <div>
                    <Translate chapterId={aya.chapterId!} ayaId={aya.id} />
                  </div>

                  <hr className="opacity-20" />
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const parseStart = (text: string) => {
    const parts = text.split(":");
    if(parts.length < 2) return text;
    return (
      <>
        <div className="font-['uthmanV2'] text-xs4 p-2">
        سورة {parts[1]}
        </div>
        <div className="font-['uthmanV2'] text-xs4">
        {parts[0]}
        </div>
      </>
    );
}

export default ChapterPage;
