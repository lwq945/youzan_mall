import './cart_base.css'
import './cart_trade.css'
import './cart.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'

new Vue({
    el: '.container',
    data: {
        cartLists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,   //删除弹窗
        removeData: null,
        removeMsg: ''
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
        selectGood(shop,good) {   //选中商品
           let attr = this.editingShop? 'removeChecked' : 'checked'  //判断是否处于编辑状态
            good[attr] = !good[attr]
            shop[attr] = shop.goodsLists.every( good => {   //店铺的选中由它底下的所有商品的选中状态决定，遍历该店铺的所有商品，是否都是选中，若都选中，则店铺也处在选中状态
                return good[attr]
            })
        },
        selectShop(shop) {   //选中店铺
            let attr = this.editingShop? 'removeChecked' : 'checked'  //判断是否处于编辑状态
            shop[attr] = !shop[attr]  //取反
            shop.goodsLists.forEach(good => {  //遍历所有商品，商品的选中状态由店铺的选中决定，当店铺被选中，它底下的所有商品都被选中
                good[attr] = shop[attr]
            })
        },
        selectAll() {  //选中全选
            let attr = this.editingShop? 'allRemoveSelected' : 'allSelected'  //判断是否处于编辑状态
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex) { //
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

        },
        reduce(good) {  //减少数量
            if(good.number === 1) return
            axios.post(url.cartReduce,{
                id: good.id,
                number: 1
            }).then(res => {
                good.number--
            })
        },
        add(good) {   //增加数量
            axios.post(url.cartAdd,{
                id: good.id,
                number: 1
            }).then(res => {
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex) {   //删除单个商品
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
            this.removeMsg = '确定要删除该商品么?'
        },
        removeMoreLists() {               //删除多个商品
            this.removePopup = true
            this.removeMsg = `确定要删除${this.removeLists.length}个商品么?`
        },
        removeConfirm() {
            if(this.removeMsg === '确定要删除该商品么?'){
                let {shop,shopIndex,good,goodIndex} = this.removeData
                axios.post(url.cartRemove,{
                    id: good.id
                }).then(res => {
                    shop.goodsLists.splice(goodIndex,1)
                    if(!shop.goodsLists.length) {   //当店铺下没有商品时，就删掉店铺
                        this.cartLists.splice(shopIndex,1)
                        this.removeShop()   //删除完店铺，要把没删除的店铺切换成正常状态
                    }
                    this.removePopup = false
                })
            }else {
                let ids = []
                this.removeLists.forEach(good => {   //遍历编辑状态下选中删除的商品的id
                    ids.push(good.id)
                })
                axios.post(url.cartMRemove,{
                    ids
                }).then(res => {
                    let arr = []
                    this.editingShop.goodsLists.forEach(good => {   //遍历当前编辑的店铺的所有商品，是否有和选中删除的商品的id一样，有就返回id，没有返回-1
                        let index = this.removeLists.findIndex(item => {
                            return item.id == good.id
                        })

                        if(index === -1) {  //如果是没有选中的商品，就push进arr
                            arr.push(good)
                        }
                    })

                    if(arr.length){    //判断没有被选中删除的商品数组的长度，true的话，就把没有被选中删除的商品数组赋值给当前编辑店铺的商品列表（也就是删除掉被选中删除状态是商品）
                        this.editingShop.goodsLists = arr
                    }else {
                        this.cartLists.splice(this.editingShopIndex,1)  //当前编辑店铺下没有商品时，就删掉店铺
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }
        },
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.cartLists.forEach(shop => {
                shop.editing = false
                shop.editMsg = "编辑"
            })
        },
        start(e,good) {
            good.startX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex) {
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if(good.startX - endX > 100){
                left = '-60px'
            }
            if(endX - good.startX > 100){
                left = '0px'
            }
            velocity(this.$refs[`good-${shopIndex}-${goodIndex}`],{
                left
            })
        }
    },
    watch: {
        removePopup(value,oldValue) {
            document.body.style.overflow = value ? 'hidden': 'auto'
            document.querySelector('html').style.overflow = value ? 'hidden': 'auto'
            document.body.style.height = value ? '100%' : 'auto'
            document.querySelector('html').style.height = value ? 'hidden': 'auto'
        }
    },
    components: {},
    mixins: [mixin]
})
