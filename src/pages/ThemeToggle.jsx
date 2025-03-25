import React from "react";
import { useTheme } from "../pages/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
            <button onClick={toggleTheme} className="btn btn-primary">
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </div>
    );
};

export default ThemeToggle;
