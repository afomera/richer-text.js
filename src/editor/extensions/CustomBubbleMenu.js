import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";

import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

const CustomBubbleMenu = Extension.create({
  name: "customBubbleMenu",

  addProseMirrorPlugins() {
    const element = document.createElement("richer-bubble-menu");
    element.editor = this.editor;

    return [
      BubbleMenuPlugin({
        editor: this.editor,
        key: new PluginKey("customBubbleMenu"),
        element: element,
      }),
    ];
  },
});

export default CustomBubbleMenu;
