"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _default = _core.Extension.create({
  name: "editorEvents",
  onFocus: function onFocus(_ref) {
    var editor = _ref.editor;
    var element = editor.options.element;
    var customEvent = new CustomEvent('editor:focus', {
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onUpdate: function onUpdate(_ref2) {
    var editor = _ref2.editor;
    // The content has changed.
    var element = editor.options.element;
    var customEvent = new CustomEvent('editor:update', {
      detail: {
        html: editor.getHTML(),
        json: editor.getJSON(),
        isEmpty: editor.isEmpty
      },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onBlur: function onBlur(_ref3) {
    var editor = _ref3.editor;
    var element = editor.options.element;
    var customEvent = new CustomEvent('editor:blur', {
      detail: {
        isEmpty: editor.isEmpty
      },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  }
});
exports["default"] = _default;