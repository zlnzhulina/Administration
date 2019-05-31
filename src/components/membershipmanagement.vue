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
          title: "网点用户管理",
          threemenu: [
            {
              title: "用户列表",
              navto:"/Membershipmanagement/userlist"
    
            },
            {
              title: "网点列表",
              navto:"/Membershipmanagement/dotlist"
            },
            {
              title: "批量维护",
              navto:"/Membershipmanagement/batchmaintenance"
            },
            {
              title: "职位管理",
              navto:"/Membershipmanagement/positionmanagement"
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
    width: 1200px;
    margin: 0 auto;
    padding-top: 90px;
}
</style>

