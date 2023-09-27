"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _icons = require("@tabler/icons");
var _HighlightMenuButton = _interopRequireDefault(require("../elements/HighlightMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HighlighterMenu = function HighlighterMenu(_ref) {
  var editor = _ref.editor;
  if (!editor) return null;
  var HIGHLIGHT_COLORS = [{
    name: "Default",
    color: "var(--rte-highlight-default)"
  }, {
    name: "Purple",
    color: "var(--rte-highlight-purple)"
  }, {
    name: "Red",
    color: "var(--rte-highlight-red)"
  }, {
    name: "Yellow",
    color: "var(--rte-highlight-yellow)"
  }, {
    name: "Blue",
    color: "var(--rte-highlight-blue)"
  }, {
    name: "Green",
    color: "var(--rte-highlight-green)"
  }, {
    name: "Orange",
    color: "var(--rte-highlight-orange)"
  }, {
    name: "Pink",
    color: "var(--rte-highlight-pink)"
  }, {
    name: "Gray",
    color: "var(--rte-highlight-gray)"
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--bubble-menu-highlighter-menu"
  }, HIGHLIGHT_COLORS.map(function (_ref2, index) {
    var name = _ref2.name,
      color = _ref2.color;
    return /*#__PURE__*/_react["default"].createElement(_HighlightMenuButton["default"], {
      key: index,
      command: function command() {
        return editor.chain().focus().toggleHighlight({
          color: color
        }).run();
      },
      active: editor.isActive('highlight', {
        color: color
      }),
      text: "A",
      backgroundColor: color,
      tooltip: name
    });
  }));
};
var _default = HighlighterMenu;
exports["default"] = _default;