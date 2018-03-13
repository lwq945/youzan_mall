let url =  {
    hostLists: 'index/hostLists'
}

let host = 'http://rapapi.org/mockjsdata/31314/'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
         url[key] = host + url[key] ;
    }
}


export default url