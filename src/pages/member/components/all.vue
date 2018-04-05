<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item" @click="toEdit">
        <div class="address-title">lwq 15888888888</div>
        <p>福建省厦门市湖里区</p>
      </a>
      <a class="block-item js-address-item address-item address-item-default" @click="toEdit">
        <div class="address-title">lwq945 15999999999</div>
        <p>福建省厦门市思明区软件园二期</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
        <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" to="/address/form">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      toEdit() {
          this.$router.push({path:'/address/form'})
      }
  }
}
</script>


<style>
   @import '../css/address_base.css';
   @import '../css/address.css';
</style>
