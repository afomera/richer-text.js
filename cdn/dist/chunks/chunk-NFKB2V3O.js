import {
  tippy_esm_default
} from "./chunk-3DUUIC2X.js";
import {
  PluginKey
} from "./chunk-ZTG2EEKL.js";

// src/editor/suggestions/MentionSuggestion.js
var MentionSuggestion = (mentionableUsersPath) => {
  return {
    char: "@",
    pluginKey: new PluginKey("MentionSuggestion"),
    items: async ({ query }) => {
      if (!mentionableUsersPath) {
        return [];
      }
      const url = new URL(mentionableUsersPath, window.location.origin);
      if (query) {
        url.searchParams.set("query", query);
      }
      const response = await fetch(url);
      const data = await response.json();
      return data.filter((user) => {
        return user.label.toLowerCase().includes(query.toLowerCase());
      }).slice(0, 10);
    },
    render: () => {
      let component;
      let popup;
      return {
        onStart: (props) => {
          component = document.createElement("richer-text-mention-list");
          component.items = props.items;
          component.command = props.command;
          if (!props.clientRect) {
            return;
          }
          popup = tippy_esm_default("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start"
          });
        },
        onUpdate(props) {
          component.items = props.items;
          component.command = props.command;
          if (!props.clientRect) {
            return;
          }
          popup[0].setProps({
            getReferenceClientRect: props.clientRect
          });
        },
        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup[0].hide();
            return true;
          }
          return component.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
        }
      };
    }
  };
};
var MentionSuggestion_default = MentionSuggestion;

export {
  MentionSuggestion_default
};
//# sourceMappingURL=chunk-NFKB2V3O.js.map
