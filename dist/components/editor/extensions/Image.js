"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@tiptap/react");
var _state = require("@tiptap/pm/state");
var _activestorage = require("@rails/activestorage");
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
var EditImageMenu = function EditImageMenu(_ref) {
  var editor = _ref.editor,
    node = _ref.node;
  var attrs = node.attrs;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--edit-menu"
  }, /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setImageWidth("25%").run();
    },
    active: attrs.width === "25%",
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconSquare, {
      width: 12,
      height: 12
    })
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setImageWidth("50%").run();
    },
    active: attrs.width === "50%",
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconSquare, {
      width: 16,
      height: 16
    })
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenuButton["default"], {
    command: function command() {
      return editor.chain().focus().setImageWidth("100%").run();
    },
    active: attrs.width === "100%",
    icon: /*#__PURE__*/_react["default"].createElement(_iconsReact.IconSquare, {
      width: 20,
      height: 20
    })
  }));
};
var ImageNode = function ImageNode(_ref2) {
  var editor = _ref2.editor,
    node = _ref2.node;
  var attrs = node.attrs;
  var src = attrs.src,
    alt = attrs.alt,
    width = attrs.width;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    editMenuVisible = _useState2[0],
    setEditMenuVisible = _useState2[1];
  (0, _react.useEffect)(function () {
    setEditMenuVisible(editor.isActive("image"));
  }, [editor.isActive("image")]);
  return /*#__PURE__*/_react["default"].createElement(_react2.NodeViewWrapper, null, src && /*#__PURE__*/_react["default"].createElement(_headless["default"], {
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(EditImageMenu, {
        editor: editor,
        node: node
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
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: src,
    alt: alt,
    width: width,
    "data-drag-handle": true
  })), !src && /*#__PURE__*/_react["default"].createElement("div", null, "Uploading..."));
};
var uploadFile = function uploadFile(file, editor, setSignedId) {
  var url = "/rails/active_storage/direct_uploads";
  var upload = new _activestorage.DirectUpload(file, url);
  upload.create(function (error, blob) {
    if (error) {
      console.log(error);
    } else {
      setSignedId(editor, blob.signed_id);
    }
  });
  return upload;
};
var _default = _core.Node.create({
  name: 'image',
  group: 'block',
  draggable: true,
  addAttributes: function addAttributes() {
    return {
      src: {
        "default": null
      },
      alt: {
        "default": null
      },
      signedId: {
        "default": null
      },
      width: {
        "default": "100%",
        parseHTML: function parseHTML(element) {
          return element.style.width.includes("%") ? element.style.width : "100%";
        }
      }
    };
  },
  renderHTML: function renderHTML(_ref3) {
    var HTMLAttributes = _ref3.HTMLAttributes;
    return ["img", (0, _core.mergeAttributes)(HTMLAttributes)];
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "img"
    }];
  },
  addStorage: function addStorage() {
    return {
      uploads: []
    };
  },
  addCommands: function addCommands() {
    var _this = this;
    return {
      attachImage: function attachImage(_ref4) {
        var signedId = _ref4.signedId,
          fileName = _ref4.fileName;
        return function (_ref5) {
          var commands = _ref5.commands;
          var url = "/rails/active_storage/blobs/redirect/".concat(signedId, "/").concat(fileName);
          return commands.insertContent({
            type: _this.name,
            attrs: {
              src: url,
              alt: fileName,
              signedId: signedId
            }
          });
        };
      },
      setImageWidth: function setImageWidth(width) {
        return function (_ref6) {
          var commands = _ref6.commands;
          return commands.updateAttributes(_this.name, {
            width: width
          });
        };
      }
    };
  },
  addNodeView: function addNodeView() {
    return (0, _react2.ReactNodeViewRenderer)(ImageNode);
  },
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    var editor = this.editor;
    return [new _state.Plugin({
      key: new _state.PluginKey('image'),
      props: {
        handlePaste: function handlePaste(_, event) {
          event.preventDefault();
          var images = Array.from(event.clipboardData.files).filter(function (file) {
            return file.type.startsWith('image/');
          });
          Array.from(images).forEach(function (image) {
            var setSignedId = function setSignedId(editor, signedId) {
              editor.commands.attachImage({
                signedId: signedId,
                fileName: image.name
              });
            };
            uploadFile(image, editor, setSignedId);
          });
        },
        handleDrop: function handleDrop(_, event) {
          event.preventDefault();
          var images = Array.from(event.dataTransfer.files).filter(function (file) {
            return file.type.startsWith('image/');
          });
          Array.from(images).forEach(function (image) {
            var setSignedId = function setSignedId(editor, signedId) {
              editor.commands.attachImage({
                signedId: signedId,
                fileName: image.name
              });
            };
            uploadFile(image, editor, setSignedId);
          });
        }
      }
    })];
  }
});
exports["default"] = _default;