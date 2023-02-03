import React from 'react';
import { IconHighlight, IconHighlightOff } from '@tabler/icons';

import BubbleMenuButton from '../elements/BubbleMenuButton';

const HighlighterMenu = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="editor--bubble-menu-highlighter-menu">
      {editor.isActive('highlight') &&
        <BubbleMenuButton
          command={() => editor.chain().focus().unsetHighlight().run()}
          active={false} /* always false */
          icon={<IconHighlightOff />}
        />}

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-one)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-one)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-one)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-two)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-two)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-two)'} />}
      />

      <BubbleMenuButton
        command={() => editor.chain().focus().toggleHighlight({ color: 'var(--editor-highlight-color-three)' }).run()}
        active={editor.isActive('highlight', { color: 'var(--editor-highlight-color-three)' })}
        icon={<IconHighlight color={'var(--editor-highlight-color-three)'} />}
      />
    </div>
  )
}

export default HighlighterMenu;
