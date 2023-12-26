import React from "react";
import Link from "next/link";

import BookIcon from "./icons/book.svg";
import SaveIcon from "./icons/bookmark.svg";
import InfoIcon from "./icons/help.svg";
import { featureBookmark } from "../constants";

export const Menu = () => {
    const iconStyle =
        "cursor-pointer inline-flex p-1 hover:border border-green-600 rounded";
    return (
        <div>
            <div className="w-40 inline-block">
                <div className={iconStyle}>
                    <Link href="/firstPage/infoPage">
                        <InfoIcon />
                    </Link>
                </div>
                <div className={iconStyle}>
                    <Link href="/firstPage/hadicFirstPage">
                        <BookIcon />
                    </Link>
                </div>
                {featureBookmark && (
                    <div className={iconStyle}>
                        <Link href="/firstPage/bookmarkPage">
                            <SaveIcon />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
