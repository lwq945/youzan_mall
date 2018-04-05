// 1.导入Vue、Vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import member from './components/member.vue'

//2.构造router配置
let routes = [
    {
        path: '/',
        component: member
    }
]

//3.创建 router 实例
let router = new Router({
    routes
})

// 根组件注入路由
new Vue({
    el: '#app',
    router
})

//4.在挂载点使用<router-view>来渲染匹配到的路由组件