function w(t) {
  const n = t.slice(0, -1), r = t.at(-1);
  return [n, r];
}
function g(t) {
  return typeof t == "object" && t !== null;
}
function A(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function _(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function m(t) {
  if (t.startsWith("#")) {
    const n = decodeURIComponent(t).replace(/^#/, "");
    return m(n);
  }
  return t.split("/").map(_);
}
function C(t, n) {
  return typeof a(t, n, () => {
  }) < "u";
}
function P(t, n) {
  const r = t.map((o) => typeof o == "number" ? o : A(o));
  return n === "uri" ? `#/${r.map(encodeURIComponent).join("/")}` : "/" + r.join("/");
}
function a(t, n, r) {
  const [o, ...u] = m(n);
  if (o === "" && u.length === 0)
    return t;
  let e = t, i;
  for (const c of u) {
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      throw new Error("Prototype pollution attempt");
    if (!(c in e)) {
      if (r) {
        e = void 0;
        break;
      }
      throw new Error(`Cannot find ${c} in ${JSON.stringify(e)}`);
    }
    i = e, e = e[c];
  }
  if (r) {
    const [c, f] = w(u);
    r(e, f, i, c);
  }
  return e;
}
function S(t, n) {
  return a(t, n);
}
function E(t, n) {
  const r = { ...t };
  return a(t, n, (o, u, e) => {
    Array.isArray(e) ? e.splice(Number(u), 1) : delete e[u];
  }), r;
}
function I(t) {
  const n = {}, r = (o, u) => {
    for (const e in o) {
      const i = o[e];
      if (g(i)) {
        const c = [...u, e];
        r(i, c);
        continue;
      }
      n[P([...u, e])] = i;
    }
  };
  return r(t, []), n;
}
function $(t, n, r) {
  const o = h(t);
  return a(t, n, (e, i, c, f) => {
    if (e === r)
      return;
    const d = f.length;
    let p = 0, s = o;
    do {
      const l = f[p], y = p >= d;
      if (y && Array.isArray(s)) {
        i === "-" ? s.push(r) : s[+i] = r;
        return;
      }
      if (y) {
        s[i] = r;
        return;
      }
      const v = s[l];
      s[l] = h(v), s = s[l];
    } while (++p <= d);
  }), o;
}
function x(t, n) {
  if (C(t, n))
    return S(t, n);
}
function L(t, n, r) {
  const o = x(t, n), u = r(o);
  return $(t, n, u);
}
function h(t) {
  return Array.isArray(t) ? [...t] : g(t) ? { ...t } : t;
}
export {
  P as compile,
  I as dict,
  A as escape,
  S as get,
  C as has,
  m as parse,
  x as read,
  E as remove,
  a as resolve,
  $ as set,
  L as transform,
  _ as unescape
};
