"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tiptapStyles = void 0;
var _lit = require("lit");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
// https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/style.ts
var tiptapStyles = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .ProseMirror {\n    position: relative;\n    word-wrap: break-word;\n    white-space: pre-wrap;\n    white-space: break-spaces;\n    -webkit-font-variant-ligatures: none;\n    font-variant-ligatures: none;\n    font-feature-settings: \"liga\" 0;\n  }\n\n  .ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n    white-space: pre-wrap;\n  }\n  .ProseMirror pre {\n    white-space: pre-wrap;\n  }\n  img.ProseMirror-separator {\n    display: inline !important;\n    border: none !important;\n    margin: 0 !important;\n    width: 1px !important;\n    height: 1px !important;\n  }\n  .ProseMirror-gapcursor {\n    display: none;\n    pointer-events: none;\n    position: absolute;\n    margin: 0;\n    min-width: 1px;\n  }\n  .ProseMirror-gapcursor:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: -2px;\n    width: 20px;\n    border-top: 1px solid black;\n    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n  }\n  @keyframes ProseMirror-cursor-blink {\n    to {\n      visibility: hidden;\n    }\n  }\n  .ProseMirror-hideselection *::selection {\n    background: transparent;\n  }\n  .ProseMirror-hideselection *::-moz-selection {\n    background: transparent;\n  }\n  .ProseMirror-hideselection * {\n    caret-color: transparent;\n  }\n  .ProseMirror-focused .ProseMirror-gapcursor {\n    display: block;\n  }\n  .tippy-box[data-animation=\"fade\"][data-state=\"hidden\"] {\n    opacity: 0;\n  }\n"])));
exports.tiptapStyles = tiptapStyles;