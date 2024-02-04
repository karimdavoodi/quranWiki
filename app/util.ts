"use client";

export const quranChapterVerseToStr = (
    chapter: number | string,
    verse: number | string
) => {
    const chap: string =
        typeof chapter === "number" ? chapter.toString() : chapter;
    const ver: string = typeof verse === "number" ? verse.toString() : verse;
    return `${chap.padStart(3, "0")}${ver.padStart(3, "0")}`;
};

export const clearTextFormat = (text: string) => {
    if (!text) {
        return "";
    }
    return text.replace(/\n/g, " ").replace(/\t/g, " ").replace(/\s+/g, " ");
};

export const startBmInterval = () => {
    const intervalFunction = () => {
        const getTopIfisInViewport = (element: Element) => {
            const rect = element.getBoundingClientRect();
            const isInView =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    (window.innerHeight ||
                        document.documentElement.clientHeight);
            return isInView ? rect.top : -1;
        };

        const divElements = document.querySelectorAll(
            '[data-item="bookmarkable"]'
        );

        let elements: Element[] = [];
        divElements.forEach((div) => {
            const top = getTopIfisInViewport(div);
            if (top !== -1) {
                elements.push(div);
            }
        });
        elements.sort();
        if (elements.length > 0) {
            const element = elements[0];
            const id = element.getAttribute("id")?.split("-")[1] || "1";
            let url = "";
            if (window.location.href.includes("item")) {
                url = window.location.href.replace(/item=\d+/, `item=${id}`);
            } else {
                url = `${window.location.href}&item=${id}`;
            }
            localStorage.setItem("bookmark", url);
        }
    };

    let internalId = parseInt(localStorage.getItem("bmIntervalRunning") || "0");
    if (internalId) {
        window.clearInterval(internalId);
    }
    internalId = window.setInterval(intervalFunction, 2000);
    localStorage.setItem("bmIntervalRunning", `${internalId}`);
};
