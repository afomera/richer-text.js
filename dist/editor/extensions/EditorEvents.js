"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _default = _core.Extension.create({
  name: "editorEvents",
  onCreate: function onCreate(_ref) {
    var editor = _ref.editor;
    // The editor is created.
    var element = editor.options.element;
    var customEvent = new CustomEvent('richer-text-editor:create', {
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onFocus: function onFocus(_ref2) {
    var editor = _ref2.editor;
    var element = editor.options.element;
    var customEvent = new CustomEvent('richer-text-editor:focus', {
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onUpdate: function onUpdate(_ref3) {
    var editor = _ref3.editor;
    // The content has changed.
    var element = editor.options.element;
    var customEvent = new CustomEvent('richer-text-editor:update', {
      detail: {
        html: editor.getHTML(),
        json: editor.getJSON(),
        isEmpty: editor.isEmpty
      },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  },
  onBlur: function onBlur(_ref4) {
    var editor = _ref4.editor;
    var element = editor.options.element;
    var customEvent = new CustomEvent('richer-text-editor:blur', {
      detail: {
        isEmpty: editor.isEmpty
      },
      bubbles: true
    });
    element.dispatchEvent(customEvent);
  }
});
exports["default"] = _default;