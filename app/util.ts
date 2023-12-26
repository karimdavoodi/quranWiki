import crypto from "crypto";

export const quranChapterVerseToStr = (
    chapter: number | string,
    verse: number | string
) => {
    const chap: string =
        typeof chapter === "number" ? chapter.toString() : chapter;
    const ver: string = typeof verse === "number" ? verse.toString() : verse;
    return `${chap.padStart(3, "0")}${ver.padStart(3, "0")}`;
};

export const hashString = (str: string) => {
    return crypto.createHash("md5").update(str).digest("hex");
};
