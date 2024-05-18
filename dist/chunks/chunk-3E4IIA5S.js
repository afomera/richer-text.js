import {
  BaseList
} from "./chunk-XFEFOKNE.js";

// src/editor/elements/CustomSuggestionList.js
import { html } from "lit";
var CustomSuggestionList = class extends BaseList {
  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? this.items.map(
      (item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? "is-selected" : ""}"
              @click=${() => this.selectItem(index)}
            >
              ${item.label}
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
customElements.define("richer-text-custom-suggestion-list", CustomSuggestionList);

export {
  CustomSuggestionList
};
//# sourceMappingURL=chunk-3E4IIA5S.js.map
