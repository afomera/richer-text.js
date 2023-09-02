import React, { useState } from "react";
import { BubbleMenu } from '@tiptap/react'

import { IconBold, IconItalic, IconStrikethrough, IconLink, IconAlignLeft, IconAlignCenter, IconAlignRight } from '@tabler/icons-react';
import LinkBubbleMenu from "./LinkBubbleMenu";
import HighlighterMenu from "./HighlighterMenu";
import BubbleMenuButton from "../elements/BubbleMenuButton";

export default ({ editor, bubbleMenuOptions }) => {
  if (!editor) return null

  const [editingLink, setEditingLink] = useState(false)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 0, placement: "bottom", onHide: () => setEditingLink(false) }}
      shouldShow={() => {
        return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading"));
      }}
      pluginKey={"main-bubble-menu"}
    >
      {!editingLink ? (
      <div className="richer-text-editor--bubble-menu">
        <BubbleMenuButton
          command={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={<IconBold />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={<IconItalic />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={<IconStrikethrough />}
        />

        <BubbleMenuButton
          command={() => setEditingLink(true)}
          active={editor.isActive('link')}
          icon={<IconLink />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          icon={<IconAlignLeft />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          icon={<IconAlignCenter />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          icon={<IconAlignRight />}
        />

        {bubbleMenuOptions.highlight ? (<HighlighterMenu editor={editor} />) : null}

      </div>) : (
        <LinkBubbleMenu editor={editor} onClose={() => setEditingLink(false)} />
      )}
    </BubbleMenu>
  )
}
