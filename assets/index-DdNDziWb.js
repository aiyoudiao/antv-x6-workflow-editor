import{B as g,k as e,J as i}from"./index-nk2jUDbU.js";import{u as x}from"./captcha-DRHAprOg.js";import{u as f}from"./routerPush-DSXly2k6.js";import{u as j}from"./form-pvQJYhW1.js";import{u as w}from"./index-B-wE4TFZ.js";import{F as s}from"./index-DDiOdpPa.js";import{I as r}from"./index-BNh0uppo.js";import{S as P}from"./index-CPz5NXnm.js";import"./use-loading-BwtBLE4_.js";import"./tslib.es6-CwN1OpI9.js";import"./subscribeFocus-B1aRe7BR.js";import"./_baseGetTag-zNtZVuiG.js";import"./row-m3Z2_nFb.js";import"./responsiveObserver-D9Vs3ev7.js";import"./SearchOutlined-B9NRb6mu.js";const C=()=>{const{t:o}=g(),{label:t,isCounting:c,loading:p,getCaptcha:d}=x(),{toggleLoginModule:u}=f(),[a]=s.useForm(),{formRules:l,createConfirmPwdRule:h}=j();async function n(){var m;await a.validateFields(),(m=window.$message)==null||m.success(o("page.login.common.validateSuccess"))}return w("enter",()=>{n()}),e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"text-18px text-primary font-medium",children:o("page.login.register.title")}),e.jsxs(s,{form:a,className:"pt-24px",children:[e.jsx(s.Item,{name:"phone",rules:l.phone,children:e.jsx(r,{placeholder:o("page.login.common.phonePlaceholder")})}),e.jsx(s.Item,{name:"code",rules:l.code,children:e.jsxs("div",{className:"w-full flex-y-center gap-16px",children:[e.jsx(r,{placeholder:o("page.login.common.codePlaceholder")}),e.jsx(i,{size:"large",disabled:c,loading:p,onClick:()=>d("17260760167"),children:t})]})}),e.jsx(s.Item,{rules:l.pwd,name:"password",children:e.jsx(r,{placeholder:o("page.login.common.passwordPlaceholder")})}),e.jsx(s.Item,{rules:h(a),name:"confirmPassword",children:e.jsx(r,{placeholder:o("page.login.common.confirmPasswordPlaceholder")})}),e.jsxs(P,{direction:"vertical",className:"w-full",size:18,children:[e.jsx(i,{type:"primary",size:"large",shape:"round",block:!0,onClick:n,children:o("common.confirm")}),e.jsx(i,{size:"large",shape:"round",block:!0,onClick:()=>u("pwd-login"),children:o("page.login.common.back")})]})]})]})};C.displayName="Register";export{C as Component};