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
      isActive: { type: Function, state: true },
    }
  }

  constructor() {
    super();

    this.editingLink = false;

    this.requestUpdate();
  }

  toggleBold() {
    this.editor.chain().focus().toggleBold().run();

    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();

    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();

    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  get isBold() {
    return this.editor.isActive("bold");
  }

  toggleLinkEditor() {
    this.editingLink = !this.editingLink;

    if (this.editingLink) {
      // Add a small delay to ensure the input is focused after the element is rendered
      setTimeout(() => {
        this.shadowRoot.getElementById('link-url').focus();
      }, 50);
    }
  }

  setLinkAndClose() {
    const url = this.shadowRoot.getElementById('link-url').value;

    if (url) {
      this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } else {
      this.editor.chain().focus().unsetLink().run();
    }

    this.editingLink = false;
  }

  _handleLinkSubmit(event) {
    event.preventDefault();
    this.setLinkAndClose();
  }


  // This is a simple bubble menu that toggles bold text.
  render() {
    if (this.isActive("image") || this.isActive("mention") || this.isActive("codeBlock") || this.isActive("richerTextEmbed")) {
      return html``;
    }

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
          <form @submit=${this._handleLinkSubmit}>
            <span class="link-icon">${icons.get("link")}</span>
            <input id="link-url" value=${this.editor.getAttributes("link").href} type="url" autofocus="true" placeholder="Enter a URL" />
            <button @click=${() => this.setLinkAndClose()}>Done</button>
          </form>
        </div>
      `
    }
  }
}

customElements.define('richer-bubble-menu', RicherBubbleMenu);
