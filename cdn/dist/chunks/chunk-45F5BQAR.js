import {
  tippy_esm_default
} from "./chunk-3DUUIC2X.js";
import {
  PluginKey
} from "./chunk-ZTG2EEKL.js";

// src/editor/suggestions/CustomSuggestionSuggestion.js
var CustomSuggestionSuggestion = (endpointPath, trigger, pluginKey) => {
  return {
    char: trigger,
    pluginKey: new PluginKey(pluginKey),
    items: async ({ query }) => {
      if (!endpointPath) {
        return [];
      }
      const url = new URL(endpointPath, window.location.origin);
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
          component = document.createElement("richer-text-custom-suggestion-list");
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
var CustomSuggestionSuggestion_default = CustomSuggestionSuggestion;

export {
  CustomSuggestionSuggestion_default
};
//# sourceMappingURL=chunk-45F5BQAR.js.map
