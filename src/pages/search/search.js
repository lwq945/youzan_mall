import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'


let {keyword,id} = qs.parse(location.search.slice(1))

new Vue({
    el:'.container',
    data: {
        searchLists: null,
        keyword
    },
    created() {
        this.getSearchLists()
    },
    methods: {
        getSearchLists() {
            axios.post(url.searchList,{keyword,id}).then(res => {
                this.searchLists = res.data.lists
            })
        }
    }
})