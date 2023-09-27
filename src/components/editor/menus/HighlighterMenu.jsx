import React from 'react';
import { IconHighlight, IconHighlightOff } from '@tabler/icons';

import HighlightMenuButton from '../elements/HighlightMenuButton';

const HighlighterMenu = ({ editor }) => {
  if (!editor) return null

  const HIGHLIGHT_COLORS = [
  {
    name: "Default",
    color: "var(--rte-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--rte-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--rte-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--rte-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--rte-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--rte-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--rte-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--rte-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--rte-highlight-gray)",
  },
];

  return (
    <div className="richer-text-editor--bubble-menu-highlighter-menu">
        {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
          <HighlightMenuButton
            key={index}
            command={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
            active={editor.isActive('highlight', { color: color })}
            text={"A"}
            backgroundColor={color}
            tooltip={name}
          />
        ))}
    </div>
  )
}

export default HighlighterMenu;
