import React from "react";
import Tippy from "@tippyjs/react/headless";

const BubbleMenuButton = ({ command, active, icon, tooltip }) => {
  const handleClick = (event) => {
    event.preventDefault()
    command()
  }

  return (
    tooltip ? (
      <Tippy
        render={(attrs) => (
          <div
          className="richer-text-tooltip"
          style={{ position: "relative" }}
          tabIndex="-1"
          {...attrs}
        >
          <div
            className="tooltip-inner"
            dangerouslySetInnerHTML={{ __html: tooltip }}
          />
        </div>
        )}
        placement="top"
        offset={[0, 10]}
      >
        <button
          onClick={handleClick}
          className={active ? 'is-active' : ''}
        >
          {icon}
        </button>
      </Tippy>
    ) : (
      <button
        onClick={handleClick}
        className={active ? 'is-active' : ''}
      >
        {icon}
      </button>
    )
  )
}

export default BubbleMenuButton;
