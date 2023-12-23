import { Schema, model } from "mongoose";
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
   - related hadic
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

export interface IComment {
    userId: string;
    verseId: string;
    text: string;
    date: number;
    replayTo: Schema.Types.ObjectId;
    replayOrder: number;
}
const commentSchema = new Schema<IComment>({
    userId: { type: String, required: true },
    verseId: { type: String, required: true },
    date: { type: Number, required: true },
    text: { type: String, required: true },
    replayTo: { type: Schema.Types.ObjectId, required: false },
    replayOrder: { type: Number, required: false },
});
export const Comment = model<IComment>("Comment", commentSchema);
