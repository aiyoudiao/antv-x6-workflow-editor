import{B as g,q as p,aE as d,aF as f,aG as l,aH as w}from"./index-a8HA_olk.js";import{u as L}from"./use-loading-Dd0MtzaK.js";import"./subscribeFocus-C5bCTwVN.js";import"./_baseGetTag-BfcSlXwI.js";import{u as h}from"./routerPush-CgYMWyBj.js";function S(){const{loading:n,startLoading:e,endLoading:r}=L(),{redirectFromLogin:c}=h(),{t:a}=g(),o=p();async function u(m,s=!0){var i;e(),await o(d(m));const t=o(f());t?(await o(l()),s&&await c(s),(i=window.$notification)==null||i.success({message:a("page.login.common.loginSuccess"),description:a("page.login.common.welcomeBack",{userName:t})})):o(w()),r()}return{loading:n,toLogin:u}}export{S as u};