"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloWorld = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
console.log("RicherText - Loaded");
var HelloWorld = function HelloWorld(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Hello ", name, "!"));
};
exports.HelloWorld = HelloWorld;