// read text file
import fs from "fs";
import path from "path";

const names = [
    "Acts",
    "Amos",
    "Colossians",
    "Daniel",
    "Deuteronomy",
    "Ecclesiastes",
    "Ephesians",
    "Esther",
    "Exodus",
    "Ezekiel",
    "Ezra",
    "Galatians",
    "Genesis",
    "Habakkuk",
    "Haggai",
    "Hebrews",
    "Hosea",
    "Isaiah",
    "James",
    "Jeremiah",
    "Job",
    "Joel",
    "John",
    "Jonah",
    "Joshua",
    "Jude",
    "Judges",
    "Lamentations",
    "Leviticus",
    "Luke",
    "Malachi",
    "Mark",
    "Matthew",
    "Micah",
    "Nahum",
    "Nehemiah",
    "Numbers",
    "Obadiah",
    "Philemon",
    "Philippians",
    "Proverbs",
    "Psalms",
    "Revelation",
    "Romans",
    "Ruth",
    "Song of Solomon",
    "Titus",
    "Zechariah",
    "Zephaniah",
    "1 Chronicles",
    "1 Corinthians",
    "1 John",
    "1 Kings",
    "1 Peter",
    "1 Samuel",
    "1 Thessalonians",
    "1 Timothy",
    "2 Chronicles",
    "2 Corinthians",
    "2 John",
    "2 Kings",
    "2 Peter",
    "2 Samuel",
    "2 Thessalonians",
    "2 Timothy",
    "3 John",
];

var filePath = "bible_en.json";

const quran_en = {};
fs.readFile(filePath, "utf8", function (err, data) {
    if (err) throw err;
    const list = JSON.parse(data);
    // verses
    // "book_name": "Genesis",
    // "book": 1,
    // "chapter": 14,
    // "verse": 14,
    // "text": "When Abram heard that his relative was taken captive, he led forth his trained men, born in his house, three hundred and eighteen, and pursued as far as Dan."

    console.log("DATA", list?.verses?.length);
    for (let i = 0; i < names.length; i++) {
        const verses = [];
        for (let j = 0; j < list?.verses?.length; j++) {
            if (list?.verses[j]?.book_name === names[i]) {
                verses.push({
                    chapter: list?.verses[j]?.chapter,
                    verse: list?.verses[j]?.verse,
                    text: list?.verses[j]?.text,
                });
            }
        }
        console.log("new file", names[i], verses.length);
        // Write verses to file
        const filePath = "bible/" + names[i].replace(" ", "_") + ".json";
        fs.writeFile(
            filePath,
            JSON.stringify(verses, null, 2),
            "utf8",
            function (err) {}
        );
    }
});
