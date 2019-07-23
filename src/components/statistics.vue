<template>
    <div class="wrap">
    <elemcomponent-com :twomenu="twomenu" ref="mychild"></elemcomponent-com>
  </div>
</template>
<script>
//统计
import elemcomponent from "./elemcomponent/elemcomponent";
export default {
    data(){
        return {
            twomenu:[
                {
                    title:"统计",
                    threemenu:[
                        {
                            title:"概况",
                            navto:"/statistics/survey"
                        },
                        {
                            title:"用户统计",
                            navto:"/statistics/userstatistics"
                        },
                        {
                            title:"活动统计",
                            navto:"/statistics/activitystatistics"
                        },
                        {
                            title:"商品统计",
                            navto:"/statistics/goodsstatistics"
                        },
                        {
                            title:"服务站统计",
                            navto:"/statistics/dotstatistics"
                        },
                        {
                            title:"行为统计",
                            navto:"/statistics/visitstatistics"
                        }
                    ]
                }
            ]
        }
    },
     components: {
    "elemcomponent-com": elemcomponent
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
}
</style>

