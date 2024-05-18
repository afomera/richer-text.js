import {
  BaseList
} from "./chunk-4GNIXOWE.js";
import {
  x
} from "./chunk-M27UGOWE.js";

// src/editor/elements/MentionList.js
var MentionList = class extends BaseList {
  render() {
    return x`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => x`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.avatarUrl ? x`<img src=${item.avatarUrl} width="24" height="24" alt=${item.label} />` : ""}
              ${item.label}
            </button>`
    ) : x`<div class="suggested-item">No results</div>`}
      </div>
    `;
  }
  selectItem(index) {
    const item = this.items[index];
    if (item) {
      this.command({
        id: item.id,
        label: item.label,
        avatarUrl: item.avatarUrl
      });
    }
  }
};
customElements.define("richer-text-mention-list", MentionList);

export {
  MentionList
};
//# sourceMappingURL=chunk-LMSIRDKZ.js.map
