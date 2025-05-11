"use client";
import { getChapterNames } from "../public/data/data";
import { Ref } from "./firstPage/types";

export const quranChapterVerseToStr = (
  chapter: number | string,
  verse: number | string
) => {
  const chap: string =
    typeof chapter === "number" ? chapter.toString() : chapter;
  const ver: string = typeof verse === "number" ? verse.toString() : verse;
  return `${chap.padStart(3, "0")}${ver.padStart(3, "0")}`;
};

export const clearTextFormat = (text: string) => {
  if (!text) {
    return "";
  }
  return text.replace(/\n/g, " ").replace(/\t/g, " ").replace(/\s+/g, " ");
};

export const startBmInterval = () => {
  const intervalFunction = () => {
    const getTopIfisInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight);
      return isInView ? rect.top : -1;
    };

    const divElements = document.querySelectorAll('[data-item="bookmarkable"]');

    const elements: Element[] = [];
    divElements.forEach((div) => {
      const top = getTopIfisInViewport(div);
      if (top !== -1) {
        elements.push(div);
      }
    });
    elements.sort();
    if (elements.length > 0) {
      const element = elements[0];
      const id = element.getAttribute("id")?.split("-")[1] || "1";
      let url = "";
      if (window.location.href.includes("item")) {
        url = window.location.href.replace(/item=\d+/, `item=${id}`);
      } else {
        url = `${window.location.href}&item=${id}`;
      }
      localStorage.setItem("bookmark", url);
    }
  };

  let internalId = parseInt(localStorage.getItem("bmIntervalRunning") || "0");
  if (internalId) {
    window.clearInterval(internalId);
  }
  internalId = window.setInterval(intervalFunction, 2000);
  localStorage.setItem("bmIntervalRunning", `${internalId}`);
};

export const applyTheme = () => {
  if (typeof window === "undefined") return
    const colors = {
    bgColor: "rgb(0, 50, 0)", // dark green
    bgHoverColor: "rgb(0, 80, 0)", // forest green
    textMenuColor: "rgb(173, 216, 230)", // light blue
    textMenu2Color: "rgb(0, 0, 0)", // black
    textEnColor: "rgb(255, 255, 0)", // yellow
    textArColor: "rgb(255, 215, 0)", // gold
  };
  try {
    const config = JSON.parse(localStorage.getItem("quranSettings") || "{}");
    if (config?.theme) {
        console.log("config.theme", config.theme);
      switch (config.theme) {
        case "green-yellow":
          colors.bgColor = "rgb(0, 50, 0)"; // dark green
          break;
        case "gray-yellow":
          colors.bgColor = "rgb(60, 60, 60)"; // gray
          colors.bgHoverColor = "rgb(90, 90, 90)"; // light gray
          break;
        case "blue-green":
          colors.bgColor = "rgb(0, 50, 100)"; // dark blue
          colors.bgHoverColor = "rgb(0, 80, 150)"; // forest blue
          colors.textMenuColor = "rgb(173, 216, 230)"; // light blue
          colors.textMenu2Color = "rgb(173, 216, 230)"; // light blue
          colors.textEnColor = "rgb(50, 255, 0)"; // green
          colors.textArColor = "rgb(100, 255, 0)"; // green
          break;
        case "white-black":
          colors.bgColor = "rgb(255, 255, 255)"; // white
          colors.bgHoverColor = "rgb(211, 211, 211)"; // light gray
          colors.textMenuColor = "rgb(0, 0, 0)"; // black
          colors.textMenu2Color = "rgb(0, 0, 0)"; // black
          colors.textEnColor = "rgb(0, 0, 0)"; // black
          colors.textArColor = "rgb(0, 0, 0)"; // black
          break;
        case "gray-white":
          colors.bgColor = "rgb(60, 60, 60)"; // gray
          colors.bgHoverColor = "rgb(34, 34, 34)"; // dark gray
          colors.textMenuColor = "rgb(255, 255, 255)"; // white
          colors.textMenu2Color = "rgb(255, 255, 255)"; // white
          colors.textEnColor = "rgb(255, 255, 255)"; // white
          colors.textArColor = "rgb(255, 255, 255)"; // white
          break;
        default:
          colors.bgColor = "rgb(0, 100, 0)"; // dark green
      }
    }
  } catch (error) {
    console.error("Error parsing theme settings:", error);
  }
  document.documentElement.style.setProperty("--bg-color", colors.bgColor);
  document.documentElement.style.setProperty(
    "--bg-hover-color",
    colors.bgHoverColor
  );
  document.documentElement.style.setProperty(
    "--text-menu-color",
    colors.textMenuColor
  );
  document.documentElement.style.setProperty(
    "--text-menu2-color",
    colors.textMenu2Color
  );
  document.documentElement.style.setProperty(
    "--text-en-color",
    colors.textEnColor
  );
  document.documentElement.style.setProperty(
    "--text-ar-color",
    colors.textArColor
  );
  console.debug("Theme applied:", colors);
};

export const parseSearchInput = (searchText: string): Ref | undefined => {
  // chapter reg: \d[:\d] \w
  // Jozz    reg: j[\d]
  // page    reg: p\d[:\d]
  // chapter name reg: \w
  const chapterRegex = /^(?:(\d+)(?::(\d+))?)/;
  const jozzRegex = /^j(\d+)/i;
  const pageRegex = /^p(\d+)(?::p?(\d+))?/i;
  if (pageRegex.test(searchText)) {
    const match = searchText.match(pageRegex);
    const start = parseInt(match?.[1] || "1");
    const end = match?.[2] ? parseInt(match[2]) : start;
    if ((end && end < start) || start < 1 || start > 604) {
      console.error("Wrong page range");
      return undefined;
    }
    return {
      type: "page",
      start,
      end,
      value: searchText,
    };
  } else if (jozzRegex.test(searchText)) {
    const start = parseInt(searchText.match(jozzRegex)?.[1] || "0");
    if (start < 1 || start > 30) {
      console.error("Wrong juzz range");
      return undefined;
    }
    return {
      type: "jozz",
      start,
      value: searchText,
    };
  } else if (chapterRegex.test(searchText)) {
    const start = parseInt(searchText.match(chapterRegex)?.[1] || "1");
    const end = parseInt(searchText.match(chapterRegex)?.[2] || "1");
    if (start < 1 || start > 114) {
      console.error("Wrong chapter range");
      return undefined;
    }
    return {
      type: "chapter",
      start,
      end, 
      value: searchText,
    };
  } else /*if (chapterNameRegex.test(searchText)) */ {
    const chaptersName = getChapterNames();
    const chapter = chaptersName.find((chapter) => {
      const nameAr = chapter.name;
      const nameEn = chapter.nameEn.toLowerCase().replace(/'/g, "");
      return nameAr.includes(searchText) || nameEn.includes(searchText.toLowerCase());
    });
    if (!chapter) {
      console.error("Chapter not found");
      return undefined;
    }
    return {
      type: "chapter",
      start: chapter.id,
      end: 1,
      value: searchText,
    };
     
  }
};

