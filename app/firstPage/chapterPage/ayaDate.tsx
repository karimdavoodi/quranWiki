import React from "react";

const AyaDate = (probs: { chapterId: number; ayaId: number }) => {
    const years = [
        "10 BH",
        "9 BH",
        "8 BH",
        "7 BH",
        "6 BH",
        "5 BH",
        "4 BH",
        "3 BH",
        "2 BH",
        "1 BH",
        "1 AH",
        "2 AH",
        "3 AH",
        "4 AH",
        "5 AH",
        "6 AH",
        "7 AH",
        "8 AH",
        "9 AH",
        "10 AH",
        "11 AH",
        "12 AH",
        "13 AH",
    ];
    const months = [
        "Muharram",
        "Safar",
        "Rabi al-Awwal",
        "Rabi al-Thani",
        "Jumada al-Awwal",
        "Jumada al-Thani",
        "Rajab",
        "Sha'ban",
        "Ramadan",
        "Shawwal",
        "Dhu al-Qi'dah",
        "Dhu al-Hijjah",
    ];
    const days = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
    ];
    const selectStyle = "bg-transparent border border-gray-600";
    return (
        <div className="text-xs1 text-justify text-gray-900">
            <div className="">
                Date:
                <div className="pl-2">
                    <div>
                        <input name="date" type="radio" /> Same as prevues verse
                    </div>
                    <div>
                        <input name="date" type="radio" />
                        <select className={selectStyle}>
                            {years.map((year) => (
                                <option value={year}>{year}</option>
                            ))}
                        </select>
                        <select className={selectStyle}>
                            {months.map((month) => (
                                <option value={month}>{month}</option>
                            ))}
                        </select>
                        <select className={selectStyle}>
                            {days.map((day) => (
                                <option value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            Story: ....
            {`${probs.chapterId}, ${probs.ayaId}`}
        </div>
    );
};

export default AyaDate;
