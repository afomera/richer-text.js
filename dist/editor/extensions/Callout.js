"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _default = _core.Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  defining: true,
  draggable: true,
  addAttributes: function addAttributes() {
    return {
      'data-color': {
        "default": "gray"
      }
    };
  },
  addOptions: function addOptions() {
    return {
      HTMLAttributes: {
        "class": "callout"
      }
    };
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "div[class=callout]"
    }];
  },
  renderHTML: function renderHTML(_ref) {
    var HTMLAttributes = _ref.HTMLAttributes;
    return ["div", (0, _core.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands: function addCommands() {
    var _this = this;
    return {
      setCallout: function setCallout() {
        return function (_ref2) {
          var commands = _ref2.commands,
            editor = _ref2.editor;
          var _editor$getAttributes = editor.getAttributes(_this.name),
            _editor$getAttributes2 = _editor$getAttributes.type,
            type = _editor$getAttributes2 === void 0 ? null : _editor$getAttributes2;
          if (type) {
            commands.lift(_this.name);
          } else {
            return commands.toggleWrap(_this.name);
          }
        };
      }
    };
  },
  addInputRules: function addInputRules() {
    return [(0, _core.wrappingInputRule)({
      find: /^\$callout\$$/,
      type: this.type,
      getAttributes: function getAttributes(match) {
        return {
          type: match[1]
        };
      }
    })];
  }
});
exports["default"] = _default;