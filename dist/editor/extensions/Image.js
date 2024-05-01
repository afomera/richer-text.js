"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lit = require("lit");
var _core = require("@tiptap/core");
var _state = require("@tiptap/pm/state");
var _activestorage = require("@rails/activestorage");
var _view = require("@tiptap/pm/view");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var imagePreview = null;
var uploadFile = function uploadFile(file, editor) {
  return new Promise(function (resolve, reject) {
    var url = "/rails/active_storage/direct_uploads";
    var upload = new _activestorage.DirectUpload(file, url);
    upload.create(function (error, blob) {
      if (error) {
        reject(error);
      } else {
        resolve(blob);
      }
    });
  });
};
var _default = _core.Node.create({
  name: 'image',
  group: 'block',
  draggable: true,
  addAttributes: function addAttributes() {
    return {
      src: {
        "default": null
      },
      alt: {
        "default": null
      },
      signedId: {
        "default": null
      },
      width: {
        "default": "100%",
        parseHTML: function parseHTML(element) {
          return element.style.width.includes("%") ? element.style.width : "100%";
        }
      }
    };
  },
  renderHTML: function renderHTML(_ref) {
    var HTMLAttributes = _ref.HTMLAttributes;
    return ["img", (0, _core.mergeAttributes)(HTMLAttributes)];
  },
  parseHTML: function parseHTML() {
    return [{
      tag: "img"
    }];
  },
  addStorage: function addStorage() {
    return {
      uploads: []
    };
  },
  addCommands: function addCommands() {
    var _this = this;
    return {
      attachImage: function attachImage(_ref2) {
        var signedId = _ref2.signedId,
          fileName = _ref2.fileName;
        return function (_ref3) {
          var commands = _ref3.commands;
          var url = "/rails/active_storage/blobs/redirect/".concat(signedId, "/").concat(fileName);
          return commands.insertContent({
            type: _this.name,
            attrs: {
              src: url,
              alt: fileName,
              signedId: signedId
            }
          });
        };
      },
      setImageWidth: function setImageWidth(width) {
        return function (_ref4) {
          var commands = _ref4.commands;
          return commands.updateAttributes(_this.name, {
            width: width
          });
        };
      }
    };
  },
  addNodeView: function addNodeView() {
    return function (_ref5) {
      var node = _ref5.node,
        getPos = _ref5.getPos,
        editor = _ref5.editor;
      var _node$attrs = node.attrs,
        signedId = _node$attrs.signedId,
        alt = _node$attrs.alt,
        url = _node$attrs.url,
        src = _node$attrs.src,
        width = _node$attrs.width;
      var template = (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        <div style=\"width: ", "\">\n          <img src=\"", "\" alt=\"", "\" data-drag-handle />\n        </div>\n      "])), width, src, alt);

      // Scratch element to render into.
      var scratch = document.createElement("div");
      (0, _lit.render)(template, scratch);
      var dom = scratch.firstElementChild;
      var srcRevoked = false;
      return {
        dom: dom,
        update: function update(node) {
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
        }
      };
    };
  },
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    var editor = this.editor;
    return [placeholderPlugin, new _state.Plugin({
      key: new _state.PluginKey('image'),
      props: {
        handlePaste: function handlePaste(_, event) {
          event.preventDefault();
          var images = Array.from(event.clipboardData.files).filter(function (file) {
            return file.type.startsWith('image/');
          });
          Array.from(images).forEach(function (image) {
            startImageUpload(editor, image, editor.schema, uploadFile);
          });
        },
        handleDrop: function handleDrop(_, event) {
          event.preventDefault();
          var images = Array.from(event.dataTransfer.files).filter(function (file) {
            return file.type.startsWith('image/');
          });
          Array.from(images).forEach(function (image) {
            startImageUpload(editor, image, editor.schema, uploadFile);
          });
        }
      }
    })];
  }
});
exports["default"] = _default;
var placeholderPlugin = new _state.Plugin({
  state: {
    init: function init() {
      return _view.DecorationSet.empty;
    },
    apply: function apply(tr, set) {
      // Adjust decoration positions to changes made by the transaction
      set = set.map(tr.mapping, tr.doc);
      // See if the transaction adds or removes any placeholders
      var action = tr.getMeta(this);
      if (action && action.add) {
        var widget = document.createElement("div");
        var img = document.createElement('img');
        widget.classList = "image-uploading";
        img.src = imagePreview;
        widget.appendChild(img);
        var deco = _view.Decoration.widget(action.add.pos, widget, {
          id: action.add.id
        });
        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(set.find(null, null, function (spec) {
          return spec.id == action.remove.id;
        }));
      }
      return set;
    }
  },
  props: {
    decorations: function decorations(state) {
      return this.getState(state);
    }
  }
});

//Find the placeholder in editor
function findPlaceholder(state, id) {
  var decos = placeholderPlugin.getState(state);
  var found = decos.find(null, null, function (spec) {
    return spec.id == id;
  });
  return found.length ? found[0].from : null;
}
function startImageUpload(editor, file, schema, uploadFile) {
  var view = editor.view;
  imagePreview = URL.createObjectURL(file);
  // A fresh object to act as the ID for this upload
  var id = {};

  // Replace the selection with a placeholder
  var tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();
  tr.setMeta(placeholderPlugin, {
    add: {
      id: id,
      pos: tr.selection.from
    }
  });
  view.dispatch(tr);
  uploadFile(file, editor).then(function (blob) {
    var pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) return;
    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder
    var attrs = {
      src: "/rails/active_storage/blobs/redirect/" + blob.signed_id + "/" + blob.filename,
      alt: blob.filename,
      signedId: blob.signed_id
    };
    view.dispatch(view.state.tr.replaceWith(pos, pos, schema.nodes.image.create(attrs)).setMeta(placeholderPlugin, {
      remove: {
        id: id
      }
    }));
  }, function (e) {
    // On failure, just clean up the placeholder
    view.dispatch(tr.setMeta(placeholderPlugin, {
      remove: {
        id: id
      }
    }));
  });
}