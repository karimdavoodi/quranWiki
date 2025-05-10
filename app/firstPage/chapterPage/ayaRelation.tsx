import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { AyaSubmenuType, IRelation } from "../../models";
import LikeIcon from "../icons/thumb_up.svg";
import DislikeIcon from "../icons/thumb_down.svg";
import AddIcon from "../icons/add.svg";

import hadicBookNames from "@/public/data/hadith/bookNames.json";
import { quranEn } from "@/public/data/quran_en_clear";
import { clearTextFormat, quranChapterVerseToStr } from "@/app/util";

const MAX_TEXT_LENGTH = 200;

export const Relation = (props: {
  item: Omit<IRelation, "date" | "userHash">;
  chapterId: number;
  ayaId: number;
  key: string;
  type: AyaSubmenuType;
}) => {
  const [book, setBook] = useState(props.item.relateToBook);
  const [chapter, setChapter] = useState(props.item.relateToChapter);
  const [verse, setVerse] = useState(props.item.relateToNumber);
  const [liked, setLiked] = useState(props.item.like);
  const [text, setText] = useState("");
  const [disableAdd, setDisableAdd] = useState(false);
  const [showCompleteText, setShowCompleteText] = useState(false);

  const [bookNames, chapters, verses] = useMemo(() => {
    const bookNames: string[] = [""];
    let chapterNumbers = 114;
    const verseNumber = 300;
    if (props.type === "hadith") {
      bookNames.push(...hadicBookNames.map((item) => item.title));
      chapterNumbers = 100;
    }
    const chapters = Array.from(
      { length: chapterNumbers },
      (_, index) => index,
    );
    const verses = Array.from({ length: verseNumber }, (_, index) => index);
    return [bookNames, chapters, verses];
  }, [props.type]);

  const isNew =
    props.item.relateToChapter === 0 && props.item.relateToNumber === 0;

  const getBookText = useCallback(
    (type: AyaSubmenuType) => {
      if (chapter === 0 && verse === 0) {
        return;
      }
      if (type === "quran") {
        const id = quranChapterVerseToStr(chapter, verse);
        const newText = quranEn[id] ?? "";
        if (newText !== text) {
          setLimitedText(newText);
        }
      } else if (type === "hadith") {
        if ((book === "" || chapter === 0) && text !== "") {
          setText("");
          return;
        }
        const folder = hadicBookNames.find(
          (item: { title: string; folder: string; chapterNumber: number }) =>
            item.title === book,
        )?.folder;
        fetch(`/data/hadith/${folder}/${chapter}.json`)
          .then((resp) => resp.json())
          .then((chap) => {
            const newText = chap?.hadiths.find(
              (item: { id: number; english: { text: string } }) =>
                item.id === verse,
            )?.english.text;
            if (newText !== text) {
              setLimitedText(newText);
            }
          })
          .catch((err) => {
            console.log("Error on getting data", err);
          });
      }
    },
    [book, chapter, verse, text],
  );

  useEffect(() => {
    getBookText(props.type);
  }, [props.type, getBookText]);

  const setLimitedText = (realText: string) => {
    setText(clearTextFormat(realText));
  };

  const setLikedNumber = (newLike: number) => {
    setLiked(newLike);
    fetch(`/api/relation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterId: props.chapterId,
        ayaId: props.ayaId,
        type: props.type,
        relateToBook: book,
        relateToChapter: chapter,
        relateToNumber: verse,
        like: newLike,
      }),
    }).catch((e) => {
      console.log("Error on setting like", e);
    });
  };

  const addRelation = () => {
    if (!text || !chapter || !verse) {
      return;
    }
    if (props.type !== "quran" && !book) {
      return;
    }
    fetch(`/api/relation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterId: props.chapterId,
        ayaId: props.ayaId,
        type: props.type,
        relateToBook: book,
        relateToChapter: chapter,
        relateToNumber: verse,
        like: 0,
      }),
    }).catch((e) => {
      console.log("Error on setting like", e);
    });
    setDisableAdd(true);
  };

  const rowStyle = `text-xs2 flex flex-row items-center bg-gray-700 border border-gray-800`;
  const selectStyle = "bg-transparent border border-gray-600";
  const likeStyle = "text-menu text-xs1 text-center";
  const iconStyle = "cursor-pointer hover:border rounded border-yellow-400";

  const showAllText = showCompleteText || text.length < MAX_TEXT_LENGTH;
  return (
    <div className={rowStyle}>
      {isNew && (
        <div className="flex flex-col">
          {props.type === "hadith" && (
            <select
              className={selectStyle}
              disabled={props.item.relateToBook !== ""}
              defaultValue={book}
              onChange={(e) => setBook(e.target.value)}
            >
              {bookNames.map((bookName, index) => (
                <option value={bookName} key={index}>
                  {bookName}
                </option>
              ))}
            </select>
          )}
          {props.type === "quran" && (
            <select className={selectStyle} disabled={true}>
              <option value="Holy quran">Holy Quran</option>
            </select>
          )}
          <select
            className={selectStyle}
            disabled={props.item.relateToChapter !== 0}
            defaultValue={chapter}
            onChange={(e) => {
              setChapter(Number(e.target.value));
            }}
          >
            {chapters.map((chapter, index) => (
              <option value={chapter} key={index}>
                {chapter > 0 ? `Chapter ${chapter}` : ""}
              </option>
            ))}
          </select>
          <select
            className={selectStyle}
            disabled={props.item.relateToNumber !== 0}
            defaultValue={verse}
            onChange={(e) => setVerse(Number(e.target.value))}
          >
            {verses.map((verse, index) => (
              <option value={verse} key={index}>
                {verse || ""}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="inline-block w-full pl-1">
        {!isNew && (
          <div className="text-left text-menu">
            {book} {chapter}:{verse}
          </div>
        )}
        <div className="text-justify text-menu">
          {showAllText
            ? text
            : text.substring(0, MAX_TEXT_LENGTH - 20) + "... "}
          {!showAllText ? (
            <div
              className="text-xs2 inline-block text-menu cursor-pointer"
              onClick={() => {
                setShowCompleteText(true);
              }}
            >
              more
            </div>
          ) : null}
        </div>
      </div>
      <div className="ml-auto flex-col pr-1 pl-1 text-center">
        {!isNew && (
          <>
            <div>
              <div
                className={iconStyle}
                onClick={() => {
                  if (liked - props.item.like <= 0) {
                    setLikedNumber(liked + 1);
                  }
                }}
              >
                <LikeIcon width={"20px"} height={"20px"} />
              </div>
              <div className={likeStyle}>{liked}</div>
            </div>

            <div>
              <div
                className={iconStyle}
                onClick={() => {
                  if (liked - props.item.like >= 0) {
                    setLikedNumber(liked - 1);
                  }
                }}
              >
                <DislikeIcon width={"20px"} height={"20px"} />
              </div>
            </div>
          </>
        )}
        {isNew && !disableAdd && (
          <div className={iconStyle} onClick={() => addRelation()}>
            <AddIcon width={"20px"} height={"20px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Relation;
