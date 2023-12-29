import React from "react";
import Feedback from "./feedback";

const infoPage = () => {
    return (
        <div className="text-xs2 text-left p-10 text-white">
            <div>
                <div className="text-green-500">
                    QuranWiki.org is a Sadaqah Jariyah
                </div>
                We think by finding relation between each Quran verse and Hadith
                and Bible, we can understand it better. If you agree, please
                help us by making connection between them by icons below each
                verse.
                <br className="text-xs1" />
                Sources:
                <ul className="test-xs0 pl-3 text-xs1">
                    <li>
                        - App source: https://github.com/karimdavoodi/quranWiki
                    </li>
                    <li>- Quran source: https://tanzil.net</li>
                    <li>- Quran Translation: Sahih International</li>
                    <li>
                        - Hadith source:
                        https://github.com/A7med3bdulBaset/hadith-json
                    </li>
                    <li>
                        - Bible source:
                        https://www.biblesupersearch.com/bible-downloads/
                    </li>
                    <li>- Audio source: https://everyayah.com/</li>
                </ul>
                <div className="text-green-500">
                    Please send us your feedback:
                </div>
            </div>
            <Feedback />
        </div>
    );
};

export default infoPage;
