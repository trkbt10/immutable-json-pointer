function O(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function _(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function C(t, r) {
  return v(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function v(t) {
  return typeof t == "object" && t !== null;
}
function p(t) {
  return Array.isArray(t) ? [...t] : v(t) ? { ...t } : t;
}
function S(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function $(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function w(t) {
  if (t.startsWith("#")) {
    const r = decodeURIComponent(t).replace(/^#/, "");
    return w(r);
  }
  return t.split("/").map($);
}
function E(t, r) {
  return typeof a(t, r, () => {
  }) < "u";
}
function A(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map((e) => typeof e == "number" ? e : S(e));
  return r === "uri" ? `#/${n.map(encodeURIComponent).join("/")}` : "/" + n.join("/");
}
function a(t, r, n) {
  const [e, ...s] = w(r);
  if ((e === void 0 || e === "") && s.length === 0)
    return n && n(t, "", void 0, []), t;
  let o = t, u;
  for (const i of s) {
    if (_(i))
      throw new Error("Prototype pollution attempt");
    if (!C(o, i)) {
      if (n) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${i} in ${JSON.stringify(o)}`);
    }
    u = o, o = o[i];
  }
  if (n) {
    const [i, f] = O(s);
    n(o, f, u, i);
  }
  return o;
}
function I(t, r) {
  return a(t, r);
}
function L(t, r) {
  let n = p(t);
  return a(n, r, (e, s, o, u) => {
    const i = p(o), f = A(u);
    if (Array.isArray(i)) {
      const l = +s;
      i.splice(l, 1), n = g(n, f, i);
    } else
      delete i[s], n = g(n, f, i);
  }), n;
}
function R(t) {
  const r = {}, n = (e, s) => {
    for (const o in e) {
      const u = e[o];
      if (v(u)) {
        const i = [...s, o];
        n(u, i);
        continue;
      }
      r[A([...s, o])] = u;
    }
  };
  return n(t, []), r;
}
function g(t, r, n) {
  let e = p(t);
  return a(t, r, (o, u, i, f) => {
    var m;
    if (o === n)
      return;
    const l = f.length;
    let d = 0, c = e;
    do {
      const y = f[d], h = d >= l;
      if (h && Array.isArray(c)) {
        u === "-" ? c.push(n) : c[+u] = n;
        return;
      }
      if (h && u === "") {
        e = n;
        return;
      }
      if (h) {
        c[u] = n;
        return;
      }
      const P = (m = c[y]) != null ? m : {};
      c[y] = p(P), c = c[y];
    } while (++d <= l);
  }), e;
}
function K(t, r) {
  if (E(t, r))
    return I(t, r);
}
function U(t, r, n) {
  const e = K(t, r), s = n(e);
  return g(t, r, s);
}
export {
  A as compile,
  R as dict,
  S as escape,
  I as get,
  E as has,
  w as parse,
  K as read,
  L as remove,
  a as resolve,
  g as set,
  U as transform,
  $ as unescape
};
