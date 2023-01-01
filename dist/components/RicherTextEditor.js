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
var _extensionDropcursor = _interopRequireDefault(require("@tiptap/extension-dropcursor"));
var _extensionFocus = _interopRequireDefault(require("@tiptap/extension-focus"));
var _extensionHighlight = _interopRequireDefault(require("@tiptap/extension-highlight"));
var _extensionLink = _interopRequireDefault(require("@tiptap/extension-link"));
var _extensionPlaceholder = _interopRequireDefault(require("@tiptap/extension-placeholder"));
var _starterKit = _interopRequireDefault(require("@tiptap/starter-kit"));
var _extensionTextAlign = _interopRequireDefault(require("@tiptap/extension-text-align"));
var _extensionTextStyle = _interopRequireDefault(require("@tiptap/extension-text-style"));
var _Callout = _interopRequireDefault(require("./editor/extensions/Callout"));
var _CommandMenu = _interopRequireDefault(require("./editor/extensions/CommandMenu"));
var _FontSize = _interopRequireDefault(require("./editor/extensions/FontSize"));
var _Image = _interopRequireDefault(require("./editor/extensions/Image"));
var _MenuBar = _interopRequireDefault(require("./editor/MenuBar"));
var _BubbleMenu = _interopRequireDefault(require("./editor/BubbleMenu"));
var _reactToWebcomponent = _interopRequireDefault(require("react-to-webcomponent"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RicherTextEditor = function RicherTextEditor(_ref) {
  var content = _ref.content,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Write something..." : _ref$placeholder,
    _ref$showMenuBar = _ref.showMenuBar,
    showMenuBar = _ref$showMenuBar === void 0 ? true : _ref$showMenuBar,
    _ref$bubbleMenuOption = _ref.bubbleMenuOptions,
    bubbleMenuOptions = _ref$bubbleMenuOption === void 0 ? {
      highlight: true
    } : _ref$bubbleMenuOption;
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
  var editor = (0, _react2.useEditor)({
    extensions: [_Callout["default"], _CommandMenu["default"], _extensionDropcursor["default"].configure({
      color: 'var(--editor-content-focus-color)'
    }), _extensionFocus["default"].configure({
      mode: "shallowest"
    }), _FontSize["default"], _extensionHighlight["default"].configure({
      multicolor: true
    }), _Image["default"], _extensionLink["default"].configure({
      openOnClick: false,
      protocols: ["https", "mailto"]
    }), _extensionPlaceholder["default"].configure({
      placeholder: placeholder
    }), _starterKit["default"].configure({
      dropcursor: false,
      heading: {
        levels: [1, 2]
      }
    }), _extensionTextStyle["default"], _extensionTextAlign["default"].configure({
      types: ['paragraph', 'heading']
    })],
    content: content,
    onUpdate: function onUpdate(_ref2) {
      var editor = _ref2.editor;
      return _onUpdate(editorRef.current, editor);
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor",
    ref: editorRef
  }, showMenuBar && /*#__PURE__*/_react["default"].createElement(_MenuBar["default"], {
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
RicherTextEditor.propTypes = {
  content: _propTypes["default"].string.isRequired,
  placeholder: _propTypes["default"].string
};
var WebRicherTextEditor = (0, _reactToWebcomponent["default"])(RicherTextEditor, _react["default"], ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);
var _default = RicherTextEditor;
exports["default"] = _default;