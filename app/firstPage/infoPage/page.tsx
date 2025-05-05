import React from "react";
import Feedback from "./feedback";
import BackIcon from "../icons/back.svg";
import Link from "next/link";

const infoPage = () => {
  return (
    <>
      <Link href="/firstPage" className="flex w-12 p-1">
        <BackIcon />
        <div className="text-xs2 text-gray-100-400">Back</div>
      </Link>
      <div className="text-xs2 text-left p-3 text-white">
        <div className="pt-3">
          <h1 className="text-green-300">QuranWiki.org is a Sadaqah Jariyah</h1>
          We think by finding the relation between each Quran verse and Hadith
          and Bible, we can understand it better. If you agree, Please help us
          by making the connection between texts, By icons below each verse.
          <br className="text-xs1" />
          Sources:
          <ul className="test-xs0 pl-3 text-xs1">
            <li>- App source: https://github.com/karimdavoodi/quranWiki</li>
            <li>- Quran source: https://tanzil.net</li>
            <li>- Quran Translation: The Clear Quran</li>
            <li>
              - Hadith source: https://github.com/A7med3bdulBaset/hadith-json
            </li>
            <li>
              - Bible source: https://www.biblesupersearch.com/bible-downloads/
            </li>
            <li>- Audio source: https://everyayah.com/</li>
          </ul>
          <div className="text-green-500">Please send us your feedback:</div>
        </div>
        <Feedback />
      </div>
    </>
  );
};

export default infoPage;
