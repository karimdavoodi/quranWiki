export type RefType = "chapter" | "jozz" | "page";

export type Ref = {
  type: RefType;
  start: number;
  end?: number;
  value?: string;
};

export type Pages = {
    start: {
        chapter: number;
        verse: number;
    };
    end: {
        chapter: number;
        verse: number;
    };
};

export type Verse = {
  id: number;
  text: string;
  chapterId?: number;
};

export type Chapter = {
  id: number;
  name: string;
  nameEn: string;
  total_verses: number;
  verses: Verse[];
};

export type ChapterNameType = {
  id: number;
  name: string;
  nameEn: string;
};

