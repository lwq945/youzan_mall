let url =  {
    hostLists: ['get','index/hotLists'],
    banner: ['get','index/banner'],
    topLists: ['get','category/topLists'],
    rank: ['get','category/rank'],
    subLists: ['post','category/subLists'],
    searchList: ['post','search/list'],
    detailLists: ['get','goods/details'],
    dealLists: ['get','goods/deal'],
    addCart: ['post','cart/add'],
    cartList: ['get','cart/list'],
    cartReduce: ['post','cart/reduce'],
    cartAdd: ['post','cart/Add'],
    cartRemove: ['post','cart/remove'],
    cartMRemove: ['post','cart/mremove'],
    cartUpdate: ['post','cart/update'],
    addressList: ['post','address/list'],
    addressAdd: ['post','address/add'],
    addressRemove: ['post','address/remove'],
    addressUptate: ['post','address/update'],
    addressDefault: ['post','address/setDefault']


}

// http://rap2api.taobao.org/app/mock/8405/get/index/hotLists
let host = 'http://rap2api.taobao.org/app/mock/8405/'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
         url[key] = host + url[key][0] + '/' + url[key][1];
    }
}


export default url