function _(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function $(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function C(t, r) {
  return A(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function A(t) {
  return typeof t == "object" && t !== null;
}
function a(t) {
  return Array.isArray(t) ? [...t] : A(t) ? { ...t } : t;
}
function v(t) {
  return typeof t == "number" ? v(t.toString()) : t.replace(/~/g, "~0").replace(/\//g, "~1");
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
  const n = t.map(v).join("/"), e = n.startsWith("/") ? "" : "/";
  return r === "uri" ? `#${e}${encodeURIComponent(n)}` : e + n;
}
function d(t, r, n) {
  const [e, ...u] = w(r);
  if ((e === void 0 || e === "") && u.length === 0)
    return n && n(t, "", void 0, []), t;
  let o = t, c;
  for (const s of u) {
    if ($(s))
      throw new Error("Prototype pollution attempt");
    if (!C(o, s)) {
      if (n) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${s} in ${JSON.stringify(o)}`);
    }
    c = o, o = o[s];
  }
  if (n) {
    const [s, f] = _(u);
    n(o, f, c, s);
  }
  return o;
}
function E(t, r) {
  return d(t, r);
}
function K(t, r) {
  let n = a(t);
  return d(n, r, (e, u, o, c) => {
    if (typeof e > "u")
      return;
    const s = a(o), f = P(c);
    if (Array.isArray(s)) {
      const p = +u;
      s.splice(p, 1), n = l(n, f, s);
    } else
      delete s[u], n = l(n, f, s);
  }), n;
}
function L(t) {
  const r = {}, n = (e, u) => {
    for (const o in e) {
      const c = e[o];
      if (A(c)) {
        const s = [...u, o];
        n(c, s);
        continue;
      }
      r[P([...u, o])] = c;
    }
  };
  return n(t, []), r;
}
function U(t, r) {
  return (Array.isArray(t) ? t : Object.entries(t)).reduce((e, [u, o]) => l(e, u, o), r != null ? r : {});
}
function l(t, r, n) {
  let e = a(t);
  return d(t, r, (o, c, s, f) => {
    var m;
    if (o === n)
      return;
    const p = f.length;
    let y = 0, i = e;
    do {
      const h = f[y], g = y >= p;
      if (g && Array.isArray(i)) {
        c === "-" ? i.push(n) : i[+c] = n;
        return;
      }
      if (g && c === "") {
        e = n;
        return;
      }
      if (g) {
        i[c] = n;
        return;
      }
      const S = (m = i[h]) != null ? m : {};
      i[h] = a(S), i = i[h];
    } while (++y <= p);
  }), e;
}
function I(t, r) {
  if (x(t, r))
    return E(t, r);
}
function W(t, r, n) {
  const e = I(t, r), u = n(e);
  return l(t, r, u);
}
export {
  P as compile,
  U as compose,
  L as dict,
  v as escape,
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
