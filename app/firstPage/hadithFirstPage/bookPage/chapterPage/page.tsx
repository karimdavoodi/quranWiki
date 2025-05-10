"use client";
import React, { useEffect, useState } from "react";
import BackIcon from "../../../icons/back.svg";
import ShareIcon from "../../../icons/share.svg";

import { clearTextFormat, startBmInterval } from "@/app/util";
import Link from "next/link";

type HadicChapterType = {
  metadata: {
    english: {
      title: string;
      author?: string;
      introduction?: string;
    };
  };
  hadiths: Array<{
    id: number;
    chapterId: number;
    english: {
      text: string;
      narrator: string;
    };
  }>;
};
const ChapterPage = () => {
  const [folder, setFolder] = useState("");
  const [chapterNumber, setChapterNumber] = useState(0);
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  const [bookIntroduction, setBookIntroduction] = useState("");
  const [hadiths, setHadics] = useState<HadicChapterType["hadiths"]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setChapterNumber(Number(searchParams.get("chapterNumber")) ?? 0);
    setBookName(searchParams.get("bookName") ?? "");
    setBookAuthor(searchParams.get("bookAuthor") ?? "");
    const chapterId = searchParams.get("chapterId") ?? "0";
    const folder = searchParams.get("folder") ?? "";
    setFolder(folder);

    fetch(`/data/hadith/${folder}/${chapterId}.json`)
      .then((res) => res.json())
      .then((data: HadicChapterType) => {
        setBookIntroduction(data?.metadata?.english?.introduction || "");
        setHadics(data?.hadiths || []);
        const hadithId = searchParams.get("item");
        if (hadithId) {
          setTimeout(() => {
            const element = document.getElementById(`item-${hadithId}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 1000);
        }
        startBmInterval();
      });
  }, []);

  return (
    <div className="p-1">
      <Link
        href={{
          pathname: "/firstPage/hadithFirstPage/bookPage",
          query: {
            folder: folder,
            chapterNumber: chapterNumber,
            bookName: bookName,
            bookAuthor: bookAuthor,
          },
        }}
        className="flex w-12 p-1"
      >
        <BackIcon />
        <div className="text-xs2 text-menu">Back</div>
      </Link>

      <div className="pt-7 p-3 text-left font-bold text-menu2">
        <h1 className="flex text-xs3">
          <div>Hadith Book: </div>
          <h2 className="text-menu pl-1">{bookName}</h2>
        </h1>
        <div className="text-xs1">
          <div className="flex">
            <div>Author: </div>
            <h3 className="text-menu pl-1">{bookAuthor}</h3>
          </div>
          <div className="flex">
            <div>Topic: </div>
            <h3 className="text-menu pl-1">{bookIntroduction}</h3>
          </div>
        </div>
      </div>
      <hr className="opacity-10 w-40 pl-5" />

      {hadiths.map((hadith, index) => (
        <div
          key={index}
          className="p-2 text-justify"
          id={`item-${hadith.id}`}
          data-item={"bookmarkable"}
        >
          <div className="flex">
            <div
              className="cursor-pointer p-1 hover:border border-yellow-500 rounded"
              onClick={() => share(hadith.id)}
            >
              <ShareIcon className="w-3" />
            </div>
            <h4 className="pl-1 pt-2 text-xs1 text-menu">
              Chapter {hadith.chapterId}, Hadith {hadith.id}
            </h4>
          </div>
          <div className=" text-xs1 text-en">
            {hadith.english.narrator}
          </div>
          <div className=" text-xs2 text-ar">
            {clearTextFormat(hadith.english.text)}
          </div>
          <hr className="opacity-30  pl-5" />
        </div>
      ))}
    </div>
  );
};

const share = (hadithId: number) => {
  let url = "";
  if (window.location.href.includes("item")) {
    url = window.location.href.replace(/item=\d+/, `item=${hadithId}`);
  } else {
    url = `${window.location.href}&item=${hadithId}`;
  }
  if (navigator.share) {
    navigator.share({
      title: `Hadith ${hadithId}`,
      url,
    });
  } else {
    navigator.clipboard.writeText(url);
    window.alert("Link copied to clipboard");
  }
};

export default ChapterPage;
