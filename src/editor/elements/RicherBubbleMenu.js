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

      input {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;
        width: 200px;
      }

      .link-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        margin-left: 4px;
      }

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

      // State
      editingLink: { type: Boolean, state: true },
    }
  }

  constructor() {
    super();

    this.editingLink = false;
  }

  updated(changedProperties) {
    console.log('editor:', this.editor);

    if (changedProperties.has('editingLink')) {
      // this._computePositionEmojiPicker();
      console.log('editingLink:', this.editingLink);
    }
  }

  toggleBold() {
    this.editor.chain().focus().toggleBold().run();
  }

  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();
  }

  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();
  }

  toggleLinkEditor() {
    this.editingLink = !this.editingLink;
  }

  clearLinkAndClose() {
    this.editor.chain().focus().unsetLink().run();
    this.editingLink = false;
  }

  // Create event listener for submit or enter of input to set link
  _handleLinkInput(event) {
    console.log('event:', event);
  }


  // This is a simple bubble menu that toggles bold text.
  render() {
    console.log("Render editor", this.editor)

    if (!this.editingLink) {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.toggleBold()}>
            ${icons.get("bold")}
          </button>
          <button @click=${() => this.editor.chain().focus().toggleItalic().run()}>
            ${icons.get("italic")}
          </button>
          <button @click=${() => this.editor.chain().focus().toggleStrike().run()}>${icons.get("strike")}</button>
          <button @click=${() => this.toggleLinkEditor()}>${icons.get("link")}</button>
        </div>
      `
    } else {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <span class="link-icon">${icons.get("link")}</span>
          <input type="url" autofocus="true" placeholder="Enter a URL" @keydown=${this._handleLinkInput} />
          <button @click=${() => this.clearLinkAndClose()}>${icons.get("close")}</button>
        </div>
      `
    }
  }
}

customElements.define('richer-bubble-menu', RicherBubbleMenu);
