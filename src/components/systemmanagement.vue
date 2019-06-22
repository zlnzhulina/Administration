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
          title: "员工管理",
          threemenu: [
            {
              title: "员工列表",
              navto:"/systemmanagement/yglist"
    
            },
            {
              title: "岗位管理",
              navto:"/systemmanagement/postmanagement"
            },
            {
              title: "部门管理",
              navto:"/systemmanagement/departmentmanagement"
            },
            {
              title: "岗位权限",
              navto:"/systemmanagement/postpower"
            },
            {
              title: "密码管理",
              navto:"/systemmanagement/pwdmanagement"
            }
          ]
        },
        {
          title: "日志查询",
          threemenu: [
            {
              title: "操作日志",
              navto:"/systemmanagement/journal"
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
