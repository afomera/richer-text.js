import {
  i,
  s,
  x
} from "./chunk-M27UGOWE.js";
import {
  __publicField
} from "./chunk-AHNUJI67.js";

// src/editor/elements/RicherTextEmbed.js
var RicherTextEmbed = class extends s {
  constructor() {
    super();
    this.sgid = null;
    this.embedPath = "/embeds", this.frameHeight = 0;
    this.height = 0;
    this.removeNode = () => {
    };
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
    return x`
      <div class="richer-text-editor--embed-wrapper" data-drag-handle>
        <richer-text-editor-embed-menu .removeNode=${this.removeNode}></richer-text-editor-embed-menu>
        <div style="pointer-events: none; width: 100%">
          ${this.renderiFrame()}
        </div>
      </div>
    `;
  }
};
__publicField(RicherTextEmbed, "styles", i``);
__publicField(RicherTextEmbed, "properties", {
  sgid: { type: String },
  embedPath: { attribute: "embed-path", type: String },
  height: { type: Number, attribute: false },
  removeNode: { type: Function }
});
customElements.define("richer-text-embed", RicherTextEmbed);

export {
  RicherTextEmbed
};
//# sourceMappingURL=chunk-NYKFJ3QB.js.map
