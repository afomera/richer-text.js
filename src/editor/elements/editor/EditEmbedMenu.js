import { html } from 'lit';

import icons from "../../icons";

import { BaseEditMenu } from './BaseEditMenu';

export class EditEmbedMenu extends BaseEditMenu {
  constructor() {
    super()

    this.removeNode = () => {};
    this.width = "28px";
  }


  static properties = {
    removeNode: { type: Function },
    width: { type: String },
  }

  render() {
    return html`
      <div class="richer-text-editor--edit-menu">
        <button class="toolbar-button" @click=${this.removeNode}>
          ${icons.get("delete")}
        </button>
      </div>
    `
  }
}

customElements.define('richer-text-editor-embed-menu', EditEmbedMenu);
