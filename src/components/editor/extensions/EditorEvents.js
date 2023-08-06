import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "editorEvents",

  onCreate({ editor }) {
    // The editor is created.
    const element = editor.options.element;

    const customEvent = new CustomEvent('richer-text-editor:create', { bubbles: true });

    element.dispatchEvent(customEvent);
  },

  onFocus({ editor }) {
    const element = editor.options.element;

    const customEvent = new CustomEvent('richer-text-editor:focus', { bubbles: true });

    element.dispatchEvent(customEvent);
  },

  onUpdate({ editor }) {
    // The content has changed.
    const element = editor.options.element;

    if (editor.options.editorProps && editor.options.editorProps.input) {
      const input = document.getElementById(editor.options.editorProps.input);

      if (input) {
        input.value = editor.getHTML();
      }
    }

    const customEvent = new CustomEvent('richer-text-editor:update', {
      detail: { html: editor.getHTML(), json: editor.getJSON(), isEmpty: editor.isEmpty },
      bubbles: true
    });

    element.dispatchEvent(customEvent);
  },

  onBlur({ editor }) {
    const element = editor.options.element;

    const customEvent = new CustomEvent('richer-text-editor:blur', {
      detail: { isEmpty: editor.isEmpty },
      bubbles: true
    });

    element.dispatchEvent(customEvent);
  },
});
