import { MetadataRoute } from "next";
import hadith from "@/public/data/hadith/bookNames.json";
export default function sitemap(): MetadataRoute.Sitemap {
    const list = [];
    const baseUrl = "https://www.quranwiki.org";
    const chapterUrl = `${baseUrl}/firstPage/chapterPage?`;
    const hadithUrl = `${baseUrl}/firstPage/hadithFirstPage/bookPage/chapterPage?`;

    list.push({ url: `${baseUrl}/firstPage` });
    list.push({ url: `${baseUrl}/firstPage/infoPage` });
    list.push({ url: `${baseUrl}/firstPage/hadithFirstPage` });
    for (let i = 1; i <= 114; i++) {
        list.push({ url: `${chapterUrl}id=${i}` });
    }

    for (const book of hadith) {
        for (let i = 1; i <= book.chapterNumber; i++) {
            list.push({
                url: `${hadithUrl}folder=${book.folder}&amp;chapter=${i}`,
            });
        }
    }

    return list;
}
