import React from "react";

const BubbleMenuButton = ({ command, active, icon }) => {
  const handleClick = (event) => {
    event.preventDefault()
    command()
  }

  return (
    <button
      onClick={handleClick}
      className={active ? 'is-active' : ''}
    >
      {icon}
    </button>
  )
}

export default BubbleMenuButton;
