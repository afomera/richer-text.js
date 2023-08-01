import React, { useState } from "react";
import { BubbleMenu } from '@tiptap/react'

import { IconColumnInsertLeft, IconColumnInsertRight, IconTableColumn, IconTableRow, IconColumnRemove, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconTableOff } from '@tabler/icons-react';
import BubbleMenuButton from "../elements/BubbleMenuButton";

export default ({ editor }) => {
  if (!editor) return null

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 0, placement: "top" }}
      shouldShow={() => {
        return editor.isActive("table");
      }}
      pluginKey={"table-bubble-menu"}
    >
      <div className="editor--bubble-menu">
        <BubbleMenuButton
          command={() => editor.chain().focus().addColumnBefore().run()}
          active={false}
          icon={<IconColumnInsertLeft />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().addColumnAfter().run()}
          active={false}
          icon={<IconColumnInsertRight />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().deleteColumn().run()}
          active={false}
          icon={<IconColumnRemove />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().addRowBefore().run()}
          active={false}
          icon={<IconRowInsertTop />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().addRowAfter().run()}
          active={false}
          icon={<IconRowInsertBottom />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().deleteRow().run()}
          active={false}
          icon={<IconRowRemove />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().toggleHeaderColumn().run()}
          active={false}
          icon={<IconTableColumn />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().toggleHeaderRow().run()}
          active={false}
          icon={<IconTableRow />}
        />

        <BubbleMenuButton
          command={() => editor.chain().focus().deleteTable().run()}
          active={false}
          icon={<IconTableOff />}
        />
      </div>
    </BubbleMenu>
  )
}
