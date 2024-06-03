import {
  BaseEditMenu
} from "./chunk-PY7BWEAX.js";
import {
  icons_default
} from "./chunk-Y3GZZSZO.js";
import {
  __publicField
} from "./chunk-7ZQBTYAI.js";

// src/editor/elements/editor/EditEmbedMenu.js
import { html } from "lit";
var EditEmbedMenu = class extends BaseEditMenu {
  constructor() {
    super();
    this.removeNode = () => {
    };
    this.width = "28px";
  }
  render() {
    return html`
      <div class="richer-text-editor--edit-menu">
        <button class="toolbar-button" @click=${this.removeNode}>
          ${icons_default.get("delete")}
        </button>
      </div>
    `;
  }
};
__publicField(EditEmbedMenu, "properties", {
  removeNode: { type: Function },
  width: { type: String }
});
customElements.define("richer-text-editor-embed-menu", EditEmbedMenu);

export {
  EditEmbedMenu
};
//# sourceMappingURL=chunk-UXPPF6PQ.js.map
