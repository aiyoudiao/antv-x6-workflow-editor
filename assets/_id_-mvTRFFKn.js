import{aN as o,B as s,k as r}from"./index-DfAWM7Uj.js";import{L as i}from"./LookForward-BRMFsMzU.js";import{f as m}from"./system-manage-DBj1Xvbv.js";import{C as c}from"./index-B7BUlZvL.js";import{D as p}from"./index-DwEHNmwl.js";import"./index-ByIt-Cu0.js";import"./EllipsisOutlined-C5eoGF3r.js";import"./responsiveObserver-DXf2yPRF.js";import"./useBreakpoint-ChVvh9Kb.js";function d(t){return{key:t[0],label:t[0],children:t[1]}}function b(){const t=o(),{t:e}=s();if(!t)return r.jsx(i,{});const a=Object.entries(t).map(d);return r.jsxs(c,{title:"User Info",className:"h-full",children:[r.jsx(p,{bordered:!0,items:a}),r.jsx("div",{className:"mt-16px text-center text-18px",children:e("page.manage.userDetail.explain")}),r.jsx("div",{className:"mt-16px text-center text-18px",children:e("page.manage.userDetail.content")})]})}async function k({params:t}){const{data:e,error:a}=await m();return a?null:e.records.find(n=>String(n.id)===t.id)}export{b as Component,k as loader};
