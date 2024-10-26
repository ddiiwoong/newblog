"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[8934],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return g}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(t),g=r,f=p["".concat(s,".").concat(g)]||p[g]||d[g]||l;return t?a.createElement(f,o(o({ref:n},u),{},{components:t})):a.createElement(f,o({ref:n},u))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,o=new Array(l);o[0]=p;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},53868:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return d}});var a=t(87462),r=t(63366),l=(t(67294),t(3905)),o=["components"],i={layout:"single",title:"Tetragon",comments:!0,classes:"wide",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/tetragon",date:new Date("2024-10-27T00:00:00.000Z"),categories:["Kubernetes"],tags:["Tetragon","eBPF","security","kernel","kubernetes","systemcall"]},s=void 0,c={permalink:"/kubernetes/tetragon",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-10-27-tetragon.md",source:"@site/blog/2024-10-27-tetragon.md",title:"Tetragon",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",date:"2024-10-27T00:00:00.000Z",formattedDate:"October 27, 2024",tags:[{label:"Tetragon",permalink:"/tags/tetragon"},{label:"eBPF",permalink:"/tags/e-bpf"},{label:"security",permalink:"/tags/security"},{label:"kernel",permalink:"/tags/kernel"},{label:"kubernetes",permalink:"/tags/kubernetes"},{label:"systemcall",permalink:"/tags/systemcall"}],readingTime:17.46,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"Tetragon",comments:!0,classes:"wide",description:"eBPF \uae30\ubc18 Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/tetragon",date:"2024-10-27T00:00:00.000Z",categories:["Kubernetes"],tags:["Tetragon","eBPF","security","kernel","kubernetes","systemcall"]},nextItem:{title:"Istio Ambient Mode on K3d",permalink:"/kubernetes/istio-ambient"}},u={authorsImageUrls:[void 0]},d=[{value:"Tetragon",id:"tetragon",level:2},{value:"Tetragon\uc774\ub780 \ubb34\uc5c7\uc778\uac00?",id:"tetragon\uc774\ub780-\ubb34\uc5c7\uc778\uac00",level:3},{value:"\uadf8\ub9bc \ucd9c\ucc98: https://isovalent.com/blog/post/2022-05-16-tetragon/",id:"\uadf8\ub9bc-\ucd9c\ucc98-httpsisovalentcomblogpost2022-05-16-tetragon",level:5},{value:"Tetragon\uc740 \ubc18\ub4dc\uc2dc Cilium\uc774 \uc788\uc5b4\uc57c \ud558\ub098?",id:"tetragon\uc740-\ubc18\ub4dc\uc2dc-cilium\uc774-\uc788\uc5b4\uc57c-\ud558\ub098",level:3},{value:"Tetragon \uc124\uce58 \ubc0f \uc124\uc815",id:"tetragon-\uc124\uce58-\ubc0f-\uc124\uc815",level:2},{value:"\uc694\uad6c \uc0ac\ud56d \ubc0f \ud14c\uc2a4\ud2b8 \ud658\uacbd",id:"\uc694\uad6c-\uc0ac\ud56d-\ubc0f-\ud14c\uc2a4\ud2b8-\ud658\uacbd",level:3},{value:"Kind \uc124\uce58",id:"kind-\uc124\uce58",level:3},{value:"Tetragon \uc124\uce58",id:"tetragon-\uc124\uce58",level:3},{value:"\uc0d8\ud50c \uc571 \ubc30\ud3ec",id:"\uc0d8\ud50c-\uc571-\ubc30\ud3ec",level:3},{value:"Tetragon \uc0ac\uc6a9 \uc608\uc2dc",id:"tetragon-\uc0ac\uc6a9-\uc608\uc2dc",level:2},{value:"tetra CLI \uc0ac\uc6a9",id:"tetra-cli-\uc0ac\uc6a9",level:3},{value:"\ud30c\uc77c \uc2dc\uc2a4\ud15c \uc561\uc138\uc2a4 \ucd94\uc801 \ubc0f \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d \ubaa8\ub2c8\ud130\ub9c1",id:"\ud30c\uc77c-\uc2dc\uc2a4\ud15c-\uc561\uc138\uc2a4-\ucd94\uc801-\ubc0f-\ub124\ud2b8\uc6cc\ud06c-\ud2b8\ub798\ud53d-\ubaa8\ub2c8\ud130\ub9c1",level:3},{value:"\ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d \ubaa8\ub2c8\ud130\ub9c1",id:"\ub124\ud2b8\uc6cc\ud06c-\ud2b8\ub798\ud53d-\ubaa8\ub2c8\ud130\ub9c1",level:3},{value:"\uacb0\ub860",id:"\uacb0\ub860",level:2}],p={toc:d};function g(e){var n=e.components,t=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc2a4\ud130\ub514 \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")),(0,l.kt)("h2",{id:"tetragon"},"Tetragon"),(0,l.kt)("p",null,"Tetragon\ub97c \uc0ac\uc6a9\ud558\uc5ec Kubernetes \ud074\ub7ec\uc2a4\ud130\uc758 \ubcf4\uc548 \ubc0f \ud504\ub85c\uc138\uc2a4 \ubaa8\ub2c8\ud130\ub9c1\uc744 \uc218\ud589\ud558\ub294 \ubc29\ubc95\uc5d0 \ub300\ud574 \uac04\ub2e8\ud788 \uc54c\uc544\ubcf4\uc790."),(0,l.kt)("h3",{id:"tetragon\uc774\ub780-\ubb34\uc5c7\uc778\uac00"},"Tetragon\uc774\ub780 \ubb34\uc5c7\uc778\uac00?"),(0,l.kt)("h5",{id:"\uadf8\ub9bc-\ucd9c\ucc98-httpsisovalentcomblogpost2022-05-16-tetragon"},"\uadf8\ub9bc \ucd9c\ucc98: ",(0,l.kt)("a",{parentName:"h5",href:"https://isovalent.com/blog/post/2022-05-16-tetragon/"},"https://isovalent.com/blog/post/2022-05-16-tetragon/")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://isovalent.wpengine.com/wp-content/uploads/2022/06/enforcement2.png",alt:"tetragon"})," "),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://tetragon.io/"},"https://tetragon.io/")),(0,l.kt)("p",null,"Tetragon\uc740 eBPF(extended Berkeley Packet Filter)\ub97c \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uac15\ub825\ud55c \ubcf4\uc548 \ubc0f \ubaa8\ub2c8\ud130\ub9c1 \ub3c4\uad6c\uc774\ub2e4. eBPF\ub294 \ucee4\ub110 \ub808\ubca8\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ud504\ub85c\uadf8\ub7a8\uc73c\ub85c, \uc2dc\uc2a4\ud15c \uc131\ub2a5\uc5d0 \ucd5c\uc18c\ud55c\uc758 \uc601\ud5a5\uc744 \uc8fc\uba74\uc11c \uc2e4\uc2dc\uac04\uc73c\ub85c \ub370\uc774\ud130\ub97c \uc218\uc9d1\ud558\uace0 \ucc98\ub9ac\ud560 \uc218 \uc788\ub2e4. Tetragon\uc740 \uc774\ub97c \ud65c\uc6a9\ud558\uc5ec Kubernetes \ud658\uacbd\uc5d0\uc11c \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d, \uc2dc\uc2a4\ud15c \ud638\ucd9c, \ucee8\ud14c\uc774\ub108 \ud65c\ub3d9 \ub4f1\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \ubd84\uc11d\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("h3",{id:"tetragon\uc740-\ubc18\ub4dc\uc2dc-cilium\uc774-\uc788\uc5b4\uc57c-\ud558\ub098"},"Tetragon\uc740 \ubc18\ub4dc\uc2dc Cilium\uc774 \uc788\uc5b4\uc57c \ud558\ub098?"),(0,l.kt)("p",null,"Tetragon\uc740 eBPF\ub97c \uae30\ubc18\uc73c\ub85c \ud55c \uac15\ub825\ud55c \ubcf4\uc548 \ubc0f \ubaa8\ub2c8\ud130\ub9c1 \ub3c4\uad6c\ub85c, Kubernetes \ud658\uacbd\uc5d0\uc11c\uc758 \ub370\uc774\ud130 \uc218\uc9d1 \ubc0f \ubd84\uc11d\uc5d0 \ucd5c\uc801\ud654\ub418\uc5b4 \uc788\ub2e4. \uadf8\ub7ec\ub098 Tetragon\uc744 \uc0ac\uc6a9\ud558\uae30 \uc704\ud574 \ubc18\ub4dc\uc2dc Cilium\uc774 \ud544\uc694\ud558\uc9c0\ub294 \uc54a\ub2e4. "),(0,l.kt)("p",null,"Cilium\uc740 Kubernetes \ud074\ub7ec\uc2a4\ud130\uc5d0\uc11c \ub124\ud2b8\uc6cc\ud06c \uc815\ucc45\uc744 \uad00\ub9ac\ud558\uace0, eBPF\ub97c \ud65c\uc6a9\ud558\uc5ec \uc131\ub2a5\uc744 \ucd5c\uc801\ud654\ud558\ub294 CNI(\ucee8\ud14c\uc774\ub108 \ub124\ud2b8\uc6cc\ud06c \uc778\ud130\ud398\uc774\uc2a4) \ud50c\ub7ec\uadf8\uc778\uc774\ub2e4. Tetragon\uc740 Cilium\uacfc \ud568\uaed8 \uc0ac\uc6a9\ud560 \ub54c \uadf8 \uae30\ub2a5\uc774 \ub354\uc6b1 \uac15\ud654\ub418\uc9c0\ub9cc, Cilium \uc5c6\uc774\ub3c4 Tetragon\uc758 \uae30\ubcf8\uc801\uc778 \uae30\ub2a5\uc744 \ud65c\uc6a9\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("p",null,"Cilium\uc744 \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub294 \uacbd\uc6b0, Tetragon\uc740 \uc5ec\uc804\ud788 eBPF\ub97c \ud1b5\ud574 \uc2dc\uc2a4\ud15c \ud638\ucd9c, \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d, \ucee8\ud14c\uc774\ub108 \ud65c\ub3d9 \ub4f1\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud560 \uc218 \uc788\ub2e4. \uadf8\ub7ec\ub098 Cilium\uc744 \uc0ac\uc6a9\ud558\uba74 Tetragon\uc758 \uc131\ub2a5\uacfc \ud1b5\ud569\uc131\uc774 \ud5a5\uc0c1\ub418\uba70, \ubcf4\ub2e4 \uc815\uad50\ud55c \ub124\ud2b8\uc6cc\ud06c \uc815\ucc45\uc744 \uc801\uc6a9\ud560 \uc218 \uc788\ub294 \uc7a5\uc810\uc774 \uc788\ub2e4."),(0,l.kt)("p",null,"\uacb0\ub860\uc801\uc73c\ub85c, Tetragon\uc740 Cilium\uacfc \ud568\uaed8 \uc0ac\uc6a9\ud560 \ub54c \ucd5c\uc0c1\uc758 \uc131\ub2a5\uc744 \ubc1c\ud718\ud558\uc9c0\ub9cc, Cilium \uc5c6\uc774\ub3c4 \uc720\uc6a9\ud558\uac8c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \ub3c4\uad6c\uc774\ub2e4. \uc0ac\uc6a9\uc790\uc758 \ud544\uc694\uc640 \ud658\uacbd\uc5d0 \ub530\ub77c \uc801\uc808\ud55c \uc120\ud0dd\uc744 \ud558\ub294 \uac83\uc774 \uc911\uc694\ud558\ub2e4."),(0,l.kt)("h2",{id:"tetragon-\uc124\uce58-\ubc0f-\uc124\uc815"},"Tetragon \uc124\uce58 \ubc0f \uc124\uc815"),(0,l.kt)("h3",{id:"\uc694\uad6c-\uc0ac\ud56d-\ubc0f-\ud14c\uc2a4\ud2b8-\ud658\uacbd"},"\uc694\uad6c \uc0ac\ud56d \ubc0f \ud14c\uc2a4\ud2b8 \ud658\uacbd"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Kubernetes \ud074\ub7ec\uc2a4\ud130 : Kind 1.31.0"),(0,l.kt)("li",{parentName:"ul"},"Helm 3"),(0,l.kt)("li",{parentName:"ul"},"Kubectl"),(0,l.kt)("li",{parentName:"ul"},"jq")),(0,l.kt)("h3",{id:"kind-\uc124\uce58"},"Kind \uc124\uce58"),(0,l.kt)("p",null,"Tetragon\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc791\ub3d9\ud558\ub824\uba74 \ud638\uc2a4\ud2b8 /proc \ud30c\uc77c \uc2dc\uc2a4\ud15c\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4 \uad8c\ud55c\uc774 \uc788\uc5b4\uc57c \ud55c\ub2e4. Kind \ud074\ub7ec\uc2a4\ud130\ub294 \ub2e4\uc74c \uba85\ub839\uc744 \ud1b5\ud574 \uc77c \ub178\ub4dc \ud074\ub7ec\uc2a4\ud130\ub97c \uc0ac\uc6a9\ud55c\ub2e4\uace0 \uac00\uc815\ud55c\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'cat <<EOF > kind-config.yaml\napiVersion: kind.x-k8s.io/v1alpha4\nkind: Cluster\nnodes:\n  - role: control-plane\n    extraMounts:\n      - hostPath: /proc\n        containerPath: /procHost\nEOF\nkind create cluster --config kind-config.yaml\n\nCreating cluster "kind" ...\n \u2713 Ensuring node image (kindest/node:v1.31.0) \ud83d\uddbc\n \u2713 Preparing nodes \ud83d\udce6\n \u2713 Writing configuration \ud83d\udcdc\n \u2713 Starting control-plane \ud83d\udd79\ufe0f\n \u2713 Installing CNI \ud83d\udd0c\n \u2713 Installing StorageClass \ud83d\udcbe\nSet kubectl context to "kind-kind"\nYou can now use your cluster with:\n\nkubectl cluster-info --context kind-kind\n')),(0,l.kt)("h3",{id:"tetragon-\uc124\uce58"},"Tetragon \uc124\uce58"),(0,l.kt)("p",null,"\uae30\ubcf8\uc801\uc73c\ub85c Tetragon\uc740 \uc774\ubca4\ud2b8 \ub85c\uadf8\uc758 \ub178\uc774\uc988\ub97c \uc904\uc774\uae30 \uc704\ud574 kube-system \uc774\ubca4\ud2b8\ub97c \ud544\ud130\ub9c1\ud55c\ub2e4. \uadf8\ub9ac\uace0 \uc704\uc5d0\uc11c \uc774\uc57c\uae30 \ud588\ub358 \uac83\ucc98\ub7fc ",(0,l.kt)("inlineCode",{parentName:"p"},"proc")," \ud638\uc2a4\ud2b8 \ud328\uc2a4\ub97c \ud074\ub7ec\uc2a4\ud130 \ub0b4 \ud328\uc2a4\ub85c \uc124\uc815\ud558\uc5ec ",(0,l.kt)("inlineCode",{parentName:"p"},"helm"),"\uc73c\ub85c \ubc30\ud3ec\ud55c\ub2e4. \uc124\uce58\uac00 \uc644\ub8cc\ub418\uba74 Tetragon\uc774 Kubernetes \ud074\ub7ec\uc2a4\ud130\uc5d0 \ubc30\ud3ec\ub418\uace0, eBPF \uae30\ubc18\uc758 \ubaa8\ub2c8\ud130\ub9c1\uc774 \uc2dc\uc791\ub41c\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'EXTRA_HELM_FLAGS=(--set tetragon.hostProcPath=/procHost)\nhelm repo add cilium https://helm.cilium.io\nhelm repo update\nhelm install tetragon ${EXTRA_HELM_FLAGS[@]} cilium/tetragon -n kube-system\nkubectl rollout status -n kube-system ds/tetragon -w\n\n"cilium" has been added to your repositories\nHang tight while we grab the latest from your chart repositories...\n...Successfully got an update from the "cilium" chart repository\nUpdate Complete. \u2388Happy Helming!\u2388\nNAME: tetragon\nLAST DEPLOYED: Sun Oct 27 00:56:55 2024\nNAMESPACE: kube-system\nSTATUS: deployed\nREVISION: 1\nTEST SUITE: None\nWaiting for daemon set "tetragon" rollout to finish: 0 of 1 updated pods are available...\ndaemon set "tetragon" successfully rolled out\n')),(0,l.kt)("h3",{id:"\uc0d8\ud50c-\uc571-\ubc30\ud3ec"},"\uc0d8\ud50c \uc571 \ubc30\ud3ec"),(0,l.kt)("p",null,"Tetragon\uc744 \ud0d0\uc0c9\ud558\uae30 \uc704\ud574 \uc0d8\ud50c \uc6cc\ud06c\ub85c\ub4dc\uac00 \ud544\uc694\ud558\ub2e4. \uc5ec\uae30\uc11c\ub294 Cilium\uc758 \ub370\ubaa8\ub85c \uc8fc\ub85c \uc0ac\uc6a9\ub418\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158 ",(0,l.kt)("inlineCode",{parentName:"p"},"StarWars"),"\uc744 \uc0ac\uc6a9\ud560 \uc608\uc815\uc774\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl create -f https://raw.githubusercontent.com/cilium/cilium/v1.15.3/examples/minikube/http-sw-app.yaml\n")),(0,l.kt)("p",null,"\ubc30\ud3ec\ub41c \ub9ac\uc18c\uc2a4\ub294 \ub2e4\uc74c\uacfc \uc720\uc0ac\ud560 \uac83\uc774\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl get pods\nNAME                        READY   STATUS    RESTARTS   AGE\ndeathstar-bf77cddc9-nz5sc   1/1     Running   0          2m51s\ndeathstar-bf77cddc9-sd2s8   1/1     Running   0          2m51s\ntiefighter                  1/1     Running   0          2m51s\nxwing                       1/1     Running   0          2m51s\n")),(0,l.kt)("p",null,"Tetragon \ub370\ubaac \uc138\ud2b8\uac00 \uc900\ube44\ub418\uace0 \ud30c\ub4dc\uac00 \uc2e4\ud589 \uc911\uc778 \uc0c1\ud0dc\uac00 \ub418\uba74, \ub178\ub4dc\uc5d0\uc11c \uc774\ubca4\ud2b8 \uc218\uc2e0\uc744 \uc2dc\uc791\ud560 \uc218 \uc788\ub2e4. \ubc14\ub85c \ud504\ub85c\uc138\uc2a4 \uc2e4\ud589\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud560 \uc218 \uc788\uace0, Tetragon\uc740 \uc77c\uce58\ud558\ub294 \uc774\ubca4\ud2b8\ub97c JSON \ud615\uc2dd\uc73c\ub85c \ub0b4\ubcf4\ub0b8\ub2e4. \ub2e4\uc74c \uba85\ub839\uc744 \ud1b5\ud574 \ub85c\uadf8\ub97c \ud655\uc778 \ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'kubectl logs -n kube-system -l app.kubernetes.io/name=tetragon -c export-stdout -f | jq\n{\n  "process_exec": {\n    "process": {\n      "exec_id": "a2luZC1jb250cm9sLXBsYW5lOjc5MTM2NDIxODQwMjoxMjU5Mg==",\n      "pid": 12592,\n      "uid": 0,\n      "cwd": "/run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242/rootfs",\n      "binary": "/kind/bin/mount-product-files.sh",\n      "arguments": "/kind/bin/mount-product-files.sh",\n      "flags": "execve clone",\n      "start_time": "2024-10-26T16:02:01.948430838Z",\n      "auid": 4294967295,\n      "pod": {\n        "namespace": "default",\n        "name": "xwing",\n        "container": {\n          "id": "containerd://e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242",\n          "name": "spaceship",\n          "image": {\n            "id": "quay.io/cilium/json-mock@sha256:5aad04835eda9025fe4561ad31be77fd55309af8158ca8663a72f6abb78c2603",\n            "name": "sha256:56b43d7e51feffe637c2837a8c70da02be98a51099533f288c78fa369f5c6991"\n          },\n          "start_time": "2024-10-26T16:02:01Z",\n          "pid": 7\n        },\n        "pod_labels": {\n          "app.kubernetes.io/name": "xwing",\n          "class": "xwing",\n          "org": "alliance"\n        },\n        "workload": "xwing",\n        "workload_kind": "Pod"\n      },\n      "docker": "e1216138dabb7071aa17679a52b05f9",\n      "parent_exec_id": "a2luZC1jb250cm9sLXBsYW5lOjc5MTM1ODgxNDg2MToxMjU4Ng==",\n      "tid": 12592\n    },\n    "parent": {\n      "exec_id": "a2luZC1jb250cm9sLXBsYW5lOjc5MTM1ODgxNDg2MToxMjU4Ng==",\n      "pid": 12586,\n      "uid": 0,\n      "cwd": "/run/containerd/io.containerd.runtime.v2.task/k8s.io/6b1f9e099116975f55078e5ff88ffd9cef985d871c1c1ff4c7af8e85398f2557",\n      "binary": "/usr/local/sbin/runc",\n      "arguments": "--root /run/containerd/runc/k8s.io --log /run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242/log.json --log-format json --systemd-cgroup create --bundle /run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242 --pid-file /run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242/init.pid e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242",\n      "flags": "execve",\n      "start_time": "2024-10-26T16:02:01.943027380Z",\n      "auid": 4294967295,\n      "parent_exec_id": "a2luZC1jb250cm9sLXBsYW5lOjc5MTMzMTE2MDIzNjoxMjU3Ng==",\n      "refcnt": 1,\n      "tid": 12586\n    }\n  },\n  "node_name": "kind-control-plane",\n  "time": "2024-10-26T16:02:01.948430629Z"\n}\n...\n')),(0,l.kt)("p",null,"\uc704 \ub85c\uadf8\ub294 Tetragon\uc774 \ud074\ub7ec\uc2a4\ud130\uc5d0\uc11c \uc2e4\ud589 \uc911\uc778 \ud504\ub85c\uc138\uc2a4\uc5d0 \ub300\ud55c \uc815\ubcf4\ub97c JSON \ud615\uc2dd\uc73c\ub85c \ucd9c\ub825\ud55c \uac83\uc774\ub2e4. "),(0,l.kt)("p",null,"Tetragon\uc744 \uc0ac\uc6a9\ud558\uc5ec \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ubaa8\ub4e0 \ud504\ub85c\uc138\uc2a4\ub97c \ubaa8\ub2c8\ud130\ub9c1\ud560 \uc218 \uc788\ub2e4. \ud574\ub2f9 json \ub85c\uadf8\ub294 Tetragon\uc774 \ud504\ub85c\uc138\uc2a4 \uc2e4\ud589\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud558\uace0 \uc788\uc73c\uba70, \uac01 \ud504\ub85c\uc138\uc2a4\uc640 \uad00\ub828\ub41c \uc0c1\uc138 \uc815\ubcf4(\ucee8\ud14c\uc774\ub108, \ud30c\ub4dc, \ubd80\ubaa8 \ud504\ub85c\uc138\uc2a4)\ub97c \uc81c\uacf5\ud55c\ub2e4. \uc774\ub97c \ud1b5\ud574 \ubcf4\uc548 \ubc0f \uc131\ub2a5 \ubaa8\ub2c8\ud130\ub9c1\uc744 \uc218\ud589\ud560 \uc218 \uc788\ub294\uac83\uc774 Tetragon\uc758 \uae30\ubcf8 \ub3d9\uc791 \ubc29\uc2dd\uc774\ub2e4."),(0,l.kt)("h2",{id:"tetragon-\uc0ac\uc6a9-\uc608\uc2dc"},"Tetragon \uc0ac\uc6a9 \uc608\uc2dc"),(0,l.kt)("h3",{id:"tetra-cli-\uc0ac\uc6a9"},"tetra CLI \uc0ac\uc6a9"),(0,l.kt)("p",null,"Tetragon CLI\uc778 ",(0,l.kt)("inlineCode",{parentName:"p"},"tetra"),"\uc740 pod, host, namespace \ub610\ub294 process\ubcc4\ub85c \uc774\ubca4\ud2b8\ub97c \ud544\ud130\ub9c1\ud558\ub294 \ub370 \uc720\uc6a9\ud558\ub2e4. tetra CLI\ub294 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/cilium/tetragon/releases"},"GitHub \ub9b4\ub9ac\uc2a4 \ud398\uc774\uc9c0"),"\uc5d0\uc11c \ub2e4\uc6b4\ub85c\ub4dc\ud560 \uc218 \uc788\ub2e4. CLI\ub97c \uc2e4\ud589\ud560 \uc6cc\ud06c\uc2a4\ud14c\uc774\uc158\uc5d0 Go\uac00 \uc124\uce58\ub418\uc5b4 \uc788\ub294 \uacbd\uc6b0\uc5d0\ub294, \ub2e4\uc74c \uba85\ub839\uc744 \uc0ac\uc6a9\ud558\uc5ec \ub2e4\uc6b4\ub85c\ub4dc\ud558\uace0 \uc124\uce58\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"GOOS=$(go env GOOS)\nGOARCH=$(go env GOARCH)\ncurl -L --remote-name-all https://github.com/cilium/tetragon/releases/latest/download/tetra-${GOOS}-${GOARCH}.tar.gz{,.sha256sum}\nsha256sum --check tetra-${GOOS}-${GOARCH}.tar.gz.sha256sum\nsudo tar -C /usr/local/bin -xzvf tetra-${GOOS}-${GOARCH}.tar.gz\nrm tetra-${GOOS}-${GOARCH}.tar.gz{,.sha256sum}\n")),(0,l.kt)("p",null,"tetra CLI\uac00 \uc124\uce58\ub41c \ud6c4 JSON \ucd9c\ub825\uc744 tetra getevents\uc5d0 \uc804\ub2ec\ud558\uc5ec ",(0,l.kt)("inlineCode",{parentName:"p"},"-o compact")," \uc635\uc158\uc744 \ud1b5\ud574 \uac00\ub3c5\uc131 \uc788\uac8c \uc774\ubca4\ud2b8\ub97c \ud655\uc778 \ud560 \uc218 \uc788\ub2e4. \ub9cc\uc57d \ud2b9\uc815 \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc758 \uc774\ubca4\ud2b8\ub9cc \ud655\uc778\ud558\ub294 \ub4f1\uc758 \ubcc4\ub3c4\uc758 \ud50c\ub798\uadf8\ub97c \ud1b5\ud574 \ud544\ud130\ub9c1 \ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl logs -n kube-system ds/tetragon -c export-stdout -f | tetra getevents -o compact\n\n\ud83d\ude80 process default/xwing /kind/bin/mount-product-files.sh /kind/bin/mount-product-files.sh\n\ud83d\ude80 process default/xwing /usr/bin/jq -r .bundle\n\ud83d\udca5 exit    default/xwing /usr/bin/jq -r .bundle 0\n\ud83d\ude80 process default/xwing /usr/bin/cp /kind/product_uuid /run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242/rootfs/\n\ud83d\udca5 exit    default/xwing /usr/bin/cp /kind/product_uuid /run/containerd/io.containerd.runtime.v2.task/k8s.io/e1216138dabb7071aa17679a52b05f9cad566ffbf89f0a090c385fc0af644242/rootfs/ 0\n\ud83d\udca5 exit    default/xwing /kind/bin/mount-product-files.sh /kind/bin/mount-product-files.sh 0\n\ud83d\ude80 process default/xwing /usr/bin/bash /run.sh\n\ud83d\ude80 process default/xwing /usr/bin/tini -- /usr/local/bin/json-server --host  --port 80 --watch /default.json --middlewares /middleware.js\n\ud83d\ude80 process default/xwing /usr/local/bin/json-server node /usr/local/bin/json-server --host  --port 80 --watch /default.json --middlewares /middleware.js\n\ud83d\ude80 process default/xwing /usr/local/bin/node /usr/local/bin/json-server --host  --port 80 --watch /default.json --middlewares /middleware.js\n")),(0,l.kt)("h3",{id:"\ud30c\uc77c-\uc2dc\uc2a4\ud15c-\uc561\uc138\uc2a4-\ucd94\uc801-\ubc0f-\ub124\ud2b8\uc6cc\ud06c-\ud2b8\ub798\ud53d-\ubaa8\ub2c8\ud130\ub9c1"},"\ud30c\uc77c \uc2dc\uc2a4\ud15c \uc561\uc138\uc2a4 \ucd94\uc801 \ubc0f \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d \ubaa8\ub2c8\ud130\ub9c1"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"TracingPolicy"),"\ub294 \ucee4\ub110 \uc774\ubca4\ud2b8\uc5d0 \ub300\ud55c \uc2e4\uc2dc\uac04 \ud544\ud130\ub97c \uc27d\uac8c \uc124\uc815\ud560 \uc218 \uc788\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \ub9ac\uc18c\uc2a4\uc774\ub2e4. ",(0,l.kt)("inlineCode",{parentName:"p"},"TracingPolicy"),"\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc774 \uc218\ud589\ub418\uba74 \ub4f1\ub85d\ub41c \uc815\ucc45\uc5d0 \uc77c\uce58\ub420 \uacbd\uc6b0 \ud574\ub2f9 \uc791\uc5c5\uc744 \ud2b8\ub9ac\uac70 \ud55c\ub2e4. \ucc98\uc74c \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud560 \ub0b4\uc6a9\uc740 \ud2b9\uc815 \ud30c\ub4dc\ub0b4\uc5d0\uc11c curl\uc744 \uc0ac\uc6a9\ud574\uc11c \uc678\ubd80\ub85c \uc811\uc18d\ud558\ub294 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc774\ubca4\ud2b8\ub97c \uac10\uc9c0\ud558\ub294 \uac83\uc744 \uad6c\ud604\ud574\ubcf8 \uc608\uc2dc\uc774\ub2e4."),(0,l.kt)("p",null,"\uba3c\uc800 \ub450\uac1c\uc758 \uc815\ucc45\uc744 \uc801\uc6a9\ud55c\ub2e4. \ud558\ub098\uc529 \uc0b4\ud3b4\ubcf4\uc790."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f https://raw.githubusercontent.com/cilium/tetragon/refs/heads/main/examples/tracingpolicy/sys_write_follow_fd_prefix.yaml\n")),(0,l.kt)("p",null,"\ud574\ub2f9 \uc815\ucc45(",(0,l.kt)("inlineCode",{parentName:"p"},"sys_write_follow_fd_prefix"),")\uc740 \ud30c\uc77c\uc774 \uc624\ud508\ub418\uac70\ub098 \uc77d\uace0, \uc4f0\uae30\uac00 \ubc1c\uc0dd\ud558\ub294 \uc774\ubca4\ud2b8\ub97c \ud655\uc778\ud558\ub294 \uc815\ucc45\uc774\ub2e4. ",(0,l.kt)("inlineCode",{parentName:"p"},"fd_install")," \ud568\uc218\ub294 \uc0c8\ub85c\uc6b4 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\uac00 \uc0dd\uc131\ub420 \ub54c \ud638\ucd9c\ub41c\ub2e4. \uc774 \ud568\uc218\ub294 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130 \ud14c\uc774\ube14\uc5d0 \uc0c8\ub85c\uc6b4 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \ub4f1\ub85d\ud558\uace0, \ud574\ub2f9 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\uac00 \uac00\ub9ac\ud0a4\ub294 \ud30c\uc77c \uac1d\uccb4\ub97c \uc124\uc815\ud55c\ub2e4. \uc989, \ud504\ub85c\uc138\uc2a4\uac00 \ud30c\uc77c\uc744 \uc5f4 \ub54c, \ucee4\ub110\uc740 ",(0,l.kt)("inlineCode",{parentName:"p"},"fd_install"),"\uc744 \ud1b5\ud574 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \ud560\ub2f9\ud558\uace0, \uc774 \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \ud1b5\ud574 \uc774\ud6c4\uc5d0 \ud30c\uc77c\uc5d0 \uc811\uadfc\ud560 \uc218 \uc788\ub3c4\ub85d \ud55c\ub2e4. "),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"sys_read")," \ud568\uc218\ub294 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \ud1b5\ud574 \ud30c\uc77c\uc5d0\uc11c \ub370\uc774\ud130\ub97c \uc77d\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc774\ub2e4. \uc774 \ud568\uc218\ub294 user\uac00 \uc9c0\uc815\ud55c \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud574\ub2f9 \ud30c\uc77c\uc5d0\uc11c \ub370\uc774\ud130\ub97c \uc77d\uc5b4\uc624\ub294 \uc5ed\ud560\uc744 \ud55c\ub2e4. sys_read\ub294 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\uac00 \uc720\ud6a8\ud55c\uc9c0 \ud655\uc778\ud558\uace0, \ud574\ub2f9 \ud30c\uc77c\uc758 \ub0b4\uc6a9\uc744 userspace\uc73c\ub85c \ubcf5\uc0ac\ud55c\ub2e4."),(0,l.kt)("p",null,"\uc989, ",(0,l.kt)("inlineCode",{parentName:"p"},"fd_install"),"\uc774 \ud30c\uc77c \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \uc124\uc815\ud55c \ud6c4, user\ub294 \uc774 \ub514\uc2a4\ud06c\ub9bd\ud130\ub97c \ud1b5\ud574 sys_read\ub97c \ud638\ucd9c\ud558\uc5ec \ud30c\uc77c\uc758 \ub0b4\uc6a9\uc744 \uc77d\uc744 \uc218 \uc788\uac8c \ub41c\ub2e4. \uc774 \ub450 \ud568\uc218\ub294 \ud30c\uc77c I/O \uc791\uc5c5\uc758 \uae30\ubcf8\uc801\uc778 \ud750\ub984\uc5d0\uc11c \uc11c\ub85c \uc5f0\uacb0\ub418\uc5b4 \uc788\ub2e4. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: cilium.io/v1alpha1\nkind: TracingPolicy\nmetadata:\n  name: "sys-read-follow-prefix"\nspec:\n  kprobes:\n  - call: "fd_install"\n    syscall: false\n    return: false\n    args:\n    - index: 0\n      type: int\n    - index: 1\n      type: "file"\n    selectors:\n    - matchPIDs:\n      - operator: NotIn\n        followForks: true\n        isNamespacePID: true \n        values:\n        - 1\n      matchArgs:\n      - index: 1\n        operator: "Prefix"\n        values:\n        - "/etc/"\n      matchActions:\n      - action: FollowFD\n        argFd: 0\n        argName: 1\n  - call: "sys_close"\n    syscall: true\n    args:\n    - index: 0\n      type: "int"\n    selectors:\n    - matchActions:\n      - action: UnfollowFD\n        argFd: 0\n        argName: 0\n  - call: "sys_read"\n    syscall: true\n    args:\n    - index: 0\n      type: "fd"\n    - index: 1\n      type: "char_buf"\n      returnCopy: true\n    - index: 2\n      type: "size_t"\n  - call: "sys_write"\n    syscall: true\n    args:\n    - index: 0\n      type: "fd"\n    - index: 1\n      type: "char_buf"\n      sizeArgIndex: 3\n    - index: 2\n      type: "size_t"\n')),(0,l.kt)("h3",{id:"\ub124\ud2b8\uc6cc\ud06c-\ud2b8\ub798\ud53d-\ubaa8\ub2c8\ud130\ub9c1"},"\ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d \ubaa8\ub2c8\ud130\ub9c1"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f https://raw.githubusercontent.com/cilium/tetragon/refs/heads/main/examples/tracingpolicy/tcp-connect.yaml\n")),(0,l.kt)("p",null,"\ud574\ub2f9 \uc815\ucc45\uc740 \ub124\ud2b8\uc6cc\ud06c \ud2b8\ub798\ud53d\uc744 \ubaa8\ub2c8\ud130\ub9c1\ud55c\ub2e4. \uc815\ucc45 \ub0b4\uc6a9\uc744 \uc0b4\ud3b4\ubcf4\uba74 ",(0,l.kt)("inlineCode",{parentName:"p"},"tcp_connect"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"tcp_close")," \ub4f1\uc758 \ub124\ud2b8\uc6cc\ud06c \uae30\ubc18 \uc2dc\uc2a4\ud15c \ucf5c\uc774 \ubc1c\uc0dd\ud558\ub294 \uac83\uc744 \ubaa8\ub2c8\ud130\ub9c1 \ud558\uac8c \ub41c\ub2e4. \uc774\ub97c \ud1b5\ud574 \ud30c\ub4dc \ub0b4\uc5d0\uc11c \uc5b4\ub5a4 \ub124\ud2b8\uc6cc\ud06c \uc694\uccad\uc774 \ubc1c\uc0dd\ud588\ub294\uc9c0 \ucd94\uc801\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: cilium.io/v1alpha1\nkind: TracingPolicy\nmetadata:\n  name: "connect"\nspec:\n  kprobes:\n  - call: "tcp_connect"\n    syscall: false\n    args:\n    - index: 0\n      type: "sock"\n  - call: "tcp_close"\n    syscall: false\n    args:\n    - index: 0\n      type: "sock"\n  - call: "tcp_sendmsg"\n    syscall: false\n    args:\n    - index: 0\n      type: "sock"\n    - index: 2\n      type: int\n')),(0,l.kt)("p",null,"\ud574\ub2f9 \uc774\ubca4\ud2b8 \ub4f1\uc744 \uac10\uc9c0\ud558\uae30 \uc704\ud574 ",(0,l.kt)("inlineCode",{parentName:"p"},"tetra getevents -o compact")," CLI\uba85\ub839\uc744 \uc2e4\ud589\ud574 \ub193\uc790."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl logs -n kube-system ds/tetragon -c export-stdout -f | tetra getevents -o compact --namespaces default --pods xwing\n\u3134```\n\n\uc774\uc81c `xwing` \ud30c\ub4dc\uc5d0\uc11c curl \uba85\ub839\uc73c\ub85c \uc678\ubd80\ub85c \ud1b5\uc2e0\ud558\ub294 \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud574\ubcf8\ub2e4. \n\n```bash\nkubectl exec -it xwing -- curl google.com\n<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">\n<TITLE>301 Moved</TITLE></HEAD><BODY>\n<H1>301 Moved</H1>\nThe document has moved\n<A HREF="http://www.google.com/">here</A>.\n</BODY></HTML>\n')),(0,l.kt)("p",null,"\uc544\uae4c \uac78\uc5b4\ub1a8\ub358 ",(0,l.kt)("inlineCode",{parentName:"p"},"tetra getevents -o compact")," CLI\uba85\ub839\uc744 \ud655\uc778\ud574\ubcf4\uba74 \ub2e4\uc74c\uacfc \uc720\uc0ac\ud55c \uacb0\uacfc\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"\ud83d\ude80 process default/xwing /usr/bin/curl google.com\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/ld.so.cache\n\ud83d\udcea close   default/xwing /usr/bin/curl\n...\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/ssl/openssl.cnf\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/ssl/openssl.cnf 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/ssl/openssl.cnf 4096 bytes\n...\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/nsswitch.conf\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/nsswitch.conf 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/nsswitch.conf 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/passwd\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/passwd 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/host.conf\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/host.conf 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/host.conf 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/resolv.conf\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/resolv.conf 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/resolv.conf 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/hosts\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/hosts 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/hosts 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n...\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcec open    default/xwing /usr/bin/curl /etc/gai.conf\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/gai.conf 4096 bytes\n\ud83d\udcda read    default/xwing /usr/bin/curl /etc/gai.conf 4096 bytes\n\ud83d\udcea close   default/xwing /usr/bin/curl\n...\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udd0c connect default/xwing /usr/bin/curl tcp 10.244.0.9:34362 -> 142.250.207.110:80\n\ud83d\udce4 sendmsg default/xwing /usr/bin/curl tcp 10.244.0.9:34362 -> 142.250.207.110:80 bytes 74\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83d\udcea close   default/xwing /usr/bin/curl\n\ud83e\uddf9 close   default/xwing /usr/bin/curl tcp 10.244.0.9:34362 -> 142.250.207.110:80\n\ud83d\udca5 exit    default/xwing /usr/bin/curl google.com 0\n\ud83d\ude80 process default/xwing /usr/bin/sh\n\ud83d\udcec open    default/xwing /usr/bin/sh /etc/ld.so.cache\n\ud83d\udcea close   default/xwing /usr/bin/sh\n\ud83d\udcea close   default/xwing /usr/bin/sh\n\ud83d\udcea close   default/xwing /usr/bin/sh\n\ud83d\udcea close   default/xwing /usr/bin/sh\n\ud83d\udca5 exit    default/xwing /usr/bin/sh  130\n")),(0,l.kt)("p",null,"\uc704 \ub85c\uadf8\ub97c \ud1b5\ud574 Tetragon\uc774 \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc5d0\uc11c \uc2e4\ud589 \uc911\uc778 curl \ud504\ub85c\uc138\uc2a4\uc5d0 \ub300\ud55c \uc0c1\uc138\ud55c \uc774\ubca4\ud2b8\ub97c \uae30\ub85d\ud55c \uac83\uc744 \uc54c \uc218 \uc788\ub2e4. "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ud504\ub85c\uc138\uc2a4 \uc2e4\ud589: curl \uba85\ub839\uc774 google.com\uc5d0 \ub300\ud55c \uc694\uccad \uc2e4\ud589"),(0,l.kt)("li",{parentName:"ul"},"\ud30c\uc77c \uc811\uadfc: curl \ud504\ub85c\uc138\uc2a4\uac00 \uc5ec\ub7ec \ud30c\uc77c\uc744 \uc5f4\uace0 \uc77d\ub294 \uacfc\uc815 \ud655\uc778.\n/etc/ld.so.cache, /etc/ssl/openssl.cnf, /etc/nsswitch.conf, /etc/passwd, /etc/host.conf, /etc/resolv.conf, /etc/hosts, /etc/gai.conf \ub4f1\uc758 \ud30c\uc77c\uc774 \uc5f4\ub9ac\uace0 \uc77d\ud78c \uac83\uc73c\ub85c, \uc774\ub294 curl\uc774 \uc678\ubd80 \uc694\uccad\uc744 \ucc98\ub9ac\ud558\uae30 \uc704\ud574 \ud544\uc694\ud55c \uc124\uc815 \ud30c\uc77c\uc774\ub098 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \ub85c\ub4dc\ud558\ub294 \uacfc\uc815\uc774\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ub124\ud2b8\uc6cc\ud06c \uc5f0\uacb0: curl\uc774 tcp \uc5f0\uacb0\uc744 \ud1b5\ud574 10.244.0.9:34362\uc5d0\uc11c 142.250.207.110:80\uc73c\ub85c \uc5f0\uacb0\uc744 \uc2dc\ub3c4\ud55c \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,l.kt)("li",{parentName:"ul"},"\ub370\uc774\ud130 \uc804\uc1a1: sendmsg \uc774\ubca4\ud2b8\ub294 curl\uc774 \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud588\uc74c\uc744 \ub098\ud0c0\ub0b8\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ud504\ub85c\uc138\uc2a4 \uc885\ub8cc: curl \ud504\ub85c\uc138\uc2a4\uac00 \uc131\uacf5\uc801\uc73c\ub85c \uc885\ub8cc\ub418\uc5c8\uc74c\uc744 \ub098\ud0c0\ub0b4\ub294 exit \uc774\ubca4\ud2b8\uac00 \uae30\ub85d\ub418\uc5b4 \uc788\ub2e4. \uc885\ub8cc \ucf54\ub4dc ",(0,l.kt)("inlineCode",{parentName:"li"},"0"),"\uc740 \uc815\uc0c1 \uc885\ub8cc\ub97c \uc758\ubbf8\ud55c\ub2e4.")),(0,l.kt)("h2",{id:"\uacb0\ub860"},"\uacb0\ub860"),(0,l.kt)("p",null,"Tetragon\uacfc eBPF\ub97c \uc0ac\uc6a9\ud558\uba74 Kubernetes \ud658\uacbd\uc5d0\uc11c \uac15\ub825\ud55c \ubcf4\uc548 \ubc0f \ubaa8\ub2c8\ud130\ub9c1 \uae30\ub2a5\uc744 \uad6c\ud604\ud560 \uc218 \uc788\ub2e4. Tetragon\uc740 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \ucd94\uc801\ud558\uace0, \ud504\ub85c\uc138\uc2a4\ubcc4\ub85c \ud638\ucd9c \ud69f\uc218\ub97c \uae30\ub85d\ud55c\ub2e4. \uc774\ub7ec\ud55c \uc774\ubca4\ud2b8\ub294 \ucee4\ub110 \ub0b4\uc5d0\uc11c \uc9c1\uc811 \ubaa8\ub2c8\ud130\ub9c1\ub418\ubbc0\ub85c \uc774\ub7ec\ud55c \ud638\ucd9c \ucd94\uc801 \uc791\uc5c5\uc5d0 \uc57d\uac04\uc758 \uc624\ubc84\ud5e4\ub4dc\ub9cc\uc774 \ucd94\uac00\ub418\uc5b4, Falco\uc640 \uac19\uc740 \ub3c4\uad6c\ubcf4\ub2e4\ub294 \ub9ac\uc18c\uc2a4 \uc0ac\uc6a9 \uce21\uba74\uc5d0\uc11c\ub294 \uc720\ub9ac\ud55c \uc810\uc740 \uc874\uc7ac\ud55c\ub2e4. "),(0,l.kt)("p",null,"Tetragon\uc758 \ub2e8\uc810\uc740 \uad00\ucc30, \ucd94\uc801\ub41c \ud504\ub85c\uc138\uc2a4\ub97c kill \ud560 \uc218 \uc788\ub294 \uc870\uce58\uac00 \ud6c4\ud589\uc801\uc774\ub77c\ub294 \uac83\uc774\ub2e4. \uc774\ubca4\ud2b8\uac00 \uc77c\uc5b4\ub098\uace0 \uc788\uace0 \uc774\uc804\uc5d0 \uc608\ubc29\ud558\ub294 \ubc29\uc2dd\uc740 \uc544\ub2c8\ub2e4\ub77c\ub294 \uc0ac\uc2e4\uc744 \uc774\ud574\ud574\uc57c \ud55c\ub2e4. \ud558\uc9c0\ub9cc \ucee4\ub110 \ub808\ubca8\uc5d0\uc11c \uc774\ubca4\ud2b8\ub97c \ud544\ud130\ub9c1\ud558\uace0 \uc774\uc5d0 \ub300\ud55c \uc870\uce58\ub97c \ucde8\ud560 \uc218 \uc788\ub294 \uc815\ucc45\uc744 \uc218\ub9bd\ud558\uace0 \ub9cc\ub4dc\ub294 \uce21\uba74\uc5d0\uc11c\ub294 \ube14\ub799\ub9ac\uc2a4\ud2b8 \ubc29\uc2dd\uc73c\ub85c \ud558\ub294 \ucc28\ub2e8 \ubc29\uc2dd\uc5d0 \ube44\ud574 \uc720\uc5f0\uc131\uc744 \uc5b4\ub290 \uc815\ub3c4 \ubcf4\uc7a5\ud574\uc904 \uc218 \uc788\ub294 \uac83\uc740 \uac15\ub825\ud574 \ubcf4\uc778\ub2e4."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc2a4\ud130\ub514 \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")))}g.isMDXComponent=!0}}]);