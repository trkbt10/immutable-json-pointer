function C(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function m(t) {
  return typeof t == "object" && t !== null;
}
function P(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function S(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function w(t) {
  if (t.startsWith("#")) {
    const r = decodeURIComponent(t).replace(/^#/, "");
    return w(r);
  }
  return t.split("/").map(S);
}
function $(t, r) {
  return typeof l(t, r, () => {
  }) < "u";
}
function A(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map((o) => typeof o == "number" ? o : P(o));
  return r === "uri" ? `#/${n.map(encodeURIComponent).join("/")}` : "/" + n.join("/");
}
function l(t, r, n) {
  const [o, ...s] = w(r);
  if ((o === void 0 || o === "") && s.length === 0)
    return n && n(t, "", void 0, []), t;
  let i = t, u;
  for (const e of s) {
    if (e === "__proto__" || e === "constructor" || e === "prototype")
      throw new Error("Prototype pollution attempt");
    if (!(e in i)) {
      if (n) {
        i = void 0;
        break;
      }
      throw new Error(`Cannot find ${e} in ${JSON.stringify(i)}`);
    }
    u = i, i = i[e];
  }
  if (n) {
    const [e, f] = C(s);
    n(i, f, u, e);
  }
  return i;
}
function E(t, r) {
  return l(t, r);
}
function L(t, r) {
  let n = a(t);
  return l(n, r, (o, s, i, u) => {
    const e = a(i), f = A(u);
    if (Array.isArray(e)) {
      const p = +s;
      e.splice(p, 1), n = h(n, f, e);
    } else
      delete e[s], n = h(n, f, e);
  }), n;
}
function O(t) {
  const r = {}, n = (o, s) => {
    for (const i in o) {
      const u = o[i];
      if (m(u)) {
        const e = [...s, i];
        n(u, e);
        continue;
      }
      r[A([...s, i])] = u;
    }
  };
  return n(t, []), r;
}
function h(t, r, n) {
  let o = a(t);
  return l(t, r, (i, u, e, f) => {
    var v;
    if (i === n)
      return;
    const p = f.length;
    let d = 0, c = o;
    do {
      const y = f[d], g = d >= p;
      if (g && Array.isArray(c)) {
        u === "-" ? c.push(n) : c[+u] = n;
        return;
      }
      if (g && u === "") {
        o = n;
        return;
      }
      if (g) {
        c[u] = n;
        return;
      }
      const _ = (v = c[y]) != null ? v : {};
      c[y] = a(_), c = c[y];
    } while (++d <= p);
  }), o;
}
function I(t, r) {
  if ($(t, r))
    return E(t, r);
}
function R(t, r, n) {
  const o = I(t, r), s = n(o);
  return h(t, r, s);
}
function a(t) {
  return Array.isArray(t) ? [...t] : m(t) ? { ...t } : t;
}
export {
  A as compile,
  O as dict,
  P as escape,
  E as get,
  $ as has,
  w as parse,
  I as read,
  L as remove,
  l as resolve,
  h as set,
  R as transform,
  S as unescape
};
