import { ReactRenderer } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state"
import tippy from "tippy.js";

import MentionList from "../elements/MentionList";

const MentionSuggestion = (mentionableUsersPath) => {
  return {
    char: "@",
    pluginKey: new PluginKey("MentionSuggestion"),
    items: async ({ query }) => {
      if (!mentionableUsersPath) {
        return []
      }

      const url = new URL(mentionableUsersPath, window.location.origin);

      if (query) {
        url.searchParams.set("query", query);
      }

      const response = await fetch(url)
      const data = await response.json()

      return data
        .filter((user) => {
          return (
            user.label.toLowerCase().includes(query.toLowerCase())
          );
        })
        .slice(0, 10)
    },

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(MentionList, {
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

  }
}

export default MentionSuggestion
