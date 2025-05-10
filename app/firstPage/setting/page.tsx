"use client";
import Link from "next/link";
import BackIcon from "../icons/back.svg";
import { useEffect, useState } from "react";
import { applyTheme } from "@/app/util";

const SettingPage = () => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [displaySettings, setDisplaySettings] = useState({
    textDisplay: "both", // "arabic", "english", or "both"
    showVerseMenu: true,
    theme: "green-yellow",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("quranSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setDisplaySettings(parsedSettings);
      } catch (e) {
        console.error("Error parsing displaySettings from localStorage:", e);
      }
    }
  }, []);

  const handleTextDisplayChange = (value: string) => {
    setDisplaySettings({
      ...displaySettings,
      textDisplay: value,
    });
  };
  const handleThemeChange = (value: string) => {
    setDisplaySettings({
      ...displaySettings,
      theme: value,
    });
  };

  const handleCheckboxChange = (setting: keyof typeof displaySettings) => {
    if (setting === "showVerseMenu") {
      setDisplaySettings({
        ...displaySettings,
        [setting]: !displaySettings[setting],
      });
    }
  };

  const saveSettings = () => {
    setIsButtonPressed(true);
    localStorage.setItem("quranSettings", JSON.stringify(displaySettings));
    applyTheme();
    setTimeout(() => {
      setIsButtonPressed(false);
    }, 300);
  };

  return (
    <>
      <Link href="/firstPage" className="flex w-12 p-1">
        <BackIcon />
        <div className="text-xs2 text-menu">Back</div>
      </Link>

      <div className="flex flex-col items-start p-2 text-xs2 text-menu text-left">
        <div className="text-xs3">Setting</div>
        <div className="p-3">
        <fieldset>
            <legend className="text-xs2">Theme Options:</legend>
            <div>
              <input
                type="radio"
                id="green-yellow"
                name="colorDisplay"
                value="green-yellow"
                checked={displaySettings.theme === "green-yellow"}
                onChange={() => handleThemeChange("green-yellow")}
              />
              <label htmlFor="green-yellow" className="pl-1">
                Green-Yellow
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="gray-yellow"
                name="colorDisplay"
                value="gray-yellow"
                checked={displaySettings.theme === "gray-yellow"}
                onChange={() => handleThemeChange("gray-yellow")}
              />
              <label htmlFor="gray-yellow" className="pl-1">
                Gray-Yellow
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="blue-green"
                name="colorDisplay"
                value="blue-green"
                checked={displaySettings.theme === "blue-green"}
                onChange={() => handleThemeChange("blue-green")}
              />
              <label htmlFor="blue-green" className="pl-1">
                Blue-Green
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="white-black"
                name="colorDisplay"
                value="white-black"
                checked={displaySettings.theme === "white-black"}
                onChange={() => handleThemeChange("white-black")}
              />
              <label htmlFor="white-black" className="pl-1">
                White-Black
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="gray-white"
                name="colorDisplay"
                value="gray-white"
                checked={displaySettings.theme === "gray-white"}
                onChange={() => handleThemeChange("gray-white")}
              />
              <label htmlFor="gray-white" className="pl-1">
                Gray-White
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs2 pt-2">Text Display Options:</legend>
            <div>
              <input
                type="radio"
                id="arabicOnly"
                name="textDisplay"
                value="arabic"
                checked={displaySettings.textDisplay === "arabic"}
                onChange={() => handleTextDisplayChange("arabic")}
              />
              <label htmlFor="arabicOnly" className="pl-1">
                Arabic text only
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="englishOnly"
                name="textDisplay"
                value="english"
                checked={displaySettings.textDisplay === "english"}
                onChange={() => handleTextDisplayChange("english")}
              />
              <label htmlFor="englishOnly" className="pl-1">
                English text only
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="bothTexts"
                name="textDisplay"
                value="both"
                checked={displaySettings.textDisplay === "both"}
                onChange={() => handleTextDisplayChange("both")}
              />
              <label htmlFor="bothTexts" className="pl-1">
                Show both texts
              </label>
            </div>
          </fieldset>

          <div className="mt-2">
            <input
              type="checkbox"
              id="verseMenu"
              checked={displaySettings.showVerseMenu}
              onChange={() => handleCheckboxChange("showVerseMenu")}
            />
            <label htmlFor="verseMenu" className="pl-1">
              Show verse menu
            </label>
          </div>

          <button
            className={`bg-blue-500 text-menu rounded p-1 text-xs1 mt-3 transition-all duration-200 hover:bg-blue-600 ${
              isButtonPressed ? "opacity-70 transform scale-95" : ""
            }`}
            onClick={saveSettings}
            onMouseDown={() => setIsButtonPressed(true)}
            onMouseUp={() => setIsButtonPressed(false)}
            onMouseLeave={() => setIsButtonPressed(false)}
          >
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
};
export default SettingPage;
