import{aL as o,B as s,k as r}from"./index-CgvDPn_Q.js";import{L as i}from"./LookForward-vb9Rf0Gd.js";import{f as m}from"./system-manage-BGSHjy3Y.js";import{C as c}from"./index-B4bBGH1R.js";import{D as p}from"./index-EAsG2osP.js";import"./EllipsisOutlined-C8gPh6-I.js";import"./Overflow-K8lHzaP5.js";import"./responsiveObserver-BAX92A_c.js";import"./useBreakpoint-COs5d6bW.js";function d(t){return{key:t[0],label:t[0],children:t[1]}}function k(){const t=o(),{t:e}=s();if(!t)return r.jsx(i,{});const a=Object.entries(t).map(d);return r.jsxs(c,{title:"User Info",className:"h-full",children:[r.jsx(p,{bordered:!0,items:a}),r.jsx("div",{className:"mt-16px text-center text-18px",children:e("page.manage.userDetail.explain")}),r.jsx("div",{className:"mt-16px text-center text-18px",children:e("page.manage.userDetail.content")})]})}async function C({params:t}){const{data:e,error:a}=await m();return a?null:e.records.find(n=>String(n.id)===t.id)}export{k as Component,C as loader};