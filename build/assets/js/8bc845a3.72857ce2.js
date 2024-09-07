"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[8070],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=s(r),f=o,b=m["".concat(c,".").concat(f)]||m[f]||l[f]||a;return r?n.createElement(b,i(i({ref:t},u),{},{components:r})):n.createElement(b,i({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},17094:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return l}});var n=r(87462),o=r(63366),a=(r(67294),r(3905)),i=["components"],p={layout:"single",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",comments:!0,classes:"wide",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kernelhardening/",date:new Date("2024-08-31T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","AppArmor","seccomp","security","CKS"]},c="\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9",s={permalink:"/kubernetes/kernelhardening/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-08-31-kernelhardening.md",source:"@site/blog/2024-08-31-kernelhardening.md",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",date:"2024-08-31T00:00:00.000Z",formattedDate:"August 31, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"AppArmor",permalink:"/tags/app-armor"},{label:"seccomp",permalink:"/tags/seccomp"},{label:"security",permalink:"/tags/security"},{label:"CKS",permalink:"/tags/cks"}],readingTime:15.94,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",comments:!0,classes:"wide",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kernelhardening/",date:"2024-08-31T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","AppArmor","seccomp","security","CKS"]},nextItem:{title:"\ud30c\ub4dc Readiness & Probe",permalink:"/kubernetes/readinessandprobe/"}},u={authorsImageUrls:[void 0]},l=[{value:"AppArmor",id:"apparmor",level:2}],m={toc:l};function f(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\ucee8\ud14c\uc774\ub108 \ub0b4\ubd80\uc5d0\uc11c \uc2e4\ud589 \uc911\uc778 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774\ub098 \ud504\ub85c\uc138\uc2a4\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c(system call)\uc744 \uc218\ud589\ud560 \uc218 \uc788\ub2e4. \ub300\ud45c\uc801\uc778 \uc608\ub85c HTTP \uc694\uccad\uc744 \uc218\ud589\ud558\ub294 curl \uba85\ub839\uc744 \ub4e4 \uc218 \uc788\ub2e4. \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc740 \ucee4\ub110\uc5d0 \uc11c\ube44\uc2a4\ub97c \uc694\uccad\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\uc790 \uacf5\uac04\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ucd94\uc0c1\ud654\ub41c \ud504\ub85c\uadf8\ub798\ubc0d\uc778\ub370, \ucee4\ub110 \uac15\ud654 \ub3c4\uad6c\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud5c8\uc6a9\ub418\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\uc73c\uba70, CKS \uc2dc\ud5d8\uc5d0\uc11c\ub294 AppArmor\uc640 seccomp\ub77c\ub294 \ub450 \uac00\uc9c0 \ub3c4\uad6c\ub97c \uba85\uc2dc\uc801\uc73c\ub85c \uc5b8\uae09\ud558\uace0 \uc788\ub2e4. \uc774 \ub450 \ub3c4\uad6c\ub294 \ucee8\ud14c\uc774\ub108\ud654\ub41c \ud658\uacbd\uc5d0\uc11c \ubcf4\uc548\uc744 \uac15\ud654\ud558\ub294 \ub370 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \ud558\uba70, Kubernetes\uc640\uc758 \ud1b5\ud569\uc744 \ud1b5\ud574 \ubcf4\ub2e4 \uc548\uc804\ud55c \ud074\ub7ec\uc2a4\ud130 \uc6b4\uc601\uc744 \uc9c0\uc6d0\ud55c\ub2e4. \uc774 \ub450 \ub3c4\uad6c\uc640 \ucfe0\ubc84\ub124\ud2f0\uc2a4\uc640 \ud1b5\ud569\ud558\ub294 \uba54\ucee4\ub2c8\uc998\uc5d0 \ub300\ud574 \uc124\uba85\ud55c\ub2e4."),(0,a.kt)("h2",{id:"apparmor"},"AppArmor"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://apparmor.net/"},"AppArmor"),"\ub294 Linux \uc2dc\uc2a4\ud15c\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ud504\ub85c\uadf8\ub7a8\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4 \uc81c\uc5b4 \uae30\ub2a5\uc744 \uc81c\uacf5\ud55c\ub2e4. AppArmor\ub294 \uacbd\ub85c \uae30\ubc18\uc73c\ub85c \uc791\ub3d9\ud558\uba70, \ud504\ub85c\ud544\uc744 \ud1b5\ud574 \ud2b9\uc815 \ud504\ub85c\uadf8\ub7a8\uc774\ub098 \ucee8\ud14c\uc774\ub108\uac00 \ud544\uc694\ud55c \uc811\uadfc\ub9cc \ud5c8\uc6a9\ud558\ub3c4\ub85d \uc124\uc815\ud560 \uc218 \uc788\ub2e4. Kubernetes\uc5d0\uc11c\ub294 AppArmor \ud504\ub85c\ud544\uc744 Pod \ub610\ub294 \ucee8\ud14c\uc774\ub108 \uc218\uc900\uc5d0\uc11c \uc9c0\uc815\ud560 \uc218 \uc788\uc73c\uba70, securityContext\ub97c \ud1b5\ud574 \uc801\uc6a9\ud55c\ub2e4. \uc774 \ub3c4\uad6c\ub294 user space\uc5d0\uc11c \ud638\ucd9c\ub418\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uacfc \uae30\ubcf8 \uc2dc\uc2a4\ud15c \uae30\ub2a5 \uc0ac\uc774\uc5d0 \ucd94\uac00\uc801\uc778 \ubcf4\uc548 \uacc4\uce35\uc744 \uad6c\ud604\ud55c\ub2e4. \ub124\ud2b8\uc6cc\ud06c \ud638\ucd9c \ub610\ub294 \ud30c\uc77c \uc2dc\uc2a4\ud15c \uc0c1\ud638 \uc791\uc6a9\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\ub2e4. \ub9ce\uc740 Linux \ubc30\ud3ec\ud310(\uc608: Debian, Ubuntu, openSUSE)\uc774 AppArmor\ub97c \uae30\ubcf8\uc73c\ub85c \uc81c\uacf5\ud55c\ub2e4. AppArmor\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 Amazon Linux\uc640 \uac19\uc740 \ubc30\ud3ec\ud310\uc740 AppArmor\uc640 \uc720\uc0ac\ud55c \uc811\uadfc \ubc29\uc2dd\uc744 \ucde8\ud558\ub294 ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Security-Enhanced_Linux"},"SELinux"),"\ub97c \ub300\uc2e0 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4."))}f.isMDXComponent=!0}}]);