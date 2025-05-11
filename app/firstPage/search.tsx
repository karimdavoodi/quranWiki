"use client";
import React, { useEffect, useState } from "react";
import { Ref } from "./types";
import { getJuzVerses, getPagesVerses } from "@/public/data/data";
import { parseSearchInput } from "../util";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedInput = localStorage.getItem("searchInput") || "";
      setSearchInput(savedInput);
    }
  }, []);

  return (
    <div className="inline-flex p-2 text-xs1">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setSearchInput(value);
        }}
        placeholder="ex: 2:8, p2, p1:1, j1, hajj"
        className="border border-gray-300 bg-bgHover text-menu rounded p-1"
        onKeyDown={(e) => {
          const value = e.currentTarget.value.trim();
          if (e.key === "Enter" && value.length > 0) {
            const ref = parseSearchInput(value);
            if (ref) {
              localStorage.setItem("searchInput", value);
              gotoPage(ref);
            }
          }
        }}
      />
    </div>
  );
};

const gotoPage = (ref: Ref) => {
  switch (ref.type) {
    case "chapter":
      window.location.href = `firstPage/chapterPage?id=${ref.start}&item=${ref.end}`;
      break;
    case "jozz":
      {
        const loc = getJuzVerses(ref.start);
        window.location.href = `firstPage/chapterPage?id=${loc.start.chapter}&item=${loc.start.verse}&lastId=${loc.end.chapter}&lastItem=${loc.end.verse}`;
      }
      break;
    case "page":
      {
        const loc = getPagesVerses(ref.start, ref.end || ref.start);
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
