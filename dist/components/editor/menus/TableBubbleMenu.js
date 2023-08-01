"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@tiptap/react");
var _iconsReact = require("@tabler/icons-react");
var _BubbleMenuButton = _interopRequireDefault(require("../elements/BubbleMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnInsertLeft, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addColumnAfter().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnInsertRight, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteColumn().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconColumnRemove, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addRowBefore().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowInsertTop, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().addRowAfter().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowInsertBottom, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteRow().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconRowRemove, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHeaderColumn().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableColumn, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleHeaderRow().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableRow, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().deleteTable().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTableOff, null)
  })));
};
exports["default"] = _default;