"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function _(e){const r=e.slice(0,-1),t=e.at(-1);return[r,t]}function $(e){return e==="__proto__"||e==="constructor"||e==="prototype"}function C(e,r){return g(e)?Object.prototype.hasOwnProperty.call(e,r):!1}function g(e){return typeof e=="object"&&e!==null}function h(e){return Array.isArray(e)?[...e]:g(e)?{...e}:e}function m(e){return typeof e=="number"?m(e.toString()):e.replace(/~/g,"~0").replace(/\//g,"~1")}function A(e){return e.replace(/\~1/g,"/").replace(/\~0/g,"~")}function v(e){if(e.startsWith("#")){const t=decodeURIComponent(e).replace(/^#/,"");return v(t)}return e.split("/").map(A)}function w(e,r){return typeof d(e,r,()=>{})<"u"}function P(e,r){if(e.length===0)return"";const t=e.map(m).join("/"),n=t.startsWith("/")?"":"/";return r==="uri"?`#${n}${encodeURIComponent(t)}`:n+t}function d(e,r,t){const[n,...s]=v(r);if((n===void 0||n==="")&&s.length===0)return t&&t(e,"",void 0,[]),e;let o=e,i;for(const c of s){if($(c))throw new Error("Prototype pollution attempt");if(!C(o,c)){if(t){o=void 0;break}throw new Error(`Cannot find ${c} in ${JSON.stringify(o)}`)}i=o,o=o[c]}if(t){const[c,f]=_(s);t(o,f,i,c)}return o}function S(e,r){return d(e,r)}function j(e,r){let t=h(e);return d(t,r,(n,s,o,i)=>{if(typeof n>"u")return;const c=h(o),f=P(i);if(Array.isArray(c)){const a=+s;c.splice(a,1),t=l(t,f,c)}else delete c[s],t=l(t,f,c)}),t}function x(e){const r={},t=(n,s)=>{for(const o in n){const i=n[o];if(g(i)){const c=[...s,o];t(i,c);continue}r[P([...s,o])]=i}};return t(e,[]),r}function E(e,r){return(Array.isArray(e)?e:Object.entries(e)).reduce((n,[s,o])=>l(n,s,o),r??{})}function l(e,r,t){let n=h(e);return d(e,r,(o,i,c,f)=>{if(o===t)return;const a=f.length;let p=0,u=n;do{if(p===a)break;const y=f[p],I=a===p+1?i:f[p+1],N=Number.isInteger(+I),O=u[y]??(N?[]:{});u[y]=h(O),u=u[y]}while(++p<a);if(Array.isArray(u)){i==="-"?u.push(t):u[+i]=t;return}if(i===""){n=t;return}if(Number.isInteger(+i)){u[+i]=t;return}u[i]=t}),n}function b(e,r){if(w(e,r))return S(e,r)}function K(e,r,t){const n=b(e,r),s=t(n);return l(e,r,s)}function U(...e){return r=>e.reduce((t,n)=>n(t),r)}exports.chain=U;exports.compile=P;exports.compose=E;exports.dict=x;exports.escape=m;exports.get=S;exports.has=w;exports.parse=v;exports.read=b;exports.remove=j;exports.resolve=d;exports.set=l;exports.transform=K;exports.unescape=A;
