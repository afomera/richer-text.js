import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "editorEvents",

  onFocus({ editor }) {
    const element = editor.options.element;

    const customEvent = new CustomEvent('editor:focus',{ bubbles: true });

    element.dispatchEvent(customEvent);
  },

  onUpdate({ editor }) {
    // The content has changed.
    const element = editor.options.element;

    const customEvent = new CustomEvent('editor:update',{
      detail: { html: editor.getHTML(), json: editor.getJSON() },
      bubbles: true
    });

    element.dispatchEvent(customEvent);
  },

  onBlur({ editor }) {
    const element = editor.options.element;

    const customEvent = new CustomEvent('editor:blur',{ bubbles: true });

    element.dispatchEvent(customEvent);
  },
});
