import { LitElement, html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { Editor } from "@tiptap/core";

import icons from '../editor/icons';

// Styles
import { normalize } from "../styles/normalize";
import { tiptapStyles } from "../styles/tiptapStyles";
import { richerTextEditorStyles } from "../styles/richerTextEditorStyles";

// Extensions
import { RicherTextKit } from "../editor/extensions/RicherTextKit";

import CustomSuggestion from "../editor/extensions/CustomSuggestion";
import CustomSuggestionSuggestion from "../editor/suggestions/CustomSuggestionSuggestion";

import Mention from "../editor/extensions/Mention";
import MentionSuggestion from "../editor/suggestions/MentionSuggestion";
import RicherTextEmbed from "../editor/extensions/RicherTextEmbed";


import "../editor/elements/RicherBubbleMenu";
import CustomBubbleMenu from "../editor/extensions/CustomBubbleMenu";

export default class RicherTextEditor extends LitElement {
  static get styles() {
    return [normalize, tiptapStyles, richerTextEditorStyles];
  }

  static get properties() {
    return {
      callouts: { type: String, reflect: true },
      content: { type: String, reflect: true },
      placeholder: { type: String, reflect: true },
      readonly: { type: Boolean, reflect: true },
      serializer: { type: String, reflect: true },
      tables: { type: String, reflect: true},
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
            return value.split(',').map((s) => s.trim());
          },
          toAttribute: (value) => {
            return value.join(',');
          },
        }
      },
    };
  }

  configureToolbar() {
    if (this.toolbar.length > 0) {
      return;
    }

    if (this.toolbarPreset === 'minimal') {
      this.toolbar = ['bold', 'italic', 'underline'];
    } else {
      this.toolbar = [
        'heading-1',
        'heading-2',
        'heading-3',
        'divider',
        'bold',
        'italic',
        'strike',
        'code',
        'divider',
        'highlight',
        'bulletlist',
        'orderedlist',
        'blockquote',
        'divider',
        'code-block',
        'horizontal-rule',
        'divider',
        'undo',
        'redo',
      ];
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.editor.destroy();
  }

  getHTML() {
    const html = this.editor.getHTML();
    return html === '<p></p>' ? '' : html;
  }

  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true, composed: true }));
  }

  emitChange() {
    this.emit("change", {
      html: this.getHTML(),
      json: this.editor.getJSON(),
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
    if (
      changedProperties.has('toolbar') ||
      changedProperties.has('toolbarPreset')
    ) {
      this.configureToolbar();
    }

    if (changedProperties.has("content")) {
      this.editor.commands.setContent(this.serializer === "json" ? JSON.parse(this.content) : this.content);
    }

  }

  firstUpdated() {
    let extensions = [
      CustomBubbleMenu.configure({
        shouldShow: ({ editor }) => {
          return editor.isActive("paragraph") || editor.isActive("heading") || editor.isActive("blockquote");
        },
      }),
      RicherTextEmbed.configure({
        embedPath: this.embedsPath,
      }),

      RicherTextKit.configure({
        placeholder: this.placeholder || "Start typing...",
        callout: this.callouts !== "false",
        tables: this.tables !== "false"
      })
    ];

    if (this.mentionableUsersPath.length > 0) {
      extensions.push(
        Mention.configure({
          HTMLAttributes: { class: "richer-text--mention" },
          suggestion: MentionSuggestion(this.mentionableUsersPath),
        })
      );
    }

    this.customSuggestions.forEach((customSuggestion) => {
      extensions.push(
        CustomSuggestion(`${customSuggestion.name}Plugin`).configure({
          suggestion: CustomSuggestionSuggestion(customSuggestion.path, customSuggestion.trigger, `${customSuggestion.name}PluginKey`),
        })
      )
    });

    this.editor = new Editor({
      element: this._createEditorRootElement(),
      editable: !this.readonly,
      extensions: [...extensions],
      content: this.serializer === "json" ? JSON.parse(this.content) : this.content,
      onCreate: () => {
        // The editor is ready.
        this.emitChange();
      },
      onUpdate: ({ editor }) => {
        // The content has changed.
        this.requestUpdate();
        this.emitChange();
      },
      onSelectionUpdate: () => {
        // The selection has changed.
        this.requestUpdate();
      },
    });

    this.configureToolbar();

    this.requestUpdate();
  }

  constructor() {
    super();

    this.toolbar = [];
    this.toolbarPlacement = this.getAttribute("toolbar-placement") || "top";
    this.toolbarPreset = this.getAttribute("toolbar-preset") || "default";
    this.mentionableUsersPath = this.getAttribute("mentionable-users-path") || "";

    this.customSuggestions = JSON.parse(this.getAttribute("custom-suggestions")) || [];
    this.embedsPath = this.getAttribute("embeds-path") || "";
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

  toggleLink() {
    if (this.editor.isActive('link')) {
      this.editor.chain().focus().unsetLink().run();
    } else {
      let url = window.prompt('URL');
      if (!url?.startsWith('http')) {
        url = `https://${url}`;
      }
      this.editor.chain().focus().setLink({ href: url }).run();
    }
  }

  renderToolbarButton(name) {
    if (!this.editor || !this.toolbar?.length) return '';

    const allToolbarItems = new Map(
      Object.entries({
        divider: html`<div class="divider" part="divider"></div>`,

        'heading-1': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 1 }),
          })}"
          @click="${this.toggleHeadingLevel1}"
        >
          ${icons.get('h1')}
        </button>`,

        'heading-2': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 2 }),
          })}"
          @click="${this.toggleHeadingLevel2}"
        >
          ${icons.get('h2')}
        </button>`,

        'heading-3': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 3 }),
          })}"
          @click="${this.toggleHeadingLevel3}"
        >
          ${icons.get('h3')}
        </button>`,

        highlight: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('highlight'),
          })}"
          @click="${this.toggleHighlight}"
        >
          ${icons.get('highlight')}
        </button>`,

        'horizontal-rule': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('horizontal-rule'),
          })}"
          @click="${this.setHorizontalRule}"
        >
          ${icons.get('horizontal-rule')}
        </button>`,

        bold: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('bold'),
          })}"
          @click="${this.toggleBold}"
        >
          ${icons.get('bold')}
        </button>`,

        italic: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('italic'),
          })}"
          @click="${this.toggleItalic}"
        >
          ${icons.get('italic')}
        </button>`,

        underline: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('underline'),
          })}"
          @click="${this.toggleUnderline}"
        >
          ${icons.get('underline')}
        </button>`,

        strike: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('strike'),
          })}"
          @click="${this.toggleStrike}"
        >
          ${icons.get('strike')}
        </button>`,

        'code': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('code'),
          })}"
          @click="${this.toggleCode}"
        >
          ${icons.get('code')}
        </button>`,

        bulletlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('bulletList'),
          })}"
          @click="${this.toggleBulletList}"
        >
          ${icons.get('bullet-list')}
        </button>`,

        orderedlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('orderedlist'),
          })}"
          @click="${this.toggleOrderedList}"
        >
          ${icons.get('ordered-list')}
        </button>`,

        blockquote: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('blockquote'),
          })}"
          @click="${this.toggleBlockquote}"
        >
          ${icons.get('blockquote')}
        </button>`,

        'code-block': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('codeBlock'),
          })}"
          @click="${this.toggleCodeBlock}"
        >
          ${icons.get('code-block')}
        </button>`,

        link: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('link'),
          })}"
          @click="${this.toggleLink}"
        >
          ${icons.get('link')}
        </button>`,

        undo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.undo}"
        >
          ${icons.get('undo')}
        </button>`,

        redo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.redo}"
        >
          ${icons.get('redo')}
        </button>`,

        emoji: html`<button
          id="emoji-picker-button"
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.toggleEmojiPicker}"
        >
          ${icons.get('emoji')}
        </button>`,

        attachment: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          @click="${this.addFile}"
        >
          ${icons.get('attachment')}
        </button>`,
      }),
    );

    return allToolbarItems.get(name);
  }

  render() {
    return html`
        <div class="wrapper" part="wrapper">
          <div class="toolbar" part="toolbar">
            <slot name="toolbar-start"></slot>
            ${map(this.toolbar, (name) => this.renderToolbarButton(name))}
            <slot name="toolbar-end"></slot>
            <slot></slot>
          </div>
          <slot name="editor"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("richer-text-editor", RicherTextEditor);
