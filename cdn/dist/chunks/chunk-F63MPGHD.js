import {
  Node,
  mergeAttributes,
  nodeInputRule
} from "./chunk-NC7G5KJY.js";
import {
  NodeSelection,
  TextSelection
} from "./chunk-ZTG2EEKL.js";

// node_modules/@tiptap/extension-horizontal-rule/dist/index.js
var HorizontalRule = Node.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain, state }) => {
        const { $to: $originTo } = state.selection;
        const currentChain = chain();
        if ($originTo.parentOffset === 0) {
          currentChain.insertContentAt(Math.max($originTo.pos - 2, 0), { type: this.name });
        } else {
          currentChain.insertContent({ type: this.name });
        }
        return currentChain.command(({ tr, dispatch }) => {
          var _a;
          if (dispatch) {
            const { $to } = tr.selection;
            const posAfter = $to.end();
            if ($to.nodeAfter) {
              if ($to.nodeAfter.isTextblock) {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
              } else if ($to.nodeAfter.isBlock) {
                tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
              } else {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos));
              }
            } else {
              const node = (_a = $to.parent.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.create();
              if (node) {
                tr.insert(posAfter, node);
                tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));
              }
            }
            tr.scrollIntoView();
          }
          return true;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});

// src/editor/extensions/HorizontalRule.js
var HorizontalRule_default = HorizontalRule.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", { class: "richer-text-editor--hr" }, ["hr", HTMLAttributes]];
  }
});

export {
  HorizontalRule,
  HorizontalRule_default
};
//# sourceMappingURL=chunk-F63MPGHD.js.map
