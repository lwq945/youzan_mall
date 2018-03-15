<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>


<script>

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'swiper',
  //props: ['lists']     //用来接收父组件传递的数据，可以是数组或者是对象类型
  props: {
      lists: {
          type: Array,
          required: true    //必需
      }
  },
  mounted () {
      //实例化swiper插件，它是基于dom节点的
      new Swiper('.swiper-container', {
        autoplay: {
            delay: 3000,
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        }
      })
  }
}


//父组件异步获取数据，通过props属性传递数据给Swiper子组件，子组件在内部渲染数据v-for
//操作dom:
//1.父组件做渲染判断v-if，有数据再渲染；swiper插件对dom节点进行操作，在mounted才能操作，因为mounted阶段初始数据的dom渲染完毕，可以获取到dom。
//2.不做渲染判断，使用watch来监听数据
//watch: {
    //lists(val,oldval) {
        //this.$nextTick(() => {
            //console.log(document.querySelector('.swiper-slide'))
        //})
    //}
//} 
</script>

<style>
    .swiper-slide img {
        width: 100%;
        height: 100%;
    }
</style>

