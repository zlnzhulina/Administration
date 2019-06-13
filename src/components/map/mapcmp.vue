<template>
    
</template>

<script>
export default {
    mounted () {
    var map = new BMap.Map('allmap')
    var point = new BMap.Point(111.742579, 40.818675)
    map.centerAndZoom(point, 12)
    var marker = new BMap.Marker(point)  // 创建标注
    map.addOverlay(marker)              // 将标注添加到地图中
},
}
</script>

<style>

</style>
