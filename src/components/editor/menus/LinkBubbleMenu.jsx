import React, { useRef } from "react";
import { IconLink } from "@tabler/icons-react";

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
    <div className="richer-text-editor--bubble-menu">
      <form className="richer-text-editor--bubble-menu-form" onSubmit={onSubmit}>
        <IconLink
          style={{ marginLeft: "0.5rem" }} />
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
