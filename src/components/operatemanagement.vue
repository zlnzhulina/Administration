<template>
  <div class="wrap">
    <elemcomponent-com :twomenu="twomenu" ref="mychild"></elemcomponent-com>
  </div>
</template>
<script>
import elemcomponent from "./elemcomponent/elemcomponent";
// 运营管理
export default {
 
  data() {
    return {
      index:{
              title: "活动列表",
              navto:"/operatemanagement/activitylist"
            },
      twomenu: [
        {
          title: "活动管理",
          threemenu: [
            {
              title: "活动列表",
              navto:"/operatemanagement/activitylist"
            }
          ]
        },
        {
          title: "奖品管理",
          threemenu: [
            {
              title: "奖品列表",
              navto:"/operatemanagement/prizelist"
            }, {
              title: "奖品分类",
              navto:"/operatemanagement/prizeclass"
            }, {
              title: "奖品参数",
              navto:"/operatemanagement/prizeattribute"
            }, {
              title: "中奖信息",
              navto:"/operatemanagement/prizeinformation"
            }
          ]
        },
        {
          title: "内容管理",
          threemenu: [
            {
              title: "首页BANNER",
              navto:"/operatemanagement/indexbanner"
              
            },{
              title: "首页扫码入口",
              navto:"/operatemanagement/indexcodeentrance"
            }, {
              title: "首页活动咨询",
              navto:"/operatemanagement/indexactivityinformation"
            }, {
              title: "登录页验真展示",
              navto:"/operatemanagement/loginverifytruthshow"
            }, {
              title: "消费者活动说明页",
              navto:"/operatemanagement/activityexplain"
            }
          ]
        }
      ]
    };
  },
   created(){
    
  },
  components: {
    "elemcomponent-com": elemcomponent
  },
  // methods:{
  //   ddd:function(){
  //     this.$refs.mychild.getheader(this.index,a)
  //   }
  // }
};
</script>
<style>
.wrap {
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
}
</style>

