import {
  CustomSuggestion_default
} from "./chunk-4LUJ7UE2.js";
import {
  CustomBubbleMenu_default
} from "./chunk-MZCVHL2V.js";
import {
  tooltip_register_default
} from "./chunk-WHTAQ2BA.js";
import {
  CustomSuggestionSuggestion_default
} from "./chunk-45F5BQAR.js";
import {
  RicherTextKit
} from "./chunk-IPSTRGNW.js";
import {
  RicherTextEmbed_default
} from "./chunk-CR6Z3WST.js";
import {
  Mention_default
} from "./chunk-TBRRN3VR.js";
import {
  uploadFile
} from "./chunk-JP2JHRNY.js";
import {
  Editor
} from "./chunk-NC7G5KJY.js";
import {
  tiptapStyles
} from "./chunk-MS7SMJCI.js";
import {
  richerTextEditorStyles
} from "./chunk-VSZ7J2XC.js";
import {
  normalize
} from "./chunk-7J4DA63T.js";
import {
  translations
} from "./chunk-NYRCWD4H.js";
import {
  icons_default
} from "./chunk-BCSNHLOR.js";
import {
  MentionSuggestion_default
} from "./chunk-NFKB2V3O.js";
import {
  s,
  w,
  x
} from "./chunk-M27UGOWE.js";

// node_modules/lit-html/directive.js
var t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e = (t2) => (...e3) => ({ _$litDirective$: t2, values: e3 });
var i = class {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e3, i2) {
    this._$Ct = t2, this._$AM = e3, this._$Ci = i2;
  }
  _$AS(t2, e3) {
    return this.update(t2, e3);
  }
  update(t2, e3) {
    return this.render(...e3);
  }
};

// node_modules/lit-html/directives/class-map.js
var e2 = e(class extends i {
  constructor(t2) {
    if (super(t2), t2.type !== t.ATTRIBUTE || "class" !== t2.name || t2.strings?.length > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i2]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i2)
        i2[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i2);
    }
    const r = s2.element.classList;
    for (const t2 of this.st)
      t2 in i2 || (r.remove(t2), this.st.delete(t2));
    for (const t2 in i2) {
      const s3 = !!i2[t2];
      s3 === this.st.has(t2) || this.nt?.has(t2) || (s3 ? (r.add(t2), this.st.add(t2)) : (r.remove(t2), this.st.delete(t2)));
    }
    return w;
  }
});

// node_modules/lit-html/directives/map.js
function* o(o2, f) {
  if (void 0 !== o2) {
    let i2 = 0;
    for (const t2 of o2)
      yield f(t2, i2++);
  }
}

// src/components/RicherTextEditor.js
tooltip_register_default.define();
var RicherTextEditor = class extends s {
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
            return value.split(",").map((s2) => s2.trim());
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
    const html = this.editor.getHTML();
    return html === "<p></p>" ? "" : html;
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
        divider: x`<div class="divider" part="divider"></div>`,
        spacer: x`<div class="spacer" part="spacer"></div>`,
        "heading-1": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("heading", { level: 1 })
        })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel1}"
          aria-describedby="h1-tooltip"
        >
          ${icons_default.get("h1")}
          <role-tooltip id="h1-tooltip" hoist>${this.translations.heading1}</role-tooltip>
        </button>`,
        "heading-2": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("heading", { level: 2 })
        })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel2}"
          aria-describedby="h2-tooltip"
        >
          ${icons_default.get("h2")}
          <role-tooltip id="h2-tooltip" hoist>${this.translations.heading2}</role-tooltip>
        </button>`,
        "heading-3": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("heading", { level: 3 })
        })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel3}"
          aria-describedby="h3-tooltip"
        >
          ${icons_default.get("h3")}
          <role-tooltip id="h3-tooltip" hoist>${this.translations.heading3}</role-tooltip>
        </button>`,
        highlight: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("highlight")
        })}"
          tabindex="-1"
          @click="${this.toggleHighlight}"
          aria-describedby="highlight-tooltip"
        >
          ${icons_default.get("highlight")}
          <role-tooltip id="highlight-tooltip" hoist>${this.translations.highlight}</role-tooltip>
        </button>`,
        "horizontal-rule": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("horizontal-rule")
        })}"
          tabindex="-1"
          @click="${this.setHorizontalRule}"
          aria-describedby="hr-tooltip"
        >
          ${icons_default.get("horizontal-rule")}
          <role-tooltip id="hr-tooltip" hoist>${this.translations.horizontalRule}</role-tooltip>
        </button>`,
        bold: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("bold")
        })}"
          @click="${this.toggleBold}"
          aria-describedby="bold-tooltip"
        >
          ${icons_default.get("bold")}
          <role-tooltip id="bold-tooltip" hoist>${this.translations.bold}</role-tooltip>
        </button>`,
        italic: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("italic")
        })}"
          tabindex="-1"
          @click="${this.toggleItalic}"
          aria-describedby="italic-tooltip"
        >
          ${icons_default.get("italic")}
          <role-tooltip id="italic-tooltip" hoist>${this.translations.italics}</role-tooltip>
        </button>`,
        underline: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("underline")
        })}"
          tabindex="-1"
          @click="${this.toggleUnderline}"
          aria-describedby="underline-tooltip"
        >
          ${icons_default.get("underline")}
          <role-tooltip id="underline-tooltip" hoist>${this.translations.underline}</role-tooltip>
        </button>`,
        strike: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("strike")
        })}"
          tabindex="-1"
          @click="${this.toggleStrike}"
          aria-describedby="strike-tooltip"
        >
          ${icons_default.get("strike")}
          <role-tooltip id="strike-tooltip" hoist>${this.translations.strike}</role-tooltip>
        </button>`,
        "code": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("code")
        })}"
          tabindex="-1"
          @click="${this.toggleCode}"
          aria-describedby="code-tooltip"
        >
          ${icons_default.get("code")}
          <role-tooltip id="code-tooltip" hoist>${this.translations.code}</role-tooltip>
        </button>`,
        bulletlist: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("bulletList")
        })}"
          tabindex="-1"
          @click="${this.toggleBulletList}"
          aria-describedby="bullet-tooltip"
        >
          ${icons_default.get("bullet-list")}
          <role-tooltip id="bullet-tooltip" hoist>${this.translations.bulletList}</role-tooltip>
        </button>`,
        orderedlist: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("orderedlist")
        })}"
          tabindex="-1"
          @click="${this.toggleOrderedList}"
          aria-describedby="ordered-tooltip"
        >
          ${icons_default.get("ordered-list")}
          <role-tooltip id="ordered-tooltip" hoist>${this.translations.orderedList}</role-tooltip>
        </button>`,
        blockquote: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("blockquote")
        })}"
          tabindex="-1"
          @click="${this.toggleBlockquote}"
          aria-describedby="blockquote-tooltip"
        >
          ${icons_default.get("blockquote")}
          <role-tooltip id="blockquote-tooltip" hoist>${this.translations.blockquote}</role-tooltip>
        </button>`,
        "code-block": x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${e2({
          "is-active": this.editor.isActive("codeBlock")
        })}"
          tabindex="-1"
          @click="${this.toggleCodeBlock}"
          aria-describedby="codeblock-tooltip"
        >
          ${icons_default.get("code-block")}
          <role-tooltip id="codeblock-tooltip" hoist>${this.translations.codeBlock}</role-tooltip>
        </button>`,
        undo: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          tabindex="-1"
          @click="${this.undo}"
          aria-describedby="undo-tooltip"
        >
          ${icons_default.get("undo")}
          <role-tooltip id="undo-tooltip" hoist>${this.translations.undo}</role-tooltip>
        </button>`,
        redo: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          tabindex="-1"
          @click="${this.redo}"
          aria-describedby="redo-tooltip"
        >
          ${icons_default.get("redo")}
          <role-tooltip id="redo-tooltip" hoist>${this.translations.redo}</role-tooltip>
        </button>`,
        attachment: x`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
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
    return x`
        <div class="wrapper" part="wrapper">
          <div class="toolbar" part="toolbar">
            <slot name="toolbar-start"></slot>
            ${o(this.toolbar, (name) => this.renderToolbarButton(name))}
            <slot name="toolbar-end"></slot>
            <slot></slot>
          </div>
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
/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-HQZQSJCW.js.map
