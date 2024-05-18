import {
  i,
  s,
  x
} from "./chunk-M27UGOWE.js";
import {
  __publicField
} from "./chunk-AHNUJI67.js";

// src/editor/elements/Dropdown.js
var DropdownItem = class extends s {
  constructor() {
    super();
    this.href = "";
    this.onClick = () => {
    };
  }
  render() {
    return x`
      <a class="dropdown-item" href="#" @click=${this.onClick}>
        <slot></slot>
      </a>
    `;
  }
};
__publicField(DropdownItem, "styles", i`
    .dropdown-item {
      padding: 8px;
      display: block;
      text-align: left;
      text-decoration: none;
      color: black;
      font-size: 14px;
    }

    .dropdown-item:hover {
      background-color: #e5e7eb;
    }
  `);
__publicField(DropdownItem, "properties", {
  href: { type: String },
  onClick: { type: Function }
});
customElements.define("rte-dropdown-item", DropdownItem);
var Dropdown = class extends s {
  constructor() {
    super();
    this.open = false;
  }
  toggleDropdown() {
    this.open = !this.open;
    const dropdown = this.shadowRoot.querySelector(".dropdown-items");
    dropdown.classList.toggle("is-active");
    this.requestUpdate();
  }
  render() {
    return x`
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
};
__publicField(Dropdown, "styles", i`
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
      min-width: 110px;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
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
  `);
__publicField(Dropdown, "properties", {
  open: { type: Boolean }
});
customElements.define("rte-dropdown", Dropdown);

export {
  DropdownItem,
  Dropdown
};
//# sourceMappingURL=chunk-KAJCYCMN.js.map
