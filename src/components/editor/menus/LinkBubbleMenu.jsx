import React, { useRef, useState, useEffect } from "react";
import { IconLink } from "@tabler/icons-react";
import Tippy from "@tippyjs/react/headless";

const LinkBubbleMenu = ({ editor, onClose }) => {
  if (!editor) return null

  const linkInputRef = useRef(null)
  const [patterns, setPatterns] = useState([])
  const [showEmbedBtn, setShowEmbedBtn] = useState(false)

  useEffect(() => {
    const fetchPatterns = async () => {
      const response = await fetch(`${editor.storage.richerTextEmbed.embedPath}/patterns`)
      const data = await response.json()

      setPatterns(data)
    }
    if (editor.options.editorProps.enableEmbeds == "true") {
      fetchPatterns();
    }
  }, []);


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

  const createEmbed = (url) => {
    // Make POST request to /embeds with id param that is the URL
    // If successful, set the link attributes to the response
    // If not successful, set the link attributes to the URL

    fetch(`${editor.storage.richerTextEmbed.embedPath}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: url }) })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.content) {
          editor.chain().focus().deleteSelection().insertContent(data.content).run()
        }
      })
      .catch(error => {
        console.error(error)
        setShowEmbedBtn(false);
      })
  }

  const onInput = (event) => {
    const url = event.target.value

    if (editor.options.editorProps.enableEmbeds != "true") return;

    if (url) {
      // check if url matches any of the patterns
      const pattern = patterns.find((pattern) => {
        const regex = new RegExp(pattern.source)

        return regex.test(url)
      })

      if (pattern) {
        setShowEmbedBtn(true);
      } else {
        console.log("[Richer Text] No pattern found that matches the url")
        setShowEmbedBtn(false);
      }
    }
  }

  const embedSelected = (event, url) => {
    event.preventDefault();

    createEmbed(url)
  }

  return (
    <div className="richer-text-editor--bubble-menu">
      <form className="richer-text-editor--bubble-menu-form" onSubmit={onSubmit}>
        <IconLink
          style={{ marginLeft: "0.5rem" }} />
        <input
          type="url"
          name="url"
          onInput={onInput}
          placeholder="https://www.example.com"
          defaultValue={editor.getAttributes("link").href}
          ref={linkInputRef}
        />

        {editor.options.editorProps.enableEmbeds == "true" && (
          <Tippy
          render={() => (
            <div className="richer-text-editor--edit-menu">
              <button onClick={(event) => embedSelected(event, linkInputRef.current.value)}>
                Embed instead
              </button>
            </div>
          )}
          interactive={true}
          visible={editor.options.editorProps.enableEmbeds && showEmbedBtn}
          onClickOutside={() => setShowEmbedBtn(false)}
          onHide={() => setShowEmbedBtn(false)}
        >
          <button onClick={onSubmit}>
            Done
          </button>
        </Tippy>
        )}
        {editor.options.editorProps.enableEmbeds != "true" && (
          <button onClick={onSubmit}>
            Done
          </button>
        )}
      </form>
    </div>
  )
}

export default LinkBubbleMenu;
