webpackJsonp([1],{AeEs:function(t,e){},AnIW:function(t,e){},"Do/K":function(t,e){},HFfA:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("JWK+"),n=(s.n(a),s("pI1A")),i=(s.n(n),s("AeEs")),o=(s.n(i),s("AnIW")),r=(s.n(o),s("d7BR")),c=(s.n(r),s("Do/K")),d=(s.n(c),s("mg44")),u=(s.n(d),s("7+uW")),l=s("mtWM"),h=s.n(l),p=s("TFhR"),f=s("U/rD"),m=s("mw3O"),g=s.n(m),v=s("NydE"),w=g.a.parse(location.search.slice(1)).id;new u.default({el:"#app",data:{id:w,detailLists:null,tabConfig:["商品详情","本店成交"],tabIndex:0,dealLists:null,bannerLists:null,skuType:1,showSku:!1,skuNum:1,isAddCart:!1,showAddCartMessage:!1},created:function(){this.getDetailLists()},methods:{getDetailLists:function(){var t=this;h.a.post(p.a.detailLists,{id:w}).then(function(e){t.detailLists=e.data.data,t.bannerLists=[],t.detailLists.images.forEach(function(e){t.bannerLists.push({clickUrl:"",image:e})})})},changeTab:function(t){this.tabIndex=t,t&&this.getdeal()},getdeal:function(){var t=this;h.a.post(p.a.dealLists,{id:w}).then(function(e){t.dealLists=e.data.data.lists})},chooseSku:function(t){this.skuType=t,this.showSku=!0},changeSkuNum:function(t){t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;h.a.post(p.a.addCart,{id:w,number:this.skuNum}).then(function(e){200===e.data.status&&(t.showSku=!1,t.isAddCart=!0,t.showAddCartMessage=!0,setTimeout(function(){t.showAddCartMessage=!1},1e3))})}},watch:{showSku:function(t,e){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"hidden":"auto"}},components:{Swiper:v.a},mixins:[f.a]})},"JWK+":function(t,e){},KpPU:function(t,e){},NydE:function(t,e,s){"use strict";var a=s("DNVT"),n=(s("v2ns"),{name:"swiper",props:{lists:{type:Array,required:!0}},mounted:function(){new a.a(".swiper-container",{autoplay:{delay:3e3},loop:!0,pagination:{el:".swiper-pagination"}})}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t,s){return e("div",{key:s,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var o=s("VU/8")(n,i,!1,function(t){s("VwZe")},null,null);e.a=o.exports},TFhR:function(t,e,s){"use strict";var a={hostLists:["get","index/hotLists"],banner:["get","index/banner"],topLists:["get","category/topLists"],rank:["get","category/rank"],subLists:["post","category/subLists"],searchList:["post","search/list"],detailLists:["get","goods/details"],dealLists:["get","goods/deal"],addCart:["post","cart/add"],cartList:["get","cart/list"],cartReduce:["post","cart/reduce"],cartAdd:["post","cart/Add"],cartRemove:["post","cart/remove"],cartMRemove:["post","cart/mremove"],cartUpdate:["post","cart/update"],addressList:["post","address/list"],addressAdd:["post","address/add"],addressRemove:["post","address/remove"],addressUptate:["post","address/update"],addressDefault:["post","address/setDefault"]};for(var n in a)a.hasOwnProperty(n)&&(a[n]="http://rap2api.taobao.org/app/mock/8405/"+a[n][0]+"/"+a[n][1]);e.a=a},"U/rD":function(t,e,s){"use strict";var a=s("mvHQ"),n=s.n(a),i=s("mw3O"),o=s.n(i).a.parse(location.search.slice(1)).index,r=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}],c={props:["obj"],data:function(){return{navConfig:r,curIndex:parseInt(o)||0,objData:JSON.parse(n()(this.obj))}},created:function(){var t=this;setTimeout(function(){t.$emit("change",30)},3e3)},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bottom-nav"},[s("ul",t._l(t.navConfig,function(e,a){return s("li",{key:e.name,class:{active:a==t.curIndex},on:{click:function(s){t.changeNav(e,a)}}},[s("a",[s("i",{class:e.icon}),t._v(" "),s("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var u={filters:{currency:function(t){return t.toFixed(2)}},components:{FootTab:s("VU/8")(c,d,!1,function(t){s("KpPU")},null,null).exports}};e.a=u},VwZe:function(t,e){},d7BR:function(t,e){},mg44:function(t,e){},pI1A:function(t,e){},v2ns:function(t,e){}},["HFfA"]);
//# sourceMappingURL=goods.40f823c05f1b1b3b5e30.js.map