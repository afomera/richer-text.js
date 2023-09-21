import React from "react";
import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import { PluginKey } from "@tiptap/pm/state";

import EmojiList from "../elements/EmojiList";

import emojisList from "../elements/emoji.json";

const Emoji = Extension.create({
  name: "emoji",

  addOptions: {
    suggestion: {
      char: ":",
      startOfLine: false,
      allowSpaces: true,
      items: ({ query }) => {
        return emojisList
          .filter((emoji) => {
            return (
              emoji.emoji.toLowerCase().includes(query.toLowerCase()) ||
              emoji.aliases.some((alias) =>
              alias.toLowerCase().includes(query.toLowerCase())
              ) ||
              emoji.description.toLowerCase().includes(query.toLowerCase())
            );
          })
          .slice(0, 10)
      },

      render: () => {
        let component;
        let popup;

        return {
          onStart: (props) => {
            component = new ReactRenderer(EmojiList, {
              props,
              editor: props.editor,
            });

            if (!props.clientRect) {
              return;
            }

            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
            });
          },

          onUpdate(props) {
            component.updateProps(props);

            if (!props.clientRect) {
              return;
            }

            popup[0].setProps({
              getReferenceClientRect: props.clientRect,
            });
          },

          onKeyDown(props) {
            if (props.event.key === "Escape") {
              popup[0].hide();

              return true;
            }

            return component.ref?.onKeyDown(props);
          },

          onExit() {
            popup[0].destroy();
            component.destroy();
          },
        };
      },
      command: ({ editor, range, props }) => {
        editor.chain().focus().deleteRange(range).insertContentAt(range.from, props.emoji).run();
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: new PluginKey("emojiPluginKey"),
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default Emoji;
