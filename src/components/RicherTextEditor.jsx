import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

export default class RicherTextEditor extends LitElement {
  static get properties() {
    return {
      content: { type: String },
      placeholder: { type: String },
      serializer: { type: String },
    };
  }

  _createEditorRootElement() {
    const element = document.createElement("div");
    element.slot = "editor";
    this.shadowRoot.host.appendChild(element);

    return element;
  }

  firstUpdated() {
    console.log("RicherTextEditor firstUpdated")

    this.editor = new Editor({
      element: this._createEditorRootElement(),
      extensions: [StarterKit.configure({
        placeholder: this.placeholder || "Start typing...",
      })],
      content: this.serializer === "json" ? JSON.parse(this.content) : this.content,
    });
  }

  constructor() {
    super();
  }

  render() {
    return html`
        <div class="richer-text-editor--content" part="editor">
          <slot name="editor"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("richer-text-editor", RicherTextEditor);
