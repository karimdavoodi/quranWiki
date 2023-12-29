import { Schema, model, models, Model } from "mongoose";

export type AyaSubmenuType =
    | "quran"
    | "hadith"
    | "bible"
    | "translate"
    | "date"
    | "";
export type RelationType = "quran" | "hadith" | "bible";

export interface IFeedback {
    name: string;
    email: string;
    type: string;
    message: string;
    date: number;
    userHash: string;
}
const feedbackSchema = new Schema<IFeedback>({
    name: { type: String, required: false },
    email: { type: String, required: false },
    type: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true },
    userHash: { type: String, required: true },
});

// export interface IAyaDate {
//     ayaId: string;
//     year: string;
//     month: string;
//     day: number;
//     story: string;
// }
// const dateSchema = new Schema<IAyaDate>({
//     ayaId: { type: String, required: true },
//     year: { type: String, required: true },
//     month: { type: String, required: true },
//     day: { type: Number, required: true },
//     story: { type: String, required: false },
// });

export interface IRelation {
    chapterId: number;
    ayaId: number;
    type: RelationType;
    relateToBook: string;
    relateToChapter: number;
    relateToNumber: number;
    like: number;
    date: number;
    userHash: string;
}
const reltionSchema = new Schema<IRelation>({
    chapterId: { type: Number, required: true },
    ayaId: { type: Number, required: true },
    type: { type: String, required: true },
    relateToBook: { type: String, required: false },
    relateToChapter: { type: Number, required: true },
    relateToNumber: { type: Number, required: true },
    like: { type: Number, required: true },
    date: { type: Number, required: true },
    userHash: { type: String, required: true },
});

let Relation: Model<IRelation>;
let Feedback: Model<IFeedback>;
if (!models.Feedback || !models.Relation) {
    Relation = model<IRelation>("Relation", reltionSchema);
    Feedback = model<IFeedback>("Feedback", feedbackSchema);
} else {
    Relation = models.Relation;
    Feedback = models.Feedback;
}
export { Relation, Feedback };
/*
  Wiki structure:
   - translation
       - sentence
       - footnote list
   - history
        - same as verse ..
        - date
        - revelation story
   - notes
        - list
   - old commentary
       - list
   - related hadith
       - list
  Sentence states:
   - DARKGREEN: new
   - GREEN: approved
   - RED: rejected 
   - GRAY: deleted

Problems
   - democracy for improving sentence
      - use AI
   - prevent corruption 
        - 

Make vote system. 5 people
Rank of users
How trust on use

Test state: need review, need change ,approved, closed, draft

*/
//

// Comment
// User
// Bookmark
//
