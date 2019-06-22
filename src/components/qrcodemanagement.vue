<template>
    <div class="wrap">
    <elemcomponent-com :twomenu="twomenu" ref="mychild"></elemcomponent-com>
  </div>
</template>
<script>
// 二维码管理
import elemcomponent from "./elemcomponent/elemcomponent";
export default {
    data(){
        return {
            twomenu:[
                {
                    title:"二维码管理",
                    threemenu:[
                        {
                            title:"二维码列表",
                            navto:"/qrcodemanagement/qrcodelist"
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

