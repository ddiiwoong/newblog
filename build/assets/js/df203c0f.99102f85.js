"use strict";(self.webpackChunkddii=self.webpackChunkddii||[]).push([[9924],{49853:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var l=a(67294),c=a(32600),n=a(39960),r=a(5979),s=a(95999),i=a(14739),o=a(86010);function g(e){var t=e.doc;return l.createElement("article",{className:"margin-vert--lg"},l.createElement(n.Z,{to:t.permalink},l.createElement("h2",null,t.title)),t.description&&l.createElement("p",null,t.description))}function d(e){var t,a=e.tag,d=(t=(0,r.c2)().selectMessage,function(e){return t(e,(0,s.I)({id:"theme.docs.tagDocListPageTitle.nDocsTagged",description:'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One doc tagged|{count} docs tagged"},{count:e}))}),m=(0,s.I)({id:"theme.docs.tagDocListPageTitle",description:"The title of the page for a docs tag",message:'{nDocsTagged} with "{tagName}"'},{nDocsTagged:d(a.docs.length),tagName:a.name});return l.createElement(r.FG,{className:(0,o.Z)(r.kM.wrapper.docsPages,r.kM.page.docsTagDocListPage)},l.createElement(r.d,{title:m}),l.createElement(i.Z,{tag:"doc_tag_doc_list"}),l.createElement(c.Z,null,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement("main",{className:"col col--8 col--offset-2"},l.createElement("header",{className:"margin-bottom--xl"},l.createElement("h1",null,m),l.createElement(n.Z,{href:a.allTagsPath},l.createElement(s.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),l.createElement("section",{className:"margin-vert--lg"},a.docs.map((function(e){return l.createElement(g,{key:e.id,doc:e})}))))))))}}}]);