"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[1591],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),c=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,v=u["".concat(o,".").concat(m)]||u[m]||d[m]||s;return n?r.createElement(v,l(l({ref:t},p),{},{components:n})):r.createElement(v,l({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,l=new Array(s);l[0]=u;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var c=2;c<s;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},57181:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return d}});var r=n(87462),a=n(63366),s=(n(67294),n(3905)),l=["components"],i={layout:"single",title:"Kubernetes Headless Service",comments:!0,classes:"wide",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/headless-service/",date:new Date("2024-10-06T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","headless-service","statefulset","redis"]},o=void 0,c={permalink:"/kubernetes/headless-service/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-10-06-headless.md",source:"@site/blog/2024-10-06-headless.md",title:"Kubernetes Headless Service",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",date:"2024-10-06T00:00:00.000Z",formattedDate:"October 6, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"headless-service",permalink:"/tags/headless-service"},{label:"statefulset",permalink:"/tags/statefulset"},{label:"redis",permalink:"/tags/redis"}],readingTime:13.36,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"Kubernetes Headless Service",comments:!0,classes:"wide",description:"Kubernetes Headless Service \uac1c\ub150 \ubc0f \uc0ac\uc6a9 \uc0ac\ub840",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/headless-service/",date:"2024-10-06T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","headless-service","statefulset","redis"]},prevItem:{title:"AWS Gateway API Controller",permalink:"/kubernetes/gatewayapi"},nextItem:{title:"ExternalDNS",permalink:"/kubernetes/externaldns/"}},p={authorsImageUrls:[void 0]},d=[{value:"Cloud Native \ud658\uacbd\uc5d0\uc11c\uc758 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac",id:"cloud-native-\ud658\uacbd\uc5d0\uc11c\uc758-\uc11c\ube44\uc2a4-\ub514\uc2a4\ucee4\ubc84\ub9ac",level:2},{value:"Headless Service",id:"headless-service",level:2},{value:"Service\uc758 \uc5ed\ud560",id:"service\uc758-\uc5ed\ud560",level:3},{value:"Headless Service\uc758 \uc8fc\uc694 \ud2b9\uc9d5",id:"headless-service\uc758-\uc8fc\uc694-\ud2b9\uc9d5",level:3},{value:"Headless Service \uc0ac\uc6a9 \uc0ac\ub840",id:"headless-service-\uc0ac\uc6a9-\uc0ac\ub840",level:2},{value:"\ubd84\uc0b0 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c\uc758 \ud65c\uc6a9",id:"\ubd84\uc0b0-\ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c\uc758-\ud65c\uc6a9",level:3},{value:"Redis\uc640 Headless Service",id:"redis\uc640-headless-service",level:3},{value:"Redis \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131 \uc608\uc2dc",id:"redis-\ud074\ub7ec\uc2a4\ud130-\uad6c\uc131-\uc608\uc2dc",level:3},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:3}],u={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,l);return(0,s.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"cloud-native-\ud658\uacbd\uc5d0\uc11c\uc758-\uc11c\ube44\uc2a4-\ub514\uc2a4\ucee4\ubc84\ub9ac"},"Cloud Native \ud658\uacbd\uc5d0\uc11c\uc758 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac"),(0,s.kt)("p",null,"\uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \ud074\ub77c\uc6b0\ub4dc \ub124\uc774\ud2f0\ube0c \ud658\uacbd\uc5d0\uc11c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\ub4e4\uc774 \uc11c\ub85c\ub97c \uc778\uc2dd\ud558\uace0 \ud1b5\uc2e0\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\ub294 \ud575\uc2ec \uae30\ub2a5\uc774\ub2e4."),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ub3d9\uc801 \ud658\uacbd \uc9c0\uc6d0"),": \ud074\ub77c\uc6b0\ub4dc \ud658\uacbd\uc5d0\uc11c\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\uac00 \ub3d9\uc801\uc73c\ub85c \uc0dd\uc131\ub418\uac70\ub098 \uc0ad\uc81c\ub420 \uc218 \uc788\ub2e4. \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc774\ub7ec\ud55c \ubcc0\ud654\uc5d0 \uc989\uac01\uc801\uc73c\ub85c \ub300\uc751\ud558\uc5ec, \uc0c8\ub85c\uc6b4 \uc778\uc2a4\ud134\uc2a4\uac00 \ucd94\uac00\ub418\uac70\ub098 \uae30\uc874 \uc778\uc2a4\ud134\uc2a4\uac00 \uc81c\uac70\ub420 \ub54c\uc5d0\ub3c4 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc6d0\ud65c\ud558\uac8c \uc791\ub3d9\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ubd80\ud558 \ubd84\uc0b0"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \ud1b5\ud574 \ud074\ub77c\uc774\uc5b8\ud2b8\ub294 \uc5ec\ub7ec \uc11c\ube44\uc2a4 \uc778\uc2a4\ud134\uc2a4 \uc911\uc5d0\uc11c \uc801\uc808\ud55c \uc778\uc2a4\ud134\uc2a4\ub97c \uc120\ud0dd\ud560 \uc218 \uc788\ub2e4. \uc774\ub97c \ud1b5\ud574 \ud2b8\ub798\ud53d\uc774 \uace0\ub974\uac8c \ubd84\uc0b0\ub418\uc5b4 \uc2dc\uc2a4\ud15c\uc758 \uc131\ub2a5\uacfc \uc548\uc815\uc131\uc744 \ub192\uc77c \uc218 \uc788\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\uc7a5\uc560 \ubcf5\uad6c"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc7a5\uc560\uac00 \ubc1c\uc0dd\ud55c \uc778\uc2a4\ud134\uc2a4\ub97c \uc790\ub3d9\uc73c\ub85c \uac10\uc9c0\ud558\uace0, \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \ub2e4\ub978 \uc815\uc0c1 \uc778\uc2a4\ud134\uc2a4\uc5d0 \uc5f0\uacb0\ud560 \uc218 \uc788\ub3c4\ub85d \ud574\uc11c \uac00\uc6a9\uc131\uc744 \ub192\uc778\ub2e4. ")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\uc720\uc9c0\ubcf4\uc218 \uc6a9\uc774\uc131"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \ud1b5\ud574 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uad6c\uc131 \uc694\uc18c\uac00 \uc11c\ub85c\ub97c \uc27d\uac8c \ucc3e\uc744 \uc218 \uc788\uc73c\ubbc0\ub85c, \uc2dc\uc2a4\ud15c\uc758 \uc720\uc9c0\ubcf4\uc218\uac00 \uc6a9\uc774\ud574\uc9c4\ub2e4. \uac1c\ubc1c\uc790\ub294 \uc11c\ube44\uc2a4\uc758 \uc704\uce58\ub098 \uc0c1\ud0dc\ub97c \uc2e0\uacbd \uc4f0\uc9c0 \uc54a\uace0, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \ube44\uc988\ub2c8\uc2a4 \ub85c\uc9c1\uc5d0 \uc9d1\uc911\ud560 \uc218 \uc788\ub2e4.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"\ud655\uc7a5\uc131"),": \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub294 \uc0c8\ub85c\uc6b4 \uc11c\ube44\uc2a4 \uc778\uc2a4\ud134\uc2a4\ub97c \ucd94\uac00\ud560 \ub54c, \uae30\uc874\uc758 \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \uc774\ub97c \uc790\ub3d9\uc73c\ub85c \uc778\uc2dd\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\uc5ec, \uc2dc\uc2a4\ud15c\uc758 \ud655\uc7a5\uc131\uc744 \uc9c0\uc6d0\ud55c\ub2e4. \uc774\ub294 \ube44\uc988\ub2c8\uc2a4 \uc694\uad6c\uc5d0 \ub530\ub77c \uc720\uc5f0\ud558\uac8c \ub9ac\uc18c\uc2a4\ub97c \uc870\uc815\ud560 \uc218 \uc788\uac8c \ud55c\ub2e4."))),(0,s.kt)("h2",{id:"headless-service"},"Headless Service"),(0,s.kt)("p",null,"Kubernetes Service\ub294 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc678\uc758 \ud30c\ub4dc(pod) \uac04 \ud1b5\uc2e0\uc744 \uc704\ud55c \uc911\uc694\ud55c \uc694\uc18c\uc774\ub2e4. \uc77c\ubc18\uc801\uc778 Service\ub294 \ud074\ub7ec\uc2a4\ud130 IP\uc640 \ub85c\ub4dc\ubc38\ub7f0\uc11c, \ub178\ub4dc\ud3ec\ub4dc \ub4f1\uc744 \ud1b5\ud574 \ud30c\ub4dc \ub0b4, \uc678\ubd80\uc758 \ud2b8\ub798\ud53d\uc744 \uad00\ub9ac\ud558\uc9c0\ub9cc, \ubaa8\ub4e0 \uc11c\ube44\uc2a4\uac00 \uc774\ub7f0 \ubc29\uc2dd\uc73c\ub85c \ub3d9\uc791\ud560 \ud544\uc694\ub294 \uc5c6\ub2e4. \ud2b9\ud788, ",(0,s.kt)("strong",{parentName:"p"},"\uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158"),"\uc774\ub098 \uac01 \ub178\ub4dc\uac00 \uace0\uc720\uc131\uc744 \uc720\uc9c0\ud574\uc57c \ud558\ub294 \ubd84\uc0b0 \uc2dc\uc2a4\ud15c\uc5d0\uc11c\ub294 ",(0,s.kt)("strong",{parentName:"p"},"Headless Service"),"\uac00 \ud544\uc218\uc801\uc774\ub2e4. "),(0,s.kt)("p",null,"Headless Service\ub294 \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\uc758 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \uc218\ud589\ud55c\ub2e4. \ud074\ub7ec\uc2a4\ud130 IP\ub97c \uc0dd\uc131\ud558\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \uac01 \ud30c\ub4dc\ub294 \uace0\uc720\ud55c DNS \ub808\ucf54\ub4dc\ub97c \ud1b5\ud574 \uc11c\ub85c\ub97c \ubc1c\uacac\ud558\uace0 \uc9c1\uc811 \ud1b5\uc2e0\ud560 \uc218 \uc788\ub2e4. \uc774\ub294 \uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uac01 \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \uc720\uc9c0\ud558\uba74\uc11c\ub3c4 \uc11c\ub85c \uac04\uc758 \ud1b5\uc2e0\uc744 \uc6d0\ud65c\ud558\uac8c \ud560 \uc218 \uc788\ub3c4\ub85d \uc9c0\uc6d0\ud55c\ub2e4. \ub530\ub77c\uc11c, Headless Service\ub294 \ub3d9\uc801 \ud658\uacbd\uc5d0\uc11c \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac\ub97c \uac00\ub2a5\ud558\uac8c \ud558\uc5ec, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uc720\uc5f0\uc131\uacfc \ud655\uc7a5\uc131\uc744 \ub192\uc774\ub294 \ub370 \uae30\uc5ec\ud55c\ub2e4."),(0,s.kt)("p",null,"\uc774\ubc88 \ud3ec\uc2a4\ud305\uc5d0\uc11c\ub294 ",(0,s.kt)("strong",{parentName:"p"},"Kubernetes\uc758 Headless Service"),"\ub97c \uc124\uba85\ud558\uace0, \uc774\ub97c ",(0,s.kt)("strong",{parentName:"p"},"StatefulSet\uacfc \ud568\uaed8 \uc0ac\uc6a9\ud558\ub294 \uc2e4\uc81c \uc0ac\ub840"),"\ub97c \ud1b5\ud574 \ud65c\uc6a9 \ubc29\ubc95\uc744 \uc815\ub9ac\ud558\uace0\uc790 \ud55c\ub2e4. \uc544\uc6b8\ub7ec, \ucd5c\uadfc \uc2e4\ubb34\uc5d0\uc11c \ub9ce\uc774 \uc0ac\uc6a9\ub418\ub294 \ub3c4\uad6c\ub4e4\uc5d0\uc11c \ud65c\uc6a9\ud560 \uc218 \uc788\ub294 \uac04\ub2e8\ud55c \ucf54\ub4dc\ub85c \uc81c\uacf5\ud558\uc5ec, Kubernetes\uc5d0\uc11c stateful\ud55c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uc5b4\ub5bb\uac8c \ud6a8\uacfc\uc801\uc73c\ub85c \uc6b4\uc601\ud560 \uc218 \uc788\ub294\uc9c0\uc5d0 \ub300\ud574 \ub2e4\ub8ec\ub2e4."),(0,s.kt)("h3",{id:"service\uc758-\uc5ed\ud560"},"Service\uc758 \uc5ed\ud560"),(0,s.kt)("p",null,"Kubernetes\uc758 Service\ub294 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc758 \ud30c\ub4dc \uac04 \ud1b5\uc2e0\uc744 \uac00\ub2a5\ud558\uac8c \ud558\uace0, \uc678\ubd80 \ud2b8\ub798\ud53d\uc774 \ud074\ub7ec\uc2a4\ud130 \ub0b4\ubd80\uc5d0 \uc788\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0 \uc811\uadfc\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\ub294 \ud575\uc2ec \ucef4\ud3ec\ub10c\ud2b8\uc774\ub2e4. \uc77c\ubc18\uc801\uc73c\ub85c Service\ub294 \ub85c\ub4dc\ubc38\ub7f0\uc11c\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud30c\ub4dc \uac04\uc758 \ud2b8\ub798\ud53d\uc744 \ubd84\uc0b0\ud558\uc9c0\ub9cc, Headless Service\ub294 \uc774\uc640\ub294 \ub2e4\ub974\uac8c \ub3d9\uc791\ud55c\ub2e4."),(0,s.kt)("h3",{id:"headless-service\uc758-\uc8fc\uc694-\ud2b9\uc9d5"},"Headless Service\uc758 \uc8fc\uc694 \ud2b9\uc9d5"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Headless Service"),"\ub294 \ud074\ub7ec\uc2a4\ud130 IP\ub97c \uc0dd\uc131\ud558\uc9c0 \uc54a\uc73c\uba70, Kubernetes DNS \uc2dc\uc2a4\ud15c\uc744 \uc0ac\uc6a9\ud558\uc5ec \ud30c\ub4dc \uac04\uc758 \uc9c1\uc811\uc801\uc778 \ud1b5\uc2e0\uc744 \uac00\ub2a5\ud558\uac8c \ud55c\ub2e4. \uc774\ub294 \uc0c1\ud0dc\ub97c \uac00\uc9c4 \uc560\ud50c\ub9ac\ucf00\uc774\uc158, \uc989 \uac01 \ud30c\ub4dc\uac00 \uace0\uc720\ud55c ID\uc640 \uc0c1\ud0dc\ub97c \uc720\uc9c0\ud574\uc57c \ud558\ub294 \uacbd\uc6b0\uc5d0 \ub9e4\uc6b0 \uc720\uc6a9\ud558\ub2e4. \uc8fc\ub85c \ub370\uc774\ud130\ubca0\uc774\uc2a4, \ubd84\uc0b0 \uc2dc\uc2a4\ud15c, \uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c \uc8fc\ub85c \uc0ac\uc6a9\ub41c\ub2e4. \ub808\ud50c\ub9ac\uce74\uc14b\uc744 \ud1b5\ud574 \uc0dd\uc131\ub41c \uc2a4\ud14c\uc774\ud2b8\ub9ac\uc2a4 \ud30c\ub4dc\ub294 \ub3d9\uc77c\ud55c \uac83\uc73c\ub85c \uac04\uc8fc\ub418\uba70, \uc694\uccad\uc774 \uc5b4\ub290 \ucabd\uc5d0 \ub3c4\ucc29\ud558\ub294\uc9c0\ub294 \uc911\uc694\ud558\uc9c0 \uc54a\ub2e4, \ub530\ub77c\uc11c \uc77c\ubc18 \uc11c\ube44\uc2a4 \ud615\ud0dc\ub85c \ub85c\ub4dc \ubc38\ub7f0\uc2f1\uc774 \uc774\ub8e8\uc5b4\uc9c4\ub2e4. \uadf8\ub7ec\ub098 \uc2a4\ud14c\uc774\ud2b8\ud480 \ud30c\ub4dc\ub294 \uc11c\ub85c \ub2e4\ub974\uba70, \ud2b9\uc815 \ud30c\ub4dc\uc758 \uc88c\ud45c\ub85c \ud2b9\uc815 \ud30c\ub4dc\uc5d0 \ub3c4\ub2ec\ud574\uc57c \ud558\ub294 \uacbd\uc6b0\uac00 \ub9ce\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: redis\nspec:\n  clusterIP: None\n  selector:\n    app: redis\n  ports:\n    - name: http\n      port: 8080\n")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Cluster IP \uc5c6\uc74c"),": Headless Service\ub294 \ud074\ub7ec\uc2a4\ud130 IP\ub97c \ud560\ub2f9\ud558\uc9c0 \uc54a\uc73c\uba70, \uac01 \ud30c\ub4dc\uac00 \uc9c1\uc811 DNS \ub808\ucf54\ub4dc\ub97c \ud1b5\ud574 \uc811\uadfc\ub41c\ub2e4. \uc774\ub294 kube-proxy\uac00 \uc11c\ube44\uc2a4\ub97c \ucc98\ub9ac\ud558\uc9c0 \uc54a\uace0 \ud074\ub7ec\uc2a4\ud130 IP \ud560\ub2f9\uc774\ub098 \ub85c\ub4dc \ubc38\ub7f0\uc2f1\uc744 \uc6d0\ud558\uc9c0 \uc54a\ub294\ub2e4\ub294 \uac83\uc744 \uc758\ubbf8\ud55c\ub2e4. "),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"DNS \uae30\ubc18 \uc11c\ube44\uc2a4 \ubc1c\uacac"),": \ud30c\ub4dc\ub4e4\uc740 DNS \ucffc\ub9ac\ub97c \ud1b5\ud574 \uc11c\ub85c\ub97c \ubc1c\uacac\ud558\uace0, \ud30c\ub4dc\uc758 \uac1c\ubcc4 IP\ub97c \uc9c1\uc811 \uc870\ud68c\ud558\uc5ec \ud1b5\uc2e0\ud560 \uc218 \uc788\ub2e4."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"StatefulSet\uacfc\uc758 \ud1b5\ud569"),": Headless Service\ub294 ",(0,s.kt)("strong",{parentName:"li"},"StatefulSet"),"\uacfc \uc790\uc8fc \uacb0\ud569\ub418\uc5b4 \uc0ac\uc6a9\ub418\uba70, \uc0c1\ud0dc\ub97c \uac00\uc9c4 \ud30c\ub4dc\uac00 \uace0\uc720\ud55c \ub124\ud2b8\uc6cc\ud06c ID\ub97c \uac00\uc9c8 \uc218 \uc788\ub3c4\ub85d \uc9c0\uc6d0\ud55c\ub2e4."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Selector \uc0ac\uc6a9"),": Headless Service\ub294 selector(\uc120\ud0dd\uc790)\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud2b9\uc815 \ud30c\ub4dc\uc5d0 \ub300\ud55c \uc811\uadfc\uc744 \uac00\ub2a5\ud558\uac8c \ud55c\ub2e4. \uc774\ub7ec\ud55c \uc11c\ube44\uc2a4\ub294 API \uc11c\ubc84\uc5d0 \uc5d4\ub4dc\ud3ec\uc778\ud2b8 \ub808\ucf54\ub4dc\ub97c \uc0dd\uc131\ud558\uace0, \uc11c\ube44\uc2a4\uc5d0 \uc5f0\uacb0\ub41c \ud30c\ub4dc\ub97c \uac00\ub9ac\ud0a4\ub294 A \ub808\ucf54\ub4dc(\uc8fc\uc18c)\ub97c \ubc18\ud658\ud558\ub294 DNS \ud56d\ubaa9\uc744 \uc0dd\uc131\ud55c\ub2e4. \uac04\ub2e8\ud788 \ub9d0\ud574, \uac01 \ud30c\ub4dc\ub294 \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \uc608\uce21 \uac00\ub2a5\ud55c \ubc29\uc2dd\uc73c\ub85c \uc9c1\uc811 \uc811\uadfc\ud560 \uc218 \uc788\ub294 DNS \ud56d\ubaa9\uc744 \uac16\uac8c \ub41c\ub2e4. \uc608\ub97c \ub4e4\uc5b4, \uc6b0\ub9ac\uc758 redis \uc11c\ube44\uc2a4\uac00 ",(0,s.kt)("inlineCode",{parentName:"li"},"default")," \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc5d0 \uc18d\ud55c\ub2e4\uba74, StatefulSet\uc758 \ud30c\ub4dc \uc774\ub984\uc740 redis-0, redis-1 \uc774\ub7f0\uc2dd\uc73c\ub85c \uc81c\uacf5\ub418\uac8c \ub418\ub294\ub370 redis-0 \ud30c\ub4dc\uc5d0 \uc811\uadfc\ud558\uae30 \uc704\ud574\uc11c\ub294 FQDN\uc778 ",(0,s.kt)("inlineCode",{parentName:"li"},"redis-0.redis.default.svc.cluster.local")," \ucc98\ub7fc \ud30c\ub4dc\uc758 \uc774\ub984\uc744 \uc11c\ube44\uc2a4 \uc774\ub984 \uc55e\uc5d0 \ubd99\uc5ec\uc11c \uc0ac\uc6a9\ud55c\ub2e4.")),(0,s.kt)("h2",{id:"headless-service-\uc0ac\uc6a9-\uc0ac\ub840"},"Headless Service \uc0ac\uc6a9 \uc0ac\ub840"),(0,s.kt)("p",null,"\ucd5c\uadfc\uc758 Cloud Native \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c\ub294 \ubd84\uc0b0 \ub370\uc774\ud130\ubca0\uc774\uc2a4, \uba54\uc2dc\uc9c0 \ube0c\ub85c\ucee4, \ucee8\ud14c\uc774\ub108\ud654\ub41c \uc2a4\ud1a0\ub9ac\uc9c0 \uc2dc\uc2a4\ud15c \ub4f1\uc758 \uad6c\ucd95\uc774 \ud65c\ubc1c\ud788 \uc774\ub8e8\uc5b4\uc9c0\uace0 \uc788\ub2e4. \uc774\ub7ec\ud55c \uc2dc\uc2a4\ud15c\uc740 \uace0\uc720\ud55c \ub124\ud2b8\uc6cc\ud06c \uc2dd\ubcc4\uc790\uc640 \uc0c1\ud0dc \uc720\uc9c0\uac00 \ud544\uc218\uc801\uc774\ub2e4. Headless Service\ub294 \uc774\ub7ec\ud55c \uc694\uad6c\uc0ac\ud56d\uc744 \ub9cc\uc871\uc2dc\ud0a4\ub294 \uac00\uc7a5 \uc774\uc0c1\uc801\uc778 Kubernetes \uc11c\ube44\uc2a4 \ud0c0\uc785\uc774\ub2e4."),(0,s.kt)("p",null,"DevOps\uc640 SRE \ud658\uacbd\uc5d0\uc11c\uc758 \uc11c\ube44\uc2a4\ub294 \ud655\uc7a5\uc131\uacfc \uace0\uac00\uc6a9\uc131\uc744 \uae30\ubc18\uc73c\ub85c \ud574\uc57c \ud55c\ub2e4. Headless Service\ub294 \uc774\ub7ec\ud55c \uc2dc\uc2a4\ud15c \uad6c\ucd95\uc5d0 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \ud55c\ub2e4. \ud2b9\ud788 ",(0,s.kt)("strong",{parentName:"p"},"\ubd84\uc0b0 \ub370\uc774\ud130\ubca0\uc774\uc2a4"),", ",(0,s.kt)("strong",{parentName:"p"},"\uba54\uc2dc\uc9c0 \ube0c\ub85c\ucee4"),", ",(0,s.kt)("strong",{parentName:"p"},"\ucee8\ud14c\uc774\ub108\ud654\ub41c \uc2a4\ud1a0\ub9ac\uc9c0")," \ub4f1 \ub2e4\uc591\ud55c \ud074\ub77c\uc6b0\ub4dc \ub124\uc774\ud2f0\ube0c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c \ud30c\ub4dc \uac04\uc758 \uc9c1\uc811 \ud1b5\uc2e0\uc744 \uac00\ub2a5\ud558\uac8c \ud568\uc73c\ub85c\uc368, \ub354 \ub098\uc740 \uad00\ub9ac\uc131\uacfc \uc131\ub2a5\uc744 \uc81c\uacf5\ud55c\ub2e4."),(0,s.kt)("h3",{id:"\ubd84\uc0b0-\ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c\uc758-\ud65c\uc6a9"},"\ubd84\uc0b0 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c\uc758 \ud65c\uc6a9"),(0,s.kt)("p",null,"\ucd5c\uadfc \ub9ce\uc740 \uc5d4\ud130\ud504\ub77c\uc774\uc988 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 ",(0,s.kt)("strong",{parentName:"p"},"Cassandra"),", ",(0,s.kt)("strong",{parentName:"p"},"CockroachDB"),"\uc640 \uac19\uc740 \ubd84\uc0b0 \ub370\uc774\ud130\ubca0\uc774\uc2a4 \uc2dc\uc2a4\ud15c\uc744 \uc0ac\uc6a9\ud558\uace0 \uc788\ub2e4. \uc774\ub4e4 \uc2dc\uc2a4\ud15c\uc740 \uace0\uac00\uc6a9\uc131\uc744 \uc720\uc9c0\ud558\uba74\uc11c\ub3c4 \uc5ec\ub7ec \ub178\ub4dc\uc5d0 \ub370\uc774\ud130\ub97c \ubd84\uc0b0 \uc800\uc7a5\ud558\uace0 \ub3d9\uae30\ud654\ud574\uc57c \ud558\ubbc0\ub85c, Headless Service\uc640 StatefulSet\uc744 \ud568\uaed8 \uc0ac\uc6a9\ud558\uc5ec \uc774\ub7ec\ud55c \uc694\uad6c\ub97c \ucda9\uc871\ud560 \uc218 \uc788\ub2e4."),(0,s.kt)("h3",{id:"redis\uc640-headless-service"},"Redis\uc640 Headless Service"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Redis"),"\ub294 \uc778\uba54\ubaa8\ub9ac \ub370\uc774\ud130 \uad6c\uc870 \uc800\uc7a5\uc18c\ub85c, \uace0\uc18d \ub370\uc774\ud130 \uc811\uadfc\uc774 \ud544\uc694\ud55c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c \uc790\uc8fc \uc0ac\uc6a9\ub41c\ub2e4. Redis \ud074\ub7ec\uc2a4\ud130\ub294 \uac01 \ub178\ub4dc\uac00 \uace0\uc720\ud55c \ub124\ud2b8\uc6cc\ud06c \uc2dd\ubcc4\uc790\uc640 \uc0c1\ud0dc\ub97c \uc720\uc9c0\ud574\uc57c \ud558\uba70, \uc774\ub97c \uc704\ud574 Headless Service\uac00 \ud6a8\uacfc\uc801\uc73c\ub85c \uc0ac\uc6a9\ub41c\ub2e4."),(0,s.kt)("h3",{id:"redis-\ud074\ub7ec\uc2a4\ud130-\uad6c\uc131-\uc608\uc2dc"},"Redis \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131 \uc608\uc2dc"),(0,s.kt)("p",null,"\ub2e4\uc74c\uc740 Redis \ud074\ub7ec\uc2a4\ud130\ub97c Kubernetes\uc5d0\uc11c \uad6c\uc131\ud558\ub294 Headless Service\uc640 StatefulSet\uc758 \uc608\uc2dc\uc774\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: redis\n  labels:\n    app: redis\nspec:\n  clusterIP: None\n  selector:\n    app: redis\n  ports:\n    - port: 6379\n      name: redis\n")),(0,s.kt)("p",null,"\uc774 \uc608\uc2dc\ub294 Redis\ub97c \uc704\ud55c Headless Service \uc815\uc758\uc774\ub2e4. ",(0,s.kt)("inlineCode",{parentName:"p"},"clusterIP: None"),"\uc73c\ub85c \uc124\uc815\ud568\uc73c\ub85c\uc368 \uac01 Redis \ub178\ub4dc\uac00 \uace0\uc720\ud55c IP \uc8fc\uc18c\ub97c \ud1b5\ud574 DNS\uc5d0 \ub4f1\ub85d\ub41c\ub2e4."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"StatefulSet\uacfc\uc758 \uacb0\ud569")),(0,s.kt)("p",null,"Redis \ud074\ub7ec\uc2a4\ud130\uc758 StatefulSet \uc815\uc758\ub294 \uac01 \ub178\ub4dc\uac00 \uace0\uc720\ud55c \ub124\ud2b8\uc6cc\ud06c ID\ub97c \uc720\uc9c0\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: redis\nspec:\n  serviceName: "redis" ## \uc2a4\ud14c\uc774\ud2b8\ud480\uc14b\uc5d0 \uc0ac\uc6a9\ud560 \ud5e4\ub4dc\ub9ac\uc2a4 \uc11c\ube44\uc2a4 \uc774\ub984 \uc9c0\uc815\n  replicas: 2\n  selector:\n    matchLabels:\n      app: redis\n  template:\n    metadata:\n      labels:\n        app: redis\n    spec:\n      containers:\n      - name: redis\n        image: redis:latest\n        ports:\n        - containerPort: 6379\n          name: redis\n')),(0,s.kt)("p",null,"\uc774 \uc608\uc2dc\ub294 \uac01 Redis \ub178\ub4dc\uac00 \uace0\uc720\ud55c DNS \ub808\ucf54\ub4dc\ub97c \ud1b5\ud574 \uc11c\ub85c \ud1b5\uc2e0\ud560 \uc218 \uc788\ub3c4\ub85d StatefulSet\uacfc Headless Service\ub97c \ud1b5\ud569\ud55c \uac83\uc774\ub2e4. \uc774\ub97c \ud1b5\ud574 \uac01 \ub178\ub4dc\ub294 \ub3c5\ub9bd\uc801\uc73c\ub85c \uc0c1\ud0dc\ub97c \uc720\uc9c0\ud558\uba74\uc11c\ub3c4 \ud074\ub7ec\uc2a4\ud130 \ud658\uacbd\uc5d0\uc11c \ub3d9\uc791\ud560 \uc218 \uc788\ub2e4. \uc790\uc138\ud788 \ubcf4\uba74 ",(0,s.kt)("inlineCode",{parentName:"p"},".spec.serviceName"),"\uc5d0 StatefulSet\uc5d0 \uc0ac\uc6a9\ud560 Headless Service \uc774\ub984\uc744 \uc9c0\uc815\ud55c \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,s.kt)("p",null,"\ud574\ub2f9 \ub9ac\uc18c\uc2a4\ub97c \uc0dd\uc131\ud558\uba74 0\ubd80\ud130 \uc21c\uc11c\ub300\ub85c \uc778\ub371\uc2a4\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl get pod -o wide\nNAME      READY   STATUS    RESTARTS   AGE   IP            NODE                 NOMINATED NODE   READINESS GATES\nredis-0   1/1     Running   0          35m   10.244.0.14   kind-control-plane   <none>           <none>\nredis-1   1/1     Running   0          35m   10.244.0.15   kind-control-plane   <none>           <none>\n")),(0,s.kt)("p",null,"\uc784\uc2dc\ub85c ",(0,s.kt)("inlineCode",{parentName:"p"},"netshoot")," \ud30c\ub4dc\ub97c \uc2e4\ud589\ud574\uc11c Headless Service\uc758 FQDN \uc774\ub984\uc73c\ub85c DNS\uc9c8\uc758\ub97c \ud574\ubcf4\uba74 ClusterIP\uac00 \uc544\ub2cc \uac01 \ud30c\ub4dc\uc758 IP\ub85c \uc751\ub2f5\ud558\ub294 \uac83\uc744 \uc54c \uc218 \uc788\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot -- sh\n~ # host redis-0.redis.default\nredis-0.redis.default.svc.cluster.local has address 10.244.0.14\n~ # host redis-1.redis.default\nredis-1.redis.default.svc.cluster.local has address 10.244.0.15\n")),(0,s.kt)("h3",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,s.kt)("p",null,"Kubernetes\uc758 Headless Service\ub294 \uc0c1\ud0dc \uae30\ubc18 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c \uac01 \ud30c\ub4dc \uac04\uc758 \uc9c1\uc811\uc801\uc778 \ud1b5\uc2e0\uc744 \uac00\ub2a5\ud558\uac8c \ud558\uc5ec, DevOps \ubc0f SRE \ud658\uacbd\uc5d0\uc11c \ubd84\uc0b0 \uc2dc\uc2a4\ud15c \uad6c\ucd95\uc5d0 \uc911\uc694\ud55c \ub3c4\uad6c\ub85c \uc0ac\uc6a9\ub41c\ub2e4. \uc774 \ud3ec\uc2a4\ud2b8\uc5d0\uc11c\ub294 Headless Service\uc758 \uac1c\ub150\uacfc \ud568\uaed8, Redis\ub97c \uc608\uc2dc\ub85c \uc2e4\uc81c \ubd84\uc0b0 \uc2dc\uc2a4\ud15c\uc5d0\uc11c\uc758 \ud65c\uc6a9 \uc0ac\ub840\ub97c \uac04\ub2e8\ud558\uac8c \uc0b4\ud3b4\ubd24\ub2e4."))}m.isMDXComponent=!0}}]);