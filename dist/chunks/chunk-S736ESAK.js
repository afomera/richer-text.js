import {
  BaseList
} from "./chunk-XFEFOKNE.js";

// src/editor/elements/EmojiList.js
import { html } from "lit";
var EmojiList = class extends BaseList {
  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.skins[0].native}
              <span style="marginLeft: 4px"></span>
              ${item.skins[0].shortcodes}
            </button>`
    ) : html`<div class="suggested-item">No results</div>`}
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
//# sourceMappingURL=chunk-S736ESAK.js.map
