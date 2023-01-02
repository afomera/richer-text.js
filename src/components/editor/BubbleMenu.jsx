import React from "react";
import { BubbleMenu } from '@tiptap/react'

import { IconBold, IconItalic, IconStrikethrough, IconAlignLeft, IconAlignCenter, IconAlignRight, IconHighlight, IconHighlightOff } from '@tabler/icons';

const BubbleMenuButton = ({ command, active, icon }) => {
  const handleClick = (event) => {
    event.preventDefault()
    command()
  }

  return (
    <button
      onClick={handleClick}
      className={active ? 'is-active' : ''}
    >
      {icon}
    </button>
  )
}

const HighlighterMenu = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="editor--bubble-menu-highlighter-menu">
      {editor.isActive('highlight') &&
        <BubbleMenuButton
          command={() => editor.chain().focus().unsetHighlight().run()}
          active={false} /* always false */
          icon={<IconHighlightOff />}
        />}

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-one)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-one)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-one)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-two)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-two)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-two)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-three)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-three)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-three)'} />}
      />
    </div>
  )
}

export default ({ editor, bubbleMenuOptions }) => {
  if (!editor) return null

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 0, placement: "bottom" }}
      shouldShow={() => {
        return !editor.view.state.selection.empty && (editor.isActive("paragraph") || editor.isActive("heading"));
      }}
    >
      <div className="editor--bubble-menu">
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

        {bubbleMenuOptions.highlight ? (
          <HighlighterMenu editor={editor} />
        ) : null}

      </div>
    </BubbleMenu>
  )
}
