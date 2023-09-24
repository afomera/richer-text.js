"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@tiptap/core");
var _react2 = require("@tiptap/react");
var _suggestion = _interopRequireDefault(require("@tiptap/suggestion"));
var _tippy = _interopRequireDefault(require("tippy.js"));
var _icons = require("@tabler/icons");
var _MenuList = _interopRequireDefault(require("../elements/MenuList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var commandItems = function commandItems(_ref) {
  var calloutEnabled = _ref.calloutEnabled,
    tablesEnabled = _ref.tablesEnabled;
  var commandItems = [];
  commandItems.push({
    label: "Heading 1",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconH1, null),
    command: function command(_ref2) {
      var editor = _ref2.editor,
        range = _ref2.range;
      editor.chain().focus().deleteRange(range).setHeading({
        level: 1
      }).run();
    }
  }, {
    label: "Heading 2",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconH2, null),
    command: function command(_ref3) {
      var editor = _ref3.editor,
        range = _ref3.range;
      editor.chain().focus().deleteRange(range).setHeading({
        level: 2
      }).run();
    }
  }, {
    label: "Large text",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconTextSize, null),
    command: function command(_ref4) {
      var editor = _ref4.editor,
        range = _ref4.range;
      editor.chain().focus().deleteRange(range).setFontSize("22px").run();
    }
  }, {
    label: "Normal text",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconTextSize, null),
    command: function command(_ref5) {
      var editor = _ref5.editor,
        range = _ref5.range;
      editor.chain().focus().deleteRange(range).unsetFontSize().run();
    }
  }, {
    label: "Bullet List",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconList, null),
    command: function command(_ref6) {
      var editor = _ref6.editor,
        range = _ref6.range;
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    }
  }, {
    label: "Numbered List",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconListNumbers, null),
    command: function command(_ref7) {
      var editor = _ref7.editor,
        range = _ref7.range;
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    }
  }, {
    label: "Blockquote",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconBlockquote, null),
    command: function command(_ref8) {
      var editor = _ref8.editor,
        range = _ref8.range;
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    }
  }, {
    label: "Horizontal Rule",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconSeparator, null),
    command: function command(_ref9) {
      var editor = _ref9.editor,
        range = _ref9.range;
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    }
  }, {
    label: "Code Block",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFileCode, null),
    command: function command(_ref10) {
      var editor = _ref10.editor,
        range = _ref10.range;
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    }
  });
  if (tablesEnabled !== false) {
    commandItems.push({
      label: "Table",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconTable, null),
      command: function command(_ref11) {
        var editor = _ref11.editor,
          range = _ref11.range;
        editor.chain().focus().deleteRange(range).insertTable({
          rows: 3,
          cols: 3
        }).run();
      }
    });
  }
  if (calloutEnabled !== false) {
    commandItems.push({
      label: "Callout - Gray",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFlag, {
        color: "gray"
      }),
      command: function command(_ref12) {
        var editor = _ref12.editor,
          range = _ref12.range;
        editor.chain().focus().deleteRange(range).setCallout().run();
      }
    }, {
      label: "Callout - Blue",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFlag, {
        color: "blue"
      }),
      command: function command(_ref13) {
        var editor = _ref13.editor,
          range = _ref13.range;
        editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", {
          'data-color': "blue"
        }).run();
      }
    }, {
      label: "Callout - Green",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFlag, {
        color: "green"
      }),
      command: function command(_ref14) {
        var editor = _ref14.editor,
          range = _ref14.range;
        editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", {
          'data-color': "green"
        }).run();
      }
    }, {
      label: "Callout - Yellow",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFlag, {
        color: "gold"
      }),
      command: function command(_ref15) {
        var editor = _ref15.editor,
          range = _ref15.range;
        editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", {
          'data-color': "yellow"
        }).run();
      }
    }, {
      label: "Callout - Red",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFlag, {
        color: "red"
      }),
      command: function command(_ref16) {
        var editor = _ref16.editor,
          range = _ref16.range;
        editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", {
          'data-color': "red"
        }).run();
      }
    });
  }
  return commandItems;
};
var CommandMenu = function CommandMenu(calloutEnabled, tablesEnabled) {
  return _core.Extension.create({
    name: "command-menu",
    addOptions: {
      suggestion: {
        "char": "/",
        startOfLine: false,
        items: function items(_ref17) {
          var query = _ref17.query;
          return commandItems({
            calloutEnabled: calloutEnabled,
            tablesEnabled: tablesEnabled
          }).filter(function (item) {
            return item.label.toLowerCase().startsWith(query.toLowerCase());
          });
        },
        render: function render() {
          var component;
          var popup;
          return {
            onStart: function onStart(props) {
              component = new _react2.ReactRenderer(_MenuList["default"], {
                props: props,
                editor: props.editor
              });
              if (!props.clientRect) {
                return;
              }
              popup = (0, _tippy["default"])("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: function appendTo() {
                  return document.body;
                },
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start"
              });
            },
            onUpdate: function onUpdate(props) {
              component.updateProps(props);
              if (!props.clientRect) {
                return;
              }
              popup[0].setProps({
                getReferenceClientRect: props.clientRect
              });
            },
            onKeyDown: function onKeyDown(props) {
              var _component$ref;
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }
              return (_component$ref = component.ref) === null || _component$ref === void 0 ? void 0 : _component$ref.onKeyDown(props);
            },
            onExit: function onExit() {
              popup[0].destroy();
              component.destroy();
            }
          };
        },
        command: function command(_ref18) {
          var editor = _ref18.editor,
            range = _ref18.range,
            props = _ref18.props;
          props.command({
            editor: editor,
            range: range,
            props: props
          });
        }
      }
    },
    addProseMirrorPlugins: function addProseMirrorPlugins() {
      return [(0, _suggestion["default"])(_objectSpread({
        editor: this.editor
      }, this.options.suggestion))];
    }
  });
};
var _default = CommandMenu;
exports["default"] = _default;