"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _MenuBarButton = _interopRequireDefault(require("../elements/MenuBarButton"));
var _icons = require("@tabler/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(_ref) {
  var editor = _ref.editor;
  if (!editor) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--menu-bar"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--menu-bar-left"
  }, /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleBold().run();
    },
    disabled: !editor.can().chain().focus().toggleBold().run(),
    active: editor.isActive('bold'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconBold, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleItalic().run();
    },
    disabled: !editor.can().chain().focus().toggleItalic().run(),
    active: editor.isActive('italic'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconItalic, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleStrike().run();
    },
    disabled: !editor.can().chain().focus().toggleStrike().run(),
    active: editor.isActive('strike'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconStrikethrough, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleCode().run();
    },
    disabled: !editor.can().chain().focus().toggleCode().run(),
    active: editor.isActive('code'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconCode, null)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--menu-bar-seperator"
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleHeading({
        level: 1
      }).run();
    },
    disabled: !editor.can().chain().focus().toggleHeading({
      level: 1
    }).run(),
    active: editor.isActive('heading', {
      level: 1
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconH1, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleHeading({
        level: 2
      }).run();
    },
    disabled: !editor.can().chain().focus().toggleHeading({
      level: 2
    }).run(),
    active: editor.isActive('heading', {
      level: 2
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconH2, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleBulletList().run();
    },
    disabled: !editor.can().chain().focus().toggleBulletList().run(),
    active: editor.isActive('bulletList'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconList, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleOrderedList().run();
    },
    disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    active: editor.isActive('orderedList'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconListNumbers, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleCodeBlock().run();
    },
    disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
    active: editor.isActive('codeBlock'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconFileCode, null),
    hideOnMobile: true
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().toggleBlockquote().run();
    },
    disabled: !editor.can().chain().focus().toggleBlockquote().run(),
    active: editor.isActive('blockquote'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconBlockquote, null)
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().setHorizontalRule().run();
    },
    disabled: !editor.can().chain().focus().setHorizontalRule().run(),
    active: editor.isActive('horizontalRule'),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconSeparator, null),
    hideOnMobile: true
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "editor--menu-bar-right"
  }, /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().undo().run();
    },
    disabled: !editor.can().chain().focus().undo().run(),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconArrowBackUp, null),
    hideOnMobile: true
  }), /*#__PURE__*/_react["default"].createElement(_MenuBarButton["default"], {
    action: function action() {
      return editor.chain().focus().redo().run();
    },
    disabled: !editor.can().chain().focus().redo().run(),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.IconArrowForwardUp, null),
    hideOnMobile: true
  })));
};
exports["default"] = _default;