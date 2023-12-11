import React, { useState, useEffect } from "react";
import Comment from "./comment";
import "./style.css";

type CommentType = {
    id: number;
    name: string;
    avatar: string;
    text: string;
};

const Comments = (props: { isComment: boolean }) => {
    const [data, setData] = useState<CommentType[]>();

    useEffect(() => {
        const testComment = [
            {
                id: 1,
                name: "c1",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephlewis/128.jpg",
                text: `comment ...! comment ...! comment ...! comment ...! comment ...! comment ...! 
                comment ...!comment ...!comment ...!comment ...!comment ...!comment ...!
                comment ...! comment ...! comment ...! comment ...! comment ...! `,
            },
            {
                id: 2,
                name: "c2",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephlewis/128.jpg",
                text: "comment ........!",
            },
        ];
        const testTranslate = [
            {
                id: 1,
                name: "t1",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephlewis/128.jpg",
                text: "translate ...!",
            },
            {
                id: 2,
                name: "t2",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephlewis/128.jpg",
                text: "tr ........!",
            },
        ];
        const list = props.isComment ? testComment : testTranslate;
        setData((prevState) => [...list]);
    }, [props.isComment]);

    return (
        <div className="Comments">
            <div className="Comments-header">
                {props.isComment ? "Comments" : "Translats"}
            </div>
            {data?.map((comment, index) => (
                <Comment
                    id={comment.id}
                    name={comment.name}
                    avatar={comment.avatar}
                    text={comment.text}
                    editable={props.isComment}
                    key={index}
                />
            ))}
        </div>
    );
};

export default Comments;
