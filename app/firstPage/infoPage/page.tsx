import React from "react";
import Feedback from "./feedback";

const infoPage = () => {
    return (
        <div className="text-xs2 text-left p-10 text-white">
            <div>
                <div className="text-green-500">
                    QuranWiki.org is a Sadaqah Jariyah
                </div>
                We think by finding relation between each Quran verse and Hadic
                and Bible, we can understand it better. If you agree, please
                help us by making connection between them by icons below each
                verse. You can contribute on improving QuranWiki.org in the
                Github: https://github.com/karimdavoodi/quranWiki
                <div className="text-green-500">
                    Please send us your feedback:
                </div>
            </div>
            <Feedback />
        </div>
    );
};

export default infoPage;
