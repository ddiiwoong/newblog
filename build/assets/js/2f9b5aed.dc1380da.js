"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[6425],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(r),f=o,d=m["".concat(u,".").concat(f)]||m[f]||p[f]||a;return r?n.createElement(d,i(i({ref:t},c),{},{components:r})):n.createElement(d,i({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},60791:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var n=r(87462),o=r(63366),a=(r(67294),r(3905)),i=["components"],s={layout:"single",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",comments:!0,classes:"wide",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/k6-prometheus/",date:new Date("2023-04-01T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","grafana","loadtest","prometheus","performance test","k6"]},u=void 0,l={permalink:"/kubernetes/k6-prometheus/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-04-01-k6-prometheus copy.md",source:"@site/blog/2023-04-01-k6-prometheus copy.md",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",date:"2023-04-01T00:00:00.000Z",formattedDate:"April 1, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"grafana",permalink:"/tags/grafana"},{label:"loadtest",permalink:"/tags/loadtest"},{label:"prometheus",permalink:"/tags/prometheus"},{label:"performance test",permalink:"/tags/performance-test"},{label:"k6",permalink:"/tags/k-6"}],readingTime:10.675,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",comments:!0,classes:"wide",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/k6-prometheus/",date:"2023-04-01T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","grafana","loadtest","prometheus","performance test","k6"]},nextItem:{title:"kyverno\ub97c \ud65c\uc6a9\ud55c Kubernetes \uc815\ucc45 \uc5d4\uc9c4 \uc801\uc6a9",permalink:"/kubernetes/kyverno/"}},c={authorsImageUrls:[void 0]},p=[{value:"PKOS Study #4",id:"pkos-study-4",level:2}],m={toc:p};function f(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"pkos-study-4"},"PKOS Study #4"),(0,a.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d (4+1)\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \ub124\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. '),(0,a.kt)("p",null,"\uc774\ubc88 \uc2a4\ud130\ub514 \uacfc\uc81c\uc5d0\uc11c\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \ubd80\ud558 \ud14c\uc2a4\ud2b8\ub97c k6\ub97c \uc774\uc6a9\ud558\uc5ec \uc9c4\ud589\ud558\uace0 \uacb0\uacfc\ub97c prometheus \ubc0f grafana\ub85c \uc804\ub2ec\ud558\uc5ec \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc791\uc131\ud55c\ub2e4."))}f.isMDXComponent=!0}}]);