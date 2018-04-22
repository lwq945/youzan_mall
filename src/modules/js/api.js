//rap2
let url =  {
    // hostLists: ['get','index/hotLists'],
    // banner: ['get','index/banner'],

    // topLists: ['get','category/topLists'],
    // rank: ['get','category/rank'],
    // subLists: ['post','category/subLists'],

    // searchList: ['post','search/list'],

    // detailLists: ['get','goods/details'],
    // dealLists: ['get','goods/deal'],

    // addCart: ['post','cart/add'],
    // cartList: ['get','cart/list'],
    // cartReduce: ['post','cart/reduce'],
    // cartAdd: ['post','cart/Add'],
    // cartRemove: ['post','cart/remove'],
    // cartMRemove: ['post','cart/mremove'],
    // cartUpdate: ['post','cart/update'],

    // addressList: ['post','address/list'],
    // addressAdd: ['post','address/add'],
    // addressRemove: ['post','address/remove'],
    // addressUptate: ['post','address/update'],
    // addressDefault: ['post','address/setDefault']
    hostLists: 'index/hotLists',
    banner: 'index/banner',

    topLists: 'category/topLists',
    rank: 'category/rank',
    subLists: 'category/subLists',

    searchList: 'search/list',

    detailLists: 'goods/details',
    dealLists: 'goods/deal',

    addCart: 'cart/add',
    cartList: 'cart/list',
    cartReduce: 'cart/reduce',
    cartAdd: 'cart/Add',
    cartRemove: 'cart/remove',
    cartMRemove: 'cart/mremove',
    cartUpdate: 'cart/update',

    addressList: 'address/list',
    addressAdd: 'address/add',
    addressRemove: 'address/remove',
    addressUptate: 'address/update',
    addressDefault: 'address/setDefault'
}


//http://rap2api.taobao.org/app/mock/8405/index/hotLists
let host = 'http://rap2api.taobao.org/app/mock/8405/'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
         //url[key] = host + url[key][0] + '/' + url[key][1];
         url[key] = host + url[key]
    }
}


//rap
// let url = {
//     hostLists: '/index/hostLists',
//     banner: '/index/banner',
//     topLists: '/category/topList',
//     rank: '/category/rank',
//     subLists: '/category/subList',
//     searchList: '/search/list',
//     dealLists: '/goods/deal',
//     detailLists: '/goods/details',

//     addCart: '/cart/add',
//     cartList: '/cart/list',
//     cartReduce: '/cart/reduce',
//     cartAdd: '/cart/add',
//     cartRemove: '/cart/remove',
//     cartMRemove: '/cart/mremove',
//     cartUpdate: '/cart/update',

//     addressList: '/address/list',
//     addressAdd: '/address/add',
//     addressRemove: '/address/remove',
//     addressUptate: '/address/update',
//     addressDefault: '/address/setDefault'


// }
// //http://rapapi.org/mockjsdata/31314/index/hostLists
// let host = 'http://rapapi.org/mockjsdata/31314'

// for (let key in url) {
//     if(url.hasOwnProperty(key)) {
//         url[key] = host + url[key]
//     }
// }



export default url