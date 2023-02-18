"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _default = _core.Extension.create({
  name: "editorEvents",
  onUpdate: function onUpdate(_ref) {
    var editor = _ref.editor;
    // The content has changed.
    var element = editor.options.element;
    var customEvent = new CustomEvent('editor:update', {
      detail: {
        html: editor.getHTML(),
        json: editor.getJSON()
      },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onBlur: function onBlur(_ref2) {
    var editor = _ref2.editor,
      event = _ref2.event;
    var element = editor.options.element;
    var customEvent = new CustomEvent('editor:blur', {
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  }
});
exports["default"] = _default;