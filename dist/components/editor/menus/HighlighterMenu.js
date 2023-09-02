"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _icons = require("@tabler/icons");
var _BubbleMenuButton = _interopRequireDefault(require("../elements/BubbleMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HighlighterMenu = function HighlighterMenu(_ref) {
  var editor = _ref.editor;
  if (!editor) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--bubble-menu-highlighter-menu"
  }, editor.isActive('highlight') && /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().unsetHighlight().run();
    },
    active: false /* always false */,
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlightOff, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--rte-highlight-color-one)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--rte-highlight-color-one)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--rte-highlight-color-one)'
    })
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--rte-highlight-color-two)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--rte-highlight-color-two)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--rte-highlight-color-two)'
    })
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--rte-highlight-color-three)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--rte-highlight-color-three)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--rte-highlight-color-three)'
    })
  }));
};
var _default = HighlighterMenu;
exports["default"] = _default;