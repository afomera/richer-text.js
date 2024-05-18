// src/editor/extensions/HorizontalRule.js
import HorizontalRule from "@tiptap/extension-horizontal-rule";
var HorizontalRule_default = HorizontalRule.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", { class: "richer-text-editor--hr" }, ["hr", HTMLAttributes]];
  }
});

export {
  HorizontalRule_default
};
//# sourceMappingURL=chunk-IDKBV7O5.js.map
