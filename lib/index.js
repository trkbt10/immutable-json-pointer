function _(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function $(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function C(t, r) {
  return v(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function v(t) {
  return typeof t == "object" && t !== null;
}
function a(t) {
  return Array.isArray(t) ? [...t] : v(t) ? { ...t } : t;
}
function m(t) {
  return typeof t == "number" ? m(t.toString()) : t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function O(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function w(t) {
  if (t.startsWith("#")) {
    const n = decodeURIComponent(t).replace(/^#/, "");
    return w(n);
  }
  return t.split("/").map(O);
}
function x(t, r) {
  return typeof d(t, r, () => {
  }) < "u";
}
function P(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map(m).join("/"), o = n.startsWith("/") ? "" : "/";
  return r === "uri" ? `#${o}${encodeURIComponent(n)}` : o + n;
}
function d(t, r, n) {
  const [o, ...u] = w(r);
  if ((o === void 0 || o === "") && u.length === 0)
    return n && n(t, "", void 0, []), t;
  let e = t, c;
  for (const s of u) {
    if ($(s))
      throw new Error("Prototype pollution attempt");
    if (!C(e, s)) {
      if (n) {
        e = void 0;
        break;
      }
      throw new Error(`Cannot find ${s} in ${JSON.stringify(e)}`);
    }
    c = e, e = e[s];
  }
  if (n) {
    const [s, f] = _(u);
    n(e, f, c, s);
  }
  return e;
}
function E(t, r) {
  return d(t, r);
}
function K(t, r) {
  let n = a(t);
  return d(n, r, (o, u, e, c) => {
    const s = a(e), f = P(c);
    if (Array.isArray(s)) {
      const p = +u;
      s.splice(p, 1), n = l(n, f, s);
    } else
      delete s[u], n = l(n, f, s);
  }), n;
}
function L(t) {
  const r = {}, n = (o, u) => {
    for (const e in o) {
      const c = o[e];
      if (v(c)) {
        const s = [...u, e];
        n(c, s);
        continue;
      }
      r[P([...u, e])] = c;
    }
  };
  return n(t, []), r;
}
function U(t, r) {
  return (Array.isArray(t) ? t : Object.entries(t)).reduce((o, [u, e]) => l(o, u, e), r != null ? r : {});
}
function l(t, r, n) {
  let o = a(t);
  return d(t, r, (e, c, s, f) => {
    var A;
    if (e === n)
      return;
    const p = f.length;
    let y = 0, i = o;
    do {
      const h = f[y], g = y >= p;
      if (g && Array.isArray(i)) {
        c === "-" ? i.push(n) : i[+c] = n;
        return;
      }
      if (g && c === "") {
        o = n;
        return;
      }
      if (g) {
        i[c] = n;
        return;
      }
      const S = (A = i[h]) != null ? A : {};
      i[h] = a(S), i = i[h];
    } while (++y <= p);
  }), o;
}
function I(t, r) {
  if (x(t, r))
    return E(t, r);
}
function W(t, r, n) {
  const o = I(t, r), u = n(o);
  return l(t, r, u);
}
export {
  P as compile,
  U as compose,
  L as dict,
  m as escape,
  E as get,
  x as has,
  w as parse,
  I as read,
  K as remove,
  d as resolve,
  l as set,
  W as transform,
  O as unescape
};
