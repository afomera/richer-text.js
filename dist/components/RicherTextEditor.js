"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom/client"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@tiptap/react");
var _RicherTextKit = require("./editor/extensions/RicherTextKit");
var _MenuBar = _interopRequireDefault(require("./editor/MenuBar"));
var _BubbleMenu = _interopRequireDefault(require("./editor/menus/BubbleMenu"));
var _reactToWebcomponent = _interopRequireDefault(require("react-to-webcomponent"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RicherTextEditor = function RicherTextEditor(_ref) {
  var content = _ref.content,
    placeholder = _ref.placeholder,
    callouts = _ref.callouts,
    showMenuBar = _ref.showMenuBar,
    bubbleMenuOptions = _ref.bubbleMenuOptions;
  var editorRef = _react["default"].useRef(null);
  var _onUpdate = function onUpdate(element, editor) {
    // Emit a custom event with the current editor content
    var event = new CustomEvent('editor:update', {
      detail: {
        html: editor.getHTML(),
        json: editor.getJSON()
      },
      bubbles: true
    });
    element.dispatchEvent(event);
  };
  var _onBlur = function onBlur(element) {
    var event = new CustomEvent('editor:blur', {
      bubbles: true
    });
    element.dispatchEvent(event);
  };
  bubbleMenuOptions = JSON.parse(bubbleMenuOptions);
  var editor = (0, _react2.useEditor)({
    extensions: [_RicherTextKit.RicherTextKit.configure({
      placeholder: placeholder,
      callout: callouts !== "false"
    })],
    content: content,
    onBlur: function onBlur() {
      return _onBlur(editorRef.current);
    },
    onUpdate: function onUpdate(_ref2) {
      var editor = _ref2.editor;
      return _onUpdate(editorRef.current, editor);
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor",
    ref: editorRef
  }, showMenuBar == "true" && /*#__PURE__*/_react["default"].createElement(_MenuBar["default"], {
    editor: editor
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenu["default"], {
    editor: editor,
    bubbleMenuOptions: bubbleMenuOptions
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--content"
  }, /*#__PURE__*/_react["default"].createElement(_react2.EditorContent, {
    editor: editor
  })));
};
RicherTextEditor.defaultProps = {
  content: "",
  placeholder: "Write something...",
  callouts: "true",
  showMenuBar: "true",
  bubbleMenuOptions: "{ \"highlight\": false }"
};
RicherTextEditor.propTypes = {
  content: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  callouts: _propTypes["default"].string,
  showMenuBar: _propTypes["default"].string,
  bubbleMenuOptions: _propTypes["default"].string
};
var WebRicherTextEditor = (0, _reactToWebcomponent["default"])(RicherTextEditor, _react["default"], ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);
var _default = RicherTextEditor;
exports["default"] = _default;