import { mergeAttributes, Node } from '@tiptap/core'
import React, { useEffect, useState } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DirectUpload } from "@rails/activestorage";
import Tippy from "@tippyjs/react/headless"
import BubbleMenuButton from "../elements/BubbleMenuButton";
import { IconSquare } from '@tabler/icons-react';

const EditImageMenu = ({ editor, node }) => {
  const attrs = node.attrs;

  return (
    <div className="richer-text-editor--edit-menu">
      <BubbleMenuButton
        command={() => editor.chain().focus().setImageWidth("25%").run()}
        active={attrs.width === "25%"}
        icon={<IconSquare width={12} height={12} />}
      />
      <BubbleMenuButton
        command={() => editor.chain().focus().setImageWidth("50%").run()}
        active={attrs.width === "50%"}
        icon={<IconSquare width={16} height={16} />}
      />
      <BubbleMenuButton
        command={() => editor.chain().focus().setImageWidth("100%").run()}
        active={attrs.width === "100%"}
        icon={<IconSquare width={20} height={20} />}
      />
    </div>
  );
}

const ImageNode = ({ editor, node }) => {
  const { attrs } = node;
  const { src, alt, width } = attrs;
  const [editMenuVisible, setEditMenuVisible] = useState(false);

  useEffect(() => {
    setEditMenuVisible(editor.isActive("image"));
  }, [editor.isActive("image")]);

  return (
    <NodeViewWrapper>
      {src && (
        <Tippy
          render={() => (
            <EditImageMenu
              editor={editor}
              node={node}
            />
          )}
          interactive={true}
          visible={editMenuVisible}
          onClickOutside={() => setEditMenuVisible(false)}
          onHide={() => setEditMenuVisible(false)}
          offset={[0, -16]}
        >
          <img src={src} alt={alt} width={width} data-drag-handle />
        </Tippy>
      )}
      {!src && <div>Uploading...</div>}
    </NodeViewWrapper>
  );
}

const uploadFile = (file, editor, setSignedId) => {
  const url = "/rails/active_storage/direct_uploads";
  const upload = new DirectUpload(file, url);

  upload.create((error, blob) => {
    if (error) {
      console.log(error);
    } else {
      setSignedId(editor, blob.signed_id);
    }
  });

  return upload;
}

export default Node.create({
  name: 'image',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      signedId: {
        default: null,
      },
      width: {
        default: "100%",
        parseHTML: (element) =>
          element.style.width.includes("%") ? element.style.width : "100%",
      }
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  parseHTML() {
    return [{ tag: "img" }];
  },

  addStorage() {
    return {
      uploads: [],
    };
  },

  addCommands() {
    return {
      attachImage: ({ signedId, fileName}) => ({ commands }) => {
        const url = `/rails/active_storage/blobs/redirect/${signedId}/${fileName}`;

        return commands.insertContent({ type: this.name, attrs: { src: url, alt: fileName, signedId: signedId }})
      },
      setImageWidth: (width) => ({ commands }) => {
        return commands.updateAttributes(this.name, { width });
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey('image'),
        props: {
          handlePaste: (_, event) => {
            event.preventDefault();

            const images = Array.from(event.clipboardData.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              const setSignedId = (editor, signedId) => {
                editor.commands.attachImage({ signedId, fileName: image.name });
              }

              uploadFile(image, editor, setSignedId);
            });
          },
          handleDrop: (_, event) => {
            event.preventDefault();

            const images = Array.from(event.dataTransfer.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              const setSignedId = (editor, signedId) => {
                editor.commands.attachImage({ signedId, fileName: image.name });
              }

              uploadFile(image, editor, setSignedId);
            });
          },
        },
      }),
    ];
  },
});
