"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var BubbleMenuButton = function BubbleMenuButton(_ref) {
  var command = _ref.command,
    active = _ref.active,
    icon = _ref.icon;
  var handleClick = function handleClick(event) {
    event.preventDefault();
    command();
  };
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    className: active ? 'is-active' : ''
  }, icon);
};
var _default = BubbleMenuButton;
exports["default"] = _default;