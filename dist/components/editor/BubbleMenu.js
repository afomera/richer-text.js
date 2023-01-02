"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@tiptap/react");
var _icons = require("@tabler/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var BubbleMenuButton = function BubbleMenuButton(_ref) {
  var command = _ref.command,
    active = _ref.active,
    icon = _ref.icon;
  var handleClick = function handleClick(event) {
    event.preventDefault();
    command();
  };
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    className: active ? 'is-active' : ''
  }, icon);
};
var HighlighterMenu = function HighlighterMenu(_ref2) {
  var editor = _ref2.editor;
  if (!editor) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--bubble-menu-highlighter-menu"
  }, editor.isActive('highlight') && /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().unsetHighlight().run();
    },
    active: false /* always false */,
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlightOff, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--editor-highlight-color-one)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--editor-highlight-color-one)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--editor-highlight-color-one)'
    })
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--editor-highlight-color-two)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--editor-highlight-color-two)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--editor-highlight-color-two)'
    })
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleHighlight({
        color: 'var(--editor-highlight-color-three)'
      }).run();
    },
    active: editor.isActive('highlight', {
      color: 'var(--editor-highlight-color-three)'
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconHighlight, {
      color: 'var(--editor-highlight-color-three)'
    })
  }));
};
var _default = function _default(_ref3) {
  var editor = _ref3.editor,
    bubbleMenuOptions = _ref3.bubbleMenuOptions;
  if (!editor) return null;
  return /*#__PURE__*/_react["default"].createElement(_react2.BubbleMenu, {
    editor: editor,
    tippyOptions: {
      duration: 0,
      placement: "bottom"
    },
    shouldShow: function shouldShow() {
      return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading"));
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--bubble-menu"
  }, /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleBold().run();
    },
    active: editor.isActive('bold'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconBold, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleItalic().run();
    },
    active: editor.isActive('italic'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconItalic, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().toggleStrike().run();
    },
    active: editor.isActive('strike'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconStrikethrough, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().setTextAlign("left").run();
    },
    active: editor.isActive({
      textAlign: "left"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconAlignLeft, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().setTextAlign("center").run();
    },
    active: editor.isActive({
      textAlign: "center"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconAlignCenter, null)
  }), /*#__PURE__*/_react["default"].createElement(BubbleMenuButton, {
    command: function command() {
      return editor.chain().focus().setTextAlign("right").run();
    },
    active: editor.isActive({
      textAlign: "right"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconAlignRight, null)
  }), bubbleMenuOptions.highlight ? /*#__PURE__*/_react["default"].createElement(HighlighterMenu, {
    editor: editor
  }) : null));
};
exports["default"] = _default;