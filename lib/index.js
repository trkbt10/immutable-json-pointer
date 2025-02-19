function N(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function S(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function _(t, r) {
  return g(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function g(t) {
  return typeof t == "object" && t !== null;
}
function l(t) {
  return Array.isArray(t) ? [...t] : g(t) ? { ...t } : t;
}
function m(t) {
  return typeof t == "number" ? m(t.toString()) : t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function $(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function A(t) {
  if (t.startsWith("#")) {
    const n = decodeURIComponent(t).replace(/^#/, "");
    return A(n);
  }
  return t.split("/").map($);
}
function x(t, r) {
  return typeof h(t, r, () => {
  }) < "u";
}
function P(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map(m).join("/"), e = n.startsWith("/") ? "" : "/";
  return r === "uri" ? `#${e}${encodeURIComponent(n)}` : e + n;
}
function h(t, r, n) {
  const [e, ...c] = A(r);
  if ((e === void 0 || e === "") && c.length === 0)
    return n && n(t, "", void 0, []), t;
  let o = t, i;
  for (const u of c) {
    if (S(u))
      throw new Error("Prototype pollution attempt");
    if (!_(o, u)) {
      if (n) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${u} in ${JSON.stringify(o)}`);
    }
    i = o, o = o[u];
  }
  if (n) {
    const [u, f] = N(c);
    n(o, f, i, u);
  }
  return o;
}
function C(t, r) {
  return h(t, r);
}
function b(t, r) {
  let n = l(t);
  return h(n, r, (e, c, o, i) => {
    if (typeof e > "u")
      return;
    const u = l(o), f = P(i);
    if (Array.isArray(u)) {
      const a = +c;
      u.splice(a, 1), n = d(n, f, u);
    } else
      delete u[c], n = d(n, f, u);
  }), n;
}
function E(t) {
  const r = {}, n = (e, c) => {
    for (const o in e) {
      const i = e[o];
      if (g(i)) {
        const u = [...c, o];
        n(i, u);
        continue;
      }
      r[P([...c, o])] = i;
    }
  };
  return n(t, []), r;
}
function K(t, r) {
  return (Array.isArray(t) ? t : Object.entries(t)).reduce((e, [c, o]) => d(e, c, o), r ?? {});
}
function d(t, r, n) {
  let e = l(t);
  return h(t, r, (o, i, u, f) => {
    if (o === n)
      return;
    const a = f.length;
    let p = 0, s = e;
    do {
      if (p === a)
        break;
      const y = f[p], v = a === p + 1 ? i : f[p + 1], w = Number.isInteger(+v), I = s[y] ?? (w ? [] : {});
      s[y] = l(I), s = s[y];
    } while (++p < a);
    if (Array.isArray(s)) {
      i === "-" ? s.push(n) : s[+i] = n;
      return;
    }
    if (i === "") {
      e = n;
      return;
    }
    if (Number.isInteger(+i)) {
      s[+i] = n;
      return;
    }
    s[i] = n;
  }), e;
}
function O(t, r) {
  if (x(t, r))
    return C(t, r);
}
function U(t, r, n) {
  const e = O(t, r), c = n(e);
  return d(t, r, c);
}
function W(...t) {
  return (r) => t.reduce((n, e) => e(n), r);
}
export {
  W as chain,
  P as compile,
  K as compose,
  E as dict,
  m as escape,
  C as get,
  x as has,
  A as parse,
  O as read,
  b as remove,
  h as resolve,
  d as set,
  U as transform,
  $ as unescape
};
