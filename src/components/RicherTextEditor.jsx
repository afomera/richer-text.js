import React from "react";
import * as ReactDOM from "react-dom/client"
import PropTypes from "prop-types"

import { EditorContent, useEditor } from "@tiptap/react";
import { RicherTextKit } from "./editor/extensions/RicherTextKit";

import MenuBar from "./editor/MenuBar";
import BubbleMenu from "./editor/menus/BubbleMenu";
import TableBubbleMenu from "./editor/menus/TableBubbleMenu";

const RicherTextEditor = ({
  content,
  placeholder,
  callouts,
  showMenuBar,
  bubbleMenuOptions,
  tables,
  input
}) => {
  const editorRef = React.useRef(null);

  bubbleMenuOptions = JSON.parse(bubbleMenuOptions);

  const editor = useEditor({
    extensions: [
      RicherTextKit.configure({
        placeholder: placeholder,
        callout: callouts !== "false",
        tables: tables !== "false",
      }),
    ],
    content: content,
    editorProps: {
      input: input,
    }
  });

  return (
    <div className="editor" ref={editorRef}>
      {showMenuBar == "true" && <MenuBar editor={editor} />}

      <BubbleMenu editor={editor} bubbleMenuOptions={bubbleMenuOptions} />
      <TableBubbleMenu editor={editor} />
      <div className="editor--content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

RicherTextEditor.defaultProps = {
  content: "",
  placeholder: "Write something...",
  callouts: "false",
  showMenuBar: "true",
  bubbleMenuOptions: "{ \"highlight\": false }",
  tables: "false",
  input: ""
}

RicherTextEditor.propTypes = {
  content: PropTypes.string,
  placeholder: PropTypes.string,
  callouts: PropTypes.string,
  showMenuBar: PropTypes.string,
  bubbleMenuOptions: PropTypes.string,
  tables: PropTypes.string,
  input: PropTypes.string
}

import reactToWebcomponent from "react-to-webcomponent";

const WebRicherTextEditor = reactToWebcomponent(RicherTextEditor, React, ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);

export default RicherTextEditor;
