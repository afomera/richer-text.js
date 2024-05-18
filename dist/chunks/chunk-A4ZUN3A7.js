// src/editor/extensions/EditorEvents.js
import { Extension } from "@tiptap/core";
var EditorEvents_default = Extension.create({
  name: "editorEvents",
  onCreate({ editor }) {
    const element = editor.options.element;
    const customEvent = new CustomEvent("richer-text-editor:create", { bubbles: true });
    element.dispatchEvent(customEvent);
  },
  onFocus({ editor }) {
    const element = editor.options.element;
    const customEvent = new CustomEvent("richer-text-editor:focus", { bubbles: true });
    element.dispatchEvent(customEvent);
  },
  onUpdate({ editor }) {
    const element = editor.options.element;
    const customEvent = new CustomEvent("richer-text-editor:update", {
      detail: { html: editor.getHTML(), json: editor.getJSON(), isEmpty: editor.isEmpty },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onBlur({ editor }) {
    const element = editor.options.element;
    const customEvent = new CustomEvent("richer-text-editor:blur", {
      detail: { isEmpty: editor.isEmpty },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  }
});

export {
  EditorEvents_default
};
//# sourceMappingURL=chunk-A4ZUN3A7.js.map
