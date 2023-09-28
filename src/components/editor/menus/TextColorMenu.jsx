import React from 'react';

import TextColorMenuButton from '../elements/TextColorMenuButton';

const TextColorMenu = ({ editor }) => {
  if (!editor) return null

  const TEXT_COLORS = [
    {
      name: "Default",
      color: "var(--rte-text-color)",
    },
    {
      name: "Purple",
      color: "#9333EA",
    },
    {
      name: "Red",
      color: "#E00000",
    },
    {
      name: "Yellow",
      color: "#EAB308",
    },
    {
      name: "Blue",
      color: "#2563EB",
    },
    {
      name: "Green",
      color: "#008A00",
    },
    {
      name: "Orange",
      color: "#FFA500",
    },
    {
      name: "Pink",
      color: "#BA4081",
    },
    {
      name: "Gray",
      color: "#A8A29E",
    },
  ];

  return (
    <div className="richer-text-editor--bubble-menu-highlighter-menu">
      {TEXT_COLORS.map(({ name, color }, index) => (
        <TextColorMenuButton
          key={index}
          command={() => {
              editor.commands.unsetColor();
              name !== "Default" &&
                editor.chain().focus().setColor((color || "")).run();
            }
          }
          active={editor.isActive("textStyle", { color })}
          text={"A"}
          color={color}
          tooltip={name}
        />
      ))}
    </div>
  )
}

export default TextColorMenu;
