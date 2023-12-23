import React from "react";

import LikeIcon from "../../../icons/thumbs-up-line-icon.svg";
import UnlikeIcon from "../../../icons/thumbs-down-line-icon.svg";
import EditIcon from "../../../icons/notebook-pen-icon.svg";

const Comment = (props: {
    id: number;
    name: string;
    avatar: string;
    text: string;
    editable: boolean;
}) => {
    const commentActionIconStyle =
        "pl-2 cursor-pointer hover:border border-green-600 rounded";
    return (
        <div className="hover:border border-green-600">
            <div className="flex text-xs pl-1">{"@" + props.name}</div>
            <textarea
                className="w-11/12 text-xs pl-3 bg-transparent text-yellow-600 text-justify"
                readOnly={!props.editable}
                rows={props.text.length / 30}
                value={props.text}
            />
            <div className="flex p-1 pl-4">
                <div className={commentActionIconStyle}>
                    <LikeIcon />
                </div>
                <div className={commentActionIconStyle}>
                    <UnlikeIcon />
                </div>
                <div className={commentActionIconStyle}>
                    <EditIcon />
                </div>
                {/* <div className="Comment-action-icon">Unlike</div>
                <div className="Comment-action-icon">Reply</div>
                <div className="Comment-action-icon">Edit</div>
                <div className="Comment-action-icon">Delete</div>
                <div className="Comment-action-icon">Report</div> */}
            </div>
        </div>
    );
};

export default Comment;
