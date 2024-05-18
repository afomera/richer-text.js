import {
  BaseList
} from "./chunk-4GNIXOWE.js";
import {
  x
} from "./chunk-M27UGOWE.js";

// src/editor/elements/EmojiList.js
var EmojiList = class extends BaseList {
  render() {
    return x`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => x`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.skins[0].native}
              <span style="marginLeft: 4px"></span>
              ${item.skins[0].shortcodes}
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
customElements.define("richer-text-emoji-list", EmojiList);

export {
  EmojiList
};
//# sourceMappingURL=chunk-NFGATUZ2.js.map
