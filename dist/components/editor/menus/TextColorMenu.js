"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _TextColorMenuButton = _interopRequireDefault(require("../elements/TextColorMenuButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TextColorMenu = function TextColorMenu(_ref) {
  var editor = _ref.editor;
  if (!editor) return null;
  var TEXT_COLORS = [{
    name: "Default",
    color: "var(--rte-text-color)"
  }, {
    name: "Purple",
    color: "#9333EA"
  }, {
    name: "Red",
    color: "#E00000"
  }, {
    name: "Yellow",
    color: "#EAB308"
  }, {
    name: "Blue",
    color: "#2563EB"
  }, {
    name: "Green",
    color: "#008A00"
  }, {
    name: "Orange",
    color: "#FFA500"
  }, {
    name: "Pink",
    color: "#BA4081"
  }, {
    name: "Gray",
    color: "#A8A29E"
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "richer-text-editor--bubble-menu-highlighter-menu"
  }, TEXT_COLORS.map(function (_ref2, index) {
    var name = _ref2.name,
      color = _ref2.color;
    return /*#__PURE__*/_react["default"].createElement(_TextColorMenuButton["default"], {
      key: index,
      command: function command() {
        editor.commands.unsetColor();
        name !== "Default" && editor.chain().focus().setColor(color || "").run();
      },
      active: editor.isActive("textStyle", {
        color: color
      }),
      text: "A",
      color: color,
      tooltip: name
    });
  }));
};
var _default = TextColorMenu;
exports["default"] = _default;