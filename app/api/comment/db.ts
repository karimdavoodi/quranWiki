import { Schema, connect } from "mongoose";
import { dbUrl } from "@/app/constants";
import { Comment, IComment } from "@/app/models";

export async function getComments(verseId: string) {
    await connect(dbUrl);
    const comment = await Comment.findOne({ verseId });
    console.log(`Get comment ${comment?._id}`);
}

export async function setComment(commentData: IComment) {
    await connect(dbUrl);
    const comment = new Comment(commentData);
    await comment.save();
    console.log(`Save comment ${comment.id}`);
}
