import {
  Suggestion
} from "./chunk-2N32QRFK.js";
import {
  Extension
} from "./chunk-ZGUGKF6P.js";
import {
  PluginKey
} from "./chunk-ZTG2EEKL.js";

// src/editor/extensions/CustomSuggestion.js
var defaultSuggestionList = [
  { label: "+1", content: "\u{1F44D}" },
  { label: "-1", content: "\u{1F44E}" }
];
var CustomSuggestion = (pluginName) => Extension.create({
  name: pluginName,
  addOptions: {
    pluginKey: {
      default: "suggestionPluginKey"
    },
    suggestion: {
      char: "#",
      startOfLine: false,
      allowSpaces: false,
      items: ({ query }) => {
        return defaultSuggestionList.filter((suggestion) => {
          return suggestion.label.toLowerCase().includes(query.toLowerCase());
        }).slice(0, 10);
      },
      command: ({ editor, range, props }) => {
        editor.chain().focus().deleteRange(range).insertContentAt(range.from, props.content).run();
      }
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: new PluginKey(this.options.pluginKey),
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});
var CustomSuggestion_default = CustomSuggestion;

export {
  CustomSuggestion_default
};
//# sourceMappingURL=chunk-DBQJWK5N.js.map
