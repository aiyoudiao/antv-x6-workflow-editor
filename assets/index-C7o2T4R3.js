import{B as g,k as e,J as r}from"./index-CgvDPn_Q.js";import{u as h}from"./captcha-DjmMd7FJ.js";import{u as x}from"./routerPush-BjdmuHAL.js";import{u as f}from"./form-zEGJmTn3.js";import{u as j}from"./index-C-Sdubzv.js";import{F as s}from"./index-BYX4FxE4.js";import{I as t}from"./index-CxxUdSiS.js";import{S as C}from"./index-BKAD54SC.js";import"./use-loading-DjN1yGmL.js";import"./tslib.es6-CwN1OpI9.js";import"./subscribeFocus-ZqjGwaRa.js";import"./_baseGetTag-D1fNua-F.js";import"./row-ua_M7p23.js";import"./responsiveObserver-BAX92A_c.js";import"./SearchOutlined-nudLcr53.js";const k=()=>{const[i]=s.useForm(),{label:m,isCounting:c,loading:p,getCaptcha:d}=h(),{t:o}=g(),{toggleLoginModule:u}=x(),{formRules:a}=f();async function l(){var n;await i.validateFields(),(n=window.$message)==null||n.success(o("page.login.common.validateSuccess"))}return j("enter",()=>{l()}),e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"text-18px text-primary font-medium",children:o("page.login.codeLogin.title")}),e.jsxs(s,{className:"pt-24px",form:i,children:[e.jsx(s.Item,{name:"phone",rules:a.phone,children:e.jsx(t,{placeholder:o("page.login.common.phonePlaceholder")})}),e.jsx(s.Item,{name:"code",rules:a.code,children:e.jsxs("div",{className:"w-full flex-y-center gap-16px",children:[e.jsx(t,{"v-model:value":"model.code",placeholder:o("page.login.common.codePlaceholder")}),e.jsx(r,{size:"large",disabled:c,loading:p,onClick:()=>d("17260760167"),children:m})]})}),e.jsxs(C,{direction:"vertical",className:"w-full",size:18,children:[e.jsx(r,{type:"primary",size:"large",shape:"round",block:!0,onClick:l,children:o("common.confirm")}),e.jsx(r,{size:"large",shape:"round",block:!0,onClick:()=>u("pwd-login"),children:o("page.login.common.back")})]})]})]})};k.displayName="CodeLogin";export{k as Component};