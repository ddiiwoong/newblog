"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[7770],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,f=m["".concat(u,".").concat(d)]||m[d]||s[d]||i;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},29832:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return s}});var r=n(87462),a=n(63366),i=(n(67294),n(3905)),l=["components"],o={layout:"single",title:"Yaml \uc791\uc131 \uae30\ubcf8 Tip",comments:!0,classes:"wide",description:"CKAD\uac80\uc815\uc2dc YAML \uc791\uc131 tip",slug:"kubernetes/CKAD-1/",date:new Date("2019-06-10T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","CKAD","Exam","Tip"]},u=void 0,c={permalink:"/kubernetes/CKAD-1/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2019-06-10-CKAD-1.md",source:"@site/blog/2019-06-10-CKAD-1.md",title:"Yaml \uc791\uc131 \uae30\ubcf8 Tip",description:"CKAD\uac80\uc815\uc2dc YAML \uc791\uc131 tip",date:"2019-06-10T00:00:00.000Z",formattedDate:"June 10, 2019",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"CKAD",permalink:"/tags/ckad"},{label:"Exam",permalink:"/tags/exam"},{label:"Tip",permalink:"/tags/tip"}],readingTime:1.1,truncated:!1,authors:[],frontMatter:{layout:"single",title:"Yaml \uc791\uc131 \uae30\ubcf8 Tip",comments:!0,classes:"wide",description:"CKAD\uac80\uc815\uc2dc YAML \uc791\uc131 tip",slug:"kubernetes/CKAD-1/",date:"2019-06-10T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","CKAD","Exam","Tip"]},prevItem:{title:"CircleCI - GitHub \uc5f0\ub3d9 \ubc0f EKS \uad6c\uc131\ud558\uae30",permalink:"/devops/circleci/"},nextItem:{title:"Knative on EKS",permalink:"/kubernetes/knative-on-aws/"}},p={authorsImageUrls:[]},s=[{value:"Manifest YAML\uc791\uc131 Tip",id:"manifest-yaml\uc791\uc131-tip",level:2},{value:"kubectl run \ud65c\uc6a9",id:"kubectl-run-\ud65c\uc6a9",level:3},{value:"Pod Manifest YAML",id:"pod-manifest-yaml",level:4},{value:"Deployment YAML",id:"deployment-yaml",level:4},{value:"YAML\ub85c \uc800\uc7a5",id:"yaml\ub85c-\uc800\uc7a5",level:4}],m={toc:s};function d(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\ucd5c\uadfc \ud3ec\uc2a4\ud305\uc744 \ud560 \uc5ec\uc720\uac00 \ub418\uc9c0 \uc54a\uc544 \uc77c\ub2e8 \ud2c8\ud2c8\ud788 \uc900\ube44\uc911\uc778 CKAD \uc900\ube44\ud558\ub294 \ud301\uc774\ub098 \uc815\ubcf4\ub4f1\uc744 \uba3c\uc800 \uc815\ub9ac\ud558\uace0\uc790 \ud55c\ub2e4.",(0,i.kt)("br",{parentName:"p"}),"\n","\uadf8\uc911 \uae30\ubcf8\uc774 \ub418\ub294 YAML\uc744 \ucd5c\ucd08 \uc791\uc131\ud560\ub54c \ud301\uc744 \uc815\ub9ac\ud574\ubd24\ub2e4.  "),(0,i.kt)("h2",{id:"manifest-yaml\uc791\uc131-tip"},"Manifest YAML\uc791\uc131 Tip"),(0,i.kt)("p",null,"CLI\uc548\uc5d0\uc11c Manifest YAML\ud30c\uc77c\uc744 \uc791\uc131\ud558\ub294\uac83\uc740 \uc27d\uc9c0 \uc54a\ub2e4. \ud2b9\ud788 \uc2dc\ud5d8\uc911\uc5d0 Copy/Paste\ub97c \ud558\ub294\uac83\uc740 \uc5b4\ub835\uace0 \ub290\ub9ac\uac8c \uc9c4\ud589\ub420\uc218 \uc788\uc73c\ubbc0\ub85c CLI\uc548\uc5d0\uc11c \ud574\uacb0\ud558\ub294\uac83\uc774 \uc88b\ub2e4."),(0,i.kt)("h3",{id:"kubectl-run-\ud65c\uc6a9"},"kubectl run \ud65c\uc6a9"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/kubectl/conventions/#generators"},"https://kubernetes.io/docs/reference/kubectl/conventions/")),(0,i.kt)("p",null,"\uc704 \ub9c1\ud06c\ub97c \uc798 \uae30\uc5b5\ud574\ub193\uace0 \uc2e4\uc81c \uc2dc\ud5d8\uc744 \ubcfc\ub54c template\uc791\uc131\uc744 \uc704\ud574 \uc544\ub798\uc640 \uac19\uc774 Manifest\ub97c \ud574\ubcf4\ub294\uac83\uc774 \uac00\uc7a5 \uc88b\ub2e4."),(0,i.kt)("h4",{id:"pod-manifest-yaml"},"Pod Manifest YAML"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl run --generator=run-pod/v1 nginx --image=nginx --dry-run -o yaml\n")),(0,i.kt)("h4",{id:"deployment-yaml"},"Deployment YAML"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl run --generator=deployment/v1beta1 nginx --image=nginx --dry-run --replicas=4 -o yaml\n")),(0,i.kt)("h4",{id:"yaml\ub85c-\uc800\uc7a5"},"YAML\ub85c \uc800\uc7a5"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl run --generator=deployment/v1beta1 nginx --image=nginx --dry-run --replicas=4 -o yaml > nginx-deployment.yaml\n")))}d.isMDXComponent=!0}}]);