"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[6073],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return g}});var o=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,l=function(e,t){if(null==e)return{};var n,o,l={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(n),g=l,d=m["".concat(s,".").concat(g)]||m[g]||p[g]||a;return n?o.createElement(d,r(r({ref:t},c),{},{components:n})):o.createElement(d,r({ref:t},c))}));function g(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,r=new Array(a);r[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:l,r[1]=i;for(var u=2;u<a;u++)r[u]=n[u];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},49493:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return p}});var o=n(87462),l=n(63366),a=(n(67294),n(3905)),r=["components"],i={layout:"single",title:"Knative with Gloo",comments:!0,classes:"wide",description:"Istio\uc5d0 \uc885\uc18d\ub418\uc5b4\uc788\ub294 Knative\uac00 \uc544\ub2cc \uacbd\ub7c9\ud654\ub41c Ingress \uc624\ud508\uc18c\uc2a4 Gloo\ub97c \ud65c\uc6a9\ud55c Knative \uc124\uce58 \ubc0f \ud65c\uc6a9",slug:"kubernetes/knative-using-gloo/",date:new Date("2019-02-28T00:00:00.000Z"),categories:["Kubernetes"],tags:["Knative","Kubernetes","FaaS","Serverless","CRDs","CloudEvents","Mesh","Gloo"]},s=void 0,u={permalink:"/kubernetes/knative-using-gloo/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2019-02-28-knative-using-gloo.md",source:"@site/blog/2019-02-28-knative-using-gloo.md",title:"Knative with Gloo",description:"Istio\uc5d0 \uc885\uc18d\ub418\uc5b4\uc788\ub294 Knative\uac00 \uc544\ub2cc \uacbd\ub7c9\ud654\ub41c Ingress \uc624\ud508\uc18c\uc2a4 Gloo\ub97c \ud65c\uc6a9\ud55c Knative \uc124\uce58 \ubc0f \ud65c\uc6a9",date:"2019-02-28T00:00:00.000Z",formattedDate:"February 28, 2019",tags:[{label:"Knative",permalink:"/tags/knative"},{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"FaaS",permalink:"/tags/faa-s"},{label:"Serverless",permalink:"/tags/serverless"},{label:"CRDs",permalink:"/tags/cr-ds"},{label:"CloudEvents",permalink:"/tags/cloud-events"},{label:"Mesh",permalink:"/tags/mesh"},{label:"Gloo",permalink:"/tags/gloo"}],readingTime:8.575,truncated:!1,authors:[],frontMatter:{layout:"single",title:"Knative with Gloo",comments:!0,classes:"wide",description:"Istio\uc5d0 \uc885\uc18d\ub418\uc5b4\uc788\ub294 Knative\uac00 \uc544\ub2cc \uacbd\ub7c9\ud654\ub41c Ingress \uc624\ud508\uc18c\uc2a4 Gloo\ub97c \ud65c\uc6a9\ud55c Knative \uc124\uce58 \ubc0f \ud65c\uc6a9",slug:"kubernetes/knative-using-gloo/",date:"2019-02-28T00:00:00.000Z",categories:["Kubernetes"],tags:["Knative","Kubernetes","FaaS","Serverless","CRDs","CloudEvents","Mesh","Gloo"]},prevItem:{title:"Cloud-Native Microservices Demo Application with OpenCensus",permalink:"/kubernetes/microservices-demo/"},nextItem:{title:"Knative CLI - knctl",permalink:"/kubernetes/knative-knctl/"}},c={authorsImageUrls:[]},p=[{value:"Knative Routing",id:"knative-routing",level:2},{value:"Service",id:"service",level:2},{value:"Kubernetes",id:"kubernetes",level:3},{value:"Knative",id:"knative",level:3},{value:"Istio",id:"istio",level:2},{value:"Gloo",id:"gloo",level:2},{value:"Install Knative with Gloo",id:"install-knative-with-gloo",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Install Glooctl",id:"install-glooctl",level:3},{value:"service.yaml",id:"serviceyaml",level:4},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2},{value:"\ub2e4\uc74c \uc8fc\uc81c",id:"\ub2e4\uc74c-\uc8fc\uc81c",level:2}],m={toc:p};function g(e){var t=e.components,n=(0,l.Z)(e,r);return(0,a.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"knative-routing"},"Knative Routing"),(0,a.kt)("p",null,"Knative\ub294 \uc55e\uc5d0\uc11c\ub3c4 \uba87\ubc88 \uc5b8\uae09\ud558\uc600\uc9c0\ub9cc \uae30\ubcf8\uc801\uc73c\ub85c ",(0,a.kt)("inlineCode",{parentName:"p"},"Routing"),"\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc678\ubd80\uc5d0 \ub178\ucd9c\ud560 \uc11c\ube44\uc2a4\ub4e4\uc5d0 \ub300\ud55c HTTP Endpoint\ub97c \uc81c\uacf5\ud55c\ub2e4. \uc5b4\ub5bb\uac8c \ubcf4\uba74 \uae30\ubcf8\uc801\uc73c\ub85c API Gateway \uc5ed\ud560\uc744 \ud558\uae30\ub3c4 \ud558\uace0 Ingress \uc5ed\ud560\uc744 \ud558\uae30\ub3c4 \ud55c\ub2e4. \ubcf4\ud1b5 Service mesh\uc778 ",(0,a.kt)("inlineCode",{parentName:"p"},"Istio"),"\ub97c \uc0ac\uc6a9\ud558\uc5ec ingress\ub97c \uad6c\ud604\ud558\ub294\uac83\uc774 \ub2f9\uc5f0\ud558\ub2e4\uace0 \uc0dd\uac01\ud558\uae30\ub3c4 \ud558\uc9c0\ub9cc Istio\uc758 \ubaa8\ub4e0 \uae30\ub2a5\uc774 Knative\uc5d0 \ud544\uc694\ud558\uc9c0\ub294 \uc54a\uace0 \uc124\uce58\ub418\ub294\uac83 \uc790\uccb4\uac00 \ub9ac\uc18c\uc2a4 \uc18c\ubaa8\uac00 \uaf64 \ub41c\ub2e4\ub294\uac83\uc740 \uc124\uce58 \ud574\ubcf8\uc0ac\ub78c\uc740 \uc54c\uace0 \uc788\uc744\uac83\uc774\ub2e4. "),(0,a.kt)("h2",{id:"service"},"Service"),(0,a.kt)("h3",{id:"kubernetes"},"Kubernetes"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://www.nginx.com/wp-content/uploads/2017/09/NGINX-Plus-Features-Kubernetes-Ingress-Controller-644x372@2x.png",alt:"ingress"}),(0,a.kt)("br",{parentName:"p"}),"\n","\uc774\ubbf8\uc9c0\ucd9c\ucc98 : ",(0,a.kt)("a",{parentName:"p",href:"https://www.nginx.com/blog/announcing-nginx-ingress-controller-for-kubernetes-release-1-3-0/"},"https://www.nginx.com/blog/announcing-nginx-ingress-controller-for-kubernetes-release-1-3-0/")),(0,a.kt)("p",null,"Kubernetes\uc5d0\uc11c\ub294 \uc77c\ubc18\uc801\uc73c\ub85c \uc11c\ube44\uc2a4 \uc811\uc18d\uc744 \uad6c\ud604\ud558\uac8c \ub418\uba74 \uae30\ubcf8\uc801\uc73c\ub85c Pod\uc640 Service\ub97c \uc0dd\uc131\ud558\uace0 Ingress\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud074\ub7ec\uc2a4\ud130 \ub0b4\ubd80\ub85c \ub4e4\uc5b4\uc624\ub294 \ud2b8\ub798\ud53d\uc744 \ucc98\ub9ac\ud558\uac8c \ub41c\ub2e4."),(0,a.kt)("h3",{id:"knative"},"Knative"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://i1.wp.com/blog.openshift.com/wp-content/uploads/intro.png?w=499&ssl=1",alt:"Serving"}),(0,a.kt)("br",{parentName:"p"}),"\n","\uc774\ubbf8\uc9c0\ucd9c\ucc98 : ",(0,a.kt)("a",{parentName:"p",href:"https://blog.openshift.com/knative-serving-your-serverless-services/"},"https://blog.openshift.com/knative-serving-your-serverless-services/")),(0,a.kt)("p",null,"Knative\uc5d0\uc11c\ub294 \uc55e\uc120 Knative \uad00\ub828 \ud3ec\uc2a4\ud305\uc5d0\uc11c\ub3c4 \uc124\uba85\ud588\ub4ef\uc774 ",(0,a.kt)("inlineCode",{parentName:"p"},"Automatic scaling up and down to zero")," \ud2b9\uc131\uc744 \uac00\uc9c0\uace0 \uc788\uae30\uc5d0 Pod\uac00 \ucd5c\ucd08 \uc2e4\ud589\ub418\uc5b4\uc788\uc9c0 \uc54a\uc740 \uc0c1\ud0dc\uc5d0\uc11c \ud2b8\ub798\ud53d\uc774 \ub4e4\uc5b4\uc624\uac8c \ub418\uba74 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/knative/serving/blob/master/docs/scaling/DEVELOPMENT.md"},"Knative Serving Activator"),"\uc5d0 \uc758\ud574\uc11c Pod\uac00 \uc5c6\ub294 Revision\uc744 \ud655\uc778\ud558\uace0 Cold Start \ud615\ud0dc\ub85c \ud504\ub85c\ube44\uc800\ub2dd\ud558\uac8c \ub41c\ub2e4. \ub098\ub294 \uc774\uac8c \uc9c4\uc815\ud55c \uc11c\ubc84\ub9ac\uc2a4\ub77c\uace0 \uc0dd\uac01\ud558\uc9c0\ub9cc \uc8fc\ubcc0\uc5d0 \ubc18\ubc15\ud558\uc2dc\ub294 \ubd84\ub4e4\ub3c4 \uac04\ud639 \uc788\ub2e4."),(0,a.kt)("p",null,"\uc774\ud6c4 Pod\uac00 Warm \uc0c1\ud0dc\uac00 \ub418\uace0 \ub098\uba74 Istio Route(Ingress Gateway)\ub97c \ud1b5\ud574 \ud2b8\ub798\ud53d\uc774 Pod\ub85c \uc804\ub2ec\ub418\uc5b4 \ud1b5\uc2e0\uc774 \uc774\ub904\uc9c0\uac8c \ub41c\ub2e4."),(0,a.kt)("p",null,"\ud604\uc7ac Knative\ub294 \ud604\uc7ac Ingress Gateway \uc758\uc874\uc131\uc744 \uac00\uc9c0\uace0 \uc788\uace0 Envoy\uae30\ubc18 Service Mesh\uc778 ",(0,a.kt)("inlineCode",{parentName:"p"},"Istio"),", Envoy\uae30\ubc18 API Gateway\uc778 ",(0,a.kt)("inlineCode",{parentName:"p"},"Gloo")," \ub450\uac00\uc9c0 \uc635\uc158\uc73c\ub85c Ingress \uad6c\ud604\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,a.kt)("h2",{id:"istio"},"Istio"),(0,a.kt)("p",null,"Knative\ub294 \uae30\ubcf8\uc801\uc73c\ub85c Ingress Gateway\uae30\ub2a5\uc744 \ud0d1\uc7ac\ud558\uace0 \uc788\ub294\ub370 \uc774\ub294 Istio\uc758 \uae30\ub2a5\uc911 \ud558\ub098\ub2e4.",(0,a.kt)("br",{parentName:"p"}),"\n","Istio\ub294 \ub2e4\uc74c\uacfc \uac19\uc740 Core Feature\ub97c \uac00\uc9c4\ub2e4. \uc0c1\uc138\ud55c \ub0b4\uc6a9\uc740 ",(0,a.kt)("a",{parentName:"p",href:"https://istio.io/docs/concepts/what-is-istio/"},"https://istio.io/docs/concepts/what-is-istio/")," \uc5d0\uc11c \ud655\uc778\ud558\uba74 \ub41c\ub2e4."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Traffic management"),(0,a.kt)("li",{parentName:"ul"},"Security"),(0,a.kt)("li",{parentName:"ul"},"Policies and Telemetry"),(0,a.kt)("li",{parentName:"ul"},"Performance and Scalability")),(0,a.kt)("p",null,"Istio\ub294 48\uac1c\uc758 ",(0,a.kt)("inlineCode",{parentName:"p"},"CRDs"),"(CustomResourceDefinition objects)\ub97c \uac00\uc9c0\uace0 \uc788\ub294\ub370 \uc774\uc911 Knative Serving\uc5d0\uc11c \uc0ac\uc6a9\ud558\ub294\uac74 ",(0,a.kt)("inlineCode",{parentName:"p"},"VirtualService")," \ub2e8 \ud558\ub098\ub2e4."),(0,a.kt)("h2",{id:"gloo"},"Gloo"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://gloo.solo.io/"},"Gloo"),"\ub294 Kubernetes-native ingress controller\uc774\uc790 ",(0,a.kt)("a",{parentName:"p",href:"https://medium.com/solo-io/announcing-gloo-the-function-gateway-3f0860ef6600"},"Next Generation API Gateway")," \ub97c \uc704\ud574 \uc2dc\uc791\ub41c \ud504\ub85c\uc81d\ud2b8\uc774\ub2e4. \uc2e4\uc81c Redhat\uc5d0\uc11c Openshift\uae30\ubc18 Microservice \ubc0f Istio \uac1c\ubc1c\uc5c5\ubb34\ub97c \ud558\ub2e4\uac00 \ucd5c\uadfc\uc5d0 solo.io\uc758 CTO\ub85c \uc774\uc9c1\ud55c ",(0,a.kt)("a",{parentName:"p",href:"https://blog.christianposta.com/"},"Christian Posta"),"\uac00 \ubc00\uace0 \uc788\ub294 \ud504\ub85c\uc81d\ud2b8\uc774\uae30\ub3c4 \ud558\ub2e4. "),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn-images-1.medium.com/max/1600/0*Z0Jb5DJFOyeY91sN.",alt:"gloo"})),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Gloo"),"\ub294 Envoy Proxy \uae30\ubc18\uc73c\ub85c \ub3d9\uc791\ud558\uba70\n\uae30\uc874 Legacy\ubd80\ud130 Container\uc11c\ube44\uc2a4, FaaS(AWS Lambda, Azure Functions, GCP Functions)\uc601\uc5ed\uc758 Application\ub4e4\uc744 REST, gRPC, SOAP, Web Socker\uae30\ubc18\uc73c\ub85c Aggregate \ud574\uc11c Function \uae30\ubc18 \ucd94\uc0c1\ud654\ub97c \uad6c\ud604\ud574 \uc8fc\ub294 \uc624\ud508\uc18c\uc2a4 \ud504\ub85c\uc81d\ud2b8\ub77c \uc815\uc758 \ud560 \uc218 \uc788\ub2e4. "),(0,a.kt)("p",null,"Istio\uc758 Ingress\uae30\ub2a5\uc678\uc758 \uc5ec\ub7ec\uac00\uc9c0 \ubd80\uac00 \uae30\ub2a5(Telemetry, Security, Policy Enforcement)\ub4e4\uc740 Knative\uc5d0\uc11c\ub294 \ud544\uc694\ub85c \ud558\uc9c0 \uc54a\ub294\ub2e4. "),(0,a.kt)("p",null,"Knative API Gateway \ub85c\uc11c Istio\uac00 \uc544\ub2cc Gloo\uac00 \uc870\uae08\ub354 \uacbd\ub7c9\ud654\ub41c \ub300\uc548\uc73c\ub85c \uacb0\uc815\ub418\uc5c8\uace0 Gloo\ub97c \ud1b5\ud574 Knative \uc124\uce58\uac00 \uac00\ub2a5\ud558\uac8c \ub418\uc5c8\ub2e4. \ub2e8, Knative Eventing \ucef4\ud3ec\ub10c\ud2b8\ub294 \ud604\uc7ac \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294\ub2e4\uace0 \ud55c\ub2e4. "),(0,a.kt)("h2",{id:"install-knative-with-gloo"},"Install Knative with Gloo"),(0,a.kt)("p",null,"\ucc38\uace0: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/knative/docs/blob/master/install/Knative-with-Gloo.md"},"Install with Gloo")),(0,a.kt)("p",null,"\uac04\ub2e8\ud558\uac8c gloo\uc640 Knative \uc124\uce58\ub97c \ud574\ubcf4\uc790."),(0,a.kt)("h3",{id:"requirements"},"Requirements"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Kubernetes cluster v1.11 or newer "),(0,a.kt)("li",{parentName:"ul"},"Enable ",(0,a.kt)("a",{parentName:"li",href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#how-do-i-turn-on-an-admission-controller"},"MutatingAdmissionWebhook admission controller")),(0,a.kt)("li",{parentName:"ul"},"kubectl v1.10 or newer"),(0,a.kt)("li",{parentName:"ul"},"Bash in Mac or Linux")),(0,a.kt)("h3",{id:"install-glooctl"},"Install Glooctl"),(0,a.kt)("p",null,"gloo CLI (glooctl) Download",(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/solo-io/gloo/releases"},"https://github.com/solo-io/gloo/releases")),(0,a.kt)("p",null,"\ub610\ub294 \uc9c1\uc811 Download"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ curl -sL https://run.solo.io/gloo/install | sh\nAttempting to download glooctl version v0.8.1\nDownloading glooctl-darwin-amd64...\nDownload complete!, validating checksum...\nChecksum valid.\nGloo was successfully installed \ud83c\udf89\n\nAdd the gloo CLI to your path with:\n  export PATH=$HOME/.gloo/bin:$PATH\n\nNow run:\n  glooctl install gateway     # install gloo's function gateway functionality into the 'gloo-system' namespace\n  glooctl install ingress     # install very basic Kubernetes Ingress support with Gloo into namespace gloo-system\n  glooctl install knative     # install Knative serving with Gloo configured as the default cluster ingress\nPlease see visit the Gloo Installation guides for more:  https://gloo.solo.io/installation/\n")),(0,a.kt)("p",null,"PATH \ub4f1\ub85d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ export PATH=$HOME/.gloo/bin:$PATH\n")),(0,a.kt)("p",null,"gloo CLI \ud655\uc778"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ glooctl --version\nglooctl version 0.8.1\n")),(0,a.kt)("p",null,"GCP \ubb34\ub8cc\ud50c\ub79c\uc73c\ub85c 3-node \ud074\ub7ec\uc2a4\ud130\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ gcloud container clusters create gloo \\\n  --region=asia-east1-a \\\n  --cluster-version=latest \\\n  --machine-type=n1-standard-2 \\\n  --enable-autorepair \\\n  --num-nodes=3\n")),(0,a.kt)("p",null,"cluster \uc0dd\uc131\ub41c\uac83\uc744 \ud655\uc778\ud558\uace0 cluster-admin \uad8c\ud55c\uc744 \ud560\ub2f9\ud55c\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ kubectl get nodes\nNAME                                  STATUS    ROLES     AGE       VERSION\ngke-gloo-default-pool-f6bcc479-f8v9   Ready     <none>    9m        v1.11.7-gke.6\ngke-gloo-default-pool-f6bcc479-fl78   Ready     <none>    9m        v1.11.7-gke.6\ngke-gloo-default-pool-f6bcc479-gfgw   Ready     <none>    9m        v1.11.7-gke.6\n\n$ kubectl create clusterrolebinding cluster-admin-binding \\\n>   --clusterrole=cluster-admin \\\n>   --user=$(gcloud config get-value core/account)\nYour active configuration is: [cloudshell-25974]\nclusterrolebinding.rbac.authorization.k8s.io "cluster-admin-binding" created\n')),(0,a.kt)("p",null,"Gloo\uc640 Knative \uc124\uce58\ub97c \ud55c\ub2e4. \ubbf8\ub9ac ",(0,a.kt)("inlineCode",{parentName:"p"},"glooctl install knative --dry-run")," \uc73c\ub85c \uc804\uccb4 manifest\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ glooctl install knative\n")),(0,a.kt)("p",null,"\uc704\uc5d0\uc11c \uc124\uce58 \uacfc\uc815\uc740 \uc0dd\ub7b5\ud588\uc9c0\ub9cc Istio\uc5d0 \ube44\ud574 CRD \uac1c\uc218\uac00 \uc801\uc740 \uac83\uc744 \uc54c\uc218\uc788\ub2e4. \ub610\ud55c \uc124\uce58\ub41c \ucef4\ud3ec\ub10c\ud2b8 \uc5ed\uc2dc Istio\uc5d0 \ube44\ud574\uc11c \uac04\uc18c\ud654\ub41c \uac83\uc744 \uc54c\uc218 \uc788\ub2e4. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ kubectl get pods --namespace gloo-system                                                                                         \nNAME                                   READY     STATUS    RESTARTS   AGE\nclusteringress-proxy-59fd6fb56-dmwwm   1/1       Running   0          7m\ndiscovery-779884d4cc-xlql2             1/1       Running   6          7m\ngloo-844fc79445-f4zvg                  1/1       Running   6          7m\ningress-7d75c99874-s4m76               1/1       Running   6          7m\n\n$ kubectl get pods --namespace knative-serving\nNAME                          READY     STATUS    RESTARTS   AGE\nactivator-746f6bb684-49tfh    1/1       Running   0          12m\nautoscaler-955f679cd-tx5vw    1/1       Running   0          12m\ncontroller-7fc84c6584-jbn69   1/1       Running   0          12m\nwebhook-7797ffb6bf-6pgsw      1/1       Running   0          12m\n")),(0,a.kt)("p",null,"\uc774\uc804 \ud3ec\uc2a4\ud305\uc5d0\uc11c\ub3c4 \uc0ac\uc6a9\ud588\ub358 ",(0,a.kt)("inlineCode",{parentName:"p"},"gcr.io/knative-sample/helloworld-go")," \uc774\ubbf8\uc9c0\ub97c \ud65c\uc6a9\ud558\uc5ec \uc0d8\ud50c\uc571 Knative Service\ub97c \ub9cc\ub4e0\ub2e4."),(0,a.kt)("h4",{id:"serviceyaml"},"service.yaml"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ vi service.yaml\n\napiVersion: serving.knative.dev/v1alpha1\nkind: Service\nmetadata:\n  name: helloworld-go\n  namespace: default\nspec:\n  runLatest:\n    configuration:\n      revisionTemplate:\n        spec:\n          container:\n            image: gcr.io/knative-sample/helloworld-go\n            env:\n              - name: TARGET\n                value: "Go Sample v1"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ kubectl apply --filename service.yaml\nservice.serving.knative.dev "helloworld-go" created\n')),(0,a.kt)("p",null,"\uc55e\uc5d0\uc11c\ub3c4 \uc124\uba85\ud588\uc9c0\ub9cc ",(0,a.kt)("inlineCode",{parentName:"p"},"Automatic scaling up and down to zero")," \uc73c\ub85c Cold Start\uac00 \ub418\uace0 \uc7a0\uc2dc\ud6c4\uc5d0 \uc544\ub798\uc640 \uac19\uc774 Knative Service\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ kubectl get ksvc helloworld-go -n default  --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain]($ kubectl get ksvc helloworld-go -n default  --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.d\nomain\nNAME            DOMAIN\nhelloworld-go   helloworld-go.default.example.com\n")),(0,a.kt)("p",null,"Gloo Ingress\ub97c \ud655\uc778\ud55c\ub2e4. GKE\uc5d0\uc11c \uc124\uce58\ud588\uae30 \ub54c\ubb38\uc5d0 \uc790\ub3d9\uc73c\ub85c LoadBalancer\uac00 \uc5f0\ub3d9\ub418\uc5b4 \uc788\ub294\uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ kubectl get svc -n gloo-system\nNAME                   TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE\nclusteringress-proxy   LoadBalancer   10.3.244.54    34.**.**.54   80:30978/TCP,443:32448/TCP   39m\ngloo                   ClusterIP      10.3.243.231   <none>        9977/TCP                     39m\n\n$ glooctl proxy url --name clusteringress-proxy\nhttp://34.**.**.54:80\n")),(0,a.kt)("p",null,"\uc704\uc5d0\uc11c \uc5bb\uc740 \ub450\uac00\uc9c0 \uc815\ubcf4\ub85c \uc0dd\uc131\ub41c app\uc744 \ud14c\uc2a4\ud2b8\ud55c\ub2e4. Cold Start(default timeout 5\ubd84) \ub54c\ubb38\uc5d0 \uc751\ub2f5\uc774 \ub2a6\uc5b4\uc9c8 \uc218\ub3c4 \uc788\uc9c0\ub9cc \uc7a0\uc2dc \uae30\ub2e4\ub9ac\uba74 \uc751\ub2f5\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ curl -H "Host: helloworld-go.default.example.com" http://34.**.**.54:80\nHello Go Sample v1!\n')),(0,a.kt)("p",null,"\ubb3c\ub860 ",(0,a.kt)("inlineCode",{parentName:"p"},"Revision"),"\uc774\ub098 ",(0,a.kt)("inlineCode",{parentName:"p"},"Route"),"\ub97c \ud65c\uc6a9\ud558\uc5ec Knative\uc758 \uae30\ub2a5\uc5d0 \ub300\ud574\uc11c\ub3c4 \ud655\uc778\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,a.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,a.kt)("p",null,"Gloo\ub294 Knative ClusterIngress CRD\ub97c \uae30\ubc18\uc73c\ub85c \ub3d9\uc791\ud558\ub294 Istio\uc758 \ub300\uc548\uc73c\ub85c\uc11c \uac00\ub2a5\uc131\uc744 \ubcf4\uc5ec\uc8fc\uace0 \uc788\ub2e4. \uc774\uc678\uc5d0\ub3c4 The Service Mesh Orchestration Platform ",(0,a.kt)("inlineCode",{parentName:"p"},"SuperGloo"),", Debugger for microservices ",(0,a.kt)("inlineCode",{parentName:"p"},"Squash")," \ub4f1 \ub2e4\uc591\ud55c Mesh Layer\uae30\ubc18\uc758 \uc624\ud508\uc18c\uc2a4\ub4e4\uc744 \ud655\uc778\ud560\uc218 \uc788\ub2e4. \ub610\ub2e4\ub978 \uc2a4\uccd0\uc9c0\ub098\uac08\uc218\ub3c4 \uc788\ub294 \uc624\ud508\uc18c\uc2a4\uc77c\uc218\ub3c4 \uc788\uaca0\uc9c0\ub9cc \ud604\uc7ac \uac1c\ubc1c\ub418\ub294 \ub85c\ub4dc\ub9f5(",(0,a.kt)("a",{parentName:"p",href:"https://www.solo.io/)%EC%9D%84"},"https://www.solo.io/)\uc744")," \ubcf4\uba74 Knative\uac00 \uace0\ub3c4\ud654\ub418\ub294 \uc5ec\uc815\uc5d0 \uac19\uc774 \uac00\ub294 \ubaa8\uc2b5\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,a.kt)("p",null,"next-generation API Gateway\ub85c\uc11c \ub2e4\uc591\ud55c \ud504\ub85c\ud1a0\ucf5c\uc744 \uc9c0\uc6d0\ud558\uae30 \ub54c\ubb38\uc5d0 (HTTP1, HTTP2, gRPC, REST/OpenAPISpec, SOAP, WebSockets, Lambda/Cloud Functions) \ub354\uc6b1\ub354 Microservices \ubc0f Serverless Workload\ub97c \uc218\ud589\ud558\uae30\uc5d0 \ub354\uc6b1 \uc801\ud569\ud55c \uc624\ud508\uc18c\uc2a4\ub85c \ubcf4\uc778\ub2e4. "),(0,a.kt)("h2",{id:"\ub2e4\uc74c-\uc8fc\uc81c"},"\ub2e4\uc74c \uc8fc\uc81c"),(0,a.kt)("p",null,"\ud604\uc7ac \ud574\ubcf4\uace0 \uc2f6\uc740\uac83\uc740 \ubca0\uc5b4\uba54\ud0c8 Kubernetes Cluster\uae30\ubc18 BGP\ub85c \ub3d9\uc791\ud558\ub294 ",(0,a.kt)("a",{parentName:"p",href:"https://metallb.universe.tf/"},"MetalLB"),"\ub098 ",(0,a.kt)("a",{parentName:"p",href:"https://cilium.io/try-eks/"},"Cillium on AWS")," \uc778\ub370 \uc2dc\uac04\ub098\ub294 \ub300\ub85c \ud14c\uc2a4\ud2b8 \ud574\ubd10\uc57c \uaca0\ub2e4."))}g.isMDXComponent=!0}}]);