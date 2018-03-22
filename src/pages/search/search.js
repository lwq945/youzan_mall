import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import mixin  from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keyword,id} = qs.parse(location.search.slice(1))

new Vue({
    el:'.container',
    data: {
        searchLists: null,
        keyword,
        show: false
    },
    created() {
        this.getSearchLists()
    },
    methods: {
        getSearchLists() {
            
            axios.post(url.searchList,{
                keyword,
                id
            }).then(res => {
                this.searchLists = res.data.lists
            })
        },
        move() {
            if(document.documentElement.scrollTop > 100) {   //页面有指明文档类型（DOCTYPE），用document.documentElement.scrollTop；没有指明，使用document.body.scrollTop
              this.show = true
            }else {
              this.show = false
            }
        },
        toTop() {
            Velocity(document.documentElement, "scroll", { duration: 1000 })
            this.show = false
        }
    },
    mixins: [mixin]
})