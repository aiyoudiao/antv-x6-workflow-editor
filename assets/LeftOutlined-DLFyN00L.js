import{r as e,bg as E,bf as j,C as w,bX as y,aS as z}from"./index-DfAWM7Uj.js";function I(s){return t=>e.createElement(E,{theme:{token:{motion:!1,zIndexPopupBase:0}}},e.createElement(s,Object.assign({},t)))}const H=(s,t,r,l)=>I(a=>{const{prefixCls:v,style:m}=a,i=e.useRef(null),[b,h]=e.useState(0),[P,O]=e.useState(0),[u,x]=j(!1,{value:a.open}),{getPrefixCls:C}=e.useContext(w),f=C(t||"select",v);e.useEffect(()=>{if(x(!0),typeof ResizeObserver<"u"){const d=new ResizeObserver(n=>{const o=n[0].target;h(o.offsetHeight+8),O(o.offsetWidth)}),p=setInterval(()=>{var n;const o=r?`.${r(f)}`:`.${f}-dropdown`,g=(n=i.current)===null||n===void 0?void 0:n.querySelector(o);g&&(clearInterval(p),d.observe(g))},10);return()=>{clearInterval(p),d.disconnect()}}},[]);let c=Object.assign(Object.assign({},a),{style:Object.assign(Object.assign({},m),{margin:0}),open:u,visible:u,getPopupContainer:()=>i.current});l&&(c=l(c));const R={paddingBottom:b,position:"relative",minWidth:P};return e.createElement("div",{ref:i,style:R},e.createElement(s,Object.assign({},c)))});var S={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"}}]},name:"left",theme:"outlined"},L=function(t,r){return e.createElement(y,z({},t,{ref:r,icon:S}))},$=e.forwardRef(L);export{$ as R,H as g,I as w};
