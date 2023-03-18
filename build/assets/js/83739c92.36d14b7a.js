"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[7130],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,g=p["".concat(s,".").concat(f)]||p[f]||m[f]||a;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3359:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return m}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),i=["components"],c={layout:"single",title:"EKS CNI Custom Networking",comments:!0,classes:"wide",description:"Terraform null_resource\ub97c \ud65c\uc6a9\ud558\uc5ec EKS CNI network\ub97c \uad6c\uc131\ud558\ub294 \ubc29\ubc95",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/eks-cni-custom/",date:new Date("2022-12-16T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","EKS","CNI","Terraform"]},s=void 0,l={permalink:"/kubernetes/eks-cni-custom/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2022-12-16-eks-cni-custom.md",source:"@site/blog/2022-12-16-eks-cni-custom.md",title:"EKS CNI Custom Networking",description:"Terraform null_resource\ub97c \ud65c\uc6a9\ud558\uc5ec EKS CNI network\ub97c \uad6c\uc131\ud558\ub294 \ubc29\ubc95",date:"2022-12-16T00:00:00.000Z",formattedDate:"December 16, 2022",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"EKS",permalink:"/tags/eks"},{label:"CNI",permalink:"/tags/cni"},{label:"Terraform",permalink:"/tags/terraform"}],readingTime:10.79,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"EKS CNI Custom Networking",comments:!0,classes:"wide",description:"Terraform null_resource\ub97c \ud65c\uc6a9\ud558\uc5ec EKS CNI network\ub97c \uad6c\uc131\ud558\ub294 \ubc29\ubc95",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/eks-cni-custom/",date:"2022-12-16T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","EKS","CNI","Terraform"]},prevItem:{title:"kOps with Cilium",permalink:"/kubernetes/kops-cilium/"},nextItem:{title:"EKS Anywhere Advanced Usages",permalink:"/kubernetes/eks-anywhere-adv/"}},u={authorsImageUrls:[void 0]},m=[{value:"EKS CNI Networking \uc81c\uc57d\uc0ac\ud56d",id:"eks-cni-networking-\uc81c\uc57d\uc0ac\ud56d",level:2}],p={toc:m};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"eks-cni-networking-\uc81c\uc57d\uc0ac\ud56d"},"EKS CNI Networking \uc81c\uc57d\uc0ac\ud56d"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/cni-custom-network.html#custom-networking-automatically-apply-eniconfig"},"https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/cni-custom-network.html#custom-networking-automatically-apply-eniconfig"),"  "),(0,a.kt)("p",null,"AWS\uc5d0\ub294 \uae30\ubcf8 ENI\uac00 \ud3ec\ud568\ub41c \uc11c\ube0c\ub137\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 IP\uac1c\uc218\ub294 \uc81c\ud55c\ub418\uc5b4 \uc788\ub2e4. \ud30c\ub4dc\uc758 \uc218 \uc81c\ud55c\uc774 \ubc1c\uc0dd\ud560 \uc218 \uc788\uae30 \ub54c\ubb38\uc5d0 secondary ENI\uc5d0 \ub2e4\ub978 \uc11c\ube0c\ub137\uc744 \uc0ac\uc6a9\ud558\uc5ec \uac00\uc6a9 IP\uac1c\uc218\ub97c \ub298\ub9b4\uc218 \uc788\ub2e4. \ub610\ud55c \ubcf4\uc548\uc0c1\uc758 \uc774\uc720\ub85c \ud30c\ub4dc\ub294 \ub178\ub4dc\uc758 \uae30\ubcf8 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\uc640 \ub2e4\ub978 \uc11c\ube0c\ub137 \ub610\ub294 \ubcf4\uc548 \uadf8\ub8f9\uc744 \uc0ac\uc6a9\ud574\uc57c \ud560 \uc218 \uc788\ub2e4.   "),(0,a.kt)("p",null,"CNI Custom Networking\uc774 \ud65c\uc131\ud654\uac00 \ub418\uba74 \ud30c\ub4dc\ub294 \ub2e4\ub978 \uc11c\ube0c\ub137\uc5d0 \uc0dd\uc131\uc774 \ub418\uace0, \ub178\ub4dc \uc11c\ube0c\ub137\uc758 \uc544\uc774\ud53c\ub97c \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub294\ub2e4."),(0,a.kt)("p",null,"EKS\uc5d0\uc11c \ud30c\ub4dc \ub300\uc5ed\uc744 \ubd84\ub9ac \ud558\uae30 \uc704\ud574\uc11c CNI Custom Networking \uc124\uc815\uc744 \uc9c4\ud589\ud55c\ub2e4. \ud574\ub2f9 env \uac12\uc744 \ubcc0\uacbd\ud558\uba74 \uc989\uc2dc aws-node \uac00 \uad50\uccb4\ub41c\ub2e4."))}f.isMDXComponent=!0}}]);