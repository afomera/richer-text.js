import {
  EditorEvents_default
} from "./chunk-FW3ONADH.js";
import {
  CommandMenu_default
} from "./chunk-ACYX66GR.js";
import {
  CodeBlock,
  CodeBlock_default
} from "./chunk-5QRUT5TH.js";
import {
  Callout_default
} from "./chunk-VM2KLSK7.js";
import {
  Image_default
} from "./chunk-JP2JHRNY.js";
import {
  HorizontalRule,
  HorizontalRule_default
} from "./chunk-F63MPGHD.js";
import {
  FontSize_default,
  TextStyle
} from "./chunk-EJ5G7BKW.js";
import {
  Emoji_default
} from "./chunk-TRSVELRO.js";
import {
  Decoration,
  DecorationSet,
  Extension,
  Mark,
  Node,
  callOrReturn,
  combineTransactionSteps,
  findChildrenInRange,
  findParentNodeClosestToPos,
  getAttributes,
  getChangedRanges,
  getExtensionField,
  getMarkAttributes,
  getMarksBetween,
  isMacOS,
  keydownHandler,
  markInputRule,
  markPasteRule,
  mergeAttributes,
  textblockTypeInputRule,
  wrappingInputRule
} from "./chunk-NC7G5KJY.js";
import {
  Fragment,
  Mapping,
  NodeSelection,
  Plugin,
  PluginKey,
  Selection,
  SelectionRange,
  Slice,
  TextSelection,
  Transform,
  dropPoint
} from "./chunk-ZTG2EEKL.js";

// node_modules/prosemirror-dropcursor/dist/index.js
function dropCursor(options = {}) {
  return new Plugin({
    view(editorView) {
      return new DropCursorView(editorView, options);
    }
  });
}
var DropCursorView = class {
  constructor(editorView, options) {
    var _a;
    this.editorView = editorView;
    this.cursorPos = null;
    this.element = null;
    this.timeout = -1;
    this.width = (_a = options.width) !== null && _a !== void 0 ? _a : 1;
    this.color = options.color === false ? void 0 : options.color || "black";
    this.class = options.class;
    this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((name) => {
      let handler = (e) => {
        this[name](e);
      };
      editorView.dom.addEventListener(name, handler);
      return { name, handler };
    });
  }
  destroy() {
    this.handlers.forEach(({ name, handler }) => this.editorView.dom.removeEventListener(name, handler));
  }
  update(editorView, prevState) {
    if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
      if (this.cursorPos > editorView.state.doc.content.size)
        this.setCursor(null);
      else
        this.updateOverlay();
    }
  }
  setCursor(pos) {
    if (pos == this.cursorPos)
      return;
    this.cursorPos = pos;
    if (pos == null) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    } else {
      this.updateOverlay();
    }
  }
  updateOverlay() {
    let $pos = this.editorView.state.doc.resolve(this.cursorPos);
    let isBlock = !$pos.parent.inlineContent, rect;
    if (isBlock) {
      let before = $pos.nodeBefore, after = $pos.nodeAfter;
      if (before || after) {
        let node = this.editorView.nodeDOM(this.cursorPos - (before ? before.nodeSize : 0));
        if (node) {
          let nodeRect = node.getBoundingClientRect();
          let top = before ? nodeRect.bottom : nodeRect.top;
          if (before && after)
            top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
          rect = { left: nodeRect.left, right: nodeRect.right, top: top - this.width / 2, bottom: top + this.width / 2 };
        }
      }
    }
    if (!rect) {
      let coords = this.editorView.coordsAtPos(this.cursorPos);
      rect = { left: coords.left - this.width / 2, right: coords.left + this.width / 2, top: coords.top, bottom: coords.bottom };
    }
    let parent = this.editorView.dom.offsetParent;
    if (!this.element) {
      this.element = parent.appendChild(document.createElement("div"));
      if (this.class)
        this.element.className = this.class;
      this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;";
      if (this.color) {
        this.element.style.backgroundColor = this.color;
      }
    }
    this.element.classList.toggle("prosemirror-dropcursor-block", isBlock);
    this.element.classList.toggle("prosemirror-dropcursor-inline", !isBlock);
    let parentLeft, parentTop;
    if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
      parentLeft = -pageXOffset;
      parentTop = -pageYOffset;
    } else {
      let rect2 = parent.getBoundingClientRect();
      parentLeft = rect2.left - parent.scrollLeft;
      parentTop = rect2.top - parent.scrollTop;
    }
    this.element.style.left = rect.left - parentLeft + "px";
    this.element.style.top = rect.top - parentTop + "px";
    this.element.style.width = rect.right - rect.left + "px";
    this.element.style.height = rect.bottom - rect.top + "px";
  }
  scheduleRemoval(timeout) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setCursor(null), timeout);
  }
  dragover(event) {
    if (!this.editorView.editable)
      return;
    let pos = this.editorView.posAtCoords({ left: event.clientX, top: event.clientY });
    let node = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
    let disableDropCursor = node && node.type.spec.disableDropCursor;
    let disabled = typeof disableDropCursor == "function" ? disableDropCursor(this.editorView, pos, event) : disableDropCursor;
    if (pos && !disabled) {
      let target = pos.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let point = dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
        if (point != null)
          target = point;
      }
      this.setCursor(target);
      this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(event) {
    if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget))
      this.setCursor(null);
  }
};

// node_modules/@tiptap/extension-dropcursor/dist/index.js
var Dropcursor = Extension.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      dropCursor(this.options)
    ];
  }
});

// node_modules/@tiptap/extension-focus/dist/index.js
var FocusClasses = Extension.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("focus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { anchor } = selection;
            const decorations = [];
            if (!isEditable || !isFocused) {
              return DecorationSet.create(doc, []);
            }
            let maxLevels = 0;
            if (this.options.mode === "deepest") {
              doc.descendants((node, pos) => {
                if (node.isText) {
                  return;
                }
                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
                if (!isCurrent) {
                  return false;
                }
                maxLevels += 1;
              });
            }
            let currentLevel = 0;
            doc.descendants((node, pos) => {
              if (node.isText) {
                return false;
              }
              const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
              if (!isCurrent) {
                return false;
              }
              currentLevel += 1;
              const outOfScope = this.options.mode === "deepest" && maxLevels - currentLevel > 0 || this.options.mode === "shallowest" && currentLevel > 1;
              if (outOfScope) {
                return this.options.mode === "deepest";
              }
              decorations.push(Decoration.node(pos, pos + node.nodeSize, {
                class: this.options.className
              }));
            });
            return DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});

// node_modules/@tiptap/extension-highlight/dist/index.js
var inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;
var pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;
var Highlight = Mark.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }
    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }
          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["mark", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setHighlight: (attributes) => ({ commands }) => {
        return commands.setMark(this.name, attributes);
      },
      toggleHighlight: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      unsetHighlight: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type
      })
    ];
  }
});

// node_modules/linkifyjs/dist/linkify.es.js
var encodedTlds = "aaa1rp3barth4b0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0faromeo7ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re2s2c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y0eats7k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking0channel11l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t0isalat7u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0at2delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d0network8tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntdoor4ier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5gtv3iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0eles2s3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1nder2le4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster5ia3d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4de2k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0cys3drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7serati6ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic3tual5v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rthwesternmutual14on4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3ssagens7y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cher3ks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w0time7i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ffany5ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0channel7ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5m\xF6gensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lkswagen7vo3te1ing3o2yage5u0elos6wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2";
var encodedUtlds = "\u03B5\u03BB1\u03C52\u0431\u04331\u0435\u043B3\u0434\u0435\u0442\u04384\u0435\u044E2\u043A\u0430\u0442\u043E\u043B\u0438\u043A6\u043E\u043C3\u043C\u043A\u04342\u043E\u043D1\u0441\u043A\u0432\u04306\u043E\u043D\u043B\u0430\u0439\u043D5\u0440\u04333\u0440\u0443\u04412\u04442\u0441\u0430\u0439\u04423\u0440\u04313\u0443\u043A\u04403\u049B\u0430\u04373\u0570\u0561\u05753\u05D9\u05E9\u05E8\u05D0\u05DC5\u05E7\u05D5\u05DD3\u0627\u0628\u0648\u0638\u0628\u064A5\u062A\u0635\u0627\u0644\u0627\u062A6\u0631\u0627\u0645\u0643\u06485\u0644\u0627\u0631\u062F\u06464\u0628\u062D\u0631\u064A\u06465\u062C\u0632\u0627\u0626\u06315\u0633\u0639\u0648\u062F\u064A\u06296\u0639\u0644\u064A\u0627\u06465\u0645\u063A\u0631\u06285\u0645\u0627\u0631\u0627\u062A5\u06CC\u0631\u0627\u06465\u0628\u0627\u0631\u062A2\u0632\u0627\u06314\u064A\u062A\u06433\u06BE\u0627\u0631\u062A5\u062A\u0648\u0646\u06334\u0633\u0648\u062F\u0627\u06463\u0631\u064A\u06295\u0634\u0628\u0643\u06294\u0639\u0631\u0627\u06422\u06282\u0645\u0627\u06464\u0641\u0644\u0633\u0637\u064A\u06466\u0642\u0637\u06313\u0643\u0627\u062B\u0648\u0644\u064A\u06436\u0648\u06453\u0645\u0635\u06312\u0644\u064A\u0633\u064A\u06275\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u06277\u0642\u06394\u0647\u0645\u0631\u0627\u06475\u067E\u0627\u06A9\u0633\u062A\u0627\u06467\u0680\u0627\u0631\u062A4\u0915\u0949\u092E3\u0928\u0947\u091F3\u092D\u093E\u0930\u09240\u092E\u094D3\u094B\u09245\u0938\u0902\u0917\u0920\u09285\u09AC\u09BE\u0982\u09B2\u09BE5\u09AD\u09BE\u09B0\u09A42\u09F0\u09A44\u0A2D\u0A3E\u0A30\u0A244\u0AAD\u0ABE\u0AB0\u0AA44\u0B2D\u0B3E\u0B30\u0B244\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE6\u0BB2\u0B99\u0BCD\u0B95\u0BC86\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD11\u0C2D\u0C3E\u0C30\u0C24\u0C4D5\u0CAD\u0CBE\u0CB0\u0CA44\u0D2D\u0D3E\u0D30\u0D24\u0D025\u0DBD\u0D82\u0D9A\u0DCF4\u0E04\u0E2D\u0E213\u0E44\u0E17\u0E223\u0EA5\u0EB2\u0EA73\u10D2\u10D42\u307F\u3093\u306A3\u30A2\u30DE\u30BE\u30F34\u30AF\u30E9\u30A6\u30C94\u30B0\u30FC\u30B0\u30EB4\u30B3\u30E02\u30B9\u30C8\u30A23\u30BB\u30FC\u30EB3\u30D5\u30A1\u30C3\u30B7\u30E7\u30F36\u30DD\u30A4\u30F3\u30C84\u4E16\u754C2\u4E2D\u4FE11\u56FD1\u570B1\u6587\u7F513\u4E9A\u9A6C\u900A3\u4F01\u4E1A2\u4F5B\u5C712\u4FE1\u606F2\u5065\u5EB72\u516B\u53662\u516C\u53F81\u76CA2\u53F0\u6E7E1\u70632\u5546\u57CE1\u5E971\u68072\u5609\u91CC0\u5927\u9152\u5E975\u5728\u7EBF2\u5927\u62FF2\u5929\u4E3B\u65593\u5A31\u4E502\u5BB6\u96FB2\u5E7F\u4E1C2\u5FAE\u535A2\u6148\u55842\u6211\u7231\u4F603\u624B\u673A2\u62DB\u80582\u653F\u52A11\u5E9C2\u65B0\u52A0\u57612\u95FB2\u65F6\u5C1A2\u66F8\u7C4D2\u673A\u67842\u6DE1\u9A6C\u95213\u6E38\u620F2\u6FB3\u95802\u70B9\u770B2\u79FB\u52A82\u7EC4\u7EC7\u673A\u67844\u7F51\u57401\u5E971\u7AD91\u7EDC2\u8054\u901A2\u8C37\u6B4C2\u8D2D\u72692\u901A\u8CA92\u96C6\u56E22\u96FB\u8A0A\u76C8\u79D14\u98DE\u5229\u6D663\u98DF\u54C12\u9910\u53852\u9999\u683C\u91CC\u62C93\u6E2F2\uB2F7\uB1371\uCEF42\uC0BC\uC1312\uD55C\uAD6D2";
var assign = (target, properties) => {
  for (const key in properties) {
    target[key] = properties[key];
  }
  return target;
};
var numeric = "numeric";
var ascii = "ascii";
var alpha = "alpha";
var asciinumeric = "asciinumeric";
var alphanumeric = "alphanumeric";
var domain = "domain";
var emoji = "emoji";
var scheme = "scheme";
var slashscheme = "slashscheme";
var whitespace = "whitespace";
function registerGroup(name, groups) {
  if (!(name in groups)) {
    groups[name] = [];
  }
  return groups[name];
}
function addToGroups(t, flags, groups) {
  if (flags[numeric]) {
    flags[asciinumeric] = true;
    flags[alphanumeric] = true;
  }
  if (flags[ascii]) {
    flags[asciinumeric] = true;
    flags[alpha] = true;
  }
  if (flags[asciinumeric]) {
    flags[alphanumeric] = true;
  }
  if (flags[alpha]) {
    flags[alphanumeric] = true;
  }
  if (flags[alphanumeric]) {
    flags[domain] = true;
  }
  if (flags[emoji]) {
    flags[domain] = true;
  }
  for (const k in flags) {
    const group = registerGroup(k, groups);
    if (group.indexOf(t) < 0) {
      group.push(t);
    }
  }
}
function flagsForToken(t, groups) {
  const result = {};
  for (const c in groups) {
    if (groups[c].indexOf(t) >= 0) {
      result[c] = true;
    }
  }
  return result;
}
function State(token) {
  if (token === void 0) {
    token = null;
  }
  this.j = {};
  this.jr = [];
  this.jd = null;
  this.t = token;
}
State.groups = {};
State.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(input) {
    const state = this;
    const nextState = state.j[input];
    if (nextState) {
      return nextState;
    }
    for (let i = 0; i < state.jr.length; i++) {
      const regex = state.jr[i][0];
      const nextState2 = state.jr[i][1];
      if (nextState2 && regex.test(input)) {
        return nextState2;
      }
    }
    return state.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(input, exactOnly) {
    if (exactOnly === void 0) {
      exactOnly = false;
    }
    return exactOnly ? input in this.j : !!this.go(input);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(inputs, next, flags, groups) {
    for (let i = 0; i < inputs.length; i++) {
      this.tt(inputs[i], next, flags, groups);
    }
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(regexp, next, flags, groups) {
    groups = groups || State.groups;
    let nextState;
    if (next && next.j) {
      nextState = next;
    } else {
      nextState = new State(next);
      if (flags && groups) {
        addToGroups(next, flags, groups);
      }
    }
    this.jr.push([regexp, nextState]);
    return nextState;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(input, next, flags, groups) {
    let state = this;
    const len = input.length;
    if (!len) {
      return state;
    }
    for (let i = 0; i < len - 1; i++) {
      state = state.tt(input[i]);
    }
    return state.tt(input[len - 1], next, flags, groups);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(input, next, flags, groups) {
    groups = groups || State.groups;
    const state = this;
    if (next && next.j) {
      state.j[input] = next;
      return next;
    }
    const t = next;
    let nextState, templateState = state.go(input);
    if (templateState) {
      nextState = new State();
      assign(nextState.j, templateState.j);
      nextState.jr.push.apply(nextState.jr, templateState.jr);
      nextState.jd = templateState.jd;
      nextState.t = templateState.t;
    } else {
      nextState = new State();
    }
    if (t) {
      if (groups) {
        if (nextState.t && typeof nextState.t === "string") {
          const allFlags = assign(flagsForToken(nextState.t, groups), flags);
          addToGroups(t, allFlags, groups);
        } else if (flags) {
          addToGroups(t, flags, groups);
        }
      }
      nextState.t = t;
    }
    state.j[input] = nextState;
    return nextState;
  }
};
var ta = (state, input, next, flags, groups) => state.ta(input, next, flags, groups);
var tr = (state, regexp, next, flags, groups) => state.tr(regexp, next, flags, groups);
var ts = (state, input, next, flags, groups) => state.ts(input, next, flags, groups);
var tt = (state, input, next, flags, groups) => state.tt(input, next, flags, groups);
var WORD = "WORD";
var UWORD = "UWORD";
var LOCALHOST = "LOCALHOST";
var TLD = "TLD";
var UTLD = "UTLD";
var SCHEME = "SCHEME";
var SLASH_SCHEME = "SLASH_SCHEME";
var NUM = "NUM";
var WS = "WS";
var NL$1 = "NL";
var OPENBRACE = "OPENBRACE";
var OPENBRACKET = "OPENBRACKET";
var OPENANGLEBRACKET = "OPENANGLEBRACKET";
var OPENPAREN = "OPENPAREN";
var CLOSEBRACE = "CLOSEBRACE";
var CLOSEBRACKET = "CLOSEBRACKET";
var CLOSEANGLEBRACKET = "CLOSEANGLEBRACKET";
var CLOSEPAREN = "CLOSEPAREN";
var AMPERSAND = "AMPERSAND";
var APOSTROPHE = "APOSTROPHE";
var ASTERISK = "ASTERISK";
var AT = "AT";
var BACKSLASH = "BACKSLASH";
var BACKTICK = "BACKTICK";
var CARET = "CARET";
var COLON = "COLON";
var COMMA = "COMMA";
var DOLLAR = "DOLLAR";
var DOT = "DOT";
var EQUALS = "EQUALS";
var EXCLAMATION = "EXCLAMATION";
var HYPHEN = "HYPHEN";
var PERCENT = "PERCENT";
var PIPE = "PIPE";
var PLUS = "PLUS";
var POUND = "POUND";
var QUERY = "QUERY";
var QUOTE = "QUOTE";
var SEMI = "SEMI";
var SLASH = "SLASH";
var TILDE = "TILDE";
var UNDERSCORE = "UNDERSCORE";
var EMOJI$1 = "EMOJI";
var SYM = "SYM";
var tk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD,
  UWORD,
  LOCALHOST,
  TLD,
  UTLD,
  SCHEME,
  SLASH_SCHEME,
  NUM,
  WS,
  NL: NL$1,
  OPENBRACE,
  OPENBRACKET,
  OPENANGLEBRACKET,
  OPENPAREN,
  CLOSEBRACE,
  CLOSEBRACKET,
  CLOSEANGLEBRACKET,
  CLOSEPAREN,
  AMPERSAND,
  APOSTROPHE,
  ASTERISK,
  AT,
  BACKSLASH,
  BACKTICK,
  CARET,
  COLON,
  COMMA,
  DOLLAR,
  DOT,
  EQUALS,
  EXCLAMATION,
  HYPHEN,
  PERCENT,
  PIPE,
  PLUS,
  POUND,
  QUERY,
  QUOTE,
  SEMI,
  SLASH,
  TILDE,
  UNDERSCORE,
  EMOJI: EMOJI$1,
  SYM
});
var ASCII_LETTER = /[a-z]/;
var LETTER = /\p{L}/u;
var EMOJI = /\p{Emoji}/u;
var DIGIT = /\d/;
var SPACE = /\s/;
var NL = "\n";
var EMOJI_VARIATION = "\uFE0F";
var EMOJI_JOINER = "\u200D";
var tlds = null;
var utlds = null;
function init$2(customSchemes) {
  if (customSchemes === void 0) {
    customSchemes = [];
  }
  const groups = {};
  State.groups = groups;
  const Start = new State();
  if (tlds == null) {
    tlds = decodeTlds(encodedTlds);
  }
  if (utlds == null) {
    utlds = decodeTlds(encodedUtlds);
  }
  tt(Start, "'", APOSTROPHE);
  tt(Start, "{", OPENBRACE);
  tt(Start, "[", OPENBRACKET);
  tt(Start, "<", OPENANGLEBRACKET);
  tt(Start, "(", OPENPAREN);
  tt(Start, "}", CLOSEBRACE);
  tt(Start, "]", CLOSEBRACKET);
  tt(Start, ">", CLOSEANGLEBRACKET);
  tt(Start, ")", CLOSEPAREN);
  tt(Start, "&", AMPERSAND);
  tt(Start, "*", ASTERISK);
  tt(Start, "@", AT);
  tt(Start, "`", BACKTICK);
  tt(Start, "^", CARET);
  tt(Start, ":", COLON);
  tt(Start, ",", COMMA);
  tt(Start, "$", DOLLAR);
  tt(Start, ".", DOT);
  tt(Start, "=", EQUALS);
  tt(Start, "!", EXCLAMATION);
  tt(Start, "-", HYPHEN);
  tt(Start, "%", PERCENT);
  tt(Start, "|", PIPE);
  tt(Start, "+", PLUS);
  tt(Start, "#", POUND);
  tt(Start, "?", QUERY);
  tt(Start, '"', QUOTE);
  tt(Start, "/", SLASH);
  tt(Start, ";", SEMI);
  tt(Start, "~", TILDE);
  tt(Start, "_", UNDERSCORE);
  tt(Start, "\\", BACKSLASH);
  const Num = tr(Start, DIGIT, NUM, {
    [numeric]: true
  });
  tr(Num, DIGIT, Num);
  const Word = tr(Start, ASCII_LETTER, WORD, {
    [ascii]: true
  });
  tr(Word, ASCII_LETTER, Word);
  const UWord = tr(Start, LETTER, UWORD, {
    [alpha]: true
  });
  tr(UWord, ASCII_LETTER);
  tr(UWord, LETTER, UWord);
  const Ws = tr(Start, SPACE, WS, {
    [whitespace]: true
  });
  tt(Start, NL, NL$1, {
    [whitespace]: true
  });
  tt(Ws, NL);
  tr(Ws, SPACE, Ws);
  const Emoji = tr(Start, EMOJI, EMOJI$1, {
    [emoji]: true
  });
  tr(Emoji, EMOJI, Emoji);
  tt(Emoji, EMOJI_VARIATION, Emoji);
  const EmojiJoiner = tt(Emoji, EMOJI_JOINER);
  tr(EmojiJoiner, EMOJI, Emoji);
  const wordjr = [[ASCII_LETTER, Word]];
  const uwordjr = [[ASCII_LETTER, null], [LETTER, UWord]];
  for (let i = 0; i < tlds.length; i++) {
    fastts(Start, tlds[i], TLD, WORD, wordjr);
  }
  for (let i = 0; i < utlds.length; i++) {
    fastts(Start, utlds[i], UTLD, UWORD, uwordjr);
  }
  addToGroups(TLD, {
    tld: true,
    ascii: true
  }, groups);
  addToGroups(UTLD, {
    utld: true,
    alpha: true
  }, groups);
  fastts(Start, "file", SCHEME, WORD, wordjr);
  fastts(Start, "mailto", SCHEME, WORD, wordjr);
  fastts(Start, "http", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "https", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "ftp", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "ftps", SLASH_SCHEME, WORD, wordjr);
  addToGroups(SCHEME, {
    scheme: true,
    ascii: true
  }, groups);
  addToGroups(SLASH_SCHEME, {
    slashscheme: true,
    ascii: true
  }, groups);
  customSchemes = customSchemes.sort((a, b) => a[0] > b[0] ? 1 : -1);
  for (let i = 0; i < customSchemes.length; i++) {
    const sch = customSchemes[i][0];
    const optionalSlashSlash = customSchemes[i][1];
    const flags = optionalSlashSlash ? {
      [scheme]: true
    } : {
      [slashscheme]: true
    };
    if (sch.indexOf("-") >= 0) {
      flags[domain] = true;
    } else if (!ASCII_LETTER.test(sch)) {
      flags[numeric] = true;
    } else if (DIGIT.test(sch)) {
      flags[asciinumeric] = true;
    } else {
      flags[ascii] = true;
    }
    ts(Start, sch, sch, flags);
  }
  ts(Start, "localhost", LOCALHOST, {
    ascii: true
  });
  Start.jd = new State(SYM);
  return {
    start: Start,
    tokens: assign({
      groups
    }, tk)
  };
}
function run$1(start, str) {
  const iterable = stringToArray(str.replace(/[A-Z]/g, (c) => c.toLowerCase()));
  const charCount = iterable.length;
  const tokens = [];
  let cursor = 0;
  let charCursor = 0;
  while (charCursor < charCount) {
    let state = start;
    let nextState = null;
    let tokenLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    let charsSinceAccepts = -1;
    while (charCursor < charCount && (nextState = state.go(iterable[charCursor]))) {
      state = nextState;
      if (state.accepts()) {
        sinceAccepts = 0;
        charsSinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts += iterable[charCursor].length;
        charsSinceAccepts++;
      }
      tokenLength += iterable[charCursor].length;
      cursor += iterable[charCursor].length;
      charCursor++;
    }
    cursor -= sinceAccepts;
    charCursor -= charsSinceAccepts;
    tokenLength -= sinceAccepts;
    tokens.push({
      t: latestAccepting.t,
      // token type/name
      v: str.slice(cursor - tokenLength, cursor),
      // string value
      s: cursor - tokenLength,
      // start index
      e: cursor
      // end index (excluding)
    });
  }
  return tokens;
}
function stringToArray(str) {
  const result = [];
  const len = str.length;
  let index = 0;
  while (index < len) {
    let first = str.charCodeAt(index);
    let second;
    let char = first < 55296 || first > 56319 || index + 1 === len || (second = str.charCodeAt(index + 1)) < 56320 || second > 57343 ? str[index] : str.slice(index, index + 2);
    result.push(char);
    index += char.length;
  }
  return result;
}
function fastts(state, input, t, defaultt, jr) {
  let next;
  const len = input.length;
  for (let i = 0; i < len - 1; i++) {
    const char = input[i];
    if (state.j[char]) {
      next = state.j[char];
    } else {
      next = new State(defaultt);
      next.jr = jr.slice();
      state.j[char] = next;
    }
    state = next;
  }
  next = new State(t);
  next.jr = jr.slice();
  state.j[input[len - 1]] = next;
  return next;
}
function decodeTlds(encoded) {
  const words = [];
  const stack = [];
  let i = 0;
  let digits = "0123456789";
  while (i < encoded.length) {
    let popDigitCount = 0;
    while (digits.indexOf(encoded[i + popDigitCount]) >= 0) {
      popDigitCount++;
    }
    if (popDigitCount > 0) {
      words.push(stack.join(""));
      for (let popCount = parseInt(encoded.substring(i, i + popDigitCount), 10); popCount > 0; popCount--) {
        stack.pop();
      }
      i += popDigitCount;
    } else {
      stack.push(encoded[i]);
      i++;
    }
  }
  return words;
}
var defaults = {
  defaultProtocol: "http",
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: "a",
  target: null,
  rel: null,
  validate: true,
  truncate: Infinity,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Options(opts, defaultRender) {
  if (defaultRender === void 0) {
    defaultRender = null;
  }
  let o = assign({}, defaults);
  if (opts) {
    o = assign(o, opts instanceof Options ? opts.o : opts);
  }
  const ignoredTags = o.ignoreTags;
  const uppercaseIgnoredTags = [];
  for (let i = 0; i < ignoredTags.length; i++) {
    uppercaseIgnoredTags.push(ignoredTags[i].toUpperCase());
  }
  this.o = o;
  if (defaultRender) {
    this.defaultRender = defaultRender;
  }
  this.ignoreTags = uppercaseIgnoredTags;
}
Options.prototype = {
  o: defaults,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(ir) {
    return ir;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(token) {
    return this.get("validate", token.toString(), token);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(key, operator, token) {
    const isCallable = operator != null;
    let option = this.o[key];
    if (!option) {
      return option;
    }
    if (typeof option === "object") {
      option = token.t in option ? option[token.t] : defaults[key];
      if (typeof option === "function" && isCallable) {
        option = option(operator, token);
      }
    } else if (typeof option === "function" && isCallable) {
      option = option(operator, token.t, token);
    }
    return option;
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(key, operator, token) {
    let obj = this.o[key];
    if (typeof obj === "function" && operator != null) {
      obj = obj(operator, token.t, token);
    }
    return obj;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(token) {
    const ir = token.render(this);
    const renderFn = this.get("render", null, token) || this.defaultRender;
    return renderFn(ir, token.t, token);
  }
};
function noop(val) {
  return val;
}
function MultiToken(value, tokens) {
  this.t = "token";
  this.v = value;
  this.tk = tokens;
}
MultiToken.prototype = {
  isLink: false,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(scheme2) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(options) {
    const val = this.toString();
    const truncate = options.get("truncate", val, this);
    const formatted = options.get("format", val, this);
    return truncate && formatted.length > truncate ? formatted.substring(0, truncate) + "\u2026" : formatted;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(options) {
    return options.get("formatHref", this.toHref(options.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(protocol) {
    if (protocol === void 0) {
      protocol = defaults.defaultProtocol;
    }
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(protocol),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(options) {
    return {
      type: this.t,
      value: this.toFormattedString(options),
      isLink: this.isLink,
      href: this.toFormattedHref(options),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(options) {
    return options.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(options) {
    const token = this;
    const href = this.toHref(options.get("defaultProtocol"));
    const formattedHref = options.get("formatHref", href, this);
    const tagName = options.get("tagName", href, token);
    const content = this.toFormattedString(options);
    const attributes = {};
    const className = options.get("className", href, token);
    const target = options.get("target", href, token);
    const rel = options.get("rel", href, token);
    const attrs = options.getObj("attributes", href, token);
    const eventListeners = options.getObj("events", href, token);
    attributes.href = formattedHref;
    if (className) {
      attributes.class = className;
    }
    if (target) {
      attributes.target = target;
    }
    if (rel) {
      attributes.rel = rel;
    }
    if (attrs) {
      assign(attributes, attrs);
    }
    return {
      tagName,
      attributes,
      content,
      eventListeners
    };
  }
};
function createTokenClass(type, props) {
  class Token extends MultiToken {
    constructor(value, tokens) {
      super(value, tokens);
      this.t = type;
    }
  }
  for (const p in props) {
    Token.prototype[p] = props[p];
  }
  Token.t = type;
  return Token;
}
var Email = createTokenClass("email", {
  isLink: true,
  toHref() {
    return "mailto:" + this.toString();
  }
});
var Text = createTokenClass("text");
var Nl = createTokenClass("nl");
var Url = createTokenClass("url", {
  isLink: true,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(scheme2) {
    if (scheme2 === void 0) {
      scheme2 = defaults.defaultProtocol;
    }
    return this.hasProtocol() ? this.v : `${scheme2}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const tokens = this.tk;
    return tokens.length >= 2 && tokens[0].t !== LOCALHOST && tokens[1].t === COLON;
  }
});
var makeState = (arg) => new State(arg);
function init$1(_ref) {
  let {
    groups
  } = _ref;
  const qsAccepting = groups.domain.concat([AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, NUM, PERCENT, PIPE, PLUS, POUND, SLASH, SYM, TILDE, UNDERSCORE]);
  const qsNonAccepting = [APOSTROPHE, CLOSEANGLEBRACKET, CLOSEBRACE, CLOSEBRACKET, CLOSEPAREN, COLON, COMMA, DOT, EXCLAMATION, OPENANGLEBRACKET, OPENBRACE, OPENBRACKET, OPENPAREN, QUERY, QUOTE, SEMI];
  const localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, CLOSEBRACE, DOLLAR, EQUALS, HYPHEN, OPENBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, UNDERSCORE];
  const Start = makeState();
  const Localpart = tt(Start, TILDE);
  ta(Localpart, localpartAccepting, Localpart);
  ta(Localpart, groups.domain, Localpart);
  const Domain = makeState(), Scheme = makeState(), SlashScheme = makeState();
  ta(Start, groups.domain, Domain);
  ta(Start, groups.scheme, Scheme);
  ta(Start, groups.slashscheme, SlashScheme);
  ta(Domain, localpartAccepting, Localpart);
  ta(Domain, groups.domain, Domain);
  const LocalpartAt = tt(Domain, AT);
  tt(Localpart, AT, LocalpartAt);
  tt(Scheme, AT, LocalpartAt);
  tt(SlashScheme, AT, LocalpartAt);
  const LocalpartDot = tt(Localpart, DOT);
  ta(LocalpartDot, localpartAccepting, Localpart);
  ta(LocalpartDot, groups.domain, Localpart);
  const EmailDomain = makeState();
  ta(LocalpartAt, groups.domain, EmailDomain);
  ta(EmailDomain, groups.domain, EmailDomain);
  const EmailDomainDot = tt(EmailDomain, DOT);
  ta(EmailDomainDot, groups.domain, EmailDomain);
  const Email$1 = makeState(Email);
  ta(EmailDomainDot, groups.tld, Email$1);
  ta(EmailDomainDot, groups.utld, Email$1);
  tt(LocalpartAt, LOCALHOST, Email$1);
  const EmailDomainHyphen = tt(EmailDomain, HYPHEN);
  ta(EmailDomainHyphen, groups.domain, EmailDomain);
  ta(Email$1, groups.domain, EmailDomain);
  tt(Email$1, DOT, EmailDomainDot);
  tt(Email$1, HYPHEN, EmailDomainHyphen);
  const EmailColon = tt(Email$1, COLON);
  ta(EmailColon, groups.numeric, Email);
  const DomainHyphen = tt(Domain, HYPHEN);
  const DomainDot = tt(Domain, DOT);
  ta(DomainHyphen, groups.domain, Domain);
  ta(DomainDot, localpartAccepting, Localpart);
  ta(DomainDot, groups.domain, Domain);
  const DomainDotTld = makeState(Url);
  ta(DomainDot, groups.tld, DomainDotTld);
  ta(DomainDot, groups.utld, DomainDotTld);
  ta(DomainDotTld, groups.domain, Domain);
  ta(DomainDotTld, localpartAccepting, Localpart);
  tt(DomainDotTld, DOT, DomainDot);
  tt(DomainDotTld, HYPHEN, DomainHyphen);
  tt(DomainDotTld, AT, LocalpartAt);
  const DomainDotTldColon = tt(DomainDotTld, COLON);
  const DomainDotTldColonPort = makeState(Url);
  ta(DomainDotTldColon, groups.numeric, DomainDotTldColonPort);
  const Url$1 = makeState(Url);
  const UrlNonaccept = makeState();
  ta(Url$1, qsAccepting, Url$1);
  ta(Url$1, qsNonAccepting, UrlNonaccept);
  ta(UrlNonaccept, qsAccepting, Url$1);
  ta(UrlNonaccept, qsNonAccepting, UrlNonaccept);
  tt(DomainDotTld, SLASH, Url$1);
  tt(DomainDotTldColonPort, SLASH, Url$1);
  const SchemeColon = tt(Scheme, COLON);
  const SlashSchemeColon = tt(SlashScheme, COLON);
  const SlashSchemeColonSlash = tt(SlashSchemeColon, SLASH);
  const UriPrefix = tt(SlashSchemeColonSlash, SLASH);
  ta(Scheme, groups.domain, Domain);
  tt(Scheme, DOT, DomainDot);
  tt(Scheme, HYPHEN, DomainHyphen);
  ta(SlashScheme, groups.domain, Domain);
  tt(SlashScheme, DOT, DomainDot);
  tt(SlashScheme, HYPHEN, DomainHyphen);
  ta(SchemeColon, groups.domain, Url$1);
  tt(SchemeColon, SLASH, Url$1);
  ta(UriPrefix, groups.domain, Url$1);
  ta(UriPrefix, qsAccepting, Url$1);
  tt(UriPrefix, SLASH, Url$1);
  const UrlOpenbrace = tt(Url$1, OPENBRACE);
  const UrlOpenbracket = tt(Url$1, OPENBRACKET);
  const UrlOpenanglebracket = tt(Url$1, OPENANGLEBRACKET);
  const UrlOpenparen = tt(Url$1, OPENPAREN);
  tt(UrlNonaccept, OPENBRACE, UrlOpenbrace);
  tt(UrlNonaccept, OPENBRACKET, UrlOpenbracket);
  tt(UrlNonaccept, OPENANGLEBRACKET, UrlOpenanglebracket);
  tt(UrlNonaccept, OPENPAREN, UrlOpenparen);
  tt(UrlOpenbrace, CLOSEBRACE, Url$1);
  tt(UrlOpenbracket, CLOSEBRACKET, Url$1);
  tt(UrlOpenanglebracket, CLOSEANGLEBRACKET, Url$1);
  tt(UrlOpenparen, CLOSEPAREN, Url$1);
  tt(UrlOpenbrace, CLOSEBRACE, Url$1);
  const UrlOpenbraceQ = makeState(Url);
  const UrlOpenbracketQ = makeState(Url);
  const UrlOpenanglebracketQ = makeState(Url);
  const UrlOpenparenQ = makeState(Url);
  ta(UrlOpenbrace, qsAccepting, UrlOpenbraceQ);
  ta(UrlOpenbracket, qsAccepting, UrlOpenbracketQ);
  ta(UrlOpenanglebracket, qsAccepting, UrlOpenanglebracketQ);
  ta(UrlOpenparen, qsAccepting, UrlOpenparenQ);
  const UrlOpenbraceSyms = makeState();
  const UrlOpenbracketSyms = makeState();
  const UrlOpenanglebracketSyms = makeState();
  const UrlOpenparenSyms = makeState();
  ta(UrlOpenbrace, qsNonAccepting);
  ta(UrlOpenbracket, qsNonAccepting);
  ta(UrlOpenanglebracket, qsNonAccepting);
  ta(UrlOpenparen, qsNonAccepting);
  ta(UrlOpenbraceQ, qsAccepting, UrlOpenbraceQ);
  ta(UrlOpenbracketQ, qsAccepting, UrlOpenbracketQ);
  ta(UrlOpenanglebracketQ, qsAccepting, UrlOpenanglebracketQ);
  ta(UrlOpenparenQ, qsAccepting, UrlOpenparenQ);
  ta(UrlOpenbraceQ, qsNonAccepting, UrlOpenbraceQ);
  ta(UrlOpenbracketQ, qsNonAccepting, UrlOpenbracketQ);
  ta(UrlOpenanglebracketQ, qsNonAccepting, UrlOpenanglebracketQ);
  ta(UrlOpenparenQ, qsNonAccepting, UrlOpenparenQ);
  ta(UrlOpenbraceSyms, qsAccepting, UrlOpenbraceSyms);
  ta(UrlOpenbracketSyms, qsAccepting, UrlOpenbracketQ);
  ta(UrlOpenanglebracketSyms, qsAccepting, UrlOpenanglebracketQ);
  ta(UrlOpenparenSyms, qsAccepting, UrlOpenparenQ);
  ta(UrlOpenbraceSyms, qsNonAccepting, UrlOpenbraceSyms);
  ta(UrlOpenbracketSyms, qsNonAccepting, UrlOpenbracketSyms);
  ta(UrlOpenanglebracketSyms, qsNonAccepting, UrlOpenanglebracketSyms);
  ta(UrlOpenparenSyms, qsNonAccepting, UrlOpenparenSyms);
  tt(UrlOpenbracketQ, CLOSEBRACKET, Url$1);
  tt(UrlOpenanglebracketQ, CLOSEANGLEBRACKET, Url$1);
  tt(UrlOpenparenQ, CLOSEPAREN, Url$1);
  tt(UrlOpenbraceQ, CLOSEBRACE, Url$1);
  tt(UrlOpenbracketSyms, CLOSEBRACKET, Url$1);
  tt(UrlOpenanglebracketSyms, CLOSEANGLEBRACKET, Url$1);
  tt(UrlOpenparenSyms, CLOSEPAREN, Url$1);
  tt(UrlOpenbraceSyms, CLOSEPAREN, Url$1);
  tt(Start, LOCALHOST, DomainDotTld);
  tt(Start, NL$1, Nl);
  return {
    start: Start,
    tokens: tk
  };
}
function run(start, input, tokens) {
  let len = tokens.length;
  let cursor = 0;
  let multis = [];
  let textTokens = [];
  while (cursor < len) {
    let state = start;
    let secondState = null;
    let nextState = null;
    let multiLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    while (cursor < len && !(secondState = state.go(tokens[cursor].t))) {
      textTokens.push(tokens[cursor++]);
    }
    while (cursor < len && (nextState = secondState || state.go(tokens[cursor].t))) {
      secondState = null;
      state = nextState;
      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }
      cursor++;
      multiLength++;
    }
    if (sinceAccepts < 0) {
      cursor -= multiLength;
      if (cursor < len) {
        textTokens.push(tokens[cursor]);
        cursor++;
      }
    } else {
      if (textTokens.length > 0) {
        multis.push(initMultiToken(Text, input, textTokens));
        textTokens = [];
      }
      cursor -= sinceAccepts;
      multiLength -= sinceAccepts;
      const Multi = latestAccepting.t;
      const subtokens = tokens.slice(cursor - multiLength, cursor);
      multis.push(initMultiToken(Multi, input, subtokens));
    }
  }
  if (textTokens.length > 0) {
    multis.push(initMultiToken(Text, input, textTokens));
  }
  return multis;
}
function initMultiToken(Multi, input, tokens) {
  const startIdx = tokens[0].s;
  const endIdx = tokens[tokens.length - 1].e;
  const value = input.slice(startIdx, endIdx);
  return new Multi(value, tokens);
}
var warn = typeof console !== "undefined" && console && console.warn || (() => {
});
var warnAdvice = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.";
var INIT = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: false
};
function reset() {
  State.groups = {};
  INIT.scanner = null;
  INIT.parser = null;
  INIT.tokenQueue = [];
  INIT.pluginQueue = [];
  INIT.customSchemes = [];
  INIT.initialized = false;
}
function registerCustomProtocol(scheme2, optionalSlashSlash) {
  if (optionalSlashSlash === void 0) {
    optionalSlashSlash = false;
  }
  if (INIT.initialized) {
    warn(`linkifyjs: already initialized - will not register custom scheme "${scheme2}" ${warnAdvice}`);
  }
  if (!/^[0-9a-z]+(-[0-9a-z]+)*$/.test(scheme2)) {
    throw new Error('linkifyjs: incorrect scheme format.\n 1. Must only contain digits, lowercase ASCII letters or "-"\n 2. Cannot start or end with "-"\n 3. "-" cannot repeat');
  }
  INIT.customSchemes.push([scheme2, optionalSlashSlash]);
}
function init() {
  INIT.scanner = init$2(INIT.customSchemes);
  for (let i = 0; i < INIT.tokenQueue.length; i++) {
    INIT.tokenQueue[i][1]({
      scanner: INIT.scanner
    });
  }
  INIT.parser = init$1(INIT.scanner.tokens);
  for (let i = 0; i < INIT.pluginQueue.length; i++) {
    INIT.pluginQueue[i][1]({
      scanner: INIT.scanner,
      parser: INIT.parser
    });
  }
  INIT.initialized = true;
}
function tokenize(str) {
  if (!INIT.initialized) {
    init();
  }
  return run(INIT.parser.start, str, run$1(INIT.scanner.start, str));
}
function find(str, type, opts) {
  if (type === void 0) {
    type = null;
  }
  if (opts === void 0) {
    opts = null;
  }
  if (type && typeof type === "object") {
    if (opts) {
      throw Error(`linkifyjs: Invalid link type ${type}; must be a string`);
    }
    opts = type;
    type = null;
  }
  const options = new Options(opts);
  const tokens = tokenize(str);
  const filtered = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isLink && (!type || token.t === type)) {
      filtered.push(token.toFormattedObject(options));
    }
  }
  return filtered;
}

// node_modules/@tiptap/extension-link/dist/index.js
function isValidLinkStructure(tokens) {
  if (tokens.length === 1) {
    return tokens[0].isLink;
  }
  if (tokens.length === 3 && tokens[1].isLink) {
    return ["()", "[]"].includes(tokens[0].value + tokens[2].value);
  }
  return false;
}
function autolink(options) {
  return new Plugin({
    key: new PluginKey("autolink"),
    appendTransaction: (transactions, oldState, newState) => {
      const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
      const preventAutolink = transactions.some((transaction) => transaction.getMeta("preventAutolink"));
      if (!docChanges || preventAutolink) {
        return;
      }
      const { tr: tr2 } = newState;
      const transform = combineTransactionSteps(oldState.doc, [...transactions]);
      const changes = getChangedRanges(transform);
      changes.forEach(({ newRange }) => {
        const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);
        let textBlock;
        let textBeforeWhitespace;
        if (nodesInChangedRanges.length > 1) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, textBlock.pos + textBlock.node.nodeSize, void 0, " ");
        } else if (nodesInChangedRanges.length && newState.doc.textBetween(newRange.from, newRange.to, " ", " ").endsWith(" ")) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, void 0, " ");
        }
        if (textBlock && textBeforeWhitespace) {
          const wordsBeforeWhitespace = textBeforeWhitespace.split(" ").filter((s) => s !== "");
          if (wordsBeforeWhitespace.length <= 0) {
            return false;
          }
          const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
          const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
          if (!lastWordBeforeSpace) {
            return false;
          }
          const linksBeforeSpace = tokenize(lastWordBeforeSpace).map((t) => t.toObject());
          if (!isValidLinkStructure(linksBeforeSpace)) {
            return false;
          }
          linksBeforeSpace.filter((link) => link.isLink).map((link) => ({
            ...link,
            from: lastWordAndBlockOffset + link.start + 1,
            to: lastWordAndBlockOffset + link.end + 1
          })).filter((link) => {
            if (!newState.schema.marks.code) {
              return true;
            }
            return !newState.doc.rangeHasMark(link.from, link.to, newState.schema.marks.code);
          }).filter((link) => {
            if (options.validate) {
              return options.validate(link.value);
            }
            return true;
          }).forEach((link) => {
            if (getMarksBetween(link.from, link.to, newState.doc).some((item) => item.mark.type === options.type)) {
              return;
            }
            tr2.addMark(link.from, link.to, options.type.create({
              href: link.href
            }));
          });
        }
      });
      if (!tr2.steps.length) {
        return;
      }
      return tr2;
    }
  });
}
function clickHandler(options) {
  return new Plugin({
    key: new PluginKey("handleClickLink"),
    props: {
      handleClick: (view, pos, event) => {
        var _a, _b;
        if (options.whenNotEditable && view.editable) {
          return false;
        }
        if (event.button !== 0) {
          return false;
        }
        let a = event.target;
        const els = [];
        while (a.nodeName !== "DIV") {
          els.push(a);
          a = a.parentNode;
        }
        if (!els.find((value) => value.nodeName === "A")) {
          return false;
        }
        const attrs = getAttributes(view.state, options.type.name);
        const link = event.target;
        const href = (_a = link === null || link === void 0 ? void 0 : link.href) !== null && _a !== void 0 ? _a : attrs.href;
        const target = (_b = link === null || link === void 0 ? void 0 : link.target) !== null && _b !== void 0 ? _b : attrs.target;
        if (link && href) {
          window.open(href, target);
          return true;
        }
        return false;
      }
    }
  });
}
function pasteHandler(options) {
  return new Plugin({
    key: new PluginKey("handlePasteLink"),
    props: {
      handlePaste: (view, event, slice2) => {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (empty) {
          return false;
        }
        let textContent = "";
        slice2.content.forEach((node) => {
          textContent += node.textContent;
        });
        const link = find(textContent).find((item) => item.isLink && item.value === textContent);
        if (!textContent || !link) {
          return false;
        }
        options.editor.commands.setMark(options.type, {
          href: link.href
        });
        return true;
      }
    }
  });
}
var Link = Mark.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: false,
  onCreate() {
    this.options.protocols.forEach((protocol) => {
      if (typeof protocol === "string") {
        registerCustomProtocol(protocol);
        return;
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
    });
  },
  onDestroy() {
    reset();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },
  renderHTML({ HTMLAttributes }) {
    var _a;
    if ((_a = HTMLAttributes.href) === null || _a === void 0 ? void 0 : _a.startsWith("javascript:")) {
      return ["a", mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: "" }), 0];
    }
    return ["a", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setLink: (attributes) => ({ chain }) => {
        return chain().setMark(this.name, attributes).setMeta("preventAutolink", true).run();
      },
      toggleLink: (attributes) => ({ chain }) => {
        return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      },
      unsetLink: () => ({ chain }) => {
        return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      }
    };
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: (text) => {
          const foundLinks = [];
          if (text) {
            const links = find(text).filter((item) => item.isLink);
            if (links.length) {
              links.forEach((link) => foundLinks.push({
                text: link.value,
                data: {
                  href: link.href
                },
                index: link.start
              }));
            }
          }
          return foundLinks;
        },
        type: this.type,
        getAttributes: (match) => {
          var _a;
          return {
            href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const plugins = [];
    if (this.options.autolink) {
      plugins.push(autolink({
        type: this.type,
        validate: this.options.validate
      }));
    }
    if (this.options.openOnClick) {
      plugins.push(clickHandler({
        type: this.type,
        whenNotEditable: this.options.openOnClick === "whenNotEditable"
      }));
    }
    if (this.options.linkOnPaste) {
      plugins.push(pasteHandler({
        editor: this.editor,
        type: this.type
      }));
    }
    return plugins;
  }
});

// node_modules/@tiptap/extension-placeholder/dist/index.js
var Placeholder = Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      considerAnyAsEmpty: false,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("placeholder"),
        props: {
          decorations: ({ doc, selection }) => {
            var _a;
            const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];
            if (!active) {
              return null;
            }
            const { firstChild } = doc.content;
            const isLeaf = firstChild && firstChild.type.isLeaf;
            const isAtom = firstChild && firstChild.isAtom;
            const isValidNode = this.options.considerAnyAsEmpty ? true : firstChild && firstChild.type.name === ((_a = doc.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.name);
            const isEmptyDoc = doc.content.childCount <= 1 && firstChild && isValidNode && (firstChild.nodeSize <= 2 && (!isLeaf || !isAtom));
            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty2 = !node.isLeaf && !node.childCount;
              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty2) {
                const classes = [this.options.emptyNodeClass];
                if (isEmptyDoc) {
                  classes.push(this.options.emptyEditorClass);
                }
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": typeof this.options.placeholder === "function" ? this.options.placeholder({
                    editor: this.editor,
                    node,
                    pos,
                    hasAnchor
                  }) : this.options.placeholder
                });
                decorations.push(decoration);
              }
              return this.options.includeChildren;
            });
            return DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});

// node_modules/@tiptap/extension-blockquote/dist/index.js
var inputRegex2 = /^\s*>\s$/;
var Blockquote = Node.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: true,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["blockquote", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex2,
        type: this.type
      })
    ];
  }
});

// node_modules/@tiptap/extension-bold/dist/index.js
var starInputRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
var starPasteRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
var underscoreInputRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
var underscorePasteRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;
var Bold = Mark.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (node) => node.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["strong", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleBold: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetBold: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type
      })
    ];
  }
});

// node_modules/@tiptap/extension-bullet-list/dist/index.js
var ListItem = Node.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
});
var TextStyle2 = Mark.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state, commands }) => {
        const attributes = getMarkAttributes(state, this.type);
        const hasStyles = Object.entries(attributes).some(([, value]) => !!value);
        if (hasStyles) {
          return true;
        }
        return commands.unsetMark(this.name);
      }
    };
  }
});
var inputRegex3 = /^\s*([-+*])\s$/;
var BulletList = Node.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["ul", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands, chain }) => {
        if (this.options.keepAttributes) {
          return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItem.name, this.editor.getAttributes(TextStyle2.name)).run();
        }
        return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex3,
      type: this.type
    });
    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: inputRegex3,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyle2.name);
        },
        editor: this.editor
      });
    }
    return [
      inputRule
    ];
  }
});

// node_modules/@tiptap/extension-code/dist/index.js
var inputRegex4 = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/;
var pasteRegex2 = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))/g;
var Code = Mark.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: true,
  exitable: true,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["code", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleCode: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetCode: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex4,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex2,
        type: this.type
      })
    ];
  }
});

// node_modules/@tiptap/extension-document/dist/index.js
var Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+"
});

// node_modules/prosemirror-gapcursor/dist/index.js
var GapCursor = class _GapCursor extends Selection {
  /**
  Create a gap cursor.
  */
  constructor($pos) {
    super($pos, $pos);
  }
  map(doc, mapping) {
    let $pos = doc.resolve(mapping.map(this.head));
    return _GapCursor.valid($pos) ? new _GapCursor($pos) : Selection.near($pos);
  }
  content() {
    return Slice.empty;
  }
  eq(other) {
    return other instanceof _GapCursor && other.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(doc, json) {
    if (typeof json.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new _GapCursor(doc.resolve(json.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new GapBookmark(this.anchor);
  }
  /**
  @internal
  */
  static valid($pos) {
    let parent = $pos.parent;
    if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos))
      return false;
    let override = parent.type.spec.allowGapCursor;
    if (override != null)
      return override;
    let deflt = parent.contentMatchAt($pos.index()).defaultType;
    return deflt && deflt.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom($pos, dir, mustMove = false) {
    search:
      for (; ; ) {
        if (!mustMove && _GapCursor.valid($pos))
          return $pos;
        let pos = $pos.pos, next = null;
        for (let d = $pos.depth; ; d--) {
          let parent = $pos.node(d);
          if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
            next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
            break;
          } else if (d == 0) {
            return null;
          }
          pos += dir;
          let $cur = $pos.doc.resolve(pos);
          if (_GapCursor.valid($cur))
            return $cur;
        }
        for (; ; ) {
          let inside = dir > 0 ? next.firstChild : next.lastChild;
          if (!inside) {
            if (next.isAtom && !next.isText && !NodeSelection.isSelectable(next)) {
              $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
              mustMove = false;
              continue search;
            }
            break;
          }
          next = inside;
          pos += dir;
          let $cur = $pos.doc.resolve(pos);
          if (_GapCursor.valid($cur))
            return $cur;
        }
        return null;
      }
  }
};
GapCursor.prototype.visible = false;
GapCursor.findFrom = GapCursor.findGapCursorFrom;
Selection.jsonID("gapcursor", GapCursor);
var GapBookmark = class _GapBookmark {
  constructor(pos) {
    this.pos = pos;
  }
  map(mapping) {
    return new _GapBookmark(mapping.map(this.pos));
  }
  resolve(doc) {
    let $pos = doc.resolve(this.pos);
    return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
  }
};
function closedBefore($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.index(d), parent = $pos.node(d);
    if (index == 0) {
      if (parent.type.spec.isolating)
        return true;
      continue;
    }
    for (let before = parent.child(index - 1); ; before = before.lastChild) {
      if (before.childCount == 0 && !before.inlineContent || before.isAtom || before.type.spec.isolating)
        return true;
      if (before.inlineContent)
        return false;
    }
  }
  return true;
}
function closedAfter($pos) {
  for (let d = $pos.depth; d >= 0; d--) {
    let index = $pos.indexAfter(d), parent = $pos.node(d);
    if (index == parent.childCount) {
      if (parent.type.spec.isolating)
        return true;
      continue;
    }
    for (let after = parent.child(index); ; after = after.firstChild) {
      if (after.childCount == 0 && !after.inlineContent || after.isAtom || after.type.spec.isolating)
        return true;
      if (after.inlineContent)
        return false;
    }
  }
  return true;
}
function gapCursor() {
  return new Plugin({
    props: {
      decorations: drawGapCursor,
      createSelectionBetween(_view, $anchor, $head) {
        return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;
      },
      handleClick,
      handleKeyDown,
      handleDOMEvents: { beforeinput }
    }
  });
}
var handleKeyDown = keydownHandler({
  "ArrowLeft": arrow("horiz", -1),
  "ArrowRight": arrow("horiz", 1),
  "ArrowUp": arrow("vert", -1),
  "ArrowDown": arrow("vert", 1)
});
function arrow(axis, dir) {
  const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
  return function(state, dispatch, view) {
    let sel = state.selection;
    let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
    if (sel instanceof TextSelection) {
      if (!view.endOfTextblock(dirStr) || $start.depth == 0)
        return false;
      mustMove = false;
      $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
    }
    let $found = GapCursor.findGapCursorFrom($start, dir, mustMove);
    if (!$found)
      return false;
    if (dispatch)
      dispatch(state.tr.setSelection(new GapCursor($found)));
    return true;
  };
}
function handleClick(view, pos, event) {
  if (!view || !view.editable)
    return false;
  let $pos = view.state.doc.resolve(pos);
  if (!GapCursor.valid($pos))
    return false;
  let clickPos = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (clickPos && clickPos.inside > -1 && NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside)))
    return false;
  view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
  return true;
}
function beforeinput(view, event) {
  if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof GapCursor))
    return false;
  let { $from } = view.state.selection;
  let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
  if (!insert)
    return false;
  let frag = Fragment.empty;
  for (let i = insert.length - 1; i >= 0; i--)
    frag = Fragment.from(insert[i].createAndFill(null, frag));
  let tr2 = view.state.tr.replace($from.pos, $from.pos, new Slice(frag, 0, 0));
  tr2.setSelection(TextSelection.near(tr2.doc.resolve($from.pos + 1)));
  view.dispatch(tr2);
  return false;
}
function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor))
    return null;
  let node = document.createElement("div");
  node.className = "ProseMirror-gapcursor";
  return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node, { key: "gapcursor" })]);
}

// node_modules/@tiptap/extension-gapcursor/dist/index.js
var Gapcursor = Extension.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      gapCursor()
    ];
  },
  extendNodeSchema(extension) {
    var _a;
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      allowGapCursor: (_a = callOrReturn(getExtensionField(extension, "allowGapCursor", context))) !== null && _a !== void 0 ? _a : null
    };
  }
});

// node_modules/@tiptap/extension-hard-break/dist/index.js
var HardBreak = Node.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: true,
      HTMLAttributes: {}
    };
  },
  inline: true,
  group: "inline",
  selectable: false,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["br", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  renderText() {
    return "\n";
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands, chain, state, editor }) => {
        return commands.first([
          () => commands.exitCode(),
          () => commands.command(() => {
            const { selection, storedMarks } = state;
            if (selection.$from.parent.type.spec.isolating) {
              return false;
            }
            const { keepMarks } = this.options;
            const { splittableMarks } = editor.extensionManager;
            const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
            return chain().insertContent({ type: this.name }).command(({ tr: tr2, dispatch }) => {
              if (dispatch && marks && keepMarks) {
                const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
                tr2.ensureMarks(filteredMarks);
              }
              return true;
            }).run();
          })
        ]);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
});

// node_modules/@tiptap/extension-heading/dist/index.js
var Heading = Node.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: true,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level }
    }));
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.setNode(this.name, attributes);
      },
      toggleHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
      }
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level
        }
      });
    });
  }
});

// node_modules/rope-sequence/dist/index.js
var GOOD_LEAF_SIZE = 200;
var RopeSequence = function RopeSequence2() {
};
RopeSequence.prototype.append = function append(other) {
  if (!other.length) {
    return this;
  }
  other = RopeSequence.from(other);
  return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
};
RopeSequence.prototype.prepend = function prepend(other) {
  if (!other.length) {
    return this;
  }
  return RopeSequence.from(other).append(this);
};
RopeSequence.prototype.appendInner = function appendInner(other) {
  return new Append(this, other);
};
RopeSequence.prototype.slice = function slice(from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  if (from2 >= to) {
    return RopeSequence.empty;
  }
  return this.sliceInner(Math.max(0, from2), Math.min(this.length, to));
};
RopeSequence.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) {
    return void 0;
  }
  return this.getInner(i);
};
RopeSequence.prototype.forEach = function forEach(f, from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  if (from2 <= to) {
    this.forEachInner(f, from2, to, 0);
  } else {
    this.forEachInvertedInner(f, from2, to, 0);
  }
};
RopeSequence.prototype.map = function map(f, from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  var result = [];
  this.forEach(function(elt, i) {
    return result.push(f(elt, i));
  }, from2, to);
  return result;
};
RopeSequence.from = function from(values) {
  if (values instanceof RopeSequence) {
    return values;
  }
  return values && values.length ? new Leaf(values) : RopeSequence.empty;
};
var Leaf = /* @__PURE__ */ function(RopeSequence3) {
  function Leaf2(values) {
    RopeSequence3.call(this);
    this.values = values;
  }
  if (RopeSequence3)
    Leaf2.__proto__ = RopeSequence3;
  Leaf2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Leaf2.prototype.constructor = Leaf2;
  var prototypeAccessors = { length: { configurable: true }, depth: { configurable: true } };
  Leaf2.prototype.flatten = function flatten() {
    return this.values;
  };
  Leaf2.prototype.sliceInner = function sliceInner(from2, to) {
    if (from2 == 0 && to == this.length) {
      return this;
    }
    return new Leaf2(this.values.slice(from2, to));
  };
  Leaf2.prototype.getInner = function getInner(i) {
    return this.values[i];
  };
  Leaf2.prototype.forEachInner = function forEachInner(f, from2, to, start) {
    for (var i = from2; i < to; i++) {
      if (f(this.values[i], start + i) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from2, to, start) {
    for (var i = from2 - 1; i >= to; i--) {
      if (f(this.values[i], start + i) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.leafAppend = function leafAppend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(this.values.concat(other.flatten()));
    }
  };
  Leaf2.prototype.leafPrepend = function leafPrepend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(other.flatten().concat(this.values));
    }
  };
  prototypeAccessors.length.get = function() {
    return this.values.length;
  };
  prototypeAccessors.depth.get = function() {
    return 0;
  };
  Object.defineProperties(Leaf2.prototype, prototypeAccessors);
  return Leaf2;
}(RopeSequence);
RopeSequence.empty = new Leaf([]);
var Append = /* @__PURE__ */ function(RopeSequence3) {
  function Append2(left, right) {
    RopeSequence3.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }
  if (RopeSequence3)
    Append2.__proto__ = RopeSequence3;
  Append2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Append2.prototype.constructor = Append2;
  Append2.prototype.flatten = function flatten() {
    return this.left.flatten().concat(this.right.flatten());
  };
  Append2.prototype.getInner = function getInner(i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
  };
  Append2.prototype.forEachInner = function forEachInner(f, from2, to, start) {
    var leftLen = this.left.length;
    if (from2 < leftLen && this.left.forEachInner(f, from2, Math.min(to, leftLen), start) === false) {
      return false;
    }
    if (to > leftLen && this.right.forEachInner(f, Math.max(from2 - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false) {
      return false;
    }
  };
  Append2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from2, to, start) {
    var leftLen = this.left.length;
    if (from2 > leftLen && this.right.forEachInvertedInner(f, from2 - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false) {
      return false;
    }
    if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from2, leftLen), to, start) === false) {
      return false;
    }
  };
  Append2.prototype.sliceInner = function sliceInner(from2, to) {
    if (from2 == 0 && to == this.length) {
      return this;
    }
    var leftLen = this.left.length;
    if (to <= leftLen) {
      return this.left.slice(from2, to);
    }
    if (from2 >= leftLen) {
      return this.right.slice(from2 - leftLen, to - leftLen);
    }
    return this.left.slice(from2, leftLen).append(this.right.slice(0, to - leftLen));
  };
  Append2.prototype.leafAppend = function leafAppend(other) {
    var inner = this.right.leafAppend(other);
    if (inner) {
      return new Append2(this.left, inner);
    }
  };
  Append2.prototype.leafPrepend = function leafPrepend(other) {
    var inner = this.left.leafPrepend(other);
    if (inner) {
      return new Append2(inner, this.right);
    }
  };
  Append2.prototype.appendInner = function appendInner2(other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) {
      return new Append2(this.left, new Append2(this.right, other));
    }
    return new Append2(this, other);
  };
  return Append2;
}(RopeSequence);
var dist_default = RopeSequence;

// node_modules/prosemirror-history/dist/index.js
var max_empty_items = 500;
var Branch = class _Branch {
  constructor(items, eventCount) {
    this.items = items;
    this.eventCount = eventCount;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(state, preserveItems) {
    if (this.eventCount == 0)
      return null;
    let end = this.items.length;
    for (; ; end--) {
      let next = this.items.get(end - 1);
      if (next.selection) {
        --end;
        break;
      }
    }
    let remap, mapFrom;
    if (preserveItems) {
      remap = this.remapping(end, this.items.length);
      mapFrom = remap.maps.length;
    }
    let transform = state.tr;
    let selection, remaining;
    let addAfter = [], addBefore = [];
    this.items.forEach((item, i) => {
      if (!item.step) {
        if (!remap) {
          remap = this.remapping(end, i + 1);
          mapFrom = remap.maps.length;
        }
        mapFrom--;
        addBefore.push(item);
        return;
      }
      if (remap) {
        addBefore.push(new Item(item.map));
        let step = item.step.map(remap.slice(mapFrom)), map2;
        if (step && transform.maybeStep(step).doc) {
          map2 = transform.mapping.maps[transform.mapping.maps.length - 1];
          addAfter.push(new Item(map2, void 0, void 0, addAfter.length + addBefore.length));
        }
        mapFrom--;
        if (map2)
          remap.appendMap(map2, mapFrom);
      } else {
        transform.maybeStep(item.step);
      }
      if (item.selection) {
        selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
        remaining = new _Branch(this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this.eventCount - 1);
        return false;
      }
    }, this.items.length, 0);
    return { remaining, transform, selection };
  }
  // Create a new branch with the given transform added.
  addTransform(transform, selection, histOptions, preserveItems) {
    let newItems = [], eventCount = this.eventCount;
    let oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
    for (let i = 0; i < transform.steps.length; i++) {
      let step = transform.steps[i].invert(transform.docs[i]);
      let item = new Item(transform.mapping.maps[i], step, selection), merged;
      if (merged = lastItem && lastItem.merge(item)) {
        item = merged;
        if (i)
          newItems.pop();
        else
          oldItems = oldItems.slice(0, oldItems.length - 1);
      }
      newItems.push(item);
      if (selection) {
        eventCount++;
        selection = void 0;
      }
      if (!preserveItems)
        lastItem = item;
    }
    let overflow = eventCount - histOptions.depth;
    if (overflow > DEPTH_OVERFLOW) {
      oldItems = cutOffEvents(oldItems, overflow);
      eventCount -= overflow;
    }
    return new _Branch(oldItems.append(newItems), eventCount);
  }
  remapping(from2, to) {
    let maps = new Mapping();
    this.items.forEach((item, i) => {
      let mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from2 ? maps.maps.length - item.mirrorOffset : void 0;
      maps.appendMap(item.map, mirrorPos);
    }, from2, to);
    return maps;
  }
  addMaps(array) {
    if (this.eventCount == 0)
      return this;
    return new _Branch(this.items.append(array.map((map2) => new Item(map2))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(rebasedTransform, rebasedCount) {
    if (!this.eventCount)
      return this;
    let rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
    let mapping = rebasedTransform.mapping;
    let newUntil = rebasedTransform.steps.length;
    let eventCount = this.eventCount;
    this.items.forEach((item) => {
      if (item.selection)
        eventCount--;
    }, start);
    let iRebased = rebasedCount;
    this.items.forEach((item) => {
      let pos = mapping.getMirror(--iRebased);
      if (pos == null)
        return;
      newUntil = Math.min(newUntil, pos);
      let map2 = mapping.maps[pos];
      if (item.step) {
        let step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
        let selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
        if (selection)
          eventCount++;
        rebasedItems.push(new Item(map2, step, selection));
      } else {
        rebasedItems.push(new Item(map2));
      }
    }, start);
    let newMaps = [];
    for (let i = rebasedCount; i < newUntil; i++)
      newMaps.push(new Item(mapping.maps[i]));
    let items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
    let branch = new _Branch(items, eventCount);
    if (branch.emptyItemCount() > max_empty_items)
      branch = branch.compress(this.items.length - rebasedItems.length);
    return branch;
  }
  emptyItemCount() {
    let count = 0;
    this.items.forEach((item) => {
      if (!item.step)
        count++;
    });
    return count;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(upto = this.items.length) {
    let remap = this.remapping(0, upto), mapFrom = remap.maps.length;
    let items = [], events = 0;
    this.items.forEach((item, i) => {
      if (i >= upto) {
        items.push(item);
        if (item.selection)
          events++;
      } else if (item.step) {
        let step = item.step.map(remap.slice(mapFrom)), map2 = step && step.getMap();
        mapFrom--;
        if (map2)
          remap.appendMap(map2, mapFrom);
        if (step) {
          let selection = item.selection && item.selection.map(remap.slice(mapFrom));
          if (selection)
            events++;
          let newItem = new Item(map2.invert(), step, selection), merged, last = items.length - 1;
          if (merged = items.length && items[last].merge(newItem))
            items[last] = merged;
          else
            items.push(newItem);
        }
      } else if (item.map) {
        mapFrom--;
      }
    }, this.items.length, 0);
    return new _Branch(dist_default.from(items.reverse()), events);
  }
};
Branch.empty = new Branch(dist_default.empty, 0);
function cutOffEvents(items, n) {
  let cutPoint;
  items.forEach((item, i) => {
    if (item.selection && n-- == 0) {
      cutPoint = i;
      return false;
    }
  });
  return items.slice(cutPoint);
}
var Item = class _Item {
  constructor(map2, step, selection, mirrorOffset) {
    this.map = map2;
    this.step = step;
    this.selection = selection;
    this.mirrorOffset = mirrorOffset;
  }
  merge(other) {
    if (this.step && other.step && !other.selection) {
      let step = other.step.merge(this.step);
      if (step)
        return new _Item(step.getMap().invert(), step, this.selection);
    }
  }
};
var HistoryState = class {
  constructor(done, undone, prevRanges, prevTime, prevComposition) {
    this.done = done;
    this.undone = undone;
    this.prevRanges = prevRanges;
    this.prevTime = prevTime;
    this.prevComposition = prevComposition;
  }
};
var DEPTH_OVERFLOW = 20;
function applyTransaction(history2, state, tr2, options) {
  let historyTr = tr2.getMeta(historyKey), rebased;
  if (historyTr)
    return historyTr.historyState;
  if (tr2.getMeta(closeHistoryKey))
    history2 = new HistoryState(history2.done, history2.undone, null, 0, -1);
  let appended = tr2.getMeta("appendedTransaction");
  if (tr2.steps.length == 0) {
    return history2;
  } else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo)
      return new HistoryState(history2.done.addTransform(tr2, void 0, options, mustPreserveItems(state)), history2.undone, rangesFor(tr2.mapping.maps[tr2.steps.length - 1]), history2.prevTime, history2.prevComposition);
    else
      return new HistoryState(history2.done, history2.undone.addTransform(tr2, void 0, options, mustPreserveItems(state)), null, history2.prevTime, history2.prevComposition);
  } else if (tr2.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
    let composition = tr2.getMeta("composition");
    let newGroup = history2.prevTime == 0 || !appended && history2.prevComposition != composition && (history2.prevTime < (tr2.time || 0) - options.newGroupDelay || !isAdjacentTo(tr2, history2.prevRanges));
    let prevRanges = appended ? mapRanges(history2.prevRanges, tr2.mapping) : rangesFor(tr2.mapping.maps[tr2.steps.length - 1]);
    return new HistoryState(history2.done.addTransform(tr2, newGroup ? state.selection.getBookmark() : void 0, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr2.time, composition == null ? history2.prevComposition : composition);
  } else if (rebased = tr2.getMeta("rebased")) {
    return new HistoryState(history2.done.rebased(tr2, rebased), history2.undone.rebased(tr2, rebased), mapRanges(history2.prevRanges, tr2.mapping), history2.prevTime, history2.prevComposition);
  } else {
    return new HistoryState(history2.done.addMaps(tr2.mapping.maps), history2.undone.addMaps(tr2.mapping.maps), mapRanges(history2.prevRanges, tr2.mapping), history2.prevTime, history2.prevComposition);
  }
}
function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges)
    return false;
  if (!transform.docChanged)
    return true;
  let adjacent = false;
  transform.mapping.maps[0].forEach((start, end) => {
    for (let i = 0; i < prevRanges.length; i += 2)
      if (start <= prevRanges[i + 1] && end >= prevRanges[i])
        adjacent = true;
  });
  return adjacent;
}
function rangesFor(map2) {
  let result = [];
  map2.forEach((_from, _to, from2, to) => result.push(from2, to));
  return result;
}
function mapRanges(ranges, mapping) {
  if (!ranges)
    return null;
  let result = [];
  for (let i = 0; i < ranges.length; i += 2) {
    let from2 = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
    if (from2 <= to)
      result.push(from2, to);
  }
  return result;
}
function histTransaction(history2, state, redo2) {
  let preserveItems = mustPreserveItems(state);
  let histOptions = historyKey.get(state).spec.config;
  let pop = (redo2 ? history2.undone : history2.done).popEvent(state, preserveItems);
  if (!pop)
    return null;
  let selection = pop.selection.resolve(pop.transform.doc);
  let added = (redo2 ? history2.done : history2.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
  let newHist = new HistoryState(redo2 ? added : pop.remaining, redo2 ? pop.remaining : added, null, 0, -1);
  return pop.transform.setSelection(selection).setMeta(historyKey, { redo: redo2, historyState: newHist });
}
var cachedPreserveItems = false;
var cachedPreserveItemsPlugins = null;
function mustPreserveItems(state) {
  let plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (let i = 0; i < plugins.length; i++)
      if (plugins[i].spec.historyPreserveItems) {
        cachedPreserveItems = true;
        break;
      }
  }
  return cachedPreserveItems;
}
var historyKey = new PluginKey("history");
var closeHistoryKey = new PluginKey("closeHistory");
function history(config = {}) {
  config = {
    depth: config.depth || 100,
    newGroupDelay: config.newGroupDelay || 500
  };
  return new Plugin({
    key: historyKey,
    state: {
      init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0, -1);
      },
      apply(tr2, hist, state) {
        return applyTransaction(hist, state, tr2, config);
      }
    },
    config,
    props: {
      handleDOMEvents: {
        beforeinput(view, e) {
          let inputType = e.inputType;
          let command = inputType == "historyUndo" ? undo : inputType == "historyRedo" ? redo : null;
          if (!command)
            return false;
          e.preventDefault();
          return command(view.state, view.dispatch);
        }
      }
    }
  });
}
function buildCommand(redo2, scroll) {
  return (state, dispatch) => {
    let hist = historyKey.getState(state);
    if (!hist || (redo2 ? hist.undone : hist.done).eventCount == 0)
      return false;
    if (dispatch) {
      let tr2 = histTransaction(hist, state, redo2);
      if (tr2)
        dispatch(scroll ? tr2.scrollIntoView() : tr2);
    }
    return true;
  };
}
var undo = buildCommand(false, true);
var redo = buildCommand(true, true);
var undoNoScroll = buildCommand(false, false);
var redoNoScroll = buildCommand(true, false);

// node_modules/@tiptap/extension-history/dist/index.js
var History = Extension.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state, dispatch }) => {
        return undo(state, dispatch);
      },
      redo: () => ({ state, dispatch }) => {
        return redo(state, dispatch);
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      history(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
});

// node_modules/@tiptap/extension-italic/dist/index.js
var starInputRegex2 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
var starPasteRegex2 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
var underscoreInputRegex2 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
var underscorePasteRegex2 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;
var Italic = Mark.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["em", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleItalic: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetItalic: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex2,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex2,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex2,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex2,
        type: this.type
      })
    ];
  }
});

// node_modules/@tiptap/extension-list-item/dist/index.js
var ListItem2 = Node.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
});

// node_modules/@tiptap/extension-ordered-list/dist/index.js
var ListItem3 = Node.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
});
var TextStyle3 = Mark.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state, commands }) => {
        const attributes = getMarkAttributes(state, this.type);
        const hasStyles = Object.entries(attributes).some(([, value]) => !!value);
        if (hasStyles) {
          return true;
        }
        return commands.unsetMark(this.name);
      }
    };
  }
});
var inputRegex5 = /^(\d+)\.\s$/;
var OrderedList = Node.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1;
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;
    return start === 1 ? ["ol", mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0] : ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands, chain }) => {
        if (this.options.keepAttributes) {
          return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItem3.name, this.editor.getAttributes(TextStyle3.name)).run();
        }
        return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex5,
      type: this.type,
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1]
    });
    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: inputRegex5,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: (match) => ({ start: +match[1], ...this.editor.getAttributes(TextStyle3.name) }),
        joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1],
        editor: this.editor
      });
    }
    return [
      inputRule
    ];
  }
});

// node_modules/@tiptap/extension-paragraph/dist/index.js
var Paragraph = Node.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
});

// node_modules/@tiptap/extension-strike/dist/index.js
var inputRegex6 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/;
var pasteRegex3 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g;
var Strike = Mark.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style) => style.includes("line-through") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["s", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleStrike: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetStrike: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    const shortcuts = {};
    if (isMacOS()) {
      shortcuts["Mod-Shift-s"] = () => this.editor.commands.toggleStrike();
    } else {
      shortcuts["Ctrl-Shift-s"] = () => this.editor.commands.toggleStrike();
    }
    return shortcuts;
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex6,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex3,
        type: this.type
      })
    ];
  }
});

// node_modules/@tiptap/extension-text/dist/index.js
var Text2 = Node.create({
  name: "text",
  group: "inline"
});

// node_modules/@tiptap/starter-kit/dist/index.js
var StarterKit = Extension.create({
  name: "starterKit",
  addExtensions() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const extensions = [];
    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure((_a = this.options) === null || _a === void 0 ? void 0 : _a.blockquote));
    }
    if (this.options.bold !== false) {
      extensions.push(Bold.configure((_b = this.options) === null || _b === void 0 ? void 0 : _b.bold));
    }
    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure((_c = this.options) === null || _c === void 0 ? void 0 : _c.bulletList));
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure((_d = this.options) === null || _d === void 0 ? void 0 : _d.code));
    }
    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure((_e = this.options) === null || _e === void 0 ? void 0 : _e.codeBlock));
    }
    if (this.options.document !== false) {
      extensions.push(Document.configure((_f = this.options) === null || _f === void 0 ? void 0 : _f.document));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure((_g = this.options) === null || _g === void 0 ? void 0 : _g.dropcursor));
    }
    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure((_h = this.options) === null || _h === void 0 ? void 0 : _h.gapcursor));
    }
    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure((_j = this.options) === null || _j === void 0 ? void 0 : _j.hardBreak));
    }
    if (this.options.heading !== false) {
      extensions.push(Heading.configure((_k = this.options) === null || _k === void 0 ? void 0 : _k.heading));
    }
    if (this.options.history !== false) {
      extensions.push(History.configure((_l = this.options) === null || _l === void 0 ? void 0 : _l.history));
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure((_m = this.options) === null || _m === void 0 ? void 0 : _m.horizontalRule));
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure((_o = this.options) === null || _o === void 0 ? void 0 : _o.italic));
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem2.configure((_p = this.options) === null || _p === void 0 ? void 0 : _p.listItem));
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure((_q = this.options) === null || _q === void 0 ? void 0 : _q.orderedList));
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure((_r = this.options) === null || _r === void 0 ? void 0 : _r.paragraph));
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure((_s = this.options) === null || _s === void 0 ? void 0 : _s.strike));
    }
    if (this.options.text !== false) {
      extensions.push(Text2.configure((_t = this.options) === null || _t === void 0 ? void 0 : _t.text));
    }
    return extensions;
  }
});

// node_modules/prosemirror-tables/dist/index.js
var readFromCache;
var addToCache;
if (typeof WeakMap != "undefined") {
  let cache = /* @__PURE__ */ new WeakMap();
  readFromCache = (key) => cache.get(key);
  addToCache = (key, value) => {
    cache.set(key, value);
    return value;
  };
} else {
  const cache = [];
  const cacheSize = 10;
  let cachePos = 0;
  readFromCache = (key) => {
    for (let i = 0; i < cache.length; i += 2)
      if (cache[i] == key)
        return cache[i + 1];
  };
  addToCache = (key, value) => {
    if (cachePos == cacheSize)
      cachePos = 0;
    cache[cachePos++] = key;
    return cache[cachePos++] = value;
  };
}
var TableMap = class {
  constructor(width, height, map2, problems) {
    this.width = width;
    this.height = height;
    this.map = map2;
    this.problems = problems;
  }
  // Find the dimensions of the cell at the given position.
  findCell(pos) {
    for (let i = 0; i < this.map.length; i++) {
      const curPos = this.map[i];
      if (curPos != pos)
        continue;
      const left = i % this.width;
      const top = i / this.width | 0;
      let right = left + 1;
      let bottom = top + 1;
      for (let j = 1; right < this.width && this.map[i + j] == curPos; j++) {
        right++;
      }
      for (let j = 1; bottom < this.height && this.map[i + this.width * j] == curPos; j++) {
        bottom++;
      }
      return { left, top, right, bottom };
    }
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(pos) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] == pos) {
        return i % this.width;
      }
    }
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(pos, axis, dir) {
    const { left, right, top, bottom } = this.findCell(pos);
    if (axis == "horiz") {
      if (dir < 0 ? left == 0 : right == this.width)
        return null;
      return this.map[top * this.width + (dir < 0 ? left - 1 : right)];
    } else {
      if (dir < 0 ? top == 0 : bottom == this.height)
        return null;
      return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)];
    }
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(a, b) {
    const {
      left: leftA,
      right: rightA,
      top: topA,
      bottom: bottomA
    } = this.findCell(a);
    const {
      left: leftB,
      right: rightB,
      top: topB,
      bottom: bottomB
    } = this.findCell(b);
    return {
      left: Math.min(leftA, leftB),
      top: Math.min(topA, topB),
      right: Math.max(rightA, rightB),
      bottom: Math.max(bottomA, bottomB)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(rect) {
    const result = [];
    const seen = {};
    for (let row = rect.top; row < rect.bottom; row++) {
      for (let col = rect.left; col < rect.right; col++) {
        const index = row * this.width + col;
        const pos = this.map[index];
        if (seen[pos])
          continue;
        seen[pos] = true;
        if (col == rect.left && col && this.map[index - 1] == pos || row == rect.top && row && this.map[index - this.width] == pos) {
          continue;
        }
        result.push(pos);
      }
    }
    return result;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(row, col, table) {
    for (let i = 0, rowStart = 0; ; i++) {
      const rowEnd = rowStart + table.child(i).nodeSize;
      if (i == row) {
        let index = col + row * this.width;
        const rowEndIndex = (row + 1) * this.width;
        while (index < rowEndIndex && this.map[index] < rowStart)
          index++;
        return index == rowEndIndex ? rowEnd - 1 : this.map[index];
      }
      rowStart = rowEnd;
    }
  }
  // Find the table map for the given table node.
  static get(table) {
    return readFromCache(table) || addToCache(table, computeMap(table));
  }
};
function computeMap(table) {
  if (table.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + table.type.name);
  const width = findWidth(table), height = table.childCount;
  const map2 = [];
  let mapPos = 0;
  let problems = null;
  const colWidths = [];
  for (let i = 0, e = width * height; i < e; i++)
    map2[i] = 0;
  for (let row = 0, pos = 0; row < height; row++) {
    const rowNode = table.child(row);
    pos++;
    for (let i = 0; ; i++) {
      while (mapPos < map2.length && map2[mapPos] != 0)
        mapPos++;
      if (i == rowNode.childCount)
        break;
      const cellNode = rowNode.child(i);
      const { colspan, rowspan, colwidth } = cellNode.attrs;
      for (let h = 0; h < rowspan; h++) {
        if (h + row >= height) {
          (problems || (problems = [])).push({
            type: "overlong_rowspan",
            pos,
            n: rowspan - h
          });
          break;
        }
        const start = mapPos + h * width;
        for (let w = 0; w < colspan; w++) {
          if (map2[start + w] == 0)
            map2[start + w] = pos;
          else
            (problems || (problems = [])).push({
              type: "collision",
              row,
              pos,
              n: colspan - w
            });
          const colW = colwidth && colwidth[w];
          if (colW) {
            const widthIndex = (start + w) % width * 2, prev = colWidths[widthIndex];
            if (prev == null || prev != colW && colWidths[widthIndex + 1] == 1) {
              colWidths[widthIndex] = colW;
              colWidths[widthIndex + 1] = 1;
            } else if (prev == colW) {
              colWidths[widthIndex + 1]++;
            }
          }
        }
      }
      mapPos += colspan;
      pos += cellNode.nodeSize;
    }
    const expectedPos = (row + 1) * width;
    let missing = 0;
    while (mapPos < expectedPos)
      if (map2[mapPos++] == 0)
        missing++;
    if (missing)
      (problems || (problems = [])).push({ type: "missing", row, n: missing });
    pos++;
  }
  const tableMap = new TableMap(width, height, map2, problems);
  let badWidths = false;
  for (let i = 0; !badWidths && i < colWidths.length; i += 2)
    if (colWidths[i] != null && colWidths[i + 1] < height)
      badWidths = true;
  if (badWidths)
    findBadColWidths(tableMap, colWidths, table);
  return tableMap;
}
function findWidth(table) {
  let width = -1;
  let hasRowSpan = false;
  for (let row = 0; row < table.childCount; row++) {
    const rowNode = table.child(row);
    let rowWidth = 0;
    if (hasRowSpan)
      for (let j = 0; j < row; j++) {
        const prevRow = table.child(j);
        for (let i = 0; i < prevRow.childCount; i++) {
          const cell = prevRow.child(i);
          if (j + cell.attrs.rowspan > row)
            rowWidth += cell.attrs.colspan;
        }
      }
    for (let i = 0; i < rowNode.childCount; i++) {
      const cell = rowNode.child(i);
      rowWidth += cell.attrs.colspan;
      if (cell.attrs.rowspan > 1)
        hasRowSpan = true;
    }
    if (width == -1)
      width = rowWidth;
    else if (width != rowWidth)
      width = Math.max(width, rowWidth);
  }
  return width;
}
function findBadColWidths(map2, colWidths, table) {
  if (!map2.problems)
    map2.problems = [];
  const seen = {};
  for (let i = 0; i < map2.map.length; i++) {
    const pos = map2.map[i];
    if (seen[pos])
      continue;
    seen[pos] = true;
    const node = table.nodeAt(pos);
    if (!node) {
      throw new RangeError(`No cell with offset ${pos} found`);
    }
    let updated = null;
    const attrs = node.attrs;
    for (let j = 0; j < attrs.colspan; j++) {
      const col = (i + j) % map2.width;
      const colWidth = colWidths[col * 2];
      if (colWidth != null && (!attrs.colwidth || attrs.colwidth[j] != colWidth))
        (updated || (updated = freshColWidth(attrs)))[j] = colWidth;
    }
    if (updated)
      map2.problems.unshift({
        type: "colwidth mismatch",
        pos,
        colwidth: updated
      });
  }
}
function freshColWidth(attrs) {
  if (attrs.colwidth)
    return attrs.colwidth.slice();
  const result = [];
  for (let i = 0; i < attrs.colspan; i++)
    result.push(0);
  return result;
}
function tableNodeTypes(schema) {
  let result = schema.cached.tableNodeTypes;
  if (!result) {
    result = schema.cached.tableNodeTypes = {};
    for (const name in schema.nodes) {
      const type = schema.nodes[name], role = type.spec.tableRole;
      if (role)
        result[role] = type;
    }
  }
  return result;
}
var tableEditingKey = new PluginKey("selectingCells");
function cellAround($pos) {
  for (let d = $pos.depth - 1; d > 0; d--)
    if ($pos.node(d).type.spec.tableRole == "row")
      return $pos.node(0).resolve($pos.before(d + 1));
  return null;
}
function cellWrapping($pos) {
  for (let d = $pos.depth; d > 0; d--) {
    const role = $pos.node(d).type.spec.tableRole;
    if (role === "cell" || role === "header_cell")
      return $pos.node(d);
  }
  return null;
}
function isInTable(state) {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--)
    if ($head.node(d).type.spec.tableRole == "row")
      return true;
  return false;
}
function selectionCell(state) {
  const sel = state.selection;
  if ("$anchorCell" in sel && sel.$anchorCell) {
    return sel.$anchorCell.pos > sel.$headCell.pos ? sel.$anchorCell : sel.$headCell;
  } else if ("node" in sel && sel.node && sel.node.type.spec.tableRole == "cell") {
    return sel.$anchor;
  }
  const $cell = cellAround(sel.$head) || cellNear(sel.$head);
  if ($cell) {
    return $cell;
  }
  throw new RangeError(`No cell found around position ${sel.head}`);
}
function cellNear($pos) {
  for (let after = $pos.nodeAfter, pos = $pos.pos; after; after = after.firstChild, pos++) {
    const role = after.type.spec.tableRole;
    if (role == "cell" || role == "header_cell")
      return $pos.doc.resolve(pos);
  }
  for (let before = $pos.nodeBefore, pos = $pos.pos; before; before = before.lastChild, pos--) {
    const role = before.type.spec.tableRole;
    if (role == "cell" || role == "header_cell")
      return $pos.doc.resolve(pos - before.nodeSize);
  }
}
function pointsAtCell($pos) {
  return $pos.parent.type.spec.tableRole == "row" && !!$pos.nodeAfter;
}
function moveCellForward($pos) {
  return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize);
}
function inSameTable($cellA, $cellB) {
  return $cellA.depth == $cellB.depth && $cellA.pos >= $cellB.start(-1) && $cellA.pos <= $cellB.end(-1);
}
function nextCell($pos, axis, dir) {
  const table = $pos.node(-1);
  const map2 = TableMap.get(table);
  const tableStart = $pos.start(-1);
  const moved = map2.nextCell($pos.pos - tableStart, axis, dir);
  return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
}
function removeColSpan(attrs, pos, n = 1) {
  const result = { ...attrs, colspan: attrs.colspan - n };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    result.colwidth.splice(pos, n);
    if (!result.colwidth.some((w) => w > 0))
      result.colwidth = null;
  }
  return result;
}
function addColSpan(attrs, pos, n = 1) {
  const result = { ...attrs, colspan: attrs.colspan + n };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    for (let i = 0; i < n; i++)
      result.colwidth.splice(pos, 0, 0);
  }
  return result;
}
function columnIsHeader(map2, table, col) {
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let row = 0; row < map2.height; row++)
    if (table.nodeAt(map2.map[col + row * map2.width]).type != headerCell)
      return false;
  return true;
}
var CellSelection = class _CellSelection extends Selection {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const rect = map2.rectBetween(
      $anchorCell.pos - tableStart,
      $headCell.pos - tableStart
    );
    const doc = $anchorCell.node(0);
    const cells = map2.cellsInRect(rect).filter((p) => p != $headCell.pos - tableStart);
    cells.unshift($headCell.pos - tableStart);
    const ranges = cells.map((pos) => {
      const cell = table.nodeAt(pos);
      if (!cell) {
        throw RangeError(`No cell with offset ${pos} found`);
      }
      const from2 = tableStart + pos + 1;
      return new SelectionRange(
        doc.resolve(from2),
        doc.resolve(from2 + cell.content.size)
      );
    });
    super(ranges[0].$from, ranges[0].$to, ranges);
    this.$anchorCell = $anchorCell;
    this.$headCell = $headCell;
  }
  map(doc, mapping) {
    const $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
    const $headCell = doc.resolve(mapping.map(this.$headCell.pos));
    if (pointsAtCell($anchorCell) && pointsAtCell($headCell) && inSameTable($anchorCell, $headCell)) {
      const tableChanged = this.$anchorCell.node(-1) != $anchorCell.node(-1);
      if (tableChanged && this.isRowSelection())
        return _CellSelection.rowSelection($anchorCell, $headCell);
      else if (tableChanged && this.isColSelection())
        return _CellSelection.colSelection($anchorCell, $headCell);
      else
        return new _CellSelection($anchorCell, $headCell);
    }
    return TextSelection.between($anchorCell, $headCell);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const table = this.$anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const rect = map2.rectBetween(
      this.$anchorCell.pos - tableStart,
      this.$headCell.pos - tableStart
    );
    const seen = {};
    const rows = [];
    for (let row = rect.top; row < rect.bottom; row++) {
      const rowContent = [];
      for (let index = row * map2.width + rect.left, col = rect.left; col < rect.right; col++, index++) {
        const pos = map2.map[index];
        if (seen[pos])
          continue;
        seen[pos] = true;
        const cellRect = map2.findCell(pos);
        let cell = table.nodeAt(pos);
        if (!cell) {
          throw RangeError(`No cell with offset ${pos} found`);
        }
        const extraLeft = rect.left - cellRect.left;
        const extraRight = cellRect.right - rect.right;
        if (extraLeft > 0 || extraRight > 0) {
          let attrs = cell.attrs;
          if (extraLeft > 0) {
            attrs = removeColSpan(attrs, 0, extraLeft);
          }
          if (extraRight > 0) {
            attrs = removeColSpan(
              attrs,
              attrs.colspan - extraRight,
              extraRight
            );
          }
          if (cellRect.left < rect.left) {
            cell = cell.type.createAndFill(attrs);
            if (!cell) {
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(attrs)}`
              );
            }
          } else {
            cell = cell.type.create(attrs, cell.content);
          }
        }
        if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
          const attrs = {
            ...cell.attrs,
            rowspan: Math.min(cellRect.bottom, rect.bottom) - Math.max(cellRect.top, rect.top)
          };
          if (cellRect.top < rect.top) {
            cell = cell.type.createAndFill(attrs);
          } else {
            cell = cell.type.create(attrs, cell.content);
          }
        }
        rowContent.push(cell);
      }
      rows.push(table.child(row).copy(Fragment.from(rowContent)));
    }
    const fragment = this.isColSelection() && this.isRowSelection() ? table : rows;
    return new Slice(Fragment.from(fragment), 1, 1);
  }
  replace(tr2, content = Slice.empty) {
    const mapFrom = tr2.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      const { $from, $to } = ranges[i], mapping = tr2.mapping.slice(mapFrom);
      tr2.replace(
        mapping.map($from.pos),
        mapping.map($to.pos),
        i ? Slice.empty : content
      );
    }
    const sel = Selection.findFrom(
      tr2.doc.resolve(tr2.mapping.slice(mapFrom).map(this.to)),
      -1
    );
    if (sel)
      tr2.setSelection(sel);
  }
  replaceWith(tr2, node) {
    this.replace(tr2, new Slice(Fragment.from(node), 0, 0));
  }
  forEachCell(f) {
    const table = this.$anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const cells = map2.cellsInRect(
      map2.rectBetween(
        this.$anchorCell.pos - tableStart,
        this.$headCell.pos - tableStart
      )
    );
    for (let i = 0; i < cells.length; i++) {
      f(table.nodeAt(cells[i]), tableStart + cells[i]);
    }
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const anchorTop = this.$anchorCell.index(-1);
    const headTop = this.$headCell.index(-1);
    if (Math.min(anchorTop, headTop) > 0)
      return false;
    const anchorBottom = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan;
    const headBottom = headTop + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(anchorBottom, headBottom) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const anchorRect = map2.findCell($anchorCell.pos - tableStart);
    const headRect = map2.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.top <= headRect.top) {
      if (anchorRect.top > 0)
        $anchorCell = doc.resolve(tableStart + map2.map[anchorRect.left]);
      if (headRect.bottom < map2.height)
        $headCell = doc.resolve(
          tableStart + map2.map[map2.width * (map2.height - 1) + headRect.right - 1]
        );
    } else {
      if (headRect.top > 0)
        $headCell = doc.resolve(tableStart + map2.map[headRect.left]);
      if (anchorRect.bottom < map2.height)
        $anchorCell = doc.resolve(
          tableStart + map2.map[map2.width * (map2.height - 1) + anchorRect.right - 1]
        );
    }
    return new _CellSelection($anchorCell, $headCell);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const table = this.$anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const anchorLeft = map2.colCount(this.$anchorCell.pos - tableStart);
    const headLeft = map2.colCount(this.$headCell.pos - tableStart);
    if (Math.min(anchorLeft, headLeft) > 0)
      return false;
    const anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan;
    const headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(anchorRight, headRight) == map2.width;
  }
  eq(other) {
    return other instanceof _CellSelection && other.$anchorCell.pos == this.$anchorCell.pos && other.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map2 = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const anchorRect = map2.findCell($anchorCell.pos - tableStart);
    const headRect = map2.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.left <= headRect.left) {
      if (anchorRect.left > 0)
        $anchorCell = doc.resolve(
          tableStart + map2.map[anchorRect.top * map2.width]
        );
      if (headRect.right < map2.width)
        $headCell = doc.resolve(
          tableStart + map2.map[map2.width * (headRect.top + 1) - 1]
        );
    } else {
      if (headRect.left > 0)
        $headCell = doc.resolve(tableStart + map2.map[headRect.top * map2.width]);
      if (anchorRect.right < map2.width)
        $anchorCell = doc.resolve(
          tableStart + map2.map[map2.width * (anchorRect.top + 1) - 1]
        );
    }
    return new _CellSelection($anchorCell, $headCell);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(doc, json) {
    return new _CellSelection(doc.resolve(json.anchor), doc.resolve(json.head));
  }
  static create(doc, anchorCell, headCell = anchorCell) {
    return new _CellSelection(doc.resolve(anchorCell), doc.resolve(headCell));
  }
  getBookmark() {
    return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos);
  }
};
CellSelection.prototype.visible = false;
Selection.jsonID("cell", CellSelection);
var CellBookmark = class _CellBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new _CellBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc) {
    const $anchorCell = doc.resolve(this.anchor), $headCell = doc.resolve(this.head);
    if ($anchorCell.parent.type.spec.tableRole == "row" && $headCell.parent.type.spec.tableRole == "row" && $anchorCell.index() < $anchorCell.parent.childCount && $headCell.index() < $headCell.parent.childCount && inSameTable($anchorCell, $headCell))
      return new CellSelection($anchorCell, $headCell);
    else
      return Selection.near($headCell, 1);
  }
};
function drawCellSelection(state) {
  if (!(state.selection instanceof CellSelection))
    return null;
  const cells = [];
  state.selection.forEachCell((node, pos) => {
    cells.push(
      Decoration.node(pos, pos + node.nodeSize, { class: "selectedCell" })
    );
  });
  return DecorationSet.create(state.doc, cells);
}
function isCellBoundarySelection({ $from, $to }) {
  if ($from.pos == $to.pos || $from.pos < $from.pos - 6)
    return false;
  let afterFrom = $from.pos;
  let beforeTo = $to.pos;
  let depth = $from.depth;
  for (; depth >= 0; depth--, afterFrom++)
    if ($from.after(depth + 1) < $from.end(depth))
      break;
  for (let d = $to.depth; d >= 0; d--, beforeTo--)
    if ($to.before(d + 1) > $to.start(d))
      break;
  return afterFrom == beforeTo && /row|table/.test($from.node(depth).type.spec.tableRole);
}
function isTextSelectionAcrossCells({ $from, $to }) {
  let fromCellBoundaryNode;
  let toCellBoundaryNode;
  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);
    if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
      fromCellBoundaryNode = node;
      break;
    }
  }
  for (let i = $to.depth; i > 0; i--) {
    const node = $to.node(i);
    if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
      toCellBoundaryNode = node;
      break;
    }
  }
  return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0;
}
function normalizeSelection(state, tr2, allowTableNodeSelection) {
  const sel = (tr2 || state).selection;
  const doc = (tr2 || state).doc;
  let normalize;
  let role;
  if (sel instanceof NodeSelection && (role = sel.node.type.spec.tableRole)) {
    if (role == "cell" || role == "header_cell") {
      normalize = CellSelection.create(doc, sel.from);
    } else if (role == "row") {
      const $cell = doc.resolve(sel.from + 1);
      normalize = CellSelection.rowSelection($cell, $cell);
    } else if (!allowTableNodeSelection) {
      const map2 = TableMap.get(sel.node);
      const start = sel.from + 1;
      const lastCell = start + map2.map[map2.width * map2.height - 1];
      normalize = CellSelection.create(doc, start + 1, lastCell);
    }
  } else if (sel instanceof TextSelection && isCellBoundarySelection(sel)) {
    normalize = TextSelection.create(doc, sel.from);
  } else if (sel instanceof TextSelection && isTextSelectionAcrossCells(sel)) {
    normalize = TextSelection.create(doc, sel.$from.start(), sel.$from.end());
  }
  if (normalize)
    (tr2 || (tr2 = state.tr)).setSelection(normalize);
  return tr2;
}
var fixTablesKey = new PluginKey("fix-tables");
function changedDescendants(old, cur, offset, f) {
  const oldSize = old.childCount, curSize = cur.childCount;
  outer:
    for (let i = 0, j = 0; i < curSize; i++) {
      const child = cur.child(i);
      for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
        if (old.child(scan) == child) {
          j = scan + 1;
          offset += child.nodeSize;
          continue outer;
        }
      }
      f(child, offset);
      if (j < oldSize && old.child(j).sameMarkup(child))
        changedDescendants(old.child(j), child, offset + 1, f);
      else
        child.nodesBetween(0, child.content.size, f, offset + 1);
      offset += child.nodeSize;
    }
}
function fixTables(state, oldState) {
  let tr2;
  const check = (node, pos) => {
    if (node.type.spec.tableRole == "table")
      tr2 = fixTable(state, node, pos, tr2);
  };
  if (!oldState)
    state.doc.descendants(check);
  else if (oldState.doc != state.doc)
    changedDescendants(oldState.doc, state.doc, 0, check);
  return tr2;
}
function fixTable(state, table, tablePos, tr2) {
  const map2 = TableMap.get(table);
  if (!map2.problems)
    return tr2;
  if (!tr2)
    tr2 = state.tr;
  const mustAdd = [];
  for (let i = 0; i < map2.height; i++)
    mustAdd.push(0);
  for (let i = 0; i < map2.problems.length; i++) {
    const prob = map2.problems[i];
    if (prob.type == "collision") {
      const cell = table.nodeAt(prob.pos);
      if (!cell)
        continue;
      const attrs = cell.attrs;
      for (let j = 0; j < attrs.rowspan; j++)
        mustAdd[prob.row + j] += prob.n;
      tr2.setNodeMarkup(
        tr2.mapping.map(tablePos + 1 + prob.pos),
        null,
        removeColSpan(attrs, attrs.colspan - prob.n, prob.n)
      );
    } else if (prob.type == "missing") {
      mustAdd[prob.row] += prob.n;
    } else if (prob.type == "overlong_rowspan") {
      const cell = table.nodeAt(prob.pos);
      if (!cell)
        continue;
      tr2.setNodeMarkup(tr2.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        rowspan: cell.attrs.rowspan - prob.n
      });
    } else if (prob.type == "colwidth mismatch") {
      const cell = table.nodeAt(prob.pos);
      if (!cell)
        continue;
      tr2.setNodeMarkup(tr2.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        colwidth: prob.colwidth
      });
    }
  }
  let first, last;
  for (let i = 0; i < mustAdd.length; i++)
    if (mustAdd[i]) {
      if (first == null)
        first = i;
      last = i;
    }
  for (let i = 0, pos = tablePos + 1; i < map2.height; i++) {
    const row = table.child(i);
    const end = pos + row.nodeSize;
    const add = mustAdd[i];
    if (add > 0) {
      let role = "cell";
      if (row.firstChild) {
        role = row.firstChild.type.spec.tableRole;
      }
      const nodes = [];
      for (let j = 0; j < add; j++) {
        const node = tableNodeTypes(state.schema)[role].createAndFill();
        if (node)
          nodes.push(node);
      }
      const side = (i == 0 || first == i - 1) && last == i ? pos + 1 : end - 1;
      tr2.insert(tr2.mapping.map(side), nodes);
    }
    pos = end;
  }
  return tr2.setMeta(fixTablesKey, { fixTables: true });
}
function pastedCells(slice2) {
  if (!slice2.size)
    return null;
  let { content, openStart, openEnd } = slice2;
  while (content.childCount == 1 && (openStart > 0 && openEnd > 0 || content.child(0).type.spec.tableRole == "table")) {
    openStart--;
    openEnd--;
    content = content.child(0).content;
  }
  const first = content.child(0);
  const role = first.type.spec.tableRole;
  const schema = first.type.schema, rows = [];
  if (role == "row") {
    for (let i = 0; i < content.childCount; i++) {
      let cells = content.child(i).content;
      const left = i ? 0 : Math.max(0, openStart - 1);
      const right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
      if (left || right)
        cells = fitSlice(
          tableNodeTypes(schema).row,
          new Slice(cells, left, right)
        ).content;
      rows.push(cells);
    }
  } else if (role == "cell" || role == "header_cell") {
    rows.push(
      openStart || openEnd ? fitSlice(
        tableNodeTypes(schema).row,
        new Slice(content, openStart, openEnd)
      ).content : content
    );
  } else {
    return null;
  }
  return ensureRectangular(schema, rows);
}
function ensureRectangular(schema, rows) {
  const widths = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = row.childCount - 1; j >= 0; j--) {
      const { rowspan, colspan } = row.child(j).attrs;
      for (let r = i; r < i + rowspan; r++)
        widths[r] = (widths[r] || 0) + colspan;
    }
  }
  let width = 0;
  for (let r = 0; r < widths.length; r++)
    width = Math.max(width, widths[r]);
  for (let r = 0; r < widths.length; r++) {
    if (r >= rows.length)
      rows.push(Fragment.empty);
    if (widths[r] < width) {
      const empty = tableNodeTypes(schema).cell.createAndFill();
      const cells = [];
      for (let i = widths[r]; i < width; i++) {
        cells.push(empty);
      }
      rows[r] = rows[r].append(Fragment.from(cells));
    }
  }
  return { height: rows.length, width, rows };
}
function fitSlice(nodeType, slice2) {
  const node = nodeType.createAndFill();
  const tr2 = new Transform(node).replace(0, node.content.size, slice2);
  return tr2.doc;
}
function clipCells({ width, height, rows }, newWidth, newHeight) {
  if (width != newWidth) {
    const added = [];
    const newRows = [];
    for (let row = 0; row < rows.length; row++) {
      const frag = rows[row], cells = [];
      for (let col = added[row] || 0, i = 0; col < newWidth; i++) {
        let cell = frag.child(i % frag.childCount);
        if (col + cell.attrs.colspan > newWidth)
          cell = cell.type.createChecked(
            removeColSpan(
              cell.attrs,
              cell.attrs.colspan,
              col + cell.attrs.colspan - newWidth
            ),
            cell.content
          );
        cells.push(cell);
        col += cell.attrs.colspan;
        for (let j = 1; j < cell.attrs.rowspan; j++)
          added[row + j] = (added[row + j] || 0) + cell.attrs.colspan;
      }
      newRows.push(Fragment.from(cells));
    }
    rows = newRows;
    width = newWidth;
  }
  if (height != newHeight) {
    const newRows = [];
    for (let row = 0, i = 0; row < newHeight; row++, i++) {
      const cells = [], source = rows[i % height];
      for (let j = 0; j < source.childCount; j++) {
        let cell = source.child(j);
        if (row + cell.attrs.rowspan > newHeight)
          cell = cell.type.create(
            {
              ...cell.attrs,
              rowspan: Math.max(1, newHeight - cell.attrs.rowspan)
            },
            cell.content
          );
        cells.push(cell);
      }
      newRows.push(Fragment.from(cells));
    }
    rows = newRows;
    height = newHeight;
  }
  return { width, height, rows };
}
function growTable(tr2, map2, table, start, width, height, mapFrom) {
  const schema = tr2.doc.type.schema;
  const types = tableNodeTypes(schema);
  let empty;
  let emptyHead;
  if (width > map2.width) {
    for (let row = 0, rowEnd = 0; row < map2.height; row++) {
      const rowNode = table.child(row);
      rowEnd += rowNode.nodeSize;
      const cells = [];
      let add;
      if (rowNode.lastChild == null || rowNode.lastChild.type == types.cell)
        add = empty || (empty = types.cell.createAndFill());
      else
        add = emptyHead || (emptyHead = types.header_cell.createAndFill());
      for (let i = map2.width; i < width; i++)
        cells.push(add);
      tr2.insert(tr2.mapping.slice(mapFrom).map(rowEnd - 1 + start), cells);
    }
  }
  if (height > map2.height) {
    const cells = [];
    for (let i = 0, start2 = (map2.height - 1) * map2.width; i < Math.max(map2.width, width); i++) {
      const header = i >= map2.width ? false : table.nodeAt(map2.map[start2 + i]).type == types.header_cell;
      cells.push(
        header ? emptyHead || (emptyHead = types.header_cell.createAndFill()) : empty || (empty = types.cell.createAndFill())
      );
    }
    const emptyRow = types.row.create(null, Fragment.from(cells)), rows = [];
    for (let i = map2.height; i < height; i++)
      rows.push(emptyRow);
    tr2.insert(tr2.mapping.slice(mapFrom).map(start + table.nodeSize - 2), rows);
  }
  return !!(empty || emptyHead);
}
function isolateHorizontal(tr2, map2, table, start, left, right, top, mapFrom) {
  if (top == 0 || top == map2.height)
    return false;
  let found = false;
  for (let col = left; col < right; col++) {
    const index = top * map2.width + col, pos = map2.map[index];
    if (map2.map[index - map2.width] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const { top: cellTop, left: cellLeft } = map2.findCell(pos);
      tr2.setNodeMarkup(tr2.mapping.slice(mapFrom).map(pos + start), null, {
        ...cell.attrs,
        rowspan: top - cellTop
      });
      tr2.insert(
        tr2.mapping.slice(mapFrom).map(map2.positionAt(top, cellLeft, table)),
        cell.type.createAndFill({
          ...cell.attrs,
          rowspan: cellTop + cell.attrs.rowspan - top
        })
      );
      col += cell.attrs.colspan - 1;
    }
  }
  return found;
}
function isolateVertical(tr2, map2, table, start, top, bottom, left, mapFrom) {
  if (left == 0 || left == map2.width)
    return false;
  let found = false;
  for (let row = top; row < bottom; row++) {
    const index = row * map2.width + left, pos = map2.map[index];
    if (map2.map[index - 1] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const cellLeft = map2.colCount(pos);
      const updatePos = tr2.mapping.slice(mapFrom).map(pos + start);
      tr2.setNodeMarkup(
        updatePos,
        null,
        removeColSpan(
          cell.attrs,
          left - cellLeft,
          cell.attrs.colspan - (left - cellLeft)
        )
      );
      tr2.insert(
        updatePos + cell.nodeSize,
        cell.type.createAndFill(
          removeColSpan(cell.attrs, 0, left - cellLeft)
        )
      );
      row += cell.attrs.rowspan - 1;
    }
  }
  return found;
}
function insertCells(state, dispatch, tableStart, rect, cells) {
  let table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc;
  if (!table) {
    throw new Error("No table found");
  }
  let map2 = TableMap.get(table);
  const { top, left } = rect;
  const right = left + cells.width, bottom = top + cells.height;
  const tr2 = state.tr;
  let mapFrom = 0;
  function recomp() {
    table = tableStart ? tr2.doc.nodeAt(tableStart - 1) : tr2.doc;
    if (!table) {
      throw new Error("No table found");
    }
    map2 = TableMap.get(table);
    mapFrom = tr2.mapping.maps.length;
  }
  if (growTable(tr2, map2, table, tableStart, right, bottom, mapFrom))
    recomp();
  if (isolateHorizontal(tr2, map2, table, tableStart, left, right, top, mapFrom))
    recomp();
  if (isolateHorizontal(tr2, map2, table, tableStart, left, right, bottom, mapFrom))
    recomp();
  if (isolateVertical(tr2, map2, table, tableStart, top, bottom, left, mapFrom))
    recomp();
  if (isolateVertical(tr2, map2, table, tableStart, top, bottom, right, mapFrom))
    recomp();
  for (let row = top; row < bottom; row++) {
    const from2 = map2.positionAt(row, left, table), to = map2.positionAt(row, right, table);
    tr2.replace(
      tr2.mapping.slice(mapFrom).map(from2 + tableStart),
      tr2.mapping.slice(mapFrom).map(to + tableStart),
      new Slice(cells.rows[row - top], 0, 0)
    );
  }
  recomp();
  tr2.setSelection(
    new CellSelection(
      tr2.doc.resolve(tableStart + map2.positionAt(top, left, table)),
      tr2.doc.resolve(tableStart + map2.positionAt(bottom - 1, right - 1, table))
    )
  );
  dispatch(tr2);
}
var handleKeyDown2 = keydownHandler({
  ArrowLeft: arrow2("horiz", -1),
  ArrowRight: arrow2("horiz", 1),
  ArrowUp: arrow2("vert", -1),
  ArrowDown: arrow2("vert", 1),
  "Shift-ArrowLeft": shiftArrow("horiz", -1),
  "Shift-ArrowRight": shiftArrow("horiz", 1),
  "Shift-ArrowUp": shiftArrow("vert", -1),
  "Shift-ArrowDown": shiftArrow("vert", 1),
  Backspace: deleteCellSelection,
  "Mod-Backspace": deleteCellSelection,
  Delete: deleteCellSelection,
  "Mod-Delete": deleteCellSelection
});
function maybeSetSelection(state, dispatch, selection) {
  if (selection.eq(state.selection))
    return false;
  if (dispatch)
    dispatch(state.tr.setSelection(selection).scrollIntoView());
  return true;
}
function arrow2(axis, dir) {
  return (state, dispatch, view) => {
    if (!view)
      return false;
    const sel = state.selection;
    if (sel instanceof CellSelection) {
      return maybeSetSelection(
        state,
        dispatch,
        Selection.near(sel.$headCell, dir)
      );
    }
    if (axis != "horiz" && !sel.empty)
      return false;
    const end = atEndOfCell(view, axis, dir);
    if (end == null)
      return false;
    if (axis == "horiz") {
      return maybeSetSelection(
        state,
        dispatch,
        Selection.near(state.doc.resolve(sel.head + dir), dir)
      );
    } else {
      const $cell = state.doc.resolve(end);
      const $next = nextCell($cell, axis, dir);
      let newSel;
      if ($next)
        newSel = Selection.near($next, 1);
      else if (dir < 0)
        newSel = Selection.near(state.doc.resolve($cell.before(-1)), -1);
      else
        newSel = Selection.near(state.doc.resolve($cell.after(-1)), 1);
      return maybeSetSelection(state, dispatch, newSel);
    }
  };
}
function shiftArrow(axis, dir) {
  return (state, dispatch, view) => {
    if (!view)
      return false;
    const sel = state.selection;
    let cellSel;
    if (sel instanceof CellSelection) {
      cellSel = sel;
    } else {
      const end = atEndOfCell(view, axis, dir);
      if (end == null)
        return false;
      cellSel = new CellSelection(state.doc.resolve(end));
    }
    const $head = nextCell(cellSel.$headCell, axis, dir);
    if (!$head)
      return false;
    return maybeSetSelection(
      state,
      dispatch,
      new CellSelection(cellSel.$anchorCell, $head)
    );
  };
}
function deleteCellSelection(state, dispatch) {
  const sel = state.selection;
  if (!(sel instanceof CellSelection))
    return false;
  if (dispatch) {
    const tr2 = state.tr;
    const baseContent = tableNodeTypes(state.schema).cell.createAndFill().content;
    sel.forEachCell((cell, pos) => {
      if (!cell.content.eq(baseContent))
        tr2.replace(
          tr2.mapping.map(pos + 1),
          tr2.mapping.map(pos + cell.nodeSize - 1),
          new Slice(baseContent, 0, 0)
        );
    });
    if (tr2.docChanged)
      dispatch(tr2);
  }
  return true;
}
function handleTripleClick(view, pos) {
  const doc = view.state.doc, $cell = cellAround(doc.resolve(pos));
  if (!$cell)
    return false;
  view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
  return true;
}
function handlePaste(view, _, slice2) {
  if (!isInTable(view.state))
    return false;
  let cells = pastedCells(slice2);
  const sel = view.state.selection;
  if (sel instanceof CellSelection) {
    if (!cells)
      cells = {
        width: 1,
        height: 1,
        rows: [
          Fragment.from(
            fitSlice(tableNodeTypes(view.state.schema).cell, slice2)
          )
        ]
      };
    const table = sel.$anchorCell.node(-1);
    const start = sel.$anchorCell.start(-1);
    const rect = TableMap.get(table).rectBetween(
      sel.$anchorCell.pos - start,
      sel.$headCell.pos - start
    );
    cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
    insertCells(view.state, view.dispatch, start, rect, cells);
    return true;
  } else if (cells) {
    const $cell = selectionCell(view.state);
    const start = $cell.start(-1);
    insertCells(
      view.state,
      view.dispatch,
      start,
      TableMap.get($cell.node(-1)).findCell($cell.pos - start),
      cells
    );
    return true;
  } else {
    return false;
  }
}
function handleMouseDown(view, startEvent) {
  var _a;
  if (startEvent.ctrlKey || startEvent.metaKey)
    return;
  const startDOMCell = domInCell(view, startEvent.target);
  let $anchor;
  if (startEvent.shiftKey && view.state.selection instanceof CellSelection) {
    setCellSelection(view.state.selection.$anchorCell, startEvent);
    startEvent.preventDefault();
  } else if (startEvent.shiftKey && startDOMCell && ($anchor = cellAround(view.state.selection.$anchor)) != null && ((_a = cellUnderMouse(view, startEvent)) == null ? void 0 : _a.pos) != $anchor.pos) {
    setCellSelection($anchor, startEvent);
    startEvent.preventDefault();
  } else if (!startDOMCell) {
    return;
  }
  function setCellSelection($anchor2, event) {
    let $head = cellUnderMouse(view, event);
    const starting = tableEditingKey.getState(view.state) == null;
    if (!$head || !inSameTable($anchor2, $head)) {
      if (starting)
        $head = $anchor2;
      else
        return;
    }
    const selection = new CellSelection($anchor2, $head);
    if (starting || !view.state.selection.eq(selection)) {
      const tr2 = view.state.tr.setSelection(selection);
      if (starting)
        tr2.setMeta(tableEditingKey, $anchor2.pos);
      view.dispatch(tr2);
    }
  }
  function stop() {
    view.root.removeEventListener("mouseup", stop);
    view.root.removeEventListener("dragstart", stop);
    view.root.removeEventListener("mousemove", move);
    if (tableEditingKey.getState(view.state) != null)
      view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
  }
  function move(_event) {
    const event = _event;
    const anchor = tableEditingKey.getState(view.state);
    let $anchor2;
    if (anchor != null) {
      $anchor2 = view.state.doc.resolve(anchor);
    } else if (domInCell(view, event.target) != startDOMCell) {
      $anchor2 = cellUnderMouse(view, startEvent);
      if (!$anchor2)
        return stop();
    }
    if ($anchor2)
      setCellSelection($anchor2, event);
  }
  view.root.addEventListener("mouseup", stop);
  view.root.addEventListener("dragstart", stop);
  view.root.addEventListener("mousemove", move);
}
function atEndOfCell(view, axis, dir) {
  if (!(view.state.selection instanceof TextSelection))
    return null;
  const { $head } = view.state.selection;
  for (let d = $head.depth - 1; d >= 0; d--) {
    const parent = $head.node(d), index = dir < 0 ? $head.index(d) : $head.indexAfter(d);
    if (index != (dir < 0 ? 0 : parent.childCount))
      return null;
    if (parent.type.spec.tableRole == "cell" || parent.type.spec.tableRole == "header_cell") {
      const cellPos = $head.before(d);
      const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
      return view.endOfTextblock(dirStr) ? cellPos : null;
    }
  }
  return null;
}
function domInCell(view, dom) {
  for (; dom && dom != view.dom; dom = dom.parentNode) {
    if (dom.nodeName == "TD" || dom.nodeName == "TH") {
      return dom;
    }
  }
  return null;
}
function cellUnderMouse(view, event) {
  const mousePos = view.posAtCoords({
    left: event.clientX,
    top: event.clientY
  });
  if (!mousePos)
    return null;
  return mousePos ? cellAround(view.state.doc.resolve(mousePos.pos)) : null;
}
var TableView = class {
  constructor(node, cellMinWidth) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    updateColumnsOnResize(node, this.colgroup, this.table, cellMinWidth);
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(node) {
    if (node.type != this.node.type)
      return false;
    this.node = node;
    updateColumnsOnResize(node, this.colgroup, this.table, this.cellMinWidth);
    return true;
  }
  ignoreMutation(record) {
    return record.type == "attributes" && (record.target == this.table || this.colgroup.contains(record.target));
  }
};
function updateColumnsOnResize(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
  var _a;
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild;
  const row = node.firstChild;
  if (!row)
    return;
  for (let i = 0, col = 0; i < row.childCount; i++) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j++, col++) {
      const hasWidth = overrideCol == col ? overrideValue : colwidth && colwidth[j];
      const cssWidth = hasWidth ? hasWidth + "px" : "";
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth)
        fixedWidth = false;
      if (!nextDOM) {
        colgroup.appendChild(document.createElement("col")).style.width = cssWidth;
      } else {
        if (nextDOM.style.width != cssWidth)
          nextDOM.style.width = cssWidth;
        nextDOM = nextDOM.nextSibling;
      }
    }
  }
  while (nextDOM) {
    const after = nextDOM.nextSibling;
    (_a = nextDOM.parentNode) == null ? void 0 : _a.removeChild(nextDOM);
    nextDOM = after;
  }
  if (fixedWidth) {
    table.style.width = totalWidth + "px";
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = totalWidth + "px";
  }
}
var columnResizingPluginKey = new PluginKey(
  "tableColumnResizing"
);
function columnResizing({
  handleWidth = 5,
  cellMinWidth = 25,
  View = TableView,
  lastColumnResizable = true
} = {}) {
  const plugin = new Plugin({
    key: columnResizingPluginKey,
    state: {
      init(_, state) {
        plugin.spec.props.nodeViews[tableNodeTypes(state.schema).table.name] = (node, view) => new View(node, cellMinWidth, view);
        return new ResizeState(-1, false);
      },
      apply(tr2, prev) {
        return prev.apply(tr2);
      }
    },
    props: {
      attributes: (state) => {
        const pluginState = columnResizingPluginKey.getState(state);
        return pluginState && pluginState.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (view, event) => {
          handleMouseMove(
            view,
            event,
            handleWidth,
            cellMinWidth,
            lastColumnResizable
          );
        },
        mouseleave: (view) => {
          handleMouseLeave(view);
        },
        mousedown: (view, event) => {
          handleMouseDown2(view, event, cellMinWidth);
        }
      },
      decorations: (state) => {
        const pluginState = columnResizingPluginKey.getState(state);
        if (pluginState && pluginState.activeHandle > -1) {
          return handleDecorations(state, pluginState.activeHandle);
        }
      },
      nodeViews: {}
    }
  });
  return plugin;
}
var ResizeState = class _ResizeState {
  constructor(activeHandle, dragging) {
    this.activeHandle = activeHandle;
    this.dragging = dragging;
  }
  apply(tr2) {
    const state = this;
    const action = tr2.getMeta(columnResizingPluginKey);
    if (action && action.setHandle != null)
      return new _ResizeState(action.setHandle, false);
    if (action && action.setDragging !== void 0)
      return new _ResizeState(state.activeHandle, action.setDragging);
    if (state.activeHandle > -1 && tr2.docChanged) {
      let handle = tr2.mapping.map(state.activeHandle, -1);
      if (!pointsAtCell(tr2.doc.resolve(handle))) {
        handle = -1;
      }
      return new _ResizeState(handle, state.dragging);
    }
    return state;
  }
};
function handleMouseMove(view, event, handleWidth, cellMinWidth, lastColumnResizable) {
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState)
    return;
  if (!pluginState.dragging) {
    const target = domCellAround(event.target);
    let cell = -1;
    if (target) {
      const { left, right } = target.getBoundingClientRect();
      if (event.clientX - left <= handleWidth)
        cell = edgeCell(view, event, "left", handleWidth);
      else if (right - event.clientX <= handleWidth)
        cell = edgeCell(view, event, "right", handleWidth);
    }
    if (cell != pluginState.activeHandle) {
      if (!lastColumnResizable && cell !== -1) {
        const $cell = view.state.doc.resolve(cell);
        const table = $cell.node(-1);
        const map2 = TableMap.get(table);
        const tableStart = $cell.start(-1);
        const col = map2.colCount($cell.pos - tableStart) + $cell.nodeAfter.attrs.colspan - 1;
        if (col == map2.width - 1) {
          return;
        }
      }
      updateHandle(view, cell);
    }
  }
}
function handleMouseLeave(view) {
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (pluginState && pluginState.activeHandle > -1 && !pluginState.dragging)
    updateHandle(view, -1);
}
function handleMouseDown2(view, event, cellMinWidth) {
  var _a;
  const win = (_a = view.dom.ownerDocument.defaultView) != null ? _a : window;
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState || pluginState.activeHandle == -1 || pluginState.dragging)
    return false;
  const cell = view.state.doc.nodeAt(pluginState.activeHandle);
  const width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
  view.dispatch(
    view.state.tr.setMeta(columnResizingPluginKey, {
      setDragging: { startX: event.clientX, startWidth: width }
    })
  );
  function finish(event2) {
    win.removeEventListener("mouseup", finish);
    win.removeEventListener("mousemove", move);
    const pluginState2 = columnResizingPluginKey.getState(view.state);
    if (pluginState2 == null ? void 0 : pluginState2.dragging) {
      updateColumnWidth(
        view,
        pluginState2.activeHandle,
        draggedWidth(pluginState2.dragging, event2, cellMinWidth)
      );
      view.dispatch(
        view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null })
      );
    }
  }
  function move(event2) {
    if (!event2.which)
      return finish(event2);
    const pluginState2 = columnResizingPluginKey.getState(view.state);
    if (!pluginState2)
      return;
    if (pluginState2.dragging) {
      const dragged = draggedWidth(pluginState2.dragging, event2, cellMinWidth);
      displayColumnWidth(view, pluginState2.activeHandle, dragged, cellMinWidth);
    }
  }
  win.addEventListener("mouseup", finish);
  win.addEventListener("mousemove", move);
  event.preventDefault();
  return true;
}
function currentColWidth(view, cellPos, { colspan, colwidth }) {
  const width = colwidth && colwidth[colwidth.length - 1];
  if (width)
    return width;
  const dom = view.domAtPos(cellPos);
  const node = dom.node.childNodes[dom.offset];
  let domWidth = node.offsetWidth, parts = colspan;
  if (colwidth) {
    for (let i = 0; i < colspan; i++)
      if (colwidth[i]) {
        domWidth -= colwidth[i];
        parts--;
      }
  }
  return domWidth / parts;
}
function domCellAround(target) {
  while (target && target.nodeName != "TD" && target.nodeName != "TH")
    target = target.classList && target.classList.contains("ProseMirror") ? null : target.parentNode;
  return target;
}
function edgeCell(view, event, side, handleWidth) {
  const offset = side == "right" ? -handleWidth : handleWidth;
  const found = view.posAtCoords({
    left: event.clientX + offset,
    top: event.clientY
  });
  if (!found)
    return -1;
  const { pos } = found;
  const $cell = cellAround(view.state.doc.resolve(pos));
  if (!$cell)
    return -1;
  if (side == "right")
    return $cell.pos;
  const map2 = TableMap.get($cell.node(-1)), start = $cell.start(-1);
  const index = map2.map.indexOf($cell.pos - start);
  return index % map2.width == 0 ? -1 : start + map2.map[index - 1];
}
function draggedWidth(dragging, event, cellMinWidth) {
  const offset = event.clientX - dragging.startX;
  return Math.max(cellMinWidth, dragging.startWidth + offset);
}
function updateHandle(view, value) {
  view.dispatch(
    view.state.tr.setMeta(columnResizingPluginKey, { setHandle: value })
  );
}
function updateColumnWidth(view, cell, width) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-1), map2 = TableMap.get(table), start = $cell.start(-1);
  const col = map2.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  const tr2 = view.state.tr;
  for (let row = 0; row < map2.height; row++) {
    const mapIndex = row * map2.width + col;
    if (row && map2.map[mapIndex] == map2.map[mapIndex - map2.width])
      continue;
    const pos = map2.map[mapIndex];
    const attrs = table.nodeAt(pos).attrs;
    const index = attrs.colspan == 1 ? 0 : col - map2.colCount(pos);
    if (attrs.colwidth && attrs.colwidth[index] == width)
      continue;
    const colwidth = attrs.colwidth ? attrs.colwidth.slice() : zeroes(attrs.colspan);
    colwidth[index] = width;
    tr2.setNodeMarkup(start + pos, null, { ...attrs, colwidth });
  }
  if (tr2.docChanged)
    view.dispatch(tr2);
}
function displayColumnWidth(view, cell, width, cellMinWidth) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-1), start = $cell.start(-1);
  const col = TableMap.get(table).colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  let dom = view.domAtPos($cell.start(-1)).node;
  while (dom && dom.nodeName != "TABLE") {
    dom = dom.parentNode;
  }
  if (!dom)
    return;
  updateColumnsOnResize(
    table,
    dom.firstChild,
    dom,
    cellMinWidth,
    col,
    width
  );
}
function zeroes(n) {
  return Array(n).fill(0);
}
function handleDecorations(state, cell) {
  const decorations = [];
  const $cell = state.doc.resolve(cell);
  const table = $cell.node(-1);
  if (!table) {
    return DecorationSet.empty;
  }
  const map2 = TableMap.get(table);
  const start = $cell.start(-1);
  const col = map2.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan;
  for (let row = 0; row < map2.height; row++) {
    const index = col + row * map2.width - 1;
    if ((col == map2.width || map2.map[index] != map2.map[index + 1]) && (row == 0 || map2.map[index] != map2.map[index - map2.width])) {
      const cellPos = map2.map[index];
      const pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
      const dom = document.createElement("div");
      dom.className = "column-resize-handle";
      decorations.push(Decoration.widget(pos, dom));
    }
  }
  return DecorationSet.create(state.doc, decorations);
}
function selectedRect(state) {
  const sel = state.selection;
  const $pos = selectionCell(state);
  const table = $pos.node(-1);
  const tableStart = $pos.start(-1);
  const map2 = TableMap.get(table);
  const rect = sel instanceof CellSelection ? map2.rectBetween(
    sel.$anchorCell.pos - tableStart,
    sel.$headCell.pos - tableStart
  ) : map2.findCell($pos.pos - tableStart);
  return { ...rect, tableStart, map: map2, table };
}
function addColumn(tr2, { map: map2, tableStart, table }, col) {
  let refColumn = col > 0 ? -1 : 0;
  if (columnIsHeader(map2, table, col + refColumn)) {
    refColumn = col == 0 || col == map2.width ? null : 0;
  }
  for (let row = 0; row < map2.height; row++) {
    const index = row * map2.width + col;
    if (col > 0 && col < map2.width && map2.map[index - 1] == map2.map[index]) {
      const pos = map2.map[index];
      const cell = table.nodeAt(pos);
      tr2.setNodeMarkup(
        tr2.mapping.map(tableStart + pos),
        null,
        addColSpan(cell.attrs, col - map2.colCount(pos))
      );
      row += cell.attrs.rowspan - 1;
    } else {
      const type = refColumn == null ? tableNodeTypes(table.type.schema).cell : table.nodeAt(map2.map[index + refColumn]).type;
      const pos = map2.positionAt(row, col, table);
      tr2.insert(tr2.mapping.map(tableStart + pos), type.createAndFill());
    }
  }
  return tr2;
}
function addColumnBefore(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.left));
  }
  return true;
}
function addColumnAfter(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.right));
  }
  return true;
}
function removeColumn(tr2, { map: map2, table, tableStart }, col) {
  const mapStart = tr2.mapping.maps.length;
  for (let row = 0; row < map2.height; ) {
    const index = row * map2.width + col;
    const pos = map2.map[index];
    const cell = table.nodeAt(pos);
    const attrs = cell.attrs;
    if (col > 0 && map2.map[index - 1] == pos || col < map2.width - 1 && map2.map[index + 1] == pos) {
      tr2.setNodeMarkup(
        tr2.mapping.slice(mapStart).map(tableStart + pos),
        null,
        removeColSpan(attrs, col - map2.colCount(pos))
      );
    } else {
      const start = tr2.mapping.slice(mapStart).map(tableStart + pos);
      tr2.delete(start, start + cell.nodeSize);
    }
    row += attrs.rowspan;
  }
}
function deleteColumn(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state);
    const tr2 = state.tr;
    if (rect.left == 0 && rect.right == rect.map.width)
      return false;
    for (let i = rect.right - 1; ; i--) {
      removeColumn(tr2, rect, i);
      if (i == rect.left)
        break;
      const table = rect.tableStart ? tr2.doc.nodeAt(rect.tableStart - 1) : tr2.doc;
      if (!table) {
        throw RangeError("No table found");
      }
      rect.table = table;
      rect.map = TableMap.get(table);
    }
    dispatch(tr2);
  }
  return true;
}
function rowIsHeader(map2, table, row) {
  var _a;
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let col = 0; col < map2.width; col++)
    if (((_a = table.nodeAt(map2.map[col + row * map2.width])) == null ? void 0 : _a.type) != headerCell)
      return false;
  return true;
}
function addRow(tr2, { map: map2, tableStart, table }, row) {
  var _a;
  let rowPos = tableStart;
  for (let i = 0; i < row; i++)
    rowPos += table.child(i).nodeSize;
  const cells = [];
  let refRow = row > 0 ? -1 : 0;
  if (rowIsHeader(map2, table, row + refRow))
    refRow = row == 0 || row == map2.height ? null : 0;
  for (let col = 0, index = map2.width * row; col < map2.width; col++, index++) {
    if (row > 0 && row < map2.height && map2.map[index] == map2.map[index - map2.width]) {
      const pos = map2.map[index];
      const attrs = table.nodeAt(pos).attrs;
      tr2.setNodeMarkup(tableStart + pos, null, {
        ...attrs,
        rowspan: attrs.rowspan + 1
      });
      col += attrs.colspan - 1;
    } else {
      const type = refRow == null ? tableNodeTypes(table.type.schema).cell : (_a = table.nodeAt(map2.map[index + refRow * map2.width])) == null ? void 0 : _a.type;
      const node = type == null ? void 0 : type.createAndFill();
      if (node)
        cells.push(node);
    }
  }
  tr2.insert(rowPos, tableNodeTypes(table.type.schema).row.create(null, cells));
  return tr2;
}
function addRowBefore(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.top));
  }
  return true;
}
function addRowAfter(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.bottom));
  }
  return true;
}
function removeRow(tr2, { map: map2, table, tableStart }, row) {
  let rowPos = 0;
  for (let i = 0; i < row; i++)
    rowPos += table.child(i).nodeSize;
  const nextRow = rowPos + table.child(row).nodeSize;
  const mapFrom = tr2.mapping.maps.length;
  tr2.delete(rowPos + tableStart, nextRow + tableStart);
  const seen = /* @__PURE__ */ new Set();
  for (let col = 0, index = row * map2.width; col < map2.width; col++, index++) {
    const pos = map2.map[index];
    if (seen.has(pos))
      continue;
    seen.add(pos);
    if (row > 0 && pos == map2.map[index - map2.width]) {
      const attrs = table.nodeAt(pos).attrs;
      tr2.setNodeMarkup(tr2.mapping.slice(mapFrom).map(pos + tableStart), null, {
        ...attrs,
        rowspan: attrs.rowspan - 1
      });
      col += attrs.colspan - 1;
    } else if (row < map2.height && pos == map2.map[index + map2.width]) {
      const cell = table.nodeAt(pos);
      const attrs = cell.attrs;
      const copy = cell.type.create(
        { ...attrs, rowspan: cell.attrs.rowspan - 1 },
        cell.content
      );
      const newPos = map2.positionAt(row + 1, col, table);
      tr2.insert(tr2.mapping.slice(mapFrom).map(tableStart + newPos), copy);
      col += attrs.colspan - 1;
    }
  }
}
function deleteRow(state, dispatch) {
  if (!isInTable(state))
    return false;
  if (dispatch) {
    const rect = selectedRect(state), tr2 = state.tr;
    if (rect.top == 0 && rect.bottom == rect.map.height)
      return false;
    for (let i = rect.bottom - 1; ; i--) {
      removeRow(tr2, rect, i);
      if (i == rect.top)
        break;
      const table = rect.tableStart ? tr2.doc.nodeAt(rect.tableStart - 1) : tr2.doc;
      if (!table) {
        throw RangeError("No table found");
      }
      rect.table = table;
      rect.map = TableMap.get(rect.table);
    }
    dispatch(tr2);
  }
  return true;
}
function isEmpty(cell) {
  const c = cell.content;
  return c.childCount == 1 && c.child(0).isTextblock && c.child(0).childCount == 0;
}
function cellsOverlapRectangle({ width, height, map: map2 }, rect) {
  let indexTop = rect.top * width + rect.left, indexLeft = indexTop;
  let indexBottom = (rect.bottom - 1) * width + rect.left, indexRight = indexTop + (rect.right - rect.left - 1);
  for (let i = rect.top; i < rect.bottom; i++) {
    if (rect.left > 0 && map2[indexLeft] == map2[indexLeft - 1] || rect.right < width && map2[indexRight] == map2[indexRight + 1])
      return true;
    indexLeft += width;
    indexRight += width;
  }
  for (let i = rect.left; i < rect.right; i++) {
    if (rect.top > 0 && map2[indexTop] == map2[indexTop - width] || rect.bottom < height && map2[indexBottom] == map2[indexBottom + width])
      return true;
    indexTop++;
    indexBottom++;
  }
  return false;
}
function mergeCells(state, dispatch) {
  const sel = state.selection;
  if (!(sel instanceof CellSelection) || sel.$anchorCell.pos == sel.$headCell.pos)
    return false;
  const rect = selectedRect(state), { map: map2 } = rect;
  if (cellsOverlapRectangle(map2, rect))
    return false;
  if (dispatch) {
    const tr2 = state.tr;
    const seen = {};
    let content = Fragment.empty;
    let mergedPos;
    let mergedCell;
    for (let row = rect.top; row < rect.bottom; row++) {
      for (let col = rect.left; col < rect.right; col++) {
        const cellPos = map2.map[row * map2.width + col];
        const cell = rect.table.nodeAt(cellPos);
        if (seen[cellPos] || !cell)
          continue;
        seen[cellPos] = true;
        if (mergedPos == null) {
          mergedPos = cellPos;
          mergedCell = cell;
        } else {
          if (!isEmpty(cell))
            content = content.append(cell.content);
          const mapped = tr2.mapping.map(cellPos + rect.tableStart);
          tr2.delete(mapped, mapped + cell.nodeSize);
        }
      }
    }
    if (mergedPos == null || mergedCell == null) {
      return true;
    }
    tr2.setNodeMarkup(mergedPos + rect.tableStart, null, {
      ...addColSpan(
        mergedCell.attrs,
        mergedCell.attrs.colspan,
        rect.right - rect.left - mergedCell.attrs.colspan
      ),
      rowspan: rect.bottom - rect.top
    });
    if (content.size) {
      const end = mergedPos + 1 + mergedCell.content.size;
      const start = isEmpty(mergedCell) ? mergedPos + 1 : end;
      tr2.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
    }
    tr2.setSelection(
      new CellSelection(tr2.doc.resolve(mergedPos + rect.tableStart))
    );
    dispatch(tr2);
  }
  return true;
}
function splitCell(state, dispatch) {
  const nodeTypes = tableNodeTypes(state.schema);
  return splitCellWithType(({ node }) => {
    return nodeTypes[node.type.spec.tableRole];
  })(state, dispatch);
}
function splitCellWithType(getCellType) {
  return (state, dispatch) => {
    var _a;
    const sel = state.selection;
    let cellNode;
    let cellPos;
    if (!(sel instanceof CellSelection)) {
      cellNode = cellWrapping(sel.$from);
      if (!cellNode)
        return false;
      cellPos = (_a = cellAround(sel.$from)) == null ? void 0 : _a.pos;
    } else {
      if (sel.$anchorCell.pos != sel.$headCell.pos)
        return false;
      cellNode = sel.$anchorCell.nodeAfter;
      cellPos = sel.$anchorCell.pos;
    }
    if (cellNode == null || cellPos == null) {
      return false;
    }
    if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) {
      return false;
    }
    if (dispatch) {
      let baseAttrs = cellNode.attrs;
      const attrs = [];
      const colwidth = baseAttrs.colwidth;
      if (baseAttrs.rowspan > 1)
        baseAttrs = { ...baseAttrs, rowspan: 1 };
      if (baseAttrs.colspan > 1)
        baseAttrs = { ...baseAttrs, colspan: 1 };
      const rect = selectedRect(state), tr2 = state.tr;
      for (let i = 0; i < rect.right - rect.left; i++)
        attrs.push(
          colwidth ? {
            ...baseAttrs,
            colwidth: colwidth && colwidth[i] ? [colwidth[i]] : null
          } : baseAttrs
        );
      let lastCell;
      for (let row = rect.top; row < rect.bottom; row++) {
        let pos = rect.map.positionAt(row, rect.left, rect.table);
        if (row == rect.top)
          pos += cellNode.nodeSize;
        for (let col = rect.left, i = 0; col < rect.right; col++, i++) {
          if (col == rect.left && row == rect.top)
            continue;
          tr2.insert(
            lastCell = tr2.mapping.map(pos + rect.tableStart, 1),
            getCellType({ node: cellNode, row, col }).createAndFill(attrs[i])
          );
        }
      }
      tr2.setNodeMarkup(
        cellPos,
        getCellType({ node: cellNode, row: rect.top, col: rect.left }),
        attrs[0]
      );
      if (sel instanceof CellSelection)
        tr2.setSelection(
          new CellSelection(
            tr2.doc.resolve(sel.$anchorCell.pos),
            lastCell ? tr2.doc.resolve(lastCell) : void 0
          )
        );
      dispatch(tr2);
    }
    return true;
  };
}
function setCellAttr(name, value) {
  return function(state, dispatch) {
    if (!isInTable(state))
      return false;
    const $cell = selectionCell(state);
    if ($cell.nodeAfter.attrs[name] === value)
      return false;
    if (dispatch) {
      const tr2 = state.tr;
      if (state.selection instanceof CellSelection)
        state.selection.forEachCell((node, pos) => {
          if (node.attrs[name] !== value)
            tr2.setNodeMarkup(pos, null, {
              ...node.attrs,
              [name]: value
            });
        });
      else
        tr2.setNodeMarkup($cell.pos, null, {
          ...$cell.nodeAfter.attrs,
          [name]: value
        });
      dispatch(tr2);
    }
    return true;
  };
}
function deprecated_toggleHeader(type) {
  return function(state, dispatch) {
    if (!isInTable(state))
      return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state), tr2 = state.tr;
      const cells = rect.map.cellsInRect(
        type == "column" ? {
          left: rect.left,
          top: 0,
          right: rect.right,
          bottom: rect.map.height
        } : type == "row" ? {
          left: 0,
          top: rect.top,
          right: rect.map.width,
          bottom: rect.bottom
        } : rect
      );
      const nodes = cells.map((pos) => rect.table.nodeAt(pos));
      for (let i = 0; i < cells.length; i++)
        if (nodes[i].type == types.header_cell)
          tr2.setNodeMarkup(
            rect.tableStart + cells[i],
            types.cell,
            nodes[i].attrs
          );
      if (tr2.steps.length == 0)
        for (let i = 0; i < cells.length; i++)
          tr2.setNodeMarkup(
            rect.tableStart + cells[i],
            types.header_cell,
            nodes[i].attrs
          );
      dispatch(tr2);
    }
    return true;
  };
}
function isHeaderEnabledByType(type, rect, types) {
  const cellPositions = rect.map.cellsInRect({
    left: 0,
    top: 0,
    right: type == "row" ? rect.map.width : 1,
    bottom: type == "column" ? rect.map.height : 1
  });
  for (let i = 0; i < cellPositions.length; i++) {
    const cell = rect.table.nodeAt(cellPositions[i]);
    if (cell && cell.type !== types.header_cell) {
      return false;
    }
  }
  return true;
}
function toggleHeader(type, options) {
  options = options || { useDeprecatedLogic: false };
  if (options.useDeprecatedLogic)
    return deprecated_toggleHeader(type);
  return function(state, dispatch) {
    if (!isInTable(state))
      return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state), tr2 = state.tr;
      const isHeaderRowEnabled = isHeaderEnabledByType("row", rect, types);
      const isHeaderColumnEnabled = isHeaderEnabledByType(
        "column",
        rect,
        types
      );
      const isHeaderEnabled = type === "column" ? isHeaderRowEnabled : type === "row" ? isHeaderColumnEnabled : false;
      const selectionStartsAt = isHeaderEnabled ? 1 : 0;
      const cellsRect = type == "column" ? {
        left: 0,
        top: selectionStartsAt,
        right: 1,
        bottom: rect.map.height
      } : type == "row" ? {
        left: selectionStartsAt,
        top: 0,
        right: rect.map.width,
        bottom: 1
      } : rect;
      const newType = type == "column" ? isHeaderColumnEnabled ? types.cell : types.header_cell : type == "row" ? isHeaderRowEnabled ? types.cell : types.header_cell : types.cell;
      rect.map.cellsInRect(cellsRect).forEach((relativeCellPos) => {
        const cellPos = relativeCellPos + rect.tableStart;
        const cell = tr2.doc.nodeAt(cellPos);
        if (cell) {
          tr2.setNodeMarkup(cellPos, newType, cell.attrs);
        }
      });
      dispatch(tr2);
    }
    return true;
  };
}
var toggleHeaderRow = toggleHeader("row", {
  useDeprecatedLogic: true
});
var toggleHeaderColumn = toggleHeader("column", {
  useDeprecatedLogic: true
});
var toggleHeaderCell = toggleHeader("cell", {
  useDeprecatedLogic: true
});
function findNextCell($cell, dir) {
  if (dir < 0) {
    const before = $cell.nodeBefore;
    if (before)
      return $cell.pos - before.nodeSize;
    for (let row = $cell.index(-1) - 1, rowEnd = $cell.before(); row >= 0; row--) {
      const rowNode = $cell.node(-1).child(row);
      const lastChild = rowNode.lastChild;
      if (lastChild) {
        return rowEnd - 1 - lastChild.nodeSize;
      }
      rowEnd -= rowNode.nodeSize;
    }
  } else {
    if ($cell.index() < $cell.parent.childCount - 1) {
      return $cell.pos + $cell.nodeAfter.nodeSize;
    }
    const table = $cell.node(-1);
    for (let row = $cell.indexAfter(-1), rowStart = $cell.after(); row < table.childCount; row++) {
      const rowNode = table.child(row);
      if (rowNode.childCount)
        return rowStart + 1;
      rowStart += rowNode.nodeSize;
    }
  }
  return null;
}
function goToNextCell(direction) {
  return function(state, dispatch) {
    if (!isInTable(state))
      return false;
    const cell = findNextCell(selectionCell(state), direction);
    if (cell == null)
      return false;
    if (dispatch) {
      const $cell = state.doc.resolve(cell);
      dispatch(
        state.tr.setSelection(TextSelection.between($cell, moveCellForward($cell))).scrollIntoView()
      );
    }
    return true;
  };
}
function deleteTable(state, dispatch) {
  const $pos = state.selection.$anchor;
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    if (node.type.spec.tableRole == "table") {
      if (dispatch)
        dispatch(
          state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView()
        );
      return true;
    }
  }
  return false;
}
function tableEditing({
  allowTableNodeSelection = false
} = {}) {
  return new Plugin({
    key: tableEditingKey,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(tr2, cur) {
        const set = tr2.getMeta(tableEditingKey);
        if (set != null)
          return set == -1 ? null : set;
        if (cur == null || !tr2.docChanged)
          return cur;
        const { deleted, pos } = tr2.mapping.mapResult(cur);
        return deleted ? null : pos;
      }
    },
    props: {
      decorations: drawCellSelection,
      handleDOMEvents: {
        mousedown: handleMouseDown
      },
      createSelectionBetween(view) {
        return tableEditingKey.getState(view.state) != null ? view.state.selection : null;
      },
      handleTripleClick,
      handleKeyDown: handleKeyDown2,
      handlePaste
    },
    appendTransaction(_, oldState, state) {
      return normalizeSelection(
        state,
        fixTables(state, oldState),
        allowTableNodeSelection
      );
    }
  });
}

// node_modules/@tiptap/extension-table/dist/index.js
function updateColumns(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild;
  const row = node.firstChild;
  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
      const cssWidth = hasWidth ? `${hasWidth}px` : "";
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) {
        fixedWidth = false;
      }
      if (!nextDOM) {
        colgroup.appendChild(document.createElement("col")).style.width = cssWidth;
      } else {
        if (nextDOM.style.width !== cssWidth) {
          nextDOM.style.width = cssWidth;
        }
        nextDOM = nextDOM.nextSibling;
      }
    }
  }
  while (nextDOM) {
    const after = nextDOM.nextSibling;
    nextDOM.parentNode.removeChild(nextDOM);
    nextDOM = after;
  }
  if (fixedWidth) {
    table.style.width = `${totalWidth}px`;
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = `${totalWidth}px`;
  }
}
var TableView2 = class {
  constructor(node, cellMinWidth) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    updateColumns(node, this.colgroup, this.table, cellMinWidth);
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
    return true;
  }
  ignoreMutation(mutation) {
    return mutation.type === "attributes" && (mutation.target === this.table || this.colgroup.contains(mutation.target));
  }
};
function createColGroup(node, cellMinWidth, overrideCol, overrideValue) {
  let totalWidth = 0;
  let fixedWidth = true;
  const cols = [];
  const row = node.firstChild;
  if (!row) {
    return {};
  }
  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
      const cssWidth = hasWidth ? `${hasWidth}px` : "";
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) {
        fixedWidth = false;
      }
      cols.push(["col", cssWidth ? { style: `width: ${cssWidth}` } : {}]);
    }
  }
  const tableWidth = fixedWidth ? `${totalWidth}px` : "";
  const tableMinWidth = fixedWidth ? "" : `${totalWidth}px`;
  const colgroup = ["colgroup", {}, ...cols];
  return { colgroup, tableWidth, tableMinWidth };
}
function createCell(cellType, cellContent) {
  if (cellContent) {
    return cellType.createChecked(null, cellContent);
  }
  return cellType.createAndFill();
}
function getTableNodeTypes(schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes;
  }
  const roles = {};
  Object.keys(schema.nodes).forEach((type) => {
    const nodeType = schema.nodes[type];
    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType;
    }
  });
  schema.cached.tableNodeTypes = roles;
  return roles;
}
function createTable(schema, rowsCount, colsCount, withHeaderRow, cellContent) {
  const types = getTableNodeTypes(schema);
  const headerCells = [];
  const cells = [];
  for (let index = 0; index < colsCount; index += 1) {
    const cell = createCell(types.cell, cellContent);
    if (cell) {
      cells.push(cell);
    }
    if (withHeaderRow) {
      const headerCell = createCell(types.header_cell, cellContent);
      if (headerCell) {
        headerCells.push(headerCell);
      }
    }
  }
  const rows = [];
  for (let index = 0; index < rowsCount; index += 1) {
    rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
  }
  return types.table.createChecked(null, rows);
}
function isCellSelection(value) {
  return value instanceof CellSelection;
}
var deleteTableWhenAllCellsSelected = ({ editor }) => {
  const { selection } = editor.state;
  if (!isCellSelection(selection)) {
    return false;
  }
  let cellCount = 0;
  const table = findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
    return node.type.name === "table";
  });
  table === null || table === void 0 ? void 0 : table.node.descendants((node) => {
    if (node.type.name === "table") {
      return false;
    }
    if (["tableCell", "tableHeader"].includes(node.type.name)) {
      cellCount += 1;
    }
  });
  const allCellsSelected = cellCount === selection.ranges.length;
  if (!allCellsSelected) {
    return false;
  }
  editor.commands.deleteTable();
  return true;
};
var Table = Node.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: false,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: TableView2,
      lastColumnResizable: true,
      allowTableNodeSelection: false
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: true,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);
    const table = [
      "table",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: tableWidth ? `width: ${tableWidth}` : `minWidth: ${tableMinWidth}`
      }),
      colgroup,
      ["tbody", 0]
    ];
    return table;
  },
  addCommands() {
    return {
      insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ tr: tr2, dispatch, editor }) => {
        const node = createTable(editor.schema, rows, cols, withHeaderRow);
        if (dispatch) {
          const offset = tr2.selection.anchor + 1;
          tr2.replaceSelectionWith(node).scrollIntoView().setSelection(TextSelection.near(tr2.doc.resolve(offset)));
        }
        return true;
      },
      addColumnBefore: () => ({ state, dispatch }) => {
        return addColumnBefore(state, dispatch);
      },
      addColumnAfter: () => ({ state, dispatch }) => {
        return addColumnAfter(state, dispatch);
      },
      deleteColumn: () => ({ state, dispatch }) => {
        return deleteColumn(state, dispatch);
      },
      addRowBefore: () => ({ state, dispatch }) => {
        return addRowBefore(state, dispatch);
      },
      addRowAfter: () => ({ state, dispatch }) => {
        return addRowAfter(state, dispatch);
      },
      deleteRow: () => ({ state, dispatch }) => {
        return deleteRow(state, dispatch);
      },
      deleteTable: () => ({ state, dispatch }) => {
        return deleteTable(state, dispatch);
      },
      mergeCells: () => ({ state, dispatch }) => {
        return mergeCells(state, dispatch);
      },
      splitCell: () => ({ state, dispatch }) => {
        return splitCell(state, dispatch);
      },
      toggleHeaderColumn: () => ({ state, dispatch }) => {
        return toggleHeader("column")(state, dispatch);
      },
      toggleHeaderRow: () => ({ state, dispatch }) => {
        return toggleHeader("row")(state, dispatch);
      },
      toggleHeaderCell: () => ({ state, dispatch }) => {
        return toggleHeaderCell(state, dispatch);
      },
      mergeOrSplit: () => ({ state, dispatch }) => {
        if (mergeCells(state, dispatch)) {
          return true;
        }
        return splitCell(state, dispatch);
      },
      setCellAttribute: (name, value) => ({ state, dispatch }) => {
        return setCellAttr(name, value)(state, dispatch);
      },
      goToNextCell: () => ({ state, dispatch }) => {
        return goToNextCell(1)(state, dispatch);
      },
      goToPreviousCell: () => ({ state, dispatch }) => {
        return goToNextCell(-1)(state, dispatch);
      },
      fixTables: () => ({ state, dispatch }) => {
        if (dispatch) {
          fixTables(state);
        }
        return true;
      },
      setCellSelection: (position) => ({ tr: tr2, dispatch }) => {
        if (dispatch) {
          const selection = CellSelection.create(tr2.doc, position.anchorCell, position.headCell);
          tr2.setSelection(selection);
        }
        return true;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.commands.goToNextCell()) {
          return true;
        }
        if (!this.editor.can().addRowAfter()) {
          return false;
        }
        return this.editor.chain().addRowAfter().goToNextCell().run();
      },
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: deleteTableWhenAllCellsSelected,
      "Mod-Backspace": deleteTableWhenAllCellsSelected,
      Delete: deleteTableWhenAllCellsSelected,
      "Mod-Delete": deleteTableWhenAllCellsSelected
    };
  },
  addProseMirrorPlugins() {
    const isResizable = this.options.resizable && this.editor.isEditable;
    return [
      ...isResizable ? [
        columnResizing({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          // @ts-ignore (incorrect type)
          View: this.options.View,
          // TODO: PR for @types/prosemirror-tables
          // @ts-ignore (incorrect type)
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      tableEditing({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      tableRole: callOrReturn(getExtensionField(extension, "tableRole", context))
    };
  }
});

// node_modules/@tiptap/extension-table-cell/dist/index.js
var TableCell = Node.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? [parseInt(colwidth, 10)] : null;
          return value;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: true,
  parseHTML() {
    return [
      { tag: "td" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["td", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});

// node_modules/@tiptap/extension-table-header/dist/index.js
var TableHeader = Node.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? [parseInt(colwidth, 10)] : null;
          return value;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: true,
  parseHTML() {
    return [
      { tag: "th" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["th", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});

// node_modules/@tiptap/extension-table-row/dist/index.js
var TableRow = Node.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [
      { tag: "tr" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["tr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});

// node_modules/@tiptap/extension-text-align/dist/index.js
var TextAlign = Extension.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => element.style.textAlign || this.options.defaultAlignment,
            renderHTML: (attributes) => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {};
              }
              return { style: `text-align: ${attributes.textAlign}` };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (alignment) => ({ commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }
        return this.options.types.every((type) => commands.updateAttributes(type, { textAlign: alignment }));
      },
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types.every((type) => commands.resetAttributes(type, "textAlign"));
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
});

// node_modules/@tiptap/extension-color/dist/index.js
var Color = Extension.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => {
              var _a;
              return (_a = element.style.color) === null || _a === void 0 ? void 0 : _a.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }
              return {
                style: `color: ${attributes.color}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (color) => ({ chain }) => {
        return chain().setMark("textStyle", { color }).run();
      },
      unsetColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { color: null }).removeEmptyTextStyle().run();
      }
    };
  }
});

// src/editor/extensions/RicherTextKit.js
var RicherTextKit = Extension.create({
  name: "richerTextKit",
  addOptions() {
    return {
      placeholder: "Start typing..."
    };
  },
  addExtensions() {
    const extensions = [];
    if (this.options.starterKit !== false) {
      extensions.push(
        StarterKit.configure({
          codeBlock: false,
          dropcursor: false,
          horizontalRule: false,
          heading: {
            levels: [1, 2, 3]
          }
        })
      );
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule_default);
    }
    if (this.options.callout !== false) {
      extensions.push(Callout_default);
    }
    if (this.options.commandMenu !== false) {
      const calloutEnabled = this.options.callout !== false;
      const tablesEnabled = this.options.tables !== false;
      extensions.push(CommandMenu_default(calloutEnabled, tablesEnabled));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure({
        color: "pink"
        //TODO: Change me //'var(--rte-content-focus-color)'
      }));
    }
    if (this.options.focus !== false) {
      extensions.push(FocusClasses.configure({
        className: "has-focus",
        mode: "shallowest"
      }));
    }
    if (this.options.fontSize !== false) {
      extensions.push(FontSize_default);
    }
    if (this.options.highlight !== false) {
      extensions.push(
        Highlight.configure({
          multicolor: true
        })
      );
    }
    if (this.options.image !== false) {
      extensions.push(Image_default);
    }
    if (this.options.link !== false) {
      extensions.push(
        Link.configure({
          openOnClick: false,
          protocols: ["https", "mailto"]
        })
      );
    }
    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: this.options.placeholder
        })
      );
    }
    if (this.options.tables !== false) {
      extensions.push(
        Table.configure({
          resizable: false
        }),
        TableRow,
        TableHeader,
        TableCell
      );
    }
    if (this.options.emoji !== false) {
      extensions.push(Emoji_default);
    }
    extensions.push(
      EditorEvents_default,
      CodeBlock_default,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["paragraph", "heading"]
      })
    );
    return extensions;
  }
});

export {
  RicherTextKit
};
//# sourceMappingURL=chunk-IPSTRGNW.js.map
