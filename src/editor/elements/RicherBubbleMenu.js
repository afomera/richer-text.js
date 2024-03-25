import { html, css, LitElement } from 'lit';

import icons from "../icons";

export class RicherBubbleMenu extends LitElement {
  static styles = css`
    .richer-text-editor--bubble-menu {
      z-index: 100;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;
        
        &:hover {
          background-color: #f9f9f9;
          border-radius: 4px;
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  `

  static get properties() {
    return {
      editor: { type: Function },
    }
  }

  constructor() {
    super();
  }

  updated(changedProperties) {
    console.log('editor:', this.editor);
  }

  toggleBold() {
    this.editor.chain().focus().toggleBold().run();
  }

  // This is a simple bubble menu that toggles bold text.
  render() {
    console.log("Render editor", this.editor)

    return html`
      <div class="richer-text-editor--bubble-menu">
        <button @click=${() => this.toggleBold()}>
          ${icons.get("bold")}
        </button>
        <button @click=${() => this.editor.chain().focus().toggleItalic().run()}>
          ${icons.get("italic")}
        </button>
      </div>
    `
  }
}

customElements.define('richer-bubble-menu', RicherBubbleMenu);
