function h(r, e, t) {
  var a;
  if (e.startsWith("#")) {
    const n = decodeURIComponent(e).replace(/^#/, "");
    return h(r, n, t);
  }
  const [u, ...p] = e.split("/").map(w);
  if (u === "" && p.length === 0)
    return r;
  let o = r, s;
  for (const n of p) {
    if (n === "__proto__" || n === "constructor" || n === "prototype")
      throw new Error("Prototype pollution attempt");
    if (!(n in o)) {
      if (t) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${n} in ${JSON.stringify(o)}`);
    }
    s = o, o = o[n];
  }
  if (t) {
    const n = p.slice(0, -1), c = (a = p.at(-1)) != null ? a : "";
    t(o, c, s, n);
  }
  return o;
}
function A(r) {
  const e = r.map((t) => typeof t == "number" ? t : t.replace(/~/g, "~0").replace(/\//g, "~1")).join("/");
  return "/" + e;
}
function y(r, e) {
  return h(r, e);
}
function d(r, e, t) {
  const u = { ...r };
  return h(r, e, (o, s, a, n) => {
    if (o === t)
      return;
    const c = n.length;
    let l = 0, i = u;
    do {
      const f = n[l], m = l >= c;
      if (m && Array.isArray(i)) {
        s === "-" ? i.push(t) : i[+s] = t;
        return;
      }
      if (m) {
        i[s] = t;
        return;
      }
      const g = i[f];
      Array.isArray(g) ? i[f] = [...g] : i[f] = { ...g }, i = i[f];
    } while (++l <= c);
  }), u;
}
function _(r) {
  return {
    get: (e) => y(e, r),
    set: (e, t) => d(e, r, t)
  };
}
function w(r) {
  return r.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
export {
  _ as compile,
  y as get,
  h as resolver,
  d as set,
  A as toPointer
};
