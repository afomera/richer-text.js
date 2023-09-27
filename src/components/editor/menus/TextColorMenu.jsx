import React from 'react';
import { IconTextColor } from '@tabler/icons';

import BubbleMenuButton from '../elements/BubbleMenuButton';

const TextColorMenu = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="richer-text-editor--bubble-menu-highlighter-menu">
      {editor.isActive('highlight') &&
        <BubbleMenuButton
          command={() => editor.chain().focus().unsetHighlight().run()}
          active={false} /* always false */
          tooltip={"Remove Color"}
          icon={<IconTextColor />}
        />}

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--rte-highlight-color-one)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--rte-highlight-color-one)' })}
        text={<IconTextColor color={'var(--rte-highlight-color-one)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--rte-highlight-color-two)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--rte-highlight-color-two)' })}
        icon={<IconTextColor color={'var(--rte-highlight-color-two)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--rte-highlight-color-three)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--rte-highlight-color-three)' })}
        icon={<IconTextColor color={'var(--rte-highlight-color-three)'} />}
      />
    </div>
  )
}

export default TextColorMenu;
