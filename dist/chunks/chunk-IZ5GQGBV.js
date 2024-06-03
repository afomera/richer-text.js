// src/editor/translations.js
var isMac = /Mac|iOS|iPhone|iPad|iPod/i.test(
  window.navigator.platform
);
var modifierKey = isMac ? "cmd" : "ctrl";
var translations = {
  attachment: "Insert Image",
  bold: `Bold <${modifierKey}+b>`,
  italics: `Italics <${modifierKey}+i>`,
  underline: `Underline`,
  strike: `Strikethrough <${modifierKey}+shift+x>`,
  link: `Link <${modifierKey}+k>`,
  code: "Code",
  codeBlock: "Insert Code Block",
  highlight: "Highlight",
  heading1: `Heading 1 <${modifierKey}+alt+1>`,
  heading2: `Heading 2 <${modifierKey}+alt+2>`,
  heading3: `Heading 3 <${modifierKey}+alt+3>`,
  horizontalRule: "Insert Line",
  bulletList: `Insert Bullet List`,
  orderedList: `Insert Ordered List`,
  blockquote: `Insert Blockquote`,
  undo: `Undo <${modifierKey}+z>`,
  redo: `Redo <${modifierKey}+shift+z>`,
  iframelyEmbed: "Embed Media"
};

export {
  isMac,
  modifierKey,
  translations
};
//# sourceMappingURL=chunk-IZ5GQGBV.js.map
