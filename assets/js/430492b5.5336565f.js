"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[810],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return k}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=s(n),k=i,d=p["".concat(u,".").concat(k)]||p[k]||m[k]||a;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=p;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},85608:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return k},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return m}});var r=n(87462),i=n(63366),a=(n(67294),n(3905)),o=["components"],l={layout:"single",title:"multus on kind cluster",comments:!0,classes:"wide",description:"multus\ub97c kind cluster\uc5d0 \uc124\uce58\ud558\ub294 \ubc29\ubc95",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/multus-on-kind/",date:new Date("2024-09-21T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","multus","cni","kind","multiple network","macvlan","koko","kindnet"]},u=void 0,s={permalink:"/kubernetes/multus-on-kind/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-09-21-multus-on-kind.md",source:"@site/blog/2024-09-21-multus-on-kind.md",title:"multus on kind cluster",description:"multus\ub97c kind cluster\uc5d0 \uc124\uce58\ud558\ub294 \ubc29\ubc95",date:"2024-09-21T00:00:00.000Z",formattedDate:"September 21, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"multus",permalink:"/tags/multus"},{label:"cni",permalink:"/tags/cni"},{label:"kind",permalink:"/tags/kind"},{label:"multiple network",permalink:"/tags/multiple-network"},{label:"macvlan",permalink:"/tags/macvlan"},{label:"koko",permalink:"/tags/koko"},{label:"kindnet",permalink:"/tags/kindnet"}],readingTime:23.26,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"multus on kind cluster",comments:!0,classes:"wide",description:"multus\ub97c kind cluster\uc5d0 \uc124\uce58\ud558\ub294 \ubc29\ubc95",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/multus-on-kind/",date:"2024-09-21T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","multus","cni","kind","multiple network","macvlan","koko","kindnet"]},nextItem:{title:"\ud30c\ub4dc Readiness & Probe",permalink:"/kubernetes/readinessandprobe/"}},c={authorsImageUrls:[void 0]},m=[{value:"Requirements",id:"requirements",level:2}],p={toc:m};function k(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\uc774\uc804 \uc9c1\uc7a5\uc5d0\uc11c \ud504\ub85c\uc81d\ud2b8 \uc911\uc5d0 ",(0,a.kt)("inlineCode",{parentName:"p"},"Multus"),"\ub97c \uc0ac\uc6a9\ud558\uc5ec 5G\ud658\uacbd\uc5d0\uc11c \uba40\ud2f0 \ub124\ud2b8\uc6cc\ud06c CNI\ub97c \uc0ac\uc6a9\ud574\uc11c \ud328\ud0b7\uc744 \ubbf8\ub7ec\ub9c1\ud558\uace0 \ud574\ub2f9 \ud328\ud0b7\uc744 \ubd84\uc11d\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\ub97c \uc9c4\ud589\ud588\uc5c8\ub294\ub370, \ub2f9\uc2dc\uc5d0 \uc5ec\ub7ec \uc0ac\uc815\uc73c\ub85c \uc544\uc27d\uac8c \ub41c \ud504\ub85c\uc81d\ud2b8\ub3c4 \uc874\uc7ac\ud558\uace0 \ud574\uc11c \uc774\ubc88 \uae30\ud68c\uc5d0 \uc2dc\ub9ac\uc988\ub85c \uc815\ub9ac \ud574\ubcf4\ub824\uace0 \ud55c\ub2e4. \uc774\ubc88 \ud3ec\uc2a4\ud2b8\uc5d0\uc11c\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"Kind")," cluster\uc5d0 ",(0,a.kt)("inlineCode",{parentName:"p"},"Multus"),"\ub97c \uad6c\uc131\ud558\uace0 \ub2e8\uc77c \uc778\uc2a4\ud134\uc2a4\uc5d0\uc11c \ub178\ub4dc\ub07c\ub9ac \ud1b5\uc2e0\ud560 \uc218 \uc788\ub3c4\ub85d ",(0,a.kt)("inlineCode",{parentName:"p"},"koko"),"\ub97c \uc0ac\uc6a9\ud574\uc11c \ub178\ub4dc\uac04 \uba40\ud2f0 \ub124\ud2b8\uc6cc\ud06c \ud658\uacbd\uc744 \uad6c\uc131\ud558\ub294 \ubc29\ubc95\uc5d0 \ub300\ud574\uc11c \uc815\ub9ac\ud574\ubcf4\ub824\uace0 \ud55c\ub2e4."),(0,a.kt)("h2",{id:"requirements"},"Requirements"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://kind.sigs.k8s.io/"},"Kind"),": Kind(Kubernetes IN Docker)\ub294 Docker \ucee8\ud14c\uc774\ub108\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub85c\uceec Kubernetes \ud074\ub7ec\uc2a4\ud130\ub97c \uc2e4\ud589\ud560 \uc218 \uc788\uac8c \ud574\uc8fc\ub294 \ub3c4\uad6c\uc785\ub2c8\ub2e4. \uc8fc\ub85c \ud14c\uc2a4\ud2b8 \ubc0f \uac1c\ubc1c \ubaa9\uc801\uc73c\ub85c \uc0ac\uc6a9\ub418\uba70, \ube60\ub974\uace0 \uc27d\uac8c Kubernetes \ud658\uacbd\uc744 \uad6c\ucd95\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. "),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/k8snetworkplumbingwg/multus-cni"},"Multus"),": Multus\ub294 Kubernetes\uc5d0\uc11c \uc5ec\ub7ec \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\ub97c \uc9c0\uc6d0\ud558\uae30 \uc704\ud55c CNI \ud50c\ub7ec\uadf8\uc778\uc785\ub2c8\ub2e4. Multus\ub97c \ud1b5\ud574 \uac01 Pod\uac00 \uc5ec\ub7ec \ub124\ud2b8\uc6cc\ud06c\uc5d0 \uc5f0\uacb0\ub420 \uc218 \uc788\uc73c\uba70, \ub2e4\uc591\ud55c \ub124\ud2b8\uc6cc\ud06c \uc694\uad6c \uc0ac\ud56d\uc744 \ucda9\uc871\ud560 \uc218 \uc788\ub2e4. \ud2b9\ud788 5G \uc6cc\ud06c\ub85c\ub4dc\uc5d0\uc11c SR-IOV\uc640 \ud568\uaed8 \uc0ac\uc6a9\ub420 \ub54c, Multus\ub294 \uae30\ubcf8 \ub124\ud2b8\uc6cc\ud06c \uc678\uc5d0\ub3c4 \uace0\uc131\ub2a5 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\ub97c \uc81c\uacf5\ud560 \uc218 \uc788\ub2e4.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/k8snetworkplumbingwg/sriov-network-device-plugin"},"SR-IOV"),": SR-IOV(Single Root I/O Virtualization)\ub294 \ud558\ub098\uc758 \ubb3c\ub9ac\uc801 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\ub97c \uc5ec\ub7ec \uac00\uc0c1 \ud568\uc218(VF)\ub85c \ub098\ub204\uc5b4 \uac01 Pod\uc5d0 \uc9c1\uc811 \ud560\ub2f9\ud560 \uc218 \uc788\uac8c \ud574\uc8fc\ub294 \uae30\uc220\uc774\ub2e4. \uc774\ub97c \ud1b5\ud574 \ub124\ud2b8\uc6cc\ud06c \uc131\ub2a5\uc744 \ud06c\uac8c \ud5a5\uc0c1\uc2dc\ud0ac \uc218 \uc788\uc73c\uba70, \ud2b9\ud788 \uace0\uc131\ub2a5 \ub124\ud2b8\uc6cc\ud0b9\uc774 \ud544\uc694\ud55c 5G \ubc0f NFV(Network Function Virtualization) \ud658\uacbd\uc5d0\uc11c \uc911\uc694\ud558\uac8c \uc0ac\uc6a9\ub418\ub294 \uae30\uc220\uc774\ub2e4."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/redhat-nfvpe/koko"},"Koko"),": Koko\ub294 \ucee8\ud14c\uc774\ub108 \uac04 \ub124\ud2b8\uc6cc\ud06c \uc5f0\uacb0\uc744 \uc704\ud55c \ub3c4\uad6c\ub85c, \ud2b9\ud788 \uc5ec\ub7ec \ub124\ud2b8\uc6cc\ud06c \ub124\uc784\uc2a4\ud398\uc774\uc2a4 \uac04\uc758 \uac00\uc0c1 \uc774\ub354\ub137 \ud398\uc5b4\ub97c \uc0dd\uc131\ud558\ub294 \ub370 \uc0ac\uc6a9\ub41c\ub2e4. kind cluster\uc5d0\uc11c \ucee8\ud14c\uc774\ub108\ub85c \uad6c\uc131\ub41c \ub178\ub4dc\uac04 \ud1b5\uc2e0\uc744 \uc704\ud574\uc11c \uc0ac\uc6a9\ub41c\ub2e4."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/containernetworking/plugins/tree/main/plugins/main/macvlan"},"Macvlan"),": Macvlan\uc740 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\ub97c \uac00\uc0c1\ud654\ud558\uc5ec \uc5ec\ub7ec \uac1c\uc758 \uac00\uc0c1 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4\ub97c \uc0dd\uc131\ud560 \uc218 \uc788\ub294 \uae30\uc220\uc774\ub2e4. \uc774\ub97c \ud1b5\ud574 \uac01 \ucee8\ud14c\uc774\ub108\uac00 \uace0\uc720\ud55c MAC \uc8fc\uc18c\ub97c \uac00\uc9c0\uba70, \ubb3c\ub9ac \ub124\ud2b8\uc6cc\ud06c\uc640 \uc9c1\uc811 \ud1b5\uc2e0\ud560 \uc218 \uc788\ub2e4.")))}k.isMDXComponent=!0}}]);