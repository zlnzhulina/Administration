<template>
  <div class="container">
      <span class="add" @click="addpost">添加</span>
      <div>
          
      </div>
  </div>
</template>

<script>
export default {
  // 首页活动资讯
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;
  .add{
      display: block;
      width: 122px;
      height: 36px;
      margin-top: 10px;
      border: 1px solid #555;
      color: #7f7f7f;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      border-radius: 5px;
  }
}
</style>
