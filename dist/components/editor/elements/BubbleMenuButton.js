"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _headless = _interopRequireDefault(require("@tippyjs/react/headless"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var BubbleMenuButton = function BubbleMenuButton(_ref) {
  var command = _ref.command,
    active = _ref.active,
    icon = _ref.icon,
    tooltip = _ref.tooltip;
  var handleClick = function handleClick(event) {
    event.preventDefault();
    command();
  };
  return tooltip ? /*#__PURE__*/_react["default"].createElement(_headless["default"], {
    render: function render(attrs) {
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: "richer-text-tooltip",
        style: {
          position: "relative"
        },
        tabIndex: "-1"
      }, attrs), /*#__PURE__*/_react["default"].createElement("div", {
        className: "tooltip-inner",
        dangerouslySetInnerHTML: {
          __html: tooltip
        }
      }));
    },
    placement: "top",
    offset: [0, 10]
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    className: active ? 'is-active' : ''
  }, icon)) : /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    className: active ? 'is-active' : ''
  }, icon);
};
var _default = BubbleMenuButton;
exports["default"] = _default;