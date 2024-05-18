import {
  i,
  s,
  x
} from "./chunk-M27UGOWE.js";
import {
  __publicField
} from "./chunk-AHNUJI67.js";

// src/editor/elements/editor/BaseEditMenu.js
var BaseEditMenu = class extends s {
  constructor() {
    super();
    this.removeNode = () => {
    };
    this.width = "auto";
  }
  // This function should be implemented in the extending class
  render() {
    return x``;
  }
};
__publicField(BaseEditMenu, "styles", i`
    .richer-text-editor--edit-menu {
      display: flex;
      align-items: center;
      gap: 4px;

      position: relative;
      top: 16px;
      right: 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      max-width: 28px;

      .divider {
        border-left: 1px solid #ddd;
        height: 24px;
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
    }
  `);
__publicField(BaseEditMenu, "properties", {
  removeNode: { type: Function },
  width: { type: String }
});

export {
  BaseEditMenu
};
//# sourceMappingURL=chunk-FGRKPC42.js.map
