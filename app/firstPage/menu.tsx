"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import BookIcon from "./icons/book.svg";
import SaveIcon from "./icons/bookmark.svg";
import SettingIcon from "./icons/setting.svg";
import { featureBookmark } from "../constant";

export const Menu = () => {
  const [bookmark, setBookmark] = useState("");

  const iconStyle = "cursor-pointer inline-flex hover:bg-bgHover";
  const toolTipStyle = "pr-3 text-xs1 text-menu";

  useEffect(() => {
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark) {
      setBookmark(bookmark);
    }
  }, []);

  return (
    <div className="inline-flex p-2 text-xs3">
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
      {/* <Link href="/firstPage/infoPage" className={iconStyle}>
        <InfoIcon />
        <div className={toolTipStyle}>About, Contact</div>
      </Link>
 */}
      {featureBookmark && (
        <div className={iconStyle}>
          <Link href="/firstPage/bookmarkPage">
            <SaveIcon />
          </Link>
        </div>
      )}
      <div className="pl-2"></div>
      <Link href="/firstPage/setting" className={iconStyle}>
        <SettingIcon />
        <div className={toolTipStyle}>Settings</div>
      </Link>
    </div>
  );
};

export default Menu;
