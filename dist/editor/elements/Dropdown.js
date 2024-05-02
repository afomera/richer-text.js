"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownItem = exports.Dropdown = void 0;
var _lit = require("lit");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DropdownItem = /*#__PURE__*/function (_LitElement) {
  _inherits(DropdownItem, _LitElement);
  var _super = _createSuper(DropdownItem);
  function DropdownItem() {
    var _this;
    _classCallCheck(this, DropdownItem);
    _this = _super.call(this);
    _this.href = '';
    _this.onClick = function () {};
    return _this;
  }
  _createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <a class=\"dropdown-item\" href=\"#\" @click=", ">\n        <slot></slot>\n      </a>\n    "])), this.onClick);
    }
  }]);
  return DropdownItem;
}(_lit.LitElement);
exports.DropdownItem = DropdownItem;
_defineProperty(DropdownItem, "styles", (0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    .dropdown-item {\n      padding: 8px;\n      display: block;\n      text-align: left;\n      text-decoration: none;\n      color: black;\n      font-size: 14px;\n    }\n\n    .dropdown-item:hover {\n      background-color: #e5e7eb;\n    }\n  "]))));
_defineProperty(DropdownItem, "properties", {
  href: {
    type: String
  },
  onClick: {
    type: Function
  }
});
customElements.define('rte-dropdown-item', DropdownItem);
var Dropdown = /*#__PURE__*/function (_LitElement2) {
  _inherits(Dropdown, _LitElement2);
  var _super2 = _createSuper(Dropdown);
  function Dropdown() {
    var _this2;
    _classCallCheck(this, Dropdown);
    _this2 = _super2.call(this);
    _this2.open = false;
    return _this2;
  }
  _createClass(Dropdown, [{
    key: "toggleDropdown",
    value: function toggleDropdown() {
      console.log('toggleDropdown');
      this.open = !this.open;
      var dropdown = this.shadowRoot.querySelector('.dropdown-items');
      dropdown.classList.toggle('is-active');
      this.requestUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <div class=\"dropdown\">\n        <button class=\"dropdown-trigger\" @click=", ">\n          <slot name=\"trigger\"></slot>\n        </button>\n        <div class=\"dropdown-items\">\n          <slot name=\"items\" @click=", "></slot>\n        </div>\n      </div>\n    "])), this.toggleDropdown, this.toggleDropdown);
    }
  }]);
  return Dropdown;
}(_lit.LitElement);
exports.Dropdown = Dropdown;
_defineProperty(Dropdown, "styles", (0, _lit.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  [hidden] {\n      display: none !important;\n    }\n\n    *,\n    *::after,\n    *::before {\n      box-sizing: border-box;\n    }\n\n    button {\n      background-color: inherit;\n      border: none;\n      color: inherit;\n      cursor: pointer;\n    }\n\n\n    .dropdown {\n      position: relative;\n      display: inline-block;\n\n      background: none;\n      border: none;\n      cursor: pointer;\n    }\n\n    .dropdown-items {\n      min-width: 110px;\n      background-color: #ffffff;\n      border: 1px solid #e5e7eb;\n      display: none;\n      position: absolute;\n      z-index: 1;\n    }\n\n    .dropdown-items.is-active {\n      display: block;\n    }\n\n    .dropdown-trigger {\n      cursor: pointer;\n      color: inherit;\n    }\n  "]))));
_defineProperty(Dropdown, "properties", {
  open: {
    type: Boolean
  }
});
customElements.define('rte-dropdown', Dropdown);