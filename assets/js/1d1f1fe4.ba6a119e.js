"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[1373],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),g=c(n),m=o,b=g["".concat(s,".").concat(m)]||g[m]||p[m]||a;return n?r.createElement(b,l(l({ref:t},u),{},{components:n})):r.createElement(b,l({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=g;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},87127:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return p}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),l=["components"],i={layout:"single",title:"Tetragon",comments:!0,classes:"wide",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/tetragon",date:new Date("2024-10-27T00:00:00.000Z"),categories:["Kubernetes"],tags:["Tetragon","eBPF","security","kernel","kubernetes","systemcall"]},s=void 0,c={permalink:"/kubernetes/tetragon",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-10-27-tetragon.md",source:"@site/blog/2024-10-27-tetragon.md",title:"Tetragon",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",date:"2024-10-27T00:00:00.000Z",formattedDate:"October 27, 2024",tags:[{label:"Tetragon",permalink:"/tags/tetragon"},{label:"eBPF",permalink:"/tags/e-bpf"},{label:"security",permalink:"/tags/security"},{label:"kernel",permalink:"/tags/kernel"},{label:"kubernetes",permalink:"/tags/kubernetes"},{label:"systemcall",permalink:"/tags/systemcall"}],readingTime:17.46,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"Tetragon",comments:!0,classes:"wide",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/tetragon",date:"2024-10-27T00:00:00.000Z",categories:["Kubernetes"],tags:["Tetragon","eBPF","security","kernel","kubernetes","systemcall"]},nextItem:{title:"Istio Ambient Mode on K3d",permalink:"/kubernetes/istio-ambient"}},u={authorsImageUrls:[void 0]},p=[{value:"Tetragon",id:"tetragon",level:2},{value:"Tetragon\uc774\ub780 \ubb34\uc5c7\uc778\uac00?",id:"tetragon\uc774\ub780-\ubb34\uc5c7\uc778\uac00",level:3},{value:"\uadf8\ub9bc \ucd9c\ucc98: https://isovalent.com/blog/post/2022-05-16-tetragon/",id:"\uadf8\ub9bc-\ucd9c\ucc98-httpsisovalentcomblogpost2022-05-16-tetragon",level:5}],g={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc2a4\ud130\ub514 \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")),(0,a.kt)("h2",{id:"tetragon"},"Tetragon"),(0,a.kt)("p",null,"Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1\uc744 \uc218\ud589\ud558\ub294 \ubc29\ubc95\uc5d0 \ub300\ud574 \uac04\ub2e8\ud788 \uc54c\uc544\ubcf4\uc790."),(0,a.kt)("h3",{id:"tetragon\uc774\ub780-\ubb34\uc5c7\uc778\uac00"},"Tetragon\uc774\ub780 \ubb34\uc5c7\uc778\uac00?"),(0,a.kt)("h5",{id:"\uadf8\ub9bc-\ucd9c\ucc98-httpsisovalentcomblogpost2022-05-16-tetragon"},"\uadf8\ub9bc \ucd9c\ucc98: ",(0,a.kt)("a",{parentName:"h5",href:"https://isovalent.com/blog/post/2022-05-16-tetragon/"},"https://isovalent.com/blog/post/2022-05-16-tetragon/")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://isovalent.wpengine.com/wp-content/uploads/2022/06/enforcement2.png",alt:"tetragon"})," "),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://tetragon.io/"},"https://tetragon.io/")),(0,a.kt)("p",null,"Tetragon\uc740 eBPF(extended Berkeley Packet Filter)\ub97c \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uac15\ub825\ud55c \ubcf4\uc548 \ubc0f \ubaa8\ub2c8\ud130\ub9c1 \ub3c4\uad6c\uc774\ub2e4. eBPF\ub294 \ucee4\ub110 \ub808\ubca8\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ud504\ub85c\uadf8\ub7a8\uc73c\ub85c, \uc2dc\uc2a4\ud15c \uc131\ub2a5\uc5d0 \ucd5c\uc18c\ud55c\uc758 \uc601\ud5a5\uc744 \uc8fc\uba74\uc11c \uc2e4\uc2dc\uac04\uc73c\ub85c \ub370\uc774\ud130\ub97c \uc218\uc9d1\ud558\uace0 \ucc98\ub9ac\ud560 \uc218 \uc788\ub2e4. Tetragon\uc740 \uc774\ub97c \ud65c\uc6a9\ud558\uc5ec Kubernetes \ud658\uacbd\uc5d0\uc11c \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d, \uc2dc\uc2a4\ud15c \ud638\ucd9c, \ucee8\ud14c\uc774\ub108 \ud65c\ub3d9 \ub4f1\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \ubd84\uc11d\ud560 \uc218 \uc788\ub2e4."))}m.isMDXComponent=!0}}]);