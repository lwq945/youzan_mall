import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transtion.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'

import Swiper from 'components/Swiper.vue'


let {id} = qs.parse(location.search.slice(1))
let tabConfig =['商品详情','本店成交']

new Vue({
    el: '#app',
    data: {
        id,
        detailLists: null,
        tabConfig,
        tabIndex: 0,
        dealLists: null,
        bannerLists: null,
        skuType: 1,
        showSku: false,  //展示对应skuType值的弹出层
        skuNum: 1,
        isAddCart: false,
        showAddCartMessage: false
    },
    created() {
        this.getDetailLists()
    },
    methods: {
        getDetailLists()  {
            axios.post(url.detailLists,{id}).then(res => {
                this.detailLists = res.data.data
                this.bannerLists = []
                this.detailLists.images.forEach(item => {
                    this.bannerLists.push({
                        clickUrl:'',
                        image: item
                    })
                });
            })
        },
        changeTab(index){
            this.tabIndex = index  //index只能取到0和1
            if(index) {
                this.getdeal()
            }
        },
        getdeal() {
            axios.post(url.dealLists,{id}).then(res => {
                this.dealLists = res.data.data.lists
            })
        },
        chooseSku(type) {   //根据选择的skuType值，把对应的弹窗和阴影层弹出
            this.skuType = type
            this.showSku = true
        },
        changeSkuNum(num) {
            if(num < 0 && this.skuNum === 1)  return
            this.skuNum+=num
        },
        addCart() {
            axios.post(url.addCart,{
                id,
                number: this.skuNum
            }).then(res => {
                if(res.data.status === 200){
                    this.showSku = false
                    this.isAddCart = true
                    this.showAddCartMessage = true

                    setTimeout(() => {
                        this.showAddCartMessage = false
                    },1000)
                }
            })
        }
    },
    watch: {                //监听showSku，为true时，让内容不能拉动
        showSku(val, oldval) {
            document.body.style.overflow = val ? 'hidden': 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden': 'auto'
            document.body.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.height = val ? 'hidden': 'auto'
        }
    },
    components: { Swiper },
    mixins: [mixin]
})