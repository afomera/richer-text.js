"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lit = require("lit");
var _classMap = require("lit/directives/class-map.js");
var _map = require("lit/directives/map.js");
var _core = require("@tiptap/core");
var _icons = _interopRequireDefault(require("../editor/icons"));
var _normalize = require("../styles/normalize");
var _tiptapStyles = require("../styles/tiptapStyles");
var _richerTextEditorStyles = require("../styles/richerTextEditorStyles");
var _RicherTextKit = require("../editor/extensions/RicherTextKit");
var _CustomSuggestion = _interopRequireDefault(require("../editor/extensions/CustomSuggestion"));
var _CustomSuggestionSuggestion = _interopRequireDefault(require("../editor/suggestions/CustomSuggestionSuggestion"));
var _Mention = _interopRequireDefault(require("../editor/extensions/Mention"));
var _MentionSuggestion = _interopRequireDefault(require("../editor/suggestions/MentionSuggestion"));
var _RicherTextEmbed = _interopRequireDefault(require("../editor/extensions/RicherTextEmbed"));
require("../editor/elements/RicherBubbleMenu");
var _CustomBubbleMenu = _interopRequireDefault(require("../editor/extensions/CustomBubbleMenu"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var RicherTextEditor = /*#__PURE__*/function (_LitElement) {
  _inherits(RicherTextEditor, _LitElement);
  var _super = _createSuper(RicherTextEditor);
  function RicherTextEditor() {
    var _this;
    _classCallCheck(this, RicherTextEditor);
    _this = _super.call(this);
    _this.toolbar = [];
    _this.toolbarPlacement = _this.getAttribute("toolbar-placement") || "top";
    _this.toolbarPreset = _this.getAttribute("toolbar-preset") || "default";
    _this.mentionableUsersPath = _this.getAttribute("mentionable-users-path") || "";
    _this.customSuggestions = JSON.parse(_this.getAttribute("custom-suggestions")) || [];
    _this.embedsPath = _this.getAttribute("embeds-path") || "";
    return _this;
  }
  _createClass(RicherTextEditor, [{
    key: "configureToolbar",
    value: function configureToolbar() {
      if (this.toolbar.length > 0) {
        return;
      }
      if (this.toolbarPreset === 'minimal') {
        this.toolbar = ['bold', 'italic', 'strike'];
      } else {
        this.toolbar = ['heading-1', 'heading-2', 'heading-3', 'divider', 'bold', 'italic', 'strike', 'code', 'divider', 'highlight', 'bulletlist', 'orderedlist', 'blockquote', 'divider', 'code-block', 'horizontal-rule', 'divider', 'undo', 'redo'];
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(RicherTextEditor.prototype), "disconnectedCallback", this).call(this);
      this.editor.destroy();
    }
  }, {
    key: "getHTML",
    value: function getHTML() {
      var html = this.editor.getHTML();
      return html === '<p></p>' ? '' : html;
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.dispatchEvent(new CustomEvent(eventName, {
        detail: detail,
        bubbles: true,
        composed: true
      }));
    }
  }, {
    key: "emitChange",
    value: function emitChange() {
      this.emit("change", {
        html: this.getHTML(),
        json: this.editor.getJSON()
      });
      document.getElementById(this.input).value = this.serializer === "json" ? JSON.stringify(this.editor.getJSON()) : this.getHTML();
    }
  }, {
    key: "_createEditorRootElement",
    value: function _createEditorRootElement() {
      var element = document.createElement("div");
      element.slot = "editor";
      this.shadowRoot.host.appendChild(element);
      return element;
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      if (changedProperties.has('toolbar') || changedProperties.has('toolbarPreset')) {
        this.configureToolbar();
      }
      if (changedProperties.has("content")) {
        this.editor.commands.setContent(this.serializer === "json" ? JSON.parse(this.content) : this.content);
      }
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      var _this2 = this;
      var extensions = [_CustomBubbleMenu["default"].configure({
        shouldShow: function shouldShow(_ref) {
          var editor = _ref.editor;
          return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading") || editor.isActive("blockquote"));
        }
      }), _RicherTextEmbed["default"].configure({
        embedPath: this.embedsPath
      }), _RicherTextKit.RicherTextKit.configure({
        placeholder: this.placeholder || "Start typing...",
        callout: this.callouts !== "false",
        tables: this.tables !== "false"
      })];
      if (this.mentionableUsersPath.length > 0) {
        extensions.push(_Mention["default"].configure({
          HTMLAttributes: {
            "class": "richer-text--mention"
          },
          suggestion: (0, _MentionSuggestion["default"])(this.mentionableUsersPath)
        }));
      }
      this.customSuggestions.forEach(function (customSuggestion) {
        extensions.push((0, _CustomSuggestion["default"])("".concat(customSuggestion.name, "Plugin")).configure({
          suggestion: (0, _CustomSuggestionSuggestion["default"])(customSuggestion.path, customSuggestion.trigger, "".concat(customSuggestion.name, "PluginKey"))
        }));
      });
      this.editor = new _core.Editor({
        element: this._createEditorRootElement(),
        editable: !this.readonly,
        extensions: [].concat(extensions),
        content: this.serializer === "json" ? JSON.parse(this.content) : this.content,
        onCreate: function onCreate() {
          // The editor is ready.
          _this2.emitChange();
        },
        onUpdate: function onUpdate(_ref2) {
          var editor = _ref2.editor;
          // The content has changed.
          _this2.requestUpdate();
          _this2.emitChange();
        },
        onSelectionUpdate: function onSelectionUpdate() {
          // The selection has changed.
          _this2.requestUpdate();
        }
      });
      this.configureToolbar();
      this.requestUpdate();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.editor.commands.clearContent(true);
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
    key: "toggleBold",
    value: function toggleBold() {
      this.editor.chain().toggleBold().focus().run();
    }
  }, {
    key: "toggleItalic",
    value: function toggleItalic() {
      this.editor.chain().toggleItalic().focus().run();
    }
  }, {
    key: "toggleUnderline",
    value: function toggleUnderline() {
      this.editor.chain().toggleUnderline().focus().run();
    }
  }, {
    key: "toggleCode",
    value: function toggleCode() {
      this.editor.chain().toggleCode().focus().run();
    }
  }, {
    key: "toggleStrike",
    value: function toggleStrike() {
      this.editor.chain().toggleStrike().focus().run();
    }
  }, {
    key: "toggleHeadingLevel1",
    value: function toggleHeadingLevel1() {
      this.editor.chain().toggleHeading({
        level: 1
      }).focus().run();
    }
  }, {
    key: "toggleHeadingLevel2",
    value: function toggleHeadingLevel2() {
      this.editor.chain().toggleHeading({
        level: 2
      }).focus().run();
    }
  }, {
    key: "toggleHeadingLevel3",
    value: function toggleHeadingLevel3() {
      this.editor.chain().toggleHeading({
        level: 3
      }).focus().run();
    }
  }, {
    key: "toggleBulletList",
    value: function toggleBulletList() {
      this.editor.chain().toggleBulletList().focus().run();
    }
  }, {
    key: "toggleOrderedList",
    value: function toggleOrderedList() {
      this.editor.chain().toggleOrderedList().focus().run();
    }
  }, {
    key: "setHorizontalRule",
    value: function setHorizontalRule() {
      this.editor.chain().setHorizontalRule().focus().run();
    }
  }, {
    key: "toggleBlockquote",
    value: function toggleBlockquote() {
      this.editor.chain().toggleBlockquote().focus().run();
    }
  }, {
    key: "toggleCodeBlock",
    value: function toggleCodeBlock() {
      this.editor.chain().toggleCodeBlock().focus().run();
    }
  }, {
    key: "toggleHighlight",
    value: function toggleHighlight() {
      this.editor.chain().toggleHighlight().focus().run();
    }
  }, {
    key: "undo",
    value: function undo() {
      this.editor.chain().focus().undo().run();
    }
  }, {
    key: "redo",
    value: function redo() {
      this.editor.chain().focus().redo().run();
    }
  }, {
    key: "toggleLink",
    value: function toggleLink() {
      if (this.editor.isActive('link')) {
        this.editor.chain().focus().unsetLink().run();
      } else {
        var _url;
        var url = window.prompt('URL');
        if (!((_url = url) !== null && _url !== void 0 && _url.startsWith('http'))) {
          url = "https://".concat(url);
        }
        this.editor.chain().focus().setLink({
          href: url
        }).run();
      }
    }
  }, {
    key: "renderToolbarButton",
    value: function renderToolbarButton(name) {
      var _this$toolbar;
      if (!this.editor || !((_this$toolbar = this.toolbar) !== null && _this$toolbar !== void 0 && _this$toolbar.length)) return '';
      var allToolbarItems = new Map(Object.entries({
        divider: (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div class=\"divider\" part=\"divider\"></div>"]))),
        'heading-1': (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('heading', {
            level: 1
          })
        }), this.toggleHeadingLevel1, _icons["default"].get('h1')),
        'heading-2': (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('heading', {
            level: 2
          })
        }), this.toggleHeadingLevel2, _icons["default"].get('h2')),
        'heading-3': (0, _lit.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('heading', {
            level: 3
          })
        }), this.toggleHeadingLevel3, _icons["default"].get('h3')),
        highlight: (0, _lit.html)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('highlight')
        }), this.toggleHighlight, _icons["default"].get('highlight')),
        'horizontal-rule': (0, _lit.html)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('horizontal-rule')
        }), this.setHorizontalRule, _icons["default"].get('horizontal-rule')),
        bold: (0, _lit.html)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('bold')
        }), this.toggleBold, _icons["default"].get('bold')),
        italic: (0, _lit.html)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('italic')
        }), this.toggleItalic, _icons["default"].get('italic')),
        underline: (0, _lit.html)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('underline')
        }), this.toggleUnderline, _icons["default"].get('underline')),
        strike: (0, _lit.html)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('strike')
        }), this.toggleStrike, _icons["default"].get('strike')),
        'code': (0, _lit.html)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('code')
        }), this.toggleCode, _icons["default"].get('code')),
        bulletlist: (0, _lit.html)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('bulletList')
        }), this.toggleBulletList, _icons["default"].get('bullet-list')),
        orderedlist: (0, _lit.html)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('orderedlist')
        }), this.toggleOrderedList, _icons["default"].get('ordered-list')),
        blockquote: (0, _lit.html)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('blockquote')
        }), this.toggleBlockquote, _icons["default"].get('blockquote')),
        'code-block': (0, _lit.html)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('codeBlock')
        }), this.toggleCodeBlock, _icons["default"].get('code-block')),
        link: (0, _lit.html)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button ", "\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), (0, _classMap.classMap)({
          'is-active': this.editor.isActive('link')
        }), this.toggleLink, _icons["default"].get('link')),
        undo: (0, _lit.html)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), this.undo, _icons["default"].get('undo')),
        redo: (0, _lit.html)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), this.redo, _icons["default"].get('redo')),
        emoji: (0, _lit.html)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["<button\n          id=\"emoji-picker-button\"\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), this.toggleEmojiPicker, _icons["default"].get('emoji')),
        attachment: (0, _lit.html)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["<button\n          type=\"button\"\n          part=\"toolbar-button\"\n          class=\"toolbar-button\"\n          @click=\"", "\"\n        >\n          ", "\n        </button>"])), this.addFile, _icons["default"].get('attachment'))
      }));
      return allToolbarItems.get(name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      return (0, _lit.html)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n        <div class=\"wrapper\" part=\"wrapper\">\n          <div class=\"toolbar\" part=\"toolbar\">\n            <slot name=\"toolbar-start\"></slot>\n            ", "\n            <slot name=\"toolbar-end\"></slot>\n            <slot></slot>\n          </div>\n          <slot name=\"editor\"></slot>\n        </div>\n      </div>\n    "])), (0, _map.map)(this.toolbar, function (name) {
        return _this3.renderToolbarButton(name);
      }));
    }
  }], [{
    key: "styles",
    get: function get() {
      return [_normalize.normalize, _tiptapStyles.tiptapStyles, _richerTextEditorStyles.richerTextEditorStyles];
    }
  }, {
    key: "properties",
    get: function get() {
      return {
        callouts: {
          type: String,
          reflect: true
        },
        content: {
          type: String,
          reflect: true
        },
        placeholder: {
          type: String,
          reflect: true
        },
        readonly: {
          type: Boolean,
          reflect: true
        },
        serializer: {
          type: String,
          reflect: true
        },
        tables: {
          type: String,
          reflect: true
        },
        input: {
          type: String,
          reflect: true
        },
        mentionableUsersPath: {
          attribute: "mentionable-users-path",
          type: String,
          reflect: true
        },
        toolbarPlacement: {
          attribute: "toolbar-placement",
          type: String,
          reflect: true
        },
        toolbarPreset: {
          attribute: "toolbar-preset",
          type: String,
          reflect: true
        },
        customSuggestions: {
          attribute: "custom-suggestions",
          type: Array
        },
        embedsPath: {
          attribute: "embeds-path",
          type: String,
          reflect: true
        },
        toolbar: {
          type: Array,
          reflect: true,
          converter: {
            fromAttribute: function fromAttribute(value) {
              return value.split(',').map(function (s) {
                return s.trim();
              });
            },
            toAttribute: function toAttribute(value) {
              return value.join(',');
            }
          }
        }
      };
    }
  }]);
  return RicherTextEditor;
}(_lit.LitElement);
exports["default"] = RicherTextEditor;
customElements.define("richer-text-editor", RicherTextEditor);