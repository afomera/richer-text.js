"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extensionHorizontalRule = _interopRequireDefault(require("@tiptap/extension-horizontal-rule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _extensionHorizontalRule["default"].extend({
  renderHTML: function renderHTML(_ref) {
    var HTMLAttributes = _ref.HTMLAttributes;
    return ["div", {
      "class": "richer-text-editor--hr"
    }, ["hr", HTMLAttributes]];
  }
});
exports["default"] = _default;