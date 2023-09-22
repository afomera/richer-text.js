import React from "react";
import * as ReactDOM from "react-dom/client"
import PropTypes from "prop-types"

import { EditorContent, useEditor } from "@tiptap/react";
import { RicherTextKit } from "./editor/extensions/RicherTextKit";

import Mention from "./editor/extensions/Mention";
import MentionSuggestion from "./editor/suggestions/MentionSuggestion";

import MenuBar from "./editor/MenuBar";
import BubbleMenu from "./editor/menus/BubbleMenu";
import TableBubbleMenu from "./editor/menus/TableBubbleMenu";

const RicherTextEditor = (props) => {
  let {
    content,
    placeholder,
    callouts,
    showMenuBar,
    bubbleMenuOptions,
    tables,
    input,
    serializer,
    emoji,
    mentionableUsersPath
  } = props;
  const editorRef = React.useRef(null);

  bubbleMenuOptions = JSON.parse(bubbleMenuOptions);

  let extensions = [
    RicherTextKit.configure({
      placeholder: placeholder,
      callout: callouts !== "false",
      tables: tables !== "false",
      emoji: emoji !== "false",
    }),
  ];

  if (mentionableUsersPath.length > 0) {
    extensions.push(
      Mention.configure({
        HTMLAttributes: { class: "richer-text--mention" },
        suggestion: MentionSuggestion(mentionableUsersPath),
      })
    );
  }

  const editor = useEditor({
    extensions: [...extensions],
    content: serializer === "json" ? JSON.parse(content) : content,
    editorProps: {
      input: input,
      serializer: serializer
    }
  });

  return (
    <div className="richer-text-editor" ref={editorRef}>
      {showMenuBar == "true" && <MenuBar editor={editor} />}

      <BubbleMenu editor={editor} bubbleMenuOptions={bubbleMenuOptions} />
      <TableBubbleMenu editor={editor} />
      <div className="richer-text-editor--content">
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
  input: "",
  serializer: "html",
  emoji: "true",
  mentionableUsersPath: ""
}

RicherTextEditor.propTypes = {
  content: PropTypes.string,
  placeholder: PropTypes.string,
  callouts: PropTypes.string,
  showMenuBar: PropTypes.string,
  bubbleMenuOptions: PropTypes.string,
  tables: PropTypes.string,
  input: PropTypes.string,
  serializer: PropTypes.string,
  emoji: PropTypes.string,
  mentionableUsersPath: PropTypes.string
}

import reactToWebcomponent from "react-to-webcomponent";

const WebRicherTextEditor = reactToWebcomponent(RicherTextEditor, React, ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);

export default RicherTextEditor;
