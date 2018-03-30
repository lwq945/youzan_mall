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
        cartLists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1
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
        },
        selectLists() { //正常状态下选中的商品列表
            if(this.cartLists && this.cartLists.length) {
                let selectArr = []
                let total = 0
                this.cartLists.forEach(shop => {   //遍历所有店铺的所有商品，找出选中的商品，push进selectArr
                    shop.goodsLists.forEach(good => { 
                        if(good.checked) {
                            selectArr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return selectArr
            }
            return []
        },
        allRemoveSelected: {
            get() {
                if(this.editingShop){
                    return  this.editingShop.removeChecked     //返回处于编辑状态店铺的removeChecked
                }
                return false
            },
            set(newVal) {
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsLists.forEach( good => {
                        good.removeChecked = newVal
                    })
                }
            }
        },
        removeLists() {  //编辑状态下选中的删除商品列表
            if(this.editingShop) {
                let removeSelectArr = []
                this.editingShop.goodsLists.forEach(good => {
                    if(good.removeChecked){
                        removeSelectArr.push(good)
                    }
                })
                return removeSelectArr
            }
            return []
        }

    },
    methods: {
        getCartLists() {
            axios.post(url.cartList).then(res => {
                let tempLists = res.data.cartLists   //接收获取到的原始数据
                
                tempLists.forEach((shop) => {
                    shop.checked = true   //正常状态的选择
                    shop.removeChecked = false  //编辑状态的选择
                    shop.editing = false     //是否处于编辑状态
                    shop.editMsg = "编辑"  //正常状态信息是‘编辑’，编辑状态信息是‘完成’
                    shop.goodsLists.forEach((good) => {   //遍历原始数据，给每个商品添加一个是否选中属性
                        good.checked = true
                        good.removeChecked = false
                    })
                });
                this.cartLists = tempLists  //再赋值
            })
        },
        selectGood(shop,good) {
           let attr = this.editingShop? 'removeChecked' : 'checked'  //判断是否处于编辑状态
            good[attr] = !good[attr]
            shop[attr] = shop.goodsLists.every( good => {   //店铺的选中由它底下的所有商品的选中状态决定，遍历该店铺的所有商品，是否都是选中，若都选中，则店铺也处在选中状态
                return good[attr]
            })
        },
        selectShop(shop) {
            let attr = this.editingShop? 'removeChecked' : 'checked'  //判断是否处于编辑状态
            shop[attr] = !shop[attr]  //取反
            shop.goodsLists.forEach(good => {  //遍历所有商品，商品的选中状态由店铺的选中决定，当店铺被选中，它底下的所有商品都被选中
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop? 'allRemoveSelected' : 'allSelected'  //判断是否处于编辑状态
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex) {
            shop.editing = !shop.editing
            shop.editMsg = shop.editing ? '完成' : '编辑'
            this.cartLists.forEach( (item,index) => {    //遍历店铺
                if(shopIndex !== index){    //其他店铺都处于非编辑状态
                    item.editing = false
                    item.editMsg = shop.editing ? '' : '编辑'
                }
                
                this.editingShop = shop.editing ? shop : null    //全局变量，用来处理不是数据列表中的数据渲染(获取处于编辑状态的店铺)
                this.editingShopIndex = shop.editing ? shopIndex : -1  //获取处于编辑状态的店铺的下标
            })

        }
    },
    components: {},
    mixins: [mixin]
})
