"use client";
import React, { useEffect, useState } from "react";
import { Ref } from "./types";
import { getJuzVerses, getPagesVerses } from "@/public/data/data";

export const Search = () => {
  const [bookmark, setBookmark] = useState("");

  const iconStyle = "cursor-pointer inline-flex hover:bg-[#4f5d39]";
  const toolTipStyle = "pr-3 text-xs1 text-white";

  useEffect(() => {
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark) {
      setBookmark(bookmark);
    }
  }, []);

  return (
    <div className="inline-flex p-2 text-xs1">
      <input
        type="text"
        placeholder="ex: 2:8, p2, p1:1, j1, hajj"
        className="border border-gray-300 bg-gray-500 rounded p-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = e.currentTarget.value;
            const ref = parseRef(value);
            ref && gotoPage(ref);
          }
        }}
      />
    </div>
  );
};


export const parseRef = (searchText: string): Ref | undefined => {
  // chapter reg: \d[:\d] \w
  // Jozz    reg: j[\d]
  // page    reg: p\d[:\d]
  const chapterRegex = /^(?:(\d+)(?::(\d+))?|\w+)/;
  const jozzRegex = /^j(\d+)/i;
  const pageRegex = /^p(\d+)(?::p?(\d+))?/i;

  if (pageRegex.test(searchText)) {
    const match = searchText.match(pageRegex);
    return {
      type: "page",
      start: match?.[1] || "",
      end: match?.[2] ? match[2] : undefined,
      value: searchText,
    };
  } else if (jozzRegex.test(searchText)) {
    return {
      type: "jozz",
      start: searchText.match(jozzRegex)?.[1] || "",
      value: searchText,
    };
  } else if (chapterRegex.test(searchText)) {
    return {
      type: "chapter",
      start: searchText.match(chapterRegex)?.[1] || "1",
      end: searchText.match(chapterRegex)?.[2] || "1",
      value: searchText,
    };
  }
  return undefined;
};

const gotoPage = (ref: Ref) => {
  const start = parseInt(ref.start);
  const end = ref.end ? parseInt(ref.end) : start;

  switch (ref.type) {
    case "chapter":
      window.location.href = `firstPage/chapterPage?id=${ref.start}&item=${ref.end}`;
      break;
    case "jozz":
      {
        const loc = getJuzVerses(start);
        window.location.href = `firstPage/chapterPage?id=${loc.start.chapter}&item=${loc.start.verse}&lastId=${loc.end.chapter}&lastItem=${loc.end.verse}`;
      }
      break;
    case "page":
      {
        const loc = getPagesVerses(start, end);
        window.location.href = `firstPage/chapterPage?id=${loc.start.chapter}&item=${loc.start.verse}&lastId=${loc.end.chapter}&lastItem=${loc.end.verse}`;
      }
      break;
    default:
      console.log("Invalid reference type");
      return;
  }
  console.log("Navigating to:", ref);
};


export default Search;
