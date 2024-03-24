import { Node, mergeAttributes } from "@tiptap/core";
import { html, render } from "lit";
import "../elements/RicherTextEmbed";

export default Node.create({
  name: 'richerTextEmbed',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      sgid: {
        default: null,
      },
    };
  },

  addOptions() {
    return {
      embedPath: "/embeds",
    };
  },

  addStorage() {
    return {
      embedPath: this.options.embedPath,
    }
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

      // Scratch element to render into.
      const scratch = document.createElement("div");
      render(template, scratch);

      const dom = scratch.firstElementChild;

      const contentDiv = document.createElement("richer-text-embed");
      contentDiv.sgid = node.attrs.sgid;
      contentDiv.setAttribute("embed-path", this.options.embedPath);

      dom.appendChild(contentDiv);

      return {
        dom
      };
    };
  },
});
