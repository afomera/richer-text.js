"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _state = require("@tiptap/pm/state");
var _extensionBubbleMenu = require("@tiptap/extension-bubble-menu");
var CustomBubbleMenu = _core.Extension.create({
  name: "customBubbleMenu",
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    var element = document.createElement("richer-bubble-menu");
    element.editor = this.editor;
    var tippyOptions = element.tippyOptions || {};
    return [(0, _extensionBubbleMenu.BubbleMenuPlugin)({
      editor: this.editor,
      key: new _state.PluginKey("customBubbleMenu"),
      element: element,
      tippyOptions: Object.assign(tippyOptions, {
        duration: 0,
        delay: 0,
        onHide: function onHide() {
          element.editingLink = false;
        }
      })
    })];
  }
});
var _default = CustomBubbleMenu;
exports["default"] = _default;