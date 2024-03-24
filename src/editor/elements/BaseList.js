import { html, css, LitElement } from 'lit';

export class BaseList extends LitElement {
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
      font-size: 0.9rem;

      img {
        border-radius: 50%;
        margin-right: 0.4rem;
      }

      svg {
        color: rgba(0, 0, 0, 0.5);
        width: 1.5rem;
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

  // This function should be implemented in the extending class
  render() {
    return html``;
  }

  // This function should be implemented in the extending class
  selectItem(index) {
  }
}

// Don't register this element directly as we don't want to use it in the editor and want to extend it in the MentionList element
// customElements.define('richer-text-base-list', BaseList);
