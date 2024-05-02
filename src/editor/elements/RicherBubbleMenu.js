import { html, css, LitElement } from 'lit';

import icons from "../icons";

import { Dropdown } from './Dropdown';

export class RicherBubbleMenu extends LitElement {
  static styles = css`
    .richer-text-editor--bubble-menu {
      z-index: 100;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      display: flex;
      align-items: center;
      gap: 4px;

      .divider {
        border-left: 1px solid #ddd;
        height: 24px;
      }

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
          background-color: #e5e7eb;
          border-radius: 4px;
        }
      }

      button.caret {
        position: relative;
        padding-right: 16px;
        margin: 0;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #333 transparent transparent;
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
      mode: { type: String, state: true },
    }
  }

  constructor() {
    super();

    this.editingLink = false;
    this.mode = "text";

    this.requestUpdate();
  }

  removeNode() {
    console.log("removeNode")
    this.editor.chain().focus().deleteSelection().run();

    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  resizeImage(size) {
    console.log("resizeImage", size)
    this.editor.chain().focus().setImageWidth(size).run();

    // Rebuild the bubble menu element to update the button state
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

  toggleLeftAlignment() {
    this.editor.chain().focus().setTextAlign("left").run();
    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  toggleCenterAlignment() {
    this.editor.chain().focus().setTextAlign("center").run();
    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  toggleRightAlignment() {
    this.editor.chain().focus().setTextAlign("right").run();
    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  clear() {
    console.log('clear')

    this.editor.chain().clearContent(true).focus().run();

    // Rebuild the bubble menu element to update the button state
    this.requestUpdate();
  }

  focus() {
    this.editor.commands.focus();
  }

  blur() {
    this.editor.commands.blur();
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
    // if (this.isActive("image") || this.isActive("mention") || this.isActive("codeBlock") || this.isActive("richerTextEmbed")) {
    //   return html``;
    // }
    if (this.mode == "image") {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.removeNode()}>
            ${icons.get("delete")}
          </button>
          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.resizeImage("25%")}>
            ${icons.get("small-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("50%")}>
            ${icons.get("medium-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("100%")}>
            ${icons.get("large-square")}
          </button>
        </div>
      `
    } else if (this.mode == "text" && !this.editingLink) {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.toggleBold()}>
            ${icons.get("bold")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleItalic()}>
            ${icons.get("italic")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleStrike()}>
            ${icons.get("strike")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleLinkEditor()}>${icons.get("link")}</button>

          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.toggleLeftAlignment()}>${icons.get("align-left")}</button>
          <button class="toolbar-button" @click=${() => this.toggleCenterAlignment()}>${icons.get("align-center")}</button>
          <button class="toolbar-button" @click=${() => this.toggleRightAlignment()}>${icons.get("align-right")}</button>

          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons.get("highlight")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown>
          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons.get("text-color")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown>
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
