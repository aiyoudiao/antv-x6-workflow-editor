import{r as S,t as W,a as y}from"./toNumber-Ch91Usde.js";var x=function(){return S.Date.now()},_="Expected a function",F=Math.max,N=Math.min;function O(d,t,n){var r,a,g,l,i,f,c=0,E=!1,o=!1,v=!0;if(typeof d!="function")throw new TypeError(_);t=W(t)||0,y(n)&&(E=!!n.leading,o="maxWait"in n,g=o?F(W(n.maxWait)||0,t):g,v="trailing"in n?!!n.trailing:v);function T(e){var u=r,m=a;return r=a=void 0,c=e,l=d.apply(m,u),l}function C(e){return c=e,i=setTimeout(s,t),E?T(e):l}function b(e){var u=e-f,m=e-c,R=t-u;return o?N(R,g-m):R}function k(e){var u=e-f,m=e-c;return f===void 0||u>=t||u<0||o&&m>=g}function s(){var e=x();if(k(e))return I(e);i=setTimeout(s,b(e))}function I(e){return i=void 0,v&&r?T(e):(r=a=void 0,l)}function L(){i!==void 0&&clearTimeout(i),c=0,r=f=a=i=void 0}function M(){return i===void 0?l:I(x())}function h(){var e=x(),u=k(e);if(r=arguments,a=this,f=e,u){if(i===void 0)return C(f);if(o)return clearTimeout(i),i=setTimeout(s,t),T(f)}return i===void 0&&(i=setTimeout(s,t)),l}return h.cancel=L,h.flush=M,h}var p="Expected a function";function U(d,t,n){var r=!0,a=!0;if(typeof d!="function")throw new TypeError(p);return y(n)&&(r="leading"in n?!!n.leading:r,a="trailing"in n?!!n.trailing:a),O(d,t,{leading:r,maxWait:t,trailing:a})}export{O as d,U as t};
