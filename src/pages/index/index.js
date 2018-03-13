import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    created() {
        this.getLists()
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
                let current = res.data.lists
                //判断所有数据是否加载完成
                if( current.length < this.pageSize) {
                    this.allLoaded = true
                }
                if(this.lists){
                    //已获取的数据和当前获取的数据合并
                    this.lists = this.lists.concat(current)
                }else{
                    //第一次获取的数据
                    this.lists = current
                }
                this.loading = false
                this.pageNum++
            }) 
        } 
    }
})