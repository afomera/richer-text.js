import React from "react";
import * as ReactDOM from "react-dom/client"
import PropTypes from "prop-types"

import { EditorContent, useEditor } from "@tiptap/react";
import { RicherTextKit } from "./editor/extensions/RicherTextKit";

import MenuBar from "./editor/MenuBar";
import BubbleMenu from "./editor/menus/BubbleMenu";

const RicherTextEditor = ({
  content,
  placeholder,
  callouts,
  showMenuBar,
  bubbleMenuOptions
}) => {
  const editorRef = React.useRef(null);

  bubbleMenuOptions = JSON.parse(bubbleMenuOptions);

  const editor = useEditor({
    extensions: [
      RicherTextKit.configure({
        placeholder: placeholder,
        callout: callouts !== "false",
      }),
    ],
    content: content
  });

  return (
    <div className="editor" ref={editorRef}>
      {showMenuBar == "true" && <MenuBar editor={editor} />}

      <BubbleMenu editor={editor} bubbleMenuOptions={bubbleMenuOptions} />
      <div className="editor--content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

RicherTextEditor.defaultProps = {
  content: "",
  placeholder: "Write something...",
  callouts: "true",
  showMenuBar: "true",
  bubbleMenuOptions: "{ \"highlight\": false }"
}

RicherTextEditor.propTypes = {
  content: PropTypes.string,
  placeholder: PropTypes.string,
  callouts: PropTypes.string,
  showMenuBar: PropTypes.string,
  bubbleMenuOptions: PropTypes.string
}

import reactToWebcomponent from "react-to-webcomponent";

const WebRicherTextEditor = reactToWebcomponent(RicherTextEditor, React, ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);

export default RicherTextEditor;
