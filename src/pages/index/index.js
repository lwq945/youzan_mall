import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);


// import FootTab from 'components/FootTab.vue'
import Swiper from 'components/Swiper.vue'
import mixin from 'js/mixin.js'

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        bannerLists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    created() {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists() {
            if(this.allLoaded) return
            //当前是否在加载（true在加载，则不再请求数据）
            this.loading = true
            axios.post(url.hostLists,{
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                
                //当前获取到的数据
                let curLists = res.data.lists
                // console.log(curLists.length)
                // //判断所有数据是否加载完成
                if(curLists.length < this.pageSize) {
                    this.allLoaded = true
                }
                if(this.lists){
                    //已获取的数据和当前获取的数据合并
                    this.lists = this.lists.concat(curLists)
                }else{
                    //第一次获取的数据
                    this.lists = curLists
                }
                //下次可以请求数据
                this.loading = false
                this.pageNum++
            }) 
        },
        getBanner() {
            axios.post(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Swiper
    },
    mixins: [mixin]
})