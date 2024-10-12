"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[2363],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return k}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),p=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(a),k=r,w=m["".concat(o,".").concat(k)]||m[k]||u[k]||l;return a?n.createElement(w,i(i({ref:t},c),{},{components:a})):n.createElement(w,i({ref:t},c))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},28431:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return o},default:function(){return k},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var n=a(87462),r=a(63366),l=(a(67294),a(3905)),i=["components"],s={layout:"single",title:"AWS Gateway API Controller",comments:!0,classes:"wide",description:"Gateway API\uc758 \uc774\ud574\uc640 Lattice\ub97c \ud1b5\ud574 AWS Gateway API Controller \uc0ac\uc6a9\ud558\uae30",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/gatewayapi",date:new Date("2024-10-13T00:00:00.000Z"),categories:["Kubernetes"],tags:["Gateway API","AWS Gateway API Controller","Kubernetes","Microservices","API Management","Lattice","EKS"]},o=void 0,p={permalink:"/kubernetes/gatewayapi",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-10-13-gatewayapi.md",source:"@site/blog/2024-10-13-gatewayapi.md",title:"AWS Gateway API Controller",description:"Gateway API\uc758 \uc774\ud574\uc640 Lattice\ub97c \ud1b5\ud574 AWS Gateway API Controller \uc0ac\uc6a9\ud558\uae30",date:"2024-10-13T00:00:00.000Z",formattedDate:"October 13, 2024",tags:[{label:"Gateway API",permalink:"/tags/gateway-api"},{label:"AWS Gateway API Controller",permalink:"/tags/aws-gateway-api-controller"},{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"Microservices",permalink:"/tags/microservices"},{label:"API Management",permalink:"/tags/api-management"},{label:"Lattice",permalink:"/tags/lattice"},{label:"EKS",permalink:"/tags/eks"}],readingTime:16.225,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"AWS Gateway API Controller",comments:!0,classes:"wide",description:"Gateway API\uc758 \uc774\ud574\uc640 Lattice\ub97c \ud1b5\ud574 AWS Gateway API Controller \uc0ac\uc6a9\ud558\uae30",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/gatewayapi",date:"2024-10-13T00:00:00.000Z",categories:["Kubernetes"],tags:["Gateway API","AWS Gateway API Controller","Kubernetes","Microservices","API Management","Lattice","EKS"]},nextItem:{title:"Kubernetes Headless Service",permalink:"/kubernetes/headless-service/"}},c={authorsImageUrls:[void 0]},u=[{value:"Gateway API \uc774\ud574\ud558\uae30",id:"gateway-api-\uc774\ud574\ud558\uae30",level:2},{value:"\ub9ac\uc18c\uc2a4 \ubaa8\ub378",id:"\ub9ac\uc18c\uc2a4-\ubaa8\ub378",level:3},{value:"<strong>GatewayClass</strong>",id:"gatewayclass",level:4},{value:"<strong>Gateway</strong>",id:"gateway",level:4},{value:"<strong>HTTPRoute</strong>",id:"httproute",level:4},{value:"AWS Gateway API Controller",id:"aws-gateway-api-controller",level:2},{value:"Components",id:"components",level:2},{value:"VPC Lattice\uc640 Kubernetes \uac04\uc758 \uad00\uacc4",id:"vpc-lattice\uc640-kubernetes-\uac04\uc758-\uad00\uacc4",level:2},{value:"AWS Gateway API Controller \uc124\uce58",id:"aws-gateway-api-controller-\uc124\uce58",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"VPC Lattice\ub85c\ubd80\ud130 \ud2b8\ub798\ud53d \ud5c8\uc6a9",id:"vpc-lattice\ub85c\ubd80\ud130-\ud2b8\ub798\ud53d-\ud5c8\uc6a9",level:3},{value:"Controller \uc124\uce58",id:"controller-\uc124\uce58",level:3},{value:"\uc11c\ube44\uc2a4 \uc5f0\ub3d9 \ud14c\uc2a4\ud2b8\ub97c \uc704\ud55c \ub370\ubaa8",id:"\uc11c\ube44\uc2a4-\uc5f0\ub3d9-\ud14c\uc2a4\ud2b8\ub97c-\uc704\ud55c-\ub370\ubaa8",level:3},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],m={toc:u};function k(e){var t=e.components,s=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,n.Z)({},m,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc2a4\ud130\ub514 \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")),(0,l.kt)("p",null,"\uc774\ubc88 \ud3ec\uc2a4\ud305\uc758 \ubaa9\uc801\uc740 Gateway API\uc758 \uac1c\ub150\uc744 \uc774\ud574\ud558\uace0 Lattice\ub97c \ud1b5\ud574 AWS Gateway API Controller\ub97c EKS\uc5d0\uc11c \uc0ac\uc6a9\ud574\ubcf4\uae30 \uc704\ud568\uc774\ub2e4."),(0,l.kt)("h2",{id:"gateway-api-\uc774\ud574\ud558\uae30"},"Gateway API \uc774\ud574\ud558\uae30"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://gateway-api.sigs.k8s.io/"},"https://gateway-api.sigs.k8s.io/")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Gateway API"),"\ub294 \uc27d\uac8c \uc774\ud574\ud558\ub3c4\ub85d \uc124\uba85\ud558\uba74 Kubernetes \uc5d0\uc11c \ub124\ud2b8\uc6cc\ud06c \uc11c\ube44\uc2a4\ub97c \uc81c\uacf5\ud558\uae30 \uc704\ud574 \uc124\uacc4\ub41c \uc5ec\ub7ec \uc885\ub958\uc758 API\ub97c \ubaa8\uc544\ub193\uc740 \uac83\uc774\ub2e4. \uc774 API\ub294 \uc0ac\uc6a9\uc790\uac00 \ud544\uc694\uc5d0 \ub530\ub77c \uc778\ud504\ub77c\ub97c \ub3d9\uc801\uc73c\ub85c \uc124\uc815\ud558\uace0, \ubcf5\uc7a1\ud55c \ud2b8\ub798\ud53d\uc744 \ud6a8\uacfc\uc801\uc73c\ub85c \uad00\ub9ac\ud560 \uc218 \uc788\ub3c4\ub85d \ub3d5\ub294 \uac83\uc774\ub2e4. Gateway API\uc758 \uc8fc\uc694 \ud2b9\uc9d5\uc740 \ub2e4\uc74c\uacfc \uac19\ub2e4:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\uc5ed\ud560 \uc9c0\ud5a5\uc801(Role-oriented)"),": Gateway API\uc5d0\uc11c\ub294 Kubernetes \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud0b9\uc744 \uad00\ub9ac\ud558\ub294 \ub2f4\ub2f9 \uc5c5\ubb34\uc5d0 \uc5ed\ud560\uc5d0 \ub530\ub77c \ub3d9\uc791\uc774\ub098 \uad8c\ud55c\uc744 \uc720\uc5f0\ud558\uac8c \uc81c\uacf5\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\uc774\uc2dd\uc131(Portable)"),": Gateway API spec\uc740 \uc0ac\uc6a9\uc790 \uc815\uc758 \ub9ac\uc18c\uc2a4(Custom Resources)\ub85c \uc815\uc758\ub418\uba70, \ub9ce\uc740 ",(0,l.kt)("a",{parentName:"li",href:"https://gateway-api.sigs.k8s.io/implementations/"},"Gateway Controller"),"\uc5d0\uc11c \uc9c0\uc6d0\ud55c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\ud45c\ud604\ub825(Expressive)"),": Gateway API\ub294 \ud5e4\ub354 \uae30\ubc18 \ub9e4\uce6d(header-based matching), \ud2b8\ub798\ud53d \uac00\uc911\uce58(traffic weighting) \ub4f1 \uc0ac\uc6a9\uc790 \uc9c0\uc815 \uc5b4\ub178\ud14c\uc774\uc158\uc744 \uc0ac\uc6a9\ud558\uc5ec ",(0,l.kt)("inlineCode",{parentName:"li"},"Ingress"),"\uc5d0\uc11c\ub9cc \uac00\ub2a5\ud588\ub358 \uc77c\ubc18\uc801\uc778 \ud2b8\ub798\ud53d \ub77c\uc6b0\ud305 \uc0ac\uc6a9 \uc0ac\ub840\uc5d0 \ub300\ud55c \uae30\ub2a5\uc744 \uc9c0\uc6d0\ud55c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\ud655\uc7a5\uc131(Extensible)"),": Gateway\ub294 API\uc758 \ub2e4\uc591\ud55c \uacc4\uce35\uc5d0\uc11c \uc0ac\uc6a9\uc790 \uc815\uc758 \ub9ac\uc18c\uc2a4\ub97c \uc5f0\uacb0\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4.")),(0,l.kt)("h3",{id:"\ub9ac\uc18c\uc2a4-\ubaa8\ub378"},"\ub9ac\uc18c\uc2a4 \ubaa8\ub378"),(0,l.kt)("p",null,"Gateway API\ub294 \uc138 \uac00\uc9c0 stable\ud55c API\ub97c \uac00\uc9c0\uace0 \uc788\ub2e4."),(0,l.kt)("h4",{id:"gatewayclass"},(0,l.kt)("strong",{parentName:"h4"},"GatewayClass")),(0,l.kt)("p",null,"\uacf5\ud1b5 \uad6c\uc131\uc73c\ub85c \uad00\ub9ac\ub418\ub294 ",(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),"\uc758 \uc9d1\ud569\uc744 \uc815\uc758\ud55c\ub2e4. ",(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),"\ub294 \uc5ec\ub7ec \ucee8\ud2b8\ub864\ub7ec\uc5d0 \uc758\ud574 \uad6c\ud604\ub420 \uc218 \uc788\uc73c\uba70, ",(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),"\ub294 \ud074\ub798\uc2a4\ub97c \uad6c\ud604\ud558\ub294 \ucee8\ud2b8\ub864\ub7ec\uc758 \uc774\ub984\uc774 \ud3ec\ud568\ub41c ",(0,l.kt)("inlineCode",{parentName:"p"},"GatewayClass"),"\ub97c \ucc38\uc870\ud574\uc57c \ud55c\ub2e4. \ud074\ub7ec\uc2a4\ud130\uc5d0\uc11c \ub85c\ub4dc\ubc38\ub7f0\uc11c\ub97c \ub9cc\ub4e4\uae30 \uc704\ud55c \ud15c\ud50c\ub9bf\uc778 \ud074\ub7ec\uc2a4\ud130 \ubc94\uc704\uc5d0 \ud55c\uc815\ub418\ub294 \ub9ac\uc18c\uc2a4\ub97c \uc815\uc758\ud558\uac8c \ub41c\ub2e4."),(0,l.kt)("h4",{id:"gateway"},(0,l.kt)("strong",{parentName:"h4"},"Gateway")),(0,l.kt)("p",null,"\ub85c\ub4dc \ubc38\ub7f0\uc11c\uac00 \ud2b8\ub798\ud53d\uc744 \uc218\uc2e0\ud558\ub294 \uc704\uce58\uc640 \ubc29\ubc95\uc744 \ub85c\ub4dc\ubc38\ub7f0\uc11c\uc640 \uac19\uc740 \uc778\uc2a4\ud134\uc2a4 \ud615\ud0dc\ub85c \uc815\uc758\ud55c\ub2e4. \ud074\ub7ec\uc2a4\ud130 \uc6b4\uc601\uc790\ub294 ",(0,l.kt)("inlineCode",{parentName:"p"},"GatewayClass"),"\ub97c \uae30\ubc18\uc73c\ub85c \ud074\ub7ec\uc2a4\ud130\uc5d0 ",(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),"\ub97c \uc0dd\uc131\ud55c\ub2e4. "),(0,l.kt)("h4",{id:"httproute"},(0,l.kt)("strong",{parentName:"h4"},"HTTPRoute")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),"\uc5d0\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc11c\ube44\uc2a4\ub85c \uc694\uccad\uc744 \ub77c\uc6b0\ud305\ud558\uae30 \uc704\ud55c HTTP \ud504\ub85c\ud1a0\ucf5c\ubcc4 \uaddc\uce59\uc744 \uc815\uc758\ud55c\ub2e4. \uc0c8 ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTPRoute"),"\ub97c \uc815\uc758\ud558\uba74 \ud074\ub77c\uc6b0\ub4dc \uae30\ubc18 \ub85c\ub4dc\ubc38\ub7f0\uc11c \ub610\ub294 \ud074\ub7ec\uc2a4\ud130 \ub0b4 \ud504\ub85d\uc2dc \uc11c\ubc84\uc5d0\uc11c \ucd94\uac00 \ud2b8\ub798\ud53d \uacbd\ub85c\ub97c \uad6c\uc131\ud560 \uc218 \uc788\ub2e4. \uc608\ub97c \ub4e4\uba74, \ud2b9\uc815 \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc5d0\uc11c \ub2e4\ub978 \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc758 \ud2b9\uc815 \uc11c\ube44\uc2a4\ub85c \ub2e4\uc2dc \ub77c\uc6b0\ud305\uc744 \ud560 \uc218 \uc788\ub294 \uac83\uc774\ub2e4."),(0,l.kt)("h2",{id:"aws-gateway-api-controller"},"AWS Gateway API Controller"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.gateway-api-controller.eks.aws.dev/latest/"},"https://www.gateway-api-controller.eks.aws.dev/latest/")),(0,l.kt)("p",null,"VPC Lattice \uac00 GA\ub418\uba74\uc11c, Kubernetes Gateway API\uc758 \uad6c\ud604\uccb4\uc778 AWS Gateway API Controller\ub97c \uc18c\uac1c\ub418\uc5c8\ub2e4. AWS Gateway API Controller\ub294 Gateway API\uc5d0 \uc758\ud574 \uc815\uc758\ub41c \uc0ac\uc6a9\uc790 \uc815\uc758 \ub9ac\uc18c\uc2a4\ub97c \ud655\uc7a5\ud558\uc5ec Kubernetes API\ub97c \uc0ac\uc6a9\ud558\uc5ec VPC Lattice \ub9ac\uc18c\uc2a4\ub97c \uc0dd\uc131\ud560 \uc218 \uc788\ub3c4\ub85d \ud558\ub294 \ub3c4\uad6c\uc774\ub2e4."),(0,l.kt)("p",null,"\ud074\ub7ec\uc2a4\ud130\uc5d0 \uc124\uce58\ub97c \ud558\uac8c \ub418\uba74, \ucee8\ud2b8\ub864\ub7ec\ub294 \uac8c\uc774\ud2b8\uc6e8\uc774 \ubc0f \uacbd\ub85c\uc640 \uac19\uc740 Gateway API \ub9ac\uc18c\uc2a4\uc758 \uc0dd\uc131 \uc5ec\ubd80\ub97c \uac10\uc2dc\ud558\uace0 \ud574\ub2f9 Amazon VPC Lattice \uac1d\uccb4\ub97c \ud504\ub85c\ube44\uc800\ub2dd\ud55c\ub2e4. \uc774\ub97c \ud1b5\ud574 \uc0ac\uc6a9\uc790\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \ucf54\ub4dc\ub97c \uc791\uc131\ud558\uac70\ub098 \uc0ac\uc774\ub4dc\uce74 \ud504\ub85d\uc2dc\ub97c \uad00\ub9ac\ud560 \ud544\uc694 \uc5c6\uc774 Kubernetes API\ub97c \uc0ac\uc6a9\ud558\uc5ec VPC Lattice \uc11c\ube44\uc2a4, VPC Lattice \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c \ubc0f \ud0c0\uac9f \uadf8\ub8f9\uc744 \uad6c\uc131\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("p",null,"AWS Gateway API Controller\ub294 Amazon VPC Lattice\uc640 \ud1b5\ud569\ub418\uc5b4 \ub2e4\uc74c\uacfc \uac19\uc740 \uae30\ub2a5\uc744 \uc81c\uacf5\ud55c\ub2e4."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"VPC \ubc0f \uacc4\uc815 \uac04\uc758 \uc11c\ube44\uc2a4 \uac04 \ub124\ud2b8\uc6cc\ud06c \uc5f0\uacb0\uc744 \uc6d0\ud65c\ud558\uac8c \ucc98\ub9ac"),(0,l.kt)("li",{parentName:"ul"},"\uc5ec\ub7ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc5d0 \uac78\uccd0 VPC Lattice \uc11c\ube44\uc2a4 \ub514\uc2a4\ucee4\ubc84\ub9ac"),(0,l.kt)("li",{parentName:"ul"},"\uc11c\ube44\uc2a4 \uac04\uc758 \ud1b5\uc2e0\uc744 \ubcf4\ud638\ud558\uae30 \uc704\ud55c \ubc29\uc5b4 \uc2ec\uce35(defense-in-depth) \uc804\ub7b5 \uad6c\ud604"),(0,l.kt)("li",{parentName:"ul"},"\uc11c\ube44\uc2a4 \uac04\uc758 \uc694\uccad/\uc751\ub2f5 \ud2b8\ub798\ud53d\uc744 \uad00\ucc30")),(0,l.kt)("p",null,"Kubernetes Gateway API\uc640 \ud1b5\ud569\ud558\uba74 \uac1c\ubc1c\uc790\uac00 \uae30\ubcf8 \ub124\ud2b8\uc6cc\ud0b9 \uc778\ud504\ub77c\ub97c \uad00\ub9ac\ud558\ub294 \ub370 \ud544\uc694\ud55c \uc218\uace0 \uc5c6\uc774 \uc11c\ube44\uc2a4\ub97c \uc0dd\uc131\ud558\uace0 \ub124\ud2b8\uc6cc\ud06c \ub77c\uc6b0\ud305 \ubc0f \ud2b8\ub798\ud53d \ub3d9\uc791\uc744 \uad00\ub9ac\ud560 \uc218 \uc788\ub294 Kubernetes \ub124\uc774\ud2f0\ube0c \uacbd\ud5d8\uc744 \uc81c\uacf5\ubc1b\uc744 \uc218 \uc788\ub2e4. Kubernetes API \ubc0f Kubernetes ",(0,l.kt)("inlineCode",{parentName:"p"},"networking.k8s.io")," \uc2a4\ud399\uc5d0 \uc758\ud574 \uc815\uc758\ub41c \uc0ac\uc6a9\uc790 \uc815\uc758 \ub9ac\uc18c\uc2a4 \uc815\uc758(CRD)\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \uc11c\ube44\uc2a4 \uad00\ub828 \ub9ac\uc18c\uc2a4\ub85c \uc791\uc5c5\uc744 \uc9c4\ud589\ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("h2",{id:"components"},"Components"),(0,l.kt)("p",null,"VPC Lattice\uc758 \ubaa9\ud45c\ub294 \uc5ec\ub7ec VPC\uc5d0 \uac78\uce5c \ubaa8\ub4e0 \uc11c\ube44\uc2a4\uc758 \ub2e8\uc77c \ud3ec\uad04\uc801 \uc11c\ube44\uc2a4 \ubdf0\ub97c \uc81c\uacf5\ud558\ub294 \uac83\uc774\ub2e4. \uc774 \ubdf0\ub97c \uad6c\uc131\ud558\ub294 \uad6c\uc131 \uc694\uc18c\ub294 \ub2e4\uc74c\uacfc \uac19\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\uc11c\ube44\uc2a4(Service)"),"\n",(0,l.kt)("img",{parentName:"p",src:"https://www.gateway-api-controller.eks.aws.dev/latest/images/service.png",alt:"https://www.gateway-api-controller.eks.aws.dev/latest/images/service.png"})),(0,l.kt)("p",null,"\ud2b9\uc815 \uc791\uc5c5\uc774\ub098 \uae30\ub2a5\uc744 \uc81c\uacf5\ud558\ub294 \ub3c5\ub9bd\uc801\uc73c\ub85c \ubc30\ud3ec \uac00\ub2a5\ud55c \uc18c\ud504\ud2b8\uc6e8\uc5b4 \ub2e8\uc704\uc774\ub2e4. \uc11c\ube44\uc2a4\ub294 EC2 \uc778\uc2a4\ud134\uc2a4\ub098 ECS \ucee8\ud14c\uc774\ub108\uc5d0\uc11c \uc2e4\ud589\ub418\uac70\ub098 Lambda \ud568\uc218\ub85c \uc2e4\ud589\ub420 \uc218 \uc788\uc73c\uba70, \ud558\ub098\uc758 \uc5b4\uce74\uc6b4\ud2b8 \ub610\ub294 VPC \ub0b4\uc5d0\uc11c \uc2e4\ud589\ub41c\ub2e4. Target Group, Listener, Rule\ub85c \uad6c\uc131\ub41c\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c(Service Network)"),"\n",(0,l.kt)("img",{parentName:"p",src:"https://www.gateway-api-controller.eks.aws.dev/latest/images/service-network.png",alt:"https://www.gateway-api-controller.eks.aws.dev/latest/images/service-network.png"})),(0,l.kt)("p",null,"\uc11c\ube44\uc2a4 \ubaa8\uc74c\uc758 \ub17c\ub9ac\uc801 \uacbd\uacc4\uc774\ub2e4. \ud074\ub77c\uc774\uc5b8\ud2b8\ub294 \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uc640 \uc5f0\uacb0\ub41c VPC\uc5d0 \ubc30\ud3ec\ub41c \ub9ac\uc18c\uc2a4\uc774\ub2e4. \ub3d9\uc77c\ud55c \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uc640 \uc5f0\uacb0\ub41c \ud074\ub77c\uc774\uc5b8\ud2b8\uc640 \uc11c\ube44\uc2a4\ub294 \uad8c\ud55c\uc774 \ubd80\uc5ec\ub41c \uacbd\uc6b0 \uc11c\ub85c \ud1b5\uc2e0\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\uc11c\ube44\uc2a4 \ub514\ub809\ud1a0\ub9ac(Service Directory)")),(0,l.kt)("p",null,"AWS Resource Access Manager(AWS RAM)\ub97c \ud1b5\ud574 \uacc4\uc815\uacfc \uacf5\uc720\ub418\ub294 \ubaa8\ub4e0 VPC Lattice \uc11c\ube44\uc2a4\ub97c \uc911\uc559\uc5d0\uc11c \ub4f1\ub85d\ud55c\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\uc778\uc99d \uc815\ucc45(Auth Policies)")),(0,l.kt)("p",null,"\uc11c\ube44\uc2a4\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4\ub97c \uc815\uc758\ud558\ub294 \uc138\ubc00\ud55c \uad8c\ud55c \ubd80\uc5ec \uc815\ucc45\uc774\ub2e4. \uac1c\ubcc4 \uc11c\ube44\uc2a4\ub098 \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uc5d0 \ubcc4\ub3c4\uc758 \uc778\uc99d \uc815\ucc45\uc744 \ucca8\ubd80\ud560 \uc218 \uc788\ub2e4. \uc608\ub97c \ub4e4\uc5b4, EC2 \uc778\uc2a4\ud134\uc2a4\uc758 auto scaling \uadf8\ub8f9\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ud2b9\uc815 \uc11c\ube44\uc2a4\uac00 AWS Lambda\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \uc11c\ube44\uc2a4\uc640 \uc0c1\ud638\uc791\uc6a9\ud558\ub294 \ubc29\uc2dd\uc744 \uc815\uc758\ud558\ub294 \uc815\ucc45\uc744 \uc0dd\uc131\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("h2",{id:"vpc-lattice\uc640-kubernetes-\uac04\uc758-\uad00\uacc4"},"VPC Lattice\uc640 Kubernetes \uac04\uc758 \uad00\uacc4"),(0,l.kt)("p",null,"VPC Lattice \uc624\ube0c\uc81d\ud2b8\uac00 Kubernetes \uac8c\uc774\ud2b8\uc6e8\uc774 API \uc624\ube0c\uc81d\ud2b8\uc5d0 \ub9e4\ud551\ub418\ub294 \ub0b4\uc6a9\uc744 \ubcf4\uc5ec\uc900\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://www.gateway-api-controller.eks.aws.dev/latest/images/fundamentals-mapping.png",alt:"https://www.gateway-api-controller.eks.aws.dev/latest/images/fundamentals-mapping.png"})),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTPRoute")," \ubc0f ",(0,l.kt)("inlineCode",{parentName:"p"},"Service"),"\ub97c \uc0dd\uc131\ud558\ub294 \ub370\ub294 Kubernetes Gateway API\uac00 \uc0ac\uc6a9\ub418\uc9c0\ub9cc, Kubernetes\ub294 \uc774\ub7ec\ud55c \ud56d\ubaa9\uc758 \uc0c1\uc138\ud55c \uc815\ubcf4\ub97c VPC Lattice\uc5d0\uc11c \uac00\uc838\uc628\ub2e4."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\uc778\ud504\ub77c \uc81c\uacf5\uc790"),": VPC Lattice\ub97c GatewayClass\ub85c \uc2dd\ubcc4\ud558\ub294 Kubernetes ",(0,l.kt)("inlineCode",{parentName:"li"},"GatewayClass")," \uc0dd\uc131"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\ud074\ub7ec\uc2a4\ud130 \uc6b4\uc601\uc790"),": Kubernetes ",(0,l.kt)("inlineCode",{parentName:"li"},"Gateway")," \uc0dd\uc131\uc744 \ud1b5\ud574 VPC Lattice\ub85c\ubd80\ud130 \uc11c\ube44\uc2a4 \uac8c\uc774\ud2b8\uc6e8\uc774 \ubc0f \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uc640 \uad00\ub828\ub41c \uc815\ubcf4\ub97c \uac00\uc838\uc634"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\uc560\ud50c\ub9ac\ucf00\uc774\uc158 \uac1c\ubc1c\uc790"),": \ud2b9\uc815 \ud30c\ub4dc\ub85c \ud5a5\ud558\ub294 Kubernetes \uc11c\ube44\uc2a4\ub97c \uac00\ub9ac\ud0a4\ub294 ",(0,l.kt)("inlineCode",{parentName:"li"},"HTTPRoute")," \uac1d\uccb4 \uc0dd\uc131")),(0,l.kt)("h2",{id:"aws-gateway-api-controller-\uc124\uce58"},"AWS Gateway API Controller \uc124\uce58"),(0,l.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html"},"AWS CLI"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/"},"kubectl"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://helm.sh/docs/intro/install/"},"helm"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://docs.aws.amazon.com/eks/latest/userguide/setting-up.html"},"eksctl"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("a",{parentName:"strong",href:"https://jqlang.github.io/jq/"},"jq"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"EKS Cluster"))),(0,l.kt)("h3",{id:"vpc-lattice\ub85c\ubd80\ud130-\ud2b8\ub798\ud53d-\ud5c8\uc6a9"},"VPC Lattice\ub85c\ubd80\ud130 \ud2b8\ub798\ud53d \ud5c8\uc6a9"),(0,l.kt)("p",null,"\ubcf4\uc548 \uadf8\ub8f9\uc744 \uc124\uc815\ud558\uc5ec VPC \ub798\ud2f0\uc2a4\uc640 \ud1b5\uc2e0\ud558\ub294 \ubaa8\ub4e0 \ud30c\ub4dc\uac00 VPC \ub798\ud2f0\uc2a4 \uad00\ub9ac \uc811\ub450\uc0ac \ubaa9\ub85d\uc758 \ud2b8\ub798\ud53d\uc744 \ud5c8\uc6a9\ud558\ub3c4\ub85d \ud5c8\uc6a9\ud574\uc57c \ud55c\ub2e4. \uc790\uc138\ud55c \ub0b4\uc6a9\uc740 \ubcf4\uc548 \uadf8\ub8f9\uc744 \uc0ac\uc6a9\ud558\uc5ec \ub9ac\uc18c\uc2a4\uc5d0 \ub300\ud55c \ud2b8\ub798\ud53d \uc81c\uc5b4\ub97c \ucc38\uace0\ud55c\ub2e4. Lattice\ub294 IPv4\uc640 IPv6 \uc811\ub450\uc0ac \ubaa9\ub85d\uc744 \ubaa8\ub450 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("p",null,"VPC \ub798\ud2f0\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uc5d0\uc11c \ud2b8\ub798\ud53d\uc744 \uc218\uc2e0\ud558\ub3c4\ub85d EKS \ub178\ub4dc\uc758 \ubcf4\uc548 \uadf8\ub8f9\uc744 \uad6c\uc131\ud55c\ub2e4. "),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\uc0ac\uc6a9\uc911\uc778 \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \uadf8\ub8f9 \ud655\uc778")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'$ CLUSTER_SG=$(aws eks describe-cluster --name $CLUSTER_NAME --output json| jq -r \'.cluster.resourcesVpcConfig.clusterSecurityGroupId\')\n\n$ PREFIX_LIST_ID=$(aws ec2 describe-managed-prefix-lists --query "PrefixLists[?PrefixListName=="\\\'com.amazonaws.$AWS_REGION.vpc-lattice\\\'"].PrefixListId" | jq -r \'.[]\')\n\n$ aws ec2 authorize-security-group-ingress --group-id $CLUSTER_SG --ip-permissions "PrefixListIds=[{PrefixListId=${PREFIX_LIST_ID}}],IpProtocol=-1"\n\n$ PREFIX_LIST_ID_IPV6=$(aws ec2 describe-managed-prefix-lists --query "PrefixLists[?PrefixListName=="\\\'com.amazonaws.$AWS_REGION.ipv6.vpc-lattice\\\'"].PrefixListId" | jq -r \'.[]\')\n\n$ aws ec2 authorize-security-group-ingress --group-id $CLUSTER_SG --ip-permissions "PrefixListIds=[{PrefixListId=${PREFIX_LIST_ID_IPV6}}],IpProtocol=-1"\n')),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"IAM \uad8c\ud55c \uc124\uc815")),(0,l.kt)("p",null,"AWS Gateway API Controller\ub294 \uc791\ub3d9\ud558\uae30 \uc704\ud574 \ud544\uc694\ud55c \uad8c\ud55c\uc744 \uac00\uc838\uc57c \ud55c\ub2e4. Gateway API\ub97c \ud638\ucd9c\ud560 \uc218 \uc788\ub294 \ub2e4\uc74c \ub0b4\uc6a9\uc744 \ud3ec\ud568\ud558\ub294 IAM\uc5d0\uc11c \uc815\ucc45\uc744 \uc0dd\uc131\ud558\uace0, \ub098\uc911\uc5d0 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub3c4\ub85d \uc815\ucc45 ARN\uc744 \ubcf5\uc0ac\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ curl https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/recommended-inline-policy.json  -o recommended-inline-policy.json\n\n$ aws iam create-policy \\\n    --policy-name VPCLatticeControllerIAMPolicy \\\n    --policy-document file://recommended-inline-policy.json\n\n$ export VPCLatticeControllerIAMPolicyArn=$(aws iam list-policies --query 'Policies[?PolicyName==`VPCLatticeControllerIAMPolicy`].Arn' --output text)\n")),(0,l.kt)("p",null,"aws-application-networking-system \ub124\uc784\uc2a4\ud398\uc774\uc2a4\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/deploy-namesystem.yaml\n")),(0,l.kt)("p",null,"\ucee8\ud2b8\ub864\ub7ec \uad8c\ud55c\uc744 \uc124\uc815\ud558\uae30 \uc704\ud574 IRSA \uad6c\uc131\uc744 \uc9c4\ud589\ud55c\ub2e4. IAM OIDC provider\ub97c \uc0dd\uc131\ud55c\ub2e4. \uc774\ubbf8 \uad6c\uc131\ub418\uc5b4 \uc788\uc73c\uba74 \ub2e4\uc74c \ub2e8\uacc4\ub85c \ub118\uc5b4\uac04\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'$ eksctl utils associate-iam-oidc-provider --cluster $CLUSTER_NAME --approve --region $AWS_REGION\n2024-10-12 15:25:45 [\u2139]  IAM Open ID Connect provider is already associated with cluster "app-signals-demo" in "ap-northeast-2"\n')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"gateway-api-controller")," \uc11c\ube44\uc2a4 \uc5b4\uce74\uc6b4\ud2b8\ub97c \uc0dd\uc131\ud55c\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"eksctl create iamserviceaccount \\\n    --cluster=$CLUSTER_NAME \\\n    --namespace=aws-application-networking-system \\\n    --name=gateway-api-controller \\\n    --attach-policy-arn=$VPCLatticeControllerIAMPolicyArn \\\n    --override-existing-serviceaccounts \\\n    --region $AWS_REGION \\\n    --approve\n")),(0,l.kt)("h3",{id:"controller-\uc124\uce58"},"Controller \uc124\uce58"),(0,l.kt)("p",null,"24\ub144 10\uc6d4 \uae30\uc900 ",(0,l.kt)("inlineCode",{parentName:"p"},"1.0.6")," \ubc84\uc804\uc73c\ub85c \uc124\uce58\ub97c \uc9c4\ud589\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/deploy-v1.0.6.yaml\n")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"amazon-vpc-lattice")," GatewayClass\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'$ kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/gatewayclass.yaml\n\n$ kubectl get GatewayClass -o yaml\napiVersion: v1\nitems:\n- apiVersion: gateway.networking.k8s.io/v1beta1\n  kind: GatewayClass\n  metadata:\n    annotations:\n      kubectl.kubernetes.io/last-applied-configuration: |\n        {"apiVersion":"gateway.networking.k8s.io/v1beta1","kind":"GatewayClass","metadata":{"annotations":{},"name":"amazon-vpc-lattice"},"spec":{"controllerName":"application-networking.k8s.aws/gateway-api-controller"}}\n    creationTimestamp: "2024-10-12T15:37:27Z"\n    generation: 1\n    name: amazon-vpc-lattice\n    resourceVersion: "1626753"\n    uid: 2c026d8a-d5dc-4aa8-8ef3-6c5e604dffef\n  spec:\n    controllerName: application-networking.k8s.aws/gateway-api-controller\n  status:\n    conditions:\n    - lastTransitionTime: "2024-10-12T15:37:27Z"\n      message: Accepted\n      observedGeneration: 1\n      reason: Accepted\n      status: "True"\n      type: Accepted\nkind: List\nmetadata:\n  resourceVersion: ""\n')),(0,l.kt)("h3",{id:"\uc11c\ube44\uc2a4-\uc5f0\ub3d9-\ud14c\uc2a4\ud2b8\ub97c-\uc704\ud55c-\ub370\ubaa8"},"\uc11c\ube44\uc2a4 \uc5f0\ub3d9 \ud14c\uc2a4\ud2b8\ub97c \uc704\ud55c \ub370\ubaa8"),(0,l.kt)("p",null,"\uc774 \uc608\uc5d0\uc11c\ub294 \ub2e8\uc77c VPC\uc5d0 \ub2e8\uc77c \ud074\ub7ec\uc2a4\ud130\ub97c \uc0dd\uc131\ud55c \ub2e4\uc74c, 2\uac1c\uc758 HTTPRoutes(",(0,l.kt)("inlineCode",{parentName:"p"},"rates")," \ubc0f ",(0,l.kt)("inlineCode",{parentName:"p"},"inventory"),")\uc640 3\uac1c\uc758 kubetnetes \uc11c\ube44\uc2a4(",(0,l.kt)("inlineCode",{parentName:"p"},"parking"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"review")," \ubc0f ",(0,l.kt)("inlineCode",{parentName:"p"},"inventory-1"),")\ub97c \uad6c\uc131\ud55c\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://www.gateway-api-controller.eks.aws.dev/v1.0.6/images/example1.png",alt:"https://www.gateway-api-controller.eks.aws.dev/v1.0.6/images/example1.png"})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ git clone https://github.com/aws/aws-application-networking-k8s.git\n$ cd aws-application-networking-k8s\n\n$ aws vpc-lattice create-service-network --name my-hotel\n\n$ SERVICE_NETWORK_ID=$(aws vpc-lattice list-service-networks --query \"items[?name==\"\\'my-hotel\\'\"].id\" | jq -r '.[]')\n\n$ CLUSTER_VPC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME | jq -r .cluster.resourcesVpcConfig.vpcId)\n\n$ aws vpc-lattice create-service-network-vpc-association --service-network-identifier $SERVICE_NETWORK_ID --vpc-identifier $CLUSTER_VPC_ID\n")),(0,l.kt)("p",null,"\uc704\uc5d0\uc11c \uc0dd\uc131\ud55c \uc11c\ube44\uc2a4 \ub124\ud2b8\uc6cc\ud06c\uac00 VPC \uc5f0\uacb0 \uc0c1\ud0dc\uac00 ",(0,l.kt)("inlineCode",{parentName:"p"},"ACTIVE")," \uc0c1\ud0dc\uc778\uc9c0 \ud655\uc778\ud558\uc5ec \uc0c8 VPC\uc758 \ud2b8\ub798\ud53d\uc744 \ubc1b\uc544\ub4e4\uc77c \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"aws vpc-lattice list-service-network-vpc-associations --vpc-id $CLUSTER_VPC_ID\n")),(0,l.kt)("p",null,"AWS \ucf58\uc194\uc5d0\uc11c\ub3c4 \ub2e4\uc74c\uacfc \uac19\uc774 association \ub41c VPC\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"lattice",src:a(75517).Z,width:"2974",height:"1754"})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"kubectl apply -f files/examples/my-hotel-gateway.yaml\n")),(0,l.kt)("p",null,"my-hotel Gateway\uac00 ",(0,l.kt)("inlineCode",{parentName:"p"},"PROGRAMMED")," status\uac00 True\ub85c \uc0dd\uc131\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4. ",(0,l.kt)("a",{parentName:"p",href:"https://gateway-api.sigs.k8s.io/reference/spec/#gateway.networking.k8s.io%2fv1.GatewayConditionReason"},"GatewayConditionReason")," API \uc2a4\ud399\uc744 \ud655\uc778\ud574\ubcf4\uba74 ",(0,l.kt)("inlineCode",{parentName:"p"},"PROGRAMMED")," \uc870\uac74\uc740 \uac8c\uc774\ud2b8\uc6e8\uc774\uac00 \uae30\ubcf8 \ub370\uc774\ud130 \ud50c\ub808\uc778\uc5d0\uc11c \uace7 \uc900\ube44\ub420 \uac83\uc73c\ub85c \uac00\uc815\ub418\ub294 \uad6c\uc131\uc744 \uc0dd\uc131\ud588\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b8\ub2e4. AWS Lattice\uc5d0\uc11c\ub294 \uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc0dd\uc131\ub418\uc5b4 \uc874\uc7ac\ud558\ub294\uc9c0 \uc5ec\ubd80\ub97c \ub098\ud0c0\ub0b4\ub294 \uac83\uc73c\ub85c \ubcfc \uc218 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ kubectl get gateway\nNAME       CLASS                ADDRESS   PROGRAMMED   AGE\nmy-hotel   amazon-vpc-lattice             True         2m15s\n")),(0,l.kt)("p",null,"HTTPRoute ",(0,l.kt)("inlineCode",{parentName:"p"},"rates"),"\uc640  ",(0,l.kt)("inlineCode",{parentName:"p"},"parking"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"review")," \uc11c\ube44\uc2a4, \ub514\ud50c\ub85c\uc774\uba3c\ud2b8\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ kubectl apply -f files/examples/parking.yaml\ndeployment.apps/parking created\nservice/parking created\n\n$ kubectl apply -f files/examples/review.yaml\ndeployment.apps/review created\nservice/review created\n\n$ kubectl apply -f files/examples/rate-route-path.yaml\nhttproute.gateway.networking.k8s.io/rates created\n")),(0,l.kt)("p",null,"HTTPRoute ",(0,l.kt)("inlineCode",{parentName:"p"},"inventory"),"\uc640 \uc11c\ube44\uc2a4, \ub514\ud50c\ub85c\uc774\uba3c\ud2b8\ub97c \uc0dd\uc131\ud55c\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ kubectl apply -f files/examples/inventory-ver1.yaml\ndeployment.apps/inventory-ver1 created\nservice/inventory-ver1 created\n\n$ kubectl apply -f files/examples/inventory-route.yaml\nhttproute.gateway.networking.k8s.io/inventory created\n")),(0,l.kt)("p",null,"HTTPRoute ",(0,l.kt)("inlineCode",{parentName:"p"},"inventory")," \ubc0f ",(0,l.kt)("inlineCode",{parentName:"p"},"rates"),"\uc5d0 \ub300\ud55c VPC Lattice\uc5d0\uc11c \uc0dd\uc131\ub41c DNS \uc8fc\uc18c\ub97c \ub9ac\uc18c\uc2a4\uc640 \ucf58\uc194\uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nitems:\n- apiVersion: gateway.networking.k8s.io/v1beta1\n  kind: HTTPRoute\n  metadata:\n    annotations:\n      application-networking.k8s.aws/lattice-assigned-domain-name: rates-default-0d36689e1599f2ed2.7d67968.vpc-lattice-svcs.ap-northeast-2.on.aws\n    name: rates\n    namespace: default\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- apiVersion: gateway.networking.k8s.io/v1beta1\n  kind: HTTPRoute\n  metadata:\n    annotations:\n      application-networking.k8s.aws/lattice-assigned-domain-name: rates-default-0d36689e1599f2ed2.7d67968.vpc-lattice-svcs.ap-northeast-2.on.aws\n    name: inventory\n    namespace: default\n")),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"lattice2",src:a(32484).Z,width:"2420",height:"662"})),(0,l.kt)("p",null,"\uc704\uc5d0\uc11c \ud655\uc778\ud55c FQDN\uc744 \uc5f0\uacb0 \ud14c\uc2a4\ud2b8\ub97c \uc704\ud574 \ubcc0\uc218\ub85c \uc800\uc7a5\ud55c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"ratesFQDN=$(kubectl get httproute rates -o json | jq -r '.metadata.annotations.\"application-networking.k8s.aws/lattice-assigned-domain-name\"')\n\ninventoryFQDN=$(kubectl get httproute inventory -o json | jq -r '.metadata.annotations.\"application-networking.k8s.aws/lattice-assigned-domain-name\"')\n")),(0,l.kt)("p",null,"\uc11c\ube44\uc2a4\uc640 \uc11c\ube44\uc2a4\uac04 \uc5f0\uacb0 \ud655\uc778\uc744 \uc704\ud574 \uac01 \uc11c\ube44\uc2a4\uc5d0\uc11c \uc704\uc5d0\uc11c \uc800\uc7a5\ud55c FQDN\uc73c\ub85c curl \uba85\ub839\uc744 \uc2e4\ud589\ud574\ubcf4\uba74 \uc815\uc0c1\uc801\uc73c\ub85c \ud1b5\uc2e0\ub418\ub294\uac83\uc744 \ud655\uc778\ud574\ubcfc\uc218 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ kubectl exec deploy/inventory-ver1 -- curl -s $ratesFQDN/parking $ratesFQDN/review\nRequsting to Pod(parking-7c89b6b67c-65grb): parking handler pod\nRequsting to Pod(review-5846dd8dcc-jmmx6): review handler pod\n\n$ kubectl exec deploy/parking -- curl -s $inventoryFQDN\nRequsting to Pod(inventory-ver1-55ff9bb45d-f6v7j): Inventory-ver1 handler pod\n")),(0,l.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,l.kt)("p",null,"Gateway API\ub294 Kubernetes\uc5d0\uc11c \ub124\ud2b8\uc6cc\ud06c \uc11c\ube44\uc2a4\ub97c \uc81c\uacf5\ud558\uae30 \uc704\ud574 \uc124\uacc4\ub41c \uc5ec\ub7ec API\ub97c \ubaa8\uc544\ub193\uc740 \uac83\uc73c\ub85c, \uc5ed\ud560 \uc9c0\ud5a5\uc801, \uc774\uc2dd\uc131, \ud45c\ud604\ub825, \ud655\uc7a5\uc131\uc758 \ud2b9\uc9d5\uc744 \uac00\uc9c0\uace0 \uc788\uc5b4\uc11c \ub2e4\uc591\ud55c \uc870\uc9c1\uc774\ub098 \ub2f4\ub2f9\ud558\ub294 \uc5c5\ubb34\uc5d0 \ub530\ub978 \uc5ed\ud560\uc744 \ubd80\uc5ec\ud560 \uc218 \uc788\ub294 \uae30\ub2a5\uc744 \uc81c\uacf5\ud55c\ub2e4. Gateway API\ub294 \uc138 \uac00\uc9c0 \uc8fc\uc694 \ub9ac\uc18c\uc2a4 \ubaa8\ub378\uc778 ",(0,l.kt)("inlineCode",{parentName:"p"},"GatewayClass"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"Gateway"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTPRoute"),"\ub97c \ud1b5\ud574 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc5d0\uc11c \ud2b8\ub798\ud53d\uc744 \ud6a8\uacfc\uc801\uc73c\ub85c \uad00\ub9ac\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4. AWS Gateway API Controller\ub294 \uc774\ub7ec\ud55c Gateway API\ub97c \ud655\uc7a5\ud558\uc5ec VPC Lattice \ub9ac\uc18c\uc2a4\ub97c \uc0dd\uc131\ud558\uace0 \uad00\ub9ac\ud560 \uc218 \uc788\ub294 \ub3c4\uad6c\ub85c, \ud074\ub7ec\uc2a4\ud130\uc5d0 \uc124\uce58\ud558\uba74 \uc790\ub3d9\uc73c\ub85c Gateway API \ub9ac\uc18c\uc2a4\ub97c \uac10\uc2dc\ud558\uace0 Amazon VPC Lattice \uac1d\uccb4\ub85c \ud504\ub85c\ube44\uc800\ub2dd\ud55c\ub2e4. \uc2e4\uc81c \uc11c\ube44\uc2a4 \uc5f0\ub3d9 \ud14c\uc2a4\ud2b8\ub97c \uc704\ud55c \ub370\ubaa8\ub97c \ud1b5\ud574 Gateway API\uc640 VPC Lattice\uc758 \uc5f0\ub3d9\ub3c4 \uac04\ub2e8\ud558\uac8c \uc218\ud589\ud574\ubd24\ub2e4. "),(0,l.kt)("p",null,"\ucd94\uac00\uc801\uc73c\ub85c \ub124\uc784\uc2a4\ud398\uc774\uc2a4, \ud074\ub7ec\uc2a4\ud130\ub97c \ub118\uc5b4\uc11c \uc5f0\uacb0\uc131\uc744 \ud655\ubcf4\ud560 \uc218\ub3c4 \uc788\uace0, \ub2e4\ub978 \uc5b4\uce74\uc6b4\ud2b8\uc5d0 Gateway \ub9ac\uc18c\uc2a4\ub97c AWS Resource Access Manager\uc744 \ud1b5\ud574\uc11c \uacf5\uc720\ud558\ub294\uac83\ub3c4 \uac00\ub2a5\ud558\ub2e4. \uc790\uc138\ud55c \ub0b4\uc6a9\uc740 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/aws/aws-application-networking-k8s"},"\uacf5\uc2dd \uae43\ud5d9"),"\uacfc ",(0,l.kt)("a",{parentName:"p",href:"https://www.gateway-api-controller.eks.aws.dev/latest/"},"\uacf5\uc2dd \uac00\uc774\ub4dc \ubb38\uc11c"),"\uc5d0\uc11c\ub3c4 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc2a4\ud130\ub514 \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")))}k.isMDXComponent=!0},75517:function(e,t,a){t.Z=a.p+"assets/images/latticesvc-7fa9a36d179629fdbe8bd6d3d13a47d3.png"},32484:function(e,t,a){t.Z=a.p+"assets/images/latticesvc2-1526828f926b62f2e7db6949a85a90c5.png"}}]);