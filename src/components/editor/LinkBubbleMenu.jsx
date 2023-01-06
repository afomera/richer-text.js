import React, { useRef } from "react";

const LinkBubbleMenu = ({ editor, onClose }) => {
  if (!editor) return null

  const linkInputRef = useRef(null)

  const onSubmit = (event) => {
    event.preventDefault()

    const url = linkInputRef.current.value

    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }

    onClose();
  }

  return (
    <div className="editor--bubble-menu">
      <form class="editor--bubble-menu-form" onSubmit={onSubmit}>
        <input
          type="url"
          name="url"
          placeholder="https://www.example.com"
          defaultValue={editor.getAttributes("link").href}
          ref={linkInputRef}
        />

        <button onClick={onSubmit}>
          Done
        </button>
      </form>
    </div>
  )
}

export default LinkBubbleMenu;
