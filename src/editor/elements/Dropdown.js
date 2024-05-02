import { html, css, LitElement } from 'lit';


export class DropdownItem extends LitElement {
  static styles = css`
    .dropdown-item {
      padding: 4px;
      display: block;
      text-align: left;
      text-decoration: none;
      color: black;
      font-size: 14px;
    }

    .dropdown-item:hover {
      background-color: #f1f1f1;
    }
  `

  static properties = {
    href: { type: String },
    onClick: { type: Function }
  }

  constructor() {
    super();

    this.href = '';
    this.onClick = () => {};
  }

  render() {
    return html`
      <a class="dropdown-item" href="#" @click=${this.onClick}>
        <slot></slot>
      </a>
    `;
  }

}

customElements.define('rte-dropdown-item', DropdownItem);

export class Dropdown extends LitElement {
  static styles = css`
  [hidden] {
      display: none !important;
    }

    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    button {
      background-color: inherit;
      border: none;
      color: inherit;
      cursor: pointer;
    }


    .dropdown {
      position: relative;
      display: inline-block;

      background: none;
      border: none;
      cursor: pointer;
    }

    .dropdown-items {
      background-color: #f9f9f9;
      border: 1px solid #f1f1f1;
      display: none;
      position: absolute;
      z-index: 1;
    }

    .dropdown-items.is-active {
      display: block;
    }

    .dropdown-trigger {
      cursor: pointer;
      color: inherit;
    }
  `

  static properties = {
    open: { type: Boolean }
  }

  constructor() {
    super();
    this.open = false;
  }

  toggleDropdown() {
    console.log('toggleDropdown')
    this.open = !this.open;

    const dropdown = this.shadowRoot.querySelector('.dropdown-items');
    dropdown.classList.toggle('is-active');
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="dropdown">
        <button class="dropdown-trigger" @click=${this.toggleDropdown}>
          <slot name="trigger"></slot>
        </button>
        <div class="dropdown-items">
          <slot name="items" @click=${this.toggleDropdown}></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('rte-dropdown', Dropdown);
