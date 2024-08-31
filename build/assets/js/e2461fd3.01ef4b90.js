"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[8791],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return m}});var a=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(t),m=o,k=c["".concat(i,".").concat(m)]||c[m]||u[m]||r;return t?a.createElement(k,s(s({ref:n},d),{},{components:t})):a.createElement(k,s({ref:n},d))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,s=new Array(r);s[0]=c;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var p=2;p<r;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},99431:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var a=t(87462),o=t(63366),r=(t(67294),t(3905)),s=["components"],l={layout:"single",title:"kOps with Cilium",comments:!0,classes:"wide",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cilium/",date:new Date("2023-03-18T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","CNI","Networking","Cilium"]},i=void 0,p={permalink:"/kubernetes/kops-cilium/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-03-18-kops-cillium.md",source:"@site/blog/2023-03-18-kops-cillium.md",title:"kOps with Cilium",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",date:"2023-03-18T00:00:00.000Z",formattedDate:"March 18, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"kOps",permalink:"/tags/k-ops"},{label:"Cloud9",permalink:"/tags/cloud-9"},{label:"CloudFormation",permalink:"/tags/cloud-formation"},{label:"CNI",permalink:"/tags/cni"},{label:"Networking",permalink:"/tags/networking"},{label:"Cilium",permalink:"/tags/cilium"}],readingTime:11.97,truncated:!0,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"kOps with Cilium",comments:!0,classes:"wide",description:"Cilium CNI \uae30\ubc18 kOps \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cilium/",date:"2023-03-18T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","CNI","Networking","Cilium"]},prevItem:{title:"Advanced Argo Rollout",permalink:"/kubernetes/argo-rollout-advanced/"},nextItem:{title:"kOps with Cloud9",permalink:"/kubernetes/kops-cloud9/"}},d={authorsImageUrls:[void 0]},u=[{value:"PKOS Study #2",id:"pkos-study-2",level:2},{value:"kOps with Cloud9",id:"kops-with-cloud9",level:2},{value:"Cilium CNI \uae30\ubc18 kOps \ubc30\ud3ec",id:"cilium-cni-\uae30\ubc18-kops-\ubc30\ud3ec",level:2},{value:"CNI \ud14c\uc2a4\ud2b8",id:"cni-\ud14c\uc2a4\ud2b8",level:2},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],c={toc:u};function m(e){var n=e.components,t=(0,o.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"pkos-study-2"},"PKOS Study #2"),(0,r.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d (4+1)\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \ub450\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. '),(0,r.kt)("p",null,"\uc774\ubc88 \uc2a4\ud130\ub514 \uacfc\uc81c\uc5d0\uc11c\ub294 Cilium\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 kOps \ud074\ub7ec\uc2a4\ud130\ub97c \uc0dd\uc131\ud558\uace0 \ub124\ud2b8\uc6cc\ud06c \uad6c\uc131\uc774 \uc5b4\ub5bb\uac8c \ub418\ub294\uc9c0 \ud655\uc778\ud574\ubcf4\uace0\uc790 \ud55c\ub2e4. Cilium\ub294 Linux \ucee4\ub110 \ub0b4\uc5d0 \uac15\ub825\ud55c \ubcf4\uc548 \uac00\uc2dc\uc131 \ubc0f \uc81c\uc5b4 \ub85c\uc9c1\uc744 \ub3d9\uc801\uc73c\ub85c \uc0bd\uc785\ud560 \uc218 \uc788\ub294 BPF\ub77c\ub294 Linux \ucee4\ub110 \uae30\uc220\uc744 \uc0ac\uc6a9\ud558\ub294 CNI\uc774\ub2e4. "),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://cilium.io/"},"https://cilium.io/"),"\n",(0,r.kt)("a",{parentName:"p",href:"https://kops.sigs.k8s.io/networking/cilium/"},"https://kops.sigs.k8s.io/networking/cilium/")),(0,r.kt)("h2",{id:"kops-with-cloud9"},"kOps with Cloud9"),(0,r.kt)("p",null,"\uae00\uc744 \uc791\uc131\ud558\ub294 \ub0a0\uc9dc \uae30\uc900(23\ub144 3\uc6d4 18\uc77c), \ubc84\uc804\uc740 1.25.11 \uc73c\ub85c \uc9c4\ud589\uc744 \ud55c\ub2e4. \uc9c0\ub09c\ubc88 \uad6c\uc131\uacfc \ub3d9\uc77c\ud558\uac8c Bastion\uc740 Cloud9\uc5d0\uc11c \uad6c\uc131\uc744 \uc9c4\ud589\ud558\uc600\ub2e4. \uc9c0\ub09c\ubc88 \uc791\uc131\ud55c Cloud9 \uae30\ubc18 \uc778\uc2a4\ud134\uc2a4\ub294 \uc544\ub798 \ub9c1\ud06c\uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml"},"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml")),(0,r.kt)("h2",{id:"cilium-cni-\uae30\ubc18-kops-\ubc30\ud3ec"},"Cilium CNI \uae30\ubc18 kOps \ubc30\ud3ec"),(0,r.kt)("p",null,"Cloud9\uc774 \uad6c\uc131\ub418\uace0 \ub098\uba74 \ud574\ub2f9 \ud658\uacbd\uc5d0\uc11c \uae30\ubcf8 \uad6c\uc131\ud560 Cluster yaml\uc744 \uc791\uc131\ud55c\ub2e4. yaml\uc758 \ud06c\uae30 \ub54c\ubb38\uc5d0 \ubd80\ubd84\uc744 \ub098\ub220\uc11c \uc124\uba85\ud55c\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: kops.k8s.io/v1alpha2\nkind: Cluster\nmetadata:\n  creationTimestamp: null\n  name: prosv.kr\nspec:\n  kubeProxy:\n    enabled: false\n    metricsBindAddress: 0.0.0.0\n  networking:\n    cilium:\n      enableNodePort: true\n      ipam: eni\n      hubble:\n        enabled: true\n...\n")),(0,r.kt)("p",null,"kOps\ub97c \uad6c\uc131\ud560 \ub54c\ub294 Cluster CRD\ub97c \uc791\uc131\ud558\ub294\uac83\uc774 \uae30\ubcf8\uc778\ub370 \ud074\ub7ec\uc2a4\ud130 \uc774\ub984\uc740 \ud604\uc7ac \uc0ac\uc6a9\uc911\uc778 \ud14c\uc2a4\ud2b8 \ub3c4\uba54\uc778\uc744 \uc785\ub825\ud55c\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n","\uadf8\ub9ac\uace0 Cilium \uc744 \uae30\ubcf8 CNI\uc73c\ub85c \uad6c\uc131\ud560 \uc608\uc815\uc774\uae30 \ub54c\ubb38\uc5d0 Kube-Proxy\ub294 \uae30\ubcf8\uc801\uc73c\ub85c \ube44\ud65c\uc131\ud654 \ud55c\ub2e4. Cilium\uc774 AWS\uc5d0\uc11c \ud560\ub2f9\ub41c managed IP \uc8fc\uc18c\ub97c \ud504\ub85c\ube44\uc800\ub2dd\ud558\uace0 AWS VPC\uc640 \ub9c8\ucc2c\uac00\uc9c0\ub85c \uac01 \ud30c\ub4dc\uc5d0 \uc9c1\uc811 \uc5f0\uacb0\ud558\ub3c4\ub85d ",(0,r.kt)("inlineCode",{parentName:"p"},"networking.cilium.ipam=eni")," \uc124\uc815\uc744 \ucd94\uac00\ud558\uace0, hubble\uc744 \ud65c\uc131\ud654\ud558\uae30 \uc704\ud55c ",(0,r.kt)("inlineCode",{parentName:"p"},"networking.cilium.hubble.enabled: true")," \uc124\uc815\ub3c4 \ucd94\uac00\ud55c\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://docs.cilium.io/en/stable/network/concepts/ipam/eni/"},"https://docs.cilium.io/en/stable/network/concepts/ipam/eni/")),(0,r.kt)("p",null,"cilium \uc124\uc815\uc5d0\uc11c\uc758 \ub2e4\uc591\ud55c \uc635\uc158\uc740 \ub2e4\uc74c\uc744 \ucc38\uc870\ud560 \uc218 \uc788\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://kops.sigs.k8s.io/networking/cilium/"},"https://kops.sigs.k8s.io/networking/cilium/")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"...\n  api:\n    dns: {}\n  authorization:\n    rbac: {}\n  channel: stable\n  cloudProvider: aws\n  certManager:\n    enabled: true\n  awsLoadBalancerController:\n    enabled: true\n  externalDns:\n    provider: external-dns\n  metricsServer:\n    enabled: true\n  kubeDNS:\n    provider: CoreDNS\n    nodeLocalDNS:\n      enabled: true\n      memoryRequest: 5Mi\n      cpuRequest: 25m\n  configBase: s3://jinwoong-k8s-s3/prosv.kr\n...\n")),(0,r.kt)("p",null,"\uc704\uc5d0\uc11c \ucd94\uac00\ud55c \uc124\uc815\uc740 \ub2e4\uc74c\uacfc \uac19\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/addons/#cert-manager"},"certManager \ud65c\uc131\ud654")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/addons/#aws-load-balancer-controller"},"awsLoadBalancerController \ud65c\uc131\ud654")," \ubc0f ",(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/cluster_spec/#externaldns"},"externalDns \uad6c\uc131")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/addons/#metrics-server"},"metricsServer \ud65c\uc131\ud654")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/cluster_spec/#kubedns"},"kubeDNS \uad6c\uc131")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/state/#s3-state-store"},"\uae30\ubcf8 config \uc800\uc7a5\uc18c s3 \uc9c0\uc815"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"...\n  etcdClusters:\n  - cpuRequest: 200m\n    etcdMembers:\n    - encryptedVolume: true\n      instanceGroup: control-plane-ap-northeast-2a\n      name: a\n    memoryRequest: 100Mi\n    name: main\n  - cpuRequest: 100m\n    etcdMembers:\n    - encryptedVolume: true\n      instanceGroup: control-plane-ap-northeast-2a\n      name: a\n    memoryRequest: 100Mi\n    name: events\n  iam:\n    allowContainerRegistry: true\n    legacy: false\n  kubelet:\n    anonymousAuth: false\n    maxPods: 100\n...\n")),(0,r.kt)("p",null,"\uc704\uc5d0\uc11c \ucd94\uac00\ud55c \uc124\uc815\uc740 \ub2e4\uc74c\uacfc \uac19\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/cluster_spec/#etcdclusters"},"etcd \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"instancGroup CRD\uc5d0\uc11c \uc6d0\ud558\ub294 \uba38\uc2e0\ud0c0\uc785, \uae30\ubcf8 \ub178\ub4dc \uc774\ubbf8\uc9c0, \ub178\ub4dc \uac1c\uc218 \ub4f1\uc744 \uad6c\uc131\ud560 \uc218 \uc788\ub2e4."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/iam_roles/#access-to-aws-ec2-container-registry-ecr"},"ECR \uc811\uadfc\uc744 \uc704\ud55c IAM \uad6c\uc131")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/cluster_spec/#kubelet"},"kubelet \uad6c\uc131"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"...\n  kubernetesApiAccess:\n  - 0.0.0.0/0\n  - ::/0\n  kubernetesVersion: 1.24.11\n  masterPublicName: api.prosv.kr\n  networkCIDR: 172.30.0.0/16\n  nonMasqueradeCIDR: 100.64.0.0/10\n  sshAccess:\n  - 0.0.0.0/0\n  - ::/0\n  subnets:\n  - cidr: 172.30.32.0/19\n    name: ap-northeast-2a\n    type: Public\n    zone: ap-northeast-2a\n  - cidr: 172.30.64.0/19\n    name: ap-northeast-2c\n    type: Public\n    zone: ap-northeast-2c\n  topology:\n    dns:\n      type: Public\n    masters: public\n    nodes: public\n...\n")),(0,r.kt)("p",null,"\uc704\uc5d0\uc11c \ucd94\uac00\ud55c \uc124\uc815\uc740 \ub2e4\uc74c\uacfc \uac19\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/cluster_spec/#kubernetesapiaccess"},"kube-API \uc811\uadfc\uc81c\uc5b4 \uc124\uc815")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/run_in_existing_vpc/"},"\uae30\uc874 VPC\ub0b4 CIDR \uc0ac\uc6a9\uc744 \uc704\ud55c \uad6c\uc131")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://kops.sigs.k8s.io/topology/"},"\ub124\ud2b8\uc6cc\ud06c \ud1a0\ud3f4\ub85c\uc9c0 \uad6c\uc131"))),(0,r.kt)("p",null,"InstanceGroup \uacfc SSHCredential \ub97c \uc791\uc131\ud55c\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: kops.k8s.io/v1alpha2\nkind: InstanceGroup\nmetadata:\n  creationTimestamp: null\n  labels:\n    kops.k8s.io/cluster: prosv.kr\n  name: control-plane-ap-northeast-2a\nspec:\n  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302\n  instanceMetadata:\n    httpPutResponseHopLimit: 3\n    httpTokens: required\n  machineType: t3.medium\n  maxSize: 1\n  minSize: 1\n  role: Master\n  subnets:\n  - ap-northeast-2a\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: kops.k8s.io/v1alpha2\nkind: InstanceGroup\nmetadata:\n  creationTimestamp: null\n  labels:\n    kops.k8s.io/cluster: prosv.kr\n  name: nodes-ap-northeast-2a\nspec:\n  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302\n  instanceMetadata:\n    httpPutResponseHopLimit: 1\n    httpTokens: required\n  machineType: t3.medium\n  maxSize: 1\n  minSize: 1\n  role: Node\n  subnets:\n  - ap-northeast-2a\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: kops.k8s.io/v1alpha2\nkind: InstanceGroup\nmetadata:\n  creationTimestamp: null\n  labels:\n    kops.k8s.io/cluster: prosv.kr\n  name: nodes-ap-northeast-2c\nspec:\n  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302\n  instanceMetadata:\n    httpPutResponseHopLimit: 1\n    httpTokens: required\n  machineType: t3.medium\n  maxSize: 1\n  minSize: 1\n  role: Node\n  subnets:\n  - ap-northeast-2c\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: kops.k8s.io/v1alpha2\nkind: SSHCredential\nmetadata:\n  creationTimestamp: null\n  labels:\n    kops.k8s.io/cluster: prosv.kr\n  name: admin\nspec:\n  publicKey: ssh-rsa AAAA.....\n    root@ip-172-31-50-160\n")),(0,r.kt)("p",null,"\uc791\uc131\ud55c \ubaa8\ub4e0 \ud30c\uc77c\uc744 \ud558\ub098\uc758 \ud30c\uc77c\ub85c \uc800\uc7a5\ud55c \ud6c4 \ub2e4\uc74c\uacfc \uac19\uc774 kops CLI\ub85c \ubc30\ud3ec\ub97c \uc9c4\ud589\ud55c\ub2e4. \uc804\uccb4 \ud30c\uc77c\uc740 \ub2e4\uc74c \ub9c1\ud06c \uc608\uc2dc\ub97c \ucc38\uc870\ud55c\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/ddiiwoong/kops-config/main/kops.yaml"},"https://raw.githubusercontent.com/ddiiwoong/kops-config/main/kops.yaml")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"kops create -f kops.yaml\n\nkops update cluster --name prosv.kr --ssh-public-key ~/.ssh/id_rsa.pub --yes\n")),(0,r.kt)("p",null,"\ubc30\ud3ec\uacfc \uc644\ub8cc\ub41c \uc774\ud6c4\uc5d0 \uad6c\uc131\ub41c \ud30c\ub4dc\ub97c \ud655\uc778\ud574\ubcf4\uba74 \ub300\ubd80\ubd84\uc740 \uae30\uc874 VPC CNI \uad6c\uc131\uc694\uc18c\uc640 \ub3d9\uc77c\ud558\uc9c0\ub9cc \uba87\uac00\uc9c0 \ucc28\uc774\uc810\uc740 \ub178\ub4dc\ub9c8\ub2e4 \uad6c\uc131\ub418\uc5b4 \uc788\ub358 kube-proxy \ub300\uc2e0 cilium \ub370\ubaac\uc14b \ud30c\ub4dc\uc640 cilium \uc624\ud37c\ub808\uc774\ud130 \ud30c\ub4dc\uac00 \uad6c\uc131\ub41c\uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4.  "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl get pod -n kube-system\nNAME                                            READY   STATUS    RESTARTS      AGE\n...\ncilium-l6j9d                                    1/1     Running   0             24h\ncilium-operator-697c58f5d5-8kk8m                1/1     Running   0             24h\ncilium-q9j27                                    1/1     Running   0             24h\ncilium-rx8zx                                    1/1     Running   0             24h\n...\nexternal-dns-598d5f5c76-pqp6r                   1/1     Running   0             24h\nhubble-relay-85df7fbcbf-79n52                   1/1     Running   0             24h\nhubble-relay-85df7fbcbf-rfchd                   1/1     Running   0             24h\nhubble-ui-5986c56d45-wn95w                      3/3     Running   0             23h\n...\n")),(0,r.kt)("h2",{id:"cni-\ud14c\uc2a4\ud2b8"},"CNI \ud14c\uc2a4\ud2b8"),(0,r.kt)("p",null,"\ud14c\uc2a4\ud2b8\uc6a9 netshoot \ud30c\ub4dc\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'cat <<EOF | kubectl create -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: netshoot-pod\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: netshoot-pod\n  template:\n    metadata:\n      labels:\n        app: netshoot-pod\n    spec:\n      containers:\n      - name: netshoot-pod\n        image: nicolaka/netshoot\n        command: ["tail"]\n        args: ["-f", "/dev/null"]\n      terminationGracePeriodSeconds: 0\nEOF\n')),(0,r.kt)("p",null,"\ubc30\ud3ec\ud55c netshoot \ud30c\ub4dc\uc758 IP\ub97c \ud655\uc778\ud55c\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"# kubectl get pod -o=custom-columns=NAME:.metadata.name,IP:.status.podIP\nNAME                            IP\nnetshoot-pod-7757d5dd99-9mb7s   172.30.47.42\nnetshoot-pod-7757d5dd99-df68s   172.30.68.92\n")),(0,r.kt)("p",null,"hubble \uc811\uadfc\uc744 \uc704\ud574 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.cilium.io/en/stable/gettingstarted/hubble_setup/"},"https://docs.cilium.io/en/stable/gettingstarted/hubble_setup/")," \uc744 \ucc38\uc870\ud574\uc11c hubble, cilium CLI\ub97c Cloud9\uc5d0 \uc124\uce58\ud55c\ub2e4. Hubble API\uc5d0 \uc561\uc138\uc2a4\ud558\ub824\uba74 \ub85c\uceec \uba38\uc2e0\uc5d0\uc11c Hubble \uc11c\ube44\uc2a4\uc5d0 \ub300\ud55c \ud3ec\ud2b8 \ud3ec\uc6cc\ub4dc\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"$ cilium hubble port-forward&\nForwarding from 0.0.0.0:4245 -> 4245\nForwarding from [::]:4245 -> 4245\n\n$ hubble status\nHealthcheck (via localhost:4245): Ok\nCurrent/Max Flows: 12,285/12,285 (100.00%)\nFlows/s: 12.41\nConnected Nodes: 3/3\n")),(0,r.kt)("p",null,"\uc678\ubd80\ub85c \ud1b5\uc2e0\ud558\ub294 \ud2b8\ub798\ud53d\uc744 \ubc1c\uc0dd\uc2dc\ud0a4\uace0 ",(0,r.kt)("inlineCode",{parentName:"p"},"hubble observe")," \uba85\ub839\uc744 \ud1b5\ud574 flow\ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ kubectl exec -it netshoot-pod-7757d5dd99-k4pf7 -- curl -s wttr.in/seoul                                              \n\n$ hubble observe --pod netshoot-pod-7757d5dd99-k4pf7                                                                   \nMar 18 17:24:57.786: default/netshoot-pod-7757d5dd99-k4pf7:35019 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)\nMar 18 17:24:57.788: default/netshoot-pod-7757d5dd99-k4pf7:35019 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)\nMar 18 17:24:57.788: default/netshoot-pod-7757d5dd99-k4pf7:51562 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)\nMar 18 17:24:57.789: default/netshoot-pod-7757d5dd99-k4pf7:51562 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)\nMar 18 17:24:57.789: default/netshoot-pod-7757d5dd99-k4pf7:57074 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)\nMar 18 17:24:57.790: default/netshoot-pod-7757d5dd99-k4pf7:57074 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)\nMar 18 17:24:57.790: default/netshoot-pod-7757d5dd99-k4pf7:49895 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)\nMar 18 17:24:57.791: default/netshoot-pod-7757d5dd99-k4pf7:49895 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)\nMar 18 17:24:57.792: default/netshoot-pod-7757d5dd99-k4pf7:42920 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)\nMar 18 17:24:57.794: default/netshoot-pod-7757d5dd99-k4pf7:42920 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)\nMar 18 17:24:58.050: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: SYN)\nMar 18 17:24:58.528: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: ACK, FIN)\nMar 18 17:24:58.766: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) <- 5.9.243.187:80 (world) to-endpoint FORWARDED (TCP Flags: ACK, FIN)\nMar 18 17:24:58.766: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: ACK)\n")),(0,r.kt)("p",null,"\uc774\ubc88\uc5d0\ub294 \ucd5c\ub300 \ud30c\ub4dc \uac1c\uc218\ub97c \uccb4\ud06c\ud558\uae30 \uc704\ud574 replica\ub97c 20\uac1c\ub85c \uc99d\uac00\uc2dc\ud0a8\ub2e4. \ud558\uc9c0\ub9cc \uc544\ub798\uc640 \uac19\uc774 \uba87\uac1c\uc758 \ud30c\ub4dc\uac00 ",(0,r.kt)("inlineCode",{parentName:"p"},"ContainerCreating")," \uc0c1\ud0dc\uc778 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl scale deployment/netshoot-pod --replicas=20\ndeployment.apps/netshoot-pod scaled\n$ kubectl get pod\nNAME                            READY   STATUS              RESTARTS   AGE\nnetshoot-pod-7757d5dd99-2x29s   0/1     c   0          9s\nnetshoot-pod-7757d5dd99-5j9qc   1/1     Running             0          34m\nnetshoot-pod-7757d5dd99-9996z   1/1     Running             0          26m\nnetshoot-pod-7757d5dd99-9dnkg   1/1     Running             0          34m\nnetshoot-pod-7757d5dd99-9k92w   0/1     ContainerCreating   0          23s\nnetshoot-pod-7757d5dd99-9mb7s   1/1     Running             0          43m\nnetshoot-pod-7757d5dd99-c2292   1/1     Running             0          35m\nnetshoot-pod-7757d5dd99-cf7dv   1/1     Running             0          34m\nnetshoot-pod-7757d5dd99-df68s   1/1     Running             0          43m\nnetshoot-pod-7757d5dd99-h9fjm   0/1     ContainerCreating   0          23s\nnetshoot-pod-7757d5dd99-hrkcs   0/1     ContainerCreating   0          23s\nnetshoot-pod-7757d5dd99-jkc6v   1/1     Running             0          34m\nnetshoot-pod-7757d5dd99-jkx7j   1/1     Running             0          23s\nnetshoot-pod-7757d5dd99-k4pf7   1/1     Running             0          26m\nnetshoot-pod-7757d5dd99-lbzvs   1/1     Running             0          35m\nnetshoot-pod-7757d5dd99-nb4pf   1/1     Running             0          34m\nnetshoot-pod-7757d5dd99-r4bhf   1/1     Running             0          26m\nnetshoot-pod-7757d5dd99-t8rt6   1/1     Running             0          26m\nnetshoot-pod-7757d5dd99-x2d62   1/1     Running             0          26m\nnetshoot-pod-7757d5dd99-zm7vc   1/1     Running             0          35m\n")),(0,r.kt)("p",null,"\ud30c\ub4dc\uc758 \uc0c1\ud0dc\ub97c ",(0,r.kt)("inlineCode",{parentName:"p"},"describe")," \uba85\ub839\uc73c\ub85c \uc0b4\ud3b4\ubcf4\uba74 cilium agent\uac00 AWS IPAM \uacfc \uc5f0\ub3d9\ub418\uc5b4 IP \ubd80\uc871\uc73c\ub85c \uc778\ud574 \ud560\ub2f9\uc774 \ub418\uc9c0 \uc54a\uc74c\uc744 \uc54c \uc218 \uc788\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},'$ kubectl describe pod netshoot-pod-7757d5dd99-9k92w\n...\n  Warning  FailedCreatePodSandBox  3m43s (x85 over 21m)  kubelet            (combined from similar events): Failed to create pod sandbox: rpc error: code = Unknown desc = failed to setup network for sandbox "eaced767b8747e09656744a3249a5e1c092fea7ba45302abdbf8086e3297c07d": plugin type="cilium-cni" name="cilium" failed (add): unable to allocate IP via local cilium agent: [POST /ipam][502] postIpamFailure  No more IPs availabl\n')),(0,r.kt)("p",null,"AWS VPC CNI \ud658\uacbd\uc5d0\uc11c \ucd5c\ub300 \ud30c\ub4dc \uc0ac\uc6a9 \uac00\ub2a5 \uacc4\uc0b0\uc2dd\uc740 ENI \uc790\uccb4 IP\ub97c \uc81c\uc678\ud558\uace0 ",(0,r.kt)("inlineCode",{parentName:"p"},"aws-node")," \uc640 ",(0,r.kt)("inlineCode",{parentName:"p"},"kube-proxy")," \ud30c\ub4dc\ub97c \uace0\ub824\ud558\uc5ec \ub2e4\uc74c\uacfc \uac19\uc740 \uacf5\uc2dd\uc73c\ub85c \uacc4\uc0b0\uc744 \ud558\uac8c \ub41c\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt"},"https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"((MaxENI * (IPv4addr - 1)) + 2)\nt3.medium \uacbd\uc6b0 : ((3 * (6 - 1) + 2 ) = 17\uac1c >> aws-node \uc640 kube-proxy 2\uac1c \uc81c\uc678\ud558\uba74 15\uac1c\n")),(0,r.kt)("p",null,"IPAM\uc744 \uc124\uc815\ud55c Cilium\uc740 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.cilium.io/en/stable/network/concepts/ipam/eni/"},"AWS ENI")," \uae30\uc900\uc744 \ub530\ub77c\uac04\ub2e4. \uacf5\uc2dd \ubb38\uc11c\uc5d0\uc11c\ub294 \uc544\uc9c1 \ud655\uc778\ud560 \uc218 \uc5c6\uc9c0\ub9cc ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cilium/cilium/issues/10426"},"GitHub issue"),"\ub85c \ucd94\uc815\ud574\ubcf4\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"health"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"router")," ",(0,r.kt)("inlineCode",{parentName:"p"},"CiliumInternalIP")," 3\uac1c\uc758 IP\ub97c \uc81c\uc678\ud558\uae30 \ub54c\ubb38\uc5d0 t3.medium\uc758 \uacbd\uc6b0\ub77c\uba74 3\uac1c\uc758 ENI \ub2f9 6\uac1c\uc758 \uc544\uc774\ud53c\ub97c \ud560\ub2f9\ud560 \uc218 \uc788\uae30 \ub54c\ubb38\uc5d0 \uc2e4\uc81c \uad6c\uc131 \uac00\ub2a5\ud55c \uac1c\uc218\ub294 12\uac1c \uc0dd\uc131\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"(MaxENI * (IPv4addr - 1))\nt3.medium \uacbd\uc6b0 : ((3 * (6 - 1)) = 15\uac1c >> health, router, CiliumInternalIP 3\uac1c \uc81c\uc678\ud558\uba74 12\uac1c \ud30c\ub4dc\uac00 \uc0dd\uc131\uc774 \uac00\ub2a5\ud558\ub2e4. \n")),(0,r.kt)("p",null,"\uc774\ub97c ciliumnode CRD\ub97c \ud1b5\ud574\uc11c\ub3c4 \ud655\uc778\uc774 \uac00\ub2a5\ud558\ub2e4. "),(0,r.kt)("p",null,"\uccab\ubc88\uc9f8 \uc778\ud130\ud398\uc774\uc2a4\uc5d0 \ud560\ub2f9\ub41c ",(0,r.kt)("inlineCode",{parentName:"p"},"InternalIP"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ExternalIP")," \uc640 \ub0b4\ubd80\uc801\uc73c\ub85c \uc0ac\uc6a9\ud558\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"CiliumInternalIP")," \ub97c \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"kubectl get ciliumnode i-00b3ebc1b78f19739 -o yaml\n\napiVersion: v1\nitems:\n- apiVersion: cilium.io/v2\n  kind: CiliumNode\n  metadata:\n    ...\n  spec:\n    addresses:\n    - ip: 172.30.60.14\n      type: InternalIP\n    - ip: 13.124.209.231\n      type: ExternalIP\n    - ip: 172.30.44.153\n      type: CiliumInternalIP\n\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"spec.ipam"),"\uc5d0\uc11c\ub294 \uc704\uc5d0\uc11c \uc5b8\uae09\ud55c \ub300\ub85c 15\uac1c\uc758 \ud560\ub2f9\uac00\ub2a5\ud55c IP\ub97c \ubcf4\uc5ec\uc900\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"    ...\n    ipam:\n      podCIDRs:\n      - 100.96.2.0/24\n      pool:\n        172.30.32.43:\n          resource: eni-0717341e6470f76ce\n        172.30.32.217:\n          resource: eni-0483a896a7c0b49f3\n        172.30.36.179:\n          resource: eni-0717341e6470f76ce\n        172.30.38.188:\n          resource: eni-0483a896a7c0b49f3\n        172.30.38.221:\n          resource: eni-0483a896a7c0b49f3\n        172.30.42.57:\n          resource: eni-03b280d75b6d6cb09\n        172.30.44.103:\n          resource: eni-0717341e6470f76ce\n        172.30.44.153:\n          resource: eni-03b280d75b6d6cb09\n        172.30.44.201:\n          resource: eni-0717341e6470f76ce\n        172.30.47.42:\n          resource: eni-0483a896a7c0b49f3\n        172.30.47.95:\n          resource: eni-03b280d75b6d6cb09\n        172.30.53.208:\n          resource: eni-03b280d75b6d6cb09\n        172.30.55.231:\n          resource: eni-0717341e6470f76ce\n        172.30.61.93:\n          resource: eni-0483a896a7c0b49f3\n        172.30.63.46:\n          resource: eni-03b280d75b6d6cb09\n      pre-allocate: 8\n    ...\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"status.ipam"),"\uc5d0\uc11c\ub294 \ud604\uc7ac \ud560\ub2f9\ub418\uc5b4 \uc788\ub294 12\uac1c\uc758 IP\ud604\ud669\uc744 \ubcfc\uc218 \uc788\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"    ipam:\n      operator-status: {}\n      used:\n        172.30.32.43:\n          owner: default/netshoot-pod-7757d5dd99-x2d62\n          resource: eni-0717341e6470f76ce\n        172.30.32.217:\n          owner: kube-system/metrics-server-5f65d889cd-kg8sb\n          resource: eni-0483a896a7c0b49f3\n        172.30.36.179:\n          owner: default/netshoot-pod-7757d5dd99-9996z\n          resource: eni-0717341e6470f76ce\n        172.30.38.188:\n          owner: default/netshoot-pod-7757d5dd99-9dnkg\n          resource: eni-0483a896a7c0b49f3\n        172.30.38.221:\n          owner: kube-system/coredns-68cd66b8cc-2bmzj\n          resource: eni-0483a896a7c0b49f3\n        172.30.42.57:\n          owner: kube-system/ebs-csi-node-t9dk5\n          resource: eni-03b280d75b6d6cb09\n        172.30.44.103:\n          owner: default/netshoot-pod-7757d5dd99-5j9qc\n          resource: eni-0717341e6470f76ce\n        172.30.44.153:\n          owner: router\n          resource: eni-03b280d75b6d6cb09\n        172.30.44.201:\n          owner: default/netshoot-pod-7757d5dd99-c2292\n          resource: eni-0717341e6470f76ce\n        172.30.47.42:\n          owner: default/netshoot-pod-7757d5dd99-9mb7s\n          resource: eni-0483a896a7c0b49f3\n        172.30.53.208:\n          owner: default/netshoot-pod-7757d5dd99-zm7vc\n          resource: eni-03b280d75b6d6cb09\n        172.30.55.231:\n          owner: kube-system/hubble-relay-85df7fbcbf-79n52\n          resource: eni-0717341e6470f76ce\n        172.30.61.93:\n          owner: default/netshoot-pod-7757d5dd99-jkc6v\n          resource: eni-0483a896a7c0b49f3\n        172.30.63.46:\n          owner: health\n          resource: eni-03b280d75b6d6cb09\n")),(0,r.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,r.kt)("p",null,"\uc774\ubc88\uc5d0\ub294 kOps \uad6c\uc131\uc744 Cilium CNI \uae30\ubc18\uc73c\ub85c \uad6c\uc131\ud558\uace0 hubble\uc744 \ud1b5\ud574 flow\ub97c \ud655\uc778\ud558\uace0 AWS IPAM API \uc5f0\ub3d9\uc744 \ud1b5\ud55c \ud30c\ub4dc IP\ud560\ub2f9 \ud14c\uc2a4\ud2b8\ub97c \uc9c4\ud589\ud574\ubd24\ub2e4."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")))}m.isMDXComponent=!0}}]);