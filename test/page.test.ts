import { parseSearchInput } from '../app/util';
import {quran , getPageVerses, getJuzVerses, getChapterName, getPagesVerses, getChapterVerses, getVerses, getChapterNames} from '../public/data/data';

describe('getPageVerses', () => {

  it('should have the correct number of verses on each page', () => {
    const page1 = getPageVerses(1);
    expect(page1).toMatchObject({
        start: { chapter: 1, verse: 1 },
        end: { chapter: 1, verse: 7 },
    })

    const page2 = getPageVerses(2);
    expect(page2).toMatchObject({
        start: { chapter: 2, verse: 1 },
        end: { chapter: 2, verse: 5 },
    })
    const page3 = getPageVerses(30);
    expect(page3).toMatchObject({
        start: { chapter: 2, verse: 191 },
        end: { chapter: 2, verse: 196 },
    })

    const page6 = getPageVerses(511);
    expect(page6).toMatchObject({
        start: { chapter: 48, verse: 1 },
        end: { chapter: 48, verse: 9 },
    })

    const page4 = getPageVerses(603);
    expect(page4).toMatchObject({
        start: { chapter: 109, verse: 1 },
        end: { chapter: 111, verse: 5 },
    })
    const page7 = getPageVerses(600);
    expect(page7).toMatchObject({
        start: { chapter: 100, verse: 10 },
        end: { chapter: 102, verse: 8 },
    })

    const page5 = getPageVerses(604);
    expect(page5).toMatchObject({
        start: { chapter: 112, verse: 1 },
        end: { chapter: 114, verse: 6 },
    })

  });
});

describe('getJuzVerses', () => {
    it('should have the correct number of verses in each Juz', () => {
        const juz1 = getJuzVerses(1);
        expect(juz1).toMatchObject({
        start: { chapter: 1, verse: 1 },
        end: { chapter: 2, verse: 141 },
        });
    
        const juz2 = getJuzVerses(2);
        expect(juz2).toMatchObject({
        start: { chapter: 2, verse: 142 },
        end: { chapter: 2, verse: 252 },
        });
    
        const juz3 = getJuzVerses(3);
        expect(juz3).toMatchObject({
        start: { chapter: 2, verse: 253 },
        end: { chapter: 3, verse: 92 },
        });
    
        const juz4 = getJuzVerses(4);
        expect(juz4).toMatchObject({
        start: { chapter: 3, verse: 93 },
        end: { chapter: 4, verse: 23 },
        });
    
        const juz5 = getJuzVerses(5);
        expect(juz5).toMatchObject({
        start: { chapter: 4, verse: 24 },
        end: { chapter: 4, verse: 147 },
        });
    
        const juz6 = getJuzVerses(6);
        expect(juz6).toMatchObject({
        start: { chapter: 4, verse: 148 },
        end: { chapter: 5, verse: 81 },
        });
    
        const juz7 = getJuzVerses(7);
        expect(juz7).toMatchObject({
        start: { chapter: 5, verse: 82 },
        end: { chapter: 6, verse: 110 },
        });
    
        const juz8 = getJuzVerses(8);
        expect(juz8).toMatchObject({
        start: { chapter: 6, verse: 111 },
        end: { chapter: 7, verse: 87 },
        });
    
        const juz9 = getJuzVerses(9);
        expect(juz9).toMatchObject({
        start: { chapter: 7, verse: 88 },
        end: { chapter: 8, verse: 40 },
        });

        const juz10 = getJuzVerses(30);
        expect(juz10).toMatchObject({
            start: { chapter: 78, verse: 1 },
            end: { chapter: 114, verse: 6 },
        });


    });
});

describe('getChapterName', () => {
    it('should return the correct chapter name in Arabic', () => {
        expect(getChapterName(1)).toBe("الفاتحة");
        expect(getChapterName(2)).toBe("البقرة");
        expect(getChapterName(3)).toBe("آل عمران");
        expect(getChapterName(4)).toBe("النساء");
        expect(getChapterName(110)).toBe("النصر");
        expect(getChapterName(111)).toBe("المسد");
    });
});

describe('getPagesVerses', () => {
    it('should return the correct verses for each page', () => {
        const page1 = getPagesVerses(1,5);
        expect(page1).toMatchObject({
            start: { chapter: 1, verse: 1 },
            end: { chapter: 2, verse: 29 },
        });

        const page2 = getPagesVerses(20,25);
        expect(page2).toMatchObject({
            start: { chapter: 2, verse: 127 },
            end: { chapter: 2, verse: 169 },
        });

        const page3 = getPagesVerses(599, 603);
        expect(page3).toMatchObject({
            start: { chapter: 98, verse: 8 },
            end: { chapter: 111, verse: 5 },

        });
    });
});

describe('getChapterVerses', () => {
    it('should return the correct verses for each chapter', () => {
        const chapter1 = getChapterVerses(
            quran['1'],
            1,
            1,
            3,
        );
        expect(chapter1).toMatchObject(
            [
                {"chapterId": 1, "id": 0, "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:الفاتحة"}, 
                {"chapterId": 1, "id": 1, "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"}, 
                {"chapterId": 1, "id": 2, "text": "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ"}, 
                {"chapterId": 1, "id": 3, "text": "ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"}
            ]
        );

        const chapter2 = getChapterVerses(
            quran['113'],
            113,
            2,
            2,
        );
        expect(chapter2).toMatchObject(
            [
                {"chapterId": 113, "id": 2, 
                "text": "مِن شَرِّ مَا خَلَقَ",  } 
         ]);
        const chapter3 = getChapterVerses(
                quran['2'],
                2,
                286,
                286,
            );
        expect(chapter3).toMatchObject(
                [
                    {"chapterId": 2, "id": 286, 
                        "text": "لَا يُكَلِّفُ ٱللَّهُ نَفۡسًا إِلَّا وُسۡعَهَاۚ لَهَا مَا كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ"},
                ]);
        });
});

describe('getVerses', () => {
    it('should return the correct verses for each chapter', () => {
        const chapter1 = getVerses({
            start: { chapter: 1, verse: 1 },
            end: { chapter: 1, verse: 3 },
        });
        expect(chapter1).toMatchObject(
            [
                {"chapterId": 1, "id": 0, "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:الفاتحة"}, 
                {"chapterId": 1, "id": 1, "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"}, 
                {"chapterId": 1, "id": 2, "text": "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ"}, 
                {"chapterId": 1, "id": 3, "text": "ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"}
            ]
        );

        const chapter2 = getVerses({
            start: { chapter: 110, verse: 1 },
            end: { chapter: 113, verse: 3 },
        });
        console.log(chapter2);
        expect(chapter2).toMatchObject(
            [
                {
                  id: 0,
                  text: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:النصر',
                  chapterId: 110
                },
                {
                  id: 1,
                  text: 'إِذَا جَآءَ نَصۡرُ ٱللَّهِ وَٱلۡفَتۡحُ',
                  chapterId: 110
                },
                {
                  id: 2,
                  text: 'وَرَأَيۡتَ ٱلنَّاسَ يَدۡخُلُونَ فِي دِينِ ٱللَّهِ أَفۡوَاجٗا',
                  chapterId: 110
                },
                {
                  id: 3,
                  text: 'فَسَبِّحۡ بِحَمۡدِ رَبِّكَ وَٱسۡتَغۡفِرۡهُۚ إِنَّهُۥ كَانَ تَوَّابَۢا',
                  chapterId: 110
                },
                {
                  id: 0,
                  text: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:المسد',
                  chapterId: 111
                },
                {
                  id: 1,
                  text: 'تَبَّتۡ يَدَآ أَبِي لَهَبٖ وَتَبَّ',
                  chapterId: 111
                },
                {
                  id: 2,
                  text: 'مَآ أَغۡنَىٰ عَنۡهُ مَالُهُۥ وَمَا كَسَبَ',
                  chapterId: 111
                },
                { id: 3, text: 'سَيَصۡلَىٰ نَارٗا ذَاتَ لَهَبٖ', chapterId: 111 },
                {
                  id: 4,
                  text: 'وَٱمۡرَأَتُهُۥ حَمَّالَةَ ٱلۡحَطَبِ',
                  chapterId: 111
                },
                { id: 5, text: 'فِي جِيدِهَا حَبۡلٞ مِّن مَّسَدِۭ', chapterId: 111 },
                {
                  id: 0,
                  text: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:الإخلاص',
                  chapterId: 112
                },
                { id: 1, text: 'قُلۡ هُوَ ٱللَّهُ أَحَدٌ', chapterId: 112 },
                { id: 2, text: 'ٱللَّهُ ٱلصَّمَدُ', chapterId: 112 },
                { id: 3, text: 'لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ', chapterId: 112 },
                {
                  id: 4,
                  text: 'وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ',
                  chapterId: 112
                },
                {
                  id: 0,
                  text: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ:الفلق',
                  chapterId: 113
                },
                { id: 1, text: 'قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ', chapterId: 113 },
                { id: 2, text: 'مِن شَرِّ مَا خَلَقَ', chapterId: 113 },
                { id: 3, text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', chapterId: 113 }
              ]
        );
    });
});

describe('getChapterNames', () => {
    it('should return the correct chapter names', () => {
        const chapterNames = getChapterNames();
        expect(chapterNames).toHaveLength(114);
        expect(chapterNames[0].name).toBe("الفاتحة");
        expect(chapterNames[1].name).toBe("البقرة");
        expect(chapterNames[2].name).toBe("آل عمران");
        expect(chapterNames[113].name).toBe("الناس");
        expect(chapterNames[0].nameEn).toBe("Al-Fatihah");
        expect(chapterNames[1].nameEn).toBe("Al-Baqarah");
        expect(chapterNames[113].nameEn).toBe("An-Nas");
    });
});

describe('parseSearchInput', () => {
    it('should parse page input correctly', () => {
        expect(parseSearchInput("p1")).toMatchObject({
            type: "page",
            start: 1,
            end: undefined,
            value: "p1",
        });
        expect(parseSearchInput("p400:412")).toMatchObject({
            type: "page",
            start: 400,
            end: 412,
            value: "p400:412",
        });
        expect(parseSearchInput("p1000:2")).toBeUndefined();
        expect(parseSearchInput("p100:20")).toBeUndefined();
    });

    it('should parse chapter input correctly', () => {
        const result = parseSearchInput("2:8");
        expect(result).toMatchObject({
            type: "chapter",
            start: 2,
            end: 8,
            value: "2:8",
        });
        expect(parseSearchInput("150:20")).toBeUndefined();
        expect(parseSearchInput("0:20")).toBeUndefined();
    });

    it('should parse juzz input correctly', () => {
        const result = parseSearchInput("j1");
        expect(result).toMatchObject({
            type: "jozz",
            start: 1,
            value: "j1",
        });
        expect(parseSearchInput("j31")).toBeUndefined();
        expect(parseSearchInput("j-1")).toBeUndefined();
    });

    it('should parse chapter name input correctly', () => {
        expect(parseSearchInput("Nisa")).toMatchObject({
            type: "chapter",
            start: 4,
            end: 1,
            value: "Nisa",
        });
        expect(parseSearchInput("Nas")).toMatchObject({
            type: "chapter",
            start: 110, // Nasr
            end: 1,
            value: "Nas",
        });
        expect(parseSearchInput("الفاتحة")).toMatchObject({
            type: "chapter",
            start: 1,
            end: 1,
            value: "الفاتحة",
        });
        expect(parseSearchInput("يونس")).toMatchObject({
            type: "chapter",
            start: 10,
            end: 1,
            value: "يونس",
        });
    });
    it('should parse invalid input correctly', () => {
        const result = parseSearchInput("invalid");
        expect(result).toBeUndefined();
    });
});