"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[1336],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),i=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=i(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=i(t),m=r,k=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return t?a.createElement(k,l(l({ref:n},c),{},{components:t})):a.createElement(k,l({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=d;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=t[i];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},38954:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return s},metadata:function(){return i},toc:function(){return u}});var a=t(87462),r=t(63366),o=(t(67294),t(3905)),l=["components"],s={layout:"single",title:"kOps with Cloud9",comments:!0,classes:"wide",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cloud9/",date:new Date("2023-03-08T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","HPA"]},p=void 0,i={permalink:"/kubernetes/kops-cloud9/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2023-03-08-kops-cloud9.md",source:"@site/blog/2023-03-08-kops-cloud9.md",title:"kOps with Cloud9",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",date:"2023-03-08T00:00:00.000Z",formattedDate:"March 8, 2023",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"kOps",permalink:"/tags/k-ops"},{label:"Cloud9",permalink:"/tags/cloud-9"},{label:"CloudFormation",permalink:"/tags/cloud-formation"},{label:"HPA",permalink:"/tags/hpa"}],readingTime:9.935,truncated:!1,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"kOps with Cloud9",comments:!0,classes:"wide",description:"Cloud9 \uae30\ubc18 kOps \ud658\uacbd \uad6c\uc131",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kops-cloud9/",date:"2023-03-08T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","kOps","Cloud9","CloudFormation","HPA"]},nextItem:{title:"EKS CNI Custom Networking",permalink:"/kubernetes/eks-cni-custom/"}},c={authorsImageUrls:[void 0]},u=[{value:"PKOS Study",id:"pkos-study",level:2},{value:"kOps",id:"kops",level:2},{value:"Bastion \ud658\uacbd \uad6c\uc131",id:"bastion-\ud658\uacbd-\uad6c\uc131",level:2},{value:"kOps \ubc30\ud3ec",id:"kops-\ubc30\ud3ec",level:2},{value:"Add-on \uad6c\uc131",id:"add-on-\uad6c\uc131",level:2},{value:"\uc815\ub9ac",id:"\uc815\ub9ac",level:2}],d={toc:u};function m(e){var n=e.components,s=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},d,s,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"pkos-study"},"PKOS Study"),(0,o.kt)("p",null,'\uac00\uc2dc\ub2e4\ub2d8\uc758 Production Kubernetes Online Study (=PKOS) 2\uae30 \uba64\ubc84\uac00 \ub418\uc11c \ucfe0\ubc84\ub124\ud2f0\uc2a4 \uc2a4\ud130\ub514\ub97c \uc9c4\ud589\ud558\uace0 \uc788\ub2e4. \uc774\uc815\ud6c8\ub2d8\uc758 \uc9d1\ud544\ud558\uc2e0 "24\ub2e8\uacc4 \uc2e4\uc2b5\uc73c\ub85c \uc815\ubcf5\ud558\ub294 \ucfe0\ubc84\ub124\ud2f0\uc2a4" \ucc45\uc744 \uae30\ubc18\uc73c\ub85c \ud558\ub294 \uc2a4\ud130\ub514\uc774\uba70 \ucd1d 4\uc8fc\uac04 \uc9c4\ud589\uc774 \ub418\uace0 \uc788\uace0 \uccab\ubc88\uc9f8 \uc2a4\ud130\ub514 \uc77c\uc815\uc774 \ub9c8\ubb34\ub9ac \ub418\uc5c8\ub2e4. \uc2e4\uc81c\ub85c kubeadm, kubespray\ub85c\ub294 \uacbd\ud5d8\uc774 \uc788\uc9c0\ub9cc \uc774\ubc88 \uc2a4\ud130\ub514\uc5d0\uc11c \ub300\ubd80\ubd84\uc758 \uc2e4\uc2b5\uc740 kOps\ub85c \uad6c\uc131\uc774 \ub418\uc5b4 \uc0c8\ub85c\uc6b4 \ubc29\uc2dd\uc73c\ub85c \uc124\uce58\ub97c \uc9c4\ud589\ud588\ub2e4.'),(0,o.kt)("h2",{id:"kops"},"kOps"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"K"),"ubernetes ",(0,o.kt)("strong",{parentName:"li"},"Op"),"eration",(0,o.kt)("strong",{parentName:"li"},"s")," (kOps) - Production Grade k8s Installation, Upgrades and Management")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://kops.sigs.k8s.io/"},"https://kops.sigs.k8s.io/"),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/kops"},"https://github.com/kubernetes/kops")),(0,o.kt)("p",null,"kOps\ub294 \ud074\ub77c\uc6b0\ub4dc \ud50c\ub7ab\ud3fc(aws, gcp, azure \ub4f1)\uc5d0\uc11c \uc27d\uac8c k8s \ub97c \uc124\uce58\ud560 \uc218 \uc788\ub3c4\ub85d \ub3c4\uc640\uc8fc\ub294 \ub3c4\uad6c\ub85c \uc11c\ubc84 \uc778\uc2a4\ud134\uc2a4\uc640 \ub124\ud2b8\uc6cc\ud06c \ub9ac\uc18c\uc2a4 \ub4f1\uc744 \ud074\ub77c\uc6b0\ub4dc\uc5d0\uc11c \uc790\ub3d9\uc73c\ub85c \uc0dd\uc131\ud574 k8s \ub97c \uc124\uce58\ud558\ub294 \ub3c4\uad6c\uc774\uace0 kOps\ub294 AWS \uc758 \ub2e4\uc591\ud55c \uc11c\ube44\uc2a4\uc640 \uc720\uc5f0\ud558\uac8c \uc5f0\ub3d9\ub418\uc5b4 \uc0ac\uc6a9 \uac00\ub2a5\ud55c\uac8c \uc7a5\uc810\uc774\ub2e4. "),(0,o.kt)("p",null,"\uae00\uc744 \uc791\uc131\ud558\ub294 \ub0a0\uc9dc \uae30\uc900(23\ub144 3\uc6d4 5\uc77c), \ubc84\uc804\uc740 1.25.3 \uc73c\ub85c \uc9c4\ud589\uc744 \ud55c\ub2e4."),(0,o.kt)("h2",{id:"bastion-\ud658\uacbd-\uad6c\uc131"},"Bastion \ud658\uacbd \uad6c\uc131"),(0,o.kt)("p",null,"Basition\uc740 Cloud9\uc73c\ub85c \uad6c\uc131\uc744 \ud588\ub2e4. ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/aws-samples/aws-cloud9-bootstrapping-example"},"https://github.com/aws-samples/aws-cloud9-bootstrapping-example")," \ub97c \ucc38\uace0\ud558\uc5ec \uad6c\uc131\ud588\uace0 \uc5ec\ub7ec \ud234\uc744 bootstrap \ud615\ud0dc\ub85c \uad6c\uc131\ud558\uae30 \uc704\ud574 \ucd94\uac00\uc801\uc73c\ub85c \uc5ec\ub7ec \ub3c4\uad6c\ub4e4\uc744 \uc124\uce58\ud55c\ub2e4."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"kubectl"),(0,o.kt)("li",{parentName:"ul"},"kops"),(0,o.kt)("li",{parentName:"ul"},"awscli v2"),(0,o.kt)("li",{parentName:"ul"},"k9s"),(0,o.kt)("li",{parentName:"ul"},"helm"),(0,o.kt)("li",{parentName:"ul"},"jq, git, htop, tree, gettext, bash-completion \ub4f1")),(0,o.kt)("p",null,"\uc790\uc138\ud55c \ub0b4\uc6a9\uc740 ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml"},"https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml")," \uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\ub2e4. \ud574\ub2f9 yaml \uc5d0\uc11c \ubcf8\uc778\uc774 \uc8fc\ub85c \uc811\uc18d\ud558\ub294 Console \uc811\uc18d \uc815\ubcf4(ARN)\uc744 \uc544\ub798 ",(0,o.kt)("inlineCode",{parentName:"p"},"OwnerArn")," \uad6c\ubb38\uacfc \uac19\uc774 \uc5c5\ub370\uc774\ud2b8\ub97c \uc9c4\ud589\ud55c\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'################## INSTANCE #####################\n  ExampleC9InstanceProfile:\n    Type: AWS::IAM::InstanceProfile\n    Properties:\n      Path: "/"\n      Roles:\n      - Ref: ExampleC9Role\n\n  ExampleC9Instance:\n    Description: "-"\n    DependsOn: ExampleC9BootstrapAssociation\n    Type: AWS::Cloud9::EnvironmentEC2\n    Properties:\n      Description: AWS Cloud9 instance for Examples\n      AutomaticStopTimeMinutes: 3600\n      InstanceType:\n        Ref: ExampleC9InstanceType\n      Name:\n        Ref: AWS::StackName\n      # OwnerArn: !If [Create3rdPartyResources, !Ref ExampleOwnerArn, !Ref "AWS::NoValue" ]\n      OwnerArn: "arn:aws:sts::265664683898:assumed-role/AWSReservedSSO_AWSAdministratorAccess_574b6756fcc31821/jinwoong"\n')),(0,o.kt)("p",null,"\ud574\ub2f9 yaml \uc744 \uac00\uc9c0\uace0 \uc544\ub798 \uba85\ub839\uc73c\ub85c Cloudformation\uc744 \uc2e4\ud589\ud558\uac8c \ub418\uba74 \uc5ec\ub7ec\uac00\uc9c0 \uc720\ud2f8\uc774 \uc124\uce58\ub41c \uc0c1\ud0dc\uc758 Cloud9 \uc778\uc2a4\ud134\uc2a4\uac00 \uc0dd\uc131\ub418\uac8c \ub41c\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"aws cloudformation deploy  --stack-name kops-test --template ./example_instancestack.yaml --profile lge-sdp\n")),(0,o.kt)("p",null,"Cloud9\uc744 \uc704\ud574 \uc0dd\uc131\ub41c \uad8c\ud55c\uc744 \ud65c\uc6a9\ud558\uae30 \uc704\ud574 Cloud9 \uc124\uc815\uc5d0\uc11c AWS managed temporary credentials \uae30\ub2a5\uc744 \ube44\ud65c\uc131\ud654 \ud558\uc790."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"cloud9",src:t(2494).Z,width:"3246",height:"1028"})),(0,o.kt)("h2",{id:"kops-\ubc30\ud3ec"},"kOps \ubc30\ud3ec"),(0,o.kt)("p",null,"AWS \ud658\uacbd\uc5d0 kOps\ub97c \ubc30\ud3ec\ud558\uae30 \uc704\ud574\uc11c\ub294 \uc544\ub798\uc640 \uac19\uc740 IAM \uad8c\ud55c\uc774 \ud544\uc694\ud558\ub2e4. "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"AmazonEC2FullAccess"),(0,o.kt)("li",{parentName:"ul"},"AmazonRoute53FullAccess "),(0,o.kt)("li",{parentName:"ul"},"AmazonS3FullAccess "),(0,o.kt)("li",{parentName:"ul"},"IAMFullAccess "),(0,o.kt)("li",{parentName:"ul"},"AmazonVPCFullAccess "),(0,o.kt)("li",{parentName:"ul"},"AmazonSQSFullAccess "),(0,o.kt)("li",{parentName:"ul"},"AmazonEventBridgeFullAccess")),(0,o.kt)("p",null,"kOps\ub294 Cluster State \uc800\uc7a5\uc744 \uc704\ud55c S3 \ubc84\ud0b7\uacfc DNS \ub808\ucf54\ub4dc\ub97c \ud65c\uc6a9\ud574\uc11c \ud074\ub7ec\uc2a4\ud130 \uc0dd\uc131\uc744 \ud558\uac8c \ub418\ub294\ub370 \ud3b8\uc758\ub97c \uc704\ud574 \uac1c\uc778 \uc0ac\uc6a9\uc911\uc778 \ub3c4\uba54\uc778\uc758 NS\uc11c\ubc84\ub97c Route53\uc5d0 \uc5f0\uacb0\ud558\uace0 \uc774\ubbf8 \uc0dd\uc131\ud574\ub193\uc740 \ubc84\ud0b7\uc744 \uac00\uc9c0\uace0 \ubc30\ud3ec\ub97c \uc9c4\ud589\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'# \ubc30\ud3ec \uc2dc \ucc38\uace0\ud560 \uc815\ubcf4\ub97c \ud658\uacbd \ubcc0\uc218\uc5d0 \uc800\uc7a5\n## export NAME=<\uc790\uc2e0\uc758 \ud37c\ube14\ub9ad \ud638\uc2a4\ud305 \uba54\uc778 \uc8fc\uc18c>\n## export KOPS_STATE_STORE=s3://(\ubc84\ud0b7 \uc774\ub984)\nexport KOPS_CLUSTER_NAME=prosv.kr\nexport KOPS_STATE_STORE=s3://jinwoong-k8s-s3\nexport AWS_PAGER=""\nexport REGION=ap-northeast-2\n')),(0,o.kt)("p",null,"Cloud9 \ud658\uacbd\uc5d0\uc11c ",(0,o.kt)("inlineCode",{parentName:"p"},"kops")," \uba85\ub839\uc744 \ud1b5\ud574 \ud074\ub7ec\uc2a4\ud130\ub97c \uad6c\uc131\ud558\uac8c \ub418\ub294\ub370 ",(0,o.kt)("inlineCode",{parentName:"p"},"VPC CNI"),"\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574 ",(0,o.kt)("inlineCode",{parentName:"p"},"amazonvpc"),"\ub85c \uad6c\uc131\ud558\uace0 ",(0,o.kt)("inlineCode",{parentName:"p"},"1.24")," \ubc84\uc804\uc758 master \ub178\ub4dc 1\ub300, work \ub178\ub4dc 3\ub300\ub97c \uc0dd\uc131\ud55c\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ kops create cluster --zones="$REGION"a,"$REGION"c \\\n--networking amazonvpc --cloud aws \\\n--master-size t3.medium --node-size t3.medium --node-count=3 \\\n--network-cidr 172.30.0.0/16 --ssh-public-key ~/.ssh/id_rsa.pub \\\n--name=$KOPS_CLUSTER_NAME --discovery-store=s3://jinwoong-k8s-s3 \\\n--kubernetes-version "1.24.10" -y\n')),(0,o.kt)("p",null,"\ud074\ub7ec\uc2a4\ud130\uac00 \uc0dd\uc131\ub418\ub294 \ub3d9\uc548 \uc720\ud6a8\uc131\uc744 \uccb4\ud06c\ud558\uae30 \uc704\ud574 10\ubd84\uac04 \ub300\uae30\ud558\uace0 \uad6c\uc131\uc774 \uc644\ub8cc\ub418\uba74 \uc544\ub798\uc640 \uac19\uc774 \ucd08\uae30 \uad6c\uc131\ud55c \ud074\ub7ec\uc2a4\ud130\uac00 ready \uc0c1\ud0dc\uc778\uc9c0 \uc54c \uc218 \uc788\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"kops get")," \uba85\ub839\uc744 \ud1b5\ud574 \ub2e4\ub978 \uc815\ubcf4\ub4e4\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ kops validate cluster --wait 10m\n\nValidating cluster prosv.kr\n\nINSTANCE GROUPS\nNAME                    ROLE    MACHINETYPE     MIN     MAX     SUBNETS\nmaster-ap-northeast-2a  Master  t3.medium       1       1       ap-northeast-2a\nnodes-ap-northeast-2a   Node    t3.medium       2       2       ap-northeast-2a\nnodes-ap-northeast-2c   Node    t3.medium       1       1       ap-northeast-2c\n\nNODE STATUS\nNAME                    ROLE    READY\ni-053ca67a20cd7bf7f     node    True\ni-0a7dfc0939b58c2fc     node    True\ni-0aa3db1bfe96bf280     master  True\ni-0b665798ce9dd857f     node    True\n\nYour cluster prosv.kr is ready\n\n$ kops get cluster\nNAME            CLOUD   ZONES\nprosv.kr        aws     ap-northeast-2a,ap-northeast-2c\n\n$ kops get instances\n\nID                      NODE-NAME               STATUS          ROLES   STATE   INTERNAL-IP     INSTANCE-GROUP                          MACHINE-TYPE\ni-053ca67a20cd7bf7f     i-053ca67a20cd7bf7f     UpToDate        node            172.30.49.113   nodes-ap-northeast-2a.prosv.kr          t3.medium\ni-0a7dfc0939b58c2fc     i-0a7dfc0939b58c2fc     UpToDate        node            172.30.77.157   nodes-ap-northeast-2c.prosv.kr          t3.medium\ni-0aa3db1bfe96bf280     i-0aa3db1bfe96bf280     UpToDate        master          172.30.63.194   master-ap-northeast-2a.masters.prosv.kr t3.medium\ni-0b665798ce9dd857f     i-0b665798ce9dd857f     UpToDate        node            172.30.54.137   nodes-ap-northeast-2a.prosv.kr          t3.medium\n")),(0,o.kt)("p",null,"\uae30\ubcf8 CRI \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784\uc774 containerd \uc778 \uac83\ub3c4 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. \uac01 \ub178\ub4dc\uac00 External-IP\ub97c \ud560\ub2f9\ubc1b\uc740 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl get nodes -o wide\nNAME                  STATUS   ROLES           AGE   VERSION    INTERNAL-IP     EXTERNAL-IP      OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME\ni-053ca67a20cd7bf7f   Ready    node            42m   v1.24.10   172.30.49.113   43.201.14.97     Ubuntu 20.04.5 LTS   5.15.0-1028-aws   containerd://1.6.10\ni-0a7dfc0939b58c2fc   Ready    node            42m   v1.24.10   172.30.77.157   43.201.77.155    Ubuntu 20.04.5 LTS   5.15.0-1028-aws   containerd://1.6.10\ni-0aa3db1bfe96bf280   Ready    control-plane   44m   v1.24.10   172.30.63.194   43.200.6.4       Ubuntu 20.04.5 LTS   5.15.0-1028-aws   containerd://1.6.10\ni-0b665798ce9dd857f   Ready    node            42m   v1.24.10   172.30.54.137   13.125.115.198   Ubuntu 20.04.5 LTS   5.15.0-1028-aws   containerd://1.6.10\n")),(0,o.kt)("p",null,"kubectl cli \ud50c\ub7ec\uadf8\uc778 \ub9e4\ub2c8\uc800\uc778 \ucfe0\ubc84\ub124\ud2f0\uc2a4 ",(0,o.kt)("inlineCode",{parentName:"p"},"krew"),"\ub97c \uc124\uce58\ud558\uace0 \uc5ec\ub7ec\uac00\uc9c0 \ub3c4\uad6c\ub97c \uc124\uce58\ud55c\ub2e4. \uc124\uce58\ub418\ub294 \ud50c\ub7ec\uadf8\uc778 \ub9d0\uace0\ub3c4 \ub2e4\uc591\ud55c \ud50c\ub7ec\uadf8\uc778\ub4e4\uc740 \uc544\ub798 \ub9c1\ud06c\uc5d0\uc11c \ud655\uc778\uc774 \uac00\ub2a5\ud558\ub2e4."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://krew.sigs.k8s.io/plugins/"},"https://krew.sigs.k8s.io/plugins/"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl krew install ctx ns df-pv get-all ktop neat oomd view-secret\n")),(0,o.kt)("h2",{id:"add-on-\uad6c\uc131"},"Add-on \uad6c\uc131"),(0,o.kt)("p",null,"ExternalDNS\uc640 \uac19\uc740 add-on\uc744 \uad6c\uc131\ud558\uace0 Kubernetes \uc11c\ube44\uc2a4 \ub610\ub294 \uc778\uadf8\ub808\uc2a4 \uc0dd\uc131 \uc2dc \ub3c4\uba54\uc778\uc744 \uc124\uc815\ud558\uba74, AWS(Route 53)\uc640 \uac19\uc740 \ud074\ub77c\uc6b0\ub4dc DNS \uc11c\ube44\uc2a4\uc5d0\uc11c A \ub808\ucf54\ub4dc(TXT \ub808\ucf54\ub4dc)\ub97c \uc790\ub3d9 \uc0dd\uc131/\uc0ad\uc81c\ud560 \uc218 \uc788\ub2e4. Route53\uc5d0\uc11c \ub3d9\uc791\uc744 \uc704\ud574 \ub2e4\uc74c\uacfc \uac19\uc740 IAM Policy\uac00 \ud544\uc694\ud558\ub2e4.  "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": [\n        "route53:ChangeResourceRecordSets"\n      ],\n      "Resource": [\n        "arn:aws:route53:::hostedzone/*"\n      ]\n    },\n    {\n      "Effect": "Allow",\n      "Action": [\n        "route53:ListHostedZones",\n        "route53:ListResourceRecordSets"\n      ],\n      "Resource": [\n        "*"\n      ]\n    }\n  ]\n}\n')),(0,o.kt)("p",null,"\ud574\ub2f9 json\uc73c\ub85c IAM Policy\ub97c \uc0dd\uc131\ud558\uace0 master, worker \ub178\ub4dc instance profile\uc5d0 \ucd94\uac00\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"aws iam create-policy --policy-name AllowExternalDNSUpdates --policy-document file://externaldns-aws-r53-policy.json\n\nexport ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)\n\naws iam attach-role-policy --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/AllowExternalDNSUpdates --role-name masters.$KOPS_CLUSTER_NAME\n\naws iam attach-role-policy --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/AllowExternalDNSUpdates --role-name nodes.$KOPS_CLUSTER_NAME\n")),(0,o.kt)("p",null,"\uc774 \uc0c1\ud0dc\uc5d0\uc11c ",(0,o.kt)("inlineCode",{parentName:"p"},"externalDNS"),"\ub97c \uad6c\uc131\ud55c\ub2e4.  ",(0,o.kt)("inlineCode",{parentName:"p"},"externalDNS")," \uc640 \uac19\uc740 \uc5ec\ub7ec \uc560\ub4dc\uc628\ub4e4\uc740 kOps\uc640 \ucfe0\ubc84\ub124\ud2f0\uc2a4 \ub77c\uc774\ud504\uc0ac\uc774\ud074\uc5d0 \ub530\ub77c \uad6c\uc131, \uad00\ub9ac\ub41c\ub2e4. \uae30\ubcf8\uc801\uc73c\ub85c API \uc11c\ubc84\ub294 \uba54\ud2b8\ub9ad \uc11c\ubc84 TLS \uc778\uc99d\uc11c\ub97c \ud655\uc778\ud558\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 TLS\ub97c \uc0ac\uc6a9\ud558\ub824\uba74 \ud074\ub7ec\uc2a4\ud130 spec\uc5d0\uc11c ",(0,o.kt)("inlineCode",{parentName:"p"},"certManager"),"\ub3c4 \uac19\uc774 \ucd94\uac00\ud55c\ub2e4. \ub610\ud55c HPA \uad6c\uc131\uc744 \uc704\ud574 ",(0,o.kt)("inlineCode",{parentName:"p"},"metricServer")," \ub3c4 \uad6c\uc131\uc744 \uc9c4\ud589\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"$ kops edit cluster\n...\nspec:\n  certManager:\n    enabled: true\n  externalDns:\n    provider: external-dns\n  metricsServer:\n    enabled: true\n    insecure: false\n...\n\n$ kops update cluster --yes && echo && sleep 3 && kops rolling-update cluster --yes\n")),(0,o.kt)("p",null,"\uc77c\ub2e8 php-apache deployment\ub97c \uc2dc\uc791\ud55c\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: php-apache\nspec:\n  selector:\n    matchLabels:\n      run: php-apache\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        run: php-apache\n    spec:\n      containers:\n      - name: php-apache\n        image: registry.k8s.io/hpa-example\n        ports:\n        - containerPort: 80\n        resources:\n          limits:\n            cpu: 500m\n          requests:\n            cpu: 200m\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: php-apache\n  labels:\n    run: php-apache\nspec:\n  ports:\n  - port: 80\n  selector:\n    run: php-apache\n  type: LoadBalancer\n")),(0,o.kt)("p",null,"\ubc14\ub85c HPA \ud14c\uc2a4\ud2b8\ub97c \uc704\ud574 \uac04\ub2e8\ud558\uac8c \uc0ac\uc6a9\ub960\uc744 \uae30\ubc18\uc73c\ub85c \uc2a4\ucf00\uc77c\ub9c1\uc774 \ub3d9\uc791\ud558\ub3c4\ub85d \uad6c\uc131\ud558\uace0 CPU \ub85c\ub4dc\ub97c \uc8fc\uc785\ud55c\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"load-generator"),"\uc5d0\uc11c\ub294 0.01\ucd08 \ub2e8\uc704\ub85c \ub9ac\ud018\uc2a4\ud2b8\ub97c \ubcf4\ub0b4\uac8c \ub41c\ub2e4. "),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/"},"https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ kubectl autoscale deployment php-apache --cpu-percent=10 --min=1 --max=4\n\n$ kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"\nIf you don\'t see a command prompt, try pressing enter.\nOK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!\n')),(0,o.kt)("p",null,"\ub2e4\uc74c\uc73c\ub85c, HPA\uac00 \ubd80\ud558 \uc99d\uac00\uc5d0 \uc5b4\ub5bb\uac8c \ubc18\uc751\ud558\ub294\uc9c0 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl get hpa php-apache --watch\nNAME         REFERENCE               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE\nphp-apache   Deployment/php-apache   93%/10%   1         4         4          1m\n")),(0,o.kt)("p",null,"\ub9c8\uc9c0\ub9c9\uc73c\ub85c CLB\uc5d0 ExternalDNS\ub85c \ub3c4\uba54\uc778 \uc5f0\uacb0\uc744 \ud558\uae30 \uc704\ud574\uc11c\ub294 expose\ub97c \uc6d0\ud558\ub294 Service\uc5d0 \ub2e4\uc74c\uacfc \uac19\uc774 annotation\uc744 \ucd94\uac00\ud558\ub294 \ubc29\ubc95\uc73c\ub85c \uc678\ubd80 \ub3c4\uba54\uc778\uc744 \uc27d\uac8c \uc5f0\uacb0\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ kubectl annotate service nginx "external-dns.alpha.kubernetes.io/hostname=nginx.$KOPS_CLUSTER_NAME"\n')),(0,o.kt)("h2",{id:"\uc815\ub9ac"},"\uc815\ub9ac"),(0,o.kt)("p",null,"\ud56d\uc0c1 EKS\ub9cc \ud65c\uc6a9\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\ub97c \uc9c4\ud589\ud558\ub2e4\ubcf4\ub2c8 \uc2a4\ud130\ub514 \ud6c4\uc5d0 \uc624\ub79c\ub9cc\uc5d0 \uc9c1\uc811 \uad6c\uc131\ud558\ub294 \uacbd\ud5d8\uc744 \ud574\ubcf4\ub2c8 \ud2b8\ub7ec\ube14\uc288\ud305\ud558\ub294 \uc7ac\ubbf8\uac00 \uc788\uc5b4\uc11c \uc88b\uc740\uac83 \uac19\ub2e4. \uc774\ub7f0\uc800\ub7f0 add-on\uc744 \ucd94\uac00\uc801\uc73c\ub85c \uad6c\uc131\ud574\uc11c \ub354 \ud574\ubcf4\uace0 \uc2f6\uc9c0\ub9cc \uc5ed\uc2dc\ub098 \uc2dc\uac04\uc774 \uc5c6\ub294 \uad00\uacc4\ub85c \uc77c\ub2e8 \uc5ec\uae30 \uae4c\uc9c0 \uad6c\uc131\uc744 \ud558\uace0 \uc774\ubc88\uc5d0 \uc124\uce58\ud55c Cloud9\uc73c\ub85c \ubc30\ud3ec\ub418\ub294 \ud074\ub7ec\uc2a4\ud130 \uad6c\uc131\uc740 CKS\ub97c \uc900\ube44\ud558\uace0 \ud300 \ub0b4\ubd80 \uc138\uc158\uc744 \uc9c4\ud589\ud558\ub294 \ub3c4\uad6c\ub85c \ud65c\uc6a9\uc744 \ud574\ubcfc \uc608\uc815\uc774\ub2e4."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\ud574\ub2f9 \ud3ec\uc2a4\ud305\uc740 \ud604\uc7ac \uc7ac\uc9c1\uc911\uc778 \ud68c\uc0ac\uc5d0 \uad00\ub828\uc774 \uc5c6\uace0, \uac1c\uc778 \uc5ed\ub7c9 \uac1c\ubc1c\uc744 \uc704\ud55c \uc790\ub8cc\ub85c \ud65c\uc6a9\ud560 \uc608\uc815\uc785\ub2c8\ub2e4.")))}m.isMDXComponent=!0},2494:function(e,n,t){n.Z=t.p+"assets/images/cloud9_credential-0a221243d5537b39c35d0b070bde7ef8.png"}}]);