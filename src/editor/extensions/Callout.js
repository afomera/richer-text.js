import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

export default Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      'data-color': {
        default: "gray",
      },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {
        class: "callout"
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[class=callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ commands, editor }) => {
          const { type = null } = editor.getAttributes(this.name);
          if (type) {
            commands.lift(this.name);
          } else {
            return commands.toggleWrap(this.name);
        }
      },
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: /^\$callout\$$/,
        type: this.type,
        getAttributes: (match) => {
          return { type: match[1] };
        },
      }),
    ];
  },
});
