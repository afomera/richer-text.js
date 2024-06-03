import { html } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';

import { RoleTooltip } from "role-components";
RoleTooltip.define();

// import { Dropdown } from "../editor/elements/Dropdown";
import { uploadFile } from "../editor/extensions/Image";

import { TipTapEditorBase } from "./TipTapEditorBase";

import icons from '../editor/icons';
import { translations } from "../editor/translations";

// Styles
import { richerTextEditorStyles } from "../styles/richerTextEditorStyles";

// Extensions
import { RicherTextKit } from "../editor/extensions/RicherTextKit";

import CustomSuggestion from "../editor/extensions/CustomSuggestion";
import CustomSuggestionSuggestion from "../editor/suggestions/CustomSuggestionSuggestion";

import Mention from "../editor/extensions/Mention";
import MentionSuggestion from "../editor/suggestions/MentionSuggestion";
import RicherTextEmbed from "../editor/extensions/RicherTextEmbed";
import iframelyEmbed from "../editor/extensions/iframelyEmbed";

import "../editor/elements/RicherBubbleMenu";
import CustomBubbleMenu from "../editor/extensions/CustomBubbleMenu";

export default class RicherTextEditor extends TipTapEditorBase {
  static get styles() {
    return TipTapEditorBase.styles.concat([richerTextEditorStyles]);
  }

  static get properties() {
    return Object.assign(TipTapEditorBase.properties, {
      translations: {
        type: Object,
        converter: {
          fromAttribute: (value) => JSON.parse(value),
          toAttribute: (value) => JSON.stringify(value),
        }
      },
      callouts: { type: String, reflect: true },
      iframelyKey: { attribute: "iframely-key", type: String },
      tables: { type: String, reflect: true},
      oembed: { type: String, reflect: true },
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
    });
  }

  constructor() {
    super();

    this.translations = translations;
    this.toolbar = [];
    this.tables = "false";
    this.callouts = "false";
    this.toolbarPlacement = this.getAttribute("toolbar-placement") || "top";
    this.toolbarPreset = this.getAttribute("toolbar-preset") || "default";
    this.mentionableUsersPath = this.getAttribute("mentionable-users-path") || "";
    this.iframelyKey = this.getAttribute("iframely-key") || "";

    this.customSuggestions = JSON.parse(this.getAttribute("custom-suggestions")) || [];
    this.embedsPath = this.getAttribute("embeds-path") || "";
    this.oembed = "false";
  }

  configureToolbar() {
    if (this.toolbar.length > 0) {
      return;
    }

    if (this.toolbarPreset === 'minimal') {
      this.toolbar = ['bold', 'italic', 'strike'];
    } else {
      this.toolbar = [
        'bold',
        'italic',
        'strike',
        'code',
        'divider',
        'heading-1',
        'heading-2',
        'heading-3',
        // 'highlight',
        'bulletlist',
        'orderedlist',
        'blockquote',
        'code-block',
        'horizontal-rule',
        'divider',
        'attachment',
        'spacer',
        'undo',
        'redo',
      ];

      if (this.iframelyKey) {
        this.toolbar.splice(15, 0, 'embed');
      }
    }
  }

  updated(changedProperties) {
    if (
      changedProperties.has('toolbar') ||
      changedProperties.has('toolbarPreset')
    ) {
      this.configureToolbar();
    }

    super.updated(changedProperties);
  }

  get __baseExtensions() {
    let extensions = [
      CustomBubbleMenu("customBubbleMenu").configure({
        shouldShow: ({ editor }) => {
          return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading") || editor.isActive("blockquote"));
        },
        oembed: this.oembed !== "false",
        embedPath: this.embedsPath,
      }),
      CustomBubbleMenu("imageBubbleMenu").configure({
        mode: "image",
        pluginKey: "imageBubbleMenu",
        shouldShow: ({ editor }) => {
          return editor.isActive("image");
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

    if (this.iframelyKey) {
      extensions.push(iframelyEmbed);
    }

     if (this.tables !== "false") {
      extensions.push(
        CustomBubbleMenu("tableBubbleMenu").configure({
          mode: "table",
          pluginKey: "tableBubbleMenu",
          shouldShow: ({ editor }) => {
            return editor.isActive("table");
          },
        })
      );
    }

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

    return extensions;
  }

  firstUpdated() {
    this.rebuildEditor();
    this.configureToolbar();

    this.requestUpdate();
  }

  addFile() {
    const input = this.shadowRoot.getElementById("file-input");
    input.click();
  }

  handleFileUpload(event) {
    const files = event.target.files;

    // Update this to loop through all files with the index
    Array.from(files).forEach((file, index) => {
      // A fresh object to act as the ID for this upload
      let id = {};

      // Replace the selection with a placeholder
      let tr = this.editor.view.state.tr;
      if (!tr.selection.empty) tr.deleteSelection();

      tr.setMeta(this.editor.view, {add: {id, pos: tr.selection.from + index}, image: file});
      this.editor.view.dispatch(tr)

      const onUploadComplete = (attrs, completedUpload) => {
        const payload = {
          signedId: attrs.signedId,
          name: completedUpload.file.name,
          src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
          alt: completedUpload.file.name,
        };

        this.editor.view.dispatch(
          this.editor.view.state.tr.replaceWith(this.editor.view.state.doc.content.size, this.editor.view.state.doc.content.size, this.editor.schema.nodes.image.create(payload))
            .setMeta(this.editor.view, {remove: {id}})
        )
      }

      uploadFile(file, onUploadComplete);
    });

    this.shadowRoot.getElementById("file-input").value = "";
  }

  async toggleiFramelyEmbed() {
    if (!this.iframelyKey) {
      console.error("[Richer Text] You need to provide an iFramely key to use this feature.");
      return;
    }

    const url = prompt("Enter the URL to embed:");
    if (!url) return;

    const data = await this.fetchiFramelyEmbed(url);
    if (!data) return;

    if (!data.previewHtml) {
      console.error("[Richer Text] Could not fetch the embed data.");
      return;
    }

    this.editor.chain().focus().insertEmbed({url}).updateEmbed(data.href, data.previewHtml).run();
  }

  fetchiFramelyEmbed(href) {
    return fetch(`https://iframe.ly/api/oembed?url=${encodeURIComponent(href)}&key=${this.iframelyKey}&omit_script=1`)
      .then((response) => response.json())
      .then((data) => {
        return {
          href: data.url,
          previewHtml: data.html,
        };
      });
  }

  renderToolbarButton(name) {
    if (!this.editor || !this.toolbar?.length) return '';

    const allToolbarItems = new Map(
      Object.entries({
        divider: html`<div class="divider" part="divider"></div>`,

        spacer: html`<div class="spacer" part="spacer"></div>`,

        'embed': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('iframelyEmbed'),
          })}"
          tabindex="-1"
          @click="${this.toggleiFramelyEmbed}"
          aria-describedby="iframely-embed-tooltip"
        >
          ${icons.get('embed')}
          <role-tooltip id="iframely-embed-tooltip" hoist>${this.translations.iframelyEmbed}</role-tooltip>
        </button>`,

        'heading-1': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 1 }),
          })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel1}"
          aria-describedby="h1-tooltip"
        >
          ${icons.get('h1')}
          <role-tooltip id="h1-tooltip" hoist>${this.translations.heading1}</role-tooltip>
        </button>`,

        'heading-2': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 2 }),
          })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel2}"
          aria-describedby="h2-tooltip"
        >
          ${icons.get('h2')}
          <role-tooltip id="h2-tooltip" hoist>${this.translations.heading2}</role-tooltip>
        </button>`,

        'heading-3': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('heading', { level: 3 }),
          })}"
          tabindex="-1"
          @click="${this.toggleHeadingLevel3}"
          aria-describedby="h3-tooltip"
        >
          ${icons.get('h3')}
          <role-tooltip id="h3-tooltip" hoist>${this.translations.heading3}</role-tooltip>
        </button>`,

        highlight: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('highlight'),
          })}"
          tabindex="-1"
          @click="${this.toggleHighlight}"
          aria-describedby="highlight-tooltip"
        >
          ${icons.get('highlight')}
          <role-tooltip id="highlight-tooltip" hoist>${this.translations.highlight}</role-tooltip>
        </button>`,

        'horizontal-rule': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('horizontal-rule'),
          })}"
          tabindex="-1"
          @click="${this.setHorizontalRule}"
          aria-describedby="hr-tooltip"
        >
          ${icons.get('horizontal-rule')}
          <role-tooltip id="hr-tooltip" hoist>${this.translations.horizontalRule}</role-tooltip>
        </button>`,

        bold: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('bold'),
          })}"
          @click="${this.toggleBold}"
          aria-describedby="bold-tooltip"
        >
          ${icons.get('bold')}
          <role-tooltip id="bold-tooltip" hoist>${this.translations.bold}</role-tooltip>
        </button>`,

        italic: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('italic'),
          })}"
          tabindex="-1"
          @click="${this.toggleItalic}"
          aria-describedby="italic-tooltip"
        >
          ${icons.get('italic')}
          <role-tooltip id="italic-tooltip" hoist>${this.translations.italics}</role-tooltip>
        </button>`,

        underline: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('underline'),
          })}"
          tabindex="-1"
          @click="${this.toggleUnderline}"
          aria-describedby="underline-tooltip"
        >
          ${icons.get('underline')}
          <role-tooltip id="underline-tooltip" hoist>${this.translations.underline}</role-tooltip>
        </button>`,

        strike: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('strike'),
          })}"
          tabindex="-1"
          @click="${this.toggleStrike}"
          aria-describedby="strike-tooltip"
        >
          ${icons.get('strike')}
          <role-tooltip id="strike-tooltip" hoist>${this.translations.strike}</role-tooltip>
        </button>`,

        'code': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('code'),
          })}"
          tabindex="-1"
          @click="${this.toggleCode}"
          aria-describedby="code-tooltip"
        >
          ${icons.get('code')}
          <role-tooltip id="code-tooltip" hoist>${this.translations.code}</role-tooltip>
        </button>`,

        bulletlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('bulletList'),
          })}"
          tabindex="-1"
          @click="${this.toggleBulletList}"
          aria-describedby="bullet-tooltip"
        >
          ${icons.get('bullet-list')}
          <role-tooltip id="bullet-tooltip" hoist>${this.translations.bulletList}</role-tooltip>
        </button>`,

        orderedlist: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('orderedlist'),
          })}"
          tabindex="-1"
          @click="${this.toggleOrderedList}"
          aria-describedby="ordered-tooltip"
        >
          ${icons.get('ordered-list')}
          <role-tooltip id="ordered-tooltip" hoist>${this.translations.orderedList}</role-tooltip>
        </button>`,

        blockquote: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('blockquote'),
          })}"
          tabindex="-1"
          @click="${this.toggleBlockquote}"
          aria-describedby="blockquote-tooltip"
        >
          ${icons.get('blockquote')}
          <role-tooltip id="blockquote-tooltip" hoist>${this.translations.blockquote}</role-tooltip>
        </button>`,

        'code-block': html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button ${classMap({
            'is-active': this.editor.isActive('codeBlock'),
          })}"
          tabindex="-1"
          @click="${this.toggleCodeBlock}"
          aria-describedby="codeblock-tooltip"
        >
          ${icons.get('code-block')}
          <role-tooltip id="codeblock-tooltip" hoist>${this.translations.codeBlock}</role-tooltip>
        </button>`,

        undo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          tabindex="-1"
          @click="${this.undo}"
          aria-describedby="undo-tooltip"
        >
          ${icons.get('undo')}
          <role-tooltip id="undo-tooltip" hoist>${this.translations.undo}</role-tooltip>
        </button>`,

        redo: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          tabindex="-1"
          @click="${this.redo}"
          aria-describedby="redo-tooltip"
        >
          ${icons.get('redo')}
          <role-tooltip id="redo-tooltip" hoist>${this.translations.redo}</role-tooltip>
        </button>`,

        attachment: html`<button
          type="button"
          part="toolbar-button"
          class="toolbar-button"
          tabindex="-1"
          @click="${this.addFile}"
          aria-describedby="attachment-tooltip"
        >
          ${icons.get('attachment')}
          <role-tooltip id="attachment-tooltip" hoist>${this.translations.attachment}</role-tooltip>

          <input
            id="file-input"
            type="file"
            hidden
            multiple
            accept=${"image/*"}
            @change=${this.handleFileUpload}
          />
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
