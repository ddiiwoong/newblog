"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[6600],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),k=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=k(e.components);return a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=k(n),m=r,d=c["".concat(o,".").concat(m)]||c[m]||s[m]||l;return n?a.createElement(d,i(i({ref:t},u),{},{components:n})):a.createElement(d,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var k=2;k<l;k++)i[k]=n[k];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},50137:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return p},metadata:function(){return k},toc:function(){return s}});var a=n(87462),r=n(63366),l=(n(67294),n(3905)),i=["components"],p={layout:"single",title:"Spinnaker on Kubernetes #2",comments:!0,classes:"wide",description:"Spinnaker\uc5d0 \ub300\ud574 \uc54c\uc544\ubd05\ub2c8\ub2e4 #2",slug:"kubernetes/spinnaker-advanced-2/",date:new Date("2018-09-27T00:00:00.000Z"),categories:["Kubernetes"],tags:["CI/CD","Kubernetes","Spinnaker","Continuous Delivery","Continuous Deployment","Pipeline"]},o="Spinnaker on Kubernetes",k={permalink:"/kubernetes/spinnaker-advanced-2/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2018-09-27-spinnaker-advanced-2.md",source:"@site/blog/2018-09-27-spinnaker-advanced-2.md",title:"Spinnaker on Kubernetes #2",description:"Spinnaker\uc5d0 \ub300\ud574 \uc54c\uc544\ubd05\ub2c8\ub2e4 #2",date:"2018-09-27T00:00:00.000Z",formattedDate:"September 27, 2018",tags:[{label:"CI/CD",permalink:"/tags/ci-cd"},{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"Spinnaker",permalink:"/tags/spinnaker"},{label:"Continuous Delivery",permalink:"/tags/continuous-delivery"},{label:"Continuous Deployment",permalink:"/tags/continuous-deployment"},{label:"Pipeline",permalink:"/tags/pipeline"}],readingTime:7.61,truncated:!1,authors:[],frontMatter:{layout:"single",title:"Spinnaker on Kubernetes #2",comments:!0,classes:"wide",description:"Spinnaker\uc5d0 \ub300\ud574 \uc54c\uc544\ubd05\ub2c8\ub2e4 #2",slug:"kubernetes/spinnaker-advanced-2/",date:"2018-09-27T00:00:00.000Z",categories:["Kubernetes"],tags:["CI/CD","Kubernetes","Spinnaker","Continuous Delivery","Continuous Deployment","Pipeline"]},prevItem:{title:"Spinnaker on Kubernetes #3 (Kayenta)",permalink:"/kubernetes/spinnaker-advanced-3/"},nextItem:{title:"knative",permalink:"/kubernetes/knative/"}},u={authorsImageUrls:[]},s=[{value:"What is spinnaker? (+History)",id:"what-is-spinnaker-history",level:2},{value:"\uc65c Spinnaker\ub97c \uc368\uc57c\ud558\uc9c0?",id:"\uc65c-spinnaker\ub97c-\uc368\uc57c\ud558\uc9c0",level:2},{value:"Jenkins vs Spinnaker",id:"jenkins-vs-spinnaker",level:2},{value:"Kubernetes vs Spinnaker",id:"kubernetes-vs-spinnaker",level:2},{value:"Deploy Pipeline",id:"deploy-pipeline",level:2},{value:"Deployment Strategies",id:"deployment-strategies",level:2},{value:"Red / Black (same as Blue / Green)",id:"red--black-same-as-blue--green",level:3},{value:"Rolling red/black",id:"rolling-redblack",level:3},{value:"Canary",id:"canary",level:3},{value:"\uc6a9\uc5b4\uc815\ub9ac 2\ud0c4",id:"\uc6a9\uc5b4\uc815\ub9ac-2\ud0c4",level:2},{value:"Application Management",id:"application-management",level:3},{value:"Cluster",id:"cluster",level:3},{value:"Server Group",id:"server-group",level:3},{value:"Cloud Provider",id:"cloud-provider",level:3},{value:"Account",id:"account",level:3},{value:"Pipeline",id:"pipeline",level:3},{value:"Stage (atomic building block)",id:"stage-atomic-building-block",level:3},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],c={toc:s};function m(e){var t=e.components,p=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},c,p,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"\uc774\uc804 \ud3ec\uc2a4\ud305 ",(0,l.kt)("a",{parentName:"p",href:"https://ddii.dev/kubernetes/spinnaker-advanced-1/"},"Spinnaker on Kubernetes #1"),"\uc5d0\uc11c \uac80\ud1a0\ud560\ub54c\ub294 \ub9ce\uc774 \uac1c\ub150\uc744 \uc774\ud574\ud558\uae30 \uc5b4\ub824\uc6e0\ub358\uac83 \uac19\uc9c0\ub9cc \uc5b4\ub290\uc815\ub3c4 \uc2dc\uac04\uc774 \uc9c0\ub0ac\uace0 \ub610 \uba87\uc77c \ud6c4\uc5d0 \ubc1c\ud45c\ub3c4 \uc788\uc5b4\uc11c \ub2e4\ub978 \uc774\uc57c\uae30\ub97c \ud574\ubcf4\uace0\uc790 \ud55c\ub2e4.  "),(0,l.kt)("p",null,"\uc9c0\ub09c \ud3ec\uc2a4\ud305\uc5d0 \ub300\ucda9 \uc9d1\uace0 \ub118\uc5b4\uac04 \uc6a9\uc5b4\ub4e4\uc5d0 \ub300\ud55c \uc815\ub9ac\ub97c \ub2e4\uc2dc \ud558\uace0 \uae30\ubcf8\uc801\uc778 \uc0ac\uc0c1\ub4e4\uc744 \uc815\ub9ac\ud574\ubcf4\uace0\uc790 \ud55c\ub2e4. \ud5c8\uc811\ud55c \ud50c\ub7ab\ud3fc \uc5d4\uc9c0\ub2c8\uc5b4 \uc0dd\uac01\uc774\ub2c8 \uc5b8\uc81c\ub4e0 \ub2e4\ub978 \uc758\uacac\uc744 \ud658\uc601\ud558\ub294 \ubc14\uc774\ub2e4. "),(0,l.kt)("h2",{id:"what-is-spinnaker-history"},"What is spinnaker? (+History)"),(0,l.kt)("p",null,"\ucd5c\uadfc \ud2b8\ub80c\ub4dc\uc778 \uba40\ud2f0 \ud074\ub77c\uc6b0\ub4dc\ub97c \uc9c0\ud5a5\ud558\ub294 \uc624\ud508\uc18c\uc2a4 \ud50c\ub7ab\ud3fc\uc774\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","2014\ub144 Netflix\uc758 Asgard\ub85c \uc2dc\uc791\ub418\uc5b4 2015\ub144\uc5d0 \uc624\ud508\uc18c\uc2a4\ud654 \ub418\uc5c8\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\ube60\ub978 \uc18d\ub3c4\uc640 \uc2e0\ub8b0\ub3c4\uc788\ub294 \uc18c\ud504\ud2b8\uc6e8\uc5b4 \ub9b4\ub9ac\uc988\ub97c \uc704\ud574 \ub9cc\ub4e4\uc5b4\uc84c\uc73c\uba70 \ub300\ubd80\ubd84\uc758 \uba54\uc774\uc800 \ud074\ub77c\uc6b0\ub4dc \ud504\ub85c\ubc14\uc774\ub354\ub4e4\uc744 \uc9c0\uc6d0\ud55c\ub2e4.(AWS,GCP,Azure,openstack..)",(0,l.kt)("br",{parentName:"p"}),"\n","\ud604\uc7ac Netflix, Google, MS, Veritas\ub4f1\uc774 Contribution\uc744 \ud558\uace0 \uc788\ub2e4."),(0,l.kt)("h2",{id:"\uc65c-spinnaker\ub97c-\uc368\uc57c\ud558\uc9c0"},"\uc65c Spinnaker\ub97c \uc368\uc57c\ud558\uc9c0?"),(0,l.kt)("p",null,"\uc5ec\ub7ec\uac00\uc9c0 \uc774\uc720\uac00 \uc788\uaca0\uc9c0\ub9cc"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Multi-Cloud\uc6a9 Continuous Delivery/Deployment Platform \uc73c\ub85c \ub300\uccb4\uac00 \uac00\ub2a5"),(0,l.kt)("li",{parentName:"ul"},"\ub2e4\uc591\ud55c pipeline \ud615\ud0dc\ub85c \ubc30\ud3ec\uac00 \uac00\ub2a5\ud558\uace0 Rollback\uc774 \uc26c\uc6c0"),(0,l.kt)("li",{parentName:"ul"},"\ube60\ub978 \ubc30\ud3ec\uac00 \uac00\ub2a5\ud558\uace0 \uc5ec\ub7ec\ubc88 \ubc30\ud3ec\uac00 \uc6a9\uc774\ud568"),(0,l.kt)("li",{parentName:"ul"},"\uc720\uc5f0\ud55c pipeline management system\uc744 \uac00\uc9c0\uace0 \uc788\uc74c"),(0,l.kt)("li",{parentName:"ul"},"\ub2e4\uc591\ud55c \ubc30\ud3ec\uc804\ub7b5\uc744 \uac00\uc9c4\ub2e4(Blue-Green, Rolling Red/Black, Canary)"),(0,l.kt)("li",{parentName:"ul"},"community \ud65c\ub3d9 \ud65c\ubc1c (github, slack) - \ub2f5\uc740 \uc798 \uc548\ud574\uc90c \u3160\u3160"),(0,l.kt)("li",{parentName:"ul"},"VM\uacfc Container \ub3d9\uc2dc\uc5d0 \ud1b5\ud569\uad00\ub9ac \uac00\ub2a5"),(0,l.kt)("li",{parentName:"ul"},"CI\ud1b5\ud569 \uc6a9\uc774(Jenkins)"),(0,l.kt)("li",{parentName:"ul"},"CLI\ub97c \ud1b5\ud55c \uc124\uce58 \ubc0f \uad00\ub9ac(halyard)"),(0,l.kt)("li",{parentName:"ul"},"VM, Helm Packaging \uac00\ub2a5"),(0,l.kt)("li",{parentName:"ul"},"RBAC \uc9c0\uc6d0"),(0,l.kt)("li",{parentName:"ul"},"Notification - Email, Slack, Hipchat\ub4f1"),(0,l.kt)("li",{parentName:"ul"},"Safe Deployment - Judgement (\uc2b9\uc778\uae30\ub2a5)"),(0,l.kt)("li",{parentName:"ul"},"Chaos Monkey Built-in")),(0,l.kt)("p",null,"\uc774\uc815\ub3c4\uba74 \ubb34\uc870\uac74 \uc368\uc57c\ud558\uc9c0 \uc54a\uc744\uae4c?"),(0,l.kt)("h2",{id:"jenkins-vs-spinnaker"},"Jenkins vs Spinnaker"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"center"},"Jenkins"),(0,l.kt)("th",{parentName:"tr",align:"center"},"Spinnaker"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\uac15\ub825\ud55c \ube4c\ub4dc\uc11c\ubc84"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\ud074\ub77c\uc6b0\ub4dc \uc790\uc6d0\uc758 1\ucc28 \uc5f0\ub3d9")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\uc644\uc804\ud55c deployment tool\uc774 \uc544\ub2d8"),(0,l.kt)("td",{parentName:"tr",align:"center"},"vm & deployments \uc548\uc5d0 \ube4c\ub4dc\ub418\uc5b4 \uc788\uc74c")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\uc2a4\ud06c\ub9bd\ud305\uc774 \ub9ce\uc774 \ud544\uc694\ud568"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\ubcc4\ub3c4\uc758 \uc2a4\ud06c\ub9bd\ud305\uc774 \ub9ce\uc774 \ud544\uc694\uc5c6\uc74c")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\uae30\ub2a5\ub4e4\uc774 \ubaa8\ub450 \ud50c\ub7ec\uadf8\uc778 \ud615\ud0dc"),(0,l.kt)("td",{parentName:"tr",align:"center"},"CI tool\uc774 \uc544\ub2d8(CI tools\uc774 \ubc31\uc5d4\ub4dc\ub85c)")))),(0,l.kt)("h2",{id:"kubernetes-vs-spinnaker"},"Kubernetes vs Spinnaker"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"center"},"Kubernetes"),(0,l.kt)("th",{parentName:"tr",align:"center"},"Spinnaker"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\ub9ac\uc18c\uc2a4 \uc0ac\uc6a9 \uc81c\ud55c"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\uc815\uc758\ud55c \ud37c\uc13c\ud2b8\ub85c rollout")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"slow rollout"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\uac01 \ub2e8\uacc4\ubcc4 \uac80\uc99d \uac00\ub2a5")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"High rollback cost"),(0,l.kt)("td",{parentName:"tr",align:"center"},"Fast rollbacks")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"Linear rollouts"),(0,l.kt)("td",{parentName:"tr",align:"center"},"resource \uc0ac\uc6a9\ub7c9\uc774 \ud07c")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"\uac80\uc99d\ub2e8\uacc4\uac00 \uc5c6\uc74c"),(0,l.kt)("td",{parentName:"tr",align:"center"})))),(0,l.kt)("h2",{id:"deploy-pipeline"},"Deploy Pipeline"),(0,l.kt)("p",null,"Spinnaker\ub97c \uc0ac\uc6a9\ud560\ub54c \uae30\ubcf8\uc801\uc73c\ub85c \uc544\ub798\uc640 \uac19\uc740 \ud30c\uc774\ud504\ub77c\uc778\uc73c\ub85c \uad6c\uc131\ud55c\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\uc218\ub3d9\uc73c\ub85c UI\ub098 API\ub85c \ud2b8\ub9ac\uac70\ub9c1\ud560\uc218 \uc788\uace0, \uc790\ub3d9\uc73c\ub85c Jenkins \ub4f1\uacfc \ud2b8\ub9ac\uac70 \uc5f0\ub3d9\ud558\uc5ec \ube4c\ub4dc\uc644\ub8cc\uc2dc \ubc30\ud3ec\ub418\ub3c4\ub85d \ud560\uc218 \uc788\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"spinnaker-pipeline",src:n(36553).Z,width:"942",height:"399"})),(0,l.kt)("h2",{id:"deployment-strategies"},"Deployment Strategies"),(0,l.kt)("p",null,"Spinnaker\uc5d0\uc11c\uc758 \ubc30\ud3ec\uc804\ub7b5\uc740 \ub2e4\uc74c\uacfc \uac19\uc774 \uc81c\uacf5\ub41c\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://www.spinnaker.io/concepts/deployment-strategies.png",alt:"deployment-strategies"})),(0,l.kt)("h3",{id:"red--black-same-as-blue--green"},"Red / Black (same as Blue / Green)"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ub3d9\uc77c\ud55c \uc591\uc758 instance\ub85c \uc774\ub8e8\uc5b4\uc9c4 \uc0c8\ub85c\uc6b4 Server Group\uc744 \uc0dd\uc131\ud55c\ub2e4"),(0,l.kt)("li",{parentName:"ul"},"\uc2e0\uaddc Server Group\uc774 \uc815\uc0c1\uc0c1\ud0dc\uac00 \ub418\uba74 LB\ub294 \uc2e0\uaddc Server Group\uc5d0 \ud2b8\ub798\ud53d\uc744 \ubd84\uc0b0\ud55c\ub2e4. ")),(0,l.kt)("h3",{id:"rolling-redblack"},"Rolling red/black"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\uc774\uc804\uacfc \ub3d9\uc77c\ud558\uc9c0\ub9cc \uc778\uc2a4\ud134\uc2a4\ubcc4 \ub610\ub294 \uadf8\ub8f9\ubcc4\ub85c rolling")),(0,l.kt)("h3",{id:"canary"},"Canary"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\uac00\uc7a5 \uc791\uc740 \uac1c\uc218\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \uad50\uccb4\uc2dc\ud0a4\uace0"),(0,l.kt)("li",{parentName:"ul"},"\uc0c8\ub85c\uc6b4 \ubc84\uc804\uc73c\ub85c \ud2b8\ub798\ud53d\uc744 \ubd84\uc0b0\uc2dc\ud0a8\ub2e4 (1~5\ud504\ub85c)"),(0,l.kt)("li",{parentName:"ul"},"\uc0c8\ub85c\uc6b4 \ubc84\uc804\uc5d0 \uc774\uc288\uac00 \uc5c6\uc744\ub54c\uae4c\uc9c0 \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud558\uace0"),(0,l.kt)("li",{parentName:"ul"},"\ud2b9\uc815\uc2dc\uac04\uae4c\uc9c0 \uc774\uc288\uac00 \uc5c6\uc73c\uba74 \ubc30\ud3ec\ub97c \ub298\ub824\uac04\ub2e4. ")),(0,l.kt)("h2",{id:"\uc6a9\uc5b4\uc815\ub9ac-2\ud0c4"},"\uc6a9\uc5b4\uc815\ub9ac 2\ud0c4"),(0,l.kt)("p",null,"\uc774\uc804 ",(0,l.kt)("a",{parentName:"p",href:"https://ddiiwoong.github.io/2018/spinnaker-advanced-1/"},"post"),"\uc5d0\uc11c \uc815\ub9ac\ud55c\uac78 \ub2e4\uc2dc \ubcf5\uae30\ud558\uace0 \ucd94\uac00\uc801\uc778 \ub0b4\uc6a9\uc744\ub4e4 \uc801\uc5b4\ubd24\ub2e4."),(0,l.kt)("p",null,"\uc0ac\uc6a9\ud558\uba74\uc11c \ud63c\ub3c8\uc774 \ub9ce\uc774 \uc0dd\uae30\ub294 \ubd80\ubd84\uc774\ub2e4 \uc774\uac8c GCE\ub098 EC2\ub97c \uc4f0\uba74 \uc6a9\uc5b4 \ub9e4\uce6d\uc774 \uc26c\uc6b4\ub370 k8s\ub97c \uc704\ud55c \ubcc4\ub3c4\uc758 \uba54\ub274\uac00 \uc544\ub2cc \uae30\ub2a5\uc744 \ud1b5\ud569\ud558\ub2e4\ubcf4\ub2c8 \uc6a9\uc5b4\uac00 \uc870\uae08 \ud63c\ub3d9\uc2a4\ub7fd\uac8c \uad6c\uc131\uc774 \ub418\uc5c8\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\ud2b9\ud788 Load Balancer \ubd80\ubd84\uc740 Service\ub85c \ub9e4\ud551\ub418\uace0 \ud37c\ube14\ub9ad k8s\uc5d0\uc11c \uc81c\uacf5\ud558\ub294 Type LoadBalancer\ub294 \ubbf8\uc9c0\uc6d0\ud55c\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\uadf8\ub9ac\uace0 \ubaa8\ub4e0 Resource\ub4e4\uc740 Deploy, Delete, Scale, Rollout(Undo, Pause, Resume)\uc744 \uc9c0\uc6d0\ud558\uba70 Versioning\uc774 \uc9c0\uc6d0\ub41c\ub2e4.  Versioning\uc740 ",(0,l.kt)("a",{parentName:"p",href:"https://www.spinnaker.io/reference/providers/kubernetes-v2/#strategy"},"\uc5ec\uae30"),"\uc5d0 \uc124\uba85\ub41c \ub300\ub85c ",(0,l.kt)("inlineCode",{parentName:"p"},"strategy.spinnaker.io/versioned")," annotation\uc744 \ud1b5\ud574 manifest\ubcc4\ub85c \uc7ac\uc815\uc758\uac00 \uac00\ub2a5\ud558\ub2e4."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"center"},"Spinnaker"),(0,l.kt)("th",{parentName:"tr",align:"center"},"Kubernetes"),(0,l.kt)("th",{parentName:"tr",align:"center"},"\ube44\uace0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"Server Group"),(0,l.kt)("td",{parentName:"tr",align:"center"},(0,l.kt)("a",{parentName:"td",href:"https://www.spinnaker.io/reference/providers/kubernetes-v2/#workloads"},"Workloads")),(0,l.kt)("td",{parentName:"tr",align:"center"},(0,l.kt)("a",{parentName:"td",href:"https://www.spinnaker.io/guides/developer/crd-extensions/"},"CRD\uc758 \uacbd\uc6b0 \ubcc4\ub3c4 Build"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"Clusters"),(0,l.kt)("td",{parentName:"tr",align:"center"},"Logical Server Group"),(0,l.kt)("td",{parentName:"tr",align:"center"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"Load Balancer"),(0,l.kt)("td",{parentName:"tr",align:"center"},"Services"),(0,l.kt)("td",{parentName:"tr",align:"center"},"LoadBalancer(k8s) \ubbf8\uc9c0\uc6d0")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"Firewall"),(0,l.kt)("td",{parentName:"tr",align:"center"},"NetworkPolicies"),(0,l.kt)("td",{parentName:"tr",align:"center"})))),(0,l.kt)("h3",{id:"application-management"},"Application Management"),(0,l.kt)("p",null,"Spinnaker\uc5d0\uc11c Application \uc774\ub780 \ubc30\ud3ec\ud558\ub824\ub294 \uc11c\ube44\uc2a4\ub97c \ub098\ud0c0\ub0b4\ub294 \uad6c\uc870\ub77c \uc0dd\uac01\ud558\uba74 \ub41c\ub2e4.  "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"pipeline"),(0,l.kt)("li",{parentName:"ul"},"Clusters, Server Group\uc758 \uc9d1\ud569\uc774\uba70, firewall\uacfc loadbalancer\ub97c \ud3ec\ud568\ud55c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"Canary Config")),(0,l.kt)("h3",{id:"cluster"},"Cluster"),(0,l.kt)("p",null,"Kubernetes\uc758 Cluster\uac00 \uc544\ub2c8\ub77c Spinnaker\uc5d0\uc11c Server Group\uc758 \ub17c\ub9ac\uc801\uc778 \uadf8\ub8f9"),(0,l.kt)("h3",{id:"server-group"},"Server Group"),(0,l.kt)("p",null,"\uae30\ubcf8\uc790\uc6d0\uc778 \uc11c\ubc84\uadf8\ub8f9\uc740 \ubc30\ud3ec\ud560\uc218 \uc788\ub294 artifacts(vm image, docker image, source)\uc640 \uc778\uc2a4\ud134\uc2a4(pod) \uc218, Auto-Scaling, metadata \ub4f1 \uae30\ubcf8 \uad6c\uc131\ub4f1\uc744 \uac00\uc9c0\uace0 \uc788\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\uc11c\ubc84\uadf8\ub8f9\uc740 LoadBalacer\ub098 Firewall \ub3c4 \uc120\ud0dd\uc801\uc73c\ub85c \uc5f0\uacb0\ub418\uace0, vm\uc774\ub098 pod \ud615\ud0dc\ub85c \ubc30\ud3ec\ub41c application\uc758 \uc9d1\ud569\uccb4\ub77c \ubcfc\uc218 \uc788\ub2e4."),(0,l.kt)("h3",{id:"cloud-provider"},"Cloud Provider"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"IaaS - AWS, GCP, Azure, Oracle, Openstack"),(0,l.kt)("li",{parentName:"ul"},"PaaS -  Google App Engine"),(0,l.kt)("li",{parentName:"ul"},"Orchestrator - K8s, DC/OS"),(0,l.kt)("li",{parentName:"ul"},"Docker v2 Registry")),(0,l.kt)("h3",{id:"account"},"Account"),(0,l.kt)("p",null,"Cloud Provider\uc5d0 \uc778\uc99d\ud558\uae30 \uc704\ud55c Spinnaker\uc5d0\uc11c\ub9cc \uc0ac\uc6a9\ud558\ub294 Account Name"),(0,l.kt)("h3",{id:"pipeline"},"Pipeline"),(0,l.kt)("p",null,"Pipeline\uc740 \uc8fc\uc694 \ubc30\ud3ec \uad00\ub9ac\ub3c4\uad6c\ub85c \uc0ac\uc6a9\ub41c\ub2e4.\nStage\ub77c\uace0\ud558\ub294 \uc77c\ub828\uc758 Action\uc73c\ub85c \uad6c\uc131\ub418\uba70 \ud30c\uc774\ud504\ub77c\uc778\uc744 \ub530\ub77c Stage\uac04 \ub9e4\uac1c\ubcc0\uc218 \uc804\ub2ec\uc774 \uac00\ub2a5\ud558\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","\uc218\ub3d9\uc73c\ub85c \uc2dc\uc791\ud558\uac70\ub098, Jenkins \uc791\uc5c5\uc644\ub8cc, Docker Registry \uc2e0\uaddc Docker \uc774\ubbf8\uc9c0, Cron\uc77c\uc815 \ub610\ub294 \ub2e4\ub978 Stage\uc640 \uac19\uc740 \uc774\ubca4\ud2b8\uc5d0 \uc758\ud574 \uc790\ub3d9\uc73c\ub85c \ud2b8\ub9ac\uac70\ub9c1\ub418\ub3c4\ub85d \uad6c\uc131\ud560\uc218 \uc788\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","Pipeline \uc2e4\ud589\uc911\uc5d0(\uc2dc\uc791/\uc644\ub8cc/\uc2e4\ud328) mail, slack, hipchat(\uc0ac\ub77c\uc9d0)\uc744 \ud1b5\ud574 Alert\uac00 \uac00\ub2a5\ud558\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://www.spinnaker.io/concepts/pipelines.png",alt:"pipeline"})),(0,l.kt)("h3",{id:"stage-atomic-building-block"},"Stage (atomic building block)"),(0,l.kt)("p",null,"Pipeline\uc774 \uc218\ud589\ud560 \ub3d9\uc791\uc744 \ub9d0\ud55c\ub2e4.",(0,l.kt)("br",{parentName:"p"}),"\n","Deploy, Resize, Disable, Manual Judgement \ub4f1\uc744 \uc218\ud589\ud560\uc218 \uc788\ub2e4."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://www.spinnaker.io/concepts/pipelines/pipeline-tasks.png",alt:"stage"})),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Stage - Multiple steps"),(0,l.kt)("li",{parentName:"ul"},"Step - \uc9c4\ud589\ub418\uae30\uc804\uc5d0 \uad50\uc815/\ud3f4\ub9c1\uc774 \ud544\uc694\ud55c tasks"),(0,l.kt)("li",{parentName:"ul"},"Task - \ud2b9\uc815 Cloud Platform\uc73c\ub85c \ub3d9\uc2dc\uc5d0 \uc5ec\ub7ec API\ud638\ucd9c"),(0,l.kt)("li",{parentName:"ul"},"Operation - \ub2e8\uc704 API")),(0,l.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,l.kt)("p",null,"\uc6a9\uc5b4\ub098 \uac1c\ub150\uc740 \uc5b4\ub290\uc815\ub3c4 \uc815\ub9ac\ub41c\ub4ef \ud558\uace0 \ub2e4\uc74c \ud3ec\uc2a4\ud305\uc5d0\uc11c\ub294 \uc2e4\uc81c multi cluster \ud658\uacbd\uc5d0\uc11c deploy\ud558\uace0 pipeline\uc744 \uc0ac\uc6a9\ud558\ub294 \ub0b4\uc6a9\uc744 \uc801\uc5b4\ubcfc \uc608\uc815\uc774\ub2e4."))}m.isMDXComponent=!0},36553:function(e,t,n){t.Z=n.p+"assets/images/spinnaker-pipeline-7b27fbf5bddf6d0c506c5f20a8a9f36a.png"}}]);