import './cart_base.css'
import './cart_trade.css'
import './cart.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'


new Vue({
    el: '.container',
    data: {
        cartLists: null
    },
    created() {
        this.getCartLists()
    },
    methods: {
        getCartLists() {
            axios.post(url.cartList).then(res => {
                let tempLists = res.data.cartLists   //接收获取到的原始数据
                
                tempLists.forEach((shop) => {
                    shop.checked = true
                    shop.goodsLists.forEach((good) => {   //遍历原始数据，给每个商品添加一个是否选中属性
                        good.checked = true
                    })
                });
                this.cartLists = tempLists  //再赋值
            })
        },
        selectGood(good) {
            good.checked = !good.checked
        }
    },
    computed: {

    },
    components: {},
    mixins: [mixin]
})
