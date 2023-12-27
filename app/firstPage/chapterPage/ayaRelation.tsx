import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { AyaSubmenuType, IRelation } from "../../models";
import LikeIcon from "../icons/thumb_up.svg";
import DislikeIcon from "../icons/thumb_down.svg";
import AddIcon from "../icons/add.svg";

import hadicBookNames from "@/public/data/hadic/bookNames.json";
import bibleBookNames from "@/public/data/bibleBookNames.json";
import { quranEn } from "@/public/data/quran_en_sahih";
import { clearTextFormat, quranChapterVerseToStr } from "@/app/util";

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

    const [bookNames, chapters, verses] = useMemo(() => {
        let bookNames: string[] = [""];
        let chapterNumbers = 114;
        let verseNumber = 300;
        if (props.type === "hadic") {
            bookNames.push(...hadicBookNames.map((item) => item.title));
            chapterNumbers = 100;
        }
        if (props.type === "bible") {
            bookNames.push(...bibleBookNames);
            chapterNumbers = 150;
        }
        const chapters = Array.from(
            { length: chapterNumbers },
            (_, index) => index
        );
        const verses = Array.from({ length: verseNumber }, (_, index) => index);
        return [bookNames, chapters, verses];
    }, [props.type]);

    const isNew =
        props.item.relateToChapter === 0 && props.item.relateToNumber === 0;

    useEffect(() => {
        getBookText(props.type);
    }, [book, chapter, verse]);

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
            } else if (type === "hadic") {
                if ((book === "" || chapter === 0) && text !== "") {
                    setText("");
                    return;
                }
                const folder = hadicBookNames.find(
                    (item: {
                        title: string;
                        folder: string;
                        chapterNumber: number;
                    }) => item.title === book
                )?.folder;
                fetch(`/data/hadic/${folder}/${chapter}.json`)
                    .then((resp) => resp.json())
                    .then((chap) => {
                        const newText = chap?.hadiths.find(
                            (item: { id: number; english: { text: string } }) =>
                                item.id === verse
                        )?.english.text;
                        if (newText !== text) {
                            setLimitedText(newText);
                        }
                    })
                    .catch((err) => {
                        console.log("Error on getting data", err);
                    });
            } else if (type === "bible") {
                if ((book === "" || chapter === 0) && text !== "") {
                    setText("");
                    return;
                }
                fetch(`/data/bible/${book}.json`)
                    .then((resp) => resp.json())
                    .then((bible) => {
                        const newText = bible?.find(
                            (item: {
                                chapter: number;
                                verse: number;
                                text: string;
                            }) =>
                                item.chapter === chapter && item.verse === verse
                        )?.text;
                        if (newText !== text) {
                            setLimitedText(newText);
                        }
                    })
                    .catch((err) => {
                        console.log("Error on getting data", err);
                    });
            }
        },
        [book, chapter, verse, text]
    );

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

    const bgColor = "bg-gray-700";
    const rowStyle = `text-xs2 flex flex-row items-center ${bgColor} border border-gray-800`;
    const selectStyle = "bg-transparent border border-gray-600";
    const likeStyle = "text-yellow-400 text-xs1 text-center";
    const iconStyle = "cursor-pointer hover:border rounded border-yellow-400";
    // const toolTipStyle =
    //     "absolute pt-4 text-xs1 opacity-0 text-yellow-500 hover:opacity-100";

    return (
        <div className={rowStyle}>
            <div className="flex flex-col text-xs1">
                {(props.type === "bible" || props.type === "hadic") && (
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
            <textarea
                className="bg-transparent pl-1 pr-1 text-xs1 w-full text-justify"
                value={text}
                rows={4}
                readOnly
            />
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
                                <LikeIcon />
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
                                <DislikeIcon />
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
