import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// import FootTab from 'components/FootTab.vue'
import mixin from 'js/mixin.js'


new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    created() {
        this.getTopList(),
        this.getSubList(0,0)
    },
    methods: {
        getTopList() {
            axios.post(url.topLists).then(res => {
                this.topLists = res.data.lists
            })
        },
        getSubList(id,index) { 
            this.topIndex = index  //点击一级分类，传入点击的id和index，获取到二级分类页面；topIndex==0,渲染综合排行对应的页面;topIndex>0,渲染除综合排行外的页面
            
            if(index === 0) {
                this.getRank()
            }else {
                axios.post(url.subLists,{id}).then(res => {
                    this.subData = res.data.data
                })
            }
        },
        getRank() {
            axios.post(url.rank).then(res => {
                this.rankData = res.data.data
            })
        },
        toSearch(list) {
            location.href = `search.html?keyword=${list.name}&cate_id=${list.id}`  //跳转到商品列表页，传递keyword和cate_id两个参数
        }
    },
    mixins: [mixin]
    // filters: {
    //     number: function (value) {    //过滤价格，保留小数点后两位
    //         return value = value.toFixed(2)
    //     }
    // },
    // components: {
    //     FootTab
    // }
})

