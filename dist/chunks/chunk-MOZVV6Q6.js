import {
  Emoji_default
} from "./chunk-RLAFABN3.js";
import {
  EditorEvents_default
} from "./chunk-A4ZUN3A7.js";
import {
  CommandMenu_default
} from "./chunk-FQUM6C2N.js";
import {
  CodeBlock_default
} from "./chunk-PFVAULYJ.js";
import {
  Callout_default
} from "./chunk-MX7MPMYI.js";
import {
  HorizontalRule_default
} from "./chunk-IDKBV7O5.js";
import {
  FontSize_default
} from "./chunk-TDPOOSLO.js";

// src/editor/extensions/RicherTextKit.js
import { Extension } from "@tiptap/core";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
var RicherTextKit = Extension.create({
  name: "richerTextKit",
  addOptions() {
    return {
      placeholder: "Start typing..."
    };
  },
  addExtensions() {
    const extensions = [];
    if (this.options.starterKit !== false) {
      extensions.push(
        StarterKit.configure({
          codeBlock: false,
          dropcursor: false,
          horizontalRule: false,
          heading: {
            levels: [1, 2, 3]
          }
        })
      );
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule_default);
    }
    if (this.options.callout !== false) {
      extensions.push(Callout_default);
    }
    if (this.options.commandMenu !== false) {
      const calloutEnabled = this.options.callout !== false;
      const tablesEnabled = this.options.tables !== false;
      extensions.push(CommandMenu_default(calloutEnabled, tablesEnabled));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure({
        color: "pink"
        //TODO: Change me //'var(--rte-content-focus-color)'
      }));
    }
    if (this.options.focus !== false) {
      extensions.push(Focus.configure({
        className: "has-focus",
        mode: "shallowest"
      }));
    }
    if (this.options.fontSize !== false) {
      extensions.push(FontSize_default);
    }
    if (this.options.highlight !== false) {
      extensions.push(
        Highlight.configure({
          multicolor: true
        })
      );
    }
    if (this.options.link !== false) {
      extensions.push(
        Link.configure({
          openOnClick: false,
          protocols: ["https", "mailto"]
        })
      );
    }
    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: this.options.placeholder
        })
      );
    }
    if (this.options.tables !== false) {
      extensions.push(
        Table.configure({
          resizable: false
        }),
        TableRow,
        TableHeader,
        TableCell
      );
    }
    if (this.options.emoji !== false) {
      extensions.push(Emoji_default);
    }
    extensions.push(
      EditorEvents_default,
      CodeBlock_default,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["paragraph", "heading"]
      })
    );
    return extensions;
  }
});

export {
  RicherTextKit
};
//# sourceMappingURL=chunk-MOZVV6Q6.js.map
