// src/editor/extensions/FontSize.js
import "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
var FontSize_default = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
      }
    };
  }
});

export {
  FontSize_default
};
//# sourceMappingURL=chunk-TDPOOSLO.js.map
