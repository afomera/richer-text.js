import { Extension } from "@tiptap/core";

export const AI = Extension.create({
  name: "ai",

  addCommands() {
    return {
      fetchSummary:
        () =>
        ({ commands, editor, range }) => {
           const selectedText = editor.getHTML().substring(editor.state.selection.from, editor.state.selection.to);

          fetch("http://localhost:3000/open_ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: selectedText, mode: "continue" }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              debugger
              editor.chain().focus().insertContent(data[0]).run();
            });
      },
    }
  }
});
