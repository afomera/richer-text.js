// src/editor/extensions/RicherTextEmbed.js
import { Node, mergeAttributes } from "@tiptap/core";
import { html, render } from "lit";
var RicherTextEmbed_default = Node.create({
  name: "richerTextEmbed",
  group: "block",
  draggable: true,
  addAttributes() {
    return {
      sgid: {
        default: null
      }
    };
  },
  addOptions() {
    return {
      embedPath: "/embeds"
    };
  },
  addStorage() {
    return {
      embedPath: this.options.embedPath
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["richer-text-embed", mergeAttributes(this.options, HTMLAttributes)];
  },
  parseHTML() {
    return [{ tag: "richer-text-embed" }];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const template = html`<div></div>`;
      const scratch = document.createElement("div");
      render(template, scratch);
      const dom = scratch.firstElementChild;
      function removeNode() {
        if (typeof getPos === "function") {
          const { view } = editor;
          const { tr } = view.state;
          const pos = getPos();
          tr.delete(pos, pos + 1);
          view.dispatch(tr);
        }
      }
      const contentDiv = document.createElement("richer-text-embed");
      contentDiv.sgid = node.attrs.sgid;
      contentDiv.removeNode = removeNode;
      contentDiv.setAttribute("embed-path", this.options.embedPath);
      dom.appendChild(contentDiv);
      return {
        dom
      };
    };
  }
});

export {
  RicherTextEmbed_default
};
//# sourceMappingURL=chunk-RSRBWB7G.js.map
