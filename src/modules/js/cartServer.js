import fetch from 'js/fetch.js'
import url from 'js/api.js'

class cart {
    static add(id) {
        return fetch(url.cartAdd,{
            id,
            number: 1
        })
    }

    static reduce(id) {
        return fetch(url.cartReduce,{
            id,
            number: 1
        })
    }

    static getCartLists() {
        return fetch(url.cartList)
    }

    static remove(id) {
        return fetch(url.cartReduce,{
            id
        })
    }

    static removeMore(arr) {
        let ids = []
        arr.forEach(good => {   //遍历编辑状态下选中删除的商品的id
            ids.push(good.id)
        })
        return fetch(url.cartMRemove,{
            ids
        })
    }
}

export default cart