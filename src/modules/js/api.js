let url =  {
    hostLists: 'index/hostLists',
    banner: 'index/banner',
    topLists: 'category/topList',
    subLists: 'category/subList',
    rank: 'category/rank',
    searchList: 'search/list',
    detailLists: 'goods/details'
}

let host = 'http://rapapi.org/mockjsdata/31314/'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
         url[key] = host + url[key] ;
    }
}


export default url