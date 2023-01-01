"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = MenuBarButton = function MenuBarButton(_ref) {
  var action = _ref.action,
    disabled = _ref.disabled,
    active = _ref.active,
    icon = _ref.icon;
  var handleClick = function handleClick(event) {
    event.preventDefault();
    action();
  };
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    disabled: disabled,
    className: active ? 'is-active' : ''
  }, icon);
};
exports["default"] = _default;