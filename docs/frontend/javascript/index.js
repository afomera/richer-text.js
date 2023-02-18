import "index.css"
import "syntax-highlighting.css"
import "highlight.js/styles/github-dark.css"
import "@afomera/richer-text"
import "@afomera/richer-text/dist/css/richer-text.css"
import "editor.css"

// Import all JavaScript & CSS files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"

console.info("Bridgetown is loaded!")

const switchTheme = () => {
  // get root element
  const rootElement = document.documentElement
  let dataTheme = rootElement.getAttribute("data-theme"), newTheme

  newTheme = dataTheme === "dark" ? "light" : "dark"

  if (newTheme === "dark") {
    rootElement.classList.add("dark")
    document.getElementById("#theme-switcher").querySelector("button").innerHTML = "Switch to light mode"
  } else {
    rootElement.classList.remove("dark")
    document.getElementById("#theme-switcher").querySelector("button").innerHTML = "Switch to dark mode"
  }

  rootElement.setAttribute("data-theme", newTheme)

  localStorage.setItem("theme", newTheme)

  console.log("Switched theme to", newTheme)
}

if (document.getElementById("#theme-switcher")) {
  document.getElementById("#theme-switcher").addEventListener("click", switchTheme)
}

// document.addEventListener("editor:blur", (event) => {
//   console.log("Editor blurred", event)
// });

// document.addEventListener("editor:focus", (event) => {
//   console.log("Editor focused", event)
// });

// document.addEventListener("editor:update", (event) => {
//   console.log("Editor updated", event)
// });
