"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[6306],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return k}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=u(n),k=o,m=d["".concat(l,".").concat(k)]||d[k]||c[k]||a;return n?r.createElement(m,s(s({ref:t},p),{},{components:n})):r.createElement(m,s({ref:t},p))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var u=2;u<a;u++)s[u]=n[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},92119:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return k},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return c}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),s=["components"],i={layout:"single",title:"kOps with Cloud9",comments:!0,classes:"wide",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cloud9/",date:new Date("2023-03-08T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","HPA"]},l=void 0,u={permalink:"/kubernetes/kops-cloud9/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-03-08-kops-cloud9.md",source:"@site/blog/2023-03-08-kops-cloud9.md",title:"kOps with Cloud9",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",date:"2023-03-08T00:00:00.000Z",formattedDate:"March 8, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"kOps",permalink:"/tags/k-ops"},{label:"Cloud9",permalink:"/tags/cloud-9"},{label:"CloudFormation",permalink:"/tags/cloud-formation"},{label:"HPA",permalink:"/tags/hpa"}],readingTime:9.935,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"kOps with Cloud9",comments:!0,classes:"wide",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cloud9/",date:"2023-03-08T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","HPA"]},prevItem:{title:"kOps with Cilium",permalink:"/kubernetes/kops-cilium/"},nextItem:{title:"EKS CNI Custom Networking",permalink:"/kubernetes/eks-cni-custom/"}},p={authorsImageUrls:[void 0]},c=[{value:"PKOS Study",id:"pkos-study",level:2},{value:"kOps",id:"kops",level:2}],d={toc:c};function k(e){var t=e.components,n=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"pkos-study"},"PKOS Study"),(0,a.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d 4\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \uccab\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. \uc2e4\uc81c\ub85c kubeadm, kubespray\ub85c\ub294 \uacbd\ud5d8\uc774 \uc788\uc9c0\ub9cc \uc774\ubc88 \uc2a4\ud130\ub514\uc5d0\uc11c \ub300\ubd80\ubd84\uc758 \uc2e4\uc2b5\uc740 kOps\ub85c \uad6c\uc131\uc774 \ub418\uc5b4 \uc0c8\ub85c\uc6b4 \ubc29\uc2dd\uc73c\ub85c \uc124\uce58\ub97c \uc9c4\ud589\ud588\ub2e4.'),(0,a.kt)("h2",{id:"kops"},"kOps"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"K"),"ubernetes ",(0,a.kt)("strong",{parentName:"li"},"Op"),"eration",(0,a.kt)("strong",{parentName:"li"},"s")," (kOps) - Production Grade k8s Installation, Upgrades and Management")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://kops.sigs.k8s.io/"},"https://kops.sigs.k8s.io/"),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/kops"},"https://github.com/kubernetes/kops")),(0,a.kt)("p",null,"kOps\ub294 \ud074\ub77c\uc6b0\ub4dc \ud50c\ub7ab\ud3fc(aws, gcp, azure \ub4f1)\uc5d0\uc11c \uc27d\uac8c k8s \ub97c \uc124\uce58\ud560 \uc218 \uc788\ub3c4\ub85d \ub3c4\uc640\uc8fc\ub294 \ub3c4\uad6c\ub85c \uc11c\ubc84 \uc778\uc2a4\ud134\uc2a4\uc640 \ub124\ud2b8\uc6cc\ud06c \ub9ac\uc18c\uc2a4 \ub4f1\uc744 \ud074\ub77c\uc6b0\ub4dc\uc5d0\uc11c \uc790\ub3d9\uc73c\ub85c \uc0dd\uc131\ud574 k8s \ub97c \uc124\uce58\ud558\ub294 \ub3c4\uad6c\uc774\uace0 kOps\ub294 AWS \uc758 \ub2e4\uc591\ud55c \uc11c\ube44\uc2a4\uc640 \uc720\uc5f0\ud558\uac8c \uc5f0\ub3d9\ub418\uc5b4 \uc0ac\uc6a9 \uac00\ub2a5\ud55c\uac8c \uc7a5\uc810\uc774\ub2e4. "),(0,a.kt)("p",null,"\uae00\uc744 \uc791\uc131\ud558\ub294 \ub0a0\uc9dc \uae30\uc900(23\ub144 3\uc6d4 5\uc77c), \ubc84\uc804\uc740 1.25.3 \uc73c\ub85c \uc9c4\ud589\uc744 \ud55c\ub2e4."))}k.isMDXComponent=!0}}]);