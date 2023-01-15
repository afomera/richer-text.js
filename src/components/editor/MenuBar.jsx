import React from "react";

import { IconBold, IconItalic, IconStrikethrough, IconCode, IconFileCode, IconH1, IconH2,
  IconList, IconListNumbers, IconBlockquote, IconSeparator, IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons';

const MenuBarButton = ({ action, disabled, active, icon, hideOnMobile }) => {
  const handleClick = (event) => {
    event.preventDefault()
    action()
  }

  let classes = []
  if (hideOnMobile) {
    classes.push('editor--hide-on-mobile')
  }
  classes.push(active ? 'is-active' : '')

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={classes.join(' ')}
    >
      {icon}
    </button>
  )
}

export default ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="editor--menu-bar">
      <div className="editor--menu-bar-left">
        <MenuBarButton
          action={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={<IconBold />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={<IconItalic />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={<IconStrikethrough />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          icon={<IconCode />}
        />

        <div className="editor--menu-bar-seperator"></div>

        <MenuBarButton
          action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          icon={<IconH1 />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          icon={<IconH2 />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          icon={<IconList />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          icon={<IconListNumbers />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          icon={<IconFileCode />}
          hideOnMobile={true}
        />

        <MenuBarButton
          action={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          icon={<IconBlockquote />}
        />

        <MenuBarButton
          action={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
          active={editor.isActive('horizontalRule')}
          icon={<IconSeparator />}
          hideOnMobile={true}
        />
      </div>

      <div className="editor--menu-bar-right">
        <MenuBarButton
          action={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          icon={<IconArrowBackUp />}
          hideOnMobile={true}
        />
        <MenuBarButton
          action={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          icon={<IconArrowForwardUp />}
          hideOnMobile={true}
        />
      </div>
    </div>
  )
}
