import { html, css, LitElement } from 'lit';

export class MentionList extends LitElement {
  static styles = css`
    .suggested-items {
      padding: 0.2rem;
      position: relative;
      border-radius: 0.5rem;
      background: #fff;
      color: rgba(0, 0, 0, 0.8);
      overflow: hidden;
      font-size: 0.9rem;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
    }
    .suggested-item {
      display: flex;
      align-items: center;
      margin: 0;
      width: 100%;
      text-align: left;
      background: transparent;
      border-radius: 0.4rem;
      border: 1px solid transparent;
      padding: 0.2rem 0.4rem;

      img {
        border-radius: 50%;
        margin-right: 0.4rem;
      }
    }
    .suggested-item.is-selected {
      border-color: #000;
    }
  `

  static properties = {
    items: { type: Array },
    selectedIndex: { type: Number },
    command: { type: Function }
  }

  constructor() {
    super();
    this.items = [];
    this.selectedIndex = 0;
    this.command = () => {};
  }

  render() {
    return html`
      <div class="suggested-items">
        ${this.items.length > 0 ? 
          this.items.map((item, index) => html`
            <button
              class="suggested-item ${index === this.selectedIndex ? 'is-selected' : ''}"
              @click=${() => this.selectItem(index)}
            >
              ${item.avatarUrl ? (html`<img src=${item.avatarUrl} width="24" height="24" alt=${item.label} />`) : ""}
              ${item.label}
            </button>`
          ) : html`<div class="suggested-item">No results</div>`}
      </div>
    `;
  }

    onKeyDown({event}) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      this.enterHandler()
      return true
    }

    return false
  }

  upHandler() {
    this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
  }

  downHandler() {
    this.selectedIndex = (this.selectedIndex + 1) % this.items.length
  }

  enterHandler() {
    this.selectItem(this.selectedIndex)
  }

  selectItem(index) {
    const item = this.items[index]
    if (item) {
      this.command({
        id: item.id,
        label: item.label,
        avatarUrl: item.avatarUrl
      })
    }
  }
}

customElements.define('richer-text-mention-list', MentionList);
