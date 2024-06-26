import "index.css"
import "syntax-highlighting.css"
import "highlight.js/styles/github-dark.css"
import "@afomera/richer-text"
import "@afomera/richer-text/dist/css/richer-text.css"
import "editor.css"

import "trix"
import "trix/dist/trix.css"


// import { Table } from "@tiptap/extension-table";
// import { TableHeader } from "@tiptap/extension-table-header"
// import { TableRow } from "@tiptap/extension-table-row";
// import { TableCell } from "@tiptap/extension-table-cell";


// Import all JavaScript & CSS files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById('theme-switch')) return;

  document.getElementById('theme-switch').addEventListener('click', function () {
    if (localStorage.theme == 'dark') {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark';
    }
  });
});


// const editor = document.querySelector("richer-text-editor")

// if (editor) {
//   editor.addExtensions([
//     Table.configure({
//       resizable: false
//     }),
//     TableHeader,
//     TableRow,
//     TableCell
//   ])
// }

// document.addEventListener("editor:blur", (event) => {
//   console.log("Editor blurred", event)
// });

// document.addEventListener("editor:focus", (event) => {
//   console.log("Editor focused", event)
// });

// document.addEventListener("editor:update", (event) => {
//   console.log("Editor updated", event)
// });
