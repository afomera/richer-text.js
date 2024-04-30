"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _core = require("@tiptap/core");
var _lit = require("lit");
require("../elements/RicherTextEmbed");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = _core.Node.create({
  name: 'richerTextEmbed',
  group: 'block',
  draggable: true,
  addAttributes: function addAttributes() {
    return {
      sgid: {
        "default": null
      }
    };
  },
  addOptions: function addOptions() {
    return {
      embedPath: "/embeds"
    };
  },
  addStorage: function addStorage() {
    return {
      embedPath: this.options.embedPath
    };
  },
  renderHTML: function renderHTML(_ref) {
    var HTMLAttributes = _ref.HTMLAttributes;
    return ["richer-text-embed", (0, _core.mergeAttributes)(this.options, HTMLAttributes)];
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "richer-text-embed"
    }];
  },
  addNodeView: function addNodeView() {
    var _this = this;
    return function (_ref2) {
      var node = _ref2.node,
        getPos = _ref2.getPos,
        editor = _ref2.editor;
      var template = (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div></div>"])));

      // Scratch element to render into.
      var scratch = document.createElement("div");
      (0, _lit.render)(template, scratch);
      var dom = scratch.firstElementChild;
      function removeNode() {
        if (typeof getPos === "function") {
          var view = editor.view;
          var tr = view.state.tr;
          var pos = getPos();
          tr["delete"](pos, pos + 1);
          view.dispatch(tr);
        }
      }
      var contentDiv = document.createElement("richer-text-embed");
      contentDiv.sgid = node.attrs.sgid;
      contentDiv.removeNode = removeNode;
      contentDiv.setAttribute("embed-path", _this.options.embedPath);
      dom.appendChild(contentDiv);
      return {
        dom: dom
      };
    };
  }
});
exports["default"] = _default;