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
    var _this = this;
    var element = document.createElement("richer-bubble-menu");
    element.editor = this.editor;
    var tippyOptions = element.tippyOptions || {
      interactive: true,
      placement: "top",
      theme: "bubble",
      allowHTML: true,
      offset: [0, 10],
      maxWidth: "none",
      appendTo: function appendTo() {
        return document.body;
      },
      trigger: "manual",
      popperOptions: {
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, 10]
          }
        }]
      }
    };
    return [(0, _extensionBubbleMenu.BubbleMenuPlugin)({
      editor: this.editor,
      key: new _state.PluginKey("customBubbleMenu"),
      element: element,
      tippyOptions: Object.assign(tippyOptions, {
        duration: 0,
        delay: 0,
        onShow: function onShow() {
          element.isActive = _this.editor.isActive.bind(_this.editor);
        },
        onHide: function onHide() {
          element.editingLink = false;
        }
      })
    })];
  }
});
var _default = CustomBubbleMenu;
exports["default"] = _default;