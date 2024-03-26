"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = void 0;
var _lit = require("lit");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var normalize = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  [hidden] {\n    display: none !important;\n  }\n\n  *,\n  *::after,\n  *::before {\n    box-sizing: border-box;\n  }\n\n  button {\n    background-color: inherit;\n    border: none;\n    color: inherit;\n    cursor: pointer;\n  }\n"])));
exports.normalize = normalize;