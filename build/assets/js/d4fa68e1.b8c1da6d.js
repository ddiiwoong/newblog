"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[9412],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return m}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),p=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=p(e.components);return a.createElement(o.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(t),m=r,k=c["".concat(o,".").concat(m)]||c[m]||u[m]||i;return t?a.createElement(k,l(l({ref:n},d),{},{components:t})):a.createElement(k,l({ref:n},d))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=c;var s={};for(var o in n)hasOwnProperty.call(n,o)&&(s[o]=n[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var p=2;p<i;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},34611:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var a=t(87462),r=t(63366),i=(t(67294),t(3905)),l=["components"],s={layout:"single",title:"\ud30c\ub4dc Readiness & Probe",comments:!0,classes:"wide",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/readinessandprobe/",date:new Date("2024-09-08T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","Probe","livenessProbe","readinessProbe","startupProbe","NetworkReadiness"]},o=void 0,p={permalink:"/kubernetes/readinessandprobe/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-09-08-probe.md",source:"@site/blog/2024-09-08-probe.md",title:"\ud30c\ub4dc Readiness & Probe",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",date:"2024-09-08T00:00:00.000Z",formattedDate:"September 8, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"Probe",permalink:"/tags/probe"},{label:"livenessProbe",permalink:"/tags/liveness-probe"},{label:"readinessProbe",permalink:"/tags/readiness-probe"},{label:"startupProbe",permalink:"/tags/startup-probe"},{label:"NetworkReadiness",permalink:"/tags/network-readiness"}],readingTime:16.46,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"\ud30c\ub4dc Readiness & Probe",comments:!0,classes:"wide",description:"\ud30c\ub4dc Readiness & Probe\ub97c \ud1b5\ud55c \uc0c1\ud0dc \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/readinessandprobe/",date:"2024-09-08T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","Probe","livenessProbe","readinessProbe","startupProbe","NetworkReadiness"]},nextItem:{title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",permalink:"/kubernetes/kernelhardening/"}},d={authorsImageUrls:[void 0]},u=[{value:"\ud30c\ub4dc Readiness \ubc0f \ud504\ub85c\ube0c",id:"\ud30c\ub4dc-readiness-\ubc0f-\ud504\ub85c\ube0c",level:2},{value:"Liveness \ud504\ub85c\ube0c",id:"liveness-\ud504\ub85c\ube0c",level:3},{value:"Readiness \ud504\ub85c\ube0c",id:"readiness-\ud504\ub85c\ube0c",level:3},{value:"Custom Pod Readiness Gates for AWS Load Balancer controller",id:"custom-pod-readiness-gates-for-aws-load-balancer-controller",level:4},{value:"Startup \ud504\ub85c\ube0c",id:"startup-\ud504\ub85c\ube0c",level:3},{value:"readiness gates",id:"readiness-gates",level:3},{value:"\ud30c\ub4dc Network Readiness",id:"\ud30c\ub4dc-network-readiness",level:3},{value:"\uacb0\ub860",id:"\uacb0\ub860",level:2}],c={toc:u};function m(e){var n=e.components,t=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Kubernetes\uc5d0\uc11c \ud30c\ub4dc\uc758 Readiness \ubc0f \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \ud2b8\ub798\ud53d\uc744 \ud6a8\uc728\uc801\uc73c\ub85c \uad00\ub9ac\ud558\uae30 \uc704\ud55c \uc911\uc694\ud55c \uba54\ucee4\ub2c8\uc998\uc774\ub2e4. \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc\uac00 \uc694\uccad\uc744 \ucc98\ub9ac\ud560 \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0\ub97c \ud310\ub2e8\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\uba70, Kubernetes\uac00 \ud30c\ub4dc\ub97c \uad00\ub9ac\ud558\uace0 \uc5c5\ub370\uc774\ud2b8\ud558\ub294 \ub370 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \ud55c\ub2e4."),(0,i.kt)("h2",{id:"\ud30c\ub4dc-readiness-\ubc0f-\ud504\ub85c\ube0c"},"\ud30c\ub4dc Readiness \ubc0f \ud504\ub85c\ube0c"),(0,i.kt)("p",null,"\ud30c\ub4dc Readiness\ub294 \ub530\ub77c \ud30c\ub4dc\uac00 \ud2b8\ub798\ud53d\uc744 \ucc98\ub9ac\ud560 \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0\ub97c \ub098\ud0c0\ub0b4\ub294 \ucd94\uac00\uc801\uc778 \uc9c0\ud45c\uc774\ub2e4. \ud30c\ub4dc Readiness\ub294 \uc678\ubd80 \uc18c\uc2a4\uc5d0\uc11c \ud30c\ub4dc \uc8fc\uc18c\uac00 Endpoints \uac1d\uccb4\uc5d0 \ud45c\uc2dc\ub418\ub294\uc9c0\ub97c \uacb0\uc815\ud55c\ub2e4. Kubernetes\uc5d0\uc11c \ud30c\ub4dc\ub97c \uad00\ub9ac\ud558\ub294 \ub2e4\ub978 \ub9ac\uc18c\uc2a4\ub4e4, \uc608\ub97c \ub4e4\uc5b4 Deployment \uac19\uc740 \uac83\ub4e4\uc740 \ud30c\ub4dc Readiness\ub97c \uace0\ub824\ud558\uc5ec \ub864\ub9c1 \uc5c5\ub370\uc774\ud2b8 \uc2dc \uc758\uc0ac \uacb0\uc815\uc744 \ud55c\ub2e4. \ub864\ub9c1 \ubc30\ud3ec \uc911\uc5d0 \uc0c8 \ud30c\ub4dc\uac00 \uc900\ube44\ub418\uc5c8\uc9c0\ub9cc \uc11c\ube44\uc2a4, \ub124\ud2b8\uc6cc\ud06c \uc815\ucc45 \ub610\ub294 \ub85c\ub4dc \ubc38\ub7f0\uc11c\uac00 \uc5b4\ub5a4 \uc774\uc720\ub85c \uc778\ud574 \uc544\uc9c1 \uc0c8 \ud30c\ub4dc\uc5d0 \ub300\ud574 \uc900\ube44\ub418\uc9c0 \uc54a\uc740 \uacbd\uc6b0\uac00 \uc788\uc744 \uc218 \uc788\ub2e4. \ub9cc\uc57d \ud30c\ub4dc\uc758 Readiness \ud504\ub85c\ube0c\uac00 \uc2e4\ud328\ud558\uba74, \ud574\ub2f9 \ud30c\ub4dc\uc758 IP \uc8fc\uc18c\ub294 ",(0,i.kt)("inlineCode",{parentName:"p"},"Endpoints")," \uac1d\uccb4\uc5d0\uc11c \uc81c\uac70\ub418\uc5b4 \uc11c\ube44\uc2a4\uac00 \uadf8 \ud30c\ub4dc\ub85c \ud2b8\ub798\ud53d\uc744 \ub77c\uc6b0\ud305\ud558\uc9c0 \uc54a\ub294\ub2e4. \uc774\ub294 \uc11c\ube44\uc2a4 \uc911\ub2e8\uc744 \ubc29\uc9c0\ud558\uae30 \uc704\ud55c \uba54\ucee4\ub2c8\uc998\uc774\ub2e4. Readiness \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc ",(0,i.kt)("inlineCode",{parentName:"p"},".Status.Phase")," \uc5d0 \uc601\ud5a5\uc744 \uc904 \uc218 \uc788\uc73c\uba70, Kubelet\uc774 \uc774\ub97c \uc2e4\ud589\ud558\uc5ec \uc131\uacf5 \ub610\ub294 \uc2e4\ud328\uc5d0 \ub530\ub77c \ud30c\ub4dc \uc0c1\ud0dc\ub97c \uc5c5\ub370\uc774\ud2b8\ud55c\ub2e4. "),(0,i.kt)("p",null,"\ud30c\ub4dc\uc5d0 \ud504\ub85c\ube0c\uac00 \uba85\uc2dc\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc73c\uba74 Kubernetes\uac00 \uae30\ubcf8\uc801\uc73c\ub85c \ud574\ub2f9 \ud504\ub85c\ube0c\uc758 \uc0c1\ud0dc\ub97c \uc131\uacf5\uc73c\ub85c \uac04\uc8fc\ud55c\ub2e4. \uc774\ub7f0 \uacbd\uc6b0 Kubernetes\uac00 \ucee8\ud14c\uc774\ub108\ub97c Ready \uc0c1\ud0dc\ub85c \uac04\uc8fc\ud558\uc5ec \uc11c\ube44\uc2a4\uc758 Endpoints\uc5d0 \ud3ec\ud568\uc2dc\ud0a4\uace0 \ud2b8\ub798\ud53d\uc744 \ubc1b\uc744 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4. \uadf8\ub7ec\ub098 \uc774\ub294 \uc2e4\uc81c\ub85c \ucee8\ud14c\uc774\ub108\uac00 \uc900\ube44\ub418\uc9c0 \uc54a\uc558\uc744 \ub54c\ub3c4 \ud2b8\ub798\ud53d\uc744 \ubc1b\uc744 \uc218 \uc788\uc5b4 \uc0ac\uc6a9\uc790 \uacbd\ud5d8\uc5d0 \ubd80\uc815\uc801\uc778 \uc601\ud5a5\uc744 \ubbf8\uce60 \uc218 \uc788\ub2e4. \ub530\ub77c\uc11c, \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uc0c1\ud0dc\ub97c \uc815\ud655\ud788 \ubc18\uc601\ud558\uae30 \uc704\ud574 \uc801\uc808\ud55c \ud504\ub85c\ube0c\ub97c \uc124\uc815\ud558\ub294 \uac83\uc774 \uc911\uc694\ud558\ub2e4."),(0,i.kt)("p",null,"\ub2e4\uc74c\uc740 \ud30c\ub4dc \ub2e8\uacc4\ubcc4 \uc124\uba85\uc774\ub2e4. "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Pending"),": \ud074\ub7ec\uc2a4\ud130\uc5d0\uc11c \ud30c\ub4dc\ub97c \uc218\ub77d\ud588\uc9c0\ub9cc \ud558\ub098 \uc774\uc0c1\uc758 \ucee8\ud14c\uc774\ub108\uac00 \uc124\uc815\ub418\uc5b4 \uc2e4\ud589\ud560 \uc900\ube44\uac00 \ub418\uc9c0 \uc54a\uc740 \uac83\uc744 \ub9d0\ud568. \ud30c\ub4dc\uac00 \uc2a4\ucf00\uc904\uc744 \uae30\ub2e4\ub9ac\ub294 \uc2dc\uac04\uacfc \ub124\ud2b8\uc6cc\ud06c\ub97c \ud1b5\ud574 \ucee8\ud14c\uc774\ub108 \uc774\ubbf8\uc9c0\ub97c \ub2e4\uc6b4\ub85c\ub4dc\ud558\ub294 \ub370 \uc18c\uc694\ub418\ub294 \uc2dc\uac04\uc774 \ud3ec\ud568\ub41c\ub2e4. "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Running"),": \ud30c\ub4dc\uac00 \ub178\ub4dc\uc5d0 \uc2a4\ucf00\uc904\ub418\uc5c8\uace0 \ubaa8\ub4e0 \ucee8\ud14c\uc774\ub108\uac00 \uc0dd\uc131\ub41c \uacbd\uc6b0\uc774\ub2e4. \ud558\ub098 \uc774\uc0c1\uc758 \ucee8\ud14c\uc774\ub108\uac00 \uc5ec\uc804\ud788 \uc2e4\ud589 \uc911\uc774\uac70\ub098 \uc2dc\uc791 \ub610\ub294 \uc7ac\uc2dc\uc791 \uc911\uc778 \uacbd\uc6b0\uac00 \uc788\ub2e4. \uc77c\ubd80 \ucee8\ud14c\uc774\ub108\ub294 ",(0,i.kt)("inlineCode",{parentName:"li"},"CrashLoopBackoff")," \uc640 \uac19\uc774 \uc2e4\ud328\ud55c \uc0c1\ud0dc\uc77c \uc218 \uc788\ub2e4."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Succeeded"),": \ud30c\ub4dc\uc758 \ubaa8\ub4e0 \ucee8\ud14c\uc774\ub108\uac00 \uc131\uacf5\uc801\uc73c\ub85c \uc885\ub8cc\ub418\uc5c8\uc73c\uba70 \ub2e4\uc2dc \uc2dc\uc791\ub418\uc9c0 \uc54a\ub294\ub2e4."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Failed"),": \ud30c\ub4dc\uc758 \ubaa8\ub4e0 \ucee8\ud14c\uc774\ub108\uac00 \uc885\ub8cc\ub418\uc5c8\uace0 \ud558\ub098 \uc774\uc0c1\uc758 \ucee8\ud14c\uc774\ub108\uac00 \uc2e4\ud328\ub85c \uc885\ub8cc\ub418\uc5c8\uc744 \uacbd\uc6b0\uc774\ub2e4. \ucee8\ud14c\uc774\ub108\uac00 ",(0,i.kt)("inlineCode",{parentName:"li"},"nonzero")," \uc0c1\ud0dc\ub85c \uc885\ub8cc\ub418\uc5c8\uac70\ub098 \uc2dc\uc2a4\ud15c\uc5d0 \uc758\ud574 \uc885\ub8cc\ub41c \uacbd\uc6b0\uc774\ub2e4."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Unknown"),": \ud2b9\uc815 \uc774\uc720\ub85c \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \ud655\uc778\ud560 \uc218 \uc5c6\ub294 \uacbd\uc6b0\ub2e4. \uc774 \ub2e8\uacc4\ub294 \uc77c\ubc18\uc801\uc73c\ub85c \ud30c\ub4dc\uac00 \uc2e4\ud589\ub418\uc5b4\uc57c \ud558\ub294 Kubelet\uacfc\uc758 \ud1b5\uc2e0 \uc624\ub958\ub85c \uc778\ud574 \ubc1c\uc0dd\ud55c\ub2e4. ")),(0,i.kt)("p",null,"Kubelet\uc740 Kubernetes \ub178\ub4dc\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \uc5d0\uc774\uc804\ud2b8\ub85c, \ud30c\ub4dc\uc758 \uac1c\ubcc4 \ucee8\ud14c\uc774\ub108\uc5d0 \ub300\ud574 \ub2e4\uc591\ud55c \ud5ec\uc2a4 \uccb4\ud06c\ub97c \uc218\ud589\ud55c\ub2e4. \uc774 \ud5ec\uc2a4 \uccb4\ud06c\ub294 ",(0,i.kt)("inlineCode",{parentName:"p"},"livenessProbe"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"readinessProbe"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"startupProbe")," \uc138 \uac00\uc9c0 \uc720\ud615\uc73c\ub85c \ub098\ub25c\ub2e4. \uac01 \ud504\ub85c\ube0c\ub294 \ud2b9\uc815 \uc9c4\ub2e8\uc744 \uc218\ud589\ud558\uba70, \uadf8 \uacb0\uacfc\ub294 \ub2e4\uc74c \uc138 \uac00\uc9c0 \uc911 \ud558\ub098\ub85c \ub098\ud0c0\ub09c\ub2e4."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Success"),": \ucee8\ud14c\uc774\ub108\uac00 \uc9c4\ub2e8\uc744 \ud1b5\uacfc\ud588\uc74c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Failure"),": \ucee8\ud14c\uc774\ub108\uac00 \uc9c4\ub2e8\uc744 \ud1b5\uacfc\ud558\uc9c0 \ubabb\ud588\uc74c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Unknown"),": \uc9c4\ub2e8 \uc790\uccb4\uac00 \uc2e4\ud328\ud558\uc5ec \uc544\ubb34\ub7f0 \uc870\uce58\ub97c \ucde8\ud560 \uc218 \uc5c6\ub294 \uc0c1\ud0dc")),(0,i.kt)("p",null,"\uc774\ub7ec\ud55c \ud504\ub85c\ube0c\ub294 HTTP \uc694\uccad, \ubc14\uc774\ub108\ub9ac \uba85\ub839 \uc2e4\ud589, TCP \uc5f0\uacb0\uc744 \ud1b5\ud574 \uc218\ud589\ub420 \uc218 \uc788\ub2e4. \uc608\ub97c \ub4e4\uc5b4, HTTP \ud504\ub85c\ube0c\ub294 \ud2b9\uc815 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\uc5d0 HTTP GET \uc694\uccad\uc744 \ubcf4\ub0b4 \uc751\ub2f5 \ucf54\ub4dc\uac00 \uc131\uacf5(\uc608: 200 OK)\uc778\uc9c0\ub97c \ud655\uc778\ud55c\ub2e4. TCP \ud504\ub85c\ube0c\ub294 \ud2b9\uc815 \ud3ec\ud2b8\uac00 \uc5f4\ub824 \uc788\ub294\uc9c0\ub97c \ud655\uc778\ud558\uba70, \uba85\ub839 \ud504\ub85c\ube0c\ub294 \ucee8\ud14c\uc774\ub108 \ub0b4\uc5d0\uc11c \uba85\ub839\uc744 \uc2e4\ud589\ud558\uc5ec \uc131\uacf5 \uc5ec\ubd80\ub97c \ud310\ub2e8\ud55c\ub2e4. \ud504\ub85c\ube0c\uac00 ",(0,i.kt)("inlineCode",{parentName:"p"},"failureThreshold"),"\ubcf4\ub2e4 \ub354 \ub9ce\uc774 \uc2e4\ud328\ud558\uba74, \uac80\uc0ac\uc5d0 \uc2e4\ud328\ud55c \uac83\uc73c\ub85c \uac04\uc8fc\ud55c\ub2e4. "),(0,i.kt)("h3",{id:"liveness-\ud504\ub85c\ube0c"},"Liveness \ud504\ub85c\ube0c"),(0,i.kt)("p",null,"Liveness \ud504\ub85c\ube0c\ub294 \uc798\ubabb \uc0ac\uc6a9\ud558\uac70\ub098 \uc798\ubabb \uad6c\uc131\ud558\uba74 \uc608\uae30\uce58 \uc54a\uc740 \uc7a5\uc560\ub97c \uc27d\uac8c \uc77c\uc73c\ud0ac \uc218 \uc788\ub2e4. Liveness \ud504\ub85c\ube0c\ub97c \uc8fc\ub85c \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0\ub294 \ucee8\ud14c\uc774\ub108\ub97c \ub2e4\uc2dc \uc2dc\uc791\ud574\uc57c \ud560 \uc2dc\uae30\ub97c Kubelet\uc5d0 \uc54c\ub824\uc8fc\ub294 \uac83\uc774\ub2e4. \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc0b4\uc544\uc788\uace0 \uc751\ub2f5 \uac00\ub2a5\ud55c \uc0c1\ud0dc\uc778\uc9c0\ub97c \ud655\uc778\ud55c\ub2e4. \ub9cc\uc57d \uc774 \ud504\ub85c\ube0c\uac00 \uc2e4\ud328\ud558\uba74, \ucee8\ud14c\uc774\ub108\ub294 \uc7ac\uc2dc\uc791\ub41c\ub2e4. \uc774\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \ub370\ub4dc\ub77d \uc0c1\ud0dc\uc5d0 \ube60\uc84c\uc744 \ub54c\uc5d0\ub3c4 \uc720\uc6a9\ud558\ub2e4."),(0,i.kt)("p",null,"\ud558\uc9c0\ub9cc \uc798\ubabb \uc0ac\uc6a9\ud558\uba74 \uc704\ud5d8\ud55c \uc804\ub7b5\uc774 \ub420 \uc218 \uc788\ub2e4. \uc608\ub97c \ub4e4\uc5b4, \uc6f9 \uba54\uc778 \ud398\uc774\uc9c0\ub97c \ub85c\ub4dc\ud558\ub294 Liveness \ud504\ub85c\ube0c\ub97c \uc0dd\uc131\ud55c \uc0c1\ud0dc\uc5d0\uc11c \uc678\ubd80\uc758 \uc2dc\uc2a4\ud15c \ubcc0\uacbd\uc73c\ub85c \uc778\ud574 \uba54\uc778 \ud398\uc774\uc9c0\uac00 404 \ub610\ub294 500 \uc5d0\ub7ec\ub97c \ubc18\ud658\ud55c\ub2e4\uace0 \uac00\uc815\ud574 \ubcf4\uc790. \uc774\ub7ec\ud55c \uc2dc\ub098\ub9ac\uc624\uc5d0\uc11c Liveness \ud504\ub85c\ube0c\ub294 \ucee8\ud14c\uc774\ub108\ub97c \uc7ac\uc2dc\uc791\ud55c\ub2e4. \ucee8\ud14c\uc774\ub108\ub97c \ub2e4\uc2dc \uc2dc\uc791\ud55c\ub2e4\uace0 \ud574\uc11c \uc2dc\uc2a4\ud15c\uc758 \ub2e4\ub978 \uacf3\uc5d0\uc11c \ubb38\uc81c\uac00 \ud574\uacb0\ub418\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \uc624\ud788\ub824 \uc7a5\uc560\ub97c \uc545\ud654\uc2dc\ud0ac \uc218 \uc788\ub2e4. \ucee8\ud14c\uc774\ub108 ",(0,i.kt)("inlineCode",{parentName:"p"},"CrashLoopBackoff"),"\uac00 \ubc1c\uc0dd\ud558\uac8c \ub418\ub294\ub370 \uc788\ub294\ub370, \uc774\ub294 \uc2e4\ud328\ud55c \ucee8\ud14c\uc774\ub108\ub97c \uc7ac\uc2dc\uc791\ud558\ub294 \ub370 \uc2dc\uac04\uc744 \uacc4\uc18d \uc99d\uac00\uc2dc\ud0a8\ub2e4. "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"gRPC probe: Leverages gRPC\u2019s intrinsic support for health checks"),(0,i.kt)("li",{parentName:"ul"},"HTTP probe: \ucee8\ud14c\uc774\ub108 IP \uc8fc\uc18c\ub85c HTTP GET \uc694\uccad\uc744 \uc218\ud589\ud558\uba70 200\uc5d0\uc11c 399 \uc0ac\uc774\uc758 \uc131\uacf5\uc801\uc778 HTTP \uc751\ub2f5 \ucf54\ub4dc\ub97c \uae30\ub300"),(0,i.kt)("li",{parentName:"ul"},"TCP Socket probe: TCP \uc5f0\uacb0\uc774 \uc131\uacf5\ud588\ub2e4\uace0 \uac00\uc815"),(0,i.kt)("li",{parentName:"ul"},"Exec probe: \ucee8\ud14c\uc774\ub108 \ucee4\ub110 \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc5d0\uc11c \uc784\uc758\uc758 \uba85\ub839\uc744 \uc2e4\ud589\ud558\uace0 \uc131\uacf5\uc801\uc778 \uc885\ub8cc \ucf54\ub4dc(0)\ub97c \uae30\ub300"),(0,i.kt)("li",{parentName:"ul"},"gRPC probe: \uc0c1\ud0dc \ud655\uc778\uc744 \uc704\ud574 gRPC\uc758 \uc790\uccb4 \uae30\ub2a5 \ud65c\uc6a9")),(0,i.kt)("p",null,"\ud504\ub85c\ube0c \ub3d9\uc791 \uc678\uc5d0\ub3c4 \ub2e4\uc74c \ub9e4\uac1c\ubcc0\uc218\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc0c1\ud0dc \ud655\uc778 \ub3d9\uc791\uc5d0 \uc601\ud5a5\uc744 \uc904 \uc218 \uc788\ub2e4."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"initialDelaySeconds"),": \uccab \ubc88\uc9f8 liveness probe\uac00 \ud655\uc778\ub420 \ub54c\uae4c\uc9c0 \ub300\uae30\ud560 \uc2dc\uac04(\ucd08)\uc744 \uc9c0\uc815"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"periodSeconds"),": liveness probe \uac80\uc0ac \uac04\uaca9(\ucd08)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"timeoutSeconds"),":\ud504\ub85c\ube0c \uac80\uc0ac\uac00 \uc2e4\ud328\ub85c \uac04\uc8fc\ub418\uae30 \uc804\uc5d0 \ubc18\ud658\ub420 \ub54c\uae4c\uc9c0 \ud5c8\uc6a9\ub418\ub294 \ucd5c\ub300 \uc2dc\uac04"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"failureThreshold"),": \ucee8\ud14c\uc774\ub108\uac00 \uc815\uc0c1\uc774 \uc544\ub2cc \uac83\uc73c\ub85c \uac04\uc8fc\ub418\uc5b4 \ub2e4\uc2dc \uc2dc\uc791\ud574\uc57c \ud560 \ub54c\uae4c\uc9c0 \ud504\ub85c\ube0c \uac80\uc0ac\uac00 \uc5f0\uc18d\uc73c\ub85c \uc2e4\ud328\ud574\uc57c \ud558\ub294 \ube48\ub3c4\ub97c \uc9c0\uc815")),(0,i.kt)("h3",{id:"readiness-\ud504\ub85c\ube0c"},"Readiness \ud504\ub85c\ube0c"),(0,i.kt)("p",null,"Readiness \ud504\ub85c\ube0c\ub294 \uc815\uc0c1\uc774 \uc544\ub2cc \ucee8\ud14c\uc774\ub108\ub97c \uc0ad\uc81c\ud558\uace0 \uc0c8 \ucee8\ud14c\uc774\ub108\ub85c \uad50\uccb4\ud558\uc5ec \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uac74\uac15\ud558\uac8c \uc720\uc9c0\ud558\ub294 \ub370 \ub3c4\uc6c0\uc774  \ub420 \uc218 \uc788\ub2e4. \uadf8\ub7ec\ub098 \ub54c\ub85c \ucee8\ud14c\uc774\ub108\uac00 \ube44\uc815\uc0c1\uc801\uc778 \uacbd\uc6b0 \ub2e4\uc2dc \uc2dc\uc791\ud574\ub3c4 \ubb38\uc81c\uac00 \ud574\uacb0\ub418\uc9c0 \uc54a\ub294 \uacbd\uc6b0\uac00 \uc788\ub2e4. \ub300\ud45c\uc801\uc778 \uc608\ub85c \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc640 \uac19\uc740 \uc885\uc18d\uc131\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\uae30\ub97c \uae30\ub2e4\ub9ac\ub294 \uacbd\uc6b0\uc774\ub2e4. \ucee8\ud14c\uc774\ub108\uc5d0 \uacfc\ubd80\ud558\uac00 \uac78\ub824 latency\uac00 \uc99d\uac00\ud558\ub294 \uacbd\uc6b0 \uc7a0\uc2dc \ub3d9\uc548 \ucd94\uac00 \ubd80\ud558\ub85c\ubd80\ud130 \uc2a4\uc2a4\ub85c\ub97c \ubcf4\ud638\ud558\uace0 \ubd80\ud558\uac00 \uac10\uc18c\ud560 \ub54c\uae4c\uc9c0 \uc900\ube44\uac00 \ub418\uc9c0 \uc54a\uc558\ub2e4\ub294 \uac83\uc744 \ud45c\uc2dc\ud574\uc57c \ud55c\ub2e4."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"},"https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/")," \uc5d0\uc11c readinessGates \ub97c \ud1b5\ud574 \ucd94\uac00\uc801\uc778 AWS ALB \uc0c1\ud0dc\ub97c \uccb4\ud06c\ud558\uace0 \uc815\uc0c1\uc77c\ub54c Readiness Probe \uccb4\ud06c\uac00 \ub418\ub3c4\ub85d \uc544\ub798\uc640 \uac19\uc774 \ucd94\uac00 \ud53c\ub4dc\ubc31\uc774\ub098 \uc2e0\ud638\ub97c \ud30c\ub4dc \uc0c1\ud0dc\uc5d0 \uc8fc\uc785\ud560 \uc218 \uc788\ub2e4."),(0,i.kt)("h4",{id:"custom-pod-readiness-gates-for-aws-load-balancer-controller"},"Custom Pod Readiness Gates for AWS Load Balancer controller"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.8/deploy/pod_readiness_gate/"},"https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.8/deploy/pod_readiness_gate/")),(0,i.kt)("h3",{id:"startup-\ud504\ub85c\ube0c"},"Startup \ud504\ub85c\ube0c"),(0,i.kt)("p",null,"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uc2dc\uc791\ud558\ub294 \ub370 \uc624\ub79c\uc2dc\uac04(\uba87 \ubd84\uc774\uc0c1)\uc774 \uac78\ub9ac\ub294 \uc0c1\ud669\uc5d0\uc11c Kubernetes\ub294 Startup \ud504\ub85c\ube0c\ub97c \uc81c\uacf5\ud55c\ub2e4. Liveness \ud504\ub85c\ube0c\uc640 \ub3d9\uc77c\ud55c \ud615\uc2dd\uc73c\ub85c \uad6c\uc131\ub418\uc9c0\ub9cc \ud504\ub85c\ube0c \ub3d9\uc791\uacfc \ud0c0\uc774\ubc0d \ud30c\ub77c\ubbf8\ud130\uc5d0 \ub300\ud574 \ub2e4\ub978 \uac12\uc744 \ud5c8\uc6a9\ud55c\ub2e4. ",(0,i.kt)("inlineCode",{parentName:"p"},"periodSeconds")," \ubc0f ",(0,i.kt)("inlineCode",{parentName:"p"},"failureThreshold")," \uc124\uc815\uc744 \ud1b5\ud574 \uc624\ub798 \uac78\ub9ac\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158 \uc2dc\uc791\uc744 \uace0\ub824\ud558\uae30 \uc704\ud574 \ud574\ub2f9 Liveness \ud504\ub85c\ube0c\uc5d0 \ube44\ud574 \ud6e8\uc52c \ub354 \ud070 \uac12\uc73c\ub85c \uad6c\uc131\ub41c\ub2e4. ",(0,i.kt)("inlineCode",{parentName:"p"},"startupProbe"),"\uac00 \uc131\uacf5\ud55c \uc774\ud6c4\uc5d0\ub9cc ",(0,i.kt)("inlineCode",{parentName:"p"},"livenessProbe"),"\uc640 ",(0,i.kt)("inlineCode",{parentName:"p"},"readinessProbe"),"\ub97c \uad6c\uc131\ud560 \uc218 \uc788\ub2e4. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: pod-startup-check\nspec:\n  containers:\n  - image: quay.io/wildfly/wildfly \n    name: wildfly\n    startupProbe:\n      exec:\n        command: [ "stat", "/opt/jboss/wildfly/standalone/tmp/startup-marker" ]  \n        initialDelaySeconds: 60    \n        periodSeconds: 60\n        failureThreshold: 15\n    livenessProbe:\n      httpGet:\n        path: /health\n        port: 9990\n        periodSeconds: 10          \n        failureThreshold: 3\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"exec"),": ",(0,i.kt)("inlineCode",{parentName:"li"},"/opt/jboss/wildfly/standalone/tmp/startup-marker")," \ud30c\uc77c\uc758 \uc874\uc7ac \uc5ec\ubd80\ub97c \ud655\uc778\ud55c\ub2e4. \uc774 \ud30c\uc77c\uc774 \uc874\uc7ac\ud558\uba74 \ucee8\ud14c\uc774\ub108\uac00 \uc2dc\uc791\ub41c \uac83\uc73c\ub85c \uac04\uc8fc"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"initialDelaySeconds"),": \ucee8\ud14c\uc774\ub108\uac00 15\ubd84 \ud6c4(60\ucd08 x 15\ud68c, \ucd5c\ucd08 \ub51c\ub808\uc774 60\ucd08) \uc5d0\ub3c4 startupProbe\ub97c \ud1b5\uacfc\ud558\uc9c0 \ubabb\ud588\uc744 \ub54c \ucee8\ud14c\uc774\ub108\ub97c \ub2e4\uc2dc \uc2dc\uc791\ud558\ub3c4\ub85d \uc9c0\uc815\ud558\ub294 \ub9e4\uac1c\ubcc0\uc218"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"periodSeconds"),": \ud504\ub85c\ube0c\uac00 \uc2e4\ud589\ub418\ub294 \uc8fc\uae30\ub85c, 60\ucd08\ub9c8\ub2e4 \ud504\ub85c\ube0c\uac00 \uc2e4\ud589"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"failureThreshold"),": \uc2e4\ud328 \ud5c8\uc6a9 \ud69f\uc218\ub85c, 15\ubc88 \uc2e4\ud328\ud558\uba74 \ucee8\ud14c\uc774\ub108\uac00 \ube44\uc815\uc0c1\uc73c\ub85c \uac04\uc8fc")),(0,i.kt)("p",null,"\uc704 \uc608\uc2dc\ub294 startupProbe\uac00 \ubbf8\ub4e4\uc6e8\uc5b4\uc778 Wildfly \ucee8\ud14c\uc774\ub108\uac00 \uc2dc\uc791\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4. \ucee8\ud14c\uc774\ub108\uac00 \uc2dc\uc791\ub418\uae30 \uc804\uae4c\uc9c0 \ub2e4\ub978 \ud504\ub85c\ube0c(liveness, readiness)\ub294 \uc2e4\ud589\ub418\uc9c0 \uc54a\ub294\ub2e4. \uc608\uc2dc\uc640 \uac19\uc774 \ucee8\ud14c\uc774\ub108\ub97c \uc2dc\uc791\ud558\ub294 \ub370 \uba87 \ubd84\uc774 \uac78\ub9ac\uc9c0\ub9cc \uc2dc\uc791 \ud6c4 \ucee8\ud14c\uc774\ub108\uac00 \uc0c1\ud0dc\uac00 \uc88b\uc9c0 \uc54a\uc73c\uba74 \ube60\ub974\uac8c \uc885\ub8cc\ud558\ub294 \ucf00\uc774\uc2a4\ub85c \uc8fc\ub85c \uc0ac\uc6a9\ud55c\ub2e4. \uc774\ud6c4\uc5d0 livenessProbe\ub294 \ucee8\ud14c\uc774\ub108\uc758 \uc9c0\uc18d\uc801\uc778 \uc2e4\ud589 \uc0c1\ud0dc\ub97c \ud655\uc778\ud55c\ub2e4. /health \uc5d4\ub4dc\ud3ec\uc778\ud2b8\uc5d0 \ub300\ud55c HTTP \uc694\uccad\uc744 \ud1b5\ud574 Wildfly \uc11c\ubc84\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc791\ub3d9 \uc911\uc778\uc9c0 \ud655\uc778\ud55c\ub2e4."),(0,i.kt)("p",null,"\uc544\ub798 \uc608\uc2dc\ub294 Golang \uc6f9 \uc11c\ubc84\uc5d0\ub294 8080 \ud3ec\ud2b8\uc5d0\uc11c /healthz \uacbd\ub85c\ub85c HTTP GET\uc744 \uc218\ud589\ud558\ub294 livenessProbe \ud504\ub85c\ube0c\uac00 \uc788\uace0, readinessProbe \ud504\ub85c\ube0c\ub294 \ub3d9\uc77c\ud55c \ud3ec\ud2b8\uc5d0\uc11c /\ub97c \uccb4\ud06c\ud55c\ub2e4."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: go-web\n  labels:\n    test: liveness\nspec:\n  containers:\n  - name: go-web\n    image: go-web:v0.0.1\n    ports:\n    - containerPort: 8080\n    livenessProbe:\n      httpGet:\n        path: /healthz\n        port: 8080\n      initialDelaySeconds: 5\n      periodSeconds: 5\n    readinessProbe:\n      httpGet:\n        path: /\n        port: 8080\n      initialDelaySeconds: 5\n      periodSeconds: 5\n")),(0,i.kt)("h3",{id:"readiness-gates"},"readiness gates"),(0,i.kt)("p",null,"Readiness gates\ub97c \uc0ac\uc6a9\ud558\uba74 \ud30c\ub4dc \ub0b4\ubd80\uc758 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc5b8\uc81c \uc900\ube44\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. Kubernetes 1.14\ubd80\ud130 \uc0ac\uc6a9 \uac00\ub2a5\ud588\uace0, Readiness gates\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574 Kubelet\uc774 \ud30c\ub4dc Readiness\ub97c \ud3c9\uac00\ud558\ub294 \ucd94\uac00 \uc870\uac74\uc73c\ub85c \ud30c\ub4dc\uc758 \uc2a4\ud399\uc5d0 ",(0,i.kt)("inlineCode",{parentName:"p"},"readinessGates"),"\ub97c \ucd94\uac00\ud55c\ub2e4.Readiness \uac8c\uc774\ud2b8\ub294 \ud30c\ub4dc\uc758 ",(0,i.kt)("inlineCode",{parentName:"p"},"status.condition")," \ud544\ub4dc\uc758 \ud604\uc7ac \uc0c1\ud0dc\uc5d0 \uc758\ud574 \uc81c\uc5b4\ub418\uba70, Kubelet\uc774 \ud30c\ub4dc\uc758 ",(0,i.kt)("inlineCode",{parentName:"p"},"status.conditions")," \ud544\ub4dc\uc5d0\uc11c \ud574\ub2f9 \uc870\uac74\uc744 \ucc3e\uc744 \uc218 \uc5c6\ub294 \uacbd\uc6b0 \uc870\uac74\uc758 \uc0c1\ud0dc\ub294 \uae30\ubcf8\uac12\uc774 False\ub85c \uc124\uc815\ub41c\ub2e4."),(0,i.kt)("p",null,"\uc544\ub798 \uc608\uc5d0\uc11c \ubcfc \uc218 \uc788\ub4ef\uc774, ",(0,i.kt)("inlineCode",{parentName:"p"},"feature-1")," Readiness gates\ub294 ",(0,i.kt)("inlineCode",{parentName:"p"},"False"),"\uc774\uace0 ",(0,i.kt)("inlineCode",{parentName:"p"},"feature-2"),"\ub294 ",(0,i.kt)("inlineCode",{parentName:"p"},"True"),"\uc774\ubbc0\ub85c \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub294 ",(0,i.kt)("inlineCode",{parentName:"p"},"False"),"\uac00 \ub41c\ub2e4. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'kind: Pod\n...\nspec:\n  readinessGates:\n    - conditionType: www.example.com/feature-1\n    - conditionType: www.example.com/feature-2\n...\nstatus:\n  conditions:\n    - lastProbeTime: null\n      lastTransitionTime: 2024-08-25T00:00:00Z\n      status: "False"\n      type: Ready\n    - lastProbeTime: null\n      lastTransitionTime: 2024-08-25T00:00:00Z\n      status: "False"\n      type: www.example.com/feature-1\n    - lastProbeTime: null\n      lastTransitionTime: 2024-08-25T00:00:00Z\n      status: "True"\n      type: www.example.com/feature-2\n  containerStatuses:\n    - containerID: docker://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n      ready: true\n')),(0,i.kt)("p",null,"\uc0ac\uc6a9\uc790 \uc815\uc758 \uc870\uac74\uc744 \uc0ac\uc6a9\ud558\ub294 \ud30c\ub4dc\uc758 \uacbd\uc6b0, \ud574\ub2f9 \ud30c\ub4dc\ub294 \ub2e4\uc74c \ubb38\uc774 \ubaa8\ub450 \uc801\uc6a9\ub418\ub294 \uacbd\uc6b0\uc5d0\ub9cc \uc900\ube44\ub41c \uac83\uc73c\ub85c \ud3c9\uac00\ub41c\ub2e4."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\ud30c\ub4dc\uc758 \ubaa8\ub4e0 \ucee8\ud14c\uc774\ub108\uac00 \uc900\ube44 \uc0c1\ud0dc"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"readinessGates"),"\uc5d0 \uc9c0\uc815\ub41c \ubaa8\ub4e0 \uc870\uac74\uc774 ",(0,i.kt)("inlineCode",{parentName:"li"},"True"))),(0,i.kt)("h3",{id:"\ud30c\ub4dc-network-readiness"},"\ud30c\ub4dc Network Readiness"),(0,i.kt)("p",null,"\ud30c\ub4dc Network Readiness\ub294 Kubernetes v1.29\uc5d0\uc11c beta\uac00 \ub41c readiness\ub85c Kubernetes\uc5d0\uc11c \ud30c\ub4dc\uac00 \ub124\ud2b8\uc6cc\ud06c \uc694\uccad\uc744 \ucc98\ub9ac\ud560 \uc900\ube44\uac00 \ub418\uc5c8\ub294\uc9c0\ub97c \ud655\uc778\ud558\ub294 \uc911\uc694\ud55c \uc870\uac74\uc774\ub2e4. \ud30c\ub4dc\uac00 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc5d0\uc11c \ud2b8\ub798\ud53d\uc744 \uc218\uc2e0\ud560 \uc218 \uc788\ub294 \uc0c1\ud0dc\uc778\uc9c0 \ud310\ub2e8\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\uace0 \ud30c\ub4dc\uac00 \ub124\ud2b8\uc6cc\ud06c \uc900\ube44 \uc0c1\ud0dc\uac00 \ub418\uba74, \ud574\ub2f9 \ud30c\ub4dc\ub294 \uc11c\ube44\uc2a4\uc758 \ub85c\ub4dc \ubc38\ub7f0\uc2f1 \ud480\uc5d0 \ucd94\uac00\ub418\uc5b4 \ud2b8\ub798\ud53d\uc744 \ucc98\ub9ac\ud560 \uc218 \uc788\uac8c \ub41c\ub2e4. "),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"PodReadyToStartContainersCondition"),"\ub294 ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/"},"feature gate"),"\uac00 \ud65c\uc131\ud654\ub418\uba74(1.31 \ubc84\uc804 \ubd80\ud130\ub294 \uae30\ubcf8\uc73c\ub85c \ud0d1\uc7ac\ub420 \uc608\uc815) \ud30c\ub4dc\uc758 ",(0,i.kt)("inlineCode",{parentName:"p"},"status.conditions"),"\uc5d0 ",(0,i.kt)("inlineCode",{parentName:"p"},"PodReadyToStartContainers")," \uc870\uac74\uc774 \ucd94\uac00\ub41c\ub2e4. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: example-pod\nspec:\n  containers:\n  - name: example-container\n    image: example-image\nstatus:\n  conditions:\n  - type: PodReadyToStartContainers\n    status: "True"\n')),(0,i.kt)("p",null,"\uc704 \uc608\uc2dc\uc5d0\uc11c ",(0,i.kt)("inlineCode",{parentName:"p"},"PodReadyToStartContainers")," \uc870\uac74\uc774 True\ub85c \ub418\uc5b4 \uc788\uc73c\uba74, kubelet\uc740 \ucee8\ud14c\uc774\ub108 \uc774\ubbf8\uc9c0\ub97c \ud480\ub9c1\ud558\uace0 \ucee8\ud14c\uc774\ub108\ub97c \uc0dd\uc131\ud560 \uc900\ube44\uac00 \ub418\uc5c8\uc74c\uc744 \uc758\ubbf8\ud55c\ub2e4."),(0,i.kt)("h2",{id:"\uacb0\ub860"},"\uacb0\ub860"),(0,i.kt)("p",null,"Kubernetes\uc758 Readiness \ubc0f \ud504\ub85c\ube0c\ub294 \ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \ud2b8\ub798\ud53d\uc744 \ud6a8\uc728\uc801\uc73c\ub85c \uad00\ub9ac\ud558\ub294 \ub370 \ud544\uc218\uc801\uc774\ub2e4. \uc801\uc808\ud55c \ud504\ub85c\ube0c \uc124\uc815\uc744 \ud1b5\ud574 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \uac00\uc6a9\uc131\uacfc \uc548\uc815\uc131\uc744 \ub192\uc77c \uc218 \uc788\ub2e4. \ud504\ub85c\ube0c\ub97c \uc124\uc815\ud560 \ub54c\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \ud2b9\uc131\uacfc \uc694\uad6c \uc0ac\ud56d\uc5d0 \ub9de\uac8c \uad6c\uc131\ud558\ub294 \uac83\uc774 \uc911\uc694\ud558\ub2e4."))}m.isMDXComponent=!0}}]);