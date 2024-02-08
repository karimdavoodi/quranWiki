"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import BookIcon from "./icons/book.svg";
import SaveIcon from "./icons/bookmark.svg";
import InfoIcon from "./icons/info.svg";
import { featureBookmark } from "../constant";
import { log } from "console";

export const Menu = () => {
    const [bookmark, setBookmark] = useState("");

    const iconStyle = "cursor-pointer inline-flex hover:bg-[#4f5d39]";
    const toolTipStyle = "pt-1 text-xs1 text-white";

    useEffect(() => {
        const bookmark = localStorage.getItem("bookmark");
        if (bookmark) {
            setBookmark(bookmark);
        }
    }, []);

    return (
        <div className="pb-2 pt-1 pr-1 flex pl-8">
            <Link href="/firstPage/hadithFirstPage" className={iconStyle}>
                <BookIcon />
                <div className={toolTipStyle}>Hadith Books</div>
            </Link>
            {bookmark && (
                <>
                    <div className="pl-2"></div>
                    <div
                        className={iconStyle}
                        onClick={() => {
                            window.location.href = bookmark;
                        }}
                    >
                        <SaveIcon />
                        <div className={toolTipStyle}>Last read</div>
                    </div>
                </>
            )}
            <div className="pl-2"></div>
            <Link href="/firstPage/infoPage" className={iconStyle}>
                <InfoIcon />
                <div className={toolTipStyle}>About, Contact</div>
            </Link>

            {featureBookmark && (
                <div className={iconStyle}>
                    <Link href="/firstPage/bookmarkPage">
                        <SaveIcon />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Menu;
