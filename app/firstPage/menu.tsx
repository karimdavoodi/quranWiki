import React from "react";
import Link from "next/link";

import BookIcon from "./icons/book.svg";
import SaveIcon from "./icons/bookmark.svg";
import InfoIcon from "./icons/info.svg";
import { featureBookmark } from "../constant";

export const Menu = () => {
    const iconStyle = "cursor-pointer inline-flex hover:bg-[#4f5d39]";
    const toolTipStyle = "pt-1 text-xs1 text-red-500";

    return (
        <div className="pb-2 flex pl-8">
            <Link href="/firstPage/hadithFirstPage" className={iconStyle}>
                <BookIcon />
                <div className={toolTipStyle}>Hadith Books</div>
            </Link>
            <div className="pl-6"></div>
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
