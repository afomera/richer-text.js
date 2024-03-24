"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseList = void 0;
var _lit = require("lit");
var _templateObject, _templateObject2;
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
var BaseList = /*#__PURE__*/function (_LitElement) {
  _inherits(BaseList, _LitElement);
  var _super = _createSuper(BaseList);
  function BaseList() {
    var _this;
    _classCallCheck(this, BaseList);
    _this = _super.call(this);
    _this.items = [];
    _this.selectedIndex = 0;
    _this.command = function () {};
    return _this;
  }
  _createClass(BaseList, [{
    key: "onKeyDown",
    value: function onKeyDown(_ref) {
      var event = _ref.event;
      if (event.key === 'ArrowUp') {
        this.upHandler();
        return true;
      }
      if (event.key === 'ArrowDown') {
        this.downHandler();
        return true;
      }
      if (event.key === 'Enter') {
        this.enterHandler();
        return true;
      }
      return false;
    }
  }, {
    key: "upHandler",
    value: function upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
    }
  }, {
    key: "downHandler",
    value: function downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    }
  }, {
    key: "enterHandler",
    value: function enterHandler() {
      this.selectItem(this.selectedIndex);
    }

    // This function should be implemented in the extending class
  }, {
    key: "render",
    value: function render() {
      return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
    }

    // This function should be implemented in the extending class
  }, {
    key: "selectItem",
    value: function selectItem(index) {}
  }]);
  return BaseList;
}(_lit.LitElement); // Don't register this element directly as we don't want to use it in the editor and want to extend it in the MentionList element
// customElements.define('richer-text-base-list', BaseList);
exports.BaseList = BaseList;
_defineProperty(BaseList, "styles", (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    .suggested-items {\n      padding: 0.2rem;\n      position: relative;\n      border-radius: 0.5rem;\n      background: #fff;\n      color: rgba(0, 0, 0, 0.8);\n      overflow: hidden;\n      font-size: 0.9rem;\n      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);\n    }\n    .suggested-item {\n      display: flex;\n      align-items: center;\n      margin: 0;\n      width: 100%;\n      text-align: left;\n      background: transparent;\n      border-radius: 0.4rem;\n      border: 1px solid transparent;\n      padding: 0.2rem 0.4rem;\n      font-size: 0.9rem;\n\n      img {\n        border-radius: 50%;\n        margin-right: 0.4rem;\n      }\n\n      svg {\n        color: rgba(0, 0, 0, 0.5);\n        width: 1.5rem;\n        margin-right: 0.4rem;\n      }\n    }\n    .suggested-item.is-selected {\n      border-color: #000;\n      background: rgba(0, 0, 0, 0.05);\n    }\n  "]))));
_defineProperty(BaseList, "properties", {
  items: {
    type: Array
  },
  selectedIndex: {
    type: Number
  },
  command: {
    type: Function
  }
});