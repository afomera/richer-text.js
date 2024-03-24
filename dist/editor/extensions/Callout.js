"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _lit = require("lit");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
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
  addNodeView: function addNodeView() {
    return function (_ref2) {
      var node = _ref2.node,
        getPos = _ref2.getPos,
        editor = _ref2.editor;
      var template = (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div></div>"])));

      // Scratch element to render into.
      var scratch = document.createElement("div");
      (0, _lit.render)(template, scratch);
      var dom = scratch.firstElementChild;

      // Add select dropdown to change color
      var select = document.createElement("select");
      select.classList.add("callout-select");
      select.addEventListener("change", function (event) {
        editor.commands.setNodeSelection(getPos());
        editor.commands.updateAttributes("callout", {
          "data-color": event.target.value
        });
      });
      var colors = ["gray", "blue", "green", "red", "yellow"];
      colors.forEach(function (color) {
        var option = document.createElement('option');
        option.value = color;
        option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
        option.selected = color === node.attrs["data-color"];
        select.append(option);
      });
      dom.appendChild(select);
      var contentDiv = document.createElement("div");
      contentDiv.classList.add("callout");
      contentDiv.dataset.color = node.attrs["data-color"];
      dom.appendChild(contentDiv);
      return {
        dom: dom,
        contentDOM: contentDiv
      };
    };
  },
  addCommands: function addCommands() {
    var _this = this;
    return {
      setCallout: function setCallout() {
        return function (_ref3) {
          var commands = _ref3.commands,
            editor = _ref3.editor;
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