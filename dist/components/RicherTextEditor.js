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
var _Mention = _interopRequireDefault(require("./editor/extensions/Mention"));
var _MentionSuggestion = _interopRequireDefault(require("./editor/suggestions/MentionSuggestion"));
var _MenuBar = _interopRequireDefault(require("./editor/MenuBar"));
var _BubbleMenu = _interopRequireDefault(require("./editor/menus/BubbleMenu"));
var _TableBubbleMenu = _interopRequireDefault(require("./editor/menus/TableBubbleMenu"));
var _reactToWebcomponent = _interopRequireDefault(require("react-to-webcomponent"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RicherTextEditor = function RicherTextEditor(props) {
  var content = props.content,
    placeholder = props.placeholder,
    callouts = props.callouts,
    showMenuBar = props.showMenuBar,
    bubbleMenuOptions = props.bubbleMenuOptions,
    tables = props.tables,
    input = props.input,
    serializer = props.serializer,
    emoji = props.emoji,
    mentionableUsersPath = props.mentionableUsersPath;
  var editorRef = _react["default"].useRef(null);
  bubbleMenuOptions = JSON.parse(bubbleMenuOptions);
  var extensions = [_RicherTextKit.RicherTextKit.configure({
    placeholder: placeholder,
    callout: callouts !== "false",
    tables: tables !== "false",
    emoji: emoji !== "false"
  })];
  if (mentionableUsersPath.length > 0) {
    extensions.push(_Mention["default"].configure({
      HTMLAttributes: {
        "class": "richer-text--mention"
      },
      suggestion: (0, _MentionSuggestion["default"])(mentionableUsersPath)
    }));
  }
  var editor = (0, _react2.useEditor)({
    extensions: [].concat(extensions),
    content: serializer === "json" ? JSON.parse(content) : content,
    editorProps: {
      input: input,
      serializer: serializer
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor",
    ref: editorRef
  }, showMenuBar == "true" && /*#__PURE__*/_react["default"].createElement(_MenuBar["default"], {
    editor: editor
  }), /*#__PURE__*/_react["default"].createElement(_BubbleMenu["default"], {
    editor: editor,
    bubbleMenuOptions: bubbleMenuOptions
  }), /*#__PURE__*/_react["default"].createElement(_TableBubbleMenu["default"], {
    editor: editor
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--content"
  }, /*#__PURE__*/_react["default"].createElement(_react2.EditorContent, {
    editor: editor
  })));
};
RicherTextEditor.defaultProps = {
  content: "",
  placeholder: "Write something...",
  callouts: "false",
  showMenuBar: "true",
  bubbleMenuOptions: "{ \"highlight\": false }",
  tables: "false",
  input: "",
  serializer: "html",
  emoji: "true",
  mentionableUsersPath: ""
};
RicherTextEditor.propTypes = {
  content: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  callouts: _propTypes["default"].string,
  showMenuBar: _propTypes["default"].string,
  bubbleMenuOptions: _propTypes["default"].string,
  tables: _propTypes["default"].string,
  input: _propTypes["default"].string,
  serializer: _propTypes["default"].string,
  emoji: _propTypes["default"].string,
  mentionableUsersPath: _propTypes["default"].string
};
var WebRicherTextEditor = (0, _reactToWebcomponent["default"])(RicherTextEditor, _react["default"], ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);
var _default = RicherTextEditor;
exports["default"] = _default;