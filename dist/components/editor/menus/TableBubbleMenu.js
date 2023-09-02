"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@tiptap/react");
var _iconsReact = require("@tabler/icons-react");
var _BubbleMenuButton = _interopRequireDefault(require("../elements/BubbleMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(_ref) {
  var editor = _ref.editor;
  if (!editor) return null;
  return /*#__PURE__*/_react["default"].createElement(_react2.BubbleMenu, {
    editor: editor,
    tippyOptions: {
      duration: 0,
      placement: "top"
    },
    shouldShow: function shouldShow() {
      return editor.isActive("table");
    },
    pluginKey: "table-bubble-menu"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--bubble-menu"
  }, /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addColumnBefore().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnInsertLeft, null),
    tooltip: "Insert column before"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addColumnAfter().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnInsertRight, null),
    tooltip: "Insert column after"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteColumn().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnRemove, null),
    tooltip: "Delete column"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addRowBefore().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowInsertTop, null),
    tooltip: "Insert row before"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addRowAfter().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowInsertBottom, null),
    tooltip: "Insert row after"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteRow().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowRemove, null),
    tooltip: "Delete row"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHeaderColumn().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableColumn, null),
    tooltip: "Toggle header column"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHeaderRow().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableRow, null),
    tooltip: "Toggle header row"
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteTable().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableOff, null),
    tooltip: "Delete table"
  })));
};
exports["default"] = _default;