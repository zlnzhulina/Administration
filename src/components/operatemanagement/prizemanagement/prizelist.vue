<template>
  <div class="container">
    <div class="searchwrap">
      <h3></h3>
      <div class="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  // 奖品列表
};
</script>

 <style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  .searchwrap{
      width:100%;
      height:132px;
      border:1px solid #ccc;
      h3{
          height:44px;
          background:"#f2f2f2";
          border-bottom:2px solid #bbb;
      }
      .search{
          width:100%;
          height:84px;
      }
  }
}
</style>
