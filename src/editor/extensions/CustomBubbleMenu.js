import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";

import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

const CustomBubbleMenu = Extension.create({
  name: "customBubbleMenu",

  addOptions() {
    return {
      pluginKey: "customBubbleMenu",
      shouldShow: null,
    }
  },

  addProseMirrorPlugins() {
    const element = document.createElement("richer-bubble-menu");
    element.editor = this.editor;

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
        element: element,
        shouldShow: this.options.shouldShow,
        tippyOptions: Object.assign(tippyOptions, {
          duration: 0,
          delay: 0,
          onShow: () => {
            element.isActive = this.editor.isActive.bind(this.editor);
          },
          onHide: () => {
            element.editingLink = false;
          },
        }),
      }),
    ];
  },
});

export default CustomBubbleMenu;
