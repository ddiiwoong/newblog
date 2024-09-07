"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[8135],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),b=u(n),d=o,f=b["".concat(l,".").concat(d)]||b[d]||p[d]||a;return n?r.createElement(f,s(s({ref:t},c),{},{components:n})):r.createElement(f,s({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var u=2;u<a;u++)s[u]=n[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},66962:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return p}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),s=["components"],i={layout:"single",title:"\ud30c\ub4dc Readiness & Probe",comments:!0,classes:"wide",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/readinessandprobe/",date:new Date("2024-09-08T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","Probe","livenessProbe","readinessProbe","startupProbe","NetworkReadiness"]},l=void 0,u={permalink:"/kubernetes/readinessandprobe/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-09-08-probe.md",source:"@site/blog/2024-09-08-probe.md",title:"\ud30c\ub4dc Readiness & Probe",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",date:"2024-09-08T00:00:00.000Z",formattedDate:"September 8, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"Probe",permalink:"/tags/probe"},{label:"livenessProbe",permalink:"/tags/liveness-probe"},{label:"readinessProbe",permalink:"/tags/readiness-probe"},{label:"startupProbe",permalink:"/tags/startup-probe"},{label:"NetworkReadiness",permalink:"/tags/network-readiness"}],readingTime:16.46,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"\ud30c\ub4dc Readiness & Probe",comments:!0,classes:"wide",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/readinessandprobe/",date:"2024-09-08T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","Probe","livenessProbe","readinessProbe","startupProbe","NetworkReadiness"]},nextItem:{title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",permalink:"/kubernetes/kernelhardening/"}},c={authorsImageUrls:[void 0]},p=[{value:"\ud30c\ub4dc Readiness \ubc0f \ud504\ub85c\ube0c",id:"\ud30c\ub4dc-readiness-\ubc0f-\ud504\ub85c\ube0c",level:2}],b={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Kubernetes\uc5d0\uc11c \ud30c\ub4dc\uc758 Readiness \ubc0f \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \ud2b8\ub798\ud53d\uc744 \ud6a8\uc728\uc801\uc73c\ub85c \uad00\ub9ac\ud558\uae30 \uc704\ud55c \uc911\uc694\ud55c \uba54\ucee4\ub2c8\uc998\uc774\ub2e4. \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc\uac00 \uc694\uccad\uc744 \ucc98\ub9ac\ud560 \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0\ub97c \ud310\ub2e8\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\uba70, Kubernetes\uac00 \ud30c\ub4dc\ub97c \uad00\ub9ac\ud558\uace0 \uc5c5\ub370\uc774\ud2b8\ud558\ub294 \ub370 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \ud55c\ub2e4."),(0,a.kt)("h2",{id:"\ud30c\ub4dc-readiness-\ubc0f-\ud504\ub85c\ube0c"},"\ud30c\ub4dc Readiness \ubc0f \ud504\ub85c\ube0c"),(0,a.kt)("p",null,"\ud30c\ub4dc Readiness\ub294 \ub530\ub77c \ud30c\ub4dc\uac00 \ud2b8\ub798\ud53d\uc744 \ucc98\ub9ac\ud560 \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0\ub97c \ub098\ud0c0\ub0b4\ub294 \ucd94\uac00\uc801\uc778 \uc9c0\ud45c\uc774\ub2e4. \ud30c\ub4dc Readiness\ub294 \uc678\ubd80 \uc18c\uc2a4\uc5d0\uc11c \ud30c\ub4dc \uc8fc\uc18c\uac00 Endpoints \uac1d\uccb4\uc5d0 \ud45c\uc2dc\ub418\ub294\uc9c0\ub97c \uacb0\uc815\ud55c\ub2e4. Kubernetes\uc5d0\uc11c \ud30c\ub4dc\ub97c \uad00\ub9ac\ud558\ub294 \ub2e4\ub978 \ub9ac\uc18c\uc2a4\ub4e4, \uc608\ub97c \ub4e4\uc5b4 Deployment \uac19\uc740 \uac83\ub4e4\uc740 \ud30c\ub4dc Readiness\ub97c \uace0\ub824\ud558\uc5ec \ub864\ub9c1 \uc5c5\ub370\uc774\ud2b8 \uc2dc \uc758\uc0ac \uacb0\uc815\uc744 \ud55c\ub2e4. \ub864\ub9c1 \ubc30\ud3ec \uc911\uc5d0 \uc0c8 \ud30c\ub4dc\uac00 \uc900\ube44\ub418\uc5c8\uc9c0\ub9cc \uc11c\ube44\uc2a4, \ub124\ud2b8\uc6cc\ud06c \uc815\ucc45 \ub610\ub294 \ub85c\ub4dc \ubc38\ub7f0\uc11c\uac00 \uc5b4\ub5a4 \uc774\uc720\ub85c \uc778\ud574 \uc544\uc9c1 \uc0c8 \ud30c\ub4dc\uc5d0 \ub300\ud574 \uc900\ube44\ub418\uc9c0 \uc54a\uc740 \uacbd\uc6b0\uac00 \uc788\uc744 \uc218 \uc788\ub2e4. \ub9cc\uc57d \ud30c\ub4dc\uc758 Readiness \ud504\ub85c\ube0c\uac00 \uc2e4\ud328\ud558\uba74, \ud574\ub2f9 \ud30c\ub4dc\uc758 IP \uc8fc\uc18c\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"Endpoints")," \uac1d\uccb4\uc5d0\uc11c \uc81c\uac70\ub418\uc5b4 \uc11c\ube44\uc2a4\uac00 \uadf8 \ud30c\ub4dc\ub85c \ud2b8\ub798\ud53d\uc744 \ub77c\uc6b0\ud305\ud558\uc9c0 \uc54a\ub294\ub2e4. \uc774\ub294 \uc11c\ube44\uc2a4 \uc911\ub2e8\uc744 \ubc29\uc9c0\ud558\uae30 \uc704\ud55c \uba54\ucee4\ub2c8\uc998\uc774\ub2e4. Readiness \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc ",(0,a.kt)("inlineCode",{parentName:"p"},".Status.Phase")," \uc5d0 \uc601\ud5a5\uc744 \uc904 \uc218 \uc788\uc73c\uba70, Kubelet\uc774 \uc774\ub97c \uc2e4\ud589\ud558\uc5ec \uc131\uacf5 \ub610\ub294 \uc2e4\ud328\uc5d0 \ub530\ub77c \ud30c\ub4dc \uc0c1\ud0dc\ub97c \uc5c5\ub370\uc774\ud2b8\ud55c\ub2e4. "),(0,a.kt)("p",null,"\ud30c\ub4dc\uc5d0 \ud504\ub85c\ube0c\uac00 \uba85\uc2dc\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc73c\uba74 Kubernetes\uac00 \uae30\ubcf8\uc801\uc73c\ub85c \ud574\ub2f9 \ud504\ub85c\ube0c\uc758 \uc0c1\ud0dc\ub97c \uc131\uacf5\uc73c\ub85c \uac04\uc8fc\ud55c\ub2e4. \uc774\ub7f0 \uacbd\uc6b0 Kubernetes\uac00 \ucee8\ud14c\uc774\ub108\ub97c Ready \uc0c1\ud0dc\ub85c \uac04\uc8fc\ud558\uc5ec \uc11c\ube44\uc2a4\uc758 Endpoints\uc5d0 \ud3ec\ud568\uc2dc\ud0a4\uace0 \ud2b8\ub798\ud53d\uc744 \ubc1b\uc744 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4. \uadf8\ub7ec\ub098 \uc774\ub294 \uc2e4\uc81c\ub85c \ucee8\ud14c\uc774\ub108\uac00 \uc900\ube44\ub418\uc9c0 \uc54a\uc558\uc744 \ub54c\ub3c4 \ud2b8\ub798\ud53d\uc744 \ubc1b\uc744 \uc218 \uc788\uc5b4 \uc0ac\uc6a9\uc790 \uacbd\ud5d8\uc5d0 \ubd80\uc815\uc801\uc778 \uc601\ud5a5\uc744 \ubbf8\uce60 \uc218 \uc788\ub2e4. \ub530\ub77c\uc11c, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uc0c1\ud0dc\ub97c \uc815\ud655\ud788 \ubc18\uc601\ud558\uae30 \uc704\ud574 \uc801\uc808\ud55c \ud504\ub85c\ube0c\ub97c \uc124\uc815\ud558\ub294 \uac83\uc774 \uc911\uc694\ud558\ub2e4."))}d.isMDXComponent=!0}}]);