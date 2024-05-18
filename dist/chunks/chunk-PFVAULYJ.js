// src/editor/extensions/CodeBlock.js
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
var CodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Tab: () => {
        if (this.editor.state.doc.childBefore(this.editor.state.selection.from).node.type.name === this.name) {
          return this.editor.commands.insertContent("  ");
        }
        return false;
      }
    };
  }
}).configure({
  lowlight
});
var CodeBlock_default = CodeBlock;

export {
  CodeBlock_default
};
//# sourceMappingURL=chunk-PFVAULYJ.js.map
