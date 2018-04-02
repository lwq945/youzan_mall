import fetch from 'js/fetch.js'
import url from 'js/api.js'

class cart {
    // 商品数量的增加
    static add(id) {
        return fetch(url.cartAdd,{
            id,
            number: 1
        })
    }

    // 商品数量的减少
    static reduce(id) {
        return fetch(url.cartReduce,{
            id,
            number: 1
        })
    }

    //获取购物车页面的数据
    static getCartLists() {
        return fetch(url.cartList)
    }

    //删除单个商品
    static remove(id) {
        return fetch(url.cartReduce,{
            id
        })
    }

    // 删除多个商品
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