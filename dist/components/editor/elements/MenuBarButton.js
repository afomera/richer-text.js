"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MenuBarButton = function MenuBarButton(_ref) {
  var action = _ref.action,
    disabled = _ref.disabled,
    active = _ref.active,
    icon = _ref.icon,
    hideOnMobile = _ref.hideOnMobile;
  var handleClick = function handleClick(event) {
    event.preventDefault();
    action();
  };
  var classes = [];
  if (hideOnMobile) {
    classes.push('editor--hide-on-mobile');
  }
  classes.push(active ? 'is-active' : '');
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    disabled: disabled,
    className: classes.join(' ')
  }, icon);
};
var _default = MenuBarButton;
exports["default"] = _default;