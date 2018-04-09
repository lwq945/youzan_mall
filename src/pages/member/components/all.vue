<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="allLists&&allLists.length">
      <a class="block-item js-address-item address-item" 
        v-for="list in allLists"
        :class="{'address-item-default':list.isDefault}"
        :key="list.id"
        @click="toEdit(list)">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div v-if="allLists&&!allLists.length">
      <p>没有设置地址，请添加！</p>
    </div>
    <div class="block stick-bottom-row center">
        <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
          :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
// import Address from 'js/addressServer.js'

export default {
  
  created() {
    //Action 通过 store.dispatch 方法触发
    this.$store.dispatch('getLists')
  },
  computed: {
    allLists() {  //计算属性读取store实例的状态
      return this.$store.state.allLists
    }
  },
  methods: {
      toEdit(list) {   //编辑时要把当前的地址信息带过来
          this.$router.push({name:'form',query:{
            type: 'edit',
            instance: list  //当前编辑的实例
          }})
      }
  }
}
</script>


<style>
   @import '../css/address_base.css';
   @import '../css/address.css';
</style>
