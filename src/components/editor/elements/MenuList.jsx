import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  const items = props.items;

  return (
    <div className="editor--menu-list-dropdown">
      <div className="editor--menu-list-dropdown-group">
        {items.length ? (
          items.map((item, index) => (
            <button
              className={`editor--menu-list-item ${index === selectedIndex ? "is-active" : ""}`}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.icon}
              {item.label}
            </button>
          ))
        ) : (
          <button className="editor--menu-list-item" disabled>
            No results
          </button>
        )}
      </div>
    </div>
  );
});
