// src/editor/extensions/Mention.js
import { mergeAttributes } from "@tiptap/core";
import Mention from "@tiptap/extension-mention";
var Mention_default = Mention.extend({
  name: "mention",
  selectable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      avatarUrl: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-avatar-url"),
        renderHTML: (attrs) => {
          if (!attrs.avatarUrl) {
            return {};
          }
          return {
            "data-avatar-url": attrs.avatarUrl
          };
        }
      }
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const label = ["span", { class: "richer-text--mention-label" }, node.attrs.label];
    const avatar = ["img", { class: "richer-text--mention-img", src: node.attrs.avatarUrl, alt: node.attrs.label }];
    return [
      "span",
      mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes),
      avatar,
      label
    ];
  }
});

export {
  Mention_default
};
//# sourceMappingURL=chunk-UNX5T3KA.js.map
