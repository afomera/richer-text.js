import { html, css, LitElement } from 'lit';

export class RicherTextEmbed extends LitElement {
  static styles = css``

  static properties = {
    sgid: { type: String },
    embedPath: { attribute: "embed-path", type: String },
    height: { type: Number, attribute: false },
  }

  constructor() {
    super();
    this.sgid = null;
    this.embedPath = "/embeds",
    this.frameHeight = 0;
    this.height = 0;

    this.addEventListener("load", this.handleLoad);
  }

  handleLoad() {
    this.height = this.contentWindow.document.body.scrollHeight + 10;
  }

  iframeSrcPath() {
    return `${this.embedPath}/${this.sgid}`;
  }

  renderiFrame() {
    const iframe = document.createElement("iframe");
    iframe.src = this.iframeSrcPath();
    iframe.width = "100%";
    iframe.height = this.height;
    iframe.frameBorder = 0;
    iframe.sandbox = "allow-same-origin allow-scripts";
    iframe.addEventListener("load", this.handleLoad);

    return iframe;
  }

  render() {
    return html`
      <div className="richer-text-editor--embed-wrapper" style="pointer-events: none; width: 100%" data-drag-handle>
        ${this.renderiFrame()}
      </div>
    `
  }
}

customElements.define('richer-text-embed', RicherTextEmbed);
