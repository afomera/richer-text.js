"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RicherBubbleMenu = void 0;
var _lit = require("lit");
var _icons = _interopRequireDefault(require("../icons"));
var _Dropdown = require("./Dropdown");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var RicherBubbleMenu = /*#__PURE__*/function (_LitElement) {
  _inherits(RicherBubbleMenu, _LitElement);
  var _super = _createSuper(RicherBubbleMenu);
  function RicherBubbleMenu() {
    var _this;
    _classCallCheck(this, RicherBubbleMenu);
    _this = _super.call(this);
    _this.editingLink = false;
    _this.mode = "text";
    _this.requestUpdate();
    return _this;
  }
  _createClass(RicherBubbleMenu, [{
    key: "removeNode",
    value: function removeNode() {
      console.log("removeNode");
      this.editor.chain().focus().deleteSelection().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "resizeImage",
    value: function resizeImage(size) {
      console.log("resizeImage", size);
      this.editor.chain().focus().setImageWidth(size).run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleBold",
    value: function toggleBold() {
      this.editor.chain().focus().toggleBold().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleItalic",
    value: function toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleStrike",
    value: function toggleStrike() {
      this.editor.chain().focus().toggleStrike().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "isBold",
    get: function get() {
      return this.editor.isActive("bold");
    }
  }, {
    key: "toggleLinkEditor",
    value: function toggleLinkEditor() {
      var _this2 = this;
      this.editingLink = !this.editingLink;
      if (this.editingLink) {
        // Add a small delay to ensure the input is focused after the element is rendered
        setTimeout(function () {
          _this2.shadowRoot.getElementById('link-url').focus();
        }, 50);
      }
    }
  }, {
    key: "toggleLeftAlignment",
    value: function toggleLeftAlignment() {
      this.editor.chain().focus().setTextAlign("left").run();
      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleCenterAlignment",
    value: function toggleCenterAlignment() {
      this.editor.chain().focus().setTextAlign("center").run();
      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleRightAlignment",
    value: function toggleRightAlignment() {
      this.editor.chain().focus().setTextAlign("right").run();
      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "clear",
    value: function clear() {
      console.log('clear');
      this.editor.chain().clearContent(true).focus().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.editor.commands.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.editor.commands.blur();
    }
  }, {
    key: "setLinkAndClose",
    value: function setLinkAndClose() {
      var url = this.shadowRoot.getElementById('link-url').value;
      if (url) {
        this.editor.chain().focus().extendMarkRange('link').setLink({
          href: url
        }).run();
      } else {
        this.editor.chain().focus().unsetLink().run();
      }
      this.editingLink = false;
    }
  }, {
    key: "_handleLinkSubmit",
    value: function _handleLinkSubmit(event) {
      event.preventDefault();
      this.setLinkAndClose();
    }

    // This is a simple bubble menu that toggles bold text.
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      // if (this.isActive("image") || this.isActive("mention") || this.isActive("codeBlock") || this.isActive("richerTextEmbed")) {
      //   return html``;
      // }
      if (this.mode == "image") {
        return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <div class=\"divider\"></div>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n        </div>\n      "])), function () {
          return _this3.removeNode();
        }, _icons["default"].get("delete"), function () {
          return _this3.resizeImage("25%");
        }, _icons["default"].get("small-square"), function () {
          return _this3.resizeImage("50%");
        }, _icons["default"].get("medium-square"), function () {
          return _this3.resizeImage("100%");
        }, _icons["default"].get("large-square"));
      } else if (this.mode == "text" && !this.editingLink) {
        return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n\n          <div class=\"divider\"></div>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n\n          <div class=\"divider\"></div>\n          <rte-dropdown>\n            <button slot=\"trigger\" class=\"caret\">", "</button>\n            <div slot=\"items\">\n              <rte-dropdown-item @click=\"", "\">Clear</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Focus</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Blur</rte-dropdown-item>\n            </div>\n          </rte-dropdown>\n          <div class=\"divider\"></div>\n          <rte-dropdown>\n            <button slot=\"trigger\" class=\"caret\">", "</button>\n            <div slot=\"items\">\n              <rte-dropdown-item @click=\"", "\">Clear</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Focus</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Blur</rte-dropdown-item>\n            </div>\n          </rte-dropdown>\n        </div>\n      "])), function () {
          return _this3.toggleBold();
        }, _icons["default"].get("bold"), function () {
          return _this3.toggleItalic();
        }, _icons["default"].get("italic"), function () {
          return _this3.toggleStrike();
        }, _icons["default"].get("strike"), function () {
          return _this3.toggleLinkEditor();
        }, _icons["default"].get("link"), function () {
          return _this3.toggleLeftAlignment();
        }, _icons["default"].get("align-left"), function () {
          return _this3.toggleCenterAlignment();
        }, _icons["default"].get("align-center"), function () {
          return _this3.toggleRightAlignment();
        }, _icons["default"].get("align-right"), _icons["default"].get("highlight"), this.clear, this.focus, this.blur, _icons["default"].get("text-color"), this.clear, this.focus, this.blur);
      } else {
        return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <form @submit=", ">\n            <span class=\"link-icon\">", "</span>\n            <input id=\"link-url\" value=", " type=\"url\" autofocus=\"true\" placeholder=\"Enter a URL\" />\n            <button @click=", ">Done</button>\n          </form>\n        </div>\n      "])), this._handleLinkSubmit, _icons["default"].get("link"), this.editor.getAttributes("link").href, function () {
          return _this3.setLinkAndClose();
        });
      }
    }
  }], [{
    key: "properties",
    get: function get() {
      return {
        editor: {
          type: Function
        },
        // State
        editingLink: {
          type: Boolean,
          state: true
        },
        isActive: {
          type: Function,
          state: true
        },
        mode: {
          type: String,
          state: true
        }
      };
    }
  }]);
  return RicherBubbleMenu;
}(_lit.LitElement);
exports.RicherBubbleMenu = RicherBubbleMenu;
_defineProperty(RicherBubbleMenu, "styles", (0, _lit.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    .richer-text-editor--bubble-menu {\n      z-index: 100;\n      background-color: white;\n      border: 1px solid #ddd;\n      border-radius: 8px;\n      padding: 2px;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n\n      display: flex;\n      align-items: center;\n      gap: 4px;\n\n      .divider {\n        border-left: 1px solid #ddd;\n        height: 24px;\n      }\n\n      input {\n        border: none;\n        border-radius: 4px;\n        padding: 4px;\n        margin: 0;\n        display: inline-block;\n        font-size: 16px;\n        color: #333;\n        width: 200px;\n      }\n\n      .link-icon {\n        display: inline-block;\n        width: 16px;\n        height: 16px;\n        margin-right: 4px;\n        margin-left: 4px;\n      }\n\n      button {\n        background: none;\n        border: none;\n        cursor: pointer;\n        padding: 4px;\n        margin: 0;\n        display: inline-block;\n        font-size: 16px;\n        color: #333;\n\n        &:hover {\n          background-color: #f9f9f9;\n          border-radius: 4px;\n        }\n      }\n\n      button.caret {\n        position: relative;\n        padding-right: 16px;\n        margin: 0;\n\n        &::after {\n          content: '';\n          position: absolute;\n          top: 50%;\n          right: 8px;\n          transform: translateY(-50%);\n          border-width: 4px 4px 0;\n          border-style: solid;\n          border-color: #333 transparent transparent;\n        }\n      }\n    }\n  "]))));
customElements.define('richer-bubble-menu', RicherBubbleMenu);