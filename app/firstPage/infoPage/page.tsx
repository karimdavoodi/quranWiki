import React from "react";
import Feedback from "./feedback";

const infoPage = () => {
    return (
        <div className="text-xs2 text-justify p-10 text-white">
            <div>
                We think by finding relation between each Quran verse and Hadic
                and Bible, we can understand it better. If you agree, please
                help us by making connection between them by icons belove each
                verse.
                <br />
                Please send use your feadback:
            </div>
            <Feedback />
        </div>
    );
};

export default infoPage;
