import { html } from 'lit';

import icons from "../../icons";

import { BaseEditMenu } from './BaseEditMenu';

export class EditImageMenu extends BaseEditMenu {
  constructor() {
    super()

    this.removeNode = () => {};
    this.resizeImage = (size) => () => {};
    this.width = "128px";
  }

  static properties = {
    removeNode: { type: Function },
    resizeImage: { type: Function },
    width: { type: String },
  }

  render() {
    return html`
      <div class="richer-text-editor--edit-menu">
        <button class="toolbar-button" @click=${this.removeNode}>
          ${icons.get("delete")}
        </button>
        <div class="divider"></div>
        <button class="toolbar-button" @click=${this.resizeImage("25%")}>
          ${icons.get("small-square")}
        </button>
        <button class="toolbar-button" @click=${this.resizeImage("50%")}>
          ${icons.get("medium-square")}
        </button>
        <button class="toolbar-button" @click=${this.resizeImage("100%")}>
          ${icons.get("large-square")}
        </button>
      </div>
    `
  }
}

customElements.define('richer-text-editor-image-menu', EditImageMenu);
