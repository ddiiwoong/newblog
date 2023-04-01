"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[4034],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return c}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),p=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),k=p(a),c=r,h=k["".concat(i,".").concat(c)]||k[c]||m[c]||s;return a?n.createElement(h,o(o({ref:t},u),{},{components:a})):n.createElement(h,o({ref:t},u))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,o=new Array(s);o[0]=k;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<s;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},60997:function(e,t,a){a.r(t),a.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return c},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return m}});var n=a(87462),r=a(63366),s=(a(67294),a(3905)),o=["components"],l={layout:"single",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",comments:!0,classes:"wide",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/k6-prometheus/",date:new Date("2023-04-01T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","grafana","loadtest","prometheus","performance test","k6"]},i=void 0,p={permalink:"/kubernetes/k6-prometheus/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-04-01-k6-prometheus.md",source:"@site/blog/2023-04-01-k6-prometheus.md",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",date:"2023-04-01T00:00:00.000Z",formattedDate:"April 1, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"grafana",permalink:"/tags/grafana"},{label:"loadtest",permalink:"/tags/loadtest"},{label:"prometheus",permalink:"/tags/prometheus"},{label:"performance test",permalink:"/tags/performance-test"},{label:"k6",permalink:"/tags/k-6"}],readingTime:10.675,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",comments:!0,classes:"wide",description:"k6\uc73c\ub85c \uc9c4\ud589\ud55c \ubd80\ud558 \ud14c\uc2a4\ud2b8 \uacb0\uacfc\ub97c remote write \ud615\ud0dc\ub85c prometheus\uc5d0 \uc804\ub2ec\ud558\uace0 grafana \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf8\ub2e4.",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/k6-prometheus/",date:"2023-04-01T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","grafana","loadtest","prometheus","performance test","k6"]},nextItem:{title:"Advanced Argo Rollout",permalink:"/kubernetes/argo-rollout-advanced/"}},u={authorsImageUrls:[void 0]},m=[{value:"PKOS Study #4",id:"pkos-study-4",level:2},{value:"k6",id:"k6",level:2},{value:"Prometheus Stack",id:"prometheus-stack",level:2},{value:"k6-operator \uc124\uce58 \ubc0f \uad6c\uc131",id:"k6-operator-\uc124\uce58-\ubc0f-\uad6c\uc131",level:2},{value:"k6 \uc2a4\ud06c\ub9bd\ud2b8 \uc791\uc131",id:"k6-\uc2a4\ud06c\ub9bd\ud2b8-\uc791\uc131",level:2},{value:"k6 \uc2a4\ud06c\ub9bd\ud2b8 \ucee8\ud53c\uadf8\ub9f5 \uc0dd\uc131",id:"k6-\uc2a4\ud06c\ub9bd\ud2b8-\ucee8\ud53c\uadf8\ub9f5-\uc0dd\uc131",level:2},{value:"k6 prometheus \uc774\ubbf8\uc9c0 \ube4c\ub4dc",id:"k6-prometheus-\uc774\ubbf8\uc9c0-\ube4c\ub4dc",level:3},{value:"k6 \ub9ac\uc18c\uc2a4 \uc0dd\uc131",id:"k6-\ub9ac\uc18c\uc2a4-\uc0dd\uc131",level:2},{value:"Grafana \ub300\uc2dc\ubcf4\ub4dc \ub4f1\ub85d",id:"grafana-\ub300\uc2dc\ubcf4\ub4dc-\ub4f1\ub85d",level:2},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],k={toc:m};function c(e){var t=e.components,l=(0,r.Z)(e,o);return(0,s.kt)("wrapper",(0,n.Z)({},k,l,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"pkos-study-4"},"PKOS Study #4"),(0,s.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d (4+1)\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \ub124\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. '),(0,s.kt)("p",null,"\uc774\ubc88 \uc2a4\ud130\ub514 \uacfc\uc81c\uc5d0\uc11c\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc758 \ubd80\ud558 \ud14c\uc2a4\ud2b8\ub97c k6\ub97c \uc774\uc6a9\ud558\uc5ec \uc9c4\ud589\ud558\uace0 \uacb0\uacfc\ub97c prometheus \ubc0f grafana\ub85c \uc804\ub2ec\ud558\uc5ec \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc791\uc131\ud55c\ub2e4."),(0,s.kt)("h2",{id:"k6"},"k6"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/grafana/k6"},"https://github.com/grafana/k6")),(0,s.kt)("p",null,"k6\ub294 \uc624\ud508\uc18c\uc2a4 \ubd80\ud558\ud14c\uc2a4\ud2b8 \ub3c4\uad6c\ub85c, Go\uc640 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc774\uc6a9\ud574 \uc131\ub2a5 \ud14c\uc2a4\ud2b8\ub97c \ud560 \uc218 \uc788\ub294 \ub3c4\uad6c\uc774\ub2e4. k6\uc740 \ub2e4\uc591\ud55c \ud504\ub85c\ud1a0\ucf5c(HTTP, WebSocket \ub4f1)\uc744 \uc9c0\uc6d0\ud558\uba70, \uc124\uce58\uc640 \uc0ac\uc6a9\uc774 \ub9e4\uc6b0 \uac04\ud3b8\ud558\ub2e4. \uc774\uc804\uc5d0 k6 \ud14c\uc2a4\ud2b8\ub97c \uc791\uc131\ud574 \ubcf8 \uc801\uc774 \uc5c6\ub2e4\uba74 ",(0,s.kt)("a",{parentName:"p",href:"https://k6.io/docs/getting-started/running-k6"},"Running k6"),"\ub97c \ud655\uc778\ud558\uace0 \uc791\ub3d9 \ubc29\uc2dd\uc744 \ud30c\uc545\ud558\ub294 \uac83\ubd80\ud130 \uc2dc\uc791\ud558\ub294 \uac83\uc774 \uc88b\ub2e4. \ub610\ud55c, \uce5c\ucca0\ud558\uac8c \ud55c\uae00\ub85c \uc124\uba85\ub418\uc5b4 \uc788\ub294 tutorial \ub9c1\ud06c\ub3c4 \ucc38\uc870\ud55c\ub2e4."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/schooldevops/k6-tutorials/blob/main/GettingStarts/01_intro_install.md"},"https://github.com/schooldevops/k6-tutorials/blob/main/GettingStarts/01_intro_install.md")),(0,s.kt)("h2",{id:"prometheus-stack"},"Prometheus Stack"),(0,s.kt)("p",null,"\uc9c0\ub09c\ubc88 \uad6c\uc131\ud588\ub358 \uac83\ub3c4 \ub3d9\uc77c\ud558\uac8c kube-prometheus-stack\uc744 \uc124\uce58\ud55c\ub2e4. "),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack"},"kube-prometheus-stack"),"\uc740 Kubernetes \ud074\ub7ec\uc2a4\ud130 \ub0b4\uc5d0\uc11c Prometheus\uc640 Grafana\ub97c \uc0ac\uc6a9\ud558\uc5ec \ubaa8\ub2c8\ud130\ub9c1\uc744 \uad6c\uc131\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\ub294 \ud3b8\ub9ac\ud55c \ucc28\ud2b8\uc774\ub2e4. "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts\n\n$ helm install -n monitoring kube-prometheus-stack prometheus-community/kube-prometheus-stack\n")),(0,s.kt)("p",null,"Prometheus remote write \ucd9c\ub825\uc744 \ud1b5\ud574 k6\ub294 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \uba54\ud2b8\ub9ad\uc744 Prometheus remote write \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub85c \uc804\uc1a1\ud560 \uc218 \uc788\ub2e4. \ub4a4\uc5d0 \uc9c4\ud589\ud560 k6\uc5d0\uc11c Prometheus \ucabd\uc73c\ub85c \uba54\ud2b8\ub9ad\uc744 \uc804\ub2ec\ud558\uae30 \uc704\ud574\uc11c\ub294 \ub450\uac00\uc9c0 \uae30\ub2a5(flag)\uc778 ",(0,s.kt)("a",{parentName:"p",href:"https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver"},"Remote Write Receiver"),"\uc640 ",(0,s.kt)("a",{parentName:"p",href:"https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms"},"Native Histograms"),"\uc744 \ud65c\uc131\ud654 \ud574\uc57c\ud55c\ub2e4."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver"},"Remote Write Receiver"),": remote write \ud65c\uc131\ud654"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms"},"Native Histograms"),": \uace0\ud574\uc0c1\ub3c4 \ud788\uc2a4\ud1a0\uadf8\ub7a8\uc744 \uc704\ud55c \uae30\ub2a5 \ud65c\uc131\ud654 (experimental)")),(0,s.kt)("p",null,"\ub450\uac00\uc9c0 flag\ub97c \ud65c\uc131\ud654 \ud558\uae30 \uc704\ud574 \uc704\uc5d0 \uc124\uce58\ud55c ",(0,s.kt)("inlineCode",{parentName:"p"},"kube-prometheus-stack")," \ucc28\ud2b8\uc5d0 \uc704 \ub450\uac00\uc9c0 \uae30\ub2a5\uc744 \ucd94\uac00\ud558\uc5ec \ub2e4\uc2dc \ubc30\ud3ec\ud55c\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"prometheus:\n  serviceMonitor:\n    enableFeatures: \n    - remote-write-receiver\n    - native-histograms\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"$ helm upgrade -n monitoring kube-prometheus-stack prometheus-community/kube-prometheus-stack -f value.yaml\n")),(0,s.kt)("h2",{id:"k6-operator-\uc124\uce58-\ubc0f-\uad6c\uc131"},"k6-operator \uc124\uce58 \ubc0f \uad6c\uc131"),(0,s.kt)("p",null,"\ucfe0\ubc84\ub124\ud2f0\uc2a4\uc5d0\uc11c k6\ub97c \uad6c\uc131\ud558\ub294 \ubc29\ubc95\uc740 \uc9c1\uc811 k6 \ubc14\uc774\ub108\ub9ac\ub97c \ucee8\ud14c\uc774\ub108\ub85c \ube4c\ub4dc\ud574\uc11c \uc0ac\uc6a9\ud560 \uc218\ub3c4 \uc788\uace0 \ub2e8\uc77c \uc778\uc2a4\ud134\uc2a4\uc5d0\uc11c \uc2e4\ud589\ud558\ub294 \ubc29\ubc95\ub3c4 \uc788\uc9c0\ub9cc \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uae30\ubc18\uc73c\ub85c \ub3d9\uc791\ud558\uace0 \uc5ec\ub7ec \uc778\uc2a4\ud134\uc2a4\uc5d0\uc11c \ub3d9\uc2dc\uc5d0 \ubd80\ud558 \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud558\ub824\ub294 \uc694\uad6c\uc0ac\ud56d\uc774 \uc788\uc744 \uacbd\uc6b0\uc5d0\ub294 k6-operator \ub85c \uad6c\uc131\ud558\ub294 \uac83\uc744 \ucd94\ucc9c\ud55c\ub2e4."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/grafana/k6-operator"},"https://github.com/grafana/k6-operator")),(0,s.kt)("p",null,"\uae30\ubcf8\uc801\uc73c\ub85c \ubc14\uc774\ub108\ub9ac \ubc0f \ud50c\ub7ec\uadf8\uc778 \ube4c\ub4dc\ub97c \ud558\uace0 \ubc30\ud3ec\ud558\ub294 \ud615\ud0dc\ub97c \ucde8\ud558\ub2e4 \ubcf4\ub2c8 ",(0,s.kt)("a",{parentName:"p",href:"https://golang.org/doc/install"},(0,s.kt)("inlineCode",{parentName:"a"},"Go")),", ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/kustomize/"},(0,s.kt)("inlineCode",{parentName:"a"},"Kustomize")),", ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/"},(0,s.kt)("inlineCode",{parentName:"a"},"Kubectl")),", ",(0,s.kt)("inlineCode",{parentName:"p"},"Make")," \ub4f1\uc774 \uc124\uce58\ub418\uc5b4 \uc788\uc5b4\uc57c \ud55c\ub2e4. "),(0,s.kt)("p",null,"\uc124\uce58 \uba85\ub839\uc740 ",(0,s.kt)("inlineCode",{parentName:"p"},"MacOs")," \uae30\uc900\uc73c\ub85c \uc124\uba85\ud55c\ub2e4. \uc77c\ub2e8 \ub808\ud3ec\uc9c0\ud1a0\ub9ac\ub97c \ub85c\uceec\ub85c \uac00\uc838\uc624\uace0 \ub098\uc11c ",(0,s.kt)("inlineCode",{parentName:"p"},"make deploy")," \uba85\ub839\uc744 \uc218\ud589\ud558\uba74 operator \uad6c\uc131\uc774 \uc644\ub8cc\ub41c\ub2e4. "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"$ git clone https://github.com/grafana/k6-operator && cd k6-operator\n$ make deploy\n")),(0,s.kt)("h2",{id:"k6-\uc2a4\ud06c\ub9bd\ud2b8-\uc791\uc131"},"k6 \uc2a4\ud06c\ub9bd\ud2b8 \uc791\uc131"),(0,s.kt)("p",null,"\uc544\uc9c1 \ud14c\uc2a4\ud2b8 \uc778\uc2a4\ud134\uc2a4 \uad6c\uc131\uc774 \ub418\uc5b4 \uc788\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \ud14c\uc2a4\ud2b8\ub97c \uccab \ub2e8\uacc4 \uc9c4\ud589\ud560 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc791\uc131\ud55c\ub2e4.  "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { check } from 'k6';\n\nexport const options = {\n  stages: [\n    { target: 200, duration: '30s' },\n    { target: 0, duration: '30s' },\n  ],\n};\n\nexport default function () {\n  const result = http.get('https://test-api.k6.io/public/crocodiles/');\n  check(result, {\n    'http response status code is 200': result.status === 200,\n  });\n}\n")),(0,s.kt)("p",null,"\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc0b4\ud3b4\ubcf4\uba74\uc11c \uac01\uac01 30\ucd08 \ub3d9\uc548 \uc2e4\ud589\ub418\ub294 \ub450 \ub2e8\uacc4\ub97c \uc124\uc815\ud588\ub2e4. \uccab \ubc88\uc9f8 \ub2e8\uacc4\ub294 30\ucd08 \ub3d9\uc548 200 virtual users(\uc774\ud558 VUs)\uae4c\uc9c0 \uc120\ud615\uc801\uc73c\ub85c \uc99d\uac00\uc2dc\ud0a8\ub2e4. \ub450 \ubc88\uc9f8 \ub2e8\uacc4\uc5d0\uc11c\ub294 30\ucd08\uc5d0 \uac78\uccd0 \ub2e4\uc2dc VUs\ub97c 0\uc73c\ub85c \uac10\uc18c\uc2dc\ud0a8\ub2e4. function() \uc5d0\uc11c\ub294 \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud560 URL\uc5d0 \ub300\ud574 HTTP GET \uc694\uccad\uc744 \uc2e4\ud589\ud558\uace0 HTTP \uc0c1\ud0dc 200\uc73c\ub85c \uc751\ub2f5\ud558\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"k6 run scripts.js\n\n          /\\      |\u203e\u203e| /\u203e\u203e/   /\u203e\u203e/\n     /\\  /  \\     |  |/  /   /  /\n    /  \\/    \\    |     (   /   \u203e\u203e\\\n   /          \\   |  |\\  \\ |  (\u203e)  |\n  / __________ \\  |__| \\__\\ \\_____/ .io\n\n  execution: local\n     script: scripts.js\n     output: -\n\n  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m30s max duration (incl. graceful stop):\n           * default: Up to 200 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)\n\n\n     \u2713 http response status code is 200\n\n     checks.........................: 100.00% \u2713 2893      \u2717 0\n     data_received..................: 3.5 MB  58 kB/s\n     data_sent......................: 416 kB  6.9 kB/s\n     http_req_blocked...............: avg=49.33ms min=1\xb5s      med=3\xb5s   max=3.45s    p(90)=16\xb5s    p(95)=377.18ms\n     http_req_connecting............: avg=13.09ms min=0s       med=0s    max=199.77ms p(90)=0s      p(95)=186.36ms\n     http_req_duration..............: avg=2.14s   min=190.5ms  med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s\n       { expected_response:true }...: avg=2.14s   min=190.5ms  med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s\n     http_req_failed................: 0.00%   \u2713 0         \u2717 2893\n     http_req_receiving.............: avg=81.97\xb5s min=19\xb5s     med=61\xb5s  max=2.43ms   p(90)=141.8\xb5s p(95)=205.4\xb5s\n     http_req_sending...............: avg=22.37\xb5s min=5\xb5s      med=16\xb5s  max=687\xb5s    p(90)=38\xb5s    p(95)=57\xb5s\n     http_req_tls_handshaking.......: avg=36.2ms  min=0s       med=0s    max=3.2s     p(90)=0s      p(95)=190.18ms\n     http_req_waiting...............: avg=2.14s   min=190.38ms med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s\n     http_reqs......................: 2893    48.176768/s\n     iteration_duration.............: avg=2.19s   min=190.7ms  med=1.39s max=6.05s    p(90)=5.4s    p(95)=5.58s\n     iterations.....................: 2893    48.176768/s\n     vus............................: 1       min=1       max=200\n     vus_max........................: 200     min=200     max=200\n\n\nrunning (1m00.0s), 000/200 VUs, 2893 complete and 0 interrupted iterations\ndefault \u2713 [======================================] 000/200 VUs  1m0s\n")),(0,s.kt)("h2",{id:"k6-\uc2a4\ud06c\ub9bd\ud2b8-\ucee8\ud53c\uadf8\ub9f5-\uc0dd\uc131"},"k6 \uc2a4\ud06c\ub9bd\ud2b8 \ucee8\ud53c\uadf8\ub9f5 \uc0dd\uc131"),(0,s.kt)("p",null,"\ud14c\uc2a4\ud2b8 \uc2a4\ud06c\ub9bd\ud2b8\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc644\ub8cc\ub418\uc5c8\ub294 \ud655\uc778\ud55c \ub4a4 \ucfe0\ubc84\ub124\ud2f0\uc2a4 \ud074\ub7ec\uc2a4\ud130\uc5d0 \uba3c\uc800 \ucee8\ud53c\uadf8\ub9f5\uc744 \uc0dd\uc131\ud55c\ub2e4. \uc774\ub984\uc740 \uc774\ud6c4 k6 runner \ud30c\ub4dc\uc5d0\uc11c \uc0ac\uc6a9\ud558\ub294 \ucee8\ud53c\uadf8\ub9f5\uc744 \ucc38\uc870\ud558\ub3c4\ub85d \uc2dd\ubcc4\ud560 \uc218 \uc788\ub294 \uac12(\uc608\uc2dc\uc5d0\uc11c\ub294 ",(0,s.kt)("inlineCode",{parentName:"p"},"test-script"),")\uc73c\ub85c \uc9c0\uc815\ud55c\ub2e4. "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl create configmap test-script --from-file /home/ec2-user/environment/k6/scritps.js \nconfigmap/test-script created\n")),(0,s.kt)("h3",{id:"k6-prometheus-\uc774\ubbf8\uc9c0-\ube4c\ub4dc"},"k6 prometheus \uc774\ubbf8\uc9c0 \ube4c\ub4dc"),(0,s.kt)("p",null,"\uae30\ubcf8\uc801\uc73c\ub85c k6-operator\ub294 \ud14c\uc2a4\ud2b8 \uc791\uc5c5\uc758 \ucee8\ud14c\uc774\ub108 \uc774\ubbf8\uc9c0\ub85c ",(0,s.kt)("inlineCode",{parentName:"p"},"grafana/k6:latest"),"\ub97c \uc0ac\uc6a9\ud55c\ub2e4. xk6\ub85c \ube4c\ub4dc\ub41c \ud655\uc7a5\uc744 \uc0ac\uc6a9\ud558\ub824\uba74 \uc790\uccb4 \uc774\ubbf8\uc9c0\ub97c \uc0dd\uc131\ud558\uace0 k6 \ucfe0\ubc84\ub124\ud2f0\uc2a4 \ubc30\ud3ec \ub9ac\uc18c\uc2a4\uc5d0\uc11c \uc774\ubbf8\uc9c0 \uc18d\uc131\uc744 \ubc14\uafd4\uc11c \ubc30\ud3ec\ud574\uc57c \ud55c\ub2e4. \ub2e4\uc74c Dockerfile\uc744 \uc0ac\uc6a9\ud558\uc5ec ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/grafana/xk6-output-prometheus-remote"},"https://github.com/grafana/xk6-output-prometheus-remote")," \ub85c \ube4c\ub4dc\ud55c \ucee8\ud14c\uc774\ub108 \uc774\ubbf8\uc9c0\ub97c \uc0dd\uc131\ud560 \uc218 \uc788\ub2e4."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-dockerfile"},"# Build the k6 binary with the extension\nFROM golang:1.18.1 as builder\n\nRUN go install go.k6.io/xk6/cmd/xk6@latest\nRUN xk6 build --output /k6 --with github.com/grafana/xk6-output-prometheus-remote@latest\n\n# Use the operator's base image and override the k6 binary\nFROM grafana/k6:latest\nCOPY --from=builder /k6 /usr/bin/k6\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ docker build -t k6-prometheus:v1 .\n")),(0,s.kt)("p",null,"\ube4c\ub4dc\ud55c \uc774\ubbf8\uc9c0\ub97c \uc6d0\ud558\ub294 \ub808\uc9c0\uc2a4\ud2b8\ub9ac\uc5d0 push\ud558\uace0 image \uacbd\ub85c\ub97c \uae30\ub85d\ud574 \ub193\ub294\ub2e4."),(0,s.kt)("h2",{id:"k6-\ub9ac\uc18c\uc2a4-\uc0dd\uc131"},"k6 \ub9ac\uc18c\uc2a4 \uc0dd\uc131"),(0,s.kt)("p",null,"\uc0dd\uc131\uc774 \ub418\uace0 \ub098\uba74 ",(0,s.kt)("inlineCode",{parentName:"p"},"k6")," \ucee4\uc2a4\ud140 \ub9ac\uc18c\uc2a4(CRD)\ub97c \ub3d9\uc77c\ud55c \ub124\uc784\uc2a4\ud398\uc774\uc2a4\uc5d0 \ub9cc\ub4e0\ub2e4. \ubd80\ud558 \ud14c\uc2a4\ud2b8\uc5d0 \ud544\uc694\ud55c \ub0b4\uc6a9\ub4e4\uc744 \ud3ec\ud568\ud558\uace0 \uc788\ub2e4."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"arguments: -o xk6-prometheus-rw --tag testid=alb"),(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"Prometheus\uc758 \uc2e4\ud589\uc778\uc790\ub85c \uc704\uc5d0\uc11c \ube4c\ub4dc\ud55c \uc774\ubbf8\uc9c0\uc758 \uc635\uc158 \uac12, ",(0,s.kt)("inlineCode",{parentName:"li"},"tag"),"\uc758 \uacbd\uc6b0 \uadf8\ub77c\ud30c\ub098 \ub300\uc2dc\ubcf4\ub4dc\uc5d0 \uad6c\ubd84\uc790\ub85c \uc0ac\uc6a9\ud560 \uac12"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"K6_PROMETHEUS_RW_SERVER_URL"),(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"remote write endpoint\ub85c \uc704\uc5d0 \uad6c\uc131\ud55c prometheus endpoint\ub97c \uae30\uc7ac"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM"),(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"\uace0\ud574\uc0c1\ub3c4 \ud788\uc2a4\ud1a0\uadf8\ub7a8 \ud615\ud0dc\uc758 \ub370\uc774\ud130\ub97c \ubcf4\ub0b4\uae30 \uc704\ud55c \ud658\uacbd \ubcc0\uc218 \uac12 (\uae30\ubcf8\uac12: false)"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"image: k6-prometheus:v1"),(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"\uc704\uc5d0\uc11c \ube4c\ub4dc\ud55c Prometheus remote write \uae30\ub2a5\uc774 \ud3ec\ud568\ub41c \uc774\ubbf8\uc9c0 \ub808\uc9c0\uc2a4\ud2b8\ub9ac \uacbd\ub85c\ub97c \uc785\ub825"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"configMap"),(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"\ucee8\ud53c\uadf8\ub9f5\uc73c\ub85c \ub4f1\ub85d\ud55c \ubd80\ud558 \uc2a4\ud06c\ub9bd\ud2b8")))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: k6.io/v1alpha1\nkind: K6\nmetadata:\n  name: k6-sample\nspec:\n  arguments: -o xk6-prometheus-rw --tag testid=test\n  parallelism: 1\n  runner:\n    env:\n    - name: K6_PROMETHEUS_RW_SERVER_URL\n      value: http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/write\n    - name: K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM\n      value: "true"\n    image: k6-prometheus:v1\n  script:\n    configMap:\n      file: scritps.js\n      name: test-script\n')),(0,s.kt)("p",null,"\ud074\ub7ec\uc2a4\ud130\uc5d0\uc11c \ub450 \uac1c \uc774\uc0c1\uc758 \ud14c\uc2a4\ud2b8 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc0ac\uc6a9\ud558\ub824\uba74 \uac01 \uc2a4\ud06c\ub9bd\ud2b8\uc5d0 \ub300\ud574 \uc774 \ud504\ub85c\uc138\uc2a4\ub97c \ubc18\ubcf5\ud558\uc5ec \ub9f5\uc5d0 \ub2e4\ub978 \uc774\ub984\uc744 \uc9c0\uc815\ud558\uba74 \ub41c\ub2e4. k6 \ub9ac\uc18c\uc2a4\ub97c \ubc30\ud3ec\ud558\uac8c \ub418\uba74 \uc774\uc81c\ubd80\ud130 \ubc30\ud3ec \ud14c\uc2a4\ud2b8 \uacb0\uacfc \uba54\ud2b8\ub9ad \uac12\uc774 \ud504\ub85c\uba54\ud14c\uc6b0\uc2a4\ub85c \ubc14\ub85c \uc804\ub2ec\uc774 \ub41c\ub2e4.  "),(0,s.kt)("h2",{id:"grafana-\ub300\uc2dc\ubcf4\ub4dc-\ub4f1\ub85d"},"Grafana \ub300\uc2dc\ubcf4\ub4dc \ub4f1\ub85d"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/dashboards/18030-test-result/"},(0,s.kt)("inlineCode",{parentName:"a"},"18030")," grafana \ub300\uc2dc\ubcf4\ub4dc"),"\ub97c import \ud558\uba74 \ub2e4\uc74c \uadf8\ub9bc\uacfc \uac19\uc740 \ub300\uc2dc\ubcf4\ub4dc\ub97c \ud1b5\ud574 \ud604\uc7ac \ub9ac\ud018\uc2a4\ud2b8 \ud604\ud669(\uc131\uacf5, \uc2e4\ud328), \uc9c0\uc5f0\uc2dc\uac04, \ub370\uc774\ud130 \uc804\uc1a1\ub7c9, VUs \ub4f1\uc744 \ucd5c\ub300 \ud504\ub85c\uba54\ud14c\uc6b0\uc2a4\uac00 \uc218\uc9d1 \ucd5c\ub300 \uc8fc\uae30 \uae30\uc900\uc758 \uc900 \uc2e4\uc2dc\uac04 \uc218\uc900\uc73c\ub85c \ud655\uc778\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"dashboard",src:a(85049).Z,width:"850",height:"646"})),(0,s.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,s.kt)("p",null,"\uc774\ubc88 4\uc8fc\ucc28 \uc2a4\ud130\ub514\uc5d0\ub294 Grafana\uac00 \ud3ec\ud568\ub41c Prometheus Stack\uc5d0 k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \uba54\ud2b8\ub9ad\uc744 \uc804\ub2ec\ud558\uace0, \ub300\uc2dc\ubcf4\ub4dc\ub85c \ud655\uc778\ud558\ub294 \ubc29\ubc95\uc744 \uc815\ub9ac\ud588\ub2e4. \uc774\ubc88 \uae00\uc5d0\uc11c\ub294 \ub2e4\ub8e8\uc9c0 \uc54a\uc558\uc9c0\ub9cc k6\ub294 \ube0c\ub77c\uc6b0\uc800\uc5d0 \ub179\ud654\ub41c \uc2a4\ud06c\ub9bd\ud2b8 \uae30\ubc18\uc73c\ub85c \ud14c\uc2a4\ud2b8\uac00 \uac00\ub2a5\ud558\uae30 \ub54c\ubb38\uc5d0 \ub2e4\uc591\ud55c \uc2dc\ub098\ub9ac\uc624\ub85c \ud14c\uc2a4\ud2b8\ub97c \ub9cc\uc871\uc2a4\ub7fd\uac8c \uc9c4\ud589\ud560 \uc218 \uc788\uc5c8\ub2e4. locust\ub77c\ub294 \uac15\ub825\ud55c \uc624\ud508\uc18c\uc2a4 \uae30\ubc18 \ubd80\ud558 \ud14c\uc2a4\ud2b8 \ub3c4\uad6c\ub3c4 \uc788\uc9c0\ub9cc \uc774\ubc88 \uae00\uacfc \uac19\uc774 \ub2e4\uc591\ud55c \ud50c\ub7ec\uadf8\uc778\uc744 \uc9c1\uc811 \ube4c\ub4dc\ud558\uace0 \uc5f0\ub3d9\ud558\uc5ec \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4\ub294 \uc810\uc774 \uc870\uae08 \ub354 \ub9e4\ub825\uc801\uc73c\ub85c \ub2e4\uac00\uc654\ub2e4. "),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")))}c.isMDXComponent=!0},85049:function(e,t,a){t.Z=a.p+"assets/images/k6-dashboard-31d848ca448fdfe6bb2f6e37338ebce1.png"}}]);