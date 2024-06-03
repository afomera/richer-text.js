// src/editor/extensions/CustomBubbleMenu.js
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
var CustomBubbleMenu = (pluginName) => Extension.create({
  name: pluginName || "customBubbleMenu",
  addOptions() {
    return {
      pluginKey: "customBubbleMenu",
      shouldShow: null,
      mode: "text",
      oembed: false,
      embedPath: ""
    };
  },
  addProseMirrorPlugins() {
    const element = document.createElement("richer-bubble-menu");
    element.editor = this.editor;
    element.mode = this.options.mode;
    element.embedPath = this.options.embedPath;
    element.oembed = this.options.oembed;
    const tippyOptions = element.tippyOptions || {
      interactive: true,
      placement: "top",
      theme: "bubble",
      allowHTML: true,
      maxWidth: "none",
      appendTo: () => document.body,
      trigger: "manual"
    };
    return [
      BubbleMenuPlugin({
        editor: this.editor,
        key: new PluginKey(this.options.pluginKey || "bubbleMenu"),
        element,
        shouldShow: this.options.shouldShow,
        tippyOptions: Object.assign(tippyOptions, {
          duration: 0,
          delay: 0,
          onShow: () => {
            element.isActive = this.editor.isActive.bind(this.editor);
          },
          onHide: () => {
            element.editingLink = false;
          }
        })
      })
    ];
  }
});
var CustomBubbleMenu_default = CustomBubbleMenu;

export {
  CustomBubbleMenu_default
};
//# sourceMappingURL=chunk-GN4IF3JP.js.map
