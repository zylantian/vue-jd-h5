(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-530409a8"],{"386d":function(t,e,s){"use strict";var c=s("cb7c"),o=s("83a1"),a=s("5f1b");s("214f")("search",1,function(t,e,s,r){return[function(s){var c=t(this),o=void 0==s?void 0:s[e];return void 0!==o?o.call(s,c):new RegExp(s)[e](String(c))},function(t){var e=r(s,t,this);if(e.done)return e.value;var n=c(t),i=String(this),p=n.lastIndex;o(p,0)||(n.lastIndex=0);var u=a(n,i);return o(n.lastIndex,p)||(n.lastIndex=p),null===u?-1:u.index}]})},"72ad":function(t,e,s){"use strict";var c=s("ea73"),o=s.n(c);o.a},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},ea73:function(t,e,s){},efe3:function(t,e,s){"use strict";s.r(e);var c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search-box"},[s("div",{staticClass:"search-header"},[s("span",{staticClass:"btn-left",on:{click:t.goBack}},[s("svg-icon",{attrs:{"icon-class":"left-btn"}})],1),s("div",{staticClass:"search-con"},[s("svg-icon",{staticClass:"search-icon",attrs:{"icon-class":"search"}}),s("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],attrs:{placeholder:"搜索、关键词"},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}})],1),s("span",{on:{click:t.getSearch}},[t._v("搜索")])]),s("div",{staticClass:"search-content"},[s("div",{staticClass:"hot-list"},[s("span",{staticClass:"hot-words"},[t._v("热搜词")]),s("div",t._l(t.hotData,function(e,c){return s("span",{key:c,staticClass:"hot-detail",class:{hot:e.hot},on:{click:function(s){return t.selectTag(e.title)}}},[t._v(t._s(e.title)+"\n        "),1==e.hot?s("svg-icon",{attrs:{"icon-class":"hot"}}):t._e()],1)}),0)]),s("div",{staticClass:"search-list history-list"},[s("div",{staticClass:"history-search"},[s("span",[t._v("历史搜索")]),s("span",{on:{click:t.deleteHistory}},[s("svg-icon",{attrs:{"icon-class":"icon-delete"}})],1)]),s("div",{staticClass:"histort-search"},t._l(t.searchHistory,function(e,c){return s("span",{key:c,on:{click:function(s){return t.selectTag(e)}}},[t._v(t._s(e))])}),0)])]),s("popup",{attrs:{"popup-title":t.popupTitle,"popup-show":t.popupShow},on:{cancelPopup:t.cancelPopup,confirmPopup:t.confirmPopup}})],1)},o=[],a=(s("1c01"),s("58b2"),s("8e6e"),s("f3e2"),s("d25f"),s("ac6a"),s("456d"),s("a481"),s("386d"),s("bd86")),r=s("26e2"),n=s("ca00"),i=s("2f62");function p(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,c)}return s}function u(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?p(s,!0).forEach(function(e){Object(a["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):p(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var l={data:function(){return{searchText:"",hotData:[],popupTitle:"",popupShow:!1}},created:function(){var t=Object(n["c"])("searchHistory");console.log(t),t||(t=[]),this.$store.commit("search/setHistory",t),this.getSelectTags()},computed:u({},Object(i["c"])({searchHistory:function(t){return t.search.searchHistory}})),methods:u({},Object(i["b"])(["search/setHistory"]),{getSelectTags:function(){var t=this;this.$http.get("http://test.happymmall.com/search/hot").then(function(e){t.hotData=e.data.data})},getSearch:function(){var t=this.searchText.replace(/^\s+|\s+$/g,"");t?this.selectTag(t):alert("请输入搜索内容")},selectTag:function(t){this.$store.commit("search/addHistory",t),this.$store.commit("search/setHistory",Object(n["b"])(this.searchHistory))},deleteHistory:function(){this.popupTitle="确定删除搜索历史吗？",this.popupShow=!0},confirmPopup:function(){this.$store.commit("search/setHistory",[]),this.cancelPopup()},cancelPopup:function(){n["a"].beforeClose(),this.popupShow=!1},goBack:function(){this.$router.go(-1)}}),directives:{focus:{inserted:function(t){t.focus()}}},components:{popup:r["default"]}},h=l,f=(s("72ad"),s("2877")),d=Object(f["a"])(h,c,o,!1,null,"acbdd79c",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-530409a8.428e355b.js.map