webpackJsonp([6],{"035s":function(t,e){},Hwmd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("035s"),n=(a.n(s),a("igmb")),o=(a.n(n),a("7+uW")),i=a("mtWM"),r=a.n(i),c=a("TFhR"),d=a("U/rD");new o.default({el:"#app",data:{topLists:null,topIndex:0,subData:null,rankData:null},created:function(){this.getTopList(),this.getSubList(0,0)},methods:{getTopList:function(){var t=this;r.a.post(c.a.topLists).then(function(e){t.topLists=e.data.lists})},getSubList:function(t,e){var a=this;this.topIndex=e,0===e?this.getRank():r.a.post(c.a.subLists,{id:t}).then(function(t){a.subData=t.data.data})},getRank:function(){var t=this;r.a.post(c.a.rank).then(function(e){t.rankData=e.data.data})},toSearch:function(t){location.href="search.html?keyword="+t.name+"&cate_id="+t.id}},mixins:[d.a]})},KpPU:function(t,e){},TFhR:function(t,e,a){"use strict";var s={hostLists:["get","index/hotLists"],banner:["get","index/banner"],topLists:["get","category/topLists"],rank:["get","category/rank"],subLists:["post","category/subLists"],searchList:["post","search/list"],detailLists:["get","goods/details"],dealLists:["get","goods/deal"],addCart:["post","cart/add"],cartList:["get","cart/list"],cartReduce:["post","cart/reduce"],cartAdd:["post","cart/Add"],cartRemove:["post","cart/remove"],cartMRemove:["post","cart/mremove"],cartUpdate:["post","cart/update"],addressList:["post","address/list"],addressAdd:["post","address/add"],addressRemove:["post","address/remove"],addressUptate:["post","address/update"],addressDefault:["post","address/setDefault"]};for(var n in s)s.hasOwnProperty(n)&&(s[n]="http://rap2api.taobao.org/app/mock/8405/"+s[n][0]+"/"+s[n][1]);e.a=s},"U/rD":function(t,e,a){"use strict";var s=a("mvHQ"),n=a.n(s),o=a("mw3O"),i=a.n(o).a.parse(location.search.slice(1)).index,r=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}],c={props:["obj"],data:function(){return{navConfig:r,curIndex:parseInt(i)||0,objData:JSON.parse(n()(this.obj))}},created:function(){var t=this;setTimeout(function(){t.$emit("change",30)},3e3)},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,s){return a("li",{key:e.name,class:{active:s==t.curIndex},on:{click:function(a){t.changeNav(e,s)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var u={filters:{currency:function(t){return t.toFixed(2)}},components:{FootTab:a("VU/8")(c,d,!1,function(t){a("KpPU")},null,null).exports}};e.a=u},igmb:function(t,e){}},["Hwmd"]);
//# sourceMappingURL=category.e61d2823db299bad26c3.js.map