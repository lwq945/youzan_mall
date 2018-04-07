<template>
   <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option 
                v-for="province in addressData.list" 
                :value="province.value"
                :key="province.value"
              >{{ province.label }}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option v-for="city in cityList" :value="city.value" :key="city.value">{{ city.label }}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option v-for="district in districtList" :value="district.value" :key="district.value">{{ district.label }}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type==='edit'" @click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'" @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import data from 'js/address.json'
import Address from 'js/addressServer.js'
export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',  
      instance: '', 
      addressData: data,
      cityList: null,
      districtList: null
    }
  },
  created() {
    this.type = this.$route.query.type //获取路由信息对象的type
    this.instance = this.$route.query.instance //获取路由实例

    if(this.type === 'edit') {   //编辑地址时，把数据带到表单
      let addr = this.instance
      this.name = addr.name
      this.tel = addr.tel
      this.address = addr.address
      this.id = addr.id
      this.provinceValue = parseInt(addr.provinceValue) //定位到省
    }
  },
  methods: {
    add() {
      let {name,tel,provinceValue,cityValue,districtValue,address,id} = this
      let data = {name,tel,provinceValue,cityValue,districtValue,address,id}
      if(this.type === 'add') {
        Address.add(data).then(res => {
          data.id = this.id
          this.$router.go(-1)
        })
      }
      if(this.type === 'edit') {
        Address.update(data).then(res => {
          this.$router.go(-1)
        })
      }
    },
    remove() {
      if(window.confirm('确定删除？')) {
        Address.remove(this.id).then(res => {
          this.$router.go(-1)
        })
      }
    },
    setDefault() {
      Address.setDefault(this.id).then(res => {
        this.$router.go(-1)
      })
    }
  },
  watch: {
    provinceValue(val) {  //监听省码value的变化
      if(val === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {  //找出当前选中省的下标
        return item.value === val
      })
      //获取选中省的所有市
      this.cityList = list[index].children
      // console.log(this.cityList)
      this.cityValue = -1
      this.districtValue = -1

      if(this.type === 'edit') {  //编辑时，定位到原地址的市
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },

   cityValue(val) {  //监听市码value的变化
      if(val === -1) return
      let index = this.cityList.findIndex(item => {
        return item.value === val
      })
      //获取选中市的所有区
      this.districtList = this.cityList[index].children
      // console.log(this.districtList)
      this.districtValue = -1

      if(this.type === 'edit') {  //编辑时，定位到原地址的区
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  }
}
</script>


<style>
  @import '../css/address_base.css';
  @import '../css/address.css';
</style>
