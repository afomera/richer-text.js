import {
  icons_default
} from "./chunk-BCSNHLOR.js";
import {
  i,
  s,
  x
} from "./chunk-M27UGOWE.js";
import {
  __publicField
} from "./chunk-AHNUJI67.js";

// node_modules/role-components/node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s2 = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s6 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s6 && 1 === s6.length;
      e4 && (t3 = n.get(s6)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s6, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s2);
var i2 = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s6, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s6) + t3[n6 + 1], t3[0]);
  return new o(n5, t3, s2);
};
var S = (s6, n5) => {
  e ? s6.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
    const n6 = document.createElement("style"), o5 = t.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s6.appendChild(n6);
  });
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s6 of t4.cssRules)
    e4 += s6.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/role-components/node_modules/@lit/reactive-element/reactive-element.js
var s3;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t3, i4) {
  switch (i4) {
    case Boolean:
      t3 = t3 ? h : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i4) {
  let s6 = t3;
  switch (i4) {
    case Boolean:
      s6 = null !== t3;
      break;
    case Number:
      s6 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s6 = JSON.parse(t3);
      } catch (t4) {
        s6 = null;
      }
  }
  return s6;
} };
var a = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";
var u = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t3) {
    var i4;
    this.finalize(), (null !== (i4 = this.h) && void 0 !== i4 ? i4 : this.h = []).push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i4, s6) => {
      const e4 = this._$Ep(s6, i4);
      void 0 !== e4 && (this._$Ev.set(e4, s6), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i4 = l) {
    if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s6 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s6, i4);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i4, s6) {
    return { get() {
      return this[i4];
    }, set(e4) {
      const r4 = this[t3];
      this[i4] = e4, this.requestUpdate(t3, r4, s6);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d))
      return false;
    this[d] = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s6 of i4)
        this.createProperty(s6, t4[s6]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i4) {
    const s6 = [];
    if (Array.isArray(i4)) {
      const e4 = new Set(i4.flat(1 / 0).reverse());
      for (const i5 of e4)
        s6.unshift(c(i5));
    } else
      void 0 !== i4 && s6.push(c(i4));
    return s6;
  }
  static _$Ep(t3, i4) {
    const s6 = i4.attribute;
    return false === s6 ? void 0 : "string" == typeof s6 ? s6 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  _$Eu() {
    var t3;
    this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i4, s6;
    (null !== (i4 = this._$ES) && void 0 !== i4 ? i4 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s6 = t3.hostConnected) || void 0 === s6 || s6.call(t3));
  }
  removeController(t3) {
    var i4;
    null === (i4 = this._$ES) || void 0 === i4 || i4.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t3, i4) => {
      this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
    });
  }
  createRenderRoot() {
    var t3;
    const s6 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s6, this.constructor.elementStyles), s6;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostConnected) || void 0 === i4 ? void 0 : i4.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostDisconnected) || void 0 === i4 ? void 0 : i4.call(t4);
    });
  }
  attributeChangedCallback(t3, i4, s6) {
    this._$AK(t3, s6);
  }
  _$EO(t3, i4, s6 = l) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s6);
    if (void 0 !== r4 && true === s6.reflect) {
      const h3 = (void 0 !== (null === (e4 = s6.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s6.converter : n2).toAttribute(i4, s6.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i4) {
    var s6;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s6 = t4.converter) || void 0 === s6 ? void 0 : s6.fromAttribute) ? t4.converter : n2;
      this._$El = r4, this[r4] = h3.fromAttribute(i4, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i4, s6) {
    let e4 = true;
    void 0 !== t3 && (((s6 = s6 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i4) ? (this._$AL.has(t3) || this._$AL.set(t3, i4), true === s6.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s6))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i5) => this[i5] = t4), this._$Ei = void 0);
    let i4 = false;
    const s6 = this._$AL;
    try {
      i4 = this.shouldUpdate(s6), i4 ? (this.willUpdate(s6), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i5;
        return null === (i5 = t4.hostUpdate) || void 0 === i5 ? void 0 : i5.call(t4);
      }), this.update(s6)) : this._$Ek();
    } catch (t4) {
      throw i4 = false, this._$Ek(), t4;
    }
    i4 && this._$AE(s6);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i4;
    null === (i4 = this._$ES) || void 0 === i4 || i4.forEach((t4) => {
      var i5;
      return null === (i5 = t4.hostUpdated) || void 0 === i5 ? void 0 : i5.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i4) => this._$EO(i4, this[i4], t4)), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s3 = e2.reactiveElementVersions) && void 0 !== s3 ? s3 : e2.reactiveElementVersions = []).push("1.6.3");

// node_modules/role-components/node_modules/lit-html/lit-html.js
var t2;
var i3 = window;
var s4 = i3.trustedTypes;
var e3 = s4 ? s4.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3 = "$lit$";
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var c2 = Array.isArray;
var v = (t3) => c2(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var a2 = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t3) => (i4, ...s6) => ({ _$litType$: t3, strings: i4, values: s6 });
var x2 = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129, null, false);
function P(t3, i4) {
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i4) : i4;
}
var V = (t3, i4) => {
  const s6 = t3.length - 1, e4 = [];
  let l4, r4 = 2 === i4 ? "<svg>" : "", u3 = f;
  for (let i5 = 0; i5 < s6; i5++) {
    const s7 = t3[i5];
    let d3, c3, v2 = -1, a3 = 0;
    for (; a3 < s7.length && (u3.lastIndex = a3, c3 = u3.exec(s7), null !== c3); )
      a3 = u3.lastIndex, u3 === f ? "!--" === c3[1] ? u3 = _ : void 0 !== c3[1] ? u3 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (l4 = RegExp("</" + c3[2], "g")), u3 = p) : void 0 !== c3[3] && (u3 = p) : u3 === p ? ">" === c3[0] ? (u3 = null != l4 ? l4 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l4 = void 0);
    const w2 = u3 === p && t3[i5 + 1].startsWith("/>") ? " " : "";
    r4 += u3 === f ? s7 + h2 : v2 >= 0 ? (e4.push(d3), s7.slice(0, v2) + o3 + s7.slice(v2) + n3 + w2) : s7 + n3 + (-2 === v2 ? (e4.push(void 0), i5) : w2);
  }
  return [P(t3, r4 + (t3[s6] || "<?>") + (2 === i4 ? "</svg>" : "")), e4];
};
var N = class _N {
  constructor({ strings: t3, _$litType$: i4 }, e4) {
    let h3;
    this.parts = [];
    let r4 = 0, d3 = 0;
    const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i4);
    if (this.el = _N.createElement(a3, e4), C.currentNode = this.el.content, 2 === i4) {
      const t4 = this.el.content, i5 = t4.firstChild;
      i5.remove(), t4.append(...i5.childNodes);
    }
    for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
      if (1 === h3.nodeType) {
        if (h3.hasAttributes()) {
          const t4 = [];
          for (const i5 of h3.getAttributeNames())
            if (i5.endsWith(o3) || i5.startsWith(n3)) {
              const s6 = f2[d3++];
              if (t4.push(i5), void 0 !== s6) {
                const t5 = h3.getAttribute(s6.toLowerCase() + o3).split(n3), i6 = /([.?@])?(.*)/.exec(s6);
                v2.push({ type: 1, index: r4, name: i6[2], strings: t5, ctor: "." === i6[1] ? H : "?" === i6[1] ? L : "@" === i6[1] ? z : k });
              } else
                v2.push({ type: 6, index: r4 });
            }
          for (const i5 of t4)
            h3.removeAttribute(i5);
        }
        if (y.test(h3.tagName)) {
          const t4 = h3.textContent.split(n3), i5 = t4.length - 1;
          if (i5 > 0) {
            h3.textContent = s4 ? s4.emptyScript : "";
            for (let s6 = 0; s6 < i5; s6++)
              h3.append(t4[s6], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h3.append(t4[i5], u2());
          }
        }
      } else if (8 === h3.nodeType)
        if (h3.data === l2)
          v2.push({ type: 2, index: r4 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = h3.data.indexOf(n3, t4 + 1)); )
            v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t3, i4) {
    const s6 = r3.createElement("template");
    return s6.innerHTML = t3, s6;
  }
};
function S2(t3, i4, s6 = t3, e4) {
  var o5, n5, l4, h3;
  if (i4 === T)
    return i4;
  let r4 = void 0 !== e4 ? null === (o5 = s6._$Co) || void 0 === o5 ? void 0 : o5[e4] : s6._$Cl;
  const u3 = d2(i4) ? void 0 : i4._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u3 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u3 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s6, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s6)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s6._$Cl = r4), void 0 !== r4 && (i4 = S2(t3, r4._$AS(t3, i4.values), r4, e4)), i4;
}
var M = class {
  constructor(t3, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    var i4;
    const { el: { content: s6 }, parts: e4 } = this._$AD, o5 = (null !== (i4 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i4 ? i4 : r3).importNode(s6, true);
    C.currentNode = o5;
    let n5 = C.nextNode(), l4 = 0, h3 = 0, u3 = e4[0];
    for (; void 0 !== u3; ) {
      if (l4 === u3.index) {
        let i5;
        2 === u3.type ? i5 = new R(n5, n5.nextSibling, this, t3) : 1 === u3.type ? i5 = new u3.ctor(n5, u3.name, u3.strings, this, t3) : 6 === u3.type && (i5 = new Z(n5, this, t3)), this._$AV.push(i5), u3 = e4[++h3];
      }
      l4 !== (null == u3 ? void 0 : u3.index) && (n5 = C.nextNode(), l4++);
    }
    return C.currentNode = r3, o5;
  }
  v(t3) {
    let i4 = 0;
    for (const s6 of this._$AV)
      void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t3, s6, i4), i4 += s6.strings.length - 2) : s6._$AI(t3[i4])), i4++;
  }
};
var R = class _R {
  constructor(t3, i4, s6, e4) {
    var o5;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s6, this.options = e4, this._$Cp = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i4;
    return null !== (i4 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i4 ? i4 : this._$Cp;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === (null == t3 ? void 0 : t3.nodeType) && (t3 = i4.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i4 = this) {
    t3 = S2(this, t3, i4), d2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.g(t3) : void 0 !== t3.nodeType ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
  }
  k(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  $(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
  }
  _(t3) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
  }
  g(t3) {
    var i4;
    const { values: s6, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
    if ((null === (i4 = this._$AH) || void 0 === i4 ? void 0 : i4._$AD) === o5)
      this._$AH.v(s6);
    else {
      const t4 = new M(o5, this), i5 = t4.u(this.options);
      t4.v(s6), this.$(i5), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i4 = E.get(t3.strings);
    return void 0 === i4 && E.set(t3.strings, i4 = new N(t3)), i4;
  }
  T(t3) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s6, e4 = 0;
    for (const o5 of t3)
      e4 === i4.length ? i4.push(s6 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s6 = i4[e4], s6._$AI(o5), e4++;
    e4 < i4.length && (this._$AR(s6 && s6._$AB.nextSibling, e4), i4.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i4) {
    var s6;
    for (null === (s6 = this._$AP) || void 0 === s6 || s6.call(this, false, true, i4); t3 && t3 !== this._$AB; ) {
      const i5 = t3.nextSibling;
      t3.remove(), t3 = i5;
    }
  }
  setConnected(t3) {
    var i4;
    void 0 === this._$AM && (this._$Cp = t3, null === (i4 = this._$AP) || void 0 === i4 || i4.call(this, t3));
  }
};
var k = class {
  constructor(t3, i4, s6, e4, o5) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e4, this.options = o5, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i4 = this, s6, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5)
      t3 = S2(this, t3, i4, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = S2(this, e5[s6 + l4], i4, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var I = s4 ? s4.emptyScript : "";
var L = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
};
var z = class extends k {
  constructor(t3, i4, s6, e4, o5) {
    super(t3, i4, s6, e4, o5), this.type = 5;
  }
  _$AI(t3, i4 = this) {
    var s6;
    if ((t3 = null !== (s6 = S2(this, t3, i4, 0)) && void 0 !== s6 ? s6 : A) === T)
      return;
    const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i4, s6;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s6 = null === (i4 = this.options) || void 0 === i4 ? void 0 : i4.host) && void 0 !== s6 ? s6 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var Z = class {
  constructor(t3, i4, s6) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s6;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S2(this, t3);
  }
};
var B = i3.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t2 = i3.litHtmlVersions) && void 0 !== t2 ? t2 : i3.litHtmlVersions = []).push("2.8.0");
var D = (t3, i4, s6) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== e4 ? e4 : i4;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new R(i4.insertBefore(u2(), t4), t4, void 0, null != s6 ? s6 : {});
  }
  return l4._$AI(t3), l4;
};

// node_modules/role-components/node_modules/lit-element/lit-element.js
var l3;
var o4;
var s5 = class extends u {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i4 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i4.firstChild), i4;
  }
  update(t3) {
    const i4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return T;
  }
};
s5.finalized = true, s5._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s5 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s5 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.3");

// node_modules/web-component-define/src/internal/defineable-mixin.js
function DefineableMixin(superclass) {
  var _a;
  return _a = class extends superclass {
    /**
    * @param {null | undefined | string} [name=this.baseName]
    * @param {null | undefined | CustomElementConstructor} [ctor=this]
    * @param {ElementDefinitionOptions | undefined} [options]
    */
    static define(name, ctor, options) {
      if (!name)
        name = this.baseName;
      if (!ctor)
        ctor = this;
      let registry = window.customElements;
      if (this.__registry instanceof CustomElementRegistry) {
        registry = this.__registry;
      }
      const alreadyExists = Boolean(registry.get(name));
      if (alreadyExists && this.warnOnExistingElement) {
        console.warn(`${name} has already been registered.`);
      }
      if (!alreadyExists && ctor) {
        registry.define(name, class extends ctor {
        }, options);
      }
    }
  }, /**
   * The tag name to register your custom element under.
   * @type {string}
   */
  __publicField(_a, "baseName", ""), /**
   * Emits a console warning if the name for an element is already taken.
   * @type {boolean}
   */
  __publicField(_a, "warnOnExistingElement", false), _a;
}
var DefineableElement = class extends DefineableMixin(HTMLElement) {
};

// node_modules/@open-wc/dedupe-mixin/src/dedupeMixin.js
var appliedClassMixins = /* @__PURE__ */ new WeakMap();
function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;
  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }
    klass = Object.getPrototypeOf(klass);
  }
  return false;
}
function dedupeMixin(mixin) {
  return (superClass) => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}

// node_modules/web-component-define/src/internal/scoped-elements-mixin.js
var supportsScopedRegistry = !!ShadowRoot.prototype.createElement;
var ScopedElementsMixinImplementation = (superclass) => {
  var _a;
  return _a = class extends superclass {
    /**
     * Obtains the scoped elements definitions map if specified.
     *
     * @returns {ScopedElementsMap}
     */
    static get scopedElements() {
      return {};
    }
    /**
     * Obtains the ShadowRoot options.
     *
     * @type {ShadowRootInit}
     */
    static get shadowRootOptions() {
      return this.__shadowRootOptions || { mode: "open" };
    }
    /**
     * Set the shadowRoot options.
     *
     * @param {ShadowRootInit} value
     */
    static set shadowRootOptions(value) {
      this.__shadowRootOptions = value;
    }
    /**
     * @param {any[]} args
     */
    constructor(...args) {
      super(...args);
      this.renderOptions = this.renderOptions || void 0;
    }
    /**
     * Obtains the CustomElementRegistry associated to the ShadowRoot.
     *
     * @returns {CustomElementRegistry}
     */
    get registry() {
      const constructor = this.constructor;
      return constructor.__registry;
    }
    /**
     * Set the CustomElementRegistry associated to the ShadowRoot
     *
     * @param {CustomElementRegistry} registry
     */
    set registry(registry) {
      const constructor = this.constructor;
      constructor.__registry = registry;
    }
    createRenderRoot() {
      const constructor = this.constructor;
      const { scopedElements, shadowRootOptions } = constructor;
      const shouldCreateRegistry = !this.registry || this.registry === constructor.__registry && !Object.prototype.hasOwnProperty.call(this.constructor, "__registry");
      if (shouldCreateRegistry) {
        this.registry = supportsScopedRegistry ? new CustomElementRegistry() : customElements;
        for (const [tagName, klass] of Object.entries(scopedElements)) {
          this.defineScopedElement(tagName, klass);
        }
      }
      const options = {
        // @ts-expect-error multiple assignment. Sue me.
        mode: "open",
        ...shadowRootOptions,
        customElements: this.registry
      };
      const createdRoot = this.attachShadow(options);
      if (supportsScopedRegistry) {
        this.renderOptions.creationScope = createdRoot;
      }
      if (createdRoot instanceof ShadowRoot) {
        this.adoptStyles(createdRoot);
      }
      return createdRoot;
    }
    /**
     * @param {string} tagName
     */
    createScopedElement(tagName) {
      const root = supportsScopedRegistry ? this.shadowRoot : document;
      return root.createElement(tagName);
    }
    /**
     * Hook for attaching constructable stylesheets to a render root.
     * Used in the {LitScopedElementsMixin} .
     * @param {ShadowRoot} _shadowRoot
     * @returns {void}
     */
    adoptStyles(_shadowRoot) {
    }
    /**
     * Defines a scoped element.
     *
     * @param {string} tagName
     * @param {typeof HTMLElement} klass
     */
    defineScopedElement(tagName, klass) {
      const registeredClass = this.registry.get(tagName);
      if (registeredClass && supportsScopedRegistry === false && registeredClass !== klass) {
        console.error(
          [
            `You are trying to re-register the "${tagName}" custom element with a different class via ScopedElementsMixin.`,
            "This is only possible with a CustomElementRegistry.",
            "Your browser does not support this feature so you will need to load a polyfill for it.",
            'Load "@webcomponents/scoped-custom-element-registry" before you register ANY web component to the global customElements registry.',
            'e.g. add "<script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"><\/script>" as your first script tag.',
            "For more details you can visit https://open-wc.org/docs/development/scoped-elements/"
          ].join("\n")
        );
      }
      if (!registeredClass) {
        return this.registry.define(tagName, klass);
      }
      return this.registry.get(tagName);
    }
  }, /**
   * @protected
   * @type {CustomElementRegistry}
   */
  __publicField(_a, "__registry", window.customElements), _a;
};
var ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

// node_modules/web-component-define/src/internal/create-render-root-mixin.js
var CreateRenderRootMixinImplementation = (superclass) => {
  return class CreateRenderRootHost extends superclass {
    /**
     * Obtains the ShadowRoot options.
     *
     * @type {ShadowRootInit}
     */
    static get shadowRootOptions() {
      return this.__shadowRootOptions || { mode: "open" };
    }
    /**
     * Set the shadowRoot options.
     *
     * @param {ShadowRootInit} value
     */
    static set shadowRootOptions(value) {
      this.__shadowRootOptions = value;
    }
    /** @type {ShadowRootInit} */
    get shadowRootOptions() {
      return this.constructor.shadowRootOptions;
    }
    createRenderRoot() {
      const renderRoot = this.shadowRoot ?? this.attachShadow(this.shadowRootOptions || { mode: "open" });
      return renderRoot;
    }
    connectedCallback() {
      if (typeof super.connectedCallback === "function") {
        super.connectedCallback();
      }
      if (this.renderRoot == null) {
        this.renderRoot = this.createRenderRoot();
      }
    }
  };
};
var CreateRenderRootMixin = dedupeMixin(CreateRenderRootMixinImplementation);

// node_modules/role-components/exports/base-element.js
var BaseElement = class extends DefineableMixin(s5) {
};

// node_modules/role-components/exports/toolbar/toolbar.js
var RoleToolbar = class extends BaseElement {
  constructor() {
    super();
    /** @param {Event} event */
    __publicField(this, "handleClick", (event) => {
      const focusedElement = event.composedPath().find((el) => {
        const role = el?.getAttribute?.("data-role") || "";
        return role.includes("toolbar-item");
      });
      if (focusedElement) {
        this._toolbarItems.forEach((el, index) => {
          if (el === focusedElement) {
            this._currentFocusIndex = index;
            return;
          }
          el.setAttribute("tabindex", "-1");
        });
        this.setTabIndex({ focus: false });
      } else {
        this.setTabIndex({ focus: true });
      }
    });
    /** @param {KeyboardEvent} event */
    __publicField(this, "handleKeyDown", (event) => {
      const key = event.key?.toLowerCase();
      if (this.orientation === "vertical" && (key === "arrowleft" || key === "arrowright"))
        return;
      if (this.orientation === "horizontal" && (key === "arrowdown" || key === "arrowup"))
        return;
      if (Object.keys(this.keydownHandlers).includes(key)) {
        event.preventDefault();
        this.keydownHandlers[key](event);
      }
    });
    /** @param {Event} _event */
    __publicField(this, "focusNext", (_event) => {
      this.currentFocusElement?.setAttribute("tabindex", "-1");
      this._currentFocusIndex += 1;
      if (this._currentFocusIndex >= this._toolbarItems.length) {
        this.focusFirst();
        return;
      }
      this.setTabIndex();
    });
    /** @param {Event} _event */
    __publicField(this, "focusPrevious", (_event) => {
      this.currentFocusElement?.setAttribute("tabindex", "-1");
      this._currentFocusIndex -= 1;
      if (this._currentFocusIndex < 0) {
        this.focusLast();
        return;
      }
      this.setTabIndex();
    });
    __publicField(this, "focusFirst", () => {
      this._currentFocusIndex = 0;
      this.setTabIndex();
    });
    __publicField(this, "focusLast", () => {
      if (this._toolbarItems == null)
        return;
      this._currentFocusIndex = this._toolbarItems.length - 1;
      this.setTabIndex();
    });
    __publicField(this, "setTabIndex", ({ focus = true } = {}) => {
      this.currentFocusElement?.setAttribute("tabindex", "0");
      if (focus) {
        this.currentFocusElement?.focus?.();
      }
    });
    /**
     * @param {undefined | null | Event} [evt] - triggered by a slot change event.
     */
    __publicField(this, "updateToolbarItems", (evt) => {
      const slot = evt?.target || this.shadowRoot.querySelector("slot");
      if (slot == null)
        return;
      const items = slot.assignedElements({ flatten: true }).filter((el) => {
        return el instanceof HTMLElement && el.dataset.role?.match(/toolbar-item/);
      });
      this._toolbarItems = items;
      this._currentFocusIndex = this._toolbarItems.findIndex(
        (el) => el.getAttribute("tabindex") === "0"
      );
      this._toolbarItems.forEach((el) => {
        if (this._toolbarItems[this._currentFocusIndex] === el)
          return;
        el.setAttribute("tabindex", "-1");
      });
      if (this._currentFocusIndex === -1) {
        this._currentFocusIndex = 0;
        this.currentFocusElement?.setAttribute("tabindex", "0");
      }
    });
    this._currentFocusIndex = 0;
    this.orientation = "horizontal";
    this._toolbarItems = [];
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("focus", this.handleClick);
  }
  /**
   * @param {import("lit").PropertyValues<this>} changedProperties
   */
  willUpdate(changedProperties) {
    if (changedProperties.has("_toolbarItems")) {
      this.updateToolbarItems();
    }
    super.willUpdate(changedProperties);
  }
  /** @returns {string} */
  static get baseName() {
    return "role-toolbar";
  }
  static get styles() {
    return i2`
      :host {
        display: block;
      }

      .base {
        display: flex;
        max-width: 100%;
        padding: 0.4rem 0.6rem;
        border-radius: 4px;
        border: 2px solid transparent;
        gap: 4px;
        overflow: auto;
      }

      :host([orientation="vertical"]) .base {
        flex-direction: column;
      }

      :host(:focus-within) .base {
        border-color: #005a9c;
      }
    `;
  }
  /**
   * @return {Record<string, (event: Event) => void>}
   */
  get keydownHandlers() {
    if (this._keydownHandlers)
      return this._keydownHandlers;
    this._keydownHandlers = {
      arrowleft: this.focusPrevious,
      arrowup: this.focusPrevious,
      arrowright: this.focusNext,
      arrowdown: this.focusNext,
      home: this.focusFirst,
      end: this.focusLast
    };
    return this._keydownHandlers;
  }
  render() {
    return x2`
      <div role="toolbar" class="base" part="base">
        <slot @slotchange=${this.updateToolbarItems}></slot>
      </div>
    `;
  }
  get currentFocusElement() {
    if (this._toolbarItems == null)
      return;
    return this._toolbarItems[this._currentFocusIndex];
  }
};
__publicField(RoleToolbar, "properties", {
  orientation: { reflect: true },
  _currentFocusIndex: { state: true },
  _toolbarItems: { state: true }
});

// node_modules/role-components/exports/toolbar/toolbar-register.js
var toolbar_register_default = RoleToolbar;
RoleToolbar.define();

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v2) => ({
  x: v2,
  y: v2
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x3,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x3,
    right: x3 + width,
    bottom: y2 + height,
    x: x3,
    y: y2
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x3,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i4 = 0; i4 < validMiddleware.length; i4++) {
    const {
      name,
      fn
    } = validMiddleware[i4];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x3,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x3 = nextX != null ? nextX : x3;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x3,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i4 = -1;
    }
  }
  return {
    x: x3,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x3,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x3,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x3,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x3,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d3) => d3.overflows[0] <= 0).sort((a3, b2) => a3.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d3) => [d3.placement, d3.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a3, b2) => a3[1] - b2[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x3,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x3 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x3,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x4,
              y: y3
            } = _ref;
            return {
              x: x4,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x3,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x3,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x3 = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x3 || !Number.isFinite(x3)) {
    x3 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x3,
    y: y2
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x3 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x3 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x3 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x3,
    y: y2
  });
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(floating) {
  return topLayerSelectors.some((selector) => {
    try {
      return floating.matches(selector);
    } catch (e4) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x3 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x3 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x3,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x3 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x3 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x3,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x3 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x3,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x3 = rect.left + scroll.scrollLeft - offsets.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x3,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element) || isTopLayer(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e4) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/role-components/exports/tooltip/tooltip.js
var RoleTooltip = class extends BaseElement {
  constructor() {
    super();
    /**
     * @param {Event|Element} eventOrElement
     * @returns {void}
     */
    __publicField(this, "show", (eventOrElement) => {
      if (eventOrElement instanceof Event && eventOrElement.currentTarget instanceof Element) {
        eventOrElement = eventOrElement.currentTarget;
      }
      const target = eventOrElement;
      this.willShow = true;
      this.computeTooltipPosition(target);
    });
    /**
     * @param {Event} [_event]
     * @returns {void}
     */
    __publicField(this, "hide", (_event) => {
      this.willShow = false;
      this.cleanup?.();
      window.requestAnimationFrame(() => {
        if (this.willShow === true)
          return;
        const base = this.base;
        if (!base)
          return;
        base.style.display = "none";
      });
    });
    /**
     * @param {Event | KeyboardEvent} event
     */
    __publicField(this, "keyboardHide", (event) => {
      if (!("key" in event)) {
        return;
      }
      if (event.key != null && event.key.toLowerCase() === "escape") {
        event.preventDefault();
        this.hide();
      }
    });
    if (window.process == null)
      window.process = {};
    if (window.process.env == null)
      window.process.env = "development";
    this.tooltipAnchors = [];
    this._rootElement = void 0;
    this.role = "tooltip";
    this.inert = true;
    this.placement = "top";
    this.listeners = [
      ["pointerenter", this.show],
      ["pointerleave", this.hide],
      ["pointercancel", this.hide],
      ["pointerup", this.hide],
      ["focusin", this.show],
      ["focusout", this.hide],
      ["keydown", this.keyboardHide]
    ];
  }
  static get properties() {
    return {
      id: { reflect: true },
      tooltipAnchors: { state: true },
      rootElement: { state: true },
      role: { reflect: true },
      inert: { reflect: true, type: Boolean },
      placement: { reflect: true }
    };
  }
  /** @returns {string} */
  static get baseName() {
    return "role-tooltip";
  }
  static get styles() {
    return i2`
      :host {
        --background-color: #222;
        --arrow-size: 8px;
      }

      .base {
        display: none;
        position: absolute;
        left: 0px;
        top: 0px;
        max-width: calc(100vw - 10px);
        padding: 0.4em 0.6em;
        background: var(--background-color);
        color: white;
        border-radius: 4px;
        font-size: 0.9em;
        pointer-events: none;
        z-index: 1;
      }

      :host([hoist]) .base {
        position: fixed;
      }

      .arrow {
        position: absolute;
        background: var(--background-color);
        width: var(--arrow-size);
        height: var(--arrow-size);
        transform: rotate(45deg);
      }
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateAnchors();
    this.attachListeners();
  }
  updateAnchors() {
    if (this.rootElement) {
      this.tooltipAnchors = Array.from(this.rootElement.querySelectorAll(this.query)) || [];
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }
  /**
   * @type {string}
   */
  get query() {
    return `[aria-describedby~='${this.id}']`;
  }
  /** @returns {ShadowRoot | Document | undefined} */
  get rootElement() {
    if (this._rootElement == null) {
      const oldVal = this._rootElement;
      this._rootElement = this.getRootNode() || document;
      this.requestUpdate("rootElement", oldVal);
    }
    return this._rootElement;
  }
  /** @returns {void} */
  set rootElement(newVal) {
    const oldVal = this._rootElement;
    this._rootElement = newVal;
    this.requestUpdate("rootElement", oldVal);
  }
  render() {
    return x2`
      <div part="base" class="base">
        <slot></slot>
        <div class="arrow" part="arrow"></div>
      </div>
    `;
  }
  /**
   * @param {Parameters<import("lit").LitElement["update"]>} args
   * @return {ReturnType<import("lit").LitElement["update"]>}
   */
  update(...args) {
    const [changedProperties] = args;
    const shouldUpdateProperties = ["id", "tooltipAnchors", "rootElement"];
    const shouldReattachListeners = shouldUpdateProperties.some((str) => changedProperties.has(str));
    if (shouldReattachListeners) {
      this.attachListeners();
    }
    super.update(...args);
  }
  /**
   * Used for re-initialized event listeners
   * @returns {void}
   */
  attachListeners() {
    this.listeners.forEach(([event, listener]) => {
      this.tooltipAnchors.forEach(
        (el) => el.removeEventListener(event, listener)
      );
      this.tooltipAnchors.forEach((el) => el.addEventListener(event, listener));
    });
  }
  /**
   * Used for cleaning up
   * @returns {void}
   */
  removeListeners() {
    this.listeners.forEach(([event, listener]) => {
      this.tooltipAnchors.forEach(
        (el) => el.removeEventListener(event, listener)
      );
    });
  }
  /** @returns {HTMLElement | undefined | null} */
  get arrow() {
    return this.shadowRoot?.querySelector(".arrow");
  }
  /**
   * @param {Element} target
   * @returns {void}
   */
  computeTooltipPosition(target) {
    const arrowEl = this.arrow;
    const base = this.base;
    if (base == null)
      return;
    if (arrowEl == null)
      return;
    base.style.display = "unset";
    const placement = this.placement || "top";
    this.cleanup = autoUpdate(target, base, () => {
      computePosition2(target, base, {
        placement,
        middleware: [
          offset2(6),
          flip2(),
          shift2({ padding: 5 }),
          arrow2({ element: arrowEl })
        ],
        strategy: this.hasAttribute("hoist") ? "fixed" : "absolute"
      }).then(({ x: x3, y: y2, middlewareData, placement: placement2 }) => {
        Object.assign(base.style, {
          left: `${x3}px`,
          top: `${y2}px`
        });
        const arrowX = middlewareData.arrow?.x;
        const arrowY = middlewareData.arrow?.y;
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement2.split("-")[0]] || "top";
        Object.assign(arrowEl.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px"
        });
      });
    });
  }
  /**
   * @return {HTMLElement | null | undefined}
   */
  get base() {
    return this.shadowRoot?.querySelector(".base");
  }
};

// node_modules/role-components/exports/tooltip/tooltip-register.js
var tooltip_register_default = RoleTooltip;
RoleTooltip.define();

// src/editor/elements/RicherBubbleMenu.js
tooltip_register_default.define();
var RicherBubbleMenu = class extends s {
  static get properties() {
    return {
      editor: { type: Function },
      embedPath: { type: String },
      urlMatchesPattern: { type: Boolean },
      // State
      editingLink: { type: Boolean, state: true },
      isActive: { type: Function, state: true },
      mode: { type: String, state: true },
      embedPatterns: { type: Array, state: true },
      oembed: { type: Boolean, state: true }
    };
  }
  constructor() {
    super();
    this.editingLink = false;
    this.mode = "text";
    this.embedPath = "/embeds";
    this.embedPatterns = [];
    this.oembed = false;
    this.urlMatchesPattern = false;
    this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  updated(changedProperties) {
    if (changedProperties.has("embedPath") || changedProperties.has("oembed")) {
      this.fetchOEmbedPatterns();
    }
    if (changedProperties.has("urlMatchesPattern")) {
      this.requestUpdate();
    }
  }
  removeNode() {
    this.editor.chain().focus().deleteSelection().run();
    this.requestUpdate();
  }
  resizeImage(size2) {
    this.editor.chain().focus().setImageWidth(size2).run();
    this.requestUpdate();
  }
  toggleBold() {
    this.editor.chain().focus().toggleBold().run();
    this.requestUpdate();
  }
  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();
    this.requestUpdate();
  }
  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();
    this.requestUpdate();
  }
  get isBold() {
    return this.editor.isActive("bold");
  }
  toggleLinkEditor() {
    this.editingLink = !this.editingLink;
    if (this.editingLink) {
      setTimeout(() => {
        this.shadowRoot.getElementById("link-url").focus();
      }, 50);
    }
  }
  toggleLeftAlignment() {
    this.editor.chain().focus().setTextAlign("left").run();
    this.requestUpdate();
  }
  toggleCenterAlignment() {
    this.editor.chain().focus().setTextAlign("center").run();
    this.requestUpdate();
  }
  toggleRightAlignment() {
    this.editor.chain().focus().setTextAlign("right").run();
    this.requestUpdate();
  }
  clear() {
    this.editor.chain().clearContent(true).focus().run();
    this.requestUpdate();
  }
  focus() {
    this.editor.commands.focus();
  }
  blur() {
    this.editor.commands.blur();
  }
  setLinkAndClose(embed = false) {
    const url = this.shadowRoot.getElementById("link-url").value;
    if (embed) {
      fetch(`${this.embedPath}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: url }) }).then((response) => response.json()).then((data) => {
        if (data.content) {
          this.editor.chain().focus().deleteSelection().insertContent(data.content).run();
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    if (!embed && url) {
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      this.editor.chain().focus().unsetLink().run();
    }
    this.editingLink = false;
    this.urlMatchesPattern = false;
  }
  _handleLinkSubmit(event) {
    event.preventDefault();
    this.setLinkAndClose();
  }
  deleteTable() {
    this.editor.chain().focus().deleteTable().run();
    this.requestUpdate();
  }
  insertColumnLeft() {
    this.editor.chain().focus().addColumnBefore().run();
    this.requestUpdate();
  }
  insertColumnRight() {
    this.editor.chain().focus().addColumnAfter().run();
    this.requestUpdate();
  }
  deleteColumn() {
    this.editor.chain().focus().deleteColumn().run();
    this.requestUpdate();
  }
  insertRowAbove() {
    this.editor.chain().focus().addRowBefore().run();
    this.requestUpdate();
  }
  insertRowBelow() {
    this.editor.chain().focus().addRowAfter().run();
    this.requestUpdate();
  }
  deleteRow() {
    this.editor.chain().focus().deleteRow().run();
    this.requestUpdate();
  }
  toggleHeaderColumn() {
    this.editor.chain().focus().toggleHeaderColumn().run();
    this.requestUpdate();
  }
  toggleHeaderRow() {
    this.editor.chain().focus().toggleHeaderRow().run();
    this.requestUpdate();
  }
  fetchOEmbedPatterns() {
    if (!this.oembed) {
      return;
    }
    fetch(`${this.embedPath}/patterns`).then((response) => response.json()).then((data) => {
      this.embedPatterns = data;
    });
  }
  onURLChange(event) {
    if (this.oembed) {
      var url = event.target.value;
      const pattern = this.embedPatterns.find((pattern2) => {
        if (url == "") {
          return false;
        }
        const regex = new RegExp(pattern2.source);
        return regex.test(url);
      });
      if (pattern) {
        this.urlMatchesPattern = true;
      } else {
        this.urlMatchesPattern = false;
      }
      this.requestUpdate();
    }
  }
  render() {
    if (this.mode == "table") {
      return x`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.insertColumnLeft()} aria-describedby="insert-column-left-tooltip">
            ${icons_default.get("insert-column-left")}
            <role-tooltip id="insert-column-left-tooltip" hoist>Insert column before</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertColumnRight()} aria-describedby="insert-column-right-tooltip">
            ${icons_default.get("insert-column-right")}
            <role-tooltip id="insert-column-right-tooltip" hoist>Insert column after</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.deleteColumn()} aria-describedby="column-remove-tooltip">
            ${icons_default.get("delete-column")}
            <role-tooltip id="column-remove-tooltip" hoist>Delete column</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertRowAbove()} aria-describedby="insert-row-above-tooltip">
            ${icons_default.get("insert-row-above")}
            <role-tooltip id="insert-row-above-tooltip" hoist>Insert row before</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.insertRowBelow()} aria-describedby="insert-row-below-tooltip">
            ${icons_default.get("insert-row-below")}
            <role-tooltip id="insert-row-below-tooltip" hoist>Insert row after</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.deleteRow()} aria-describedby="delete-row-tooltip">
            ${icons_default.get("delete-row")}
            <role-tooltip id="delete-row-tooltip" hoist>Delete row</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.toggleHeaderColumn()} aria-describedby="toggle-header-column-tooltip">
            ${icons_default.get("toggle-header-column")}
            <role-tooltip id="toggle-header-column-tooltip" hoist>Toggle header column</role-tooltip>
          </button>

          <button class="toolbar-button" @click=${() => this.toggleHeaderRow()} aria-describedby="toggle-header-row-tooltip">
            ${icons_default.get("toggle-header-row")}
            <role-tooltip id="toggle-header-row-tooltip" hoist>Toggle header row</role-tooltip>
          </button>

          <div class="divider"></div>

          <button class="toolbar-button" @click=${() => this.deleteTable()} aria-describedby="delete-table-tooltip">
            ${icons_default.get("delete-table")}
            <role-tooltip id="delete-table-tooltip" hoist>Delete Table</role-tooltip>
          </button>
        </div>
      `;
    } else if (this.mode == "image") {
      return x`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.removeNode()}>
            ${icons_default.get("delete")}
          </button>
          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.resizeImage("25%")}>
            ${icons_default.get("small-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("50%")}>
            ${icons_default.get("medium-square")}
          </button>
          <button class="toolbar-button" @click=${() => this.resizeImage("100%")}>
            ${icons_default.get("large-square")}
          </button>
        </div>
      `;
    } else if (this.mode == "text" && !this.editingLink) {
      return x`
        <div class="richer-text-editor--bubble-menu">
          <button class="toolbar-button" @click=${() => this.toggleBold()}>
            ${icons_default.get("bold")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleItalic()}>
            ${icons_default.get("italic")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleStrike()}>
            ${icons_default.get("strike")}
          </button>
          <button class="toolbar-button" @click=${() => this.toggleLinkEditor()}>${icons_default.get("link")}</button>

          <div class="divider"></div>
          <button class="toolbar-button" @click=${() => this.toggleLeftAlignment()}>${icons_default.get("align-left")}</button>
          <button class="toolbar-button" @click=${() => this.toggleCenterAlignment()}>${icons_default.get("align-center")}</button>
          <button class="toolbar-button" @click=${() => this.toggleRightAlignment()}>${icons_default.get("align-right")}</button>
        <!--
          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons_default.get("highlight")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown>
          <div class="divider"></div>
          <rte-dropdown>
            <button slot="trigger" class="caret">${icons_default.get("text-color")}</button>
            <div slot="items">
              <rte-dropdown-item @click="${this.clear}">Clear</rte-dropdown-item>
              <rte-dropdown-item @click="${this.focus}">Focus</rte-dropdown-item>
              <rte-dropdown-item @click="${this.blur}">Blur</rte-dropdown-item>
            </div>
          </rte-dropdown> -->
        </div>
      `;
    } else {
      return x`
        <div class="richer-text-editor--bubble-menu">
          <form @submit=${this._handleLinkSubmit}>
            <span class="link-icon">${icons_default.get("link")}</span>
            <input id="link-url" value=${this.editor.getAttributes("link").href} @input=${this.onURLChange} type="url" autofocus="true" placeholder="Enter a URL" />
            <button @click=${() => this.setLinkAndClose()}>Done</button>
            ${this.urlMatchesPattern ? x`<button @click=${() => this.setLinkAndClose(true)}>Embed</button>` : null}
          </form>
        </div>
      `;
    }
  }
};
__publicField(RicherBubbleMenu, "styles", i`
    .richer-text-editor--bubble-menu {
      z-index: 100;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      display: flex;
      align-items: center;
      gap: 4px;

      .divider {
        border-left: 1px solid #ddd;
        height: 24px;
      }

      input {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;
        width: 200px;
      }

      .link-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        margin-left: 4px;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin: 0;
        display: inline-block;
        font-size: 16px;
        color: #333;

        &:hover {
          background-color: #e5e7eb;
          border-radius: 4px;
        }
      }

      button.caret {
        position: relative;
        padding-right: 16px;
        margin: 0;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #333 transparent transparent;
        }
      }
    }
  `);
customElements.define("richer-bubble-menu", RicherBubbleMenu);

export {
  toolbar_register_default,
  tooltip_register_default,
  RicherBubbleMenu
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-XBG4IWAT.js.map
