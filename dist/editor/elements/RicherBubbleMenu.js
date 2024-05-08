"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RicherBubbleMenu = void 0;
var _lit = require("lit");
var _icons = _interopRequireDefault(require("../icons"));
var _Dropdown = require("./Dropdown");
var _roleComponents = require("role-components");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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
_roleComponents.RoleTooltip.define();
var RicherBubbleMenu = /*#__PURE__*/function (_LitElement) {
  _inherits(RicherBubbleMenu, _LitElement);
  var _super = _createSuper(RicherBubbleMenu);
  function RicherBubbleMenu() {
    var _this;
    _classCallCheck(this, RicherBubbleMenu);
    _this = _super.call(this);
    _this.editingLink = false;
    _this.mode = "text";
    _this.embedPath = "/embeds";
    _this.embedPatterns = [];
    _this.oembed = false;
    _this.urlMatchesPattern = false;
    _this.requestUpdate();
    return _this;
  }
  _createClass(RicherBubbleMenu, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(RicherBubbleMenu.prototype), "connectedCallback", this).call(this);
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      if (changedProperties.has("embedPath") || changedProperties.has("oembed")) {
        this.fetchOEmbedPatterns();
      }
      if (changedProperties.has("urlMatchesPattern")) {
        this.requestUpdate();
      }
    }
  }, {
    key: "removeNode",
    value: function removeNode() {
      this.editor.chain().focus().deleteSelection().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "resizeImage",
    value: function resizeImage(size) {
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
      var _this3 = this;
      var embed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var url = this.shadowRoot.getElementById('link-url').value;
      if (embed) {
        fetch("".concat(this.embedPath), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: url
          })
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.content) {
            _this3.editor.chain().focus().deleteSelection().insertContent(data.content).run();
          }
        })["catch"](function (error) {
          console.error(error);
        });
      }
      if (!embed && url) {
        this.editor.chain().focus().extendMarkRange('link').setLink({
          href: url
        }).run();
      } else {
        this.editor.chain().focus().unsetLink().run();
      }
      this.editingLink = false;
      this.urlMatchesPattern = false;
    }
  }, {
    key: "_handleLinkSubmit",
    value: function _handleLinkSubmit(event) {
      event.preventDefault();
      this.setLinkAndClose();
    }
  }, {
    key: "deleteTable",
    value: function deleteTable() {
      this.editor.chain().focus().deleteTable().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "insertColumnLeft",
    value: function insertColumnLeft() {
      this.editor.chain().focus().addColumnBefore().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "insertColumnRight",
    value: function insertColumnRight() {
      this.editor.chain().focus().addColumnAfter().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn() {
      this.editor.chain().focus().deleteColumn().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "insertRowAbove",
    value: function insertRowAbove() {
      this.editor.chain().focus().addRowBefore().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "insertRowBelow",
    value: function insertRowBelow() {
      this.editor.chain().focus().addRowAfter().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      this.editor.chain().focus().deleteRow().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleHeaderColumn",
    value: function toggleHeaderColumn() {
      this.editor.chain().focus().toggleHeaderColumn().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "toggleHeaderRow",
    value: function toggleHeaderRow() {
      this.editor.chain().focus().toggleHeaderRow().run();

      // Rebuild the bubble menu element to update the button state
      this.requestUpdate();
    }
  }, {
    key: "fetchOEmbedPatterns",
    value: function fetchOEmbedPatterns() {
      var _this4 = this;
      if (!this.oembed) {
        return;
      }
      fetch("".concat(this.embedPath, "/patterns")).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this4.embedPatterns = data;
      });
    }
  }, {
    key: "onURLChange",
    value: function onURLChange(event) {
      if (this.oembed) {
        var url = event.target.value;
        var pattern = this.embedPatterns.find(function (pattern) {
          if (url == "") {
            return false;
          }
          var regex = new RegExp(pattern.source);
          return regex.test(url);
        });
        if (pattern) {
          this.urlMatchesPattern = true;
        } else {
          this.urlMatchesPattern = false;
        }
        this.requestUpdate();
      }
    }
  }, {
    key: "fetchSummary",
    value: function fetchSummary() {
      this.editor.commands.fetchSummary();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      if (this.mode == "table") {
        return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"insert-column-left-tooltip\">\n            ", "\n            <role-tooltip id=\"insert-column-left-tooltip\" hoist>Insert column before</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"insert-column-right-tooltip\">\n            ", "\n            <role-tooltip id=\"insert-column-right-tooltip\" hoist>Insert column after</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"column-remove-tooltip\">\n            ", "\n            <role-tooltip id=\"column-remove-tooltip\" hoist>Delete column</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"insert-row-above-tooltip\">\n            ", "\n            <role-tooltip id=\"insert-row-above-tooltip\" hoist>Insert row before</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"insert-row-below-tooltip\">\n            ", "\n            <role-tooltip id=\"insert-row-below-tooltip\" hoist>Insert row after</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"delete-row-tooltip\">\n            ", "\n            <role-tooltip id=\"delete-row-tooltip\" hoist>Delete row</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"toggle-header-column-tooltip\">\n            ", "\n            <role-tooltip id=\"toggle-header-column-tooltip\" hoist>Toggle header column</role-tooltip>\n          </button>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"toggle-header-row-tooltip\">\n            ", "\n            <role-tooltip id=\"toggle-header-row-tooltip\" hoist>Toggle header row</role-tooltip>\n          </button>\n\n          <div class=\"divider\"></div>\n\n          <button class=\"toolbar-button\" @click=", " aria-describedby=\"delete-table-tooltip\">\n            ", "\n            <role-tooltip id=\"delete-table-tooltip\" hoist>Delete Table</role-tooltip>\n          </button>\n        </div>\n      "])), function () {
          return _this5.insertColumnLeft();
        }, _icons["default"].get("insert-column-left"), function () {
          return _this5.insertColumnRight();
        }, _icons["default"].get("insert-column-right"), function () {
          return _this5.deleteColumn();
        }, _icons["default"].get("delete-column"), function () {
          return _this5.insertRowAbove();
        }, _icons["default"].get("insert-row-above"), function () {
          return _this5.insertRowBelow();
        }, _icons["default"].get("insert-row-below"), function () {
          return _this5.deleteRow();
        }, _icons["default"].get("delete-row"), function () {
          return _this5.toggleHeaderColumn();
        }, _icons["default"].get("toggle-header-column"), function () {
          return _this5.toggleHeaderRow();
        }, _icons["default"].get("toggle-header-row"), function () {
          return _this5.deleteTable();
        }, _icons["default"].get("delete-table"));
      } else if (this.mode == "image") {
        return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <div class=\"divider\"></div>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n        </div>\n      "])), function () {
          return _this5.removeNode();
        }, _icons["default"].get("delete"), function () {
          return _this5.resizeImage("25%");
        }, _icons["default"].get("small-square"), function () {
          return _this5.resizeImage("50%");
        }, _icons["default"].get("medium-square"), function () {
          return _this5.resizeImage("100%");
        }, _icons["default"].get("large-square"));
      } else if (this.mode == "text" && !this.editingLink) {
        return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">\n            ", "\n          </button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n\n          <div class=\"divider\"></div>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n          <button class=\"toolbar-button\" @click=", ">", "</button>\n        <!--\n          <div class=\"divider\"></div>\n          <rte-dropdown>\n            <button slot=\"trigger\" class=\"caret\">", "</button>\n            <div slot=\"items\">\n              <rte-dropdown-item @click=\"", "\">Clear</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Focus</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Blur</rte-dropdown-item>\n            </div>\n          </rte-dropdown>\n          <div class=\"divider\"></div>\n          <rte-dropdown>\n            <button slot=\"trigger\" class=\"caret\">", "</button>\n            <div slot=\"items\">\n              <rte-dropdown-item @click=\"", "\">Clear</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Focus</rte-dropdown-item>\n              <rte-dropdown-item @click=\"", "\">Blur</rte-dropdown-item>\n            </div>\n          </rte-dropdown> -->\n        </div>\n      "])), function () {
          return _this5.toggleBold();
        }, _icons["default"].get("bold"), function () {
          return _this5.toggleItalic();
        }, _icons["default"].get("italic"), function () {
          return _this5.toggleStrike();
        }, _icons["default"].get("strike"), function () {
          return _this5.toggleLinkEditor();
        }, _icons["default"].get("link"), function () {
          return _this5.toggleLeftAlignment();
        }, _icons["default"].get("align-left"), function () {
          return _this5.toggleCenterAlignment();
        }, _icons["default"].get("align-center"), function () {
          return _this5.toggleRightAlignment();
        }, _icons["default"].get("align-right"), function () {
          return _this5.fetchSummary();
        }, _icons["default"].get("ai"), _icons["default"].get("highlight"), this.clear, this.focus, this.blur, _icons["default"].get("text-color"), this.clear, this.focus, this.blur);
      } else {
        return (0, _lit.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        <div class=\"richer-text-editor--bubble-menu\">\n          <form @submit=", ">\n            <span class=\"link-icon\">", "</span>\n            <input id=\"link-url\" value=", " @input=", " type=\"url\" autofocus=\"true\" placeholder=\"Enter a URL\" />\n            <button @click=", ">Done</button>\n            ", "\n          </form>\n        </div>\n      "])), this._handleLinkSubmit, _icons["default"].get("link"), this.editor.getAttributes("link").href, this.onURLChange, function () {
          return _this5.setLinkAndClose();
        }, this.urlMatchesPattern ? (0, _lit.html)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<button @click=", ">Embed</button>"])), function () {
          return _this5.setLinkAndClose(true);
        }) : null);
      }
    }
  }], [{
    key: "properties",
    get: function get() {
      return {
        editor: {
          type: Function
        },
        embedPath: {
          type: String
        },
        urlMatchesPattern: {
          type: Boolean
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
        },
        embedPatterns: {
          type: Array,
          state: true
        },
        oembed: {
          type: Boolean,
          state: true
        }
      };
    }
  }]);
  return RicherBubbleMenu;
}(_lit.LitElement);
exports.RicherBubbleMenu = RicherBubbleMenu;
_defineProperty(RicherBubbleMenu, "styles", (0, _lit.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    .richer-text-editor--bubble-menu {\n      z-index: 100;\n      background-color: white;\n      border: 1px solid #ddd;\n      border-radius: 8px;\n      padding: 2px;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n\n      display: flex;\n      align-items: center;\n      gap: 4px;\n\n      .divider {\n        border-left: 1px solid #ddd;\n        height: 24px;\n      }\n\n      input {\n        border: none;\n        border-radius: 4px;\n        padding: 4px;\n        margin: 0;\n        display: inline-block;\n        font-size: 16px;\n        color: #333;\n        width: 200px;\n      }\n\n      .link-icon {\n        display: inline-block;\n        width: 16px;\n        height: 16px;\n        margin-right: 4px;\n        margin-left: 4px;\n      }\n\n      button {\n        background: none;\n        border: none;\n        cursor: pointer;\n        padding: 4px;\n        margin: 0;\n        display: inline-block;\n        font-size: 16px;\n        color: #333;\n\n        &:hover {\n          background-color: #e5e7eb;\n          border-radius: 4px;\n        }\n      }\n\n      button.caret {\n        position: relative;\n        padding-right: 16px;\n        margin: 0;\n\n        &::after {\n          content: '';\n          position: absolute;\n          top: 50%;\n          right: 8px;\n          transform: translateY(-50%);\n          border-width: 4px 4px 0;\n          border-style: solid;\n          border-color: #333 transparent transparent;\n        }\n      }\n    }\n  "]))));
customElements.define('richer-bubble-menu', RicherBubbleMenu);