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
        },
        add(state,instance) {
            state.allLists.push(instance)
        },
        remove(state,id) {
           let index = state.allLists.findIndex(item => {
                return item.id == id
            })
            state.allLists.splice(index,1)
        },
        update(state,instance) {
            let lists = JSON.parse(JSON.stringify(state.allLists))
            let index = lists.findIndex(item => {
                return item.id == instance.id
            })
            lists[index] = instance
            state.allLists = lists
        },
        setDefault(state,id) {
            let lists = JSON.parse(JSON.stringify(state.allLists))
            lists.forEach(item => {
                if(item.id == id) {
                    item.isDefault = true
                }
            });
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
        },
        addAction({commit},instance) {
            Address.add(instance).then(res => {
                commit('add',instance)
            })
        },
        removeAction({commit},id) {
            Address.remove(id).then(res => {
                commit('remove',id)
            })
        },
        updateAction({commit},instance) {
            Address.update(instance).then(res => {
                commit('update',instance)
            })
        },
        setDefaultAction({commit},id) {
            Address.setDefault(id).then(res => {
                commit('setDefault',id)
            })
        }
    }
})

export default store


// 提交mutations是更改数据的唯一方法,且这个过程是同步的
