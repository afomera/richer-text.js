import React, { useState } from "react";
import { BubbleMenu } from '@tiptap/react'

import { IconBold, IconItalic, IconStrikethrough, IconLink, IconAlignLeft, IconAlignCenter, IconAlignRight, IconHighlight, IconTextColor } from '@tabler/icons-react';
import LinkBubbleMenu from "./LinkBubbleMenu";
import HighlighterMenu from "./HighlighterMenu";
import TextColorMenu from "./TextColorMenu";
import BubbleMenuButton from "../elements/BubbleMenuButton";
import Tippy from "@tippyjs/react/headless";

export default ({ editor, bubbleMenuOptions }) => {
  if (!editor) return null

  const [editingLink, setEditingLink] = useState(false)
  const [showHighlighter, setShowHighlighter] = useState(false)
  const [showTextColor, setShowTextColor] = useState(false)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 0, placement: "bottom", onHide: () => { setEditingLink(false); setShowHighlighter(false) } }}
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

      {bubbleMenuOptions.textColor ? (
        <Tippy
          render={() => (
            <>
              <div className="richer-text-editor--edit-menu">
                <TextColorMenu editor={editor} />
              </div>
            </>
          )}
          interactive={true}
          visible={showTextColor}
          onClickOutside={() => setShowTextColor(false)}
          onHide={() => setShowTextColor(false)}
        >
          <button
            onClick={(e) => { e.preventDefault(); setShowTextColor(!showTextColor)}}
          >
            <IconTextColor />
          </button>
        </Tippy>) : null}

      {bubbleMenuOptions.highlight ? (
        <Tippy
          render={() => (
            <>
              <div className="richer-text-editor--edit-menu">
                <HighlighterMenu editor={editor} />
              </div>
            </>
          )}
          interactive={true}
          visible={showHighlighter}
          onClickOutside={() => setShowHighlighter(false)}
          onHide={() => setShowHighlighter(false)}
        >
          <button
            onClick={(e) => { e.preventDefault(); setShowHighlighter(!showHighlighter)}}
          >
            <IconHighlight />
          </button>
        </Tippy>) : null}

      </div>) : (
        <LinkBubbleMenu editor={editor} onClose={() => setEditingLink(false)} />
      )}
    </BubbleMenu>
  )
}
