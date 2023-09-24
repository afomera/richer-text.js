"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@tiptap/react");
var _headless = _interopRequireDefault(require("@tippyjs/react/headless"));
var _BubbleMenuButton = _interopRequireDefault(require("../elements/BubbleMenuButton"));
var _iconsReact = require("@tabler/icons-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var EditRicherTextEmbedMenu = function EditRicherTextEmbedMenu(_ref) {
  var editor = _ref.editor,
    node = _ref.node,
    getPos = _ref.getPos;
  var attrs = node.attrs;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--edit-menu"
  }, /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().setNodeSelection(getPos()).deleteSelection().run();
    },
    active: false,
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconTrash, null)
  }));
};
var RicherTextEmbedNode = function RicherTextEmbedNode(_ref2) {
  var editor = _ref2.editor,
    node = _ref2.node,
    getPos = _ref2.getPos;
  var attrs = node.attrs;
  var width = attrs.width,
    sgid = attrs.sgid;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    editMenuVisible = _useState2[0],
    setEditMenuVisible = _useState2[1];
  var _useState3 = (0, _react.useState)('0px'),
    _useState4 = _slicedToArray(_useState3, 2),
    height = _useState4[0],
    setHeight = _useState4[1];
  var iFrameRef = _react["default"].useRef(null);
  (0, _react.useEffect)(function () {
    setEditMenuVisible(editor.isActive("richerTextEmbed"));
  }, [editor.isActive("richerTextEmbed")]);
  var onLoad = function onLoad() {
    setHeight(iFrameRef.current.contentWindow.document.body.scrollHeight + 10 + 'px');
  };
  var iframeSrcPath = "".concat(editor.storage.richerTextEmbed.embedPath, "/").concat(sgid);
  return /*#__PURE__*/_react["default"].createElement(_react2.NodeViewWrapper, null, sgid && /*#__PURE__*/_react["default"].createElement(_headless["default"], {
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(EditRicherTextEmbedMenu, {
        editor: editor,
        node: node,
        getPos: getPos
      });
    },
    interactive: true,
    visible: editMenuVisible,
    onClickOutside: function onClickOutside() {
      return setEditMenuVisible(false);
    },
    onHide: function onHide() {
      return setEditMenuVisible(false);
    },
    offset: [0, -16]
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--embed-wrapper",
    style: {
      width: width
    },
    "data-drag-handle": true
  }, /*#__PURE__*/_react["default"].createElement("iframe", {
    ref: iFrameRef,
    onLoad: onLoad,
    src: iframeSrcPath,
    width: "100%",
    height: height,
    frameBorder: 0
  }))));
};
var _default = _core.Node.create({
  name: 'richerTextEmbed',
  group: 'block',
  draggable: true,
  addAttributes: function addAttributes() {
    return {
      sgid: {
        "default": null
      }
    };
  },
  addOptions: function addOptions() {
    return {
      embedPath: "/embeds"
    };
  },
  addStorage: function addStorage() {
    return {
      embedPath: this.options.embedPath
    };
  },
  renderHTML: function renderHTML(_ref3) {
    var HTMLAttributes = _ref3.HTMLAttributes;
    return ["richer-text-embed", (0, _core.mergeAttributes)(HTMLAttributes)];
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "richer-text-embed"
    }];
  },
  addNodeView: function addNodeView() {
    return (0, _react2.ReactNodeViewRenderer)(RicherTextEmbedNode);
  }
});
exports["default"] = _default;