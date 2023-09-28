import React from "react";
import Tippy from "@tippyjs/react/headless";

const TextColorMenuButton = ({ command, active, text, color, tooltip }) => {
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
          style={{ color: color, borderRadius: "0.125rem", borderWidth: "1px", borderStyle: "solid", borderColor: "#a0a4b8", fontWeight: 500, backgroundColor: "#ffffff", paddingTop: "0.0625rem", paddingBottom: "0.0625rem", paddingLeft: "0.25rem", paddingRight: "0.25rem" }}
        >
          {active ? ("√") : (text)}
        </button>
      </Tippy>
    ) : (
      <button
        onClick={handleClick}
        className={active ? 'is-active' : ''}
      >
        {text}
      </button>
    )
  )
}

export default TextColorMenuButton;
