"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@tiptap/react");
var _icons = require("@tabler/icons");
var _LinkBubbleMenu = _interopRequireDefault(require("./LinkBubbleMenu"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    editingLink = _useState2[0],
    setEditingLink = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_react2.BubbleMenu, {
    editor: editor,
    tippyOptions: {
      duration: 0,
      placement: "bottom",
      onHide: function onHide() {
        return setEditingLink(false);
      }
    },
    shouldShow: function shouldShow() {
      return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading"));
    }
  }, !editingLink ? /*#__PURE__*/_react["default"].createElement("div", {
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
      return setEditingLink(true);
    },
    active: editor.isActive('link'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconLink, null)
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
  }) : null) : /*#__PURE__*/_react["default"].createElement(_LinkBubbleMenu["default"], {
    editor: editor,
    onClose: function onClose() {
      return setEditingLink(false);
    }
  }));
};
exports["default"] = _default;