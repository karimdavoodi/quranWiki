import React from "react";
import "../../App.css";

export const ArabicText = (probs: { text: string; id: number }) => {
    return (
        <div className="AyaArea-ar" key={probs.id}>
            <div className="AyaArea-ar-id">{toArabic(probs.id)} </div>
            <div className="AyaArea-ar-text">{probs.text}</div>
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
