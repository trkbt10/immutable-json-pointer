function S(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function _(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function $(t, r) {
  return A(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function A(t) {
  return typeof t == "object" && t !== null;
}
function a(t) {
  return Array.isArray(t) ? [...t] : A(t) ? { ...t } : t;
}
function m(t) {
  return typeof t == "number" ? m(t.toString()) : t.replace(/~/g, "~0").replace(/\//g, "~1");
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
function O(t, r) {
  return typeof d(t, r, () => {
  }) < "u";
}
function w(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map(m).join("/"), e = n.startsWith("/") ? "" : "/";
  return r === "uri" ? `#${e}${encodeURIComponent(n)}` : e + n;
}
function d(t, r, n) {
  const [e, ...u] = v(r);
  if ((e === void 0 || e === "") && u.length === 0)
    return n && n(t, "", void 0, []), t;
  let o = t, c;
  for (const i of u) {
    if (_(i))
      throw new Error("Prototype pollution attempt");
    if (!$(o, i)) {
      if (n) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${i} in ${JSON.stringify(o)}`);
    }
    c = o, o = o[i];
  }
  if (n) {
    const [i, f] = S(u);
    n(o, f, c, i);
  }
  return o;
}
function x(t, r) {
  return d(t, r);
}
function I(t, r) {
  let n = a(t);
  return d(n, r, (e, u, o, c) => {
    if (typeof e > "u")
      return;
    const i = a(o), f = w(c);
    if (Array.isArray(i)) {
      const p = +u;
      i.splice(p, 1), n = l(n, f, i);
    } else
      delete i[u], n = l(n, f, i);
  }), n;
}
function K(t) {
  const r = {}, n = (e, u) => {
    for (const o in e) {
      const c = e[o];
      if (A(c)) {
        const i = [...u, o];
        n(c, i);
        continue;
      }
      r[w([...u, o])] = c;
    }
  };
  return n(t, []), r;
}
function L(t, r) {
  return (Array.isArray(t) ? t : Object.entries(t)).reduce((e, [u, o]) => l(e, u, o), r ?? {});
}
function l(t, r, n) {
  let e = a(t);
  return d(t, r, (o, c, i, f) => {
    if (o === n)
      return;
    const p = f.length;
    let y = 0, s = e;
    do {
      const h = f[y], g = y >= p;
      if (g && Array.isArray(s)) {
        c === "-" ? s.push(n) : s[+c] = n;
        return;
      }
      if (g && c === "") {
        e = n;
        return;
      }
      if (g) {
        s[c] = n;
        return;
      }
      const P = s[h] ?? {};
      s[h] = a(P), s = s[h];
    } while (++y <= p);
  }), e;
}
function E(t, r) {
  if (O(t, r))
    return x(t, r);
}
function U(t, r, n) {
  const e = E(t, r), u = n(e);
  return l(t, r, u);
}
function W(...t) {
  return (r) => t.reduce((n, e) => e(n), r);
}
export {
  W as chain,
  w as compile,
  L as compose,
  K as dict,
  m as escape,
  x as get,
  O as has,
  v as parse,
  E as read,
  I as remove,
  d as resolve,
  l as set,
  U as transform,
  C as unescape
};
