import { MetadataRoute } from "next";
import hadith from "@/public/data/hadith/bookNames.json";
export default function sitemap(): MetadataRoute.Sitemap {
    const list = [];
    const baseUrl = "https://www.quranwiki.org";
    const chapterUrl = `${baseUrl}/firstPage/chapterPage?`;
    const hadithBookUrl = `${baseUrl}/firstPage/hadithFirstPage/bookPage?`;
    const hadithUrl = `${baseUrl}/firstPage/hadithFirstPage/bookPage/chapterPage?`;

    list.push({ url: `${baseUrl}/firstPage` });
    list.push({ url: `${baseUrl}/firstPage/infoPage` });
    list.push({ url: `${baseUrl}/firstPage/hadithFirstPage` });
    for (let i = 1; i <= 114; i++) {
        list.push({ url: `${chapterUrl}id=${i}` });
    }

    for (const book of hadith) {
        list.push({
            url: `${hadithBookUrl}folder=${book.folder}&amp;chapterNumber=${book.chapterNumber}&amp;bookName=${book.title}&amp;bookAuthor=${book.author}`,
            // folder=muslim&chapterNumber=57&bookName=Sahih+Muslim&bookAuthor=Imam+Muslim+ibn+al-Hajjaj+al-Naysaburi
        });
        for (let i = 1; i <= book.chapterNumber; i++) {
            list.push({
                url: `${hadithUrl}folder=${book.folder}&amp;chapterId=${i}&amp;chapterNumber=${book.chapterNumber}&amp;bookName=${book.title}&amp;bookAuthor=${book.author}`,
                // folder=muslim&chapterId=9&chapterNumber=57&bookName=Sahih+Muslim&bookAuthor=Imam+Muslim+ibn+al-Hajjaj+al-Naysaburi
            });
        }
    }

    return list;
}
