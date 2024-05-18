// src/editor/extensions/CommandMenu.js
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
var commandItems = ({ calloutEnabled, tablesEnabled }) => {
  const items = [];
  items.push(
    {
      label: "Heading 1",
      iconName: "h1",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
      }
    },
    {
      label: "Heading 2",
      iconName: "h2",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
      }
    },
    {
      label: "Heading 3",
      iconName: "h3",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
      }
    },
    {
      label: "Large Text",
      iconName: "text-size",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setFontSize("22px").run();
      }
    },
    {
      label: "Normal Text",
      iconName: "text-size",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).unsetFontSize().run();
      }
    },
    {
      label: "Bullet List",
      iconName: "bullet-list",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      }
    },
    {
      label: "Numbered List",
      iconName: "ordered-list",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      }
    },
    {
      label: "Blockquote",
      iconName: "blockquote",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      }
    },
    {
      label: "Line",
      iconName: "horizontal-rule",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      }
    },
    {
      label: "Code Block",
      iconName: "code-block",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setCodeBlock().run();
      }
    }
  );
  if (calloutEnabled) {
    items.push({
      label: "Callout",
      iconName: "callout",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setCallout().run();
      }
    });
  }
  if (tablesEnabled) {
    items.push({
      label: "Table",
      iconName: "table",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3 }).run();
      }
    });
  }
  return items;
};
var CommandMenu = (calloutEnabled, tablesEnabled) => Extension.create({
  name: "command-menu",
  addOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      items: ({ query }) => {
        return commandItems({ calloutEnabled, tablesEnabled }).filter(
          (item) => item.label.toLowerCase().startsWith(query.toLowerCase())
        );
      },
      render: () => {
        let component;
        let popup;
        return {
          onStart: (props) => {
            component = document.createElement("richer-text-menu-list");
            component.items = props.items;
            component.command = props.command;
            if (!props.clientRect) {
              return;
            }
            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: component,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start"
            });
          },
          onUpdate(props) {
            component.items = props.items;
            component.command = props.command;
            if (!props.clientRect) {
              return;
            }
            popup[0].setProps({
              getReferenceClientRect: props.clientRect
            });
          },
          onKeyDown(props) {
            if (props.event.key === "Escape") {
              popup[0].hide();
              return true;
            }
            return component.onKeyDown(props);
          },
          onExit() {
            popup[0].destroy();
          }
        };
      },
      command: ({ editor, range, props }) => {
        props.command({ editor, range, props });
      }
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});
var CommandMenu_default = CommandMenu;

export {
  commandItems,
  CommandMenu_default
};
//# sourceMappingURL=chunk-FQUM6C2N.js.map
