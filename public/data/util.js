// read text file
const fs = require("fs");

var filePath = "./AI/quran/clearQuran.json";

const quran_en = {};
fs.readFile(filePath, "utf8", function (err, data) {
    if (err) throw err;
    const quran = JSON.parse(data);
    for (const chapter of quran.response.chapters) {
        for (const verse of chapter.verses) {
            const text = verse.verseInEnglish
                .replace(/\n/g, " ")
                .replace(/\r/g, " ")
                .replace(/\t/g, " ")
                .replace(/\s+/g, " ")
                .replace(/"/g, "'");

            console.log(
                `"${verse.chapterId.toString().padStart(3, "0")}${verse.verseId
                    .toString()
                    .padStart(3, "0")}": "${text}",`
            );
        }
    }
});
