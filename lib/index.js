function m(t) {
  const r = t.slice(0, -1), e = t.at(-1);
  return [r, e];
}
function v(t) {
  return typeof t == "object" && t !== null;
}
function w(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
function A(t) {
  return t.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function g(t) {
  if (t.startsWith("#")) {
    const r = decodeURIComponent(t).replace(/^#/, "");
    return g(r);
  }
  return t.split("/").map(A);
}
function P(t, r) {
  return typeof p(t, r, () => {
  }) < "u";
}
function _(t) {
  const r = t.map((e) => typeof e == "number" ? e : w(e)).join("/");
  return "/" + r;
}
function p(t, r, e) {
  const [u, ...i] = g(r);
  if (u === "" && i.length === 0)
    return t;
  let n = t, s;
  for (const o of i) {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      throw new Error("Prototype pollution attempt");
    if (!(o in n)) {
      if (e) {
        n = void 0;
        break;
      }
      throw new Error(`Cannot find ${o} in ${JSON.stringify(n)}`);
    }
    s = n, n = n[o];
  }
  if (e) {
    const [o, f] = m(i);
    e(n, f, s, o);
  }
  return n;
}
function S(t, r) {
  return p(t, r);
}
function C(t, r) {
  const e = { ...t };
  return p(t, r, (u, i, n) => {
    Array.isArray(n) ? n.splice(Number(i), 1) : delete n[i];
  }), e;
}
function E(t) {
  const r = {}, e = (u, i) => {
    for (const n in u) {
      const s = u[n];
      if (v(s)) {
        const o = [...i, n];
        e(s, o);
        continue;
      }
      r[_([...i, n])] = s;
    }
  };
  return e(t, []), r;
}
function L(t, r, e) {
  const u = { ...t };
  return p(t, r, (n, s, o, f) => {
    if (n === e)
      return;
    const d = f.length;
    let l = 0, c = u;
    do {
      const a = f[l], h = l >= d;
      if (h && Array.isArray(c)) {
        s === "-" ? c.push(e) : c[+s] = e;
        return;
      }
      if (h) {
        c[s] = e;
        return;
      }
      const y = c[a];
      Array.isArray(y) ? c[a] = [...y] : c[a] = { ...y }, c = c[a];
    } while (++l <= d);
  }), u;
}
export {
  _ as compile,
  E as dict,
  w as escape,
  S as get,
  P as has,
  g as parse,
  C as remove,
  p as resolve,
  L as set,
  A as unescape
};
