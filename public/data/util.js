// read text file
const fs = require("fs");

// var filePath = "./AI/quran/clearQuran.json";

// const quran_en = {};
// fs.readFile(filePath, "utf8", function (err, data) {
//     if (err) throw err;
//     const quran = JSON.parse(data);
//     for (const chapter of quran.response.chapters) {
//         for (const verse of chapter.verses) {
//             const text = verse.verseInEnglish
//                 .replace(/\n/g, " ")
//                 .replace(/\r/g, " ")
//                 .replace(/\t/g, " ")
//                 .replace(/\s+/g, " ")
//                 .replace(/"/g, "'");

//             console.log(
//                 `"${verse.chapterId.toString().padStart(3, "0")}${verse.verseId
//                     .toString()
//                     .padStart(3, "0")}": "${text}",`
//             );
//         }
//     }
// });

const chapter = "https://www.quranwiki.org/firstPage/chapterPage?"; // id=1..114 
const hadith = "https://www.quranwiki.org/firstPage/hadithFirstPage/bookPage/chapterPage?"; //folder=bukhari&chapter=1

console.log(`https://www.quranwiki.org/firstPage`);
for (let i = 1; i <= 114; i++) {
    console.log(`${chapter}id=${i}`);
}
console.log(`https://www.quranwiki.org/firstPage/hadithFirstPage`);
fs.readFile("./hadith/bookNames.json", "utf8", function (err, data) {
    if (err) throw err;
    const books = JSON.parse(data);
    for (const book of books) {
        for (let i = 1; i <= book.chapterNumber; i++) {
            console.log(`${hadith}folder=${book.folder}&chapter=${i}`);
        }
    }
});
console.log(`https://www.quranwiki.org/firstPage/infoPage`);


