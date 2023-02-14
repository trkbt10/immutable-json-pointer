function S(t) {
  const r = t.slice(0, -1), n = t.at(-1);
  return [r, n];
}
function _(t) {
  return t === "__proto__" || t === "constructor" || t === "prototype";
}
function $(t, r) {
  return v(t) ? Object.prototype.hasOwnProperty.call(t, r) : !1;
}
function v(t) {
  return typeof t == "object" && t !== null;
}
function p(t) {
  return Array.isArray(t) ? [...t] : v(t) ? { ...t } : t;
}
function m(t) {
  return typeof t == "number" ? m(t.toString()) : t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function C(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function A(t) {
  if (t.startsWith("#")) {
    const n = decodeURIComponent(t).replace(/^#/, "");
    return A(n);
  }
  return t.split("/").map(C);
}
function x(t, r) {
  return typeof a(t, r, () => {
  }) < "u";
}
function P(t, r) {
  if (t.length === 0)
    return "";
  const n = t.map(m).join("/"), o = n.startsWith("/") ? "" : "/";
  return r === "uri" ? `#${o}${encodeURIComponent(n)}` : o + n;
}
function a(t, r, n) {
  const [o, ...u] = A(r);
  if ((o === void 0 || o === "") && u.length === 0)
    return n && n(t, "", void 0, []), t;
  let e = t, s;
  for (const i of u) {
    if (_(i))
      throw new Error("Prototype pollution attempt");
    if (!$(e, i)) {
      if (n) {
        e = void 0;
        break;
      }
      throw new Error(`Cannot find ${i} in ${JSON.stringify(e)}`);
    }
    s = e, e = e[i];
  }
  if (n) {
    const [i, f] = S(u);
    n(e, f, s, i);
  }
  return e;
}
function E(t, r) {
  return a(t, r);
}
function K(t, r) {
  let n = p(t);
  return a(n, r, (o, u, e, s) => {
    const i = p(e), f = P(s);
    if (Array.isArray(i)) {
      const l = +u;
      i.splice(l, 1), n = g(n, f, i);
    } else
      delete i[u], n = g(n, f, i);
  }), n;
}
function L(t) {
  const r = {}, n = (o, u) => {
    for (const e in o) {
      const s = o[e];
      if (v(s)) {
        const i = [...u, e];
        n(s, i);
        continue;
      }
      r[P([...u, e])] = s;
    }
  };
  return n(t, []), r;
}
function g(t, r, n) {
  let o = p(t);
  return a(t, r, (e, s, i, f) => {
    var w;
    if (e === n)
      return;
    const l = f.length;
    let d = 0, c = o;
    do {
      const h = f[d], y = d >= l;
      if (y && Array.isArray(c)) {
        s === "-" ? c.push(n) : c[+s] = n;
        return;
      }
      if (y && s === "") {
        o = n;
        return;
      }
      if (y) {
        c[s] = n;
        return;
      }
      const O = (w = c[h]) != null ? w : {};
      c[h] = p(O), c = c[h];
    } while (++d <= l);
  }), o;
}
function I(t, r) {
  if (x(t, r))
    return E(t, r);
}
function R(t, r, n) {
  const o = I(t, r), u = n(o);
  return g(t, r, u);
}
export {
  P as compile,
  L as dict,
  m as escape,
  E as get,
  x as has,
  A as parse,
  I as read,
  K as remove,
  a as resolve,
  g as set,
  R as transform,
  C as unescape
};
