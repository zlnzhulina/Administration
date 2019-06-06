<template>
<div class="container">
  <div class="search">
      <span>消费者活动</span>
    <select name="user">
      <option>负责人</option>
      <option>机修工</option>
      <option>SA</option>
    </select>
    <span>渠道活动</span>
    <select name="userclass">
      <option>负责人</option>
      <option>机修工</option>
      <option>SA</option>
    </select>
    <span>查询</span>
  </div>
  </div>
</template>

<script>
export default {};
//二维码列表
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;
  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    background: #f2f2f2;
    input {
      width: 212px;
      height: 34px;
      margin-left: 16px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #dfdfdf;
    }
    select {
      width: 150px;
      height: 34px;
      margin-left: 16px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    span {
      display: inline-block;
      width: 80px;
      height: 36px;
      background: #169bd5;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      color: #fff;
      float: right;
      margin-top: 18px;
      margin-right: 16px;
      border-radius: 4px;
    }
  }
}
</style>
