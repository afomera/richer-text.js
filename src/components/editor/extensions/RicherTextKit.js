import { Extension } from "@tiptap/core";

import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from '@tiptap/extension-text-style'

import Callout from "./Callout";
import CodeBlock from "./CodeBlock";
import CommandMenu from "./CommandMenu";
import EditorEvents from "./EditorEvents";
import FontSize from "./FontSize";
import Image from "./Image";

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
          heading: {
            levels: [1, 2]
          }
        })
      );
    }

    if (this.options.callout !== false) {
      extensions.push(Callout);
    }

    if (this.options.commandMenu !== false) {
      const calloutEnabled = this.options.callout !== false;

      extensions.push(CommandMenu(calloutEnabled));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure({
        color: 'var(--editor-content-focus-color)'
      }));
    }

    if (this.options.focus !== false) {
      extensions.push(Focus.configure({
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

    if (this.options.image !== false) {
      extensions.push(Image);
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
          placeholder: this.options.placeholder,
        })
      );
    }

    extensions.push(
      EditorEvents,
      CodeBlock,
      TextStyle,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    )


    return extensions;
  },
});
