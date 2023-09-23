import { mergeAttributes, Node } from '@tiptap/core'
import React, { useEffect, useState } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import Tippy from "@tippyjs/react/headless"
import BubbleMenuButton from "../elements/BubbleMenuButton";
import { IconTrash } from '@tabler/icons-react';

const EditRicherTextEmbedMenu = ({ editor, node, getPos }) => {
  const attrs = node.attrs;

  return (
    <div className="richer-text-editor--edit-menu">
      <BubbleMenuButton
        command={() => editor.chain().setNodeSelection(getPos()).deleteSelection().run()}
        active={false}
        icon={<IconTrash />}
      />
    </div>
  );
}

const RicherTextEmbedNode = ({ editor, node, getPos }) => {
  const { attrs } = node;
  const { width, sgid } = attrs;
  const [editMenuVisible, setEditMenuVisible] = useState(false);

  useEffect(() => {
    setEditMenuVisible(editor.isActive("richerTextEmbed"));
  }, [editor.isActive("richerTextEmbed")]);

  return (
    <NodeViewWrapper>
      {sgid && (
        <Tippy
          render={() => (
            <EditRicherTextEmbedMenu
              editor={editor}
              node={node}
              getPos={getPos}
            />
          )}
          interactive={true}
          visible={editMenuVisible}
          onClickOutside={() => setEditMenuVisible(false)}
          onHide={() => setEditMenuVisible(false)}
          offset={[0, -16]}
        >
          <div className="richer-text-editor--embed-wrapper" style={{ width: width }}>
            {/* <iframe src={`/embeds/${signedId}`} width="100%" height="100%" frameBorder={0} data-drag-handle /> */}
            <div dangerouslySetInnerHTML={{ __html: `<div>Hello world</div>` }} />
          </div>
        </Tippy>
      )}
    </NodeViewWrapper>
  );
}

export default Node.create({
  name: 'richerTextEmbed',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      sgid: {
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
    return ["richer-text-embed", mergeAttributes(HTMLAttributes)];
  },

  parseHTML() {
    return [{ tag: "richer-text-embed" }];
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
    return ReactNodeViewRenderer(RicherTextEmbedNode);
  },
});
