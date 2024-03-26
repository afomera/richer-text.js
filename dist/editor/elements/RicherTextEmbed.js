"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RicherTextEmbed = void 0;
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
var RicherTextEmbed = /*#__PURE__*/function (_LitElement) {
  _inherits(RicherTextEmbed, _LitElement);
  var _super = _createSuper(RicherTextEmbed);
  function RicherTextEmbed() {
    var _this;
    _classCallCheck(this, RicherTextEmbed);
    _this = _super.call(this);
    _this.sgid = null;
    _this.embedPath = "/embeds", _this.frameHeight = 0;
    _this.height = 0;
    _this.addEventListener("load", _this.handleLoad);
    return _this;
  }
  _createClass(RicherTextEmbed, [{
    key: "handleLoad",
    value: function handleLoad() {
      this.height = this.contentWindow.document.body.scrollHeight + 10;
    }
  }, {
    key: "iframeSrcPath",
    value: function iframeSrcPath() {
      return "".concat(this.embedPath, "/").concat(this.sgid);
    }
  }, {
    key: "renderiFrame",
    value: function renderiFrame() {
      var iframe = document.createElement("iframe");
      iframe.src = this.iframeSrcPath();
      iframe.width = "100%";
      iframe.height = this.height;
      iframe.frameBorder = 0;
      iframe.sandbox = "allow-same-origin allow-scripts";
      iframe.addEventListener("load", this.handleLoad);
      return iframe;
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <div className=\"richer-text-editor--embed-wrapper\" style=\"pointer-events: none; width: 100%\" data-drag-handle>\n        ", "\n      </div>\n    "])), this.renderiFrame());
    }
  }]);
  return RicherTextEmbed;
}(_lit.LitElement);
exports.RicherTextEmbed = RicherTextEmbed;
_defineProperty(RicherTextEmbed, "styles", (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([""]))));
_defineProperty(RicherTextEmbed, "properties", {
  sgid: {
    type: String
  },
  embedPath: {
    attribute: "embed-path",
    type: String
  },
  height: {
    type: Number,
    attribute: false
  }
});
customElements.define('richer-text-embed', RicherTextEmbed);