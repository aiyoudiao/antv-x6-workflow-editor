import{l as u,H as m,au as j,B as k,q as w,r as y,k as r,J as i,ap as L,a4 as N,a8 as C}from"./index-By7LVFEb.js";import{u as D}from"./use-loading-DLtvTDgg.js";import"./subscribeFocus-OplqwFfX.js";import"./_baseGetTag-Bq09t9ym.js";import{u as S}from"./login-Dz_GPO6b.js";import{S as n}from"./index-BdVCeMI6.js";import{T as B}from"./index-DjNOYSsE.js";import{C as d}from"./index-rlyCioMn.js";import{D as E}from"./index-BJQphr6r.js";import"./routerPush-ucJZkyCz.js";import"./index-BlIBobm-.js";import"./EllipsisOutlined-Cjbi_cm8.js";import"./responsiveObserver-Df7pYaKA.js";import"./useBreakpoint-DuXY7LLf.js";function T(){const e=u(m),l=u(j);function o(t){return l?typeof t=="string"?e.buttons.includes(t):t.some(a=>e.buttons.includes(a)):!1}return{hasAuth:o}}function K(){const{t:e}=k(),l=u(m),{hasAuth:o}=T(),{toLogin:t}=S(),{loading:a,startLoading:g,endLoading:f}=D(),p=w(),[c,h]=y.useState("super"),A=[{key:"super",label:e("page.login.pwdLogin.superAdmin"),userName:"Super",password:"123456"},{key:"admin",label:e("page.login.pwdLogin.admin"),userName:"Admin",password:"123456"},{key:"user",label:e("page.login.pwdLogin.user"),userName:"User",password:"123456"}],b=[{key:"1",label:e("page.manage.user.userRole"),children:r.jsx(n,{children:l.roles.map(s=>r.jsx(B,{children:s},s))})},{key:"2",label:e("page.function.toggleAuth.toggleAccount"),children:r.jsx(n,{children:A.map(s=>r.jsx(i,{disabled:a&&c!==s.key,loading:a&&c===s.key,onClick:()=>x(s),children:s.label},s.key))})}];async function x(s){h(s.key),g(),L.resetRoute(),await t({userName:s.userName,password:s.password},!1),p(N()),f(),p(C())}return r.jsx(n,{direction:"vertical",size:16,className:"w-full",children:r.jsxs(d,{title:e("request.logout"),bordered:!1,className:"card-wrapper",size:"small",children:[r.jsx(E,{bordered:!0,layout:"vertical",size:"small",column:1,items:b}),r.jsx(d,{title:e("page.function.toggleAuth.authHook"),bordered:!1,className:"card-wrapper",size:"small",children:r.jsxs(n,{children:[o("B_CODE1")&&r.jsx(i,{children:e("page.function.toggleAuth.superAdminVisible")}),o("B_CODE2")&&r.jsx(i,{children:e("page.function.toggleAuth.adminVisible")}),o("B_CODE3")&&r.jsx(i,{children:e("page.function.toggleAuth.adminOrUserVisible")})]})})]})})}export{K as Component};