import { useState } from "react";
import "../assets/stylesheets/toggle-button.css"

function ToggleButton() {
  const [theme, setTheme] = useState("");

  var storedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  if (storedTheme)
    document.documentElement.setAttribute("data-theme", storedTheme);

  const toggleTheme = () => {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light"

    if (currentTheme === "light") {
      targetTheme = "dark"
    }
  
    setTheme(targetTheme);
  
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
    return theme;
  };  

  return (
    <button className="toggler" onClick={toggleTheme}>
      <i className={`bi bi-${storedTheme === "light" ? "brightness-high" : "moon-fill"}`}></i>
    </button>
  );
}

export default ToggleButton;
