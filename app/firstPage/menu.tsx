import React from "react";
import Link from "next/link";

import SavedIcon from "../../icons/bookmark-add-icon.svg";
import InfoIcon from "../../icons/info-circle-line-icon.svg";

export const Menu = () => {
    const iconStyle =
        "cursor-pointer inline-flex p-1 hover:border border-green-600 rounded";
    return (
        <div>
            <div className="w-40 inline-block">
                <div className={iconStyle}>
                    <Link href="/firstPage/login">
                        <InfoIcon />
                    </Link>
                </div>
                <div className={iconStyle}>
                    <Link href="/firstPage/bookmarkPage">
                        <SavedIcon />
                    </Link>
                </div>
                <div className={iconStyle}>
                    <Link href="/firstPage/bookmarkPage">
                        <SavedIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
