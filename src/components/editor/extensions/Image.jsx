import { mergeAttributes, Node } from '@tiptap/core'
import React from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DirectUpload } from "@rails/activestorage";

const ImageNode = ({ node }) => {
  const { attrs } = node;
  const { src, alt } = attrs;

  return (
    <NodeViewWrapper>
      {src && <img src={src} alt={alt} data-drag-handle />}
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

            console.log(event.clipboardData.files);
            console.log("Whoops, pasting images is not supported yet.");
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
