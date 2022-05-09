"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[3235],{3905:function(e,t,r){r.d(t,{Zo:function(){return i},kt:function(){return d}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),m=u(r),d=a,k=m["".concat(s,".").concat(d)]||m[d]||c[d]||o;return r?n.createElement(k,l(l({ref:t},i),{},{components:r})):n.createElement(k,l({ref:t},i))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},27395:function(e,t,r){r.r(t),r.d(t,{assets:function(){return i},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return c}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),l=["components"],p={layout:"single",title:"Operators & CRDs(CustomResourceDefinitions) on Kubernetes",comments:!0,classes:"wide",description:"Operators, CRD(Custom Resource Definitions)\uc5d0 \ub300\ud574\uc11c \uc54c \uc218 \uc788\ub2e4.",slug:"kubernetes/operator/",date:new Date("2018-07-09T00:00:00.000Z"),categories:["Kubernetes"],tags:["Operators","Kubernetes","CRDs","CustomResourceDefinitions"]},s=void 0,u={permalink:"/kubernetes/operator/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2018-07-09-operator.md",source:"@site/blog/2018-07-09-operator.md",title:"Operators & CRDs(CustomResourceDefinitions) on Kubernetes",description:"Operators, CRD(Custom Resource Definitions)\uc5d0 \ub300\ud574\uc11c \uc54c \uc218 \uc788\ub2e4.",date:"2018-07-09T00:00:00.000Z",formattedDate:"July 9, 2018",tags:[{label:"Operators",permalink:"/tags/operators"},{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"CRDs",permalink:"/tags/cr-ds"},{label:"CustomResourceDefinitions",permalink:"/tags/custom-resource-definitions"}],readingTime:10.355,truncated:!1,authors:[],frontMatter:{layout:"single",title:"Operators & CRDs(CustomResourceDefinitions) on Kubernetes",comments:!0,classes:"wide",description:"Operators, CRD(Custom Resource Definitions)\uc5d0 \ub300\ud574\uc11c \uc54c \uc218 \uc788\ub2e4.",slug:"kubernetes/operator/",date:"2018-07-09T00:00:00.000Z",categories:["Kubernetes"],tags:["Operators","Kubernetes","CRDs","CustomResourceDefinitions"]},prevItem:{title:"Cert-manager",permalink:"/kubernetes/cert-manager/"},nextItem:{title:"Cilium",permalink:"/kubernetes/cilium-1/"}},i={authorsImageUrls:[]},c=[{value:"Operators in Kubernetes",id:"operators-in-kubernetes",level:2},{value:"Operators \ub780?",id:"operators-\ub780",level:3},{value:"Operators",id:"operators",level:2},{value:"\uc8fc\uc694 \ud65c\uc6a9\uc6a9\ub3c4",id:"\uc8fc\uc694-\ud65c\uc6a9\uc6a9\ub3c4",level:3},{value:"CRDs \uad00\ub828 \ubc1c\ud45c\uc790\ub8cc",id:"crds-\uad00\ub828-\ubc1c\ud45c\uc790\ub8cc",level:2},{value:"Operators example",id:"operators-example",level:3},{value:"etcd-operator",id:"etcd-operator",level:3},{value:"Requirements",id:"requirements",level:4},{value:"Installation guide",id:"installation-guide",level:3},{value:"etcd cluster create/resize/failover/upgrade",id:"etcd-cluster-createresizefailoverupgrade",level:3},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],m={toc:c};function d(e){var t=e.components,r=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"operators-in-kubernetes"},"Operators in Kubernetes"),(0,o.kt)("h3",{id:"operators-\ub780"},"Operators \ub780?"),(0,o.kt)("p",null,"\uc815\uc758(",(0,o.kt)("a",{parentName:"p",href:"https://coreos.com/operators/"},"Definition"),") : Kubernetes Application \uc744 \ud328\ud0a4\uc9d5, \ubc30\ud3ec, \uad00\ub9ac\ud558\ub294 \ubc29\ubc95. Helm\uacfc\ub294 \uc870\uae08 \ub2ec\ub77c \ub530\ub85c \uc774\uc57c\uae30 \ud574\ubcf4\uace0\uc790 \ud55c\ub2e4."),(0,o.kt)("p",null,"\uae30\ubcf8\uc801\uc73c\ub85c Kubernetest Application\uc740 kubernetes\uc5d0 \uc758\ud574 \ubc30\ud3ec\ub418\uace0 kubect\uacfc kube-API\ub97c \uc0ac\uc6a9\ud558\uc5ec \uad00\ub9ac\ud55c\ub2e4."),(0,o.kt)("p",null,"\uacb0\ub860\uc801\uc73c\ub85c \ub9d0\ud558\uba74 Kubernetes\uc5d0 \ub0b4\uac00 \ub9cc\ub4e0 application\uc744 \uc11c\ube44\uc2a4\ud558\uace0 \uad00\ub9ac\ud558\ub824\uba74 \uacb0\uad6d Kubernetes\uc758 API\ub4e4\uc744 \ubaa8\ub450 \uc774\ud574\ud558\uace0 \uc0ac\uc6a9\ud560\uc218 \uc788\uc5b4\uc57c \ud55c\ub2e4. \uc77c\ubc18\uc801\uc778 \uac1c\ubc1c\uc790\uc5d0\uac8c \uc9c4\uc785\uc7a5\ubcbd\uc774 \uc5b4\ub290\uc815\ub3c4 \uc788\ub2e4\uace0 \ubcf4\uc5ec\uc9c0\uba70 \uc774\ub97c \ubaa8\ub450 \uc774\ud574\uc2dc\ud0a4\ub294\uac83\ub3c4 \uc870\uc9c1\uc801\uc778 \uce21\uba74\uc5d0\uc11c\ub294 \ub0ad\ube44\uc77c\uc218 \ub3c4 \uc788\ub2e4. \uadf8\ub798\uc11c Helm\ub4f1\uc744 \ud1b5\ud55c application\ubc30\ud3ec \uc804\ub7b5\uc744 \uc138\uc6b0\uae30\ub3c4 \ud558\uc9c0\ub9cc \uc774\uac83\ub3c4 \ud55c\uacc4\uac00 \uc788\uc744\uc218 \uc788\ub2e4. \uadf8\ub798\uc11c Operator\ub294 Kubernetes\uc0c1\uc5d0\uc11c application\uc744 \uad00\ub9ac\ud558\ub294 \ub7f0\ud0c0\uc784\uc774\ub77c\uace0 \uc0dd\uac01\ud558\ub294\uac8c \ub9de\ub294\uac83 \uac19\ub2e4."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://coreos.com/sites/default/files/inline-images/Overview-etcd_0.png",alt:"etcd"})),(0,o.kt)("h2",{id:"operators"},"Operators"),(0,o.kt)("p",null,"Operators\ub294 application\ub9c8\ub2e4 \uc6b4\uc601\uc815\ubcf4\ub97c \ub123\uc744\uc218 \uc788\ub2e4."),(0,o.kt)("p",null,"Kubernetes \uc5d0 \ubc30\ud3ec\ub41c \uc751\uc6a9\ud504\ub85c\uadf8\ub7a8\uc758 \ubaa8\ub4e0 \ud2b9\uc131\uc744 \uc54c \ud544\uc694\uac00 \uc5c6\uace0 \uc774\ub97c \ud1b5\ud574 \uc0ac\uc6a9\uc790\ub294 \ub9e4\ub2c8\uc9c0\ub4dc \ud074\ub77c\uc6b0\ub4dc \uc11c\ube44\uc2a4 \uacbd\ud5d8(\uae30\uc874 IaaS/PaaS\uad00\ub9ac\uc640 \uc720\uc0ac)\uacfc \uc720\uc0ac\ud558\uac8c \uc6b4\uc601\uc774 \uac00\ub2a5\ud558\ub2e4.  "),(0,o.kt)("p",null,"Operator\uac00 \ubc30\ud3ec\ub418\uba74 Kubernetes API\ud655\uc7a5 \uac1c\ub150\uc778 CRDs(Custom\nResource Definitions)\uc744 \uc0ac\uc6a9\ud558\uc5ec \uad00\ub9ac\ud560\uc218 \uc788\ub2e4.\nKubernetes\uc5d0 Stateful \uc11c\ube44\uc2a4\ub97c \ubc30\ud3ec\ud558\ub294 \ub2e8\uc21c\ud558\uace0 \uc88b\uc740 \ubc29\ubc95\uc774 \ub420\uc218 \uc788\ub2e4.  "),(0,o.kt)("p",null,"\uc608\ub97c \ub4e4\uba74, Postgres \ud074\ub7ec\uc2a4\ud130, Prometheus \ud074\ub7ec\uc2a4\ud130, Etcd \ud074\ub7ec\uc2a4\ud130 \uac19\uc774 \uc6b4\uc601\uce21\uba74\uc758 application\ub4e4\uc744 \uc720\uc9c0, \uc6b4\uc601\ud558\ub294\ub370 \uc4f0\uc77c\uc218 \uc788\ub2e4. (\uc790\uc138\ud55c\uac74 \ub4a4\ucabd \uc608\uc2dc\ub85c \uc124\uba85\ud558\uaca0\ub2e4)"),(0,o.kt)("p",null,"\uadf8\ub7ec\uba74 \uba3c\uc800 CRDs(Custom Resource Definitions)\uc5d0 \ub300\ud574\uc11c \uba3c\uc800 \uc54c\uc544\ubcf8\ub2e4. CRDs\uc5d0 \ub300\ud574\uc11c\ub294 \ubcc4\ub3c4\ub85c \uc815\ub9ac\ud558\ub824 \ud558\ub2e4\uac00 \ub0b4\uc6a9\uc774 \ub9ce\uc774 \uc54a\uc544 \ud575\uc2ec\uc801\uc778 \ub0b4\uc6a9\ub9cc \uac19\uc774 \uc801\uc5b4\ubcf8\ub2e4."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Custom Resource Definitions(a.k.a CRDs)"),(0,o.kt)("li",{parentName:"ul"},"k8s Object\ub97c \ud655\uc7a5\ud574\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uac00\uc7a5 \uac04\ub2e8\ud55c \ubc29\ubc95"),(0,o.kt)("li",{parentName:"ul"},"CRDs\ub294 Kubernetes\uc758 \ud655\uc7a5 \uae30\ub2a5"),(0,o.kt)("li",{parentName:"ul"},"Kubernetes \uc0ac\uc6a9\uc790\uac00 \ud074\ub7ec\uc2a4\ud130\ub0b4\uc5d0\uc11c \uc9c1\uc811 custom Object\ub97c yaml\ud615\ud0dc\ub85c \uc0dd\uc131, \uc218\uc815, \uc0ad\uc81c, \uc0ac\uc6a9\ud560\uc218 \uc788\ub3c4\ub85d \ud558\ub294 \uae30\ub2a5  ",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"K8s database(etcd)\uc640 API\ub97c \uadf8\ub300\ub85c \ud65c\uc6a9\ud560 \uc218 \uc788\uc74c)"),(0,o.kt)("li",{parentName:"ul"},"CRUD \uac00\ub2a5 (Create, Read, Update, Delete)"))),(0,o.kt)("li",{parentName:"ul"},"\ubaa8\ub4e0 \ud074\ub7ec\uc2a4\ud130\uc5d0 \ub3d9\uc801\uc73c\ub85c resource \ub4f1\ub85d/\uc0ad\uc81c \uac00\ub2a5"),(0,o.kt)("li",{parentName:"ul"},"Operators\ub294 CRDs\ub97c \ud3ec\ud568\ud558\uace0 \uc788\uc74c",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Operator\ub97c \ucd94\uac00\ud558\uba74 CRDs\uac00 \ub4f1\ub85d\ub428"))),(0,o.kt)("li",{parentName:"ul"},"Resource \ub2f9 \ud558\ub098\uc758 API \ubc84\uc804\ub9cc \uc9c0\uc6d0(~1.10\ubc84\uc804, 1.11\ubc84\uc804 \uc774\ud6c4 \uac1c\uc218 \uc81c\ud55c \uc5c6\uc5b4\uc9d0)"),(0,o.kt)("li",{parentName:"ul"},"1.8+ \uc774\ud6c4\ubd80\ud130 JSON \uc2a4\ud0a4\ub9c8 \uc720\ud6a8\uc131 \uac80\uc99d \uac00\ub2a5\n",(0,o.kt)("strong",{parentName:"li"}," *\uc8fc\uc758\uc0ac\ud56d : etcd\uac00 \ubcc4\ub3c4 \ubd84\ub9ac\ub41c managed\uc11c\ube44\uc2a4\ub098 etcd \uc778\uc2a4\ud134\uc2a4\uac00 \ubd84\ub9ac\ub41c \ud658\uacbd\uc5d0\uc11c \uc0ac\uc6a9\uad8c\uace0"))),(0,o.kt)("h3",{id:"\uc8fc\uc694-\ud65c\uc6a9\uc6a9\ub3c4"},"\uc8fc\uc694 \ud65c\uc6a9\uc6a9\ub3c4"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Operators"),(0,o.kt)("li",{parentName:"ul"},"Application \uc815\ubcf4 \uc800\uc7a5"),(0,o.kt)("li",{parentName:"ul"},"RouteRule on istio"),(0,o.kt)("li",{parentName:"ul"},"GameServer on Agones")),(0,o.kt)("h2",{id:"crds-\uad00\ub828-\ubc1c\ud45c\uc790\ub8cc"},"CRDs \uad00\ub828 \ubc1c\ud45c\uc790\ub8cc"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ddiiwoong.github.io/2018/openinfraday18/"},"https://ddiiwoong.github.io/2018/openinfraday18/")),(0,o.kt)("h3",{id:"operators-example"},"Operators example"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://coreos.com/operators/etcd/docs/latest"},"etcd"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rook/rook"},"Rook"),", ",(0,o.kt)("a",{parentName:"p",href:"https://coreos.com/operators/prometheus/docs/latest"},"Prometheus"),", ",(0,o.kt)("a",{parentName:"p",href:"https://www.vaultproject.io/"},"Vault"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/oracle/mysql-operator"},"MySQL"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CrunchyData/postgres-operator"},"Postgres"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/spotahome/redis-operator"},"Redis"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/nbogojevic/kafka-operator"},"kafka-\ube44\uacf5\uc2dd")," \ub4f1 Operator\ub85c \ubc30\ud3ec\ub420\uc218 \uc788\ub294 \uc608\uc2dc\ub4e4\uc740 \ud574\ub2f9 \ub9c1\ud06c\ub97c \ubcf4\uba74 \uc790\uc138\ud788 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. (\uc624\ub77c\ud074\uc774 \uacf5\uaca9\uc801\uc73c\ub85c K8s\ube44\uc9c0\ub2c8\uc2a4\ub85c \ub6f0\uc5b4\ub4dc\ub294\ub4ef\ud55c \uadf8\ub9bc\uc774\ub2e4\u2026)  "),(0,o.kt)("p",null,"\uc8fc\ub85c \uc800\uc7a5\uc18c\ub098 \ud0a4-\ubc38\ub958 \uc2a4\ud1a0\uc5b4, RDB\ub4f1\uc758 \uc6b4\uc601\uc548\uc815\uc131\uc744 \uc704\ud55c \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131\uc744 \uc704\ud55c\uac83\ub4e4\uc774 \ub300\ubd80\ubd84\uc774\uba70 \uc810\uc810 \ub3c4\uc785\uc744 \ud574\ub098\uac00\ub294 \ucd94\uc138\uc774\uae34\uac83 \uac19\uae34 \ud558\ub2e4. \uc774\ubc88\uc5d0 \uc9c4\ud589\ud574\ubcf4\uace0\uc790 \ud558\ub294\uac74 \ubd84\uc0b0 \ud0a4-\ubc38\ub958 \uc2a4\ud1a0\uc5b4\uc774\uc790 kubernetes\uc758 \uba54\uc778\uc800\uc7a5\uc18c\ub85c \uc4f0\uc774\ub294 etcd \uc774\ub2e4."),(0,o.kt)("p",null,"\uae30\ubcf8\uc801\uc73c\ub85c etcd cluster objects\ub294 CRDs\ub85c \uc0dd\uc131\ud55c\ub2e4. Kubernetes \uae30\ubcf8 resource\uac00 \uc544\ub2cc CRDs \uc774\uae30 \ub54c\ubb38\uc5d0 \uc548\uc815\uc131 \uce21\uba74\uc5d0\uc11c \ubd88\uc548\ud558\ub2e4\uace0 \uc0dd\uac01\ud560\uc218\ub3c4 \uc788\ub2e4. \ud558\uc9c0\ub9cc ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/aggregated-api-servers.md"},"User Aggregated API Servers")," \ub97c \uc801\uc6a9\ud558\uc5ec \uc548\uc815\uc131, \uc720\ud6a8\uc131 \uac80\uc0ac \ubc0f \ubc84\uc804 \uad00\ub9ac\uac00 \uac1c\uc120\ub418\uc5c8\ub2e4\uace0 \ud55c\ub2e4. Aggregated API\ub97c \uc0ac\uc6a9\ud558\uba74 \uc0ac\uc6a9\uc790\uc5d0\uac8c \ucd5c\uc18c\ud55c\uc758 \uc601\ud5a5\uc744 \uc8fc\uba74\uc11c Kubernetes objects\uac00 \uc0dd\uc131\ub418\uac70\ub098 \uc0ac\uc6a9\uc790\uac00 etcd operator\ub97c \ubc30\ud3ec,\uad00\ub9ac\ud560\uc218 \uc788\ub2e4. (\ub9d0\uc774 \uae38\uc5b4\uc11c \uadf8\ub807\uc9c0 \uadf8\ub0e5 etcd \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131)"),(0,o.kt)("p",null,"\ud604\uc7ac \ud504\ub85c\uc81d\ud2b8\ub294 \ubca0\ud0c0\ub85c 0.9.2\uae4c\uc9c0 \ub098\uc640 \uc788\uc73c\uba70 RedHat\uc774 CoreOS\ub97c \ud569\ubcd1\ud558\ub294 \ubc14\ub78c\uc5d0 \ubb38\uc11c\ub4e4\uc774 \uc5c5\ub370\uc774\ud2b8\uac00 \ub2a6\uc5b4\uc9c0\ub294\uac83 \uac19\uae34\ud558\uc9c0\ub9cc \uc870\ub9cc\uac04\uc5d0 1.0\uc774 \ub098\uc62c\uac83 \uac19\uae34 \ud558\ub2e4."),(0,o.kt)("h3",{id:"etcd-operator"},(0,o.kt)("a",{parentName:"h3",href:"https://github.com/coreos/etcd-operator/#overview"},"etcd-operator")),(0,o.kt)("p",null,"etcd operator\ub294 \uae30\ubcf8\uc801\uc73c\ub85c \ub2e4\uc74c\uacfc \uac19\uc740 \uae30\ub2a5\uc744 \ud55c\ub2e4."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create and Destroy"),(0,o.kt)("li",{parentName:"ul"},"Resize"),(0,o.kt)("li",{parentName:"ul"},"Failover"),(0,o.kt)("li",{parentName:"ul"},"Rolling upgrade"),(0,o.kt)("li",{parentName:"ul"},"Backup and Restore")),(0,o.kt)("h4",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Kubernetes 1.8+"),(0,o.kt)("li",{parentName:"ul"},"etcd 3.2.13+")),(0,o.kt)("h3",{id:"installation-guide"},"Installation guide"),(0,o.kt)("p",null,"\uc124\uce58\ub294 \ub2e8\uc21c\ud558\ub2e4. \uba3c\uc800 RBAC\uc124\uc815\uc744 \ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ git clone https://github.com/coreos/etcd-operator.git\n$ cd etcd-operator\n$ example/rbac/create_role.sh\n")),(0,o.kt)("p",null,"\uadf8\ub9ac\uace0 etcd-operator \ubc30\ud3ec"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl create -f example/deployment.yaml\napiVersion: extensions/v1beta1\nkind: Deployment\nmetadata:\n  name: etcd-operator\nspec:\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        name: etcd-operator\n    spec:\n      containers:\n      - name: etcd-operator\n        image: quay.io/coreos/etcd-operator:v0.9.2\n        command:\n        - etcd-operator\n        # Uncomment to act for resources in all namespaces. More information in doc/clusterwide.md\n        #- -cluster-wide\n        env:\n        - name: MY_POD_NAMESPACE\n          valueFrom:\n            fieldRef:\n              fieldPath: metadata.namespace\n        - name: MY_POD_NAME\n          valueFrom:\n            fieldRef:\n              fieldPath: metadata.name\n")),(0,o.kt)("p",null,"deployment.yaml \ub0b4\uc6a9\uc744 \ubcf4\uba74 CustomResourceDefinition\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294\ub2e4.\netcd-operator\uac00 \uc790\ub3d9\uc73c\ub85c CRD\ub97c \uc0dd\uc131\ud558\uae30 \ub54c\ubb38\uc5d0 \uc544\ub798\uc640 \uac19\uc774 CRD\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl get customresourcedefinitions\nNAME                                    KIND\netcdclusters.etcd.database.coreos.com   CustomResourceDefinition.v1beta1.apiextensions.k8s.io\n")),(0,o.kt)("h3",{id:"etcd-cluster-createresizefailoverupgrade"},"etcd cluster create/resize/failover/upgrade"),(0,o.kt)("p",null,"operator\ub97c \uc774\uc6a9\ud558\uc5ec etc cluster\ub97c \uad6c\uc131\ud55c\ub2e4. operator\ub97c \ud1b5\ud55c \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131\ub0b4\uc6a9\uc744 \ud655\uc778\ud558\uba74 \uc544\uc8fc \ub2e8\uc21c\ud558\ub2e4. \ubc84\uc804\uacfc \uc0ac\uc774\uc988\ubfd0\uc774\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'$ cat example/example-etcd-cluster.yaml\napiVersion: "etcd.database.coreos.com/v1beta2"\nkind: "EtcdCluster"\nmetadata:\n  name: "example-etcd-cluster"\n  ## Adding this annotation make this cluster managed by clusterwide operators\n  ## namespaced operators ignore it\n  # annotations:\n  #   etcd.database.coreos.com/scope: clusterwide\nspec:\n  size: 3\n  version: "3.2.13"\n$ kubectl create -f example/example-etcd-cluster.yaml\netcdcluster.etcd.database.coreos.com/example-etcd-cluster created\n')),(0,o.kt)("p",null,"\uc21c\ucc28\uc801\uc73c\ub85c etcd cluster\uac00 \uad6c\uc131\ub418\ub294\uac83\uc744 \ubcfc\uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl get pods\nNAME                              READY     STATUS    RESTARTS   AGE\netcd-operator-69b559656f-wrhxz    1/1       Running   0          3h\nexample-etcd-cluster-2kd4t667j5   1/1       Running   0          1m\nexample-etcd-cluster-k4lxm96v7h   1/1       Running   0          1m\nexample-etcd-cluster-lm7mkhvldw   1/1       Running   0          1m\n")),(0,o.kt)("p",null,"\uc774\ubc88\uc5d0\ub294 scale-out \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud55c\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","example/example-etcd-cluster.yaml \ub0b4\uc6a9\uc5d0\uc11c ",(0,o.kt)("inlineCode",{parentName:"p"},"size: 3")," \uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"size: 5")," \ub85c \ubcc0\uacbd\ud558\uace0 \ub2e4\uc2dc \uc801\uc6a9\ud558\uba74 2 node\uac00 \ucd94\uac00\ub85c \uc0dd\uc131\ub41c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl apply -f example/example-etcd-cluster.yaml\n$ kubectl get pods\nNAME                              READY     STATUS    RESTARTS   AGE\netcd-operator-69b559656f-wrhxz    1/1       Running   0          3h\nexample-etcd-cluster-2kd4t667j5   1/1       Running   0          9m\nexample-etcd-cluster-2pwm84lrf4   1/1       Running   0          34s\nexample-etcd-cluster-97qk6gs4sp   1/1       Running   0          50s\nexample-etcd-cluster-k4lxm96v7h   1/1       Running   0          9m\nexample-etcd-cluster-lm7mkhvldw   1/1       Running   0          8m\n")),(0,o.kt)("p",null,"\ubc18\ub300\ub85c \uc904\uc774\ub294\uac83\ub3c4 \ub3d9\uc77c\ud558\ub2e4."),(0,o.kt)("p",null,"failover \ud14c\uc2a4\ud2b8\uc758 \uacbd\uc6b0\uc5d0\ub3c4 \uadf8\ub0e5 pod\ub97c \uc0ad\uc81c\ud558\uac70\ub098 worker\ub97c \ub0a0\ub9ac\ub294\uac83\uc73c\ub85c\ub3c4 \ub3d9\uc77c\ud558\uac8c spec\uc744 \uc720\uc9c0\ud558\ub294 kubernetes resource \ud2b9\uc131\uc73c\ub85c \uc778\ud574 \ubc14\ub85c \uc0dd\uc131\uc774 \ub418\ub294\uac83\uc744 \ud655\uc778\ud560\uc218 \uc788\ub2e4."),(0,o.kt)("p",null,"\uc774\ubc88\uc5d0\ub294 operator\ub9cc \ub0a0\ub824\ubcf4\uaca0\ub2e4. \uc544\ub798\ucc98\ub7fc operator deployment\ub9cc \uc0ad\uc81c\ub97c \ud574\ub3c4 pods\ub294 \ub0a8\uc544\uc788\ub294\uac83\uc744 \ubcfc\uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'$ kubectl delete -f example/deployment.yaml\ndeployment "etcd-operator" deleted\ndeployment.extensions "etcd-operator" deleted\n$ kubectl get pod\nNAME                              READY     STATUS    RESTARTS   AGE\nexample-etcd-cluster-2kd4t667j5   1/1       Running   0          14m\nexample-etcd-cluster-2pwm84lrf4   1/1       Running   0          5m\nexample-etcd-cluster-97qk6gs4sp   1/1       Running   0          5m\nexample-etcd-cluster-k4lxm96v7h   1/1       Running   0          14m\nexample-etcd-cluster-lm7mkhvldw   1/1       Running   0          13m\n')),(0,o.kt)("p",null,"etcd pod \ud558\ub098\ub97c \ub0a0\ub824\ubcf8\ub2e4. 4\uac1c pod\ub9cc \ub0a8\uc740\uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'$ kubectl delete pod example-etcd-cluster-2kd4t667j5 --now\npod "example-etcd-cluster-2kd4t667j5" deleted\n$ kubectl get pod\nNAME                              READY     STATUS    RESTARTS   AGE\nexample-etcd-cluster-2pwm84lrf4   1/1       Running   0          9m\nexample-etcd-cluster-97qk6gs4sp   1/1       Running   0          9m\nexample-etcd-cluster-k4lxm96v7h   1/1       Running   0          18m\nexample-etcd-cluster-lm7mkhvldw   1/1       Running   0          17m\n')),(0,o.kt)("p",null,"\ub2e4\uc2dc\ud55c\ubc88 operator\ub97c \ubc30\ud3ec\ud558\uac8c \ub418\uba74 \uc7a0\uc2dc\ud6c4\uc5d0 5\uac1c\ub85c \ub2e4\uc2dc pod\uac00 \ubcf5\uc6d0\ub41c\uac83\uc744 \ud655\uc778\ud560\uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl create -f example/deployment.yaml\ndeployment.extensions/etcd-operator created\n$ kubectl get pod\nNAME                              READY     STATUS    RESTARTS   AGE\netcd-operator-69b559656f-8ks8m    1/1       Running   0          44s\nexample-etcd-cluster-2pwm84lrf4   1/1       Running   0          11m\nexample-etcd-cluster-97qk6gs4sp   1/1       Running   0          11m\nexample-etcd-cluster-k4lxm96v7h   1/1       Running   0          20m\nexample-etcd-cluster-kskgvlbsm9   1/1       Running   0          10s\nexample-etcd-cluster-lm7mkhvldw   1/1       Running   0          19m\n")),(0,o.kt)("p",null,"\uc5c5\uadf8\ub808\uc774\ub4dc\uc758 \uacbd\uc6b0\ub3c4 \ub2e4\ub978 resource\uc640 \ub3d9\uc77c\ud558\uac8c version \ubd80\ubd84\uc744 \ubcc0\uacbd\ud558\uc5ec rollout\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,o.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,o.kt)("p",null,"\ub2e4\uc74c \uc18c\uc2a4\ub97c \ud1b5\ud574 \uc9c1\uc811 operator\ub97c \uac1c\ubc1c\uc774 \uac00\ub2a5\ud558\ub2e4.",(0,o.kt)("br",{parentName:"p"}),"\n","(Source: ",(0,o.kt)("a",{parentName:"p",href:"https://coreos.com/operators/"},"https://coreos.com/operators/"),")"),(0,o.kt)("p",null,"Operator SDK\ub97c \uc0ac\uc6a9\ud558\uba74 Kubernetes API \uc0c1\uc138\uc2a4\ud399\uc744 \ubc30\uc6b0\uc9c0 \uc54a\uace0\ub3c4 \uc27d\uac8c operator \ube4c\ub4dc\uac00 \uac00\ub2a5\ud558\ub2e4.\n\ub610\ud55c \uad00\ub9ac\ub97c \uc704\ud55c Operator Lifecycle Manager\ub098 Operator Metering \uac19\uc740 \uae30\ub2a5\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc880\ub354 \uad00\ub9ac\uce21\uba74\uc5d0\uc11c \uac15\ud654\ud558\uace0\uc790 \ud558\ub294 CoreOS\uc9c4\uc601\uc758 \ub178\ub825\uc774 \ubcf4\uc774\ub294\ub4ef \ud558\ub2e4."),(0,o.kt)("p",null,"\uc544\uc9c1 alpha, beta\ub2e8\uacc4\uc758 operator \ud504\ub85c\uc81d\ud2b8\ub4e4\uc774 \ub300\ubd80\ubd84\uc774\uc9c0\ub9cc helm\ucc28\ud2b8\uc640 \uac19\uc774 kubernetes API \uc2a4\ud399\uc744 \uc774\ud574\ud558\uace0 \uc0ac\uc6a9\ud558\uc9c0 \uc54a\uace0\ub3c4 \uc27d\uac8c \uc6b4\uc601\uc790\uac00 \uae30\ubc18 \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uad00\ub9ac \ud560\uc218 \uc788\ub2e4\ub294\uac83\uc73c\ub85c \ubcf4\uc544 \ud5a5\ud6c4 RedHat\uc774\ub098 Oracle \uc9c4\uc601\uc5d0\uc11c \ubcf8\uc778\ub4e4 kubernetes \uad00\ub828 \uc81c\ud488\ub4e4\uc744 \ud64d\ubcf4\ud558\uace0 \uc11c\ube44\uc2a4\ub77c\uc778\uc5d0 \ud3ec\ud568\uc2dc\ud0a4\ub294 \ubc29\ud5a5\uc73c\ub85c \uc801\uadf9\uc801\uc73c\ub85c \uac1c\ubc1c\uc744 \ud558\uace0 \uc788\ub294\uac83\uc73c\ub85c \ubcf4\uc778\ub2e4. \uc55e\uc73c\ub85c mysql, redis, kakfa \ub4f1\uc744 operator\ub85c \ubc30\ud3ec\ud558\uace0 \uad00\ub9ac\ud558\ub294 \uc77c\uc774 \ub354 \ub9ce\uc544 \uc9c8\uac83 \uac19\ub2e4."))}d.isMDXComponent=!0}}]);