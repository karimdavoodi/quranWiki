import React from "react";

export const ArabicText = (probs: {
    text: string;
    id: number;
    chapter: string;
}) => {
    return (
        <div dir="rtl" key={probs.id}>
            <div className=" text-xs3 pb-1 text-right text-gray-500 pl-2 font-['numberFont']">
                {toArabic(probs.chapter)}:{toArabic(probs.id)}
            </div>
            <div className="text-xs4 leading-relaxed  text-yellow-400 text-justify font-['uthmanV2']">
                {probs.text}
            </div>
        </div>
    );
};

const toArabic = (id: number | string) => {
    const mapDigit = [
        "۰",
        "١",
        "٢",
        "٣",
        "٤",
        "۵",
        "٦",
        "٧",
        "٨",
        "٩",
        " ",
        " ",
    ];
    let arabic = "";
    const latin = Number(id)
        .toString()
        .split("")
        .map((digit) => Number(digit));

    for (const digit of latin) {
        arabic += mapDigit[digit];
    }
    return arabic;
};
