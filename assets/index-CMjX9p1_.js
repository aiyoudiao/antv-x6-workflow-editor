import{t as se,r as f,C as L,a as W,b0 as oe,aY as V,c6 as $,c7 as re,c8 as ae,c9 as ie,ah as v,ca as le,cb as ce,cc as de,cd as ue,k as i,ce as O,J as b}from"./index-B5a_V5CT.js";import{G as fe,E as pe,d as me,C as he,S as ge,K as ye,H as xe,b as be,e as Ce,T as ve,D as we,f as je,g as Se}from"./index--HaQA524.js";import{F as E}from"./index-Dy6kSHZL.js";import{C as A}from"./index-DdQzgOna.js";import{I as _}from"./index-DPYKvPA2.js";import{T as B}from"./index-BBMu6yZv.js";import{S as Ee}from"./index-D0Ca2blj.js";import{L as U}from"./index-CTzPbYPh.js";import{a as K,u as X,L as Re,S as Oe}from"./Sider-TGQ1OQvf.js";import"./throttle-BJiVXReG.js";import"./row-BNpIBnqT.js";import"./responsiveObserver-Dcl-L-Qm.js";import"./EllipsisOutlined-DohHsQHN.js";import"./Overflow-BkB-zVp7.js";import"./SearchOutlined-DGTQd1kE.js";import"./DownOutlined-BSDaAZ2u.js";import"./index-E23P6kbf.js";import"./LeftOutlined-B5gNGnNn.js";import"./useBreakpoint-BYBkYpp_.js";import"./index-CZoNsu5X.js";import"./index-DfzuTuay.js";function Ne(t,n,o){return typeof o=="boolean"?o:t.length?!0:se(n).some(a=>a.type===K)}var q=function(t,n){var o={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(o[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(o[e[a]]=t[e[a]]);return o};function P(t){let{suffixCls:n,tagName:o,displayName:e}=t;return a=>f.forwardRef((u,m)=>f.createElement(a,Object.assign({ref:m,suffixCls:n,tagName:o},u)))}const T=f.forwardRef((t,n)=>{const{prefixCls:o,suffixCls:e,className:a,tagName:l}=t,u=q(t,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:m}=f.useContext(L),p=m("layout",o),[s,r,d]=X(p),c=e?`${p}-${e}`:p;return s(f.createElement(l,Object.assign({className:W(o||c,a,r,d),ref:n},u)))}),ke=f.forwardRef((t,n)=>{const{direction:o}=f.useContext(L),[e,a]=f.useState([]),{prefixCls:l,className:u,rootClassName:m,children:p,hasSider:s,tagName:r,style:d}=t,c=q(t,["prefixCls","className","rootClassName","children","hasSider","tagName","style"]),h=oe(c,["suffixCls"]),{getPrefixCls:C,layout:g}=f.useContext(L),x=C("layout",l),F=Ne(e,p,s),[R,j,Q]=X(x),ee=W(x,{[`${x}-has-sider`]:F,[`${x}-rtl`]:o==="rtl"},g==null?void 0:g.className,u,m,j,Q),te=f.useMemo(()=>({siderHook:{addSider:H=>{a(I=>[].concat(V(I),[H]))},removeSider:H=>{a(I=>I.filter(ne=>ne!==H))}}}),[]);return R(f.createElement(Re.Provider,{value:te},f.createElement(r,Object.assign({ref:n,className:ee,style:Object.assign(Object.assign({},g==null?void 0:g.style),d)},h),p)))}),Fe=P({tagName:"div",displayName:"Layout"})(ke),Le=P({suffixCls:"header",tagName:"header",displayName:"Header"})(T),Pe=P({suffixCls:"footer",tagName:"footer",displayName:"Footer"})(T),Ge=P({suffixCls:"content",tagName:"main",displayName:"Content"})(T),w=Fe;w.Header=Le;w.Footer=Pe;w.Content=Ge;w.Sider=K;w._InternalSiderContext=Oe;let y=null,S=t=>t(),N=[],k={};function J(){const{getContainer:t,duration:n,rtl:o,maxCount:e,top:a}=k,l=(t==null?void 0:t())||document.body;return{getContainer:()=>l,duration:n,rtl:o,maxCount:e,top:a}}const He=v.forwardRef((t,n)=>{const{messageConfig:o,sync:e}=t,{getPrefixCls:a}=f.useContext(L),l=k.prefixCls||a("message"),u=f.useContext(de),[m,p]=ue(Object.assign(Object.assign(Object.assign({},o),{prefixCls:l}),u.message));return v.useImperativeHandle(n,()=>{const s=Object.assign({},m);return Object.keys(s).forEach(r=>{s[r]=function(){return e(),m[r].apply(m,arguments)}}),{instance:s,sync:e}}),p}),Ie=v.forwardRef((t,n)=>{const[o,e]=v.useState(J),a=()=>{e(J)};v.useEffect(a,[]);const l=ce(),u=l.getRootPrefixCls(),m=l.getIconPrefixCls(),p=l.getTheme(),s=v.createElement(He,{ref:n,sync:a,messageConfig:o});return v.createElement(le,{prefixCls:u,iconPrefixCls:m,theme:p},l.holderRender?l.holderRender(s):s)});function G(){if(!y){const t=document.createDocumentFragment(),n={fragment:t};y=n,S(()=>{ie(v.createElement(Ie,{ref:o=>{const{instance:e,sync:a}=o||{};Promise.resolve().then(()=>{!n.instance&&e&&(n.instance=e,n.sync=a,G())})}}),t)});return}y.instance&&(N.forEach(t=>{const{type:n,skipped:o}=t;if(!o)switch(n){case"open":{S(()=>{const e=y.instance.open(Object.assign(Object.assign({},k),t.config));e==null||e.then(t.resolve),t.setCloseFn(e)});break}case"destroy":S(()=>{y==null||y.instance.destroy(t.key)});break;default:S(()=>{var e;const a=(e=y.instance)[n].apply(e,V(t.args));a==null||a.then(t.resolve),t.setCloseFn(a)})}}),N=[])}function Ae(t){k=Object.assign(Object.assign({},k),t),S(()=>{var n;(n=y==null?void 0:y.sync)===null||n===void 0||n.call(y)})}function Me(t){const n=$(o=>{let e;const a={type:"open",config:t,resolve:o,setCloseFn:l=>{e=l}};return N.push(a),()=>{e?S(()=>{e()}):a.skipped=!0}});return G(),n}function Te(t,n){const o=$(e=>{let a;const l={type:t,args:n,resolve:e,setCloseFn:u=>{a=u}};return N.push(l),()=>{a?S(()=>{a()}):l.skipped=!0}});return G(),o}const De=t=>{N.push({type:"destroy",key:t}),G()},_e=["success","info","warning","error","loading"],Be={open:Me,destroy:De,config:Ae,useMessage:re,_InternalPanelDoNotUseOrYouWillBeFired:ae},M=Be;_e.forEach(t=>{M[t]=function(){for(var n=arguments.length,o=new Array(n),e=0;e<n;e++)o[e]=arguments[e];return Te(t,o)}});const Y=f.createContext({}),Ue=({children:t})=>{const[n,o]=f.useState(),[e,a]=f.useState(),[l,u]=f.useState({canRedo:!1,canUndo:!1});return i.jsx(Y.Provider,{value:{graph:n,setGraph:o,graphDnd:e,setGraphDnd:a,history:l,setHistory:u},children:t})},D=()=>{const t=f.useContext(Y);if(!t)throw new Error("useGraphContext must be used within a GraphProvider");return t},Je=()=>{const[t,n]=f.useState(!1),o=f.useRef(null),e=f.useRef(null),[a,l]=f.useState(null),[u,m]=f.useState(null),p=f.useCallback(()=>{var d,c,h,C;const s=((c=(d=o.current)==null?void 0:d.parentElement)==null?void 0:c.offsetWidth)||800,r=((C=(h=o.current)==null?void 0:h.parentElement)==null?void 0:C.offsetHeight)||600;return{graphWidth:s,graphHeight:r}},[o]);return f.useEffect(()=>{if(!o.current||!e.current)return;const{graphWidth:s,graphHeight:r}=p(),d=new fe({container:o.current,width:s,height:r,grid:{visible:!0,type:"doubleMesh",args:[{color:"#eee",thickness:1},{color:"#ddd",thickness:1,factor:4}]},background:{color:"#FFF"},mousewheel:{enabled:!0,global:!1,modifiers:[],minScale:.2,maxScale:4},connecting:{connector:"smooth",connectionPoint:"boundary",snap:!0,allowBlank:!1,highlight:!0,createEdge(){return d.createEdge({shape:"edge",attrs:{line:{stroke:"#5F95FF",strokeWidth:2,targetMarker:{name:"block",width:12,height:8}}}})}}});d.use(new pe),d.use(new me({enabled:!0})),d.use(new he({enabled:!0,useLocalStorage:!0})),d.use(new ge({enabled:!0,showNodeSelectionBox:!0})),d.use(new ye({enabled:!0,global:!1})),d.use(new xe({enabled:!0})),d.use(new be({enabled:!0,pageVisible:!1,pageBreak:!1,autoResize:!0,pannable:!0})),d.use(new Ce({container:e.current,width:200,height:160,padding:10,minScale:.2,maxScale:4,scalable:!0})),d.use(new ve({rotating:{enabled:!0,grid:15},resizing:{enabled:!0,minWidth:1,maxWidth:200,minHeight:1,maxHeight:150,orthogonal:!1,restrict:!1,preserveAspectRatio:!1}}));const c=new we({target:d});return l(d),m(c),n(!0),()=>{d.dispose(!0)}},[]),{containerRef:o,miniMapRef:e,graphEntity:a,dndEntity:u,getGraphAreaInfo:p,isReady:t}},ze=({onNodeSelect:t})=>{const{containerRef:n,miniMapRef:o,graphEntity:e,dndEntity:a,getGraphAreaInfo:l,isReady:u}=Je(),{setGraph:m,setGraphDnd:p,setHistory:s}=D();return f.useEffect(()=>{u&&(!n.current||!o.current||!e||!a||(n.current.parentElement.addEventListener("resize",()=>{const{graphWidth:r,graphHeight:d}=l();e.resize(r,d)}),e.on("history:change",()=>{s({canRedo:e.canRedo(),canUndo:e.canUndo()})}),e.bindKey("ctrl+c",()=>{const r=e.getSelectedCells();return r.length&&e.copy(r),!1}),e.bindKey("ctrl+v",()=>{if(!e.isClipboardEmpty()){const r=e.paste({offset:32});e.cleanSelection(),e.select(r)}return!1}),e.bindKey("delete",()=>{const r=e.getSelectedCells();return r.length&&e.removeCells(r),!1}),window.__x6_instances__=[],m(e),p(a),window.__x6_instances__.push(e),e.on("node:click",({node:r})=>{t(r)})))},[u,t]),i.jsxs("div",{className:"relative w-full h-full",children:[i.jsx("div",{ref:n,className:"absolute w-full h-full top-0 left-0"}),i.jsx("div",{ref:o,className:"absolute right-3 bottom-3"})]})},We=({selectedNode:t})=>{const[n]=E.useForm(),[o,e]=f.useState({});f.useEffect(()=>{if(t&&t.getLabel){const l={label:t.getLabel(),color:t.attr("body/stroke")||"#000",width:t.size().width,height:t.size().height};e(l),n.setFieldsValue(l)}},[t,n]);const a=l=>{if(t){const{color:u,width:m,height:p,label:s}=l;s&&t.setLabel(s),u&&t.attr("body/stroke",u),m&&p&&t.resize(m,p)}};return t?i.jsx(A,{title:"属性编辑器",children:i.jsxs(E,{form:n,layout:"vertical",onValuesChange:a,children:[i.jsx(E.Item,{name:"label",label:"节点名称",children:i.jsx(_,{})}),i.jsx(E.Item,{name:"color",label:"边框颜色",children:i.jsx(_,{type:"color"})}),i.jsx(E.Item,{name:"width",label:"宽度",children:i.jsx(B,{min:40,max:200})}),i.jsx(E.Item,{name:"height",label:"高度",children:i.jsx(B,{min:20,max:100})})]})}):i.jsx(A,{title:"属性编辑器",children:i.jsx("p",{children:"请选中一个节点或连线以编辑属性。"})})};var Z={exports:{}};(function(t,n){(function(o,e){e()})(O,function(){function o(s,r){return typeof r>"u"?r={autoBom:!1}:typeof r!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),r={autoBom:!r}),r.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(s.type)?new Blob(["\uFEFF",s],{type:s.type}):s}function e(s,r,d){var c=new XMLHttpRequest;c.open("GET",s),c.responseType="blob",c.onload=function(){p(c.response,r,d)},c.onerror=function(){console.error("could not download file")},c.send()}function a(s){var r=new XMLHttpRequest;r.open("HEAD",s,!1);try{r.send()}catch{}return 200<=r.status&&299>=r.status}function l(s){try{s.dispatchEvent(new MouseEvent("click"))}catch{var r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),s.dispatchEvent(r)}}var u=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof O=="object"&&O.global===O?O:void 0,m=u.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),p=u.saveAs||(typeof window!="object"||window!==u?function(){}:"download"in HTMLAnchorElement.prototype&&!m?function(s,r,d){var c=u.URL||u.webkitURL,h=document.createElement("a");r=r||s.name||"download",h.download=r,h.rel="noopener",typeof s=="string"?(h.href=s,h.origin===location.origin?l(h):a(h.href)?e(s,r,d):l(h,h.target="_blank")):(h.href=c.createObjectURL(s),setTimeout(function(){c.revokeObjectURL(h.href)},4e4),setTimeout(function(){l(h)},0))}:"msSaveOrOpenBlob"in navigator?function(s,r,d){if(r=r||s.name||"download",typeof s!="string")navigator.msSaveOrOpenBlob(o(s,d),r);else if(a(s))e(s,r,d);else{var c=document.createElement("a");c.href=s,c.target="_blank",setTimeout(function(){l(c)})}}:function(s,r,d,c){if(c=c||open("","_blank"),c&&(c.document.title=c.document.body.innerText="downloading..."),typeof s=="string")return e(s,r,d);var h=s.type==="application/octet-stream",C=/constructor/i.test(u.HTMLElement)||u.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||h&&C||m)&&typeof FileReader<"u"){var x=new FileReader;x.onloadend=function(){var j=x.result;j=g?j:j.replace(/^data:[^;]*;/,"data:attachment/file;"),c?c.location.href=j:location=j,c=null},x.readAsDataURL(s)}else{var F=u.URL||u.webkitURL,R=F.createObjectURL(s);c?c.location=R:location.href=R,c=null,setTimeout(function(){F.revokeObjectURL(R)},4e4)}});u.saveAs=p.saveAs=p,t.exports=p})})(Z);var Ve=Z.exports;const $e=()=>{const t=f.useRef(null),{graph:n,history:o}=D(),e=()=>{n&&n.zoom(.1)},a=()=>{n&&n.zoom(-.1)},l=()=>{n&&n.undo()},u=()=>{n&&n.redo()},m=()=>{if(!n)return;const s=n.toJSON(),r=new Blob([JSON.stringify(s,null,2)],{type:"application/json"});Ve.saveAs(r,"diagram.json"),M.success("导出 JSON 成功")},p=s=>{var c;const r=(c=s.target.files)==null?void 0:c[0];if(!r)return;const d=new FileReader;d.onload=h=>{var C;try{const g=(C=h.target)==null?void 0:C.result;if(typeof g=="string"){const x=JSON.parse(g);n.fromJSON(x)}}catch{M.error("导入JSON 失败")}},d.readAsText(r)};return i.jsx("section",{className:"bg-white text-center",children:i.jsxs(Ee,{children:[i.jsx(b,{onClick:()=>{n.zoomTo(1),n.centerContent()},children:"居中"}),i.jsx(b,{onClick:e,children:"放大"}),i.jsx(b,{onClick:a,children:"缩小"}),i.jsx(b,{disabled:!o.canUndo,onClick:l,children:"撤销"}),i.jsx(b,{disabled:!o.canRedo,onClick:u,children:"重做"}),i.jsx("input",{type:"file",className:"hidden",accept:".json",ref:t,onChange:p}),i.jsx(b,{onClick:m,children:"导出 JSON"}),i.jsx(b,{onClick:()=>{var s;return(s=t.current)==null?void 0:s.click()},children:"导入 JSON"}),i.jsx(b,{onClick:()=>{var s;return(s=n==null?void 0:n.exportSVG)==null?void 0:s.call(n,"diagram.svg",{copyStyles:!1})},children:"导出 SVG"}),i.jsx(b,{onClick:()=>{var s;return(s=n==null?void 0:n.exportSVG)==null?void 0:s.call(n,"diagram.png",{copyStyles:!1})},children:"导出 PNG"}),i.jsx(b,{onClick:()=>{var s;return(s=n==null?void 0:n.exportJPEG)==null?void 0:s.call(n,"diagram.jpg",{copyStyles:!1})},children:"导出 JPG"})]})})};je.register({shape:"custom-html",width:160,height:80,effect:["data"],html(t){var a;const{color:n}=((a=t==null?void 0:t.getData)==null?void 0:a.call(t))||{},o=document.createElement("div");o.style.position="relative",o.style.width="100%",o.style.height="100%",o.style.backgroundColor=n||"#333232",o.style.borderRadius="1em",o.style.boxShadow="0 0.125em 0.3125em rgba(0, 0, 0, 0.25), 0 0.02125em 0.06125em rgba(0, 0, 0, 0.25)",o.style.perspective="600px";const e=document.createElement("div");return e.style.position="absolute",e.style.top="50%",e.style.left="0",e.style.width="100%",e.style.height="50%",e.style.backgroundColor="#333232",e.style.borderBottomLeftRadius="1em",e.style.borderBottomRightRadius="1em",e.style.backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4))",e.style.transformOrigin="top",e.style.transform="rotateX(180deg)",e.style.transition="transform 0.7s ease-in-out",o.addEventListener("mouseover",()=>{e.style.transform="rotateX(0deg)"}),o.addEventListener("mouseout",()=>{e.style.transform="rotateX(180deg)"}),o.appendChild(e),o}});const Ke=[{name:"开始节点",shape:"rect",width:140,height:80,type:"start"},{name:"HTML节点",shape:"custom-html",width:60,height:100,type:"start"},{name:"结束节点",type:"end"},{name:"审批节点",type:"approval"},{name:"条件节点",type:"condition"}],Xe=()=>{const{graph:t,graphDnd:n}=D(),o=e=>a=>{const l=t.createNode({label:e.name,shape:e.shape||"rect",width:e.width||100,height:e.height||40,data:{color:"#333232"}});setInterval(()=>{l.setData({color:Se.random().toHex()})},2e3),n.start(l,a.nativeEvent)};return i.jsx(A,{title:"节点列表",children:i.jsx(U,{className:"cursor-pointer text-center",dataSource:Ke,renderItem:e=>i.jsx(U.Item,{onMouseDown:o(e),children:e.name})})})},{Header:qe,Sider:z}=w,xt=()=>{const[t,n]=f.useState(null);return i.jsx(Ue,{children:i.jsxs(w,{style:{height:"100%"},children:[i.jsx(qe,{className:"relative left-0 top-0 bg-white",children:i.jsx($e,{})}),i.jsxs(w,{style:{height:"100%"},children:[i.jsx(z,{width:200,theme:"light",children:i.jsx(Xe,{})}),i.jsx(ze,{onNodeSelect:n}),i.jsx(z,{width:300,theme:"light",children:i.jsx(We,{selectedNode:t})})]})]})})};export{xt as Component};
