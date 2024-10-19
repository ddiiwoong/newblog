"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[5942],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||s;return r?n.createElement(f,l(l({ref:t},u),{},{components:r})):n.createElement(f,l({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,l=new Array(s);l[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<s;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},95024:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return p}});var n=r(87462),a=r(63366),s=(r(67294),r(3905)),l=["components"],o={layout:"single",title:"Kubernetes Headless Service",comments:!0,classes:"wide",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/headless-service/",date:new Date("2024-10-06T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","headless-service","statefulset","redis"]},i=void 0,c={permalink:"/kubernetes/headless-service/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-10-06-headless.md",source:"@site/blog/2024-10-06-headless.md",title:"Kubernetes Headless Service",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",date:"2024-10-06T00:00:00.000Z",formattedDate:"October 6, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"headless-service",permalink:"/tags/headless-service"},{label:"statefulset",permalink:"/tags/statefulset"},{label:"redis",permalink:"/tags/redis"}],readingTime:13.36,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"Kubernetes Headless Service",comments:!0,classes:"wide",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/headless-service/",date:"2024-10-06T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","headless-service","statefulset","redis"]},prevItem:{title:"AWS Gateway API Controller",permalink:"/kubernetes/gatewayapi"},nextItem:{title:"ExternalDNS",permalink:"/kubernetes/externaldns/"}},u={authorsImageUrls:[void 0]},p=[{value:"Cloud Native \ud658\uacbd\uc5d0\uc11c\uc758 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac",id:"cloud-native-\ud658\uacbd\uc5d0\uc11c\uc758-\uc11c\ube44\uc2a4-\ub514\uc2a4\ucee4\ubc84\ub9ac",level:2},{value:"Headless Service",id:"headless-service",level:2}],d={toc:p};function m(e){var t=e.components,r=(0,a.Z)(e,l);return(0,s.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"cloud-native-\ud658\uacbd\uc5d0\uc11c\uc758-\uc11c\ube44\uc2a4-\ub514\uc2a4\ucee4\ubc84\ub9ac"},"Cloud Native \ud658\uacbd\uc5d0\uc11c\uc758 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac"),(0,s.kt)("p",null,"\uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \ud074\ub77c\uc6b0\ub4dc \ub124\uc774\ud2f0\ube0c \ud658\uacbd\uc5d0\uc11c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\ub4e4\uc774 \uc11c\ub85c\ub97c \uc778\uc2dd\ud558\uace0 \ud1b5\uc2e0\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\ub294 \ud575\uc2ec \uae30\ub2a5\uc774\ub2e4."),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ub3d9\uc801 \ud658\uacbd \uc9c0\uc6d0"),": \ud074\ub77c\uc6b0\ub4dc \ud658\uacbd\uc5d0\uc11c\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\uac00 \ub3d9\uc801\uc73c\ub85c \uc0dd\uc131\ub418\uac70\ub098 \uc0ad\uc81c\ub420 \uc218 \uc788\ub2e4. \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc774\ub7ec\ud55c \ubcc0\ud654\uc5d0 \uc989\uac01\uc801\uc73c\ub85c \ub300\uc751\ud558\uc5ec, \uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\uac00 \ucd94\uac00\ub418\uac70\ub098 \uae30\uc874 \uc778\uc2a4\ud134\uc2a4\uac00 \uc81c\uac70\ub420 \ub54c\uc5d0\ub3c4 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc6d0\ud65c\ud558\uac8c \uc791\ub3d9\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ubd80\ud558 \ubd84\uc0b0"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \ud1b5\ud574 \ud074\ub77c\uc774\uc5b8\ud2b8\ub294 \uc5ec\ub7ec \uc11c\ube44\uc2a4 \uc778\uc2a4\ud134\uc2a4 \uc911\uc5d0\uc11c \uc801\uc808\ud55c \uc778\uc2a4\ud134\uc2a4\ub97c \uc120\ud0dd\ud560 \uc218 \uc788\ub2e4. \uc774\ub97c \ud1b5\ud574 \ud2b8\ub798\ud53d\uc774 \uace0\ub974\uac8c \ubd84\uc0b0\ub418\uc5b4 \uc2dc\uc2a4\ud15c\uc758 \uc131\ub2a5\uacfc \uc548\uc815\uc131\uc744 \ub192\uc77c \uc218 \uc788\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\uc7a5\uc560 \ubcf5\uad6c"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc7a5\uc560\uac00 \ubc1c\uc0dd\ud55c \uc778\uc2a4\ud134\uc2a4\ub97c \uc790\ub3d9\uc73c\ub85c \uac10\uc9c0\ud558\uace0, \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \ub2e4\ub978 \uc815\uc0c1 \uc778\uc2a4\ud134\uc2a4\uc5d0 \uc5f0\uacb0\ud560 \uc218 \uc788\ub3c4\ub85d \ud574\uc11c \uac00\uc6a9\uc131\uc744 \ub192\uc778\ub2e4. ")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\uc720\uc9c0\ubcf4\uc218 \uc6a9\uc774\uc131"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \ud1b5\ud574 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\uac00 \uc11c\ub85c\ub97c \uc27d\uac8c \ucc3e\uc744 \uc218 \uc788\uc73c\ubbc0\ub85c, \uc2dc\uc2a4\ud15c\uc758 \uc720\uc9c0\ubcf4\uc218\uac00 \uc6a9\uc774\ud574\uc9c4\ub2e4. \uac1c\ubc1c\uc790\ub294 \uc11c\ube44\uc2a4\uc758 \uc704\uce58\ub098 \uc0c1\ud0dc\ub97c \uc2e0\uacbd \uc4f0\uc9c0 \uc54a\uace0, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \ube44\uc988\ub2c8\uc2a4 \ub85c\uc9c1\uc5d0 \uc9d1\uc911\ud560 \uc218 \uc788\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ud655\uc7a5\uc131"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc0c8\ub85c\uc6b4 \uc11c\ube44\uc2a4 \uc778\uc2a4\ud134\uc2a4\ub97c \ucd94\uac00\ud560 \ub54c, \uae30\uc874\uc758 \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \uc774\ub97c \uc790\ub3d9\uc73c\ub85c \uc778\uc2dd\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\uc5ec, \uc2dc\uc2a4\ud15c\uc758 \ud655\uc7a5\uc131\uc744 \uc9c0\uc6d0\ud55c\ub2e4. \uc774\ub294 \ube44\uc988\ub2c8\uc2a4 \uc694\uad6c\uc5d0 \ub530\ub77c \uc720\uc5f0\ud558\uac8c \ub9ac\uc18c\uc2a4\ub97c \uc870\uc815\ud560 \uc218 \uc788\uac8c \ud55c\ub2e4."))),(0,s.kt)("h2",{id:"headless-service"},"Headless Service"),(0,s.kt)("p",null,"Kubernetes Service\ub294 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc678\uc758 \ud30c\ub4dc(pod) \uac04 \ud1b5\uc2e0\uc744 \uc704\ud55c \uc911\uc694\ud55c \uc694\uc18c\uc774\ub2e4. \uc77c\ubc18\uc801\uc778 Service\ub294 \ud074\ub7ec\uc2a4\ud130 IP\uc640 \ub85c\ub4dc\ubc38\ub7f0\uc11c, \ub178\ub4dc\ud3ec\ub4dc \ub4f1\uc744 \ud1b5\ud574 \ud30c\ub4dc \ub0b4, \uc678\ubd80\uc758 \ud2b8\ub798\ud53d\uc744 \uad00\ub9ac\ud558\uc9c0\ub9cc, \ubaa8\ub4e0 \uc11c\ube44\uc2a4\uac00 \uc774\ub7f0 \ubc29\uc2dd\uc73c\ub85c \ub3d9\uc791\ud560 \ud544\uc694\ub294 \uc5c6\ub2e4. \ud2b9\ud788, ",(0,s.kt)("strong",{parentName:"p"},"\uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158"),"\uc774\ub098 \uac01 \ub178\ub4dc\uac00 \uace0\uc720\uc131\uc744 \uc720\uc9c0\ud574\uc57c \ud558\ub294 \ubd84\uc0b0 \uc2dc\uc2a4\ud15c\uc5d0\uc11c\ub294 ",(0,s.kt)("strong",{parentName:"p"},"Headless Service"),"\uac00 \ud544\uc218\uc801\uc774\ub2e4. "),(0,s.kt)("p",null,"Headless Service\ub294 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\uc758 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \uc218\ud589\ud55c\ub2e4. \ud074\ub7ec\uc2a4\ud130 IP\ub97c \uc0dd\uc131\ud558\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \uac01 \ud30c\ub4dc\ub294 \uace0\uc720\ud55c DNS \ub808\ucf54\ub4dc\ub97c \ud1b5\ud574 \uc11c\ub85c\ub97c \ubc1c\uacac\ud558\uace0 \uc9c1\uc811 \ud1b5\uc2e0\ud560 \uc218 \uc788\ub2e4. \uc774\ub294 \uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uac01 \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \uc720\uc9c0\ud558\uba74\uc11c\ub3c4 \uc11c\ub85c \uac04\uc758 \ud1b5\uc2e0\uc744 \uc6d0\ud65c\ud558\uac8c \ud560 \uc218 \uc788\ub3c4\ub85d \uc9c0\uc6d0\ud55c\ub2e4. \ub530\ub77c\uc11c, Headless Service\ub294 \ub3d9\uc801 \ud658\uacbd\uc5d0\uc11c \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \uac00\ub2a5\ud558\uac8c \ud558\uc5ec, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uc720\uc5f0\uc131\uacfc \ud655\uc7a5\uc131\uc744 \ub192\uc774\ub294 \ub370 \uae30\uc5ec\ud55c\ub2e4."),(0,s.kt)("p",null,"\uc774\ubc88 \ud3ec\uc2a4\ud305\uc5d0\uc11c\ub294 ",(0,s.kt)("strong",{parentName:"p"},"Kubernetes\uc758 Headless Service"),"\ub97c \uc124\uba85\ud558\uace0, \uc774\ub97c ",(0,s.kt)("strong",{parentName:"p"},"StatefulSet\uacfc \ud568\uaed8 \uc0ac\uc6a9\ud558\ub294 \uc2e4\uc81c \uc0ac\ub840"),"\ub97c \ud1b5\ud574 \ud65c\uc6a9 \ubc29\ubc95\uc744 \uc815\ub9ac\ud558\uace0\uc790 \ud55c\ub2e4. \uc544\uc6b8\ub7ec, \ucd5c\uadfc \uc2e4\ubb34\uc5d0\uc11c \ub9ce\uc774 \uc0ac\uc6a9\ub418\ub294 \ub3c4\uad6c\ub4e4\uc5d0\uc11c \ud65c\uc6a9\ud560 \uc218 \uc788\ub294 \uac04\ub2e8\ud55c \ucf54\ub4dc\ub85c \uc81c\uacf5\ud558\uc5ec, Kubernetes\uc5d0\uc11c stateful\ud55c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uc5b4\ub5bb\uac8c \ud6a8\uacfc\uc801\uc73c\ub85c \uc6b4\uc601\ud560 \uc218 \uc788\ub294\uc9c0\uc5d0 \ub300\ud574 \ub2e4\ub8ec\ub2e4."))}m.isMDXComponent=!0}}]);