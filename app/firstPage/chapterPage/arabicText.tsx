import React from "react";

export const ArabicText = (probs: { text: string; id: number }) => {
    return (
        <div dir="rtl" className="flex font-['uthmanV2']" key={probs.id}>
            <div className="text-gray-500 pl-2 text-xs">
                {toArabic(probs.id)}
            </div>
            <div className="text-yellow-400 text-justify">{probs.text}</div>
        </div>
    );
};

const toArabic = (id: number) => {
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
    return arabic + ") ";
};
