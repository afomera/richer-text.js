import {
  icons_default
} from "./chunk-Y3GZZSZO.js";
import {
  __publicField
} from "./chunk-7ZQBTYAI.js";

// src/editor/elements/RicherBubbleMenu.js
import { html, css, LitElement } from "lit";
import { RoleTooltip } from "role-components";
RoleTooltip.define();
var RicherBubbleMenu = class extends LitElement {
  static get properties() {
    return {
      editor: { type: Function },
      embedPath: { type: String },
      urlMatchesPattern: { type: Boolean },
      oembed: { type: Boolean },
      // State
      editingLink: { type: Boolean, state: true },
      isActive: { type: Function, state: true },
      mode: { type: String, state: true },
      embedPatterns: { type: Array, state: true }
    };
  }
  constructor() {
    super();
    this.editingLink = false;
    this.mode = "text";
    this.embedPath = "";
    this.embedPatterns = [];
    this.oembed = false;
    this.urlMatchesPattern = false;
    this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  updated(changedProperties) {
    if (changedProperties.has("embedPath") || changedProperties.has("oembed")) {
      this.fetchOEmbedPatterns();
    }
    if (changedProperties.has("urlMatchesPattern")) {
      this.requestUpdate();
    }
  }
  removeNode() {
    this.editor.chain().focus().deleteSelection().run();
    this.requestUpdate();
  }
  resizeImage(size) {
    this.editor.chain().focus().setImageWidth(size).run();
    this.requestUpdate();
  }
  toggleBold() {
    this.editor.chain().focus().toggleBold().run();
    this.requestUpdate();
  }
  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();
    this.requestUpdate();
  }
  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();
    this.requestUpdate();
  }
  get isBold() {
    return this.editor.isActive("bold");
  }
  toggleLinkEditor() {
    this.editingLink = !this.editingLink;
    if (this.editingLink) {
      setTimeout(() => {
        this.shadowRoot.getElementById("link-url").focus();
      }, 50);
    }
  }
  toggleLeftAlignment() {
    this.editor.chain().focus().setTextAlign("left").run();
    this.requestUpdate();
  }
  toggleCenterAlignment() {
    this.editor.chain().focus().setTextAlign("center").run();
    this.requestUpdate();
  }
  toggleRightAlignment() {
    this.editor.chain().focus().setTextAlign("right").run();
    this.requestUpdate();
  }
  clear() {
    this.editor.chain().clearContent(true).focus().run();
    this.requestUpdate();
  }
  focus() {
    this.editor.commands.focus();
  }
  blur() {
    this.editor.commands.blur();
  }
  setLinkAndClose(embed = false) {
    const url = this.shadowRoot.getElementById("link-url").value;
    if (embed) {
      fetch(`${this.embedPath}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: url }) }).then((response) => response.json()).then((data) => {
        if (data.content) {
          this.editor.chain().focus().deleteSelection().insertContent(data.content).run();
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    if (!embed && url) {
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      this.editor.chain().focus().unsetLink().run();
    }
    this.editingLink = false;
    this.urlMatchesPattern = false;
  }
  _handleLinkSubmit(event) {
    event.preventDefault();
    this.setLinkAndClose();
  }
  deleteTable() {
    this.editor.chain().focus().deleteTable().run();
    this.requestUpdate();
  }
  insertColumnLeft() {
    this.editor.chain().focus().addColumnBefore().run();
    this.requestUpdate();
  }
  insertColumnRight() {
    this.editor.chain().focus().addColumnAfter().run();
    this.requestUpdate();
  }
  deleteColumn() {
    this.editor.chain().focus().deleteColumn().run();
    this.requestUpdate();
  }
  insertRowAbove() {
    this.editor.chain().focus().addRowBefore().run();
    this.requestUpdate();
  }
  insertRowBelow() {
    this.editor.chain().focus().addRowAfter().run();
    this.requestUpdate();
  }
  deleteRow() {
    this.editor.chain().focus().deleteRow().run();
    this.requestUpdate();
  }
  toggleHeaderColumn() {
    this.editor.chain().focus().toggleHeaderColumn().run();
    this.requestUpdate();
  }
  toggleHeaderRow() {
    this.editor.chain().focus().toggleHeaderRow().run();
    this.requestUpdate();
  }
  fetchOEmbedPatterns() {
    if (!this.oembed) {
      return;
    }
    fetch(`${this.embedPath}/patterns`).then((response) => response.json()).then((data) => {
      this.embedPatterns = data;
    });
  }
  onURLChange(event) {
    if (this.oembed) {
      var url = event.target.value;
      const pattern = this.embedPatterns.find((pattern2) => {
        if (url == "") {
          return false;
        }
        const regex = new RegExp(pattern2.source);
        return regex.test(url);
      });
      if (pattern) {
        this.urlMatchesPattern = true;
      } else {
        this.urlMatchesPattern = false;
      }
    }
  }
  render() {
    if (this.mode == "table") {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.insertColumnLeft()} aria-describedby="insert-column-left-tooltip">
            ${icons_default.get("insert-column-left")}
            <role-tooltip id="insert-column-left-tooltip" hoist>Insert column before</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertColumnRight()} aria-describedby="insert-column-right-tooltip">
            ${icons_default.get("insert-column-right")}
            <role-tooltip id="insert-column-right-tooltip" hoist>Insert column after</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.deleteColumn()} aria-describedby="column-remove-tooltip">
            ${icons_default.get("delete-column")}
            <role-tooltip id="column-remove-tooltip" hoist>Delete column</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertRowAbove()} aria-describedby="insert-row-above-tooltip">
            ${icons_default.get("insert-row-above")}
            <role-tooltip id="insert-row-above-tooltip" hoist>Insert row before</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertRowBelow()} aria-describedby="insert-row-below-tooltip">
            ${icons_default.get("insert-row-below")}
            <role-tooltip id="insert-row-below-tooltip" hoist>Insert row after</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.deleteRow()} aria-describedby="delete-row-tooltip">
            ${icons_default.get("delete-row")}
            <role-tooltip id="delete-row-tooltip" hoist>Delete row</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.toggleHeaderColumn()} aria-describedby="toggle-header-column-tooltip">
            ${icons_default.get("toggle-header-column")}
            <role-tooltip id="toggle-header-column-tooltip" hoist>Toggle header column</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.toggleHeaderRow()} aria-describedby="toggle-header-row-tooltip">
            ${icons_default.get("toggle-header-row")}
            <role-tooltip id="toggle-header-row-tooltip" hoist>Toggle header row</role-tooltip>
          </button>

          <div class="divider"></div>

          <button class="toolbar-button" @click=${() => this.deleteTable()} aria-describedby="delete-table-tooltip">
            ${icons_default.get("delete-table")}
            <role-tooltip id="delete-table-tooltip" hoist>Delete Table</role-tooltip>
          </button>
        </div>
      `;
    } else if (this.mode == "image") {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.removeNode()}>
            ${icons_default.get("delete")}
          </button>
          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.resizeImage("25%")}>
            ${icons_default.get("small-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("50%")}>
            ${icons_default.get("medium-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("100%")}>
            ${icons_default.get("large-square")}
          </button>
        </div>
      `;
    } else if (this.mode == "text" && !this.editingLink) {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.toggleBold()}>
            ${icons_default.get("bold")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleItalic()}>
            ${icons_default.get("italic")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleStrike()}>
            ${icons_default.get("strike")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleLinkEditor()}>${icons_default.get("link")}</button>

          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.toggleLeftAlignment()}>${icons_default.get("align-left")}</button>
          <button class="toolbar-button" @click=${() => this.toggleCenterAlignment()}>${icons_default.get("align-center")}</button>
          <button class="toolbar-button" @click=${() => this.toggleRightAlignment()}>${icons_default.get("align-right")}</button>
        <!--
          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons_default.get("highlight")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown>
          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons_default.get("text-color")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown> -->
        </div>
      `;
    } else {
      return html`
        <div class="richer-text-editor--bubble-menu">
          <form @submit=${this._handleLinkSubmit}>
            <span class="link-icon">${icons_default.get("link")}</span>
            <input id="link-url" value=${this.editor.getAttributes("link").href} @input=${this.onURLChange} type="url" autofocus="true" placeholder="Enter a URL" />
            <button @click=${() => this.setLinkAndClose()}>Done</button>
            ${this.urlMatchesPattern ? html`<button @click=${() => this.setLinkAndClose(true)}>Embed</button>` : null}
          </form>
        </div>
      `;
    }
  }
};
__publicField(RicherBubbleMenu, "styles", css`
    .richer-text-editor--bubble-menu {
      z-index: 100;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      display: flex;
      align-items: center;
      gap: 4px;

      .divider {
        border-left: 1px solid #ddd;
        height: 24px;
      }

      input {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;
        width: 200px;
      }

      .link-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        margin-left: 4px;
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
          background-color: #e5e7eb;
          border-radius: 4px;
        }
      }

      button.caret {
        position: relative;
        padding-right: 16px;
        margin: 0;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #333 transparent transparent;
        }
      }
    }
  `);
customElements.define("richer-bubble-menu", RicherBubbleMenu);

export {
  RicherBubbleMenu
};
//# sourceMappingURL=chunk-P4AOTAMZ.js.map
