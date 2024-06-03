import {
  Node,
  mergeAttributes
} from "./chunk-ZGUGKF6P.js";
import {
  j,
  x
} from "./chunk-M27UGOWE.js";

// src/editor/extensions/iframelyEmbed.js
var iframelyEmbed_default = Node.create({
  name: "iframelyEmbed",
  group: "block",
  draggable: true,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      href: { default: null },
      previewHtml: { default: null }
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-node": "iframely-embed", ...mergeAttributes(HTMLAttributes) }];
  },
  parseHTML() {
    return [{ tag: "div[data-node='iframely-embed']" }];
  },
  addNodeView() {
    return ({ node }) => {
      const template = x`<div></div>`;
      const scratch = document.createElement("div");
      j(template, scratch);
      const dom = scratch.firstElementChild;
      const contentDiv = document.createElement("div");
      contentDiv.className = "iframely-embed";
      contentDiv.innerHTML = `${node.attrs.previewHtml}`;
      dom.appendChild(contentDiv);
      return {
        dom
      };
    };
  },
  addCommands() {
    return {
      insertEmbed: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs
        });
      },
      updateEmbed: (href, previewHtml) => ({ commands }) => {
        let attributes = {
          href,
          previewHtml
        };
        return commands.updateAttributes(this.name, attributes);
      }
    };
  }
});

export {
  iframelyEmbed_default
};
//# sourceMappingURL=chunk-3AH7GP7Z.js.map
