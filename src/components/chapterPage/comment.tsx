import React, { useState } from "react";

import "./style.css";

const Comment = (props: {
    id: number;
    name: string;
    avatar: string;
    text: string;
    editable: boolean;
}) => {
    // const [text, setText] = useState("");

    console.log("text", props.text);

    return (
        <div className="Comment">
            <div className="Comment-user">
                {/* <img
                    className="Comment-user-avatar"
                    src={props.avatar}
                    alt={""}
                /> */}
                <div className="Comment-user-name">{"@" + props.name}</div>
            </div>
            <textarea
                className="Comment-text"
                readOnly={!props.editable}
                rows={props.text.length / 30}
                value={props.text}
            />
        </div>
    );
};

export default Comment;
