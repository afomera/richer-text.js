import { Node, mergeAttributes } from "@tiptap/core";
import { html, render } from "lit";

export default Node.create({
  name: 'iframelyEmbed',
  group: 'block',
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      href: { default: null },
      previewHtml: { default: null },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { 'data-node': 'iframely-embed', ...mergeAttributes(HTMLAttributes) }];
  },

  parseHTML() {
    return [{ tag: "div[data-node='iframely-embed']" }];
  },

  addNodeView() {
    return ({ node }) => {
      const template = html`<div></div>`;

      // Scratch element to render into.
      const scratch = document.createElement("div");
      render(template, scratch);

      const dom = scratch.firstElementChild;

      const contentDiv = document.createElement("div");
      contentDiv.className = 'iframely-embed';
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
          attrs: attrs,
        });
      },
      updateEmbed:
        (href, previewHtml) =>
        ({ commands }) => {
          let attributes = {
            href: href,
            previewHtml: previewHtml,
          };

          return commands.updateAttributes(this.name, attributes);
        },
    };
  }
});
