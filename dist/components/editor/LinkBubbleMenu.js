"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var LinkBubbleMenu = function LinkBubbleMenu(_ref) {
  var editor = _ref.editor,
    onClose = _ref.onClose;
  if (!editor) return null;
  var linkInputRef = (0, _react.useRef)(null);
  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var url = linkInputRef.current.value;
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({
        href: url
      }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    onClose();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--bubble-menu"
  }, /*#__PURE__*/_react["default"].createElement("form", {
    "class": "editor--bubble-menu-form",
    onSubmit: onSubmit
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "url",
    name: "url",
    placeholder: "https://www.example.com",
    defaultValue: editor.getAttributes("link").href,
    ref: linkInputRef
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onSubmit
  }, "Done")));
};
var _default = LinkBubbleMenu;
exports["default"] = _default;