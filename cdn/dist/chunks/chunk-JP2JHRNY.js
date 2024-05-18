import {
  Decoration,
  DecorationSet,
  Node,
  mergeAttributes
} from "./chunk-NC7G5KJY.js";
import {
  ActiveStorageUploader
} from "./chunk-F4ELDX7O.js";
import {
  Plugin,
  PluginKey
} from "./chunk-ZTG2EEKL.js";
import {
  j,
  x
} from "./chunk-M27UGOWE.js";

// src/editor/extensions/Image.js
var uploadFile = (file, handleComplete) => {
  const handleProgress = () => {
  };
  const handleFailure = () => {
    console.log("Failed to upload attachment");
  };
  const uploader = new ActiveStorageUploader(
    file,
    handleProgress,
    handleComplete,
    handleFailure
  );
  uploader.start();
};
function findPlaceholder(state, id) {
  let decos = placeholderPlugin.getState(state);
  let found = decos.find(null, null, (spec) => spec.id == id);
  return found.length ? found[0].from : null;
}
var Image_default = Node.create({
  name: "image",
  group: "block",
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      signedId: {
        default: null
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.style.width.includes("%") ? element.style.width : "100%"
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
      uploads: []
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
      }
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { signedId, alt, url, src, width } = node.attrs;
      const template = x`
        <div style="width: ${width}">
          <img src="${src}" alt="${alt}" data-drag-handle />
        </div>
      `;
      const scratch = document.createElement("div");
      j(template, scratch);
      const dom = scratch.firstElementChild;
      let srcRevoked = false;
      return {
        dom,
        update(node2) {
          if (node2.type.name !== "image")
            return false;
          if (!srcRevoked && node2.attrs.url) {
            srcRevoked = true;
            try {
              URL.revokeObjectURL(node2.attrs.src);
            } catch (_e) {
            }
          }
          return false;
        }
      };
    };
  },
  addProseMirrorPlugins() {
    const { editor } = this;
    const { schema } = editor;
    return [
      placeholderPlugin,
      new Plugin({
        key: new PluginKey("image"),
        props: {
          handlePaste: (view, event) => {
            event.preventDefault();
            const images = Array.from(event.clipboardData.files).filter((file) => {
              return file.type.startsWith("image/");
            });
            Array.from(images).forEach((image) => {
              let id = {};
              let tr = view.state.tr;
              if (!tr.selection.empty)
                tr.deleteSelection();
              tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from }, image });
              view.dispatch(tr);
              const onUploadComplete = (attrs, completedUpload) => {
                const payload = {
                  signedId: attrs.signedId,
                  name: completedUpload.file.name,
                  src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
                  alt: completedUpload.file.name
                };
                view.dispatch(
                  view.state.tr.replaceWith(view.state.history$.prevRanges[0], view.state.history$.prevRanges[1], schema.nodes.image.create(payload)).setMeta(placeholderPlugin, { remove: { id } })
                );
              };
              uploadFile(image, onUploadComplete);
            });
          },
          handleDrop: (view, event, _sliced, _moved) => {
            event.preventDefault();
            const images = Array.from(event.dataTransfer.files).filter((file) => {
              return file.type.startsWith("image/");
            });
            Array.from(images).forEach((image) => {
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY
              });
              let id = {};
              let tr = view.state.tr;
              if (!tr.selection.empty)
                tr.deleteSelection();
              tr.setMeta(placeholderPlugin, { add: { id, pos: coordinates.pos }, image });
              view.dispatch(tr);
              const onUploadComplete = (attrs, completedUpload) => {
                let pos = findPlaceholder(
                  view.state,
                  id
                );
                if (pos == null)
                  return;
                const payload = {
                  signedId: attrs.signedId,
                  name: completedUpload.file.name,
                  src: `/rails/active_storage/blobs/redirect/${attrs.signedId}/${completedUpload.file.name}`,
                  alt: completedUpload.file.name
                };
                view.dispatch(
                  view.state.tr.replaceWith(pos, pos, schema.nodes.image.create(payload)).setMeta(placeholderPlugin, { remove: { id } })
                );
              };
              uploadFile(image, onUploadComplete);
            });
          }
        }
      })
    ];
  }
});
var placeholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      set = set.map(tr.mapping, tr.doc);
      let action = tr.getMeta(this);
      if (action && action.add) {
        let widget = document.createElement("div");
        let img = document.createElement("img");
        widget.classList = "image-uploading";
        img.src = URL.createObjectURL(action.image);
        widget.appendChild(img);
        let deco = Decoration.widget(action.add.pos, widget, { id: action.add.id });
        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(set.find(
          null,
          null,
          (spec) => spec.id == action.remove.id
        ));
      }
      return set;
    }
  },
  props: {
    decorations(state) {
      return this.getState(state);
    }
  }
});

export {
  uploadFile,
  Image_default
};
//# sourceMappingURL=chunk-JP2JHRNY.js.map
