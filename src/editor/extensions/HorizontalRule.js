import HorizontalRule from '@tiptap/extension-horizontal-rule'

export default HorizontalRule.extend({
  renderHTML({ HTMLAttributes }) {
    return ["div", { class: "richer-text-editor--hr" }, ["hr", HTMLAttributes]];
  },
});
