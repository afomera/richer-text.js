import React from 'react';

const MenuBarButton = ({ action, disabled, active, icon, hideOnMobile }) => {
  const handleClick = (event) => {
    event.preventDefault()
    action()
  }

  let classes = []
  if (hideOnMobile) {
    classes.push('richer-text-editor--hide-on-mobile')
  }
  classes.push(active ? 'is-active' : '')

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={classes.join(' ')}
    >
      {icon}
    </button>
  )
}

export default MenuBarButton;
