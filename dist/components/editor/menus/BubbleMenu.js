"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@tiptap/react");
var _iconsReact = require("@tabler/icons-react");
var _LinkBubbleMenu = _interopRequireDefault(require("./LinkBubbleMenu"));
var _HighlighterMenu = _interopRequireDefault(require("./HighlighterMenu"));
var _TextColorMenu = _interopRequireDefault(require("./TextColorMenu"));
var _BubbleMenuButton = _interopRequireDefault(require("../elements/BubbleMenuButton"));
var _headless = _interopRequireDefault(require("@tippyjs/react/headless"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _default = function _default(_ref) {
  var editor = _ref.editor,
    bubbleMenuOptions = _ref.bubbleMenuOptions;
  if (!editor) return null;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    editingLink = _useState2[0],
    setEditingLink = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showHighlighter = _useState4[0],
    setShowHighlighter = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showTextColor = _useState6[0],
    setShowTextColor = _useState6[1];
  return /*#__PURE__*/_react["default"].createElement(_react2.BubbleMenu, {
    editor: editor,
    tippyOptions: {
      duration: 0,
      placement: "bottom",
      onHide: function onHide() {
        setEditingLink(false);
        setShowHighlighter(false);
      }
    },
    shouldShow: function shouldShow() {
      return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading"));
    },
    pluginKey: "main-bubble-menu"
  }, !editingLink ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--bubble-menu"
  }, /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleBold().run();
    },
    active: editor.isActive('bold'),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconBold, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleItalic().run();
    },
    active: editor.isActive('italic'),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconItalic, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().toggleStrike().run();
    },
    active: editor.isActive('strike'),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconStrikethrough, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return setEditingLink(true);
    },
    active: editor.isActive('link'),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconLink, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setTextAlign("left").run();
    },
    active: editor.isActive({
      textAlign: "left"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconAlignLeft, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setTextAlign("center").run();
    },
    active: editor.isActive({
      textAlign: "center"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconAlignCenter, null)
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setTextAlign("right").run();
    },
    active: editor.isActive({
      textAlign: "right"
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconAlignRight, null)
  }), bubbleMenuOptions.textColor ? /*#__PURE__*/_react["default"].createElement(_headless["default"], {
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "richer-text-editor--edit-menu"
      }, /*#__PURE__*/_react["default"].createElement(_TextColorMenu["default"], {
        editor: editor
      })));
    },
    interactive: true,
    visible: showTextColor,
    onClickOutside: function onClickOutside() {
      return setShowTextColor(false);
    },
    onHide: function onHide() {
      return setShowTextColor(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick(e) {
      e.preventDefault();
      setShowTextColor(!showTextColor);
    }
  }, /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTextColor, null))) : null, bubbleMenuOptions.highlight ? /*#__PURE__*/_react["default"].createElement(_headless["default"], {
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "richer-text-editor--edit-menu"
      }, /*#__PURE__*/_react["default"].createElement(_HighlighterMenu["default"], {
        editor: editor
      })));
    },
    interactive: true,
    visible: showHighlighter,
    onClickOutside: function onClickOutside() {
      return setShowHighlighter(false);
    },
    onHide: function onHide() {
      return setShowHighlighter(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick(e) {
      e.preventDefault();
      setShowHighlighter(!showHighlighter);
    }
  }, /*#__PURE__*/_react["default"].createElement(_iconsReact.IconHighlight, null))) : null) : /*#__PURE__*/_react["default"].createElement(_LinkBubbleMenu["default"], {
    editor: editor,
    onClose: function onClose() {
      return setEditingLink(false);
    }
  }));
};
exports["default"] = _default;