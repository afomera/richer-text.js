import { Extension } from "@tiptap/core";

import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from '@tiptap/extension-text-style'
import Color from "@tiptap/extension-color";

import Callout from "./Callout";
import CodeBlock from "./CodeBlock";
// import CommandMenu from "./CommandMenu";
// import EditorEvents from "./EditorEvents";
// import Emoji from "./Emoji";
import FontSize from "./FontSize";
import HorizontalRule from "./HorizontalRule";
// import Image from "./Image";

export const RicherTextKit = Extension.create({
  name: "richerTextKit",

  addOptions() {
    return {
      placeholder: 'Start typing...',
    }
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
            levels: [1, 2]
          }
        })
      );
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule);
    }

    if (this.options.callout !== false) {
      extensions.push(Callout);
    }

    // if (this.options.commandMenu !== false) {
    //   const calloutEnabled = this.options.callout !== false;
    //   const tablesEnabled = this.options.tables !== false;

    //   extensions.push(CommandMenu(calloutEnabled, tablesEnabled));
    // }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure({
        color: 'var(--rte-content-focus-color)'
      }));
    }

    if (this.options.focus !== false) {
      extensions.push(Focus.configure({
        className: 'has-focus',
        mode: "shallowest"
      }));
    }

    if (this.options.fontSize !== false) {
      extensions.push(FontSize);
    }

    if (this.options.highlight !== false) {
      extensions.push(
        Highlight.configure({
          multicolor: true
        }),
      );
    }

    // if (this.options.image !== false) {
    //   extensions.push(Image);
    // }

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
          placeholder: this.options.placeholder,
        })
      );
    }

    if (this.options.tables !== false) {
      extensions.push(
        Table.configure({
          resizable: false,
        }),
        TableRow,
        TableHeader,
        TableCell,
      )
    }

    // if (this.options.emoji !== false) {
    //   extensions.push(Emoji);
    // }

    extensions.push(
      // EditorEvents,
      CodeBlock,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    )

    return extensions;
  },
});
