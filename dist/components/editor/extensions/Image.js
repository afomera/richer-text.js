"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@tiptap/react");
var _state = require("@tiptap/pm/state");
var _activestorage = require("@rails/activestorage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ImageNode = function ImageNode(_ref) {
  var node = _ref.node;
  var attrs = node.attrs;
  var src = attrs.src,
    alt = attrs.alt;
  return /*#__PURE__*/_react["default"].createElement(_react2.NodeViewWrapper, null, src && /*#__PURE__*/_react["default"].createElement("img", {
    src: src,
    alt: alt,
    "data-drag-handle": true
  }), !src && /*#__PURE__*/_react["default"].createElement("div", null, "Uploading..."));
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
      }
    };
  },
  renderHTML: function renderHTML(_ref2) {
    var HTMLAttributes = _ref2.HTMLAttributes;
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
      attachImage: function attachImage(_ref3) {
        var signedId = _ref3.signedId,
          fileName = _ref3.fileName;
        return function (_ref4) {
          var commands = _ref4.commands;
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