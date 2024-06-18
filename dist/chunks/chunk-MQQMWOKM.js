import {
  tiptapStyles
} from "./chunk-S2DXAW4H.js";
import {
  normalize
} from "./chunk-2EZFRUF7.js";

// src/components/TipTapEditorBase.js
import { LitElement } from "lit";
import { Editor } from "@tiptap/core";
var TipTapEditorBase = class extends LitElement {
  static get styles() {
    return [normalize, tiptapStyles];
  }
  static get properties() {
    return {
      autofocus: { type: Boolean, reflect: true },
      readonly: { type: Boolean, reflect: true },
      placeholder: { type: String, reflect: true },
      input: { type: String, reflect: true },
      class: { type: String, reflect: true },
      serializer: { type: String, reflect: true },
      content: { type: String, reflect: true },
      // Properties
      editor: { state: true },
      extensions: { state: true }
    };
  }
  constructor() {
    super();
    this.autofocus = false;
    this.class = "";
    this.extensions = [];
  }
  _createEditorRootElement() {
    if (this.shadowRoot.host.querySelector(".text-editor-wrapper")) {
      return this.shadowRoot.host.querySelector(".text-editor-wrapper");
    }
    const element = document.createElement("div");
    element.classList.add("text-editor-wrapper");
    element.slot = "editor";
    this.shadowRoot.host.appendChild(element);
    return element;
  }
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
  }
  emitChange() {
    this.emit("change", {
      html: this.getHTML(),
      json: this.editor.getJSON()
    });
    const inputElement = document.getElementById(this.input);
    if (inputElement) {
      inputElement.value = this.serializer === "json" ? JSON.stringify(this.editor.getJSON()) : this.getHTML();
    }
  }
  rebuildEditor() {
    if (this.editor)
      this.editor.destroy();
    this.editor = this.__setupEditor(this);
  }
  getHTML() {
    const html = this.editor.getHTML();
    return html === "<p></p>" ? "" : html;
  }
  updated(changedProperties) {
    if (changedProperties.has("readonly")) {
      this.editor?.setEditable(!this.readonly);
    }
    if (changedProperties.has("content")) {
      this.editor.commands.setContent(this.serializer === "json" ? JSON.parse(this.content) : this.content);
    }
    if (changedProperties.has("extensions") || changedProperties.has("serializer") || changedProperties.has("translations")) {
      this.rebuildEditor();
    }
    super.updated(changedProperties);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.editor.destroy();
  }
  addExtensions(...extensions) {
    if (Array.isArray(extensions)) {
      extensions = extensions.flat(1);
    }
    this.extensions = this.extensions.concat(extensions);
  }
  get __baseExtensions() {
    return [
      RicherTextKit.configure({
        placeholder: this.placeholder || "Start typing..."
      })
    ];
  }
  allOptions() {
    return Object.assign(
      this.__defaultOptions()
    );
  }
  __setupEditor() {
    const editor = new Editor(this.allOptions());
    return editor;
  }
  __defaultOptions() {
    return {
      element: this._createEditorRootElement(),
      editable: !this.readonly,
      extensions: this.__baseExtensions.concat(this.extensions),
      content: this.serializer === "json" ? JSON.parse(this.content) : this.content,
      autofocus: this.autofocus && !this.readonly,
      editorProps: {
        attributes: {
          class: this.class
        }
      },
      onCreate: () => {
        this.emitChange();
      },
      onUpdate: ({ editor }) => {
        this.requestUpdate();
        this.emitChange();
      },
      onSelectionUpdate: () => {
        this.requestUpdate();
      }
    };
  }
  clear() {
    this.editor.chain().clearContent(true).focus().run();
  }
  focus() {
    this.editor.commands.focus();
  }
  blur() {
    this.editor.commands.blur();
  }
  toggleBold() {
    this.editor.chain().toggleBold().focus().run();
  }
  toggleItalic() {
    this.editor.chain().toggleItalic().focus().run();
  }
  toggleUnderline() {
    this.editor.chain().toggleUnderline().focus().run();
  }
  toggleCode() {
    this.editor.chain().toggleCode().focus().run();
  }
  toggleStrike() {
    this.editor.chain().toggleStrike().focus().run();
  }
  toggleHeadingLevel1() {
    this.editor.chain().toggleHeading({ level: 1 }).focus().run();
  }
  toggleHeadingLevel2() {
    this.editor.chain().toggleHeading({ level: 2 }).focus().run();
  }
  toggleHeadingLevel3() {
    this.editor.chain().toggleHeading({ level: 3 }).focus().run();
  }
  toggleBulletList() {
    this.editor.chain().toggleBulletList().focus().run();
  }
  toggleOrderedList() {
    this.editor.chain().toggleOrderedList().focus().run();
  }
  setHorizontalRule() {
    this.editor.chain().setHorizontalRule().focus().run();
  }
  toggleBlockquote() {
    this.editor.chain().toggleBlockquote().focus().run();
  }
  toggleCodeBlock() {
    this.editor.chain().toggleCodeBlock().focus().run();
  }
  toggleHighlight() {
    this.editor.chain().toggleHighlight().focus().run();
  }
  undo() {
    this.editor.chain().focus().undo().run();
  }
  redo() {
    this.editor.chain().focus().redo().run();
  }
};

export {
  TipTapEditorBase
};
//# sourceMappingURL=chunk-MQQMWOKM.js.map
