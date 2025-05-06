import React from "react";

export const ArabicText = (probs: {
  text: string;
  id: number;
  chapter: number;
}) => {
  return (
    <div dir="rtl" key={probs.id}>
      <div className="text-xs4 leading-relaxed  text-yellow-500 text-justify font-['uthmanV2']">
        {probs.text} {toArabic(probs.id)}
      </div>
    </div>
  );
};

const toArabic = (id: number | string) => {
  const mapDigit = [];
  mapDigit[0] = "٠";
  mapDigit[1] = "١";
  mapDigit[2] = "٢";
  mapDigit[3] = "٣";
  mapDigit[4] = "٤";
  mapDigit[5] = "٥";
  mapDigit[6] = "٦";
  mapDigit[7] = "٧";
  mapDigit[8] = "٨";
  mapDigit[9] = "٩";
  mapDigit[10] = " ";
  mapDigit[11] = " ";
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
