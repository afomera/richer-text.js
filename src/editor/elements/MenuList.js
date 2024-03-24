import { html, svg } from 'lit';
import { BaseList } from './BaseList';
import icons from '../icons';

export class MenuList extends BaseList {
  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? 
          this.items.map((item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? 'is-selected' : ''}"
              @click=${() => this.selectItem(index)}
            >
              ${item.iconName ? svg`${icons.get(item.iconName)}` : ""}
              ${item.label}
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

customElements.define('richer-text-menu-list', MenuList);
