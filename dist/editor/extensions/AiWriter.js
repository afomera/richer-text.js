"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AiWriter = void 0;
var _core = require("@tiptap/core");
var _uuid = require("uuid");
var _lit = require("lit");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var AiWriter = _core.Node.create({
  name: 'aiWriter',
  group: 'block',
  draggable: false,
  addOptions: function addOptions() {
    return {
      HTMLAttributes: {
        "class": "node-".concat(this.name)
      }
    };
  },
  addAttributes: function addAttributes() {
    return {
      id: {
        "default": undefined,
        parseHTML: function parseHTML(element) {
          return element.getAttribute('data-id');
        },
        renderHTML: function renderHTML(attributes) {
          return {
            'data-id': attributes.id
          };
        }
      }
    };
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "div.node-".concat(this.name)
    }];
  },
  renderHTML: function renderHTML(_ref) {
    var HTMLAttributes = _ref.HTMLAttributes;
    return ['div', (0, _core.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands: function addCommands() {
    var _this = this;
    return {
      setAiWriter: function setAiWriter() {
        return function (_ref2) {
          var chain = _ref2.chain;
          return chain().focus().insertContent({
            type: _this.name,
            attrs: {
              id: (0, _uuid.v4)()
            }
          }).run();
        };
      }
    };
  },
  addNodeView: function addNodeView() {
    return function (_ref3) {
      var editor = _ref3.editor,
        node = _ref3.node,
        getPos = _ref3.getPos,
        HTMLAttributes = _ref3.HTMLAttributes,
        decorations = _ref3.decorations,
        extension = _ref3.extension;
      var from = getPos();
      var to = from + node.nodeSize;
      var template = (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div></div>"])));

      // Scratch element to render into.
      var scratch = document.createElement("div");
      (0, _lit.render)(template, scratch);
      var dom = scratch.firstElementChild;
      function removeNode() {
        console.log("Removing node");
        editor.chain().focus().deleteRange(from, to).insertContentAt({
          from: from,
          to: to
        }, "HELLO WORLD").run();
        console.log("Removing node", from, to);
        // editor.chain().focus().deleteRange(from, to).run();
        console.log('extension', extension);
        debugger;

        // // For some reason it doesnt always delete the closest AIWriter
        // const closestAiWriter  = this.closest("richer-ai-writer");
        // if (closestAiWriter) {
        //   closestAiWriter.remove();
        // }
      }

      var contentDiv = document.createElement("richer-ai-writer");
      contentDiv.removeNode = removeNode;
      contentDiv.insertContent = function (content) {
        console.log("Inserting content", content);
        editor.chain().focus().insertContent(content).run();
      };
      // contentDiv.setAttribute("embed-path", this.options.embedPath);

      dom.appendChild(contentDiv);
      return {
        dom: dom,
        update: function update() {
          return true;
        }
      };
    };
  }
});
exports.AiWriter = AiWriter;
var _default = AiWriter;
exports["default"] = _default;