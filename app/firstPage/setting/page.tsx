"use client";
import Link from "next/link";
import BackIcon from "../icons/back.svg";
import { useEffect, useState } from "react";

const settingPage = () => {
  const [settings, setSettings] = useState({
    textDisplay: "both", // "arabic", "english", or "both"
    showVerseMenu: true,
  });
  
  // State to track button pressed state
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Load settings from localStorage when component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem("quranSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (e) {
        console.error("Error parsing settings from localStorage:", e);
      }
    }
  }, []);

  const handleTextDisplayChange = (value: string) => {
    setSettings({
      ...settings,
      textDisplay: value
    });
  };

  const handleCheckboxChange = (setting: keyof typeof settings) => {
    if (setting === 'showVerseMenu') {
      setSettings({
        ...settings,
        [setting]: !settings[setting],
      });
    }
  };

  const saveSettings = () => {
    // Visual feedback for click
    setIsButtonPressed(true);
    
    localStorage.setItem("quranSettings", JSON.stringify(settings));
    
    setTimeout(() => {
      setIsButtonPressed(false);
    }, 300);
  };

  return (
    <>
      <Link href="/firstPage" className="flex w-12 p-1">
        <BackIcon />
        <div className="text-xs2 text-gray-100-400">Back</div>
      </Link>

      <div className="flex flex-col items-start p-2 text-xs2">
        <div className="text-xs3">Setting</div>
        <div className="p-3">
          <fieldset>
            <legend className="text-xs3 pb-1">Text Display Options:</legend>
            <div>
              <input
                type="radio"
                id="arabicOnly"
                name="textDisplay"
                value="arabic"
                checked={settings.textDisplay === "arabic"}
                onChange={() => handleTextDisplayChange("arabic")}
              />
              <label htmlFor="arabicOnly" className="pl-1">Arabic text only</label>
            </div>
            <div>
              <input
                type="radio"
                id="englishOnly"
                name="textDisplay"
                value="english"
                checked={settings.textDisplay === "english"}
                onChange={() => handleTextDisplayChange("english")}
              />
              <label htmlFor="englishOnly" className="pl-1">English text only</label>
            </div>
            <div>
              <input
                type="radio"
                id="bothTexts"
                name="textDisplay"
                value="both"
                checked={settings.textDisplay === "both"}
                onChange={() => handleTextDisplayChange("both")}
              />
              <label htmlFor="bothTexts" className="pl-1">Show both texts</label>
            </div>
          </fieldset>
          
          <div className="mt-2">
            <input
              type="checkbox"
              id="verseMenu"
              checked={settings.showVerseMenu}
              onChange={() => handleCheckboxChange("showVerseMenu")}
            />
            <label htmlFor="verseMenu" className="pl-1">Show verse menu</label>
          </div>
          
          <button
            className={`bg-blue-500 text-white rounded p-1 text-xs1 mt-3 transition-all duration-200 hover:bg-blue-600 ${
              isButtonPressed ? 'opacity-70 transform scale-95' : ''
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
export default settingPage;
