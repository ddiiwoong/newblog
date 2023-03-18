"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[3104],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=s(n),d=o,k=m["".concat(u,".").concat(d)]||m[d]||p[d]||i;return n?r.createElement(k,l(l({ref:t},c),{},{components:n})):r.createElement(k,l({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=m;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},40354:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return a},metadata:function(){return s},toc:function(){return p}});var r=n(87462),o=n(63366),i=(n(67294),n(3905)),l=["components"],a={layout:"single",title:"kOps with Cilium",comments:!0,classes:"wide",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cilium/",date:new Date("2023-03-18T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","CNI","Networking","Cilium"]},u=void 0,s={permalink:"/kubernetes/kops-cilium/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-03-18-kops-cillium.md",source:"@site/blog/2023-03-18-kops-cillium.md",title:"kOps with Cilium",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",date:"2023-03-18T00:00:00.000Z",formattedDate:"March 18, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"kOps",permalink:"/tags/k-ops"},{label:"Cloud9",permalink:"/tags/cloud-9"},{label:"CloudFormation",permalink:"/tags/cloud-formation"},{label:"CNI",permalink:"/tags/cni"},{label:"Networking",permalink:"/tags/networking"},{label:"Cilium",permalink:"/tags/cilium"}],readingTime:11.97,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"kOps with Cilium",comments:!0,classes:"wide",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cilium/",date:"2023-03-18T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","CNI","Networking","Cilium"]},nextItem:{title:"kOps with Cloud9",permalink:"/kubernetes/kops-cloud9/"}},c={authorsImageUrls:[void 0]},p=[{value:"PKOS Study #2",id:"pkos-study-2",level:2},{value:"kOps with Cloud9",id:"kops-with-cloud9",level:2}],m={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"pkos-study-2"},"PKOS Study #2"),(0,i.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d (4+1)\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \ub450\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. '),(0,i.kt)("p",null,"\uc774\ubc88 \uc2a4\ud130\ub514 \uacfc\uc81c\uc5d0\uc11c\ub294 Cilium\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 kOps \ud074\ub7ec\uc2a4\ud130\ub97c \uc0dd\uc131\ud558\uace0 \ub124\ud2b8\uc6cc\ud06c \uad6c\uc131\uc774 \uc5b4\ub5bb\uac8c \ub418\ub294\uc9c0 \ud655\uc778\ud574\ubcf4\uace0\uc790 \ud55c\ub2e4. Cilium\ub294 Linux \ucee4\ub110 \ub0b4\uc5d0 \uac15\ub825\ud55c \ubcf4\uc548 \uac00\uc2dc\uc131 \ubc0f \uc81c\uc5b4 \ub85c\uc9c1\uc744 \ub3d9\uc801\uc73c\ub85c \uc0bd\uc785\ud560 \uc218 \uc788\ub294 BPF\ub77c\ub294 Linux \ucee4\ub110 \uae30\uc220\uc744 \uc0ac\uc6a9\ud558\ub294 CNI\uc774\ub2e4. "),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://cilium.io/"},"https://cilium.io/"),"\n",(0,i.kt)("a",{parentName:"p",href:"https://kops.sigs.k8s.io/networking/cilium/"},"https://kops.sigs.k8s.io/networking/cilium/")),(0,i.kt)("h2",{id:"kops-with-cloud9"},"kOps with Cloud9"),(0,i.kt)("p",null,"\uae00\uc744 \uc791\uc131\ud558\ub294 \ub0a0\uc9dc \uae30\uc900(23\ub144 3\uc6d4 18\uc77c), \ubc84\uc804\uc740 1.25.11 \uc73c\ub85c \uc9c4\ud589\uc744 \ud55c\ub2e4. \uc9c0\ub09c\ubc88 \uad6c\uc131\uacfc \ub3d9\uc77c\ud558\uac8c Bastion\uc740 Cloud9\uc5d0\uc11c \uad6c\uc131\uc744 \uc9c4\ud589\ud558\uc600\ub2e4. \uc9c0\ub09c\ubc88 \uc791\uc131\ud55c Cloud9 \uae30\ubc18 \uc778\uc2a4\ud134\uc2a4\ub294 \uc544\ub798 \ub9c1\ud06c\uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml"},"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml")))}d.isMDXComponent=!0}}]);