"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RicherTextKit = void 0;
var _core = require("@tiptap/core");
var _extensionDropcursor = _interopRequireDefault(require("@tiptap/extension-dropcursor"));
var _extensionFocus = _interopRequireDefault(require("@tiptap/extension-focus"));
var _extensionHighlight = _interopRequireDefault(require("@tiptap/extension-highlight"));
var _HorizontalRule = _interopRequireDefault(require("./HorizontalRule"));
var _extensionLink = _interopRequireDefault(require("@tiptap/extension-link"));
var _extensionPlaceholder = _interopRequireDefault(require("@tiptap/extension-placeholder"));
var _starterKit = _interopRequireDefault(require("@tiptap/starter-kit"));
var _extensionTable = _interopRequireDefault(require("@tiptap/extension-table"));
var _extensionTableCell = _interopRequireDefault(require("@tiptap/extension-table-cell"));
var _extensionTableHeader = _interopRequireDefault(require("@tiptap/extension-table-header"));
var _extensionTableRow = _interopRequireDefault(require("@tiptap/extension-table-row"));
var _extensionTextAlign = _interopRequireDefault(require("@tiptap/extension-text-align"));
var _extensionTextStyle = _interopRequireDefault(require("@tiptap/extension-text-style"));
var _extensionColor = _interopRequireDefault(require("@tiptap/extension-color"));
var _Emoji = _interopRequireDefault(require("./Emoji"));
var _Callout = _interopRequireDefault(require("./Callout"));
var _CodeBlock = _interopRequireDefault(require("./CodeBlock"));
var _CommandMenu = _interopRequireDefault(require("./CommandMenu"));
var _EditorEvents = _interopRequireDefault(require("./EditorEvents"));
var _FontSize = _interopRequireDefault(require("./FontSize"));
var _Image = _interopRequireDefault(require("./Image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RicherTextKit = _core.Extension.create({
  name: "richerTextKit",
  addOptions: function addOptions() {
    return {
      placeholder: 'Start typing...'
    };
  },
  addExtensions: function addExtensions() {
    var extensions = [];
    if (this.options.starterKit !== false) {
      extensions.push(_starterKit["default"].configure({
        codeBlock: false,
        dropcursor: false,
        horizontalRule: false,
        heading: {
          levels: [1, 2]
        }
      }));
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(_HorizontalRule["default"]);
    }
    if (this.options.callout !== false) {
      extensions.push(_Callout["default"]);
    }
    if (this.options.commandMenu !== false) {
      var calloutEnabled = this.options.callout !== false;
      var tablesEnabled = this.options.tables !== false;
      extensions.push((0, _CommandMenu["default"])(calloutEnabled, tablesEnabled));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(_extensionDropcursor["default"].configure({
        color: 'var(--rte-content-focus-color)'
      }));
    }
    if (this.options.focus !== false) {
      extensions.push(_extensionFocus["default"].configure({
        className: 'has-focus',
        mode: "shallowest"
      }));
    }
    if (this.options.fontSize !== false) {
      extensions.push(_FontSize["default"]);
    }
    if (this.options.highlight !== false) {
      extensions.push(_extensionHighlight["default"].configure({
        multicolor: true
      }));
    }
    if (this.options.image !== false) {
      extensions.push(_Image["default"]);
    }
    if (this.options.link !== false) {
      extensions.push(_extensionLink["default"].configure({
        openOnClick: false,
        protocols: ["https", "mailto"]
      }));
    }
    if (this.options.placeholder !== false) {
      extensions.push(_extensionPlaceholder["default"].configure({
        placeholder: this.options.placeholder
      }));
    }
    if (this.options.tables !== false) {
      extensions.push(_extensionTable["default"].configure({
        resizable: false
      }), _extensionTableRow["default"], _extensionTableHeader["default"], _extensionTableCell["default"]);
    }
    if (this.options.emoji !== false) {
      extensions.push(_Emoji["default"]);
    }
    extensions.push(_EditorEvents["default"], _CodeBlock["default"], _extensionTextStyle["default"], _extensionColor["default"], _extensionTextAlign["default"].configure({
      types: ['paragraph', 'heading']
    }));
    return extensions;
  }
});
exports.RicherTextKit = RicherTextKit;