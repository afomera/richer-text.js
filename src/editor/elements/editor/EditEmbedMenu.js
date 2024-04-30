import { html, css, LitElement, svg } from 'lit';

import icons from "../../icons";

export class EditEmbedMenu extends LitElement {
  static styles = css`
    .richer-text-editor--embed-menu {
      position: relative;
      top: 16px;
      right: 0;
      width: 28px;

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

  static properties = {
    removeNode: { type: Function },
  }

  constructor() {
    super();

    this.removeNode = () => {};
  }

  render() {
    return html`
      <div class="richer-text-editor--embed-menu">
        <button class="toolbar-button" @click=${this.removeNode}>
          ${icons.get("delete")}
        </button>
      </div>
    `
  }
}

customElements.define('richer-text-editor-embed-menu', EditEmbedMenu);
