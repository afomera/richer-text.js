"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AI = void 0;
var _core = require("@tiptap/core");
var AI = _core.Extension.create({
  name: "ai",
  addCommands: function addCommands() {
    return {
      fetchSummary: function fetchSummary() {
        return function (_ref) {
          var commands = _ref.commands,
            editor = _ref.editor,
            range = _ref.range;
          var selectedText = editor.getHTML().substring(editor.state.selection.from, editor.state.selection.to);
          fetch("http://localhost:3000/open_ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt: selectedText,
              mode: "continue"
            })
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            debugger;
            editor.chain().focus().insertContent(data[0]).run();
          });
        };
      }
    };
  }
});
exports.AI = AI;