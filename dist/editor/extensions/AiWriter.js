"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWriter = void 0;
var _core = require("@tiptap/core");
var _lit = require("lit");
var _uuid = require("uuid");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var AiWriter = _core.Node.create({
  name: 'aiWriter',
  group: 'block',
  draggable: true,
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
      var node = _ref3.node,
        editor = _ref3.editor,
        getPos = _ref3.getPos;
      var from = getPos();
      var to = from + node.nodeSize;
      var template = (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div id=", " style=\"border: 1px solid black; padding: 10px; margin: 10px;\">\n        Richer Writer\n\n        <textarea style=\"width: 100%; height: 100px;\"></textarea>\n\n        <button @click=", ">Delete</button>\n\n        <button @click=", ">Insert 1</button>\n      </div>"])), node.attrs.id, function (event) {
        event.preventDefault();
        removeNode();
        console.log(editor.getJSON());
      }, function (event) {
        event.preventDefault();
        removeNode();
        editor.chain().focus().insertContentAt(from, {
          type: "paragraph",
          content: [{
            type: "text",
            text: "Inserted 1"
          }]
        }).run();
        console.log(editor.getJSON());
      });

      // Scratch element to render into.
      var scratch = document.createElement('div');
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
      return {
        dom: dom,
        update: function update(updatedNode) {
          console.log(updatedNode);
          console.log(node);
          if (updatedNode.attrs.id !== node.attrs.id) {
            return false;
          }
          return true;
        },
        destroy: function destroy() {
          return true;
        }
      };
    };
  }
});
exports.AiWriter = AiWriter;