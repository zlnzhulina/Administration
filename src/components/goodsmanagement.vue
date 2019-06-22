<template>
<div class="wrap">
  <elemcomponent-com :twomenu="twomenu"></elemcomponent-com>
  </div>
</template>
<script>
import elemcomponent from "./elemcomponent/elemcomponent"
// 系统管理
export default {
  data(){
    return{
       twomenu: [
        {
          title: "商品管理",
          threemenu: [
            {
              title: "商品列表",
              navto:"/goodsmanagement/goodslist"
    
            },
            {
              title: "商品分类管理",
              navto:"/goodsmanagement/goodsclassmanagement"
            },
            {
              title: "商品参数管理",
              navto:"/goodsmanagement/goodsparametermanagement"
            }
          ]
        }
      ]
    }
  },
    components:{
       "elemcomponent-com":elemcomponent
    }
};
</script>
<style lang="scss" scoped>
.wrap{
    width: 100%;
    margin: 0 auto;
    padding-top: 60px;
}
</style>
