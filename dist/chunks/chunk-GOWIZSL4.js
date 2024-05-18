import {
  BaseList
} from "./chunk-XFEFOKNE.js";

// src/editor/elements/MentionList.js
import { html } from "lit";
var MentionList = class extends BaseList {
  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.avatarUrl ? html`<img src=${item.avatarUrl} width="24" height="24" alt=${item.label} />` : ""}
              ${item.label}
            </button>`
    ) : html`<div class="suggested-item">No results</div>`}
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
//# sourceMappingURL=chunk-GOWIZSL4.js.map
