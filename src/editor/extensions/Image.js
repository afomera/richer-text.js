import { html, render } from 'lit';
import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DirectUpload } from "@rails/activestorage";
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import tippy from 'tippy.js';

let imagePreview = null;

const uploadFile = (file, editor) => {
  return new Promise((resolve, reject) => {
    const url = "/rails/active_storage/direct_uploads";
    const upload = new DirectUpload(file, url);

    upload.create((error, blob) => {
      if (error) {
        reject(error);
      } else {
        resolve(blob);
      }
    });
  });
}

export default Node.create({
  name: 'image',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      signedId: {
        default: null,
      },
      width: {
        default: "100%",
        parseHTML: (element) =>
          element.style.width.includes("%") ? element.style.width : "100%",
      }
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  parseHTML() {
    return [{ tag: "img" }];
  },

  addStorage() {
    return {
      uploads: [],
    };
  },

  addCommands() {
    return {
      attachImage: ({ signedId, fileName}) => ({ commands }) => {
        const url = `/rails/active_storage/blobs/redirect/${signedId}/${fileName}`;

        return commands.insertContent({ type: this.name, attrs: { src: url, alt: fileName, signedId: signedId }})
      },
      setImageWidth: (width) => ({ commands }) => {
        return commands.updateAttributes(this.name, { width });
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { signedId, alt, url, src, width } = node.attrs;


      const template = html`
        <div style="width: ${width}">
          <img src="${src}" alt="${alt}" data-drag-handle />
        </div>
      `;

      // Scratch element to render into.
      const scratch = document.createElement("div");
      render(template, scratch);

      const dom = scratch.firstElementChild;

      let srcRevoked = false;

      return {
        dom,
        update(node) {
          if (node.type.name !== "image") return false;

          if (!srcRevoked && node.attrs.url) {
            srcRevoked = true;
            try {
              URL.revokeObjectURL(node.attrs.src);
            } catch (_e) {
              /* We don't really care if this fails. An attempt was made. 🤷‍♀️ */
            }
          }

          return false;
        },
      };
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      placeholderPlugin,
      new Plugin({
        key: new PluginKey('image'),
        props: {
          handlePaste: (_, event) => {
            event.preventDefault();

            const images = Array.from(event.clipboardData.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              startImageUpload(editor, image, editor.schema, uploadFile);
            });
          },
          handleDrop: (_, event) => {
            event.preventDefault();

            const images = Array.from(event.dataTransfer.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              startImageUpload(editor, image, editor.schema, uploadFile);
            });
          },
        },
      }),
    ];
  },
});

let placeholderPlugin = new Plugin({
  state: {
    init() { return DecorationSet.empty },
    apply(tr, set) {
          // Adjust decoration positions to changes made by the transaction
          set = set.map(tr.mapping, tr.doc)
          // See if the transaction adds or removes any placeholders
          let action = tr.getMeta(this)
          if (action && action.add) {
            let widget = document.createElement("div")
            let img = document.createElement('img');
            widget.classList = "image-uploading";
            img.src = imagePreview;
            widget.appendChild(img);
            let deco = Decoration.widget(action.add.pos, widget, {id: action.add.id})
            set = set.add(tr.doc, [deco])
          } else if (action && action.remove) {
            set = set.remove(set.find(null, null,
                                        spec => spec.id == action.remove.id))
          }
          return set
      }
    },
    props: {
      decorations(state) { return this.getState(state) }
    }
});

//Find the placeholder in editor
function findPlaceholder(state, id) {
    let decos = placeholderPlugin.getState(state)
    let found = decos.find(null, null, spec => spec.id == id)
    return found.length ? found[0].from : null
}

function startImageUpload(editor, file, schema, uploadFile) {
    const view = editor.view;
    imagePreview = URL.createObjectURL(file)
    // A fresh object to act as the ID for this upload
    let id = {}

    // Replace the selection with a placeholder
    let tr = view.state.tr
    if (!tr.selection.empty) tr.deleteSelection()
    tr.setMeta(placeholderPlugin, {add: {id, pos: tr.selection.from}})
    view.dispatch(tr)
    uploadFile(file, editor).then((blob) => {
        let pos = findPlaceholder(view.state, id)
        // If the content around the placeholder has been deleted, drop
        // the image
        if (pos == null) return
        // Otherwise, insert it at the placeholder's position, and remove
        // the placeholder
        const attrs = {src: "/rails/active_storage/blobs/redirect/" + blob.signed_id + "/" + blob.filename, alt: blob.filename, signedId: blob.signed_id}
        view.dispatch(view.state.tr
                  .replaceWith(pos, pos, schema.nodes.image.create(attrs))
                  .setMeta(placeholderPlugin, {remove: {id}}))
    }, (e) => {
        // On failure, just clean up the placeholder
        view.dispatch(tr.setMeta(placeholderPlugin, {remove: {id}}))
    })
}
