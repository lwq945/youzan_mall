import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'


let {id} = qs.parse(location.search.slice(1))
let tabConfig =['商品详情','本店成交']

new Vue({
    el: '#app',
    data: {
        detailLists: null,
        tabConfig,
        tabIndex: 0,
        dealLists: null
    },
    created() {
        this.getDetailLists()
    },
    methods: {
        getDetailLists()  {
            axios.post(url.detailLists,{id}).then(res => {
                this.detailLists = res.data.data
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
        }
    },
    mixins: [mixin]
})