import { html } from 'lit';
import { BaseList } from './BaseList';

export class EmojiList extends BaseList {
  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? 
          this.items.map((item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? 'is-selected' : ''}"
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
    const item = this.items[index]
    if (item) {
      this.command(item);
    }
  }
}

customElements.define('richer-text-emoji-list', EmojiList);
