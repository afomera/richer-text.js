import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

const CodeBlock = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.state.doc.childBefore(this.editor.state.selection.from).node.type.name === this.name) {
          return this.editor.commands.insertContent("  ");
        }
        return false
      }
    }
  }
}).configure({
  lowlight
})

export default CodeBlock;
