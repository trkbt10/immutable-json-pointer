"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});function j(e){const r=e.slice(0,-1),t=e.at(-1);return[r,t]}function E(e){return e==="__proto__"||e==="constructor"||e==="prototype"}function I(e,r){return m(e)?Object.prototype.hasOwnProperty.call(e,r):!1}function m(e){return typeof e=="object"&&e!==null}function d(e){return Array.isArray(e)?[...e]:m(e)?{...e}:e}function v(e){return typeof e=="number"?v(e.toString()):e.replace(/~/g,"~0").replace(/\//g,"~1")}function S(e){return e.replace(/\~1/g,"/").replace(/\~0/g,"~")}function A(e){if(e.startsWith("#")){const t=decodeURIComponent(e).replace(/^#/,"");return A(t)}return e.split("/").map(S)}function _(e,r){return typeof p(e,r,()=>{})<"u"}function w(e,r){if(e.length===0)return"";const t=e.map(v).join("/"),o=t.startsWith("/")?"":"/";return r==="uri"?`#${o}${encodeURIComponent(t)}`:o+t}function p(e,r,t){const[o,...u]=A(r);if((o===void 0||o==="")&&u.length===0)return t&&t(e,"",void 0,[]),e;let n=e,c;for(const s of u){if(E(s))throw new Error("Prototype pollution attempt");if(!I(n,s)){if(t){n=void 0;break}throw new Error(`Cannot find ${s} in ${JSON.stringify(n)}`)}c=n,n=n[s]}if(t){const[s,f]=j(u);t(n,f,c,s)}return n}function O(e,r){return p(e,r)}function K(e,r){let t=d(e);return p(t,r,(o,u,n,c)=>{const s=d(n),f=w(c);if(Array.isArray(s)){const l=+u;s.splice(l,1),t=a(t,f,s)}else delete s[u],t=a(t,f,s)}),t}function L(e){const r={},t=(o,u)=>{for(const n in o){const c=o[n];if(m(c)){const s=[...u,n];t(c,s);continue}r[w([...u,n])]=c}};return t(e,[]),r}function M(e,r){return(Array.isArray(e)?e:Object.entries(e)).reduce((o,[u,n])=>a(o,u,n),r!=null?r:{})}function a(e,r,t){let o=d(e);return p(e,r,(n,c,s,f)=>{var P;if(n===t)return;const l=f.length;let y=0,i=o;do{const h=f[y],g=y>=l;if(g&&Array.isArray(i)){c==="-"?i.push(t):i[+c]=t;return}if(g&&c===""){o=t;return}if(g){i[c]=t;return}const C=(P=i[h])!=null?P:{};i[h]=d(C),i=i[h]}while(++y<=l)}),o}function $(e,r){if(_(e,r))return O(e,r)}function U(e,r,t){const o=$(e,r),u=t(o);return a(e,r,u)}exports.compile=w;exports.compose=M;exports.dict=L;exports.escape=v;exports.get=O;exports.has=_;exports.parse=A;exports.read=$;exports.remove=K;exports.resolve=p;exports.set=a;exports.transform=U;exports.unescape=S;
