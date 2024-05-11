import { mergeAttributes, Node, NodeView } from '@tiptap/core'
import { v4 as uuid } from 'uuid'
import { html, render } from "lit";

export const AiWriter = Node.create({
  name: 'aiWriter',

  group: 'block',

  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {
        class: `node-${this.name}`,
      },
    }
  },

  addAttributes() {
    return {
      id: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => ({
          'data-id': attributes.id,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setAiWriter:
        () =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: {
                id: uuid(),
              },
            },
          )
          .run(),
    }
  },

  addNodeView() {
    return ({ editor, node, getPos, HTMLAttributes, decorations, extension }) => {
      const from = getPos()
      const to = from + node.nodeSize

      function removeNode() {
        console.log("Removing node");
        editor.chain().focus().deleteRange(from, to).insertContentAt({ from, to }, "HELLO WORLD").run()

        console.log("Removing node", from, to);
        // editor.chain().focus().deleteRange(from, to).run();
        console.log('extension', extension);
        debugger;

          // // For some reason it doesnt always delete the closest AIWriter
          // const closestAiWriter  = this.closest("richer-ai-writer");
          // if (closestAiWriter) {
          //   closestAiWriter.remove();
          // }
      }

      const template = html`<div></div>`;

      // Scratch element to render into.
      const scratch = document.createElement("div");
      render(template, scratch);

      const dom = scratch.firstElementChild;

      const contentDiv = document.createElement("richer-ai-writer");
      contentDiv.removeNode = removeNode;
      contentDiv.insertContent = (content) => {
        console.log("Inserting content", content);

        editor.chain().focus().insertContent(content).run();
      }
      // contentDiv.setAttribute("embed-path", this.options.embedPath);

      dom.appendChild(contentDiv);


      return {
        dom: dom,
        update: () => true,
      }
    }
  },
})

export default AiWriter
