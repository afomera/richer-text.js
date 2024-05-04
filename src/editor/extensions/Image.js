import { html, render } from 'lit';
import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { ActiveStorageUploader } from '../ActiveStorageUploader';

export const uploadFile = (file, handleComplete) => {
  const handleProgress = () => {};
  const handleFailure = () => { console.log("Failed to upload attachment"); };

  const uploader = new ActiveStorageUploader(
    file,
    handleProgress,
    handleComplete,
    handleFailure
  )

  uploader.start()
}

//Find the placeholder in editor
function findPlaceholder(state, id) {
  let decos = placeholderPlugin.getState(state)
  let found = decos.find(null, null, spec => spec.id == id)
  return found.length ? found[0].from : null
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
      // attachImage: ({ signedId, fileName}) => ({ commands }) => {
      //   const url = `/rails/active_storage/blobs/redirect/${signedId}/${fileName}`;

      //   return commands.insertContent({ type: this.name, attrs: { src: url, alt: fileName, signedId: signedId }})
      // },
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
    const { schema }  = editor;

    return [
      placeholderPlugin,
      new Plugin({
        key: new PluginKey('image'),
        props: {
          handlePaste: (view, event) => {
            event.preventDefault();

            const images = Array.from(event.clipboardData.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              // A fresh object to act as the ID for this upload
              let id = {};

              // Replace the selection with a placeholder
              let tr = view.state.tr;
              if (!tr.selection.empty) tr.deleteSelection();

              tr.setMeta(placeholderPlugin, {add: {id, pos: tr.selection.from}, image: image});
              view.dispatch(tr)

              const onUploadComplete = (attrs, completedUpload) => {
                const payload = {
                  signedId: attrs.signedId,
                  name: completedUpload.file.name,
                  src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
                  alt: completedUpload.file.name,
                };

                view.dispatch(
                  view.state.tr.replaceWith(view.state.history$.prevRanges[0], view.state.history$.prevRanges[1], schema.nodes.image.create(payload))
                    .setMeta(placeholderPlugin, {remove: {id}})
                )
              }

              uploadFile(image, onUploadComplete);

            });
          },
          handleDrop: (view, event, _sliced, _moved) => {
            event.preventDefault();
            const images = Array.from(event.dataTransfer.files).filter((file) => {
              return file.type.startsWith('image/');
            });

            Array.from(images).forEach((image) => {
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              // A fresh object to act as the ID for this upload
              let id = {};

              // Replace the selection with a placeholder
              let tr = view.state.tr;
              if (!tr.selection.empty) tr.deleteSelection();

              tr.setMeta(placeholderPlugin, {add: {id, pos: coordinates.pos}, image: image})
              view.dispatch(tr)

              const onUploadComplete = (attrs, completedUpload) => {
                  let pos = findPlaceholder(
                    view.state,
                    id
                  );
                  if (pos == null) return;

                  const payload = {
                    signedId: attrs.signedId,
                    name: completedUpload.file.name,
                    src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
                    alt: completedUpload.file.name,
                  };

                  view.dispatch(
                    view.state.tr.replaceWith(pos, pos, schema.nodes.image.create(payload))
                      .setMeta(placeholderPlugin, {remove: {id}})
                  )
                }

                uploadFile(image, onUploadComplete)
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
        img.src = URL.createObjectURL(action.image);
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
