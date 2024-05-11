import { Node, mergeAttributes } from "@tiptap/core";
import { html, render } from "lit";
import { v4 as uuid } from 'uuid'

export const AiWriter = Node.create({
  name: 'aiWriter',

  group: 'block',

  draggable: true,

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
                id: uuid()
              },
            })
            .run(),
    }
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const from = getPos()
      const to = from + node.nodeSize

      const template = html`<div id=${node.attrs.id} style="border: 1px solid black; padding: 10px; margin: 10px;">
        Richer Writer

        <textarea style="width: 100%; height: 100px;"></textarea>

        <button @click=${(event) => {
          event.preventDefault()
          removeNode()

          console.log(editor.getJSON())
        }}>Delete</button>

        <button @click=${(event) => {
          event.preventDefault()

          removeNode()

          editor.chain().focus().insertContentAt(from, {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Inserted 1"
              }
            ]
          }).run()

          console.log(editor.getJSON())
        }}>Insert 1</button>
      </div>`

      // Scratch element to render into.
      const scratch = document.createElement('div')
      render(template, scratch)

      const dom = scratch.firstElementChild

      function removeNode() {
        if (typeof getPos === "function") {
          const { view } = editor;

          const { tr } = view.state;

          const pos = getPos();
          tr.delete(pos, pos + 1);
          view.dispatch(tr);
        }
      }

      return {
        dom,
        update: (updatedNode) => {
          console.log(updatedNode)
          console.log(node)

          if (updatedNode.attrs.id !== node.attrs.id) {
            return false
          }

          return true
        },
        destroy: () => true,
      }
    }
  },
})
