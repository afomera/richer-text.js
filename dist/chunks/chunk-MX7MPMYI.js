// src/editor/extensions/Callout.js
import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { html, render } from "lit";
var Callout_default = Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  defining: true,
  draggable: true,
  addAttributes() {
    return {
      "data-color": {
        default: "gray"
      }
    };
  },
  addOptions() {
    return {
      HTMLAttributes: {
        class: "callout"
      }
    };
  },
  parseHTML() {
    return [{ tag: "div[class=callout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const template = html`<div></div>`;
      const scratch = document.createElement("div");
      render(template, scratch);
      const dom = scratch.firstElementChild;
      const select = document.createElement("select");
      select.classList.add("callout-select");
      select.addEventListener("change", (event) => {
        editor.commands.setNodeSelection(getPos());
        editor.commands.updateAttributes("callout", { "data-color": event.target.value });
        editor.commands.focus(getPos() + 1);
      });
      const colors = ["gray", "blue", "green", "red", "yellow"];
      colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
        option.selected = color === node.attrs["data-color"];
        select.append(option);
      });
      dom.appendChild(select);
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("callout");
      contentDiv.dataset.color = node.attrs["data-color"];
      dom.appendChild(contentDiv);
      return {
        dom,
        contentDOM: contentDiv
      };
    };
  },
  addCommands() {
    return {
      setCallout: () => ({ commands, editor }) => {
        const { type = null } = editor.getAttributes(this.name);
        if (type) {
          commands.lift(this.name);
        } else {
          return commands.toggleWrap(this.name);
        }
      }
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: /^\$callout\$$/,
        type: this.type,
        getAttributes: (match) => {
          return { type: match[1] };
        }
      })
    ];
  }
});

export {
  Callout_default
};
//# sourceMappingURL=chunk-MX7MPMYI.js.map
