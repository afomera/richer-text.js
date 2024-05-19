import {
  Extension,
  Mark,
  getMarkAttributes,
  mergeAttributes
} from "./chunk-ZGUGKF6P.js";

// node_modules/@tiptap/extension-text-style/dist/index.js
var TextStyle = Mark.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state, commands }) => {
        const attributes = getMarkAttributes(state, this.type);
        const hasStyles = Object.entries(attributes).some(([, value]) => !!value);
        if (hasStyles) {
          return true;
        }
        return commands.unsetMark(this.name);
      }
    };
  }
});

// src/editor/extensions/FontSize.js
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
  TextStyle,
  FontSize_default
};
//# sourceMappingURL=chunk-YSMKN4EH.js.map
