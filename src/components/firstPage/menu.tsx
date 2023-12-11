import React from "react";
import "../../App.css";

export const Menu = () => {
    return (
        <div className="App-menu">
            <button
                className="App-menu-button"
                onClick={() =>
                    console.log(
                        "Are you sure you want to delete this bookmark?"
                    )
                }
            >
                B
            </button>
            <button
                className="App-menu-button"
                onClick={() =>
                    console.log(
                        "Are you sure you want to delete this bookmark?"
                    )
                }
            >
                L
            </button>
            <button
                className="App-menu-button"
                onClick={() =>
                    console.log(
                        "Are you sure you want to delete this bookmark?"
                    )
                }
            >
                N
            </button>
            <button
                className="App-menu-button"
                onClick={() =>
                    console.log(
                        "Are you sure you want to delete this bookmark?"
                    )
                }
            >
                A
            </button>
        </div>
    );
};
