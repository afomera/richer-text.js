import {
  icons_default
} from "./chunk-BCSNHLOR.js";
import {
  BaseList
} from "./chunk-4GNIXOWE.js";
import {
  b,
  x
} from "./chunk-M27UGOWE.js";

// src/editor/elements/MenuList.js
var MenuList = class extends BaseList {
  render() {
    return x`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => x`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.iconName ? b`${icons_default.get(item.iconName)}` : ""}
              ${item.label}
            </button>`
    ) : x`<div class="suggested-item">No results</div>`}
      </div>
    `;
  }
  selectItem(index) {
    const item = this.items[index];
    if (item) {
      this.command(item);
    }
  }
};
customElements.define("richer-text-menu-list", MenuList);

export {
  MenuList
};
//# sourceMappingURL=chunk-4B3ZECTT.js.map
