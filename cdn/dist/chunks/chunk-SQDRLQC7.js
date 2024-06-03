import {
  BaseEditMenu
} from "./chunk-FGRKPC42.js";
import {
  icons_default
} from "./chunk-5MSFYVJA.js";
import {
  x
} from "./chunk-M27UGOWE.js";
import {
  __publicField
} from "./chunk-AHNUJI67.js";

// src/editor/elements/editor/EditEmbedMenu.js
var EditEmbedMenu = class extends BaseEditMenu {
  constructor() {
    super();
    this.removeNode = () => {
    };
    this.width = "28px";
  }
  render() {
    return x`
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
//# sourceMappingURL=chunk-SQDRLQC7.js.map
