import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SavedIcon } from "../../icons/bookmark-add-icon.svg";
import { ReactComponent as DarkIcon } from "../../icons/moon-line-icon.svg";
import { ReactComponent as InfoIcon } from "../../icons/info-circle-line-icon.svg";

import "./style.css";

export const Menu = () => {
    return (
        <div>
            <div className="Menu">
                <div className="Menu-icon">
                    <DarkIcon />
                </div>
                <div className="Menu-icon">
                    <SavedIcon />
                </div>
                <div className="Menu-icon">
                    <Link to="/info">
                        <InfoIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
