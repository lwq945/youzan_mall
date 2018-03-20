//把组件中可复用的选项放在mixin对象中，当组件使用该对象时，所有的选项将被混入该组件的选项

import FootTab from 'components/FootTab.vue'


let myMixin = {
    filters: {
        currency: function (value) {    //过滤价格，保留小数点后两位
            return value = value.toFixed(2)
        }
    },
    components: {
        FootTab
    }
}


export default myMixin