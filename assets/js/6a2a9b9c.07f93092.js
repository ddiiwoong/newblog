"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[4909],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return d}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),i=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},c=function(e){var n=i(e.components);return r.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=i(t),d=a,k=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return t?r.createElement(k,p(p({ref:n},c),{},{components:t})):r.createElement(k,p({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,p[1]=s;for(var i=2;i<o;i++)p[i]=t[i];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},54910:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return i},toc:function(){return m}});var r=t(87462),a=t(63366),o=(t(67294),t(3905)),p=["components"],s={layout:"single",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",comments:!0,classes:"wide",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kenrelhardening/",date:new Date("2024-08-31T00:00:00.000Z"),categories:["Kubernetes"],tags:["Kubernetes","AppArmor","seccomp","security","CKS"]},l="\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9",i={permalink:"/kubernetes/kenrelhardening/",editUrl:"https://github.com/ddiiwoong/newblog/tree/main/blog/2024-08-31-kernelhardening.md",source:"@site/blog/2024-08-31-kernelhardening.md",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",date:"2024-08-31T00:00:00.000Z",formattedDate:"August 31, 2024",tags:[{label:"Kubernetes",permalink:"/tags/kubernetes"},{label:"AppArmor",permalink:"/tags/app-armor"},{label:"seccomp",permalink:"/tags/seccomp"},{label:"security",permalink:"/tags/security"},{label:"CKS",permalink:"/tags/cks"}],readingTime:15.935,truncated:!1,authors:[{name:"Jinwoong Kim",title:"Technologist and Cloud Consultant",url:"https://www.linkedin.com/in/ddiiwoong/",imageURL:"https://s.gravatar.com/avatar/e8bfebcbeacb5b9a0c90614e792febf2?s=80",key:"jinwoong"}],frontMatter:{layout:"single",title:"\ucee4\ub110 \uac15\ud654 \ub3c4\uad6c \uc0ac\uc6a9\ud558\uae30",comments:!0,classes:"wide",description:"AppArmor\uc640 seccomp\ub97c \uc0ac\uc6a9\ud55c \ucee4\ub110 \uac15\ud654",authors:"jinwoong",toc:!0,toc_label:"Table of Contents",slug:"kubernetes/kenrelhardening/",date:"2024-08-31T00:00:00.000Z",categories:["Kubernetes"],tags:["Kubernetes","AppArmor","seccomp","security","CKS"]},nextItem:{title:"prometheus grafana \uc2a4\ud0dd\uc73c\ub85c k6 \ud14c\uc2a4\ud2b8 \uacb0\uacfc \ud655\uc778\ud558\uae30",permalink:"/kubernetes/k6-prometheus/"}},c={authorsImageUrls:[void 0]},m=[{value:"AppArmor",id:"apparmor",level:2},{value:"\ud504\ub85c\ud30c\uc77c(profile) \uc774\ud574",id:"\ud504\ub85c\ud30c\uc77cprofile-\uc774\ud574",level:3},{value:"Enforce",id:"enforce",level:4},{value:"Complain",id:"complain",level:4},{value:"\uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544 \uc124\uc815",id:"\uc0ac\uc6a9\uc790-\uc9c0\uc815-\ud504\ub85c\ud544-\uc124\uc815",level:3},{value:"\ucee8\ud14c\uc774\ub108\uc5d0 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30",id:"\ucee8\ud14c\uc774\ub108\uc5d0-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30",level:3},{value:"Seccomp \uc0ac\uc6a9",id:"seccomp-\uc0ac\uc6a9",level:2},{value:"\ucee8\ud14c\uc774\ub108\uc5d0 \uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30",id:"\ucee8\ud14c\uc774\ub108\uc5d0-\uae30\ubcf8-\ucee8\ud14c\uc774\ub108-\ub7f0\ud0c0\uc784-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30",level:3},{value:"\uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544 \uc124\uc815",id:"\uc0ac\uc6a9\uc790-\uc9c0\uc815-\ud504\ub85c\ud544-\uc124\uc815-1",level:3},{value:"\ucee8\ud14c\uc774\ub108\uc5d0 \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30",id:"\ucee8\ud14c\uc774\ub108\uc5d0-\uc0ac\uc6a9\uc790-\uc815\uc758-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30",level:3},{value:"\uc694\uc57d",id:"\uc694\uc57d",level:2}],u={toc:m};function d(e){var n=e.components,t=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\ucee8\ud14c\uc774\ub108 \ub0b4\ubd80\uc5d0\uc11c \uc2e4\ud589 \uc911\uc778 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774\ub098 \ud504\ub85c\uc138\uc2a4\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c(system call)\uc744 \uc218\ud589\ud560 \uc218 \uc788\ub2e4. \ub300\ud45c\uc801\uc778 \uc608\ub85c HTTP \uc694\uccad\uc744 \uc218\ud589\ud558\ub294 curl \uba85\ub839\uc744 \ub4e4 \uc218 \uc788\ub2e4. \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc740 \ucee4\ub110\uc5d0 \uc11c\ube44\uc2a4\ub97c \uc694\uccad\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\uc790 \uacf5\uac04\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ucd94\uc0c1\ud654\ub41c \ud504\ub85c\uadf8\ub798\ubc0d\uc778\ub370, \ucee4\ub110 \uac15\ud654 \ub3c4\uad6c\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud5c8\uc6a9\ub418\ub294 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\uc73c\uba70, CKS \uc2dc\ud5d8\uc5d0\uc11c\ub294 AppArmor\uc640 seccomp\ub77c\ub294 \ub450 \uac00\uc9c0 \ub3c4\uad6c\ub97c \uba85\uc2dc\uc801\uc73c\ub85c \uc5b8\uae09\ud558\uace0 \uc788\ub2e4. \uc774 \ub450 \ub3c4\uad6c\ub294 \ucee8\ud14c\uc774\ub108\ud654\ub41c \ud658\uacbd\uc5d0\uc11c \ubcf4\uc548\uc744 \uac15\ud654\ud558\ub294 \ub370 \uc911\uc694\ud55c \uc5ed\ud560\uc744 \ud558\uba70, Kubernetes\uc640\uc758 \ud1b5\ud569\uc744 \ud1b5\ud574 \ubcf4\ub2e4 \uc548\uc804\ud55c \ud074\ub7ec\uc2a4\ud130 \uc6b4\uc601\uc744 \uc9c0\uc6d0\ud55c\ub2e4. \uc774 \ub450 \ub3c4\uad6c\uc640 \ucfe0\ubc84\ub124\ud2f0\uc2a4\uc640 \ud1b5\ud569\ud558\ub294 \uba54\ucee4\ub2c8\uc998\uc5d0 \ub300\ud574 \uc124\uba85\ud55c\ub2e4."),(0,o.kt)("h2",{id:"apparmor"},"AppArmor"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://apparmor.net/"},"AppArmor"),"\ub294 Linux \uc2dc\uc2a4\ud15c\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ud504\ub85c\uadf8\ub7a8\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4 \uc81c\uc5b4 \uae30\ub2a5\uc744 \uc81c\uacf5\ud55c\ub2e4. AppArmor\ub294 \uacbd\ub85c \uae30\ubc18\uc73c\ub85c \uc791\ub3d9\ud558\uba70, \ud504\ub85c\ud544\uc744 \ud1b5\ud574 \ud2b9\uc815 \ud504\ub85c\uadf8\ub7a8\uc774\ub098 \ucee8\ud14c\uc774\ub108\uac00 \ud544\uc694\ud55c \uc811\uadfc\ub9cc \ud5c8\uc6a9\ud558\ub3c4\ub85d \uc124\uc815\ud560 \uc218 \uc788\ub2e4. Kubernetes\uc5d0\uc11c\ub294 AppArmor \ud504\ub85c\ud544\uc744 Pod \ub610\ub294 \ucee8\ud14c\uc774\ub108 \uc218\uc900\uc5d0\uc11c \uc9c0\uc815\ud560 \uc218 \uc788\uc73c\uba70, securityContext\ub97c \ud1b5\ud574 \uc801\uc6a9\ud55c\ub2e4. \uc774 \ub3c4\uad6c\ub294 user space\uc5d0\uc11c \ud638\ucd9c\ub418\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uacfc \uae30\ubcf8 \uc2dc\uc2a4\ud15c \uae30\ub2a5 \uc0ac\uc774\uc5d0 \ucd94\uac00\uc801\uc778 \ubcf4\uc548 \uacc4\uce35\uc744 \uad6c\ud604\ud55c\ub2e4. \ub124\ud2b8\uc6cc\ud06c \ud638\ucd9c \ub610\ub294 \ud30c\uc77c \uc2dc\uc2a4\ud15c \uc0c1\ud638 \uc791\uc6a9\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\ub2e4. \ub9ce\uc740 Linux \ubc30\ud3ec\ud310(\uc608: Debian, Ubuntu, openSUSE)\uc774 AppArmor\ub97c \uae30\ubcf8\uc73c\ub85c \uc81c\uacf5\ud55c\ub2e4. AppArmor\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 Amazon Linux\uc640 \uac19\uc740 \ubc30\ud3ec\ud310\uc740 AppArmor\uc640 \uc720\uc0ac\ud55c \uc811\uadfc \ubc29\uc2dd\uc744 \ucde8\ud558\ub294 ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Security-Enhanced_Linux"},"SELinux"),"\ub97c \ub300\uc2e0 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4.  "),(0,o.kt)("h3",{id:"\ud504\ub85c\ud30c\uc77cprofile-\uc774\ud574"},"\ud504\ub85c\ud30c\uc77c(profile) \uc774\ud574"),(0,o.kt)("p",null,"\ud504\ub85c\uadf8\ub7a8\uc774 \uc218\ud589\ud560 \uc218 \uc788\ub294 \uc791\uc5c5\uacfc \uc218\ud589\ud560 \uc218 \uc5c6\ub294 \uc791\uc5c5\uc744 \uc815\uc758\ud558\ub294 \uaddc\uce59\uc740 AppArmor \ud504\ub85c\ud544\uc5d0 \uc815\uc758\ub41c\ub2e4. \ubaa8\ub4e0 \ud504\ub85c\ud544\uc744 \uc801\uc6a9\ud558\ub824\uba74 \uba3c\uc800 AppArmor\uc5d0 \ub85c\ub4dc\ud574\uc57c \ud55c\ub2e4. AppArmor\ub294 \ub85c\ub4dc\ub41c \ud504\ub85c\ud30c\uc77c\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub294 \uba85\ub839\uc904 \ub3c4\uad6c\ub97c \uc81c\uacf5\ud55c\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"aa-status")," \uba85\ub839\uc744 \uc2e4\ud589\ud558\uba74 \ub85c\ub4dc\ub41c \ubaa8\ub4e0 \ud504\ub85c\ud30c\uc77c\uc758 \uc694\uc57d\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. AppArmor\uc5d0\ub294 Linux \uc11c\ube44\uc2a4\ub97c \ubcf4\ud638\ud558\uae30 \uc704\ud55c \uae30\ubcf8 \uc560\ud50c\ub9ac\ucf00\uc774\uc158 \ud504\ub85c\ud30c\uc77c \uc138\ud2b8\uac00 \uc774\ubbf8 \ud3ec\ud568\ub418\uc5b4 \uc788\uc74c\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ sudo aa-status\napparmor module is loaded.\n43 profiles are loaded.\n41 profiles are in enforce mode.\n   /snap/snapd/21759/usr/lib/snapd/snap-confine\n   ...\n2 profiles are in complain mode.\n   snap.amazon-ssm-agent.amazon-ssm-agent\n   snap.amazon-ssm-agent.ssm-cli\n0 profiles are in kill mode.\n0 profiles are in unconfined mode.\n9 processes have profiles defined.\n2 processes are in enforce mode.\n   /usr/sbin/chronyd (429)\n   /usr/sbin/chronyd (434)\n7 processes are in complain mode.\n   /snap/amazon-ssm-agent/7993/amazon-ssm-agent (104231) snap.amazon-ssm-agent.amazon-ssm-agent\n   /snap/amazon-ssm-agent/7993/ssm-agent-worker (104261) snap.amazon-ssm-agent.amazon-ssm-agent\n   /snap/amazon-ssm-agent/7993/ssm-session-worker (138449) snap.amazon-ssm-agent.amazon-ssm-agent\n   /usr/bin/dash (138466) snap.amazon-ssm-agent.amazon-ssm-agent\n   /usr/bin/sudo (138468) snap.amazon-ssm-agent.amazon-ssm-agent\n   /usr/bin/sudo (138469) snap.amazon-ssm-agent.amazon-ssm-agent\n   /usr/sbin/aa-status (138470) snap.amazon-ssm-agent.amazon-ssm-agent\n0 processes are unconfined but have a profile defined.\n0 processes are in mixed mode.\n0 processes are in kill mode.\n")),(0,o.kt)("p",null,"\ud504\ub85c\ud30c\uc77c \ubaa8\ub4dc\ub294 \uc77c\uce58\ud558\ub294 \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud560 \uacbd\uc6b0 \ub7f0\ud0c0\uc784\uc5d0 \uaddc\uce59\uc758 \ucc98\ub9ac\ub97c \uacb0\uc815\ud55c\ub2e4. AppArmor\ub294 \ub450 \uac00\uc9c0 \uc720\ud615\uc758 \ud504\ub85c\ud544 \ubaa8\ub4dc\ub97c \uad6c\ubd84\ud55c\ub2e4."),(0,o.kt)("h4",{id:"enforce"},"Enforce"),(0,o.kt)("p",null,"\uc2dc\uc2a4\ud15c\uc774 \uaddc\uce59\uc744 \uc801\uc6a9\ud558\uace0 \uc704\ubc18\uc744 \ub9ac\ud3ec\ud2b8\ud558\uace0 \uc2dc\uc2a4\ud15c \ub85c\uadf8\uc5d0 \uae30\ub85d\ud55c\ub2e4. \uc774 \ubaa8\ub4dc\ub97c \uc0ac\uc6a9\ud558\uba74 \ud504\ub85c\uadf8\ub7a8\uc774 \ud2b9\uc815 \ud638\ucd9c\uc744 \ud558\uc9c0 \ubabb\ud558\ub3c4\ub85d \ubc29\uc9c0\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("h4",{id:"complain"},"Complain"),(0,o.kt)("p",null,"\uc2dc\uc2a4\ud15c\uc5d0\uc11c \uaddc\uce59\uc744 \uc801\uc6a9\ud558\uc9c0\ub294 \uc54a\uc9c0\ub9cc \uc704\ubc18 \uc0ac\ud56d\uc744 \ub85c\uadf8\uc5d0 \uae30\ub85d\ud55c\ub2e4. \uc774 \ubaa8\ub4dc\ub294 \ud504\ub85c\uadf8\ub7a8\uc758 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \ubc1c\uacac\ud558\ub824\ub294 \uacbd\uc6b0\uc5d0 \uc720\uc6a9\ud558\ub2e4."),(0,o.kt)("p",null,"\uc544\ub798 \ud504\ub85c\ud30c\uc77c\uc740 \ud30c\uc77c \uc4f0\uae30 \uc561\uc138\uc2a4\ub97c \uc81c\ud55c\ud558\uae30 \uc704\ud574 k8s-deny-write \ud30c\uc77c\uc5d0 \uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544\uc744 \uc815\uc758\ud558\ub294 \ubd80\ubd84\uc774\ub2e4. \ud574\ub2f9 \ud30c\uc77c\uc740 \uc6cc\ud06c\ub85c\ub4dc\ub97c \uc2e4\ud589\ud558\ub294 \ubaa8\ub4e0 \uc6cc\ucee4 \ub178\ub4dc\uc758 /etc/apparmor.d \ub514\ub809\ud130\ub9ac\uc5d0 \ubc30\uce58\ud574\uc57c \ud55c\ub2e4. \uc790\uc138\ud55c \ubb38\ubc95\uc740 ",(0,o.kt)("a",{parentName:"p",href:"https://gitlab.com/apparmor/apparmor/-/wikis/QuickProfileLanguage"},"AppArmor")," \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc790."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"#include <tunables/global>\n\nprofile k8s-deny-write flags=(attach_disconnected) { //profile \ud0a4\uc6cc\ub4dc \ub4a4\uc758 \uc2dd\ubcc4\uc790\ub294 \ud504\ub85c\ud544\uc758 \uc774\ub984\uc774\ub2e4.\n  #include <abstractions/base> \n  file, //\ud30c\uc77c \uc791\uc5c5\uc5d0 \uc801\uc6a9\ud55c\ub2e4.\n  deny /** w, //\ubaa8\ub4e0 \ud30c\uc77c \uc4f0\uae30\ub97c \uac70\ubd80\ud55c\ub2e4.\n}\n")),(0,o.kt)("h3",{id:"\uc0ac\uc6a9\uc790-\uc9c0\uc815-\ud504\ub85c\ud544-\uc124\uc815"},"\uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544 \uc124\uc815"),(0,o.kt)("p",null,"AppArmor\uc5d0 \ud504\ub85c\ud30c\uc77c\uc744 \ub85c\ub4dc\ud558\ub824\uba74 \uc6cc\ucee4 \ub178\ub4dc\uc5d0\uc11c \ub2e4\uc74c \uba85\ub839\uc744 \uc2e4\ud589\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo apparmor_parser /etc/apparmor.d/k8s-deny-write\n")),(0,o.kt)("p",null,"\ud574\ub2f9 \uba85\ub839\uc740 \uae30\ubcf8\uc801\uc73c\ub85c ",(0,o.kt)("inlineCode",{parentName:"p"},"Enforce")," \ubaa8\ub4dc\ub97c \uc0ac\uc6a9\ud55c\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"Complain")," \ubaa8\ub4dc\uc5d0\uc11c \ud504\ub85c\ud30c\uc77c\uc744 \ub85c\ub4dc\ud558\ub824\uba74 -C \uc635\uc158\uc744 \uc0ac\uc6a9\ud55c\ub2e4. \ub2e4\uc2dc aa-status \uba85\ub839\uc744 \uc218\ud589\ud558\uba74 \uae30\ubcf8 \ud504\ub85c\ud544\uacfc \ud568\uaed8 \ud504\ub85c\ud544\uc744 \ubcf4\uc5ec\uc900\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"Enforce")," \ubaa8\ub4dc\ub97c \uc0ac\uc6a9\ud558\ub294 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ sudo aa-status\napparmor module is loaded.\n49 profiles are loaded.\n45 profiles are in enforce mode.\n   ...\n   docker-default\n   k8s-deny-write\n   ...\n")),(0,o.kt)("p",null,"AppArmor\ub294 \uc720\ud2f8\ub9ac\ud2f0 \ud328\ud0a4\uc9c0\uc758 \uc77c\ubd80\ub85c \ucd94\uac00 \uba85\ub839\uc744 \uc9c0\uc6d0\ud558\ub294 \ub3c4\uad6c\ub97c \uc124\uce58 \ud560 \uc218 \uc788\ub2e4. \uc124\uce58\uac00 \uc644\ub8cc\ub418\uba74 aa-enforce \uba85\ub839\uc744 \uc0ac\uc6a9\ud558\uc5ec ",(0,o.kt)("inlineCode",{parentName:"p"},"Enforce")," \ubaa8\ub4dc\uc5d0\uc11c \ud504\ub85c\ud544\uc744 \ub85c\ub4dc\ud558\uace0 aa-complain \uba85\ub839\uc744 \uc0ac\uc6a9\ud558\uc5ec ",(0,o.kt)("inlineCode",{parentName:"p"},"Complain")," \ubaa8\ub4dc\uc5d0\uc11c \ud504\ub85c\ud544\uc744 \ub85c\ub4dc\ud560 \uc218 \uc788\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo apt-get update\nsudo apt-get install apparmor-utils\n")),(0,o.kt)("h3",{id:"\ucee8\ud14c\uc774\ub108\uc5d0-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30"},"\ucee8\ud14c\uc774\ub108\uc5d0 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30"),(0,o.kt)("p",null,"\ud30c\ub4dc\uc5d0 AppArmor \uaddc\uce59\uc744 \uc801\uc6a9\ud558\uae30 \uc804\uc5d0 \ub2e4\uc74c\uacfc \uac19\uc740 \uc804\uc81c\uc870\uac74\uc744 \ud655\uc778\ud574\uc57c \ud55c\ub2e4. "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \uc9c0\uc6d0: AppArmor \uaddc\uce59\uc744 \uc801\uc6a9\ud558\ub824\uba74 \uc0ac\uc6a9 \uc911\uc778 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784\uc774 AppArmor\ub97c \uc9c0\uc6d0\ud574\uc57c \ud55c\ub2e4. Docker\uc640 \uac19\uc740 \ub300\ubd80\ubd84\uc758 \ud604\ub300\uc801\uc778 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784\uc740 AppArmor\ub97c \uc9c0\uc6d0\ud55c\ub2e4."),(0,o.kt)("li",{parentName:"ul"},"\uc6cc\ucee4 \ub178\ub4dc\uc5d0 AppArmor \uc124\uce58: AppArmor\uac00 \uc81c\ub300\ub85c \uc791\ub3d9\ud558\ub824\uba74 \ud30c\ub4dc\ub97c \uc2e4\ud589\ud558\ub294 \ubaa8\ub4e0 \uc6cc\ucee4 \ub178\ub4dc\uc5d0 AppArmor\uac00 \uc124\uce58\ub418\uc5b4 \uc788\uc5b4\uc57c \ud55c\ub2e4."),(0,o.kt)("li",{parentName:"ul"},"\ud504\ub85c\ud30c\uc77c \ub85c\ub4dc \ud655\uc778: AppArmor \ud504\ub85c\ud30c\uc77c\uc774 \uc2dc\uc2a4\ud15c\uc5d0 \ub85c\ub4dc\ub418\uc5b4 \uc788\ub294\uc9c0 \ud655\uc778\ud574\uc57c \ud55c\ub2e4. ")),(0,o.kt)("p",null,"\ucee8\ud14c\uc774\ub108\uc5d0 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud558\ub824\uba74 \uc544\ub798 \uc608\uc2dc yaml \ud30c\uc77c\uacfc \uac19\uc774 \ud2b9\uc815 \uc5b4\ub178\ud14c\uc774\uc158\uc744 \uc124\uc815\ud574\uc57c \ud55c\ub2e4. \uc5b4\ub178\ud14c\uc774\uc158 \ud0a4\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"container.apparmor.security.beta. kubernetes.io/<\ucee8\ud14c\uc774\ub108 \uc774\ub984>")," \ud615\uc2dd\uc758 \ud0a4\ub97c \uc0ac\uc6a9\ud574\uc57c \ud55c\ub2e4. \uc774 \uacbd\uc6b0 \ucee8\ud14c\uc774\ub108 \uc774\ub984\uc740 ",(0,o.kt)("inlineCode",{parentName:"p"},"test"),"\uc774\ub2e4. \uc804\uccb4 \ud0a4\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"container.apparmor.security.beta.kubernetes.io/test"),"\uc774\ub2e4. \uc5b4\ub178\ud14c\uc774\uc158\uc758 \uac12\uc740 localhost/<\ud504\ub85c\ud544 \uc774\ub984> \ud328\ud134\uc744 \ub530\ub978\ub2e4. \uc5ec\uae30\uc11c \uc0ac\uc6a9\ud558\ub824\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c\uc740 k8s-deny-write\uc774\ub2e4. \uad6c\uc131 \uc635\uc158\uc5d0 \ub300\ud55c \uc790\uc138\ud55c \ub0b4\uc6a9\uc740 ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tutorials/security/apparmor/"},"\ucfe0\ubc84\ub124\ud2f0\uc2a4 \ubb38\uc11c"),"\ub97c \ucc38\uc870\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: test-apparmor\n  annotations:\n    container.apparmor.security.beta.kubernetes.io/test: localhost/k8s-deny-write \nspec:\n  containers:\n  - name: test\n    image: busybox:1.28\n    command: ["sh", "-c", "echo \'Test AppArmor!\' && sleep 100h"]\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"kubectl apply")," \uba85\ub839\uc744 \uc2e4\ud589\ud558\uace0 \ud30c\ub4dc\uac00 \u201c",(0,o.kt)("inlineCode",{parentName:"p"},"Running"),"\u201d \uc0c1\ud0dc\ub85c \uc804\ud658\ub420 \ub54c\uae4c\uc9c0 \uae30\ub2e4\ub9b0\ub2e4:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl apply -f apparmor.yaml\npod/test-apparmor created\n\n$ kubectl get pod test-apparmor\nNAME             READY   STATUS    RESTARTS   AGE\ntest-apparmor   1/1     Running   0          4s\n")),(0,o.kt)("p",null,"\uc774\uc81c \ucee8\ud14c\uc774\ub108\uc5d0 \uc178\uc744 \ub123\uace0 \ud30c\uc77c \uc4f0\uae30 \uc791\uc5c5\uc744 \uc218\ud589\ud560 \uc218 \uc788\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl exec -it test-apparmor -- /bin/sh\n/ # touch test.txt\ntouch: test.txt: Permission denied\n")),(0,o.kt)("p",null,"AppArmor\ub294 \ucee8\ud14c\uc774\ub108\uc758 \ud30c\uc77c\uc2dc\uc2a4\ud15c\uc5d0 \ud30c\uc77c\uc744 \uc4f0\uc9c0 \ubabb\ud558\uac8c \ud55c\ub2e4. \uc791\uc5c5\uc744 \uc218\ud589\ud558\ub824\uace0 \ud558\uba74 \u201cPermission denied\u201d\ub77c\ub294 \uba54\uc2dc\uc9c0\uac00 \ud45c\uc2dc\ub41c\ub2e4."),(0,o.kt)("h2",{id:"seccomp-\uc0ac\uc6a9"},"Seccomp \uc0ac\uc6a9"),(0,o.kt)("p",null,'Seccomp\ub294 Linux \ucee4\ub110\uc758 \ubcf4\uc548 \uae30\ub2a5\uc73c\ub85c, "Secure Computing Mode"\uc758 \uc904\uc784\ub9d0\uc774\ub2e4. seccomp\ub294 user space\uc5d0\uc11c \ucee4\ub110\ub85c\uc758 \ud638\ucd9c\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\ub294 \ub610 \ub2e4\ub978 Linux \ucee4\ub110 \uae30\ub2a5\uc774\ub2e4. seccomp \ud504\ub85c\ud30c\uc77c\uc5d0 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uacfc \uadf8 \uc778\uc218\ub97c \uc81c\ud55c\ud558\ub294 \uaddc\uce59\uc744 \uc815\uc758\ud558\uac8c \ub41c\ub2e4. seccomp\ub97c \uc0ac\uc6a9\ud558\uba74 Linux \ucee4\ub110 \ucde8\uc57d\uc810\uc744 \uc545\uc6a9\ud560 \uc704\ud5d8\uc744 \uc904\uc77c \uc218 \uc788\ub2e4. Kubernetes\uc5d0\uc11c\ub294 seccomp \ud504\ub85c\ud544\uc744 Pod\uc758 securityContext\ub97c \ud1b5\ud574 \uc801\uc6a9\ud560 \uc218 \uc788\uace0, \uae30\ubcf8\uc801\uc73c\ub85c RuntimeDefault \ud504\ub85c\ud544\uc744 \uc0ac\uc6a9\ud558\uc5ec \ubcf4\uc548 \ubbfc\uac10\ub3c4\uac00 \ub192\uc740 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \ucc28\ub2e8\ud560 \uc218 \uc788\ub2e4. \ucfe0\ubc84\ub124\ud2f0\uc2a4\uc758 seccomp\uc5d0 \ub300\ud55c \uc790\uc138\ud55c \ub0b4\uc6a9\uc740 ',(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tutorials/security/seccomp/"},"\ucfe0\ubc84\ub124\ud2f0\uc2a4 \ubb38\uc11c"),"\ub97c \ucc38\uc870\ud55c\ub2e4."),(0,o.kt)("h3",{id:"\ucee8\ud14c\uc774\ub108\uc5d0-\uae30\ubcf8-\ucee8\ud14c\uc774\ub108-\ub7f0\ud0c0\uc784-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30"},"\ucee8\ud14c\uc774\ub108\uc5d0 \uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30"),(0,o.kt)("p",null,"\ub3c4\ucee4 \uc5d4\uc9c4\uc774\ub098 \ucee8\ud14c\uc774\ub108\uc640 \uac19\uc740 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784\uc740 \uae30\ubcf8 seccomp \ud504\ub85c\ud30c\uc77c\uacfc \ud568\uaed8 \uc81c\uacf5\ub41c\ub2e4. \uae30\ubcf8 seccomp \ud504\ub85c\ud30c\uc77c\uc740 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc5d0\uc11c \uac00\uc7a5 \uc77c\ubc18\uc801\uc73c\ub85c \uc0ac\uc6a9\ub418\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls"),"\uc744 \ud5c8\uc6a9\ud558\ub294 \ub3d9\uc2dc\uc5d0 \uc704\ud5d8\ud558\ub2e4\uace0 \uac04\uc8fc\ub418\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls"),"\uc758 \uc0ac\uc6a9\uc744 \uae08\uc9c0\ud55c\ub2e4. \ucfe0\ubc84\ub124\ud2f0\uc2a4\ub294 \ud30c\ub4dc\ub97c \uc0dd\uc131\ud560 \ub54c \uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c\uc744 \ucee8\ud14c\uc774\ub108\uc5d0 \uc801\uc6a9\ud558\uc9c0 \uc54a\uc9c0\ub9cc, SeccompDefault ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/"},"feature gate"),"\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc774\ub97c \ud65c\uc131\ud654\ud560 \uc218 \uc788\ub2e4. \ub610\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"spec.securityContext.seccompProfile"),"\uc744 \uc0ac\uc6a9\ud558\uc5ec seccomp \ud504\ub85c\ud30c\uc77c \uc720\ud615\uc744 ",(0,o.kt)("inlineCode",{parentName:"p"},"RuntimeDefault"),"\ub85c \uc124\uc815\ud558\uc5ec \ud30c\ub4dc \ub2e8\uc704\ub85c \uc774 \uae30\ub2a5\uc744 \uc120\ud0dd\ud560 \uc218 \uc788\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'apiVersion: v1 \nkind: Pod \nmetadata:\n  name: test-seccomp\nspec:\n  securityContext: \n    seccompProfile:\n      type: RuntimeDefault \n  containers:\n  - name: test\n    image: busybox:1.28\n    command: ["sh", "-c", "echo \'Test seccomp!\' && sleep 100h"]\n')),(0,o.kt)("p",null,"\uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl apply")," \uba85\ub839\uc744 \uc0ac\uc6a9\ud558\uc5ec \ud30c\ub4dc\ub97c \uc2dc\uc791\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl apply -f seccomp.yaml\npod/test-seccomp created\n\n$ kubectl get pod test-seccomp\nNAME            READY   STATUS      RESTARTS   AGE\nhello-seccomp   1/1     Running     0          4s\n")),(0,o.kt)("p",null,"\ucee8\ud14c\uc774\ub108\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"echo")," \uba85\ub839\uc740 \uae30\ubcf8 seccomp \ud504\ub85c\ud30c\uc77c\uc5d0 \uc758\ud574 \ubcf4\uc548 \uad00\uc810\uc5d0\uc11c \ubb38\uc81c\uac00 \uc5c6\ub294 \uac83\uc73c\ub85c \ubcf8\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl logs hello-seccomp\nTest seccomp!\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"RuntimeDefault"),"\ub85c ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls"),'\uc774 \ud5c8\uc6a9\ub418\uc5c8\uace0 \uadf8 \uacb0\uacfc \ud45c\uc900 \ucd9c\ub825\uc5d0 "Test seccomp!\u201d\ub77c\ub294 \uba54\uc2dc\uc9c0\ub97c \ubcfc \uc218 \uc788\ub2e4.'),(0,o.kt)("h3",{id:"\uc0ac\uc6a9\uc790-\uc9c0\uc815-\ud504\ub85c\ud544-\uc124\uc815-1"},"\uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544 \uc124\uc815"),(0,o.kt)("p",null,"\uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c \uc678\uc5d0 \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c\uc744 \uc0dd\uc131\ud558\uace0 \uc124\uc815\ud560 \uc218 \uc788\ub2e4. \uc774\ub7ec\ud55c \ud30c\uc77c\uc758 \ud45c\uc900 \ub514\ub809\ud130\ub9ac\ub294 ",(0,o.kt)("inlineCode",{parentName:"p"},"/var/lib/kubelet/seccomp"),"\uc774\ub2e4. \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c\uc740 \ud558\uc704 \ub514\ub809\ud130\ub9ac \ud504\ub85c\ud30c\uc77c\uc5d0 \uad6c\uc131\ud55c\ub2e4. \ub514\ub809\ud130\ub9ac\uac00 \uc5c6\ub294 \uacbd\uc6b0 \ub514\ub809\ud130\ub9ac\ub97c \uc0dd\uc131\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    sudo mkdir -p /var/lib/kubelet/seccomp/profiles\n")),(0,o.kt)("p",null,"\ud504\ub85c\ud544 \ub514\ub809\ud130\ub9ac\uc5d0 \uc788\ub294 violation.json \ud30c\uc77c\uc5d0 \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud544\uc744 \uc0dd\uc131\ud55c\ub2e4. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n    "defaultAction": "SCMP_ACT_ALLOW",\n    "architectures": [\n        "SCMP_ARCH_X86_64",\n        "SCMP_ARCH_X86",\n        "SCMP_ARCH_X32"\n    ],\n    "syscalls": [\n        {\n            "names": [\n                "mkdir"\n            ],\n            "action": "SCMP_ACT_ERRNO"\n        }\n    ]\n}\n')),(0,o.kt)("p",null,"\uac04\ub2e8\ud788 \ub9d0\ud574\uc11c, \uc774 \uaddc\uce59 \uc138\ud2b8\ub294 mkdir\uc758 \uc0ac\uc6a9\uc744 \ud5c8\uc6a9\ud558\uc9c0 \uc54a\ub294\ub2e4. \uc544\ub798 \uaddc\uce59\uc740 \ubaa8\ub4e0 ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls"),"\uc744 \ud5c8\uc6a9\ud558\uace0, ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls")," \ub9ac\uc2a4\ud2b8\uc5d0 \ud2b9\ubcc4\ud788 \uc815\uc758\ub41c \uac83\ub9cc \uac70\ubd80\ud558\ub294 \ube14\ub799\ub9ac\uc2a4\ud2b8 \ubc29\uc2dd\uc774\ub2e4. \ubc18\ub300\ub85c \ud654\uc774\ud2b8\ub9ac\uc2a4\ud2b8 \ubc29\uc2dd\uc740 ",(0,o.kt)("inlineCode",{parentName:"p"},"syscalls"),"\uc5d0 ",(0,o.kt)("inlineCode",{parentName:"p"},"SCMP_ACT_ALLOW"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"SCMP_ACT_ERRNO")," \uc704\uce58\ub97c \ubc14\uafd4\uc11c \uc0ac\uc6a9\ud558\uba74 \ub41c\ub2e4. "),(0,o.kt)("p",null,"\uae30\ubcf8 \uc870\uce58\ub294 \ubaa8\ub4e0 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc5d0 \uc801\uc6a9\ub429\ub2c8\ub2e4. \uc5ec\uae30\uc11c\ub294 \ube14\ub799\ub9ac\uc2a4\ud2b8 \ubc29\uc2dd\uc73c\ub85c ",(0,o.kt)("inlineCode",{parentName:"p"},"SCMP_ACT_ALLOW"),"\ub97c \uc0ac\uc6a9\ud558\ub294 \ubaa8\ub4e0 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \ud5c8\uc6a9\ud558\uace0, ",(0,o.kt)("inlineCode",{parentName:"p"},"SCMP_ACT_ERRNO")," \uc561\uc158\uc740 mkdir syscall\uc758 \uc2e4\ud589\uc744 \ubc29\uc9c0\ud558\ub3c4\ub85d \uaddc\uce59\uc744 \uc791\uc131\ud588\ub2e4. "),(0,o.kt)("p",null,"\uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c\uc744 /var/lib/kubelet/seccomp \ub514\ub809\ud130\ub9ac\uc5d0 \ubc30\uce58\ud574\ub3c4 \uc790\ub3d9\uc73c\ub85c \uaddc\uce59\uc774 \ud30c\ub4dc\uc5d0 \uc801\uc6a9\ub418\uc9c0\ub294 \uc54a\uae30 \ub54c\ubb38\uc5d0 \ud30c\ub4dc\uc5d0 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud574\uc57c \ud55c\ub2e4."),(0,o.kt)("h3",{id:"\ucee8\ud14c\uc774\ub108\uc5d0-\uc0ac\uc6a9\uc790-\uc815\uc758-\ud504\ub85c\ud30c\uc77c-\uc801\uc6a9\ud558\uae30"},"\ucee8\ud14c\uc774\ub108\uc5d0 \uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c \uc801\uc6a9\ud558\uae30"),(0,o.kt)("p",null,"\uc0ac\uc6a9\uc790 \uc815\uc758 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud558\ub294 \uac83\uc740 \uae30\ubcf8 \ucee8\ud14c\uc774\ub108 \ub7f0\ud0c0\uc784 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud558\ub294 \uac83\uacfc \ube44\uc2b7\ud55c \ud328\ud134\uc744 \ub530\ub974\uc9c0\ub9cc \uc57d\uac04\uc758 \ucc28\uc774\uac00 \uc788\ub2e4. \ubcf4\uc548 \ud504\ub85c\ud30c\uc77c\uc758 seccompProfile \uc18d\uc131\uc744 violation.json \ud30c\uc77c\uc744 \uac00\ub9ac\ud0a4\uace0 \uc720\ud615\uc744 Localhost\ub85c \uc124\uc815\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'apiVersion: v1 \nkind: Pod \nmetadata:\n  name: test-seccomp2 \nspec:\n  securityContext: \n    seccompProfile:\n      type: Localhost // \ub178\ub4dc\uc758 \ud504\ub85c\ud544\uc744 \ucc38\uc870\n      localhostProfile: profiles/violation.json  //\ud558\uc704 \ub514\ub809\ud130\ub9ac \ud504\ub85c\ud544\uc5d0 violation.json\uc774\ub77c\ub294 \uc774\ub984\uc758 \ud504\ub85c\ud544\uc744 \uc801\uc6a9\n  containers:\n  - name: test2\n    image: busybox:1.28\n    command: ["sh", "-c", "echo \'Test seccomp!\' && sleep 100h"] \n    securityContext:\n      allowPrivilegeEscalation: false\n')),(0,o.kt)("p",null,"\ucee4\uc2a4\ud140 \ud504\ub85c\ud30c\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4. ",(0,o.kt)("inlineCode",{parentName:"p"},"kubectl apply"),' \uba85\ub839\uc744 \uc0ac\uc6a9\ud558\uc5ec \ud30c\ub4dc\ub97c \uc2dc\uc791\ud55c\ub2e4. \ud30c\ub4dc\uac00 "Running" \uc0c1\ud0dc\ub85c \uc804\ud658\ub420 \ub54c\uae4c\uc9c0 \uae30\ub2e4\ub9b0\ub2e4:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl apply -f seccomp.yaml \npod/test-seccomp2 created\n\n$ kubectl get pod test-seccomp2\nNAME            READY   STATUS    RESTARTS   AGE\ntest-seccomp2   1/1     Running   0          40s\n")),(0,o.kt)("p",null,"\ucee8\ud14c\uc774\ub108\uc5d0 \uc178\uc744 \uc2e4\ud589\ud558\uc5ec seccomp\uac00 \uc801\uc6a9\ub41c \uaddc\uce59\uc744 \uc81c\ub300\ub85c \uc801\uc6a9\ud588\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ kubectl exec -it test-seccomp2 -- /bin/sh\n/ # mkdir test\nmkdir: can't create directory 'test': Operation not permitted\n")),(0,o.kt)("p",null,"\ucd9c\ub825\uc5d0\uc11c \ubcfc \uc218 \uc788\ub4ef\uc774, \uc774 \uc791\uc5c5\uc740 mkdir \uba85\ub839\uc744 \uc2e4\ud589\ud558\ub824\uace0 \ud560 \ub54c \uc624\ub958 \uba54\uc2dc\uc9c0\ub97c \ub80c\ub354\ub9c1\ud55c\ub2e4. \uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud504\ub85c\ud544\uc758 \uaddc\uce59\uc744 \uc704\ubc18\ud588\ub2e4\uace0 \ubcfc \uc218 \uc788\ub2e4."),(0,o.kt)("h2",{id:"\uc694\uc57d"},"\uc694\uc57d"),(0,o.kt)("p",null,"\ucee8\ud14c\uc774\ub108\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uacfc \ud504\ub85c\uc138\uc2a4\uac00 \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \ud558\ub294 \uac83\uc740 \ub9e4\uc6b0 \uc77c\ubc18\uc801\uc774\ub2e4. \ubcf4\uc548 \uce21\uba74\uc744 \ub2e4\ub8e8\ub294 \uac83\uc740 \ud638\uc2a4\ud2b8 \uc2dc\uc2a4\ud15c \uc218\uc900\uc5d0\uc11c \ud655\uc778\ud574\uc57c \ud560 \uac8c \ub9ce\uae30 \ub54c\ubb38\uc5d0 AppArmor \ubc0f seccomp\uc640 \uac19\uc740 Linux \ucee4\ub110 \uac15\ud654 \ub3c4\uad6c\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc774\ub7ec\ud55c \uc2dc\uc2a4\ud15c \ud638\ucd9c\uc744 \uc81c\ud55c\ud560 \uc218 \uc788\ub2e4. \uc774\ub7f0 \ub3c4\uad6c\ub4e4\uc744 \uc798 \ud65c\uc6a9\ud558\uba74 Kubernetes\uc640 \ud1b5\ud569\ud558\uc5ec \ubcf4\ub2e4 \uc548\uc804\ud55c \ud074\ub7ec\uc2a4\ud130 \uc6b4\uc601\uc744 \ud560 \uc218 \uc788\ub2e4."))}d.isMDXComponent=!0}}]);