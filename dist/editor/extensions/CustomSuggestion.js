"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _suggestion = _interopRequireDefault(require("@tiptap/suggestion"));
var _state = require("@tiptap/pm/state");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var defaultSuggestionList = [{
  label: "+1",
  content: "👍"
}, {
  label: "-1",
  content: "👎"
}];
var CustomSuggestion = function CustomSuggestion(pluginName) {
  return _core.Extension.create({
    name: pluginName,
    addOptions: {
      pluginKey: {
        "default": "suggestionPluginKey"
      },
      suggestion: {
        "char": "#",
        startOfLine: false,
        allowSpaces: false,
        items: function items(_ref) {
          var query = _ref.query;
          return defaultSuggestionList.filter(function (suggestion) {
            return suggestion.label.toLowerCase().includes(query.toLowerCase());
          }).slice(0, 10);
        },
        command: function command(_ref2) {
          var editor = _ref2.editor,
            range = _ref2.range,
            props = _ref2.props;
          editor.chain().focus().deleteRange(range).insertContentAt(range.from, props.content).run();
        }
      }
    },
    addProseMirrorPlugins: function addProseMirrorPlugins() {
      return [(0, _suggestion["default"])(_objectSpread({
        pluginKey: new _state.PluginKey(this.options.pluginKey),
        editor: this.editor
      }, this.options.suggestion))];
    }
  });
};
var _default = CustomSuggestion;
exports["default"] = _default;