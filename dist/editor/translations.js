"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translations = exports.modifierKey = exports.isMac = void 0;
var isMac = /Mac|iOS|iPhone|iPad|iPod/i.test(window.navigator.platform);
exports.isMac = isMac;
var modifierKey = isMac ? "cmd" : "ctrl";
exports.modifierKey = modifierKey;
var translations = {
  attachment: "Insert Image",
  bold: "Bold <".concat(modifierKey, "+b>"),
  italics: "Italics <".concat(modifierKey, "+i>"),
  underline: "Underline",
  strike: "Strikethrough <".concat(modifierKey, "+shift+x>"),
  link: "Link <".concat(modifierKey, "+k>"),
  code: "Code",
  codeBlock: "Insert Code Block",
  highlight: "Highlight",
  heading1: "Heading 1 <".concat(modifierKey, "+alt+1>"),
  heading2: "Heading 2 <".concat(modifierKey, "+alt+2>"),
  heading3: "Heading 3 <".concat(modifierKey, "+alt+3>"),
  horizontalRule: "Insert Line",
  bulletList: "Insert Bullet List",
  orderedList: "Insert Ordered List",
  blockquote: "Insert Blockquote",
  undo: "Undo <".concat(modifierKey, "+z>"),
  redo: "Redo <".concat(modifierKey, "+shift+z>")
};
exports.translations = translations;