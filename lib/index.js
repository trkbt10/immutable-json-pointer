function A(t) {
  const n = t.slice(0, -1), r = t.at(-1);
  return [n, r];
}
function m(t) {
  return typeof t == "object" && t !== null;
}
function _(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function C(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function v(t) {
  if (t.startsWith("#")) {
    const n = decodeURIComponent(t).replace(/^#/, "");
    return v(n);
  }
  return t.split("/").map(C);
}
function P(t, n) {
  return typeof a(t, n, () => {
  }) < "u";
}
function S(t, n) {
  const r = t.map((o) => typeof o == "number" ? o : _(o));
  return n === "uri" ? `#/${r.map(encodeURIComponent).join("/")}` : "/" + r.join("/");
}
function a(t, n, r) {
  const [o, ...u] = v(n);
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
    const [c, f] = A(u);
    r(e, f, i, c);
  }
  return e;
}
function $(t, n) {
  return a(t, n);
}
function I(t, n) {
  const r = { ...t };
  return a(t, n, (o, u, e) => {
    Array.isArray(e) ? e.splice(Number(u), 1) : delete e[u];
  }), r;
}
function L(t) {
  const n = {}, r = (o, u) => {
    for (const e in o) {
      const i = o[e];
      if (m(i)) {
        const c = [...u, e];
        r(i, c);
        continue;
      }
      n[S([...u, e])] = i;
    }
  };
  return r(t, []), n;
}
function x(t, n, r) {
  const o = g(t);
  return a(t, n, (e, i, c, f) => {
    var y;
    if (e === r)
      return;
    const d = f.length;
    let p = 0, s = o;
    do {
      const l = f[p], h = p >= d;
      if (h && Array.isArray(s)) {
        i === "-" ? s.push(r) : s[+i] = r;
        return;
      }
      if (h) {
        s[i] = r;
        return;
      }
      const w = (y = s[l]) != null ? y : {};
      s[l] = g(w), s = s[l];
    } while (++p <= d);
  }), o;
}
function E(t, n) {
  if (P(t, n))
    return $(t, n);
}
function N(t, n, r) {
  const o = E(t, n), u = r(o);
  return x(t, n, u);
}
function g(t) {
  return Array.isArray(t) ? [...t] : m(t) ? { ...t } : t;
}
export {
  S as compile,
  L as dict,
  _ as escape,
  $ as get,
  P as has,
  v as parse,
  E as read,
  I as remove,
  a as resolve,
  x as set,
  N as transform,
  C as unescape
};
