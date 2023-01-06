"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extensionCodeBlockLowlight = _interopRequireDefault(require("@tiptap/extension-code-block-lowlight"));
var _lowlight = require("lowlight");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CodeBlock = _extensionCodeBlockLowlight["default"].extend({
  addKeyboardShortcuts: function addKeyboardShortcuts() {
    var _this = this;
    return {
      Tab: function Tab() {
        if (_this.editor.state.doc.childBefore(_this.editor.state.selection.from).node.type.name === _this.name) {
          return _this.editor.commands.insertContent("  ");
        }
        return false;
      }
    };
  }
}).configure({
  lowlight: _lowlight.lowlight
});
var _default = CodeBlock;
exports["default"] = _default;