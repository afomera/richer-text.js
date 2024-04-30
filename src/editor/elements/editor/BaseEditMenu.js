import { html, css, LitElement } from 'lit';

export class BaseEditMenu extends LitElement {
  static styles = css`
    .richer-text-editor--edit-menu {
      display: flex;
      align-items: center;
      gap: 4px;

      position: relative;
      top: 16px;
      right: 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      max-width: 128px;

      .divider {
        border-left: 1px solid #ddd;
        height: 24px;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;

        &:hover {
          background-color: #f9f9f9;
          border-radius: 4px;
        }
      }
    }
  `

  static properties = {
    removeNode: { type: Function },
    width: { type: String },
  }

  constructor() {
    super()

    this.removeNode = () => {};
    this.width = "auto";
  }

  // This function should be implemented in the extending class
  render() {
    return html``;
  }
}

// Don't register this element directly as we don't want to use it in the editor and want to extend it in the MentionList element
// customElements.define('richer-text-base-edit-menu', BaseEditMenu);
