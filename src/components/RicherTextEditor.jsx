import React from "react";
import * as ReactDOM from "react-dom/client"
import PropTypes from "prop-types"

import { EditorContent, useEditor } from "@tiptap/react";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from '@tiptap/extension-text-style'

import Callout from "./editor/extensions/Callout";
import CommandMenu from "./editor/extensions/CommandMenu";
import FontSize from "./editor/extensions/FontSize";
import Image from "./editor/extensions/Image";

import MenuBar from "./editor/MenuBar";
import BubbleMenu from "./editor/BubbleMenu";

const RicherTextEditor = ({
  content,
  placeholder = "Write something...",
  showMenuBar = true,
  bubbleMenuOptions = { highlight: true }
}) => {
  const editorRef = React.useRef(null);

  const onUpdate = (element, editor) => {
    // Emit a custom event with the current editor content
    const event = new CustomEvent('editor:update',{
      detail: { html: editor.getHTML(), json: editor.getJSON() },
      bubbles: true
    });

    element.dispatchEvent(event)
  }

  const editor = useEditor({
    extensions: [
      Callout,
      CommandMenu,
      Dropcursor.configure({
        color: 'var(--editor-content-focus-color)'
      }),
      Focus.configure({
        mode: "shallowest"
      }),
      FontSize,
      Highlight.configure({
        multicolor: true
      }),
      Image,
      Link.configure({
        openOnClick: false,
        protocols: ["https", "mailto"]
      }),
      Placeholder.configure({
        placeholder: placeholder
      }),
      StarterKit.configure({
        dropcursor: false,
        heading: {
          levels: [1, 2]
        }
      }),
      TextStyle,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => onUpdate(editorRef.current, editor),
  });

  return (
    <div className="editor" ref={editorRef}>
      {showMenuBar && <MenuBar editor={editor} />}

      <BubbleMenu editor={editor} bubbleMenuOptions={bubbleMenuOptions} />
      <div className="editor--content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

RicherTextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

import reactToWebcomponent from "react-to-webcomponent";

const WebRicherTextEditor = reactToWebcomponent(RicherTextEditor, React, ReactDOM);
customElements.define("richer-text-editor", WebRicherTextEditor);

export default RicherTextEditor;
