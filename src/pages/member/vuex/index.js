// 1.导入Vue、Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressServer.js'


//2.创建Store实例(存放数据、管理数据)
const store = new Vuex.Store({
    state: {
        allLists: null
    },
    mutations: {
        //对数据同步管理第一参数state是必须的，第二个参数（额外的参数）就是载荷（payload）
        init(state,lists) {
            state.allLists = lists
        }
    },
    actions: {
        //异步操作(异步获取数据),提交mutation
        getLists({commit}) {
            Address.list().then(res =>{
                // store.commit('init',res.data.lists)
                commit('init',res.data.lists)
            })
        }  
    }
})

export default store


// 提交mutations是更改数据的唯一方法,且这个过程是同步的
