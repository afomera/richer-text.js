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
  const [height, setHeight] = useState('0px');
  const iFrameRef = React.useRef(null);

  useEffect(() => {
    setEditMenuVisible(editor.isActive("richerTextEmbed"));
  }, [editor.isActive("richerTextEmbed")]);

  const onLoad = () => {
    setHeight((iFrameRef.current.contentWindow.document.body.scrollHeight + 10) + 'px');
  };

  const iframeSrcPath = `${editor.storage.richerTextEmbed.embedPath}/${sgid}`;

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
          <div className="richer-text-editor--embed-wrapper" style={{ width: width }} data-drag-handle>
            <iframe sandbox="allow-same-origin allow-scripts" ref={iFrameRef} onLoad={onLoad} src={iframeSrcPath} width="100%" height={height} frameBorder={0} />
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
    };
  },

  addOptions() {
    return {
      embedPath: "/embeds",
    };
  },

  addStorage() {
    return {
      embedPath: this.options.embedPath,
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ["richer-text-embed", mergeAttributes(HTMLAttributes)];
  },

  parseHTML() {
    return [{ tag: "richer-text-embed" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RicherTextEmbedNode);
  },
});
