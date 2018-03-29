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
    computed: {
        allSelected: {    //计算属性 全选
            get() {
                if(this.cartLists && this.cartLists.length){  //依赖this.cartLists，当它有数据时才会计算
                    return this.cartLists.every(shop => {  //遍历判断所有的店铺是否都被选中，若都被选中返回true，否则返回false
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal) {                //所有店铺及其所有商品都根据当前的值来决定是否选中
                this.cartLists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsLists.forEach(good => {
                        good.checked =newVal
                    })
                })
            }
        }
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
        selectGood(shop,good) {
            good.checked = !good.checked
            shop.checked = shop.goodsLists.every( good => {   //店铺的选中由它底下的所有商品的选中状态决定，遍历该店铺的所有商品，是否都是选中，若都选中，则店铺也处在选中状态
                return good.checked
            })
        },
        selectShop(shop) {
            shop.checked = !shop.checked  //取反
            shop.goodsLists.forEach(good => {  //遍历所有商品，商品的选中状态由店铺的选中决定，当店铺被选中，它底下的所有商品都被选中
                good.checked = shop.checked
            })
        },
        selectAll() {
            this.allSelected = !this.allSelected
        }
    },
    components: {},
    mixins: [mixin]
})
