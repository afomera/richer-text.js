import {
  CustomSuggestion_default
} from "./chunk-C4RV2H35.js";
import {
  CustomBubbleMenu_default
} from "./chunk-OSW6TYRR.js";
import {
  CustomSuggestionSuggestion_default
} from "./chunk-ESY3IRWR.js";
import {
  RicherTextKit
} from "./chunk-E3SZSN5X.js";
import {
  RicherTextEmbed_default
} from "./chunk-RSRBWB7G.js";
import {
  Mention_default
} from "./chunk-UNX5T3KA.js";
import {
  uploadFile
} from "./chunk-VMBMKLRK.js";
import {
  tiptapStyles
} from "./chunk-S2DXAW4H.js";
import {
  richerTextEditorStyles
} from "./chunk-GEFRMSJW.js";
import {
  normalize
} from "./chunk-2EZFRUF7.js";
import {
  translations
} from "./chunk-WYVXEKWY.js";
import {
  icons_default
} from "./chunk-TGWDFHJ5.js";
import {
  MentionSuggestion_default
} from "./chunk-FY2HAP4Q.js";

// src/components/RicherTextEditor.js
import { LitElement, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { Editor } from "@tiptap/core";
import { RoleTooltip, RoleToolbar } from "role-components";
RoleTooltip.define();
RoleToolbar.define();
var RicherTextEditor = class extends LitElement {
  static get styles() {
    return [normalize, tiptapStyles, richerTextEditorStyles];
  }
  static get properties() {
    return {
      translations: {
        type: Object,
        converter: {
          fromAttribute: (value) => JSON.parse(value),
          toAttribute: (value) => JSON.stringify(value)
        }
      },
      autofocus: { type: Boolean, reflect: true },
      class: { type: String, reflect: true },
      callouts: { type: String, reflect: true },
      content: { type: String, reflect: true },
      placeholder: { type: String, reflect: true },
      readonly: { type: Boolean, reflect: true },
      serializer: { type: String, reflect: true },
      tables: { type: String, reflect: true },
      input: { type: String, reflect: true },
      mentionableUsersPath: { attribute: "mentionable-users-path", type: String, reflect: true },
      toolbarPlacement: { attribute: "toolbar-placement", type: String, reflect: true },
      toolbarPreset: { attribute: "toolbar-preset", type: String, reflect: true },
      customSuggestions: { attribute: "custom-suggestions", type: Array },
      embedsPath: { attribute: "embeds-path", type: String, reflect: true },
      toolbar: {
        type: Array,
        reflect: true,
        converter: {
          fromAttribute: (value) => {
            return value.split(",").map((s) => s.trim());
          },
          toAttribute: (value) => {
            return value.join(",");
          }
        }
      }
    };
  }
  configureToolbar() {
    if (this.toolbar.length > 0) {
      return;
    }
    if (this.toolbarPreset === "minimal") {
      this.toolbar = ["bold", "italic", "strike"];
    } else {
      this.toolbar = [
        "bold",
        "italic",
        "strike",
        "code",
        "divider",
        "heading-1",
        "heading-2",
        "heading-3",
        // 'highlight',
        "bulletlist",
        "orderedlist",
        "blockquote",
        "code-block",
        "horizontal-rule",
        "divider",
        "attachment",
        "spacer",
        "undo",
        "redo"
      ];
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.editor.destroy();
  }
  getHTML() {
    const html2 = this.editor.getHTML();
    return html2 === "<p></p>" ? "" : html2;
  }
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
  }
  emitChange() {
    this.emit("change", {
      html: this.getHTML(),
      json: this.editor.getJSON()
    });
    document.getElementById(this.input).value = this.serializer === "json" ? JSON.stringify(this.editor.getJSON()) : this.getHTML();
  }
  _createEditorRootElement() {
    const element = document.createElement("div");
    element.slot = "editor";
    this.shadowRoot.host.appendChild(element);
    return element;
  }
  updated(changedProperties) {
    if (changedProperties.has("toolbar") || changedProperties.has("toolbarPreset")) {
      this.configureToolbar();
    }
    if (changedProperties.has("content")) {
      this.editor.commands.setContent(this.serializer === "json" ? JSON.parse(this.content) : this.content);
    }
  }
  firstUpdated() {
    let extensions = [
      CustomBubbleMenu_default("customBubbleMenu").configure({
        shouldShow: ({ editor }) => {
          return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading") || editor.isActive("blockquote"));
        },
        oembed: this.oembed,
        embedPath: this.embedsPath
      }),
      CustomBubbleMenu_default("imageBubbleMenu").configure({
        mode: "image",
        pluginKey: "imageBubbleMenu",
        shouldShow: ({ editor }) => {
          return editor.isActive("image");
        }
      }),
      RicherTextEmbed_default.configure({
        embedPath: this.embedsPath
      }),
      RicherTextKit.configure({
        placeholder: this.placeholder || "Start typing...",
        callout: this.callouts !== "false",
        tables: this.tables !== "false"
      })
    ];
    if (this.tables !== "false") {
      extensions.push(
        CustomBubbleMenu_default("tableBubbleMenu").configure({
          mode: "table",
          pluginKey: "tableBubbleMenu",
          shouldShow: ({ editor }) => {
            return editor.isActive("table");
          }
        })
      );
    }
    if (this.mentionableUsersPath.length > 0) {
      extensions.push(
        Mention_default.configure({
          HTMLAttributes: { class: "richer-text--mention" },
          suggestion: MentionSuggestion_default(this.mentionableUsersPath)
        })
      );
    }
    this.customSuggestions.forEach((customSuggestion) => {
      extensions.push(
        CustomSuggestion_default(`${customSuggestion.name}Plugin`).configure({
          suggestion: CustomSuggestionSuggestion_default(customSuggestion.path, customSuggestion.trigger, `${customSuggestion.name}PluginKey`)
        })
      );
    });
    this.editor = new Editor({
      element: this._createEditorRootElement(),
      editable: !this.readonly,
      extensions: [...extensions],
      content: this.serializer === "json" ? JSON.parse(this.content) : this.content,
      autofocus: this.autofocus && !this.readonly,
      editorProps: {
        attributes: {
          class: this.class
        }
      },
      onCreate: () => {
        this.emitChange();
      },
      onUpdate: ({ editor }) => {
        this.requestUpdate();
        this.emitChange();
      },
      onSelectionUpdate: () => {
        this.requestUpdate();
      }
    });
    this.configureToolbar();
    this.requestUpdate();
  }
  constructor() {
    super();
    this.autofocus = false;
    this.class = "";
    this.translations = translations;
    this.toolbar = [];
    this.tables = "false";
    this.callouts = "false";
    this.toolbarPlacement = this.getAttribute("toolbar-placement") || "top";
    this.toolbarPreset = this.getAttribute("toolbar-preset") || "default";
    this.mentionableUsersPath = this.getAttribute("mentionable-users-path") || "";
    this.customSuggestions = JSON.parse(this.getAttribute("custom-suggestions")) || [];
    this.embedsPath = this.getAttribute("embeds-path") || "";
    this.oembed = this.getAttribute("oembed") || false;
  }
  clear() {
    this.editor.commands.clearContent(true);
  }
  focus() {
    this.editor.commands.focus();
  }
  blur() {
    this.editor.commands.blur();
  }
  toggleBold() {
    this.editor.chain().toggleBold().focus().run();
  }
  toggleItalic() {
    this.editor.chain().toggleItalic().focus().run();
  }
  toggleUnderline() {
    this.editor.chain().toggleUnderline().focus().run();
  }
  toggleCode() {
    this.editor.chain().toggleCode().focus().run();
  }
  toggleStrike() {
    this.editor.chain().toggleStrike().focus().run();
  }
  toggleHeadingLevel1() {
    this.editor.chain().toggleHeading({ level: 1 }).focus().run();
  }
  toggleHeadingLevel2() {
    this.editor.chain().toggleHeading({ level: 2 }).focus().run();
  }
  toggleHeadingLevel3() {
    this.editor.chain().toggleHeading({ level: 3 }).focus().run();
  }
  toggleBulletList() {
    this.editor.chain().toggleBulletList().focus().run();
  }
  toggleOrderedList() {
    this.editor.chain().toggleOrderedList().focus().run();
  }
  setHorizontalRule() {
    this.editor.chain().setHorizontalRule().focus().run();
  }
  toggleBlockquote() {
    this.editor.chain().toggleBlockquote().focus().run();
  }
  toggleCodeBlock() {
    this.editor.chain().toggleCodeBlock().focus().run();
  }
  toggleHighlight() {
    this.editor.chain().toggleHighlight().focus().run();
  }
  undo() {
    this.editor.chain().focus().undo().run();
  }
  redo() {
    this.editor.chain().focus().redo().run();
  }
  addFile() {
    const input = this.shadowRoot.getElementById("file-input");
    input.click();
  }
  handleFileUpload(event) {
    const files = event.target.files;
    Array.from(files).forEach((file, index) => {
      let id = {};
      let tr = this.editor.view.state.tr;
      if (!tr.selection.empty)
        tr.deleteSelection();
      tr.setMeta(this.editor.view, { add: { id, pos: tr.selection.from + index }, image: file });
      this.editor.view.dispatch(tr);
      const onUploadComplete = (attrs, completedUpload) => {
        const payload = {
          signedId: attrs.signedId,
          name: completedUpload.file.name,
          src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
          alt: completedUpload.file.name
        };
        this.editor.view.dispatch(
          this.editor.view.state.tr.replaceWith(this.editor.view.state.doc.content.size, this.editor.view.state.doc.content.size, this.editor.schema.nodes.image.create(payload)).setMeta(this.editor.view, { remove: { id } })
        );
      };
      uploadFile(file, onUploadComplete);
    });
    this.shadowRoot.getElementById("file-input").value = "";
  }
  renderToolbarButton(name) {
    if (!this.editor || !this.toolbar?.length)
      return "";
    const allToolbarItems = new Map(
      Object.entries({
        divider: html`<div class="divider" part="divider"></div>`,
        spacer: html`<div class="spacer" part="spacer"></div>`,
        "heading-1": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("heading", { level: 1 })
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleHeadingLevel1}"
          aria-describedby="h1-tooltip"
        >
          ${icons_default.get("h1")}
          <role-tooltip id="h1-tooltip" hoist>${this.translations.heading1}</role-tooltip>
        </button>`,
        "heading-2": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("heading", { level: 2 })
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleHeadingLevel2}"
          aria-describedby="h2-tooltip"
        >
          ${icons_default.get("h2")}
          <role-tooltip id="h2-tooltip" hoist>${this.translations.heading2}</role-tooltip>
        </button>`,
        "heading-3": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("heading", { level: 3 })
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleHeadingLevel3}"
          aria-describedby="h3-tooltip"
        >
          ${icons_default.get("h3")}
          <role-tooltip id="h3-tooltip" hoist>${this.translations.heading3}</role-tooltip>
        </button>`,
        highlight: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("highlight")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleHighlight}"
          aria-describedby="highlight-tooltip"
        >
          ${icons_default.get("highlight")}
          <role-tooltip id="highlight-tooltip" hoist>${this.translations.highlight}</role-tooltip>
        </button>`,
        "horizontal-rule": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("horizontal-rule")
        })}"
          tabindex="-1"
          data-role="toolbar-item"
          @click="${this.setHorizontalRule}"
          aria-describedby="hr-tooltip"
        >
          ${icons_default.get("horizontal-rule")}
          <role-tooltip id="hr-tooltip" hoist>${this.translations.horizontalRule}</role-tooltip>
        </button>`,
        bold: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("bold")
        })}"
          data-role="toolbar-item"
          @click="${this.toggleBold}"
          aria-describedby="bold-tooltip"
        >
          ${icons_default.get("bold")}
          <role-tooltip id="bold-tooltip" hoist>${this.translations.bold}</role-tooltip>
        </button>`,
        italic: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("italic")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleItalic}"
          aria-describedby="italic-tooltip"
        >
          ${icons_default.get("italic")}
          <role-tooltip id="italic-tooltip" hoist>${this.translations.italics}</role-tooltip>
        </button>`,
        underline: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("underline")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleUnderline}"
          aria-describedby="underline-tooltip"
        >
          ${icons_default.get("underline")}
          <role-tooltip id="underline-tooltip" hoist>${this.translations.underline}</role-tooltip>
        </button>`,
        strike: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("strike")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleStrike}"
          aria-describedby="strike-tooltip"
        >
          ${icons_default.get("strike")}
          <role-tooltip id="strike-tooltip" hoist>${this.translations.strike}</role-tooltip>
        </button>`,
        "code": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("code")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleCode}"
          aria-describedby="code-tooltip"
        >
          ${icons_default.get("code")}
          <role-tooltip id="code-tooltip" hoist>${this.translations.code}</role-tooltip>
        </button>`,
        bulletlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("bulletList")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleBulletList}"
          aria-describedby="bullet-tooltip"
        >
          ${icons_default.get("bullet-list")}
          <role-tooltip id="bullet-tooltip" hoist>${this.translations.bulletList}</role-tooltip>
        </button>`,
        orderedlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("orderedlist")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleOrderedList}"
          aria-describedby="ordered-tooltip"
        >
          ${icons_default.get("ordered-list")}
          <role-tooltip id="ordered-tooltip" hoist>${this.translations.orderedList}</role-tooltip>
        </button>`,
        blockquote: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("blockquote")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleBlockquote}"
          aria-describedby="blockquote-tooltip"
        >
          ${icons_default.get("blockquote")}
          <role-tooltip id="blockquote-tooltip" hoist>${this.translations.blockquote}</role-tooltip>
        </button>`,
        "code-block": html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
          "is-active": this.editor.isActive("codeBlock")
        })}"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.toggleCodeBlock}"
          aria-describedby="codeblock-tooltip"
        >
          ${icons_default.get("code-block")}
          <role-tooltip id="codeblock-tooltip" hoist>${this.translations.codeBlock}</role-tooltip>
        </button>`,
        undo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.undo}"
          aria-describedby="undo-tooltip"
        >
          ${icons_default.get("undo")}
          <role-tooltip id="undo-tooltip" hoist>${this.translations.undo}</role-tooltip>
        </button>`,
        redo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.redo}"
          aria-describedby="redo-tooltip"
        >
          ${icons_default.get("redo")}
          <role-tooltip id="redo-tooltip" hoist>${this.translations.redo}</role-tooltip>
        </button>`,
        attachment: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          data-role="toolbar-item"
          tabindex="-1"
          @click="${this.addFile}"
          aria-describedby="attachment-tooltip"
        >
          ${icons_default.get("attachment")}
          <role-tooltip id="attachment-tooltip" hoist>${this.translations.attachment}</role-tooltip>

          <input
            id="file-input"
            type="file"
            hidden
            multiple
            accept=${"image/*"}
            @change=${this.handleFileUpload}
          />
        </button>`
      })
    );
    return allToolbarItems.get(name);
  }
  render() {
    return html`
        <div class="wrapper" part="wrapper">
          <role-toolbar  class="toolbar" part="toolbar">
            ${map(this.toolbar, (name) => this.renderToolbarButton(name))}
          </role-toolbar>
          <slot name="editor"></slot>
        </div>
      </div>
    `;
  }
};
customElements.define("richer-text-editor", RicherTextEditor);

export {
  RicherTextEditor
};
//# sourceMappingURL=chunk-SQZLAAT3.js.map
