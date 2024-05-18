// node_modules/orderedmap/dist/index.js
function OrderedMap(content) {
  this.content = content;
}
OrderedMap.prototype = {
  constructor: OrderedMap,
  find: function(key) {
    for (var i = 0; i < this.content.length; i += 2)
      if (this.content[i] === key)
        return i;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(key) {
    var found2 = this.find(key);
    return found2 == -1 ? void 0 : this.content[found2 + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(key, value, newKey) {
    var self = newKey && newKey != key ? this.remove(newKey) : this;
    var found2 = self.find(key), content = self.content.slice();
    if (found2 == -1) {
      content.push(newKey || key, value);
    } else {
      content[found2 + 1] = value;
      if (newKey)
        content[found2] = newKey;
    }
    return new OrderedMap(content);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(key) {
    var found2 = this.find(key);
    if (found2 == -1)
      return this;
    var content = this.content.slice();
    content.splice(found2, 2);
    return new OrderedMap(content);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(key, value) {
    return new OrderedMap([key, value].concat(this.remove(key).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(key, value) {
    var content = this.remove(key).content.slice();
    content.push(key, value);
    return new OrderedMap(content);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(place, key, value) {
    var without = this.remove(key), content = without.content.slice();
    var found2 = without.find(place);
    content.splice(found2 == -1 ? content.length : found2, 0, key, value);
    return new OrderedMap(content);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(f) {
    for (var i = 0; i < this.content.length; i += 2)
      f(this.content[i], this.content[i + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(map) {
    map = OrderedMap.from(map);
    if (!map.size)
      return this;
    return new OrderedMap(map.content.concat(this.subtract(map).content));
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(map) {
    map = OrderedMap.from(map);
    if (!map.size)
      return this;
    return new OrderedMap(this.subtract(map).content.concat(map.content));
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(map) {
    var result = this;
    map = OrderedMap.from(map);
    for (var i = 0; i < map.content.length; i += 2)
      result = result.remove(map.content[i]);
    return result;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var result = {};
    this.forEach(function(key, value) {
      result[key] = value;
    });
    return result;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
OrderedMap.from = function(value) {
  if (value instanceof OrderedMap)
    return value;
  var content = [];
  if (value)
    for (var prop in value)
      content.push(prop, value[prop]);
  return new OrderedMap(content);
};
var dist_default = OrderedMap;

// node_modules/prosemirror-model/dist/index.js
function findDiffStart(a, b, pos) {
  for (let i = 0; ; i++) {
    if (i == a.childCount || i == b.childCount)
      return a.childCount == b.childCount ? null : pos;
    let childA = a.child(i), childB = b.child(i);
    if (childA == childB) {
      pos += childA.nodeSize;
      continue;
    }
    if (!childA.sameMarkup(childB))
      return pos;
    if (childA.isText && childA.text != childB.text) {
      for (let j = 0; childA.text[j] == childB.text[j]; j++)
        pos++;
      return pos;
    }
    if (childA.content.size || childB.content.size) {
      let inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner != null)
        return inner;
    }
    pos += childA.nodeSize;
  }
}
function findDiffEnd(a, b, posA, posB) {
  for (let iA = a.childCount, iB = b.childCount; ; ) {
    if (iA == 0 || iB == 0)
      return iA == iB ? null : { a: posA, b: posB };
    let childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
    if (childA == childB) {
      posA -= size;
      posB -= size;
      continue;
    }
    if (!childA.sameMarkup(childB))
      return { a: posA, b: posB };
    if (childA.isText && childA.text != childB.text) {
      let same = 0, minSize = Math.min(childA.text.length, childB.text.length);
      while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
        same++;
        posA--;
        posB--;
      }
      return { a: posA, b: posB };
    }
    if (childA.content.size || childB.content.size) {
      let inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner)
        return inner;
    }
    posA -= size;
    posB -= size;
  }
}
var Fragment = class _Fragment {
  /**
  @internal
  */
  constructor(content, size) {
    this.content = content;
    this.size = size || 0;
    if (size == null)
      for (let i = 0; i < content.length; i++)
        this.size += content[i].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(from, to, f, nodeStart = 0, parent) {
    for (let i = 0, pos = 0; pos < to; i++) {
      let child = this.content[i], end = pos + child.nodeSize;
      if (end > from && f(child, nodeStart + pos, parent || null, i) !== false && child.content.size) {
        let start = pos + 1;
        child.nodesBetween(Math.max(0, from - start), Math.min(child.content.size, to - start), f, nodeStart + start);
      }
      pos = end;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(f) {
    this.nodesBetween(0, this.size, f);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(from, to, blockSeparator, leafText) {
    let text = "", first = true;
    this.nodesBetween(from, to, (node, pos) => {
      let nodeText = node.isText ? node.text.slice(Math.max(from, pos) - pos, to - pos) : !node.isLeaf ? "" : leafText ? typeof leafText === "function" ? leafText(node) : leafText : node.type.spec.leafText ? node.type.spec.leafText(node) : "";
      if (node.isBlock && (node.isLeaf && nodeText || node.isTextblock) && blockSeparator) {
        if (first)
          first = false;
        else
          text += blockSeparator;
      }
      text += nodeText;
    }, 0);
    return text;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(other) {
    if (!other.size)
      return this;
    if (!this.size)
      return other;
    let last = this.lastChild, first = other.firstChild, content = this.content.slice(), i = 0;
    if (last.isText && last.sameMarkup(first)) {
      content[content.length - 1] = last.withText(last.text + first.text);
      i = 1;
    }
    for (; i < other.content.length; i++)
      content.push(other.content[i]);
    return new _Fragment(content, this.size + other.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(from, to = this.size) {
    if (from == 0 && to == this.size)
      return this;
    let result = [], size = 0;
    if (to > from)
      for (let i = 0, pos = 0; pos < to; i++) {
        let child = this.content[i], end = pos + child.nodeSize;
        if (end > from) {
          if (pos < from || end > to) {
            if (child.isText)
              child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos));
            else
              child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1));
          }
          result.push(child);
          size += child.nodeSize;
        }
        pos = end;
      }
    return new _Fragment(result, size);
  }
  /**
  @internal
  */
  cutByIndex(from, to) {
    if (from == to)
      return _Fragment.empty;
    if (from == 0 && to == this.content.length)
      return this;
    return new _Fragment(this.content.slice(from, to));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(index, node) {
    let current = this.content[index];
    if (current == node)
      return this;
    let copy2 = this.content.slice();
    let size = this.size + node.nodeSize - current.nodeSize;
    copy2[index] = node;
    return new _Fragment(copy2, size);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(node) {
    return new _Fragment([node].concat(this.content), this.size + node.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(node) {
    return new _Fragment(this.content.concat(node), this.size + node.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(other) {
    if (this.content.length != other.content.length)
      return false;
    for (let i = 0; i < this.content.length; i++)
      if (!this.content[i].eq(other.content[i]))
        return false;
    return true;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(index) {
    let found2 = this.content[index];
    if (!found2)
      throw new RangeError("Index " + index + " out of range for " + this);
    return found2;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(index) {
    return this.content[index] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(f) {
    for (let i = 0, p = 0; i < this.content.length; i++) {
      let child = this.content[i];
      f(child, p, i);
      p += child.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(other, pos = 0) {
    return findDiffStart(this, other, pos);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(other, pos = this.size, otherPos = other.size) {
    return findDiffEnd(this, other, pos, otherPos);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(pos, round = -1) {
    if (pos == 0)
      return retIndex(0, pos);
    if (pos == this.size)
      return retIndex(this.content.length, pos);
    if (pos > this.size || pos < 0)
      throw new RangeError(`Position ${pos} outside of fragment (${this})`);
    for (let i = 0, curPos = 0; ; i++) {
      let cur = this.child(i), end = curPos + cur.nodeSize;
      if (end >= pos) {
        if (end == pos || round > 0)
          return retIndex(i + 1, end);
        return retIndex(i, curPos);
      }
      curPos = end;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((n) => n.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(schema, value) {
    if (!value)
      return _Fragment.empty;
    if (!Array.isArray(value))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new _Fragment(value.map(schema.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(array) {
    if (!array.length)
      return _Fragment.empty;
    let joined, size = 0;
    for (let i = 0; i < array.length; i++) {
      let node = array[i];
      size += node.nodeSize;
      if (i && node.isText && array[i - 1].sameMarkup(node)) {
        if (!joined)
          joined = array.slice(0, i);
        joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
      } else if (joined) {
        joined.push(node);
      }
    }
    return new _Fragment(joined || array, size);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(nodes) {
    if (!nodes)
      return _Fragment.empty;
    if (nodes instanceof _Fragment)
      return nodes;
    if (Array.isArray(nodes))
      return this.fromArray(nodes);
    if (nodes.attrs)
      return new _Fragment([nodes], nodes.nodeSize);
    throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
};
Fragment.empty = new Fragment([], 0);
var found = { index: 0, offset: 0 };
function retIndex(index, offset) {
  found.index = index;
  found.offset = offset;
  return found;
}
function compareDeep(a, b) {
  if (a === b)
    return true;
  if (!(a && typeof a == "object") || !(b && typeof b == "object"))
    return false;
  let array = Array.isArray(a);
  if (Array.isArray(b) != array)
    return false;
  if (array) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!compareDeep(a[i], b[i]))
        return false;
  } else {
    for (let p in a)
      if (!(p in b) || !compareDeep(a[p], b[p]))
        return false;
    for (let p in b)
      if (!(p in a))
        return false;
  }
  return true;
}
var Mark = class _Mark {
  /**
  @internal
  */
  constructor(type, attrs) {
    this.type = type;
    this.attrs = attrs;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(set) {
    let copy2, placed = false;
    for (let i = 0; i < set.length; i++) {
      let other = set[i];
      if (this.eq(other))
        return set;
      if (this.type.excludes(other.type)) {
        if (!copy2)
          copy2 = set.slice(0, i);
      } else if (other.type.excludes(this.type)) {
        return set;
      } else {
        if (!placed && other.type.rank > this.type.rank) {
          if (!copy2)
            copy2 = set.slice(0, i);
          copy2.push(this);
          placed = true;
        }
        if (copy2)
          copy2.push(other);
      }
    }
    if (!copy2)
      copy2 = set.slice();
    if (!placed)
      copy2.push(this);
    return copy2;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(set) {
    for (let i = 0; i < set.length; i++)
      if (this.eq(set[i]))
        return set.slice(0, i).concat(set.slice(i + 1));
    return set;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(set) {
    for (let i = 0; i < set.length; i++)
      if (this.eq(set[i]))
        return true;
    return false;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(other) {
    return this == other || this.type == other.type && compareDeep(this.attrs, other.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let obj = { type: this.type.name };
    for (let _ in this.attrs) {
      obj.attrs = this.attrs;
      break;
    }
    return obj;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(schema, json) {
    if (!json)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let type = schema.marks[json.type];
    if (!type)
      throw new RangeError(`There is no mark type ${json.type} in this schema`);
    return type.create(json.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(a, b) {
    if (a == b)
      return true;
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!a[i].eq(b[i]))
        return false;
    return true;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(marks) {
    if (!marks || Array.isArray(marks) && marks.length == 0)
      return _Mark.none;
    if (marks instanceof _Mark)
      return [marks];
    let copy2 = marks.slice();
    copy2.sort((a, b) => a.type.rank - b.type.rank);
    return copy2;
  }
};
Mark.none = [];
var ReplaceError = class extends Error {
};
var Slice = class _Slice {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(content, openStart, openEnd) {
    this.content = content;
    this.openStart = openStart;
    this.openEnd = openEnd;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(pos, fragment) {
    let content = insertInto(this.content, pos + this.openStart, fragment);
    return content && new _Slice(content, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(from, to) {
    return new _Slice(removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(other) {
    return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let json = { content: this.content.toJSON() };
    if (this.openStart > 0)
      json.openStart = this.openStart;
    if (this.openEnd > 0)
      json.openEnd = this.openEnd;
    return json;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(schema, json) {
    if (!json)
      return _Slice.empty;
    let openStart = json.openStart || 0, openEnd = json.openEnd || 0;
    if (typeof openStart != "number" || typeof openEnd != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new _Slice(Fragment.fromJSON(schema, json.content), openStart, openEnd);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(fragment, openIsolating = true) {
    let openStart = 0, openEnd = 0;
    for (let n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild)
      openStart++;
    for (let n = fragment.lastChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.lastChild)
      openEnd++;
    return new _Slice(fragment, openStart, openEnd);
  }
};
Slice.empty = new Slice(Fragment.empty, 0, 0);
function removeRange(content, from, to) {
  let { index, offset } = content.findIndex(from), child = content.maybeChild(index);
  let { index: indexTo, offset: offsetTo } = content.findIndex(to);
  if (offset == from || child.isText) {
    if (offsetTo != to && !content.child(indexTo).isText)
      throw new RangeError("Removing non-flat range");
    return content.cut(0, from).append(content.cut(to));
  }
  if (index != indexTo)
    throw new RangeError("Removing non-flat range");
  return content.replaceChild(index, child.copy(removeRange(child.content, from - offset - 1, to - offset - 1)));
}
function insertInto(content, dist, insert, parent) {
  let { index, offset } = content.findIndex(dist), child = content.maybeChild(index);
  if (offset == dist || child.isText) {
    if (parent && !parent.canReplace(index, index, insert))
      return null;
    return content.cut(0, dist).append(insert).append(content.cut(dist));
  }
  let inner = insertInto(child.content, dist - offset - 1, insert);
  return inner && content.replaceChild(index, child.copy(inner));
}
function replace($from, $to, slice) {
  if (slice.openStart > $from.depth)
    throw new ReplaceError("Inserted content deeper than insertion position");
  if ($from.depth - slice.openStart != $to.depth - slice.openEnd)
    throw new ReplaceError("Inconsistent open depths");
  return replaceOuter($from, $to, slice, 0);
}
function replaceOuter($from, $to, slice, depth) {
  let index = $from.index(depth), node = $from.node(depth);
  if (index == $to.index(depth) && depth < $from.depth - slice.openStart) {
    let inner = replaceOuter($from, $to, slice, depth + 1);
    return node.copy(node.content.replaceChild(index, inner));
  } else if (!slice.content.size) {
    return close(node, replaceTwoWay($from, $to, depth));
  } else if (!slice.openStart && !slice.openEnd && $from.depth == depth && $to.depth == depth) {
    let parent = $from.parent, content = parent.content;
    return close(parent, content.cut(0, $from.parentOffset).append(slice.content).append(content.cut($to.parentOffset)));
  } else {
    let { start, end } = prepareSliceForReplace(slice, $from);
    return close(node, replaceThreeWay($from, start, end, $to, depth));
  }
}
function checkJoin(main, sub) {
  if (!sub.type.compatibleContent(main.type))
    throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main.type.name);
}
function joinable($before, $after, depth) {
  let node = $before.node(depth);
  checkJoin(node, $after.node(depth));
  return node;
}
function addNode(child, target) {
  let last = target.length - 1;
  if (last >= 0 && child.isText && child.sameMarkup(target[last]))
    target[last] = child.withText(target[last].text + child.text);
  else
    target.push(child);
}
function addRange($start, $end, depth, target) {
  let node = ($end || $start).node(depth);
  let startIndex = 0, endIndex = $end ? $end.index(depth) : node.childCount;
  if ($start) {
    startIndex = $start.index(depth);
    if ($start.depth > depth) {
      startIndex++;
    } else if ($start.textOffset) {
      addNode($start.nodeAfter, target);
      startIndex++;
    }
  }
  for (let i = startIndex; i < endIndex; i++)
    addNode(node.child(i), target);
  if ($end && $end.depth == depth && $end.textOffset)
    addNode($end.nodeBefore, target);
}
function close(node, content) {
  node.type.checkContent(content);
  return node.copy(content);
}
function replaceThreeWay($from, $start, $end, $to, depth) {
  let openStart = $from.depth > depth && joinable($from, $start, depth + 1);
  let openEnd = $to.depth > depth && joinable($end, $to, depth + 1);
  let content = [];
  addRange(null, $from, depth, content);
  if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
    checkJoin(openStart, openEnd);
    addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content);
  } else {
    if (openStart)
      addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content);
    addRange($start, $end, depth, content);
    if (openEnd)
      addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content);
  }
  addRange($to, null, depth, content);
  return new Fragment(content);
}
function replaceTwoWay($from, $to, depth) {
  let content = [];
  addRange(null, $from, depth, content);
  if ($from.depth > depth) {
    let type = joinable($from, $to, depth + 1);
    addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content);
  }
  addRange($to, null, depth, content);
  return new Fragment(content);
}
function prepareSliceForReplace(slice, $along) {
  let extra = $along.depth - slice.openStart, parent = $along.node(extra);
  let node = parent.copy(slice.content);
  for (let i = extra - 1; i >= 0; i--)
    node = $along.node(i).copy(Fragment.from(node));
  return {
    start: node.resolveNoCache(slice.openStart + extra),
    end: node.resolveNoCache(node.content.size - slice.openEnd - extra)
  };
}
var ResolvedPos = class _ResolvedPos {
  /**
  @internal
  */
  constructor(pos, path, parentOffset) {
    this.pos = pos;
    this.path = path;
    this.parentOffset = parentOffset;
    this.depth = path.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(val) {
    if (val == null)
      return this.depth;
    if (val < 0)
      return this.depth + val;
    return val;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(depth) {
    return this.path[this.resolveDepth(depth) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(depth) {
    return this.path[this.resolveDepth(depth) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(depth) {
    depth = this.resolveDepth(depth);
    return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(depth) {
    depth = this.resolveDepth(depth);
    return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(depth) {
    depth = this.resolveDepth(depth);
    return this.start(depth) + this.node(depth).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(depth) {
    depth = this.resolveDepth(depth);
    if (!depth)
      throw new RangeError("There is no position before the top-level node");
    return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(depth) {
    depth = this.resolveDepth(depth);
    if (!depth)
      throw new RangeError("There is no position after the top-level node");
    return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let parent = this.parent, index = this.index(this.depth);
    if (index == parent.childCount)
      return null;
    let dOff = this.pos - this.path[this.path.length - 1], child = parent.child(index);
    return dOff ? parent.child(index).cut(dOff) : child;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let index = this.index(this.depth);
    let dOff = this.pos - this.path[this.path.length - 1];
    if (dOff)
      return this.parent.child(index).cut(0, dOff);
    return index == 0 ? null : this.parent.child(index - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(index, depth) {
    depth = this.resolveDepth(depth);
    let node = this.path[depth * 3], pos = depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
    for (let i = 0; i < index; i++)
      pos += node.child(i).nodeSize;
    return pos;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let parent = this.parent, index = this.index();
    if (parent.content.size == 0)
      return Mark.none;
    if (this.textOffset)
      return parent.child(index).marks;
    let main = parent.maybeChild(index - 1), other = parent.maybeChild(index);
    if (!main) {
      let tmp = main;
      main = other;
      other = tmp;
    }
    let marks = main.marks;
    for (var i = 0; i < marks.length; i++)
      if (marks[i].type.spec.inclusive === false && (!other || !marks[i].isInSet(other.marks)))
        marks = marks[i--].removeFromSet(marks);
    return marks;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross($end) {
    let after = this.parent.maybeChild(this.index());
    if (!after || !after.isInline)
      return null;
    let marks = after.marks, next = $end.parent.maybeChild($end.index());
    for (var i = 0; i < marks.length; i++)
      if (marks[i].type.spec.inclusive === false && (!next || !marks[i].isInSet(next.marks)))
        marks = marks[i--].removeFromSet(marks);
    return marks;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(pos) {
    for (let depth = this.depth; depth > 0; depth--)
      if (this.start(depth) <= pos && this.end(depth) >= pos)
        return depth;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(other = this, pred) {
    if (other.pos < this.pos)
      return other.blockRange(this);
    for (let d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--)
      if (other.pos <= this.end(d) && (!pred || pred(this.node(d))))
        return new NodeRange(this, other, d);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(other) {
    return this.pos - this.parentOffset == other.pos - other.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(other) {
    return other.pos > this.pos ? other : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(other) {
    return other.pos < this.pos ? other : this;
  }
  /**
  @internal
  */
  toString() {
    let str = "";
    for (let i = 1; i <= this.depth; i++)
      str += (str ? "/" : "") + this.node(i).type.name + "_" + this.index(i - 1);
    return str + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(doc2, pos) {
    if (!(pos >= 0 && pos <= doc2.content.size))
      throw new RangeError("Position " + pos + " out of range");
    let path = [];
    let start = 0, parentOffset = pos;
    for (let node = doc2; ; ) {
      let { index, offset } = node.content.findIndex(parentOffset);
      let rem = parentOffset - offset;
      path.push(node, index, start + offset);
      if (!rem)
        break;
      node = node.child(index);
      if (node.isText)
        break;
      parentOffset = rem - 1;
      start += offset + 1;
    }
    return new _ResolvedPos(pos, path, parentOffset);
  }
  /**
  @internal
  */
  static resolveCached(doc2, pos) {
    for (let i = 0; i < resolveCache.length; i++) {
      let cached = resolveCache[i];
      if (cached.pos == pos && cached.doc == doc2)
        return cached;
    }
    let result = resolveCache[resolveCachePos] = _ResolvedPos.resolve(doc2, pos);
    resolveCachePos = (resolveCachePos + 1) % resolveCacheSize;
    return result;
  }
};
var resolveCache = [];
var resolveCachePos = 0;
var resolveCacheSize = 12;
var NodeRange = class {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor($from, $to, depth) {
    this.$from = $from;
    this.$to = $to;
    this.depth = depth;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
};
var emptyAttrs = /* @__PURE__ */ Object.create(null);
var Node = class _Node {
  /**
  @internal
  */
  constructor(type, attrs, content, marks = Mark.none) {
    this.type = type;
    this.attrs = attrs;
    this.marks = marks;
    this.content = content || Fragment.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(index) {
    return this.content.child(index);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(index) {
    return this.content.maybeChild(index);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(f) {
    this.content.forEach(f);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(from, to, f, startPos = 0) {
    this.content.nodesBetween(from, to, f, startPos, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(f) {
    this.nodesBetween(0, this.content.size, f);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(from, to, blockSeparator, leafText) {
    return this.content.textBetween(from, to, blockSeparator, leafText);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(other) {
    return this == other || this.sameMarkup(other) && this.content.eq(other.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(other) {
    return this.hasMarkup(other.type, other.attrs, other.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(type, attrs, marks) {
    return this.type == type && compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) && Mark.sameSet(this.marks, marks || Mark.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(content = null) {
    if (content == this.content)
      return this;
    return new _Node(this.type, this.attrs, content, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(marks) {
    return marks == this.marks ? this : new _Node(this.type, this.attrs, this.content, marks);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(from, to = this.content.size) {
    if (from == 0 && to == this.content.size)
      return this;
    return this.copy(this.content.cut(from, to));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(from, to = this.content.size, includeParents = false) {
    if (from == to)
      return Slice.empty;
    let $from = this.resolve(from), $to = this.resolve(to);
    let depth = includeParents ? 0 : $from.sharedDepth(to);
    let start = $from.start(depth), node = $from.node(depth);
    let content = node.content.cut($from.pos - start, $to.pos - start);
    return new Slice(content, $from.depth - depth, $to.depth - depth);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(from, to, slice) {
    return replace(this.resolve(from), this.resolve(to), slice);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(pos) {
    for (let node = this; ; ) {
      let { index, offset } = node.content.findIndex(pos);
      node = node.maybeChild(index);
      if (!node)
        return null;
      if (offset == pos || node.isText)
        return node;
      pos -= offset + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(pos) {
    let { index, offset } = this.content.findIndex(pos);
    return { node: this.content.maybeChild(index), index, offset };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(pos) {
    if (pos == 0)
      return { node: null, index: 0, offset: 0 };
    let { index, offset } = this.content.findIndex(pos);
    if (offset < pos)
      return { node: this.content.child(index), index, offset };
    let node = this.content.child(index - 1);
    return { node, index: index - 1, offset: offset - node.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(pos) {
    return ResolvedPos.resolveCached(this, pos);
  }
  /**
  @internal
  */
  resolveNoCache(pos) {
    return ResolvedPos.resolve(this, pos);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(from, to, type) {
    let found2 = false;
    if (to > from)
      this.nodesBetween(from, to, (node) => {
        if (type.isInSet(node.marks))
          found2 = true;
        return !found2;
      });
    return found2;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let name = this.type.name;
    if (this.content.size)
      name += "(" + this.content.toStringInner() + ")";
    return wrapMarks(this.marks, name);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(index) {
    let match = this.type.contentMatch.matchFragment(this.content, 0, index);
    if (!match)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return match;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(from, to, replacement = Fragment.empty, start = 0, end = replacement.childCount) {
    let one = this.contentMatchAt(from).matchFragment(replacement, start, end);
    let two = one && one.matchFragment(this.content, to);
    if (!two || !two.validEnd)
      return false;
    for (let i = start; i < end; i++)
      if (!this.type.allowsMarks(replacement.child(i).marks))
        return false;
    return true;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(from, to, type, marks) {
    if (marks && !this.type.allowsMarks(marks))
      return false;
    let start = this.contentMatchAt(from).matchType(type);
    let end = start && start.matchFragment(this.content, to);
    return end ? end.validEnd : false;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(other) {
    if (other.content.size)
      return this.canReplace(this.childCount, this.childCount, other.content);
    else
      return this.type.compatibleContent(other.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise error when they do not.
  */
  check() {
    this.type.checkContent(this.content);
    let copy2 = Mark.none;
    for (let i = 0; i < this.marks.length; i++)
      copy2 = this.marks[i].addToSet(copy2);
    if (!Mark.sameSet(copy2, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((m) => m.type.name)}`);
    this.content.forEach((node) => node.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let obj = { type: this.type.name };
    for (let _ in this.attrs) {
      obj.attrs = this.attrs;
      break;
    }
    if (this.content.size)
      obj.content = this.content.toJSON();
    if (this.marks.length)
      obj.marks = this.marks.map((n) => n.toJSON());
    return obj;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(schema, json) {
    if (!json)
      throw new RangeError("Invalid input for Node.fromJSON");
    let marks = null;
    if (json.marks) {
      if (!Array.isArray(json.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      marks = json.marks.map(schema.markFromJSON);
    }
    if (json.type == "text") {
      if (typeof json.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return schema.text(json.text, marks);
    }
    let content = Fragment.fromJSON(schema, json.content);
    return schema.nodeType(json.type).create(json.attrs, content, marks);
  }
};
Node.prototype.text = void 0;
var TextNode = class _TextNode extends Node {
  /**
  @internal
  */
  constructor(type, attrs, content, marks) {
    super(type, attrs, null, marks);
    if (!content)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = content;
  }
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    return wrapMarks(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(from, to) {
    return this.text.slice(from, to);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(marks) {
    return marks == this.marks ? this : new _TextNode(this.type, this.attrs, this.text, marks);
  }
  withText(text) {
    if (text == this.text)
      return this;
    return new _TextNode(this.type, this.attrs, text, this.marks);
  }
  cut(from = 0, to = this.text.length) {
    if (from == 0 && to == this.text.length)
      return this;
    return this.withText(this.text.slice(from, to));
  }
  eq(other) {
    return this.sameMarkup(other) && this.text == other.text;
  }
  toJSON() {
    let base = super.toJSON();
    base.text = this.text;
    return base;
  }
};
function wrapMarks(marks, str) {
  for (let i = marks.length - 1; i >= 0; i--)
    str = marks[i].type.name + "(" + str + ")";
  return str;
}
var ContentMatch = class _ContentMatch {
  /**
  @internal
  */
  constructor(validEnd) {
    this.validEnd = validEnd;
    this.next = [];
    this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(string, nodeTypes) {
    let stream = new TokenStream(string, nodeTypes);
    if (stream.next == null)
      return _ContentMatch.empty;
    let expr = parseExpr(stream);
    if (stream.next)
      stream.err("Unexpected trailing text");
    let match = dfa(nfa(expr));
    checkForDeadEnds(match, stream);
    return match;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(type) {
    for (let i = 0; i < this.next.length; i++)
      if (this.next[i].type == type)
        return this.next[i].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(frag, start = 0, end = frag.childCount) {
    let cur = this;
    for (let i = start; cur && i < end; i++)
      cur = cur.matchType(frag.child(i).type);
    return cur;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let i = 0; i < this.next.length; i++) {
      let { type } = this.next[i];
      if (!(type.isText || type.hasRequiredAttrs()))
        return type;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(other) {
    for (let i = 0; i < this.next.length; i++)
      for (let j = 0; j < other.next.length; j++)
        if (this.next[i].type == other.next[j].type)
          return true;
    return false;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(after, toEnd = false, startIndex = 0) {
    let seen = [this];
    function search(match, types) {
      let finished = match.matchFragment(after, startIndex);
      if (finished && (!toEnd || finished.validEnd))
        return Fragment.from(types.map((tp) => tp.createAndFill()));
      for (let i = 0; i < match.next.length; i++) {
        let { type, next } = match.next[i];
        if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
          seen.push(next);
          let found2 = search(next, types.concat(type));
          if (found2)
            return found2;
        }
      }
      return null;
    }
    return search(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(target) {
    for (let i = 0; i < this.wrapCache.length; i += 2)
      if (this.wrapCache[i] == target)
        return this.wrapCache[i + 1];
    let computed = this.computeWrapping(target);
    this.wrapCache.push(target, computed);
    return computed;
  }
  /**
  @internal
  */
  computeWrapping(target) {
    let seen = /* @__PURE__ */ Object.create(null), active = [{ match: this, type: null, via: null }];
    while (active.length) {
      let current = active.shift(), match = current.match;
      if (match.matchType(target)) {
        let result = [];
        for (let obj = current; obj.type; obj = obj.via)
          result.push(obj.type);
        return result.reverse();
      }
      for (let i = 0; i < match.next.length; i++) {
        let { type, next } = match.next[i];
        if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || next.validEnd)) {
          active.push({ match: type.contentMatch, type, via: current });
          seen[type.name] = true;
        }
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(n) {
    if (n >= this.next.length)
      throw new RangeError(`There's no ${n}th edge in this content match`);
    return this.next[n];
  }
  /**
  @internal
  */
  toString() {
    let seen = [];
    function scan(m) {
      seen.push(m);
      for (let i = 0; i < m.next.length; i++)
        if (seen.indexOf(m.next[i].next) == -1)
          scan(m.next[i].next);
    }
    scan(this);
    return seen.map((m, i) => {
      let out = i + (m.validEnd ? "*" : " ") + " ";
      for (let i2 = 0; i2 < m.next.length; i2++)
        out += (i2 ? ", " : "") + m.next[i2].type.name + "->" + seen.indexOf(m.next[i2].next);
      return out;
    }).join("\n");
  }
};
ContentMatch.empty = new ContentMatch(true);
var TokenStream = class {
  constructor(string, nodeTypes) {
    this.string = string;
    this.nodeTypes = nodeTypes;
    this.inline = null;
    this.pos = 0;
    this.tokens = string.split(/\s*(?=\b|\W|$)/);
    if (this.tokens[this.tokens.length - 1] == "")
      this.tokens.pop();
    if (this.tokens[0] == "")
      this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(tok) {
    return this.next == tok && (this.pos++ || true);
  }
  err(str) {
    throw new SyntaxError(str + " (in content expression '" + this.string + "')");
  }
};
function parseExpr(stream) {
  let exprs = [];
  do {
    exprs.push(parseExprSeq(stream));
  } while (stream.eat("|"));
  return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
}
function parseExprSeq(stream) {
  let exprs = [];
  do {
    exprs.push(parseExprSubscript(stream));
  } while (stream.next && stream.next != ")" && stream.next != "|");
  return exprs.length == 1 ? exprs[0] : { type: "seq", exprs };
}
function parseExprSubscript(stream) {
  let expr = parseExprAtom(stream);
  for (; ; ) {
    if (stream.eat("+"))
      expr = { type: "plus", expr };
    else if (stream.eat("*"))
      expr = { type: "star", expr };
    else if (stream.eat("?"))
      expr = { type: "opt", expr };
    else if (stream.eat("{"))
      expr = parseExprRange(stream, expr);
    else
      break;
  }
  return expr;
}
function parseNum(stream) {
  if (/\D/.test(stream.next))
    stream.err("Expected number, got '" + stream.next + "'");
  let result = Number(stream.next);
  stream.pos++;
  return result;
}
function parseExprRange(stream, expr) {
  let min = parseNum(stream), max = min;
  if (stream.eat(",")) {
    if (stream.next != "}")
      max = parseNum(stream);
    else
      max = -1;
  }
  if (!stream.eat("}"))
    stream.err("Unclosed braced range");
  return { type: "range", min, max, expr };
}
function resolveName(stream, name) {
  let types = stream.nodeTypes, type = types[name];
  if (type)
    return [type];
  let result = [];
  for (let typeName in types) {
    let type2 = types[typeName];
    if (type2.groups.indexOf(name) > -1)
      result.push(type2);
  }
  if (result.length == 0)
    stream.err("No node type or group '" + name + "' found");
  return result;
}
function parseExprAtom(stream) {
  if (stream.eat("(")) {
    let expr = parseExpr(stream);
    if (!stream.eat(")"))
      stream.err("Missing closing paren");
    return expr;
  } else if (!/\W/.test(stream.next)) {
    let exprs = resolveName(stream, stream.next).map((type) => {
      if (stream.inline == null)
        stream.inline = type.isInline;
      else if (stream.inline != type.isInline)
        stream.err("Mixing inline and block content");
      return { type: "name", value: type };
    });
    stream.pos++;
    return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
  } else {
    stream.err("Unexpected token '" + stream.next + "'");
  }
}
function nfa(expr) {
  let nfa2 = [[]];
  connect(compile(expr, 0), node());
  return nfa2;
  function node() {
    return nfa2.push([]) - 1;
  }
  function edge(from, to, term) {
    let edge2 = { term, to };
    nfa2[from].push(edge2);
    return edge2;
  }
  function connect(edges, to) {
    edges.forEach((edge2) => edge2.to = to);
  }
  function compile(expr2, from) {
    if (expr2.type == "choice") {
      return expr2.exprs.reduce((out, expr3) => out.concat(compile(expr3, from)), []);
    } else if (expr2.type == "seq") {
      for (let i = 0; ; i++) {
        let next = compile(expr2.exprs[i], from);
        if (i == expr2.exprs.length - 1)
          return next;
        connect(next, from = node());
      }
    } else if (expr2.type == "star") {
      let loop = node();
      edge(from, loop);
      connect(compile(expr2.expr, loop), loop);
      return [edge(loop)];
    } else if (expr2.type == "plus") {
      let loop = node();
      connect(compile(expr2.expr, from), loop);
      connect(compile(expr2.expr, loop), loop);
      return [edge(loop)];
    } else if (expr2.type == "opt") {
      return [edge(from)].concat(compile(expr2.expr, from));
    } else if (expr2.type == "range") {
      let cur = from;
      for (let i = 0; i < expr2.min; i++) {
        let next = node();
        connect(compile(expr2.expr, cur), next);
        cur = next;
      }
      if (expr2.max == -1) {
        connect(compile(expr2.expr, cur), cur);
      } else {
        for (let i = expr2.min; i < expr2.max; i++) {
          let next = node();
          edge(cur, next);
          connect(compile(expr2.expr, cur), next);
          cur = next;
        }
      }
      return [edge(cur)];
    } else if (expr2.type == "name") {
      return [edge(from, void 0, expr2.value)];
    } else {
      throw new Error("Unknown expr type");
    }
  }
}
function cmp(a, b) {
  return b - a;
}
function nullFrom(nfa2, node) {
  let result = [];
  scan(node);
  return result.sort(cmp);
  function scan(node2) {
    let edges = nfa2[node2];
    if (edges.length == 1 && !edges[0].term)
      return scan(edges[0].to);
    result.push(node2);
    for (let i = 0; i < edges.length; i++) {
      let { term, to } = edges[i];
      if (!term && result.indexOf(to) == -1)
        scan(to);
    }
  }
}
function dfa(nfa2) {
  let labeled = /* @__PURE__ */ Object.create(null);
  return explore(nullFrom(nfa2, 0));
  function explore(states) {
    let out = [];
    states.forEach((node) => {
      nfa2[node].forEach(({ term, to }) => {
        if (!term)
          return;
        let set;
        for (let i = 0; i < out.length; i++)
          if (out[i][0] == term)
            set = out[i][1];
        nullFrom(nfa2, to).forEach((node2) => {
          if (!set)
            out.push([term, set = []]);
          if (set.indexOf(node2) == -1)
            set.push(node2);
        });
      });
    });
    let state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa2.length - 1) > -1);
    for (let i = 0; i < out.length; i++) {
      let states2 = out[i][1].sort(cmp);
      state.next.push({ type: out[i][0], next: labeled[states2.join(",")] || explore(states2) });
    }
    return state;
  }
}
function checkForDeadEnds(match, stream) {
  for (let i = 0, work = [match]; i < work.length; i++) {
    let state = work[i], dead = !state.validEnd, nodes = [];
    for (let j = 0; j < state.next.length; j++) {
      let { type, next } = state.next[j];
      nodes.push(type.name);
      if (dead && !(type.isText || type.hasRequiredAttrs()))
        dead = false;
      if (work.indexOf(next) == -1)
        work.push(next);
    }
    if (dead)
      stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function defaultAttrs(attrs) {
  let defaults = /* @__PURE__ */ Object.create(null);
  for (let attrName in attrs) {
    let attr = attrs[attrName];
    if (!attr.hasDefault)
      return null;
    defaults[attrName] = attr.default;
  }
  return defaults;
}
function computeAttrs(attrs, value) {
  let built = /* @__PURE__ */ Object.create(null);
  for (let name in attrs) {
    let given = value && value[name];
    if (given === void 0) {
      let attr = attrs[name];
      if (attr.hasDefault)
        given = attr.default;
      else
        throw new RangeError("No value supplied for attribute " + name);
    }
    built[name] = given;
  }
  return built;
}
function initAttrs(attrs) {
  let result = /* @__PURE__ */ Object.create(null);
  if (attrs)
    for (let name in attrs)
      result[name] = new Attribute(attrs[name]);
  return result;
}
var NodeType = class _NodeType {
  /**
  @internal
  */
  constructor(name, schema, spec) {
    this.name = name;
    this.schema = schema;
    this.spec = spec;
    this.markSet = null;
    this.groups = spec.group ? spec.group.split(" ") : [];
    this.attrs = initAttrs(spec.attrs);
    this.defaultAttrs = defaultAttrs(this.attrs);
    this.contentMatch = null;
    this.inlineContent = null;
    this.isBlock = !(spec.inline || name == "text");
    this.isText = name == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == ContentMatch.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let n in this.attrs)
      if (this.attrs[n].isRequired)
        return true;
    return false;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(other) {
    return this == other || this.contentMatch.compatible(other.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(attrs) {
    if (!attrs && this.defaultAttrs)
      return this.defaultAttrs;
    else
      return computeAttrs(this.attrs, attrs);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(attrs = null, content, marks) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Node(this, this.computeAttrs(attrs), Fragment.from(content), Mark.setFrom(marks));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(attrs = null, content, marks) {
    content = Fragment.from(content);
    this.checkContent(content);
    return new Node(this, this.computeAttrs(attrs), content, Mark.setFrom(marks));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(attrs = null, content, marks) {
    attrs = this.computeAttrs(attrs);
    content = Fragment.from(content);
    if (content.size) {
      let before = this.contentMatch.fillBefore(content);
      if (!before)
        return null;
      content = before.append(content);
    }
    let matched = this.contentMatch.matchFragment(content);
    let after = matched && matched.fillBefore(Fragment.empty, true);
    if (!after)
      return null;
    return new Node(this, attrs, content.append(after), Mark.setFrom(marks));
  }
  /**
  Returns true if the given fragment is valid content for this node
  type with the given attributes.
  */
  validContent(content) {
    let result = this.contentMatch.matchFragment(content);
    if (!result || !result.validEnd)
      return false;
    for (let i = 0; i < content.childCount; i++)
      if (!this.allowsMarks(content.child(i).marks))
        return false;
    return true;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(content) {
    if (!this.validContent(content))
      throw new RangeError(`Invalid content for node ${this.name}: ${content.toString().slice(0, 50)}`);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(markType) {
    return this.markSet == null || this.markSet.indexOf(markType) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(marks) {
    if (this.markSet == null)
      return true;
    for (let i = 0; i < marks.length; i++)
      if (!this.allowsMarkType(marks[i].type))
        return false;
    return true;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(marks) {
    if (this.markSet == null)
      return marks;
    let copy2;
    for (let i = 0; i < marks.length; i++) {
      if (!this.allowsMarkType(marks[i].type)) {
        if (!copy2)
          copy2 = marks.slice(0, i);
      } else if (copy2) {
        copy2.push(marks[i]);
      }
    }
    return !copy2 ? marks : copy2.length ? copy2 : Mark.none;
  }
  /**
  @internal
  */
  static compile(nodes, schema) {
    let result = /* @__PURE__ */ Object.create(null);
    nodes.forEach((name, spec) => result[name] = new _NodeType(name, schema, spec));
    let topType = schema.spec.topNode || "doc";
    if (!result[topType])
      throw new RangeError("Schema is missing its top node type ('" + topType + "')");
    if (!result.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let _ in result.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return result;
  }
};
var Attribute = class {
  constructor(options) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
    this.default = options.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
};
var MarkType = class _MarkType {
  /**
  @internal
  */
  constructor(name, rank, schema, spec) {
    this.name = name;
    this.rank = rank;
    this.schema = schema;
    this.spec = spec;
    this.attrs = initAttrs(spec.attrs);
    this.excluded = null;
    let defaults = defaultAttrs(this.attrs);
    this.instance = defaults ? new Mark(this, defaults) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(attrs = null) {
    if (!attrs && this.instance)
      return this.instance;
    return new Mark(this, computeAttrs(this.attrs, attrs));
  }
  /**
  @internal
  */
  static compile(marks, schema) {
    let result = /* @__PURE__ */ Object.create(null), rank = 0;
    marks.forEach((name, spec) => result[name] = new _MarkType(name, rank++, schema, spec));
    return result;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(set) {
    for (var i = 0; i < set.length; i++)
      if (set[i].type == this) {
        set = set.slice(0, i).concat(set.slice(i + 1));
        i--;
      }
    return set;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(set) {
    for (let i = 0; i < set.length; i++)
      if (set[i].type == this)
        return set[i];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(other) {
    return this.excluded.indexOf(other) > -1;
  }
};
var Schema = class {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(spec) {
    this.cached = /* @__PURE__ */ Object.create(null);
    let instanceSpec = this.spec = {};
    for (let prop in spec)
      instanceSpec[prop] = spec[prop];
    instanceSpec.nodes = dist_default.from(spec.nodes), instanceSpec.marks = dist_default.from(spec.marks || {}), this.nodes = NodeType.compile(this.spec.nodes, this);
    this.marks = MarkType.compile(this.spec.marks, this);
    let contentExprCache = /* @__PURE__ */ Object.create(null);
    for (let prop in this.nodes) {
      if (prop in this.marks)
        throw new RangeError(prop + " can not be both a node and a mark");
      let type = this.nodes[prop], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
      type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = ContentMatch.parse(contentExpr, this.nodes));
      type.inlineContent = type.contentMatch.inlineContent;
      type.markSet = markExpr == "_" ? null : markExpr ? gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
    }
    for (let prop in this.marks) {
      let type = this.marks[prop], excl = type.spec.excludes;
      type.excluded = excl == null ? [type] : excl == "" ? [] : gatherMarks(this, excl.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this);
    this.markFromJSON = this.markFromJSON.bind(this);
    this.topNodeType = this.nodes[this.spec.topNode || "doc"];
    this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(type, attrs = null, content, marks) {
    if (typeof type == "string")
      type = this.nodeType(type);
    else if (!(type instanceof NodeType))
      throw new RangeError("Invalid node type: " + type);
    else if (type.schema != this)
      throw new RangeError("Node type from different schema used (" + type.name + ")");
    return type.createChecked(attrs, content, marks);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(text, marks) {
    let type = this.nodes.text;
    return new TextNode(type, type.defaultAttrs, text, Mark.setFrom(marks));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(type, attrs) {
    if (typeof type == "string")
      type = this.marks[type];
    return type.create(attrs);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(json) {
    return Node.fromJSON(this, json);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(json) {
    return Mark.fromJSON(this, json);
  }
  /**
  @internal
  */
  nodeType(name) {
    let found2 = this.nodes[name];
    if (!found2)
      throw new RangeError("Unknown node type: " + name);
    return found2;
  }
};
function gatherMarks(schema, marks) {
  let found2 = [];
  for (let i = 0; i < marks.length; i++) {
    let name = marks[i], mark = schema.marks[name], ok = mark;
    if (mark) {
      found2.push(mark);
    } else {
      for (let prop in schema.marks) {
        let mark2 = schema.marks[prop];
        if (name == "_" || mark2.spec.group && mark2.spec.group.split(" ").indexOf(name) > -1)
          found2.push(ok = mark2);
      }
    }
    if (!ok)
      throw new SyntaxError("Unknown mark type: '" + marks[i] + "'");
  }
  return found2;
}
var DOMParser = class _DOMParser {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(schema, rules) {
    this.schema = schema;
    this.rules = rules;
    this.tags = [];
    this.styles = [];
    rules.forEach((rule) => {
      if (rule.tag)
        this.tags.push(rule);
      else if (rule.style)
        this.styles.push(rule);
    });
    this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return false;
      let node = schema.nodes[r.node];
      return node.contentMatch.matchType(node);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(dom, options = {}) {
    let context = new ParseContext(this, options, false);
    context.addAll(dom, options.from, options.to);
    return context.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(dom, options = {}) {
    let context = new ParseContext(this, options, true);
    context.addAll(dom, options.from, options.to);
    return Slice.maxOpen(context.finish());
  }
  /**
  @internal
  */
  matchTag(dom, context, after) {
    for (let i = after ? this.tags.indexOf(after) + 1 : 0; i < this.tags.length; i++) {
      let rule = this.tags[i];
      if (matches(dom, rule.tag) && (rule.namespace === void 0 || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
        if (rule.getAttrs) {
          let result = rule.getAttrs(dom);
          if (result === false)
            continue;
          rule.attrs = result || void 0;
        }
        return rule;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(prop, value, context, after) {
    for (let i = after ? this.styles.indexOf(after) + 1 : 0; i < this.styles.length; i++) {
      let rule = this.styles[i], style = rule.style;
      if (style.indexOf(prop) != 0 || rule.context && !context.matchesContext(rule.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      style.length > prop.length && (style.charCodeAt(prop.length) != 61 || style.slice(prop.length + 1) != value))
        continue;
      if (rule.getAttrs) {
        let result = rule.getAttrs(value);
        if (result === false)
          continue;
        rule.attrs = result || void 0;
      }
      return rule;
    }
  }
  /**
  @internal
  */
  static schemaRules(schema) {
    let result = [];
    function insert(rule) {
      let priority = rule.priority == null ? 50 : rule.priority, i = 0;
      for (; i < result.length; i++) {
        let next = result[i], nextPriority = next.priority == null ? 50 : next.priority;
        if (nextPriority < priority)
          break;
      }
      result.splice(i, 0, rule);
    }
    for (let name in schema.marks) {
      let rules = schema.marks[name].spec.parseDOM;
      if (rules)
        rules.forEach((rule) => {
          insert(rule = copy(rule));
          if (!(rule.mark || rule.ignore || rule.clearMark))
            rule.mark = name;
        });
    }
    for (let name in schema.nodes) {
      let rules = schema.nodes[name].spec.parseDOM;
      if (rules)
        rules.forEach((rule) => {
          insert(rule = copy(rule));
          if (!(rule.node || rule.ignore || rule.mark))
            rule.node = name;
        });
    }
    return result;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(schema) {
    return schema.cached.domParser || (schema.cached.domParser = new _DOMParser(schema, _DOMParser.schemaRules(schema)));
  }
};
var blockTags = {
  address: true,
  article: true,
  aside: true,
  blockquote: true,
  canvas: true,
  dd: true,
  div: true,
  dl: true,
  fieldset: true,
  figcaption: true,
  figure: true,
  footer: true,
  form: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  header: true,
  hgroup: true,
  hr: true,
  li: true,
  noscript: true,
  ol: true,
  output: true,
  p: true,
  pre: true,
  section: true,
  table: true,
  tfoot: true,
  ul: true
};
var ignoreTags = {
  head: true,
  noscript: true,
  object: true,
  script: true,
  style: true,
  title: true
};
var listTags = { ol: true, ul: true };
var OPT_PRESERVE_WS = 1;
var OPT_PRESERVE_WS_FULL = 2;
var OPT_OPEN_LEFT = 4;
function wsOptionsFor(type, preserveWhitespace, base) {
  if (preserveWhitespace != null)
    return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0);
  return type && type.whitespace == "pre" ? OPT_PRESERVE_WS | OPT_PRESERVE_WS_FULL : base & ~OPT_OPEN_LEFT;
}
var NodeContext = class {
  constructor(type, attrs, marks, pendingMarks, solid, match, options) {
    this.type = type;
    this.attrs = attrs;
    this.marks = marks;
    this.pendingMarks = pendingMarks;
    this.solid = solid;
    this.options = options;
    this.content = [];
    this.activeMarks = Mark.none;
    this.stashMarks = [];
    this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
  }
  findWrapping(node) {
    if (!this.match) {
      if (!this.type)
        return [];
      let fill = this.type.contentMatch.fillBefore(Fragment.from(node));
      if (fill) {
        this.match = this.type.contentMatch.matchFragment(fill);
      } else {
        let start = this.type.contentMatch, wrap2;
        if (wrap2 = start.findWrapping(node.type)) {
          this.match = start;
          return wrap2;
        } else {
          return null;
        }
      }
    }
    return this.match.findWrapping(node.type);
  }
  finish(openEnd) {
    if (!(this.options & OPT_PRESERVE_WS)) {
      let last = this.content[this.content.length - 1], m;
      if (last && last.isText && (m = /[ \t\r\n\u000c]+$/.exec(last.text))) {
        let text = last;
        if (last.text.length == m[0].length)
          this.content.pop();
        else
          this.content[this.content.length - 1] = text.withText(text.text.slice(0, text.text.length - m[0].length));
      }
    }
    let content = Fragment.from(this.content);
    if (!openEnd && this.match)
      content = content.append(this.match.fillBefore(Fragment.empty, true));
    return this.type ? this.type.create(this.attrs, content, this.marks) : content;
  }
  popFromStashMark(mark) {
    for (let i = this.stashMarks.length - 1; i >= 0; i--)
      if (mark.eq(this.stashMarks[i]))
        return this.stashMarks.splice(i, 1)[0];
  }
  applyPending(nextType) {
    for (let i = 0, pending = this.pendingMarks; i < pending.length; i++) {
      let mark = pending[i];
      if ((this.type ? this.type.allowsMarkType(mark.type) : markMayApply(mark.type, nextType)) && !mark.isInSet(this.activeMarks)) {
        this.activeMarks = mark.addToSet(this.activeMarks);
        this.pendingMarks = mark.removeFromSet(this.pendingMarks);
      }
    }
  }
  inlineContext(node) {
    if (this.type)
      return this.type.inlineContent;
    if (this.content.length)
      return this.content[0].isInline;
    return node.parentNode && !blockTags.hasOwnProperty(node.parentNode.nodeName.toLowerCase());
  }
};
var ParseContext = class {
  constructor(parser, options, isOpen) {
    this.parser = parser;
    this.options = options;
    this.isOpen = isOpen;
    this.open = 0;
    let topNode = options.topNode, topContext;
    let topOptions = wsOptionsFor(null, options.preserveWhitespace, 0) | (isOpen ? OPT_OPEN_LEFT : 0);
    if (topNode)
      topContext = new NodeContext(topNode.type, topNode.attrs, Mark.none, Mark.none, true, options.topMatch || topNode.type.contentMatch, topOptions);
    else if (isOpen)
      topContext = new NodeContext(null, null, Mark.none, Mark.none, true, null, topOptions);
    else
      topContext = new NodeContext(parser.schema.topNodeType, null, Mark.none, Mark.none, true, null, topOptions);
    this.nodes = [topContext];
    this.find = options.findPositions;
    this.needsBlock = false;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(dom) {
    if (dom.nodeType == 3)
      this.addTextNode(dom);
    else if (dom.nodeType == 1)
      this.addElement(dom);
  }
  withStyleRules(dom, f) {
    let style = dom.getAttribute("style");
    if (!style)
      return f();
    let marks = this.readStyles(parseStyles(style));
    if (!marks)
      return;
    let [addMarks, removeMarks] = marks, top = this.top;
    for (let i = 0; i < removeMarks.length; i++)
      this.removePendingMark(removeMarks[i], top);
    for (let i = 0; i < addMarks.length; i++)
      this.addPendingMark(addMarks[i]);
    f();
    for (let i = 0; i < addMarks.length; i++)
      this.removePendingMark(addMarks[i], top);
    for (let i = 0; i < removeMarks.length; i++)
      this.addPendingMark(removeMarks[i]);
  }
  addTextNode(dom) {
    let value = dom.nodeValue;
    let top = this.top;
    if (top.options & OPT_PRESERVE_WS_FULL || top.inlineContext(dom) || /[^ \t\r\n\u000c]/.test(value)) {
      if (!(top.options & OPT_PRESERVE_WS)) {
        value = value.replace(/[ \t\r\n\u000c]+/g, " ");
        if (/^[ \t\r\n\u000c]/.test(value) && this.open == this.nodes.length - 1) {
          let nodeBefore = top.content[top.content.length - 1];
          let domNodeBefore = dom.previousSibling;
          if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == "BR" || nodeBefore.isText && /[ \t\r\n\u000c]$/.test(nodeBefore.text))
            value = value.slice(1);
        }
      } else if (!(top.options & OPT_PRESERVE_WS_FULL)) {
        value = value.replace(/\r?\n|\r/g, " ");
      } else {
        value = value.replace(/\r\n?/g, "\n");
      }
      if (value)
        this.insertNode(this.parser.schema.text(value));
      this.findInText(dom);
    } else {
      this.findInside(dom);
    }
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(dom, matchAfter) {
    let name = dom.nodeName.toLowerCase(), ruleID;
    if (listTags.hasOwnProperty(name) && this.parser.normalizeLists)
      normalizeList(dom);
    let rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || (ruleID = this.parser.matchTag(dom, this, matchAfter));
    if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
      this.findInside(dom);
      this.ignoreFallback(dom);
    } else if (!rule || rule.skip || rule.closeParent) {
      if (rule && rule.closeParent)
        this.open = Math.max(0, this.open - 1);
      else if (rule && rule.skip.nodeType)
        dom = rule.skip;
      let sync, top = this.top, oldNeedsBlock = this.needsBlock;
      if (blockTags.hasOwnProperty(name)) {
        if (top.content.length && top.content[0].isInline && this.open) {
          this.open--;
          top = this.top;
        }
        sync = true;
        if (!top.type)
          this.needsBlock = true;
      } else if (!dom.firstChild) {
        this.leafFallback(dom);
        return;
      }
      if (rule && rule.skip)
        this.addAll(dom);
      else
        this.withStyleRules(dom, () => this.addAll(dom));
      if (sync)
        this.sync(top);
      this.needsBlock = oldNeedsBlock;
    } else {
      this.withStyleRules(dom, () => {
        this.addElementByRule(dom, rule, rule.consuming === false ? ruleID : void 0);
      });
    }
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(dom) {
    if (dom.nodeName == "BR" && this.top.type && this.top.type.inlineContent)
      this.addTextNode(dom.ownerDocument.createTextNode("\n"));
  }
  // Called for ignored nodes
  ignoreFallback(dom) {
    if (dom.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent))
      this.findPlace(this.parser.schema.text("-"));
  }
  // Run any style parser associated with the node's styles. Either
  // return an array of marks, or null to indicate some of the styles
  // had a rule with `ignore` set.
  readStyles(styles) {
    let add = Mark.none, remove = Mark.none;
    for (let i = 0; i < styles.length; i += 2) {
      for (let after = void 0; ; ) {
        let rule = this.parser.matchStyle(styles[i], styles[i + 1], this, after);
        if (!rule)
          break;
        if (rule.ignore)
          return null;
        if (rule.clearMark) {
          this.top.pendingMarks.concat(this.top.activeMarks).forEach((m) => {
            if (rule.clearMark(m))
              remove = m.addToSet(remove);
          });
        } else {
          add = this.parser.schema.marks[rule.mark].create(rule.attrs).addToSet(add);
        }
        if (rule.consuming === false)
          after = rule;
        else
          break;
      }
    }
    return [add, remove];
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(dom, rule, continueAfter) {
    let sync, nodeType, mark;
    if (rule.node) {
      nodeType = this.parser.schema.nodes[rule.node];
      if (!nodeType.isLeaf) {
        sync = this.enter(nodeType, rule.attrs || null, rule.preserveWhitespace);
      } else if (!this.insertNode(nodeType.create(rule.attrs))) {
        this.leafFallback(dom);
      }
    } else {
      let markType = this.parser.schema.marks[rule.mark];
      mark = markType.create(rule.attrs);
      this.addPendingMark(mark);
    }
    let startIn = this.top;
    if (nodeType && nodeType.isLeaf) {
      this.findInside(dom);
    } else if (continueAfter) {
      this.addElement(dom, continueAfter);
    } else if (rule.getContent) {
      this.findInside(dom);
      rule.getContent(dom, this.parser.schema).forEach((node) => this.insertNode(node));
    } else {
      let contentDOM = dom;
      if (typeof rule.contentElement == "string")
        contentDOM = dom.querySelector(rule.contentElement);
      else if (typeof rule.contentElement == "function")
        contentDOM = rule.contentElement(dom);
      else if (rule.contentElement)
        contentDOM = rule.contentElement;
      this.findAround(dom, contentDOM, true);
      this.addAll(contentDOM);
    }
    if (sync && this.sync(startIn))
      this.open--;
    if (mark)
      this.removePendingMark(mark, startIn);
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(parent, startIndex, endIndex) {
    let index = startIndex || 0;
    for (let dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end = endIndex == null ? null : parent.childNodes[endIndex]; dom != end; dom = dom.nextSibling, ++index) {
      this.findAtPoint(parent, index);
      this.addDOM(dom);
    }
    this.findAtPoint(parent, index);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(node) {
    let route, sync;
    for (let depth = this.open; depth >= 0; depth--) {
      let cx = this.nodes[depth];
      let found2 = cx.findWrapping(node);
      if (found2 && (!route || route.length > found2.length)) {
        route = found2;
        sync = cx;
        if (!found2.length)
          break;
      }
      if (cx.solid)
        break;
    }
    if (!route)
      return false;
    this.sync(sync);
    for (let i = 0; i < route.length; i++)
      this.enterInner(route[i], null, false);
    return true;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(node) {
    if (node.isInline && this.needsBlock && !this.top.type) {
      let block = this.textblockFromContext();
      if (block)
        this.enterInner(block);
    }
    if (this.findPlace(node)) {
      this.closeExtra();
      let top = this.top;
      top.applyPending(node.type);
      if (top.match)
        top.match = top.match.matchType(node.type);
      let marks = top.activeMarks;
      for (let i = 0; i < node.marks.length; i++)
        if (!top.type || top.type.allowsMarkType(node.marks[i].type))
          marks = node.marks[i].addToSet(marks);
      top.content.push(node.mark(marks));
      return true;
    }
    return false;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(type, attrs, preserveWS) {
    let ok = this.findPlace(type.create(attrs));
    if (ok)
      this.enterInner(type, attrs, true, preserveWS);
    return ok;
  }
  // Open a node of the given type
  enterInner(type, attrs = null, solid = false, preserveWS) {
    this.closeExtra();
    let top = this.top;
    top.applyPending(type);
    top.match = top.match && top.match.matchType(type);
    let options = wsOptionsFor(type, preserveWS, top.options);
    if (top.options & OPT_OPEN_LEFT && top.content.length == 0)
      options |= OPT_OPEN_LEFT;
    this.nodes.push(new NodeContext(type, attrs, top.activeMarks, top.pendingMarks, solid, null, options));
    this.open++;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(openEnd = false) {
    let i = this.nodes.length - 1;
    if (i > this.open) {
      for (; i > this.open; i--)
        this.nodes[i - 1].content.push(this.nodes[i].finish(openEnd));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    this.open = 0;
    this.closeExtra(this.isOpen);
    return this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(to) {
    for (let i = this.open; i >= 0; i--)
      if (this.nodes[i] == to) {
        this.open = i;
        return true;
      }
    return false;
  }
  get currentPos() {
    this.closeExtra();
    let pos = 0;
    for (let i = this.open; i >= 0; i--) {
      let content = this.nodes[i].content;
      for (let j = content.length - 1; j >= 0; j--)
        pos += content[j].nodeSize;
      if (i)
        pos++;
    }
    return pos;
  }
  findAtPoint(parent, offset) {
    if (this.find)
      for (let i = 0; i < this.find.length; i++) {
        if (this.find[i].node == parent && this.find[i].offset == offset)
          this.find[i].pos = this.currentPos;
      }
  }
  findInside(parent) {
    if (this.find)
      for (let i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node))
          this.find[i].pos = this.currentPos;
      }
  }
  findAround(parent, content, before) {
    if (parent != content && this.find)
      for (let i = 0; i < this.find.length; i++) {
        if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
          let pos = content.compareDocumentPosition(this.find[i].node);
          if (pos & (before ? 2 : 4))
            this.find[i].pos = this.currentPos;
        }
      }
  }
  findInText(textNode) {
    if (this.find)
      for (let i = 0; i < this.find.length; i++) {
        if (this.find[i].node == textNode)
          this.find[i].pos = this.currentPos - (textNode.nodeValue.length - this.find[i].offset);
      }
  }
  // Determines whether the given context string matches this context.
  matchesContext(context) {
    if (context.indexOf("|") > -1)
      return context.split(/\s*\|\s*/).some(this.matchesContext, this);
    let parts = context.split("/");
    let option = this.options.context;
    let useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
    let minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
    let match = (i, depth) => {
      for (; i >= 0; i--) {
        let part = parts[i];
        if (part == "") {
          if (i == parts.length - 1 || i == 0)
            continue;
          for (; depth >= minDepth; depth--)
            if (match(i - 1, depth))
              return true;
          return false;
        } else {
          let next = depth > 0 || depth == 0 && useRoot ? this.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
          if (!next || next.name != part && next.groups.indexOf(part) == -1)
            return false;
          depth--;
        }
      }
      return true;
    };
    return match(parts.length - 1, this.open);
  }
  textblockFromContext() {
    let $context = this.options.context;
    if ($context)
      for (let d = $context.depth; d >= 0; d--) {
        let deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
        if (deflt && deflt.isTextblock && deflt.defaultAttrs)
          return deflt;
      }
    for (let name in this.parser.schema.nodes) {
      let type = this.parser.schema.nodes[name];
      if (type.isTextblock && type.defaultAttrs)
        return type;
    }
  }
  addPendingMark(mark) {
    let found2 = findSameMarkInSet(mark, this.top.pendingMarks);
    if (found2)
      this.top.stashMarks.push(found2);
    this.top.pendingMarks = mark.addToSet(this.top.pendingMarks);
  }
  removePendingMark(mark, upto) {
    for (let depth = this.open; depth >= 0; depth--) {
      let level = this.nodes[depth];
      let found2 = level.pendingMarks.lastIndexOf(mark);
      if (found2 > -1) {
        level.pendingMarks = mark.removeFromSet(level.pendingMarks);
      } else {
        level.activeMarks = mark.removeFromSet(level.activeMarks);
        let stashMark = level.popFromStashMark(mark);
        if (stashMark && level.type && level.type.allowsMarkType(stashMark.type))
          level.activeMarks = stashMark.addToSet(level.activeMarks);
      }
      if (level == upto)
        break;
    }
  }
};
function normalizeList(dom) {
  for (let child = dom.firstChild, prevItem = null; child; child = child.nextSibling) {
    let name = child.nodeType == 1 ? child.nodeName.toLowerCase() : null;
    if (name && listTags.hasOwnProperty(name) && prevItem) {
      prevItem.appendChild(child);
      child = prevItem;
    } else if (name == "li") {
      prevItem = child;
    } else if (name) {
      prevItem = null;
    }
  }
}
function matches(dom, selector) {
  return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
}
function parseStyles(style) {
  let re = /\s*([\w-]+)\s*:\s*([^;]+)/g, m, result = [];
  while (m = re.exec(style))
    result.push(m[1], m[2].trim());
  return result;
}
function copy(obj) {
  let copy2 = {};
  for (let prop in obj)
    copy2[prop] = obj[prop];
  return copy2;
}
function markMayApply(markType, nodeType) {
  let nodes = nodeType.schema.nodes;
  for (let name in nodes) {
    let parent = nodes[name];
    if (!parent.allowsMarkType(markType))
      continue;
    let seen = [], scan = (match) => {
      seen.push(match);
      for (let i = 0; i < match.edgeCount; i++) {
        let { type, next } = match.edge(i);
        if (type == nodeType)
          return true;
        if (seen.indexOf(next) < 0 && scan(next))
          return true;
      }
    };
    if (scan(parent.contentMatch))
      return true;
  }
}
function findSameMarkInSet(mark, set) {
  for (let i = 0; i < set.length; i++) {
    if (mark.eq(set[i]))
      return set[i];
  }
}
var DOMSerializer = class _DOMSerializer {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(nodes, marks) {
    this.nodes = nodes;
    this.marks = marks;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(fragment, options = {}, target) {
    if (!target)
      target = doc(options).createDocumentFragment();
    let top = target, active = [];
    fragment.forEach((node) => {
      if (active.length || node.marks.length) {
        let keep = 0, rendered = 0;
        while (keep < active.length && rendered < node.marks.length) {
          let next = node.marks[rendered];
          if (!this.marks[next.type.name]) {
            rendered++;
            continue;
          }
          if (!next.eq(active[keep][0]) || next.type.spec.spanning === false)
            break;
          keep++;
          rendered++;
        }
        while (keep < active.length)
          top = active.pop()[1];
        while (rendered < node.marks.length) {
          let add = node.marks[rendered++];
          let markDOM = this.serializeMark(add, node.isInline, options);
          if (markDOM) {
            active.push([add, top]);
            top.appendChild(markDOM.dom);
            top = markDOM.contentDOM || markDOM.dom;
          }
        }
      }
      top.appendChild(this.serializeNodeInner(node, options));
    });
    return target;
  }
  /**
  @internal
  */
  serializeNodeInner(node, options) {
    let { dom, contentDOM } = _DOMSerializer.renderSpec(doc(options), this.nodes[node.type.name](node));
    if (contentDOM) {
      if (node.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(node.content, options, contentDOM);
    }
    return dom;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(node, options = {}) {
    let dom = this.serializeNodeInner(node, options);
    for (let i = node.marks.length - 1; i >= 0; i--) {
      let wrap2 = this.serializeMark(node.marks[i], node.isInline, options);
      if (wrap2) {
        (wrap2.contentDOM || wrap2.dom).appendChild(dom);
        dom = wrap2.dom;
      }
    }
    return dom;
  }
  /**
  @internal
  */
  serializeMark(mark, inline, options = {}) {
    let toDOM = this.marks[mark.type.name];
    return toDOM && _DOMSerializer.renderSpec(doc(options), toDOM(mark, inline));
  }
  /**
  Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
  the spec has a hole (zero) in it, `contentDOM` will point at the
  node with the hole.
  */
  static renderSpec(doc2, structure, xmlNS = null) {
    if (typeof structure == "string")
      return { dom: doc2.createTextNode(structure) };
    if (structure.nodeType != null)
      return { dom: structure };
    if (structure.dom && structure.dom.nodeType != null)
      return structure;
    let tagName = structure[0], space = tagName.indexOf(" ");
    if (space > 0) {
      xmlNS = tagName.slice(0, space);
      tagName = tagName.slice(space + 1);
    }
    let contentDOM;
    let dom = xmlNS ? doc2.createElementNS(xmlNS, tagName) : doc2.createElement(tagName);
    let attrs = structure[1], start = 1;
    if (attrs && typeof attrs == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
      start = 2;
      for (let name in attrs)
        if (attrs[name] != null) {
          let space2 = name.indexOf(" ");
          if (space2 > 0)
            dom.setAttributeNS(name.slice(0, space2), name.slice(space2 + 1), attrs[name]);
          else
            dom.setAttribute(name, attrs[name]);
        }
    }
    for (let i = start; i < structure.length; i++) {
      let child = structure[i];
      if (child === 0) {
        if (i < structure.length - 1 || i > start)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom, contentDOM: dom };
      } else {
        let { dom: inner, contentDOM: innerContent } = _DOMSerializer.renderSpec(doc2, child, xmlNS);
        dom.appendChild(inner);
        if (innerContent) {
          if (contentDOM)
            throw new RangeError("Multiple content holes");
          contentDOM = innerContent;
        }
      }
    }
    return { dom, contentDOM };
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(schema) {
    return schema.cached.domSerializer || (schema.cached.domSerializer = new _DOMSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(schema) {
    let result = gatherToDOM(schema.nodes);
    if (!result.text)
      result.text = (node) => node.text;
    return result;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(schema) {
    return gatherToDOM(schema.marks);
  }
};
function gatherToDOM(obj) {
  let result = {};
  for (let name in obj) {
    let toDOM = obj[name].spec.toDOM;
    if (toDOM)
      result[name] = toDOM;
  }
  return result;
}
function doc(options) {
  return options.document || window.document;
}

// node_modules/prosemirror-transform/dist/index.js
var lower16 = 65535;
var factor16 = Math.pow(2, 16);
function makeRecover(index, offset) {
  return index + offset * factor16;
}
function recoverIndex(value) {
  return value & lower16;
}
function recoverOffset(value) {
  return (value - (value & lower16)) / factor16;
}
var DEL_BEFORE = 1;
var DEL_AFTER = 2;
var DEL_ACROSS = 4;
var DEL_SIDE = 8;
var MapResult = class {
  /**
  @internal
  */
  constructor(pos, delInfo, recover) {
    this.pos = pos;
    this.delInfo = delInfo;
    this.recover = recover;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & DEL_SIDE) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (DEL_BEFORE | DEL_ACROSS)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (DEL_AFTER | DEL_ACROSS)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & DEL_ACROSS) > 0;
  }
};
var StepMap = class _StepMap {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(ranges, inverted = false) {
    this.ranges = ranges;
    this.inverted = inverted;
    if (!ranges.length && _StepMap.empty)
      return _StepMap.empty;
  }
  /**
  @internal
  */
  recover(value) {
    let diff = 0, index = recoverIndex(value);
    if (!this.inverted)
      for (let i = 0; i < index; i++)
        diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[index * 3] + diff + recoverOffset(value);
  }
  mapResult(pos, assoc = 1) {
    return this._map(pos, assoc, false);
  }
  map(pos, assoc = 1) {
    return this._map(pos, assoc, true);
  }
  /**
  @internal
  */
  _map(pos, assoc, simple) {
    let diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i] - (this.inverted ? diff : 0);
      if (start > pos)
        break;
      let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end = start + oldSize;
      if (pos <= end) {
        let side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
        let result = start + diff + (side < 0 ? 0 : newSize);
        if (simple)
          return result;
        let recover = pos == (assoc < 0 ? start : end) ? null : makeRecover(i / 3, pos - start);
        let del = pos == start ? DEL_AFTER : pos == end ? DEL_BEFORE : DEL_ACROSS;
        if (assoc < 0 ? pos != start : pos != end)
          del |= DEL_SIDE;
        return new MapResult(result, del, recover);
      }
      diff += newSize - oldSize;
    }
    return simple ? pos + diff : new MapResult(pos + diff, 0, null);
  }
  /**
  @internal
  */
  touches(pos, recover) {
    let diff = 0, index = recoverIndex(recover);
    let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i] - (this.inverted ? diff : 0);
      if (start > pos)
        break;
      let oldSize = this.ranges[i + oldIndex], end = start + oldSize;
      if (pos <= end && i == index * 3)
        return true;
      diff += this.ranges[i + newIndex] - oldSize;
    }
    return false;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(f) {
    let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0, diff = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i], oldStart = start - (this.inverted ? diff : 0), newStart = start + (this.inverted ? 0 : diff);
      let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
      f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
      diff += newSize - oldSize;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new _StepMap(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(n) {
    return n == 0 ? _StepMap.empty : new _StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
  }
};
StepMap.empty = new StepMap([]);
var Mapping = class _Mapping {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(maps = [], mirror, from = 0, to = maps.length) {
    this.maps = maps;
    this.mirror = mirror;
    this.from = from;
    this.to = to;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(from = 0, to = this.maps.length) {
    return new _Mapping(this.maps, this.mirror, from, to);
  }
  /**
  @internal
  */
  copy() {
    return new _Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(map, mirrors) {
    this.to = this.maps.push(map);
    if (mirrors != null)
      this.setMirror(this.maps.length - 1, mirrors);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(mapping) {
    for (let i = 0, startSize = this.maps.length; i < mapping.maps.length; i++) {
      let mirr = mapping.getMirror(i);
      this.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(n) {
    if (this.mirror) {
      for (let i = 0; i < this.mirror.length; i++)
        if (this.mirror[i] == n)
          return this.mirror[i + (i % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(n, m) {
    if (!this.mirror)
      this.mirror = [];
    this.mirror.push(n, m);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(mapping) {
    for (let i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--) {
      let mirr = mapping.getMirror(i);
      this.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let inverse = new _Mapping();
    inverse.appendMappingInverted(this);
    return inverse;
  }
  /**
  Map a position through this mapping.
  */
  map(pos, assoc = 1) {
    if (this.mirror)
      return this._map(pos, assoc, true);
    for (let i = this.from; i < this.to; i++)
      pos = this.maps[i].map(pos, assoc);
    return pos;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(pos, assoc = 1) {
    return this._map(pos, assoc, false);
  }
  /**
  @internal
  */
  _map(pos, assoc, simple) {
    let delInfo = 0;
    for (let i = this.from; i < this.to; i++) {
      let map = this.maps[i], result = map.mapResult(pos, assoc);
      if (result.recover != null) {
        let corr = this.getMirror(i);
        if (corr != null && corr > i && corr < this.to) {
          i = corr;
          pos = this.maps[corr].recover(result.recover);
          continue;
        }
      }
      delInfo |= result.delInfo;
      pos = result.pos;
    }
    return simple ? pos : new MapResult(pos, delInfo, null);
  }
};
var stepsByID = /* @__PURE__ */ Object.create(null);
var Step = class {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return StepMap.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(other) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(schema, json) {
    if (!json || !json.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let type = stepsByID[json.stepType];
    if (!type)
      throw new RangeError(`No step type ${json.stepType} defined`);
    return type.fromJSON(schema, json);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(id, stepClass) {
    if (id in stepsByID)
      throw new RangeError("Duplicate use of step JSON ID " + id);
    stepsByID[id] = stepClass;
    stepClass.prototype.jsonID = id;
    return stepClass;
  }
};
var StepResult = class _StepResult {
  /**
  @internal
  */
  constructor(doc2, failed) {
    this.doc = doc2;
    this.failed = failed;
  }
  /**
  Create a successful step result.
  */
  static ok(doc2) {
    return new _StepResult(doc2, null);
  }
  /**
  Create a failed step result.
  */
  static fail(message) {
    return new _StepResult(null, message);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(doc2, from, to, slice) {
    try {
      return _StepResult.ok(doc2.replace(from, to, slice));
    } catch (e) {
      if (e instanceof ReplaceError)
        return _StepResult.fail(e.message);
      throw e;
    }
  }
};
function mapFragment(fragment, f, parent) {
  let mapped = [];
  for (let i = 0; i < fragment.childCount; i++) {
    let child = fragment.child(i);
    if (child.content.size)
      child = child.copy(mapFragment(child.content, f, child));
    if (child.isInline)
      child = f(child, parent, i);
    mapped.push(child);
  }
  return Fragment.fromArray(mapped);
}
var AddMarkStep = class _AddMarkStep extends Step {
  /**
  Create a mark step.
  */
  constructor(from, to, mark) {
    super();
    this.from = from;
    this.to = to;
    this.mark = mark;
  }
  apply(doc2) {
    let oldSlice = doc2.slice(this.from, this.to), $from = doc2.resolve(this.from);
    let parent = $from.node($from.sharedDepth(this.to));
    let slice = new Slice(mapFragment(oldSlice.content, (node, parent2) => {
      if (!node.isAtom || !parent2.type.allowsMarkType(this.mark.type))
        return node;
      return node.mark(this.mark.addToSet(node.marks));
    }, parent), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc2, this.from, this.to, slice);
  }
  invert() {
    return new RemoveMarkStep(this.from, this.to, this.mark);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos)
      return null;
    return new _AddMarkStep(from.pos, to.pos, this.mark);
  }
  merge(other) {
    if (other instanceof _AddMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from)
      return new _AddMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    return null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new _AddMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("addMark", AddMarkStep);
var RemoveMarkStep = class _RemoveMarkStep extends Step {
  /**
  Create a mark-removing step.
  */
  constructor(from, to, mark) {
    super();
    this.from = from;
    this.to = to;
    this.mark = mark;
  }
  apply(doc2) {
    let oldSlice = doc2.slice(this.from, this.to);
    let slice = new Slice(mapFragment(oldSlice.content, (node) => {
      return node.mark(this.mark.removeFromSet(node.marks));
    }, doc2), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc2, this.from, this.to, slice);
  }
  invert() {
    return new AddMarkStep(this.from, this.to, this.mark);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos)
      return null;
    return new _RemoveMarkStep(from.pos, to.pos, this.mark);
  }
  merge(other) {
    if (other instanceof _RemoveMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from)
      return new _RemoveMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    return null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new _RemoveMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("removeMark", RemoveMarkStep);
var AddNodeMarkStep = class _AddNodeMarkStep extends Step {
  /**
  Create a node mark step.
  */
  constructor(pos, mark) {
    super();
    this.pos = pos;
    this.mark = mark;
  }
  apply(doc2) {
    let node = doc2.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at mark step's position");
    let updated = node.type.create(node.attrs, null, this.mark.addToSet(node.marks));
    return StepResult.fromReplace(doc2, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  invert(doc2) {
    let node = doc2.nodeAt(this.pos);
    if (node) {
      let newSet = this.mark.addToSet(node.marks);
      if (newSet.length == node.marks.length) {
        for (let i = 0; i < node.marks.length; i++)
          if (!node.marks[i].isInSet(newSet))
            return new _AddNodeMarkStep(this.pos, node.marks[i]);
        return new _AddNodeMarkStep(this.pos, this.mark);
      }
    }
    return new RemoveNodeMarkStep(this.pos, this.mark);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _AddNodeMarkStep(pos.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new _AddNodeMarkStep(json.pos, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("addNodeMark", AddNodeMarkStep);
var RemoveNodeMarkStep = class _RemoveNodeMarkStep extends Step {
  /**
  Create a mark-removing step.
  */
  constructor(pos, mark) {
    super();
    this.pos = pos;
    this.mark = mark;
  }
  apply(doc2) {
    let node = doc2.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at mark step's position");
    let updated = node.type.create(node.attrs, null, this.mark.removeFromSet(node.marks));
    return StepResult.fromReplace(doc2, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  invert(doc2) {
    let node = doc2.nodeAt(this.pos);
    if (!node || !this.mark.isInSet(node.marks))
      return this;
    return new AddNodeMarkStep(this.pos, this.mark);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _RemoveNodeMarkStep(pos.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new _RemoveNodeMarkStep(json.pos, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("removeNodeMark", RemoveNodeMarkStep);
var ReplaceStep = class _ReplaceStep extends Step {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(from, to, slice, structure = false) {
    super();
    this.from = from;
    this.to = to;
    this.slice = slice;
    this.structure = structure;
  }
  apply(doc2) {
    if (this.structure && contentBetween(doc2, this.from, this.to))
      return StepResult.fail("Structure replace would overwrite content");
    return StepResult.fromReplace(doc2, this.from, this.to, this.slice);
  }
  getMap() {
    return new StepMap([this.from, this.to - this.from, this.slice.size]);
  }
  invert(doc2) {
    return new _ReplaceStep(this.from, this.from + this.slice.size, doc2.slice(this.from, this.to));
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deletedAcross && to.deletedAcross)
      return null;
    return new _ReplaceStep(from.pos, Math.max(from.pos, to.pos), this.slice);
  }
  merge(other) {
    if (!(other instanceof _ReplaceStep) || other.structure || this.structure)
      return null;
    if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
      let slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
      return new _ReplaceStep(this.from, this.to + (other.to - other.from), slice, this.structure);
    } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
      let slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
      return new _ReplaceStep(other.from, this.to, slice, this.structure);
    } else {
      return null;
    }
  }
  toJSON() {
    let json = { stepType: "replace", from: this.from, to: this.to };
    if (this.slice.size)
      json.slice = this.slice.toJSON();
    if (this.structure)
      json.structure = true;
    return json;
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new _ReplaceStep(json.from, json.to, Slice.fromJSON(schema, json.slice), !!json.structure);
  }
};
Step.jsonID("replace", ReplaceStep);
var ReplaceAroundStep = class _ReplaceAroundStep extends Step {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(from, to, gapFrom, gapTo, slice, insert, structure = false) {
    super();
    this.from = from;
    this.to = to;
    this.gapFrom = gapFrom;
    this.gapTo = gapTo;
    this.slice = slice;
    this.insert = insert;
    this.structure = structure;
  }
  apply(doc2) {
    if (this.structure && (contentBetween(doc2, this.from, this.gapFrom) || contentBetween(doc2, this.gapTo, this.to)))
      return StepResult.fail("Structure gap-replace would overwrite content");
    let gap = doc2.slice(this.gapFrom, this.gapTo);
    if (gap.openStart || gap.openEnd)
      return StepResult.fail("Gap is not a flat range");
    let inserted = this.slice.insertAt(this.insert, gap.content);
    if (!inserted)
      return StepResult.fail("Content does not fit in gap");
    return StepResult.fromReplace(doc2, this.from, this.to, inserted);
  }
  getMap() {
    return new StepMap([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(doc2) {
    let gap = this.gapTo - this.gapFrom;
    return new _ReplaceAroundStep(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc2.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    let gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
    if (from.deletedAcross && to.deletedAcross || gapFrom < from.pos || gapTo > to.pos)
      return null;
    return new _ReplaceAroundStep(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let json = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    if (this.slice.size)
      json.slice = this.slice.toJSON();
    if (this.structure)
      json.structure = true;
    return json;
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new _ReplaceAroundStep(json.from, json.to, json.gapFrom, json.gapTo, Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
  }
};
Step.jsonID("replaceAround", ReplaceAroundStep);
function contentBetween(doc2, from, to) {
  let $from = doc2.resolve(from), dist = to - from, depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    let next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf)
        return true;
      next = next.firstChild;
      dist--;
    }
  }
  return false;
}
function addMark(tr, from, to, mark) {
  let removed = [], added = [];
  let removing, adding;
  tr.doc.nodesBetween(from, to, (node, pos, parent) => {
    if (!node.isInline)
      return;
    let marks = node.marks;
    if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
      let start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
      let newSet = mark.addToSet(marks);
      for (let i = 0; i < marks.length; i++) {
        if (!marks[i].isInSet(newSet)) {
          if (removing && removing.to == start && removing.mark.eq(marks[i]))
            removing.to = end;
          else
            removed.push(removing = new RemoveMarkStep(start, end, marks[i]));
        }
      }
      if (adding && adding.to == start)
        adding.to = end;
      else
        added.push(adding = new AddMarkStep(start, end, mark));
    }
  });
  removed.forEach((s) => tr.step(s));
  added.forEach((s) => tr.step(s));
}
function removeMark(tr, from, to, mark) {
  let matched = [], step = 0;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isInline)
      return;
    step++;
    let toRemove = null;
    if (mark instanceof MarkType) {
      let set = node.marks, found2;
      while (found2 = mark.isInSet(set)) {
        (toRemove || (toRemove = [])).push(found2);
        set = found2.removeFromSet(set);
      }
    } else if (mark) {
      if (mark.isInSet(node.marks))
        toRemove = [mark];
    } else {
      toRemove = node.marks;
    }
    if (toRemove && toRemove.length) {
      let end = Math.min(pos + node.nodeSize, to);
      for (let i = 0; i < toRemove.length; i++) {
        let style = toRemove[i], found2;
        for (let j = 0; j < matched.length; j++) {
          let m = matched[j];
          if (m.step == step - 1 && style.eq(matched[j].style))
            found2 = m;
        }
        if (found2) {
          found2.to = end;
          found2.step = step;
        } else {
          matched.push({ style, from: Math.max(pos, from), to: end, step });
        }
      }
    }
  });
  matched.forEach((m) => tr.step(new RemoveMarkStep(m.from, m.to, m.style)));
}
function clearIncompatible(tr, pos, parentType, match = parentType.contentMatch) {
  let node = tr.doc.nodeAt(pos);
  let replSteps = [], cur = pos + 1;
  for (let i = 0; i < node.childCount; i++) {
    let child = node.child(i), end = cur + child.nodeSize;
    let allowed = match.matchType(child.type);
    if (!allowed) {
      replSteps.push(new ReplaceStep(cur, end, Slice.empty));
    } else {
      match = allowed;
      for (let j = 0; j < child.marks.length; j++)
        if (!parentType.allowsMarkType(child.marks[j].type))
          tr.step(new RemoveMarkStep(cur, end, child.marks[j]));
      if (child.isText && !parentType.spec.code) {
        let m, newline = /\r?\n|\r/g, slice;
        while (m = newline.exec(child.text)) {
          if (!slice)
            slice = new Slice(Fragment.from(parentType.schema.text(" ", parentType.allowedMarks(child.marks))), 0, 0);
          replSteps.push(new ReplaceStep(cur + m.index, cur + m.index + m[0].length, slice));
        }
      }
    }
    cur = end;
  }
  if (!match.validEnd) {
    let fill = match.fillBefore(Fragment.empty, true);
    tr.replace(cur, cur, new Slice(fill, 0, 0));
  }
  for (let i = replSteps.length - 1; i >= 0; i--)
    tr.step(replSteps[i]);
}
function canCut(node, start, end) {
  return (start == 0 || node.canReplace(start, node.childCount)) && (end == node.childCount || node.canReplace(0, end));
}
function liftTarget(range) {
  let parent = range.parent;
  let content = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (let depth = range.depth; ; --depth) {
    let node = range.$from.node(depth);
    let index = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node.canReplace(index, endIndex, content))
      return depth;
    if (depth == 0 || node.type.spec.isolating || !canCut(node, index, endIndex))
      break;
  }
  return null;
}
function lift(tr, range, target) {
  let { $from, $to, depth } = range;
  let gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
  let start = gapStart, end = gapEnd;
  let before = Fragment.empty, openStart = 0;
  for (let d = depth, splitting = false; d > target; d--)
    if (splitting || $from.index(d) > 0) {
      splitting = true;
      before = Fragment.from($from.node(d).copy(before));
      openStart++;
    } else {
      start--;
    }
  let after = Fragment.empty, openEnd = 0;
  for (let d = depth, splitting = false; d > target; d--)
    if (splitting || $to.after(d + 1) < $to.end(d)) {
      splitting = true;
      after = Fragment.from($to.node(d).copy(after));
      openEnd++;
    } else {
      end++;
    }
  tr.step(new ReplaceAroundStep(start, end, gapStart, gapEnd, new Slice(before.append(after), openStart, openEnd), before.size - openStart, true));
}
function findWrapping(range, nodeType, attrs = null, innerRange = range) {
  let around = findWrappingOutside(range, nodeType);
  let inner = around && findWrappingInside(innerRange, nodeType);
  if (!inner)
    return null;
  return around.map(withAttrs).concat({ type: nodeType, attrs }).concat(inner.map(withAttrs));
}
function withAttrs(type) {
  return { type, attrs: null };
}
function findWrappingOutside(range, type) {
  let { parent, startIndex, endIndex } = range;
  let around = parent.contentMatchAt(startIndex).findWrapping(type);
  if (!around)
    return null;
  let outer = around.length ? around[0] : type;
  return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
}
function findWrappingInside(range, type) {
  let { parent, startIndex, endIndex } = range;
  let inner = parent.child(startIndex);
  let inside = type.contentMatch.findWrapping(inner.type);
  if (!inside)
    return null;
  let lastType = inside.length ? inside[inside.length - 1] : type;
  let innerMatch = lastType.contentMatch;
  for (let i = startIndex; innerMatch && i < endIndex; i++)
    innerMatch = innerMatch.matchType(parent.child(i).type);
  if (!innerMatch || !innerMatch.validEnd)
    return null;
  return inside;
}
function wrap(tr, range, wrappers) {
  let content = Fragment.empty;
  for (let i = wrappers.length - 1; i >= 0; i--) {
    if (content.size) {
      let match = wrappers[i].type.contentMatch.matchFragment(content);
      if (!match || !match.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    content = Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }
  let start = range.start, end = range.end;
  tr.step(new ReplaceAroundStep(start, end, start, end, new Slice(content, 0, 0), wrappers.length, true));
}
function setBlockType(tr, from, to, type, attrs) {
  if (!type.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let mapFrom = tr.steps.length;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isTextblock && !node.hasMarkup(type, attrs) && canChangeType(tr.doc, tr.mapping.slice(mapFrom).map(pos), type)) {
      tr.clearIncompatible(tr.mapping.slice(mapFrom).map(pos, 1), type);
      let mapping = tr.mapping.slice(mapFrom);
      let startM = mapping.map(pos, 1), endM = mapping.map(pos + node.nodeSize, 1);
      tr.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new Slice(Fragment.from(type.create(attrs, null, node.marks)), 0, 0), 1, true));
      return false;
    }
  });
}
function canChangeType(doc2, pos, type) {
  let $pos = doc2.resolve(pos), index = $pos.index();
  return $pos.parent.canReplaceWith(index, index + 1, type);
}
function setNodeMarkup(tr, pos, type, attrs, marks) {
  let node = tr.doc.nodeAt(pos);
  if (!node)
    throw new RangeError("No node at given position");
  if (!type)
    type = node.type;
  let newNode = type.create(attrs, null, marks || node.marks);
  if (node.isLeaf)
    return tr.replaceWith(pos, pos + node.nodeSize, newNode);
  if (!type.validContent(node.content))
    throw new RangeError("Invalid content for node type " + type.name);
  tr.step(new ReplaceAroundStep(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1, new Slice(Fragment.from(newNode), 0, 0), 1, true));
}
function canSplit(doc2, pos, depth = 1, typesAfter) {
  let $pos = doc2.resolve(pos), base = $pos.depth - depth;
  let innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
  if (base < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount)))
    return false;
  for (let d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
    let node = $pos.node(d), index2 = $pos.index(d);
    if (node.type.spec.isolating)
      return false;
    let rest = node.content.cutByIndex(index2, node.childCount);
    let overrideChild = typesAfter && typesAfter[i + 1];
    if (overrideChild)
      rest = rest.replaceChild(0, overrideChild.type.create(overrideChild.attrs));
    let after = typesAfter && typesAfter[i] || node;
    if (!node.canReplace(index2 + 1, node.childCount) || !after.type.validContent(rest))
      return false;
  }
  let index = $pos.indexAfter(base);
  let baseType = typesAfter && typesAfter[0];
  return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type);
}
function split(tr, pos, depth = 1, typesAfter) {
  let $pos = tr.doc.resolve(pos), before = Fragment.empty, after = Fragment.empty;
  for (let d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
    before = Fragment.from($pos.node(d).copy(before));
    let typeAfter = typesAfter && typesAfter[i];
    after = Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
  }
  tr.step(new ReplaceStep(pos, pos, new Slice(before.append(after), depth, depth), true));
}
function canJoin(doc2, pos) {
  let $pos = doc2.resolve(pos), index = $pos.index();
  return joinable2($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
}
function joinable2(a, b) {
  return !!(a && b && !a.isLeaf && a.canAppend(b));
}
function joinPoint(doc2, pos, dir = -1) {
  let $pos = doc2.resolve(pos);
  for (let d = $pos.depth; ; d--) {
    let before, after, index = $pos.index(d);
    if (d == $pos.depth) {
      before = $pos.nodeBefore;
      after = $pos.nodeAfter;
    } else if (dir > 0) {
      before = $pos.node(d + 1);
      index++;
      after = $pos.node(d).maybeChild(index);
    } else {
      before = $pos.node(d).maybeChild(index - 1);
      after = $pos.node(d + 1);
    }
    if (before && !before.isTextblock && joinable2(before, after) && $pos.node(d).canReplace(index, index + 1))
      return pos;
    if (d == 0)
      break;
    pos = dir < 0 ? $pos.before(d) : $pos.after(d);
  }
}
function join(tr, pos, depth) {
  let step = new ReplaceStep(pos - depth, pos + depth, Slice.empty, true);
  tr.step(step);
}
function insertPoint(doc2, pos, nodeType) {
  let $pos = doc2.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType))
    return pos;
  if ($pos.parentOffset == 0)
    for (let d = $pos.depth - 1; d >= 0; d--) {
      let index = $pos.index(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType))
        return $pos.before(d + 1);
      if (index > 0)
        return null;
    }
  if ($pos.parentOffset == $pos.parent.content.size)
    for (let d = $pos.depth - 1; d >= 0; d--) {
      let index = $pos.indexAfter(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType))
        return $pos.after(d + 1);
      if (index < $pos.node(d).childCount)
        return null;
    }
  return null;
}
function dropPoint(doc2, pos, slice) {
  let $pos = doc2.resolve(pos);
  if (!slice.content.size)
    return pos;
  let content = slice.content;
  for (let i = 0; i < slice.openStart; i++)
    content = content.firstChild.content;
  for (let pass = 1; pass <= (slice.openStart == 0 && slice.size ? 2 : 1); pass++) {
    for (let d = $pos.depth; d >= 0; d--) {
      let bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
      let insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
      let parent = $pos.node(d), fits = false;
      if (pass == 1) {
        fits = parent.canReplace(insertPos, insertPos, content);
      } else {
        let wrapping = parent.contentMatchAt(insertPos).findWrapping(content.firstChild.type);
        fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
      }
      if (fits)
        return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
    }
  }
  return null;
}
function replaceStep(doc2, from, to = from, slice = Slice.empty) {
  if (from == to && !slice.size)
    return null;
  let $from = doc2.resolve(from), $to = doc2.resolve(to);
  if (fitsTrivially($from, $to, slice))
    return new ReplaceStep(from, to, slice);
  return new Fitter($from, $to, slice).fit();
}
function fitsTrivially($from, $to, slice) {
  return !slice.openStart && !slice.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice.content);
}
var Fitter = class {
  constructor($from, $to, unplaced) {
    this.$from = $from;
    this.$to = $to;
    this.unplaced = unplaced;
    this.frontier = [];
    this.placed = Fragment.empty;
    for (let i = 0; i <= $from.depth; i++) {
      let node = $from.node(i);
      this.frontier.push({
        type: node.type,
        match: node.contentMatchAt($from.indexAfter(i))
      });
    }
    for (let i = $from.depth; i > 0; i--)
      this.placed = Fragment.from($from.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    while (this.unplaced.size) {
      let fit = this.findFittable();
      if (fit)
        this.placeNodes(fit);
      else
        this.openMore() || this.dropNode();
    }
    let moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
    let $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
    if (!$to)
      return null;
    let content = this.placed, openStart = $from.depth, openEnd = $to.depth;
    while (openStart && openEnd && content.childCount == 1) {
      content = content.firstChild.content;
      openStart--;
      openEnd--;
    }
    let slice = new Slice(content, openStart, openEnd);
    if (moveInline > -1)
      return new ReplaceAroundStep($from.pos, moveInline, this.$to.pos, this.$to.end(), slice, placedSize);
    if (slice.size || $from.pos != this.$to.pos)
      return new ReplaceStep($from.pos, $to.pos, slice);
    return null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let startDepth = this.unplaced.openStart;
    for (let cur = this.unplaced.content, d = 0, openEnd = this.unplaced.openEnd; d < startDepth; d++) {
      let node = cur.firstChild;
      if (cur.childCount > 1)
        openEnd = 0;
      if (node.type.spec.isolating && openEnd <= d) {
        startDepth = d;
        break;
      }
      cur = node.content;
    }
    for (let pass = 1; pass <= 2; pass++) {
      for (let sliceDepth = pass == 1 ? startDepth : this.unplaced.openStart; sliceDepth >= 0; sliceDepth--) {
        let fragment, parent = null;
        if (sliceDepth) {
          parent = contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
          fragment = parent.content;
        } else {
          fragment = this.unplaced.content;
        }
        let first = fragment.firstChild;
        for (let frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--) {
          let { type, match } = this.frontier[frontierDepth], wrap2, inject = null;
          if (pass == 1 && (first ? match.matchType(first.type) || (inject = match.fillBefore(Fragment.from(first), false)) : parent && type.compatibleContent(parent.type)))
            return { sliceDepth, frontierDepth, parent, inject };
          else if (pass == 2 && first && (wrap2 = match.findWrapping(first.type)))
            return { sliceDepth, frontierDepth, parent, wrap: wrap2 };
          if (parent && match.matchType(parent.type))
            break;
        }
      }
    }
  }
  openMore() {
    let { content, openStart, openEnd } = this.unplaced;
    let inner = contentAt(content, openStart);
    if (!inner.childCount || inner.firstChild.isLeaf)
      return false;
    this.unplaced = new Slice(content, openStart + 1, Math.max(openEnd, inner.size + openStart >= content.size - openEnd ? openStart + 1 : 0));
    return true;
  }
  dropNode() {
    let { content, openStart, openEnd } = this.unplaced;
    let inner = contentAt(content, openStart);
    if (inner.childCount <= 1 && openStart > 0) {
      let openAtEnd = content.size - openStart <= openStart + inner.size;
      this.unplaced = new Slice(dropFromFragment(content, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
    } else {
      this.unplaced = new Slice(dropFromFragment(content, openStart, 1), openStart, openEnd);
    }
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth, frontierDepth, parent, inject, wrap: wrap2 }) {
    while (this.depth > frontierDepth)
      this.closeFrontierNode();
    if (wrap2)
      for (let i = 0; i < wrap2.length; i++)
        this.openFrontierNode(wrap2[i]);
    let slice = this.unplaced, fragment = parent ? parent.content : slice.content;
    let openStart = slice.openStart - sliceDepth;
    let taken = 0, add = [];
    let { match, type } = this.frontier[frontierDepth];
    if (inject) {
      for (let i = 0; i < inject.childCount; i++)
        add.push(inject.child(i));
      match = match.matchFragment(inject);
    }
    let openEndCount = fragment.size + sliceDepth - (slice.content.size - slice.openEnd);
    while (taken < fragment.childCount) {
      let next = fragment.child(taken), matches2 = match.matchType(next.type);
      if (!matches2)
        break;
      taken++;
      if (taken > 1 || openStart == 0 || next.content.size) {
        match = matches2;
        add.push(closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
      }
    }
    let toEnd = taken == fragment.childCount;
    if (!toEnd)
      openEndCount = -1;
    this.placed = addToFragment(this.placed, frontierDepth, Fragment.from(add));
    this.frontier[frontierDepth].match = match;
    if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1)
      this.closeFrontierNode();
    for (let i = 0, cur = fragment; i < openEndCount; i++) {
      let node = cur.lastChild;
      this.frontier.push({ type: node.type, match: node.contentMatchAt(node.childCount) });
      cur = node.content;
    }
    this.unplaced = !toEnd ? new Slice(dropFromFragment(slice.content, sliceDepth, taken), slice.openStart, slice.openEnd) : sliceDepth == 0 ? Slice.empty : new Slice(dropFromFragment(slice.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice.openEnd : sliceDepth - 1);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let top = this.frontier[this.depth], level;
    if (!top.type.isTextblock || !contentAfterFits(this.$to, this.$to.depth, top.type, top.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth)
      return -1;
    let { depth } = this.$to, after = this.$to.after(depth);
    while (depth > 1 && after == this.$to.end(--depth))
      ++after;
    return after;
  }
  findCloseLevel($to) {
    scan:
      for (let i = Math.min(this.depth, $to.depth); i >= 0; i--) {
        let { match, type } = this.frontier[i];
        let dropInner = i < $to.depth && $to.end(i + 1) == $to.pos + ($to.depth - (i + 1));
        let fit = contentAfterFits($to, i, type, match, dropInner);
        if (!fit)
          continue;
        for (let d = i - 1; d >= 0; d--) {
          let { match: match2, type: type2 } = this.frontier[d];
          let matches2 = contentAfterFits($to, d, type2, match2, true);
          if (!matches2 || matches2.childCount)
            continue scan;
        }
        return { depth: i, fit, move: dropInner ? $to.doc.resolve($to.after(i + 1)) : $to };
      }
  }
  close($to) {
    let close2 = this.findCloseLevel($to);
    if (!close2)
      return null;
    while (this.depth > close2.depth)
      this.closeFrontierNode();
    if (close2.fit.childCount)
      this.placed = addToFragment(this.placed, close2.depth, close2.fit);
    $to = close2.move;
    for (let d = close2.depth + 1; d <= $to.depth; d++) {
      let node = $to.node(d), add = node.type.contentMatch.fillBefore(node.content, true, $to.index(d));
      this.openFrontierNode(node.type, node.attrs, add);
    }
    return $to;
  }
  openFrontierNode(type, attrs = null, content) {
    let top = this.frontier[this.depth];
    top.match = top.match.matchType(type);
    this.placed = addToFragment(this.placed, this.depth, Fragment.from(type.create(attrs, content)));
    this.frontier.push({ type, match: type.contentMatch });
  }
  closeFrontierNode() {
    let open = this.frontier.pop();
    let add = open.match.fillBefore(Fragment.empty, true);
    if (add.childCount)
      this.placed = addToFragment(this.placed, this.frontier.length, add);
  }
};
function dropFromFragment(fragment, depth, count) {
  if (depth == 0)
    return fragment.cutByIndex(count, fragment.childCount);
  return fragment.replaceChild(0, fragment.firstChild.copy(dropFromFragment(fragment.firstChild.content, depth - 1, count)));
}
function addToFragment(fragment, depth, content) {
  if (depth == 0)
    return fragment.append(content);
  return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy(addToFragment(fragment.lastChild.content, depth - 1, content)));
}
function contentAt(fragment, depth) {
  for (let i = 0; i < depth; i++)
    fragment = fragment.firstChild.content;
  return fragment;
}
function closeNodeStart(node, openStart, openEnd) {
  if (openStart <= 0)
    return node;
  let frag = node.content;
  if (openStart > 1)
    frag = frag.replaceChild(0, closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
  if (openStart > 0) {
    frag = node.type.contentMatch.fillBefore(frag).append(frag);
    if (openEnd <= 0)
      frag = frag.append(node.type.contentMatch.matchFragment(frag).fillBefore(Fragment.empty, true));
  }
  return node.copy(frag);
}
function contentAfterFits($to, depth, type, match, open) {
  let node = $to.node(depth), index = open ? $to.indexAfter(depth) : $to.index(depth);
  if (index == node.childCount && !type.compatibleContent(node.type))
    return null;
  let fit = match.fillBefore(node.content, true, index);
  return fit && !invalidMarks(type, node.content, index) ? fit : null;
}
function invalidMarks(type, fragment, start) {
  for (let i = start; i < fragment.childCount; i++)
    if (!type.allowsMarks(fragment.child(i).marks))
      return true;
  return false;
}
function definesContent(type) {
  return type.spec.defining || type.spec.definingForContent;
}
function replaceRange(tr, from, to, slice) {
  if (!slice.size)
    return tr.deleteRange(from, to);
  let $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
  if (fitsTrivially($from, $to, slice))
    return tr.step(new ReplaceStep(from, to, slice));
  let targetDepths = coveredDepths($from, tr.doc.resolve(to));
  if (targetDepths[targetDepths.length - 1] == 0)
    targetDepths.pop();
  let preferredTarget = -($from.depth + 1);
  targetDepths.unshift(preferredTarget);
  for (let d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
    let spec = $from.node(d).type.spec;
    if (spec.defining || spec.definingAsContext || spec.isolating)
      break;
    if (targetDepths.indexOf(d) > -1)
      preferredTarget = d;
    else if ($from.before(d) == pos)
      targetDepths.splice(1, 0, -d);
  }
  let preferredTargetIndex = targetDepths.indexOf(preferredTarget);
  let leftNodes = [], preferredDepth = slice.openStart;
  for (let content = slice.content, i = 0; ; i++) {
    let node = content.firstChild;
    leftNodes.push(node);
    if (i == slice.openStart)
      break;
    content = node.content;
  }
  for (let d = preferredDepth - 1; d >= 0; d--) {
    let leftNode = leftNodes[d], def = definesContent(leftNode.type);
    if (def && !leftNode.sameMarkup($from.node(Math.abs(preferredTarget) - 1)))
      preferredDepth = d;
    else if (def || !leftNode.type.isTextblock)
      break;
  }
  for (let j = slice.openStart; j >= 0; j--) {
    let openDepth = (j + preferredDepth + 1) % (slice.openStart + 1);
    let insert = leftNodes[openDepth];
    if (!insert)
      continue;
    for (let i = 0; i < targetDepths.length; i++) {
      let targetDepth = targetDepths[(i + preferredTargetIndex) % targetDepths.length], expand = true;
      if (targetDepth < 0) {
        expand = false;
        targetDepth = -targetDepth;
      }
      let parent = $from.node(targetDepth - 1), index = $from.index(targetDepth - 1);
      if (parent.canReplaceWith(index, index, insert.type, insert.marks))
        return tr.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new Slice(closeFragment(slice.content, 0, slice.openStart, openDepth), openDepth, slice.openEnd));
    }
  }
  let startSteps = tr.steps.length;
  for (let i = targetDepths.length - 1; i >= 0; i--) {
    tr.replace(from, to, slice);
    if (tr.steps.length > startSteps)
      break;
    let depth = targetDepths[i];
    if (depth < 0)
      continue;
    from = $from.before(depth);
    to = $to.after(depth);
  }
}
function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
  if (depth < oldOpen) {
    let first = fragment.firstChild;
    fragment = fragment.replaceChild(0, first.copy(closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
  }
  if (depth > newOpen) {
    let match = parent.contentMatchAt(0);
    let start = match.fillBefore(fragment).append(fragment);
    fragment = start.append(match.matchFragment(start).fillBefore(Fragment.empty, true));
  }
  return fragment;
}
function replaceRangeWith(tr, from, to, node) {
  if (!node.isInline && from == to && tr.doc.resolve(from).parent.content.size) {
    let point = insertPoint(tr.doc, from, node.type);
    if (point != null)
      from = to = point;
  }
  tr.replaceRange(from, to, new Slice(Fragment.from(node), 0, 0));
}
function deleteRange(tr, from, to) {
  let $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
  let covered = coveredDepths($from, $to);
  for (let i = 0; i < covered.length; i++) {
    let depth = covered[i], last = i == covered.length - 1;
    if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd)
      return tr.delete($from.start(depth), $to.end(depth));
    if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1))))
      return tr.delete($from.before(depth), $to.after(depth));
  }
  for (let d = 1; d <= $from.depth && d <= $to.depth; d++) {
    if (from - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d)
      return tr.delete($from.before(d), to);
  }
  tr.delete(from, to);
}
function coveredDepths($from, $to) {
  let result = [], minDepth = Math.min($from.depth, $to.depth);
  for (let d = minDepth; d >= 0; d--) {
    let start = $from.start(d);
    if (start < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating)
      break;
    if (start == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start - 1)
      result.push(d);
  }
  return result;
}
var AttrStep = class _AttrStep extends Step {
  /**
  Construct an attribute step.
  */
  constructor(pos, attr, value) {
    super();
    this.pos = pos;
    this.attr = attr;
    this.value = value;
  }
  apply(doc2) {
    let node = doc2.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at attribute step's position");
    let attrs = /* @__PURE__ */ Object.create(null);
    for (let name in node.attrs)
      attrs[name] = node.attrs[name];
    attrs[this.attr] = this.value;
    let updated = node.type.create(attrs, null, node.marks);
    return StepResult.fromReplace(doc2, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  getMap() {
    return StepMap.empty;
  }
  invert(doc2) {
    return new _AttrStep(this.pos, this.attr, doc2.nodeAt(this.pos).attrs[this.attr]);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _AttrStep(pos.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(schema, json) {
    if (typeof json.pos != "number" || typeof json.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new _AttrStep(json.pos, json.attr, json.value);
  }
};
Step.jsonID("attr", AttrStep);
var DocAttrStep = class _DocAttrStep extends Step {
  /**
  Construct an attribute step.
  */
  constructor(attr, value) {
    super();
    this.attr = attr;
    this.value = value;
  }
  apply(doc2) {
    let attrs = /* @__PURE__ */ Object.create(null);
    for (let name in doc2.attrs)
      attrs[name] = doc2.attrs[name];
    attrs[this.attr] = this.value;
    let updated = doc2.type.create(attrs, doc2.content, doc2.marks);
    return StepResult.ok(updated);
  }
  getMap() {
    return StepMap.empty;
  }
  invert(doc2) {
    return new _DocAttrStep(this.attr, doc2.attrs[this.attr]);
  }
  map(mapping) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(schema, json) {
    if (typeof json.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new _DocAttrStep(json.attr, json.value);
  }
};
Step.jsonID("docAttr", DocAttrStep);
var TransformError = class extends Error {
};
TransformError = function TransformError2(message) {
  let err = Error.call(this, message);
  err.__proto__ = TransformError2.prototype;
  return err;
};
TransformError.prototype = Object.create(Error.prototype);
TransformError.prototype.constructor = TransformError;
TransformError.prototype.name = "TransformError";
var Transform = class {
  /**
  Create a transform that starts with the given document.
  */
  constructor(doc2) {
    this.doc = doc2;
    this.steps = [];
    this.docs = [];
    this.mapping = new Mapping();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(step) {
    let result = this.maybeStep(step);
    if (result.failed)
      throw new TransformError(result.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(step) {
    let result = step.apply(this.doc);
    if (!result.failed)
      this.addStep(step, result.doc);
    return result;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(step, doc2) {
    this.docs.push(this.doc);
    this.steps.push(step);
    this.mapping.appendMap(step.getMap());
    this.doc = doc2;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(from, to = from, slice = Slice.empty) {
    let step = replaceStep(this.doc, from, to, slice);
    if (step)
      this.step(step);
    return this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(from, to, content) {
    return this.replace(from, to, new Slice(Fragment.from(content), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(from, to) {
    return this.replace(from, to, Slice.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(pos, content) {
    return this.replaceWith(pos, pos, content);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(from, to, slice) {
    replaceRange(this, from, to, slice);
    return this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(from, to, node) {
    replaceRangeWith(this, from, to, node);
    return this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(from, to) {
    deleteRange(this, from, to);
    return this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(range, target) {
    lift(this, range, target);
    return this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(pos, depth = 1) {
    join(this, pos, depth);
    return this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(range, wrappers) {
    wrap(this, range, wrappers);
    return this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(from, to = from, type, attrs = null) {
    setBlockType(this, from, to, type, attrs);
    return this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(pos, type, attrs = null, marks) {
    setNodeMarkup(this, pos, type, attrs, marks);
    return this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(pos, attr, value) {
    this.step(new AttrStep(pos, attr, value));
    return this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(attr, value) {
    this.step(new DocAttrStep(attr, value));
    return this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(pos, mark) {
    this.step(new AddNodeMarkStep(pos, mark));
    return this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(pos, mark) {
    if (!(mark instanceof Mark)) {
      let node = this.doc.nodeAt(pos);
      if (!node)
        throw new RangeError("No node at position " + pos);
      mark = mark.isInSet(node.marks);
      if (!mark)
        return this;
    }
    this.step(new RemoveNodeMarkStep(pos, mark));
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(pos, depth = 1, typesAfter) {
    split(this, pos, depth, typesAfter);
    return this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(from, to, mark) {
    addMark(this, from, to, mark);
    return this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(from, to, mark) {
    removeMark(this, from, to, mark);
    return this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(pos, parentType, match) {
    clearIncompatible(this, pos, parentType, match);
    return this;
  }
};

// node_modules/prosemirror-state/dist/index.js
var classesById = /* @__PURE__ */ Object.create(null);
var Selection = class {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor($anchor, $head, ranges) {
    this.$anchor = $anchor;
    this.$head = $head;
    this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++)
      if (ranges[i].$from.pos != ranges[i].$to.pos)
        return false;
    return true;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, true);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(tr, content = Slice.empty) {
    let lastNode = content.content.lastChild, lastParent = null;
    for (let i = 0; i < content.openEnd; i++) {
      lastParent = lastNode;
      lastNode = lastNode.lastChild;
    }
    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      let { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
      tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i ? Slice.empty : content);
      if (i == 0)
        selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(tr, node) {
    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      let { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
      let from = mapping.map($from.pos), to = mapping.map($to.pos);
      if (i) {
        tr.deleteRange(from, to);
      } else {
        tr.replaceRangeWith(from, to, node);
        selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
      }
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom($pos, dir, textOnly = false) {
    let inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
    if (inner)
      return inner;
    for (let depth = $pos.depth - 1; depth >= 0; depth--) {
      let found2 = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
      if (found2)
        return found2;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near($pos, bias = 1) {
    return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(doc2) {
    return findSelectionIn(doc2, doc2, 0, 0, 1) || new AllSelection(doc2);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(doc2) {
    return findSelectionIn(doc2, doc2, doc2.content.size, doc2.childCount, -1) || new AllSelection(doc2);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(doc2, json) {
    if (!json || !json.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let cls = classesById[json.type];
    if (!cls)
      throw new RangeError(`No selection type ${json.type} defined`);
    return cls.fromJSON(doc2, json);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(id, selectionClass) {
    if (id in classesById)
      throw new RangeError("Duplicate use of selection JSON ID " + id);
    classesById[id] = selectionClass;
    selectionClass.prototype.jsonID = id;
    return selectionClass;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return TextSelection.between(this.$anchor, this.$head).getBookmark();
  }
};
Selection.prototype.visible = true;
var SelectionRange = class {
  /**
  Create a range.
  */
  constructor($from, $to) {
    this.$from = $from;
    this.$to = $to;
  }
};
var warnedAboutTextSelection = false;
function checkTextSelection($pos) {
  if (!warnedAboutTextSelection && !$pos.parent.inlineContent) {
    warnedAboutTextSelection = true;
    console["warn"]("TextSelection endpoint not pointing into a node with inline content (" + $pos.parent.type.name + ")");
  }
}
var TextSelection = class _TextSelection extends Selection {
  /**
  Construct a text selection between the given points.
  */
  constructor($anchor, $head = $anchor) {
    checkTextSelection($anchor);
    checkTextSelection($head);
    super($anchor, $head);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(doc2, mapping) {
    let $head = doc2.resolve(mapping.map(this.head));
    if (!$head.parent.inlineContent)
      return Selection.near($head);
    let $anchor = doc2.resolve(mapping.map(this.anchor));
    return new _TextSelection($anchor.parent.inlineContent ? $anchor : $head, $head);
  }
  replace(tr, content = Slice.empty) {
    super.replace(tr, content);
    if (content == Slice.empty) {
      let marks = this.$from.marksAcross(this.$to);
      if (marks)
        tr.ensureMarks(marks);
    }
  }
  eq(other) {
    return other instanceof _TextSelection && other.anchor == this.anchor && other.head == this.head;
  }
  getBookmark() {
    return new TextBookmark(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(doc2, json) {
    if (typeof json.anchor != "number" || typeof json.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new _TextSelection(doc2.resolve(json.anchor), doc2.resolve(json.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(doc2, anchor, head = anchor) {
    let $anchor = doc2.resolve(anchor);
    return new this($anchor, head == anchor ? $anchor : doc2.resolve(head));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between($anchor, $head, bias) {
    let dPos = $anchor.pos - $head.pos;
    if (!bias || dPos)
      bias = dPos >= 0 ? 1 : -1;
    if (!$head.parent.inlineContent) {
      let found2 = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
      if (found2)
        $head = found2.$head;
      else
        return Selection.near($head, bias);
    }
    if (!$anchor.parent.inlineContent) {
      if (dPos == 0) {
        $anchor = $head;
      } else {
        $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor;
        if ($anchor.pos < $head.pos != dPos < 0)
          $anchor = $head;
      }
    }
    return new _TextSelection($anchor, $head);
  }
};
Selection.jsonID("text", TextSelection);
var TextBookmark = class _TextBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new _TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc2) {
    return TextSelection.between(doc2.resolve(this.anchor), doc2.resolve(this.head));
  }
};
var NodeSelection = class _NodeSelection extends Selection {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor($pos) {
    let node = $pos.nodeAfter;
    let $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
    super($pos, $end);
    this.node = node;
  }
  map(doc2, mapping) {
    let { deleted, pos } = mapping.mapResult(this.anchor);
    let $pos = doc2.resolve(pos);
    if (deleted)
      return Selection.near($pos);
    return new _NodeSelection($pos);
  }
  content() {
    return new Slice(Fragment.from(this.node), 0, 0);
  }
  eq(other) {
    return other instanceof _NodeSelection && other.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new NodeBookmark(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(doc2, json) {
    if (typeof json.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new _NodeSelection(doc2.resolve(json.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(doc2, from) {
    return new _NodeSelection(doc2.resolve(from));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(node) {
    return !node.isText && node.type.spec.selectable !== false;
  }
};
NodeSelection.prototype.visible = false;
Selection.jsonID("node", NodeSelection);
var NodeBookmark = class _NodeBookmark {
  constructor(anchor) {
    this.anchor = anchor;
  }
  map(mapping) {
    let { deleted, pos } = mapping.mapResult(this.anchor);
    return deleted ? new TextBookmark(pos, pos) : new _NodeBookmark(pos);
  }
  resolve(doc2) {
    let $pos = doc2.resolve(this.anchor), node = $pos.nodeAfter;
    if (node && NodeSelection.isSelectable(node))
      return new NodeSelection($pos);
    return Selection.near($pos);
  }
};
var AllSelection = class _AllSelection extends Selection {
  /**
  Create an all-selection over the given document.
  */
  constructor(doc2) {
    super(doc2.resolve(0), doc2.resolve(doc2.content.size));
  }
  replace(tr, content = Slice.empty) {
    if (content == Slice.empty) {
      tr.delete(0, tr.doc.content.size);
      let sel = Selection.atStart(tr.doc);
      if (!sel.eq(tr.selection))
        tr.setSelection(sel);
    } else {
      super.replace(tr, content);
    }
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(doc2) {
    return new _AllSelection(doc2);
  }
  map(doc2) {
    return new _AllSelection(doc2);
  }
  eq(other) {
    return other instanceof _AllSelection;
  }
  getBookmark() {
    return AllBookmark;
  }
};
Selection.jsonID("all", AllSelection);
var AllBookmark = {
  map() {
    return this;
  },
  resolve(doc2) {
    return new AllSelection(doc2);
  }
};
function findSelectionIn(doc2, node, pos, index, dir, text = false) {
  if (node.inlineContent)
    return TextSelection.create(doc2, pos);
  for (let i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
    let child = node.child(i);
    if (!child.isAtom) {
      let inner = findSelectionIn(doc2, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
      if (inner)
        return inner;
    } else if (!text && NodeSelection.isSelectable(child)) {
      return NodeSelection.create(doc2, pos - (dir < 0 ? child.nodeSize : 0));
    }
    pos += child.nodeSize * dir;
  }
  return null;
}
function selectionToInsertionEnd(tr, startLen, bias) {
  let last = tr.steps.length - 1;
  if (last < startLen)
    return;
  let step = tr.steps[last];
  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep))
    return;
  let map = tr.mapping.maps[last], end;
  map.forEach((_from, _to, _newFrom, newTo) => {
    if (end == null)
      end = newTo;
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
}
var UPDATED_SEL = 1;
var UPDATED_MARKS = 2;
var UPDATED_SCROLL = 4;
var Transaction = class extends Transform {
  /**
  @internal
  */
  constructor(state) {
    super(state.doc);
    this.curSelectionFor = 0;
    this.updated = 0;
    this.meta = /* @__PURE__ */ Object.create(null);
    this.time = Date.now();
    this.curSelection = state.selection;
    this.storedMarks = state.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    if (this.curSelectionFor < this.steps.length) {
      this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
      this.curSelectionFor = this.steps.length;
    }
    return this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(selection) {
    if (selection.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    this.curSelection = selection;
    this.curSelectionFor = this.steps.length;
    this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
    this.storedMarks = null;
    return this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & UPDATED_SEL) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(marks) {
    this.storedMarks = marks;
    this.updated |= UPDATED_MARKS;
    return this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(marks) {
    if (!Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks))
      this.setStoredMarks(marks);
    return this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(mark) {
    return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(mark) {
    return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & UPDATED_MARKS) > 0;
  }
  /**
  @internal
  */
  addStep(step, doc2) {
    super.addStep(step, doc2);
    this.updated = this.updated & ~UPDATED_MARKS;
    this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(time) {
    this.time = time;
    return this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(slice) {
    this.selection.replace(this, slice);
    return this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(node, inheritMarks = true) {
    let selection = this.selection;
    if (inheritMarks)
      node = node.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || Mark.none));
    selection.replaceWith(this, node);
    return this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    this.selection.replace(this);
    return this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(text, from, to) {
    let schema = this.doc.type.schema;
    if (from == null) {
      if (!text)
        return this.deleteSelection();
      return this.replaceSelectionWith(schema.text(text), true);
    } else {
      if (to == null)
        to = from;
      to = to == null ? from : to;
      if (!text)
        return this.deleteRange(from, to);
      let marks = this.storedMarks;
      if (!marks) {
        let $from = this.doc.resolve(from);
        marks = to == from ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
      }
      this.replaceRangeWith(from, to, schema.text(text, marks));
      if (!this.selection.empty)
        this.setSelection(Selection.near(this.selection.$to));
      return this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(key, value) {
    this.meta[typeof key == "string" ? key : key.key] = value;
    return this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(key) {
    return this.meta[typeof key == "string" ? key : key.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let _ in this.meta)
      return false;
    return true;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    this.updated |= UPDATED_SCROLL;
    return this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & UPDATED_SCROLL) > 0;
  }
};
function bind(f, self) {
  return !self || !f ? f : f.bind(self);
}
var FieldDesc = class {
  constructor(name, desc, self) {
    this.name = name;
    this.init = bind(desc.init, self);
    this.apply = bind(desc.apply, self);
  }
};
var baseFields = [
  new FieldDesc("doc", {
    init(config) {
      return config.doc || config.schema.topNodeType.createAndFill();
    },
    apply(tr) {
      return tr.doc;
    }
  }),
  new FieldDesc("selection", {
    init(config, instance) {
      return config.selection || Selection.atStart(instance.doc);
    },
    apply(tr) {
      return tr.selection;
    }
  }),
  new FieldDesc("storedMarks", {
    init(config) {
      return config.storedMarks || null;
    },
    apply(tr, _marks, _old, state) {
      return state.selection.$cursor ? tr.storedMarks : null;
    }
  }),
  new FieldDesc("scrollToSelection", {
    init() {
      return 0;
    },
    apply(tr, prev) {
      return tr.scrolledIntoView ? prev + 1 : prev;
    }
  })
];
var Configuration = class {
  constructor(schema, plugins) {
    this.schema = schema;
    this.plugins = [];
    this.pluginsByKey = /* @__PURE__ */ Object.create(null);
    this.fields = baseFields.slice();
    if (plugins)
      plugins.forEach((plugin) => {
        if (this.pluginsByKey[plugin.key])
          throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")");
        this.plugins.push(plugin);
        this.pluginsByKey[plugin.key] = plugin;
        if (plugin.spec.state)
          this.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
      });
  }
};
var EditorState = class _EditorState {
  /**
  @internal
  */
  constructor(config) {
    this.config = config;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(tr) {
    return this.applyTransaction(tr).state;
  }
  /**
  @internal
  */
  filterTransaction(tr, ignore = -1) {
    for (let i = 0; i < this.config.plugins.length; i++)
      if (i != ignore) {
        let plugin = this.config.plugins[i];
        if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this))
          return false;
      }
    return true;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(rootTr) {
    if (!this.filterTransaction(rootTr))
      return { state: this, transactions: [] };
    let trs = [rootTr], newState = this.applyInner(rootTr), seen = null;
    for (; ; ) {
      let haveNew = false;
      for (let i = 0; i < this.config.plugins.length; i++) {
        let plugin = this.config.plugins[i];
        if (plugin.spec.appendTransaction) {
          let n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this;
          let tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
          if (tr && newState.filterTransaction(tr, i)) {
            tr.setMeta("appendedTransaction", rootTr);
            if (!seen) {
              seen = [];
              for (let j = 0; j < this.config.plugins.length; j++)
                seen.push(j < i ? { state: newState, n: trs.length } : { state: this, n: 0 });
            }
            trs.push(tr);
            newState = newState.applyInner(tr);
            haveNew = true;
          }
          if (seen)
            seen[i] = { state: newState, n: trs.length };
        }
      }
      if (!haveNew)
        return { state: newState, transactions: trs };
    }
  }
  /**
  @internal
  */
  applyInner(tr) {
    if (!tr.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let newInstance = new _EditorState(this.config), fields = this.config.fields;
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
    }
    return newInstance;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Transaction(this);
  }
  /**
  Create a new state.
  */
  static create(config) {
    let $config = new Configuration(config.doc ? config.doc.type.schema : config.schema, config.plugins);
    let instance = new _EditorState($config);
    for (let i = 0; i < $config.fields.length; i++)
      instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
    return instance;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(config) {
    let $config = new Configuration(this.schema, config.plugins);
    let fields = $config.fields, instance = new _EditorState($config);
    for (let i = 0; i < fields.length; i++) {
      let name = fields[i].name;
      instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
    }
    return instance;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(pluginFields) {
    let result = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks)
      result.storedMarks = this.storedMarks.map((m) => m.toJSON());
    if (pluginFields && typeof pluginFields == "object")
      for (let prop in pluginFields) {
        if (prop == "doc" || prop == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let plugin = pluginFields[prop], state = plugin.spec.state;
        if (state && state.toJSON)
          result[prop] = state.toJSON.call(plugin, this[plugin.key]);
      }
    return result;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(config, json, pluginFields) {
    if (!json)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!config.schema)
      throw new RangeError("Required config field 'schema' missing");
    let $config = new Configuration(config.schema, config.plugins);
    let instance = new _EditorState($config);
    $config.fields.forEach((field) => {
      if (field.name == "doc") {
        instance.doc = Node.fromJSON(config.schema, json.doc);
      } else if (field.name == "selection") {
        instance.selection = Selection.fromJSON(instance.doc, json.selection);
      } else if (field.name == "storedMarks") {
        if (json.storedMarks)
          instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
      } else {
        if (pluginFields)
          for (let prop in pluginFields) {
            let plugin = pluginFields[prop], state = plugin.spec.state;
            if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
              instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
              return;
            }
          }
        instance[field.name] = field.init(config, instance);
      }
    });
    return instance;
  }
};
function bindProps(obj, self, target) {
  for (let prop in obj) {
    let val = obj[prop];
    if (val instanceof Function)
      val = val.bind(self);
    else if (prop == "handleDOMEvents")
      val = bindProps(val, self, {});
    target[prop] = val;
  }
  return target;
}
var Plugin = class {
  /**
  Create a plugin.
  */
  constructor(spec) {
    this.spec = spec;
    this.props = {};
    if (spec.props)
      bindProps(spec.props, this, this.props);
    this.key = spec.key ? spec.key.key : createKey("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(state) {
    return state[this.key];
  }
};
var keys = /* @__PURE__ */ Object.create(null);
function createKey(name) {
  if (name in keys)
    return name + "$" + ++keys[name];
  keys[name] = 0;
  return name + "$";
}
var PluginKey = class {
  /**
  Create a plugin key.
  */
  constructor(name = "key") {
    this.key = createKey(name);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(state) {
    return state.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(state) {
    return state[this.key];
  }
};

export {
  Fragment,
  Mark,
  Slice,
  NodeRange,
  Schema,
  DOMParser,
  DOMSerializer,
  Mapping,
  ReplaceStep,
  ReplaceAroundStep,
  liftTarget,
  findWrapping,
  canSplit,
  canJoin,
  joinPoint,
  dropPoint,
  replaceStep,
  Transform,
  Selection,
  SelectionRange,
  TextSelection,
  NodeSelection,
  AllSelection,
  EditorState,
  Plugin,
  PluginKey
};
//# sourceMappingURL=chunk-ZTG2EEKL.js.map
