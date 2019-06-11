<template>
  <div class="wrap">
    <h2>
      <span>添加参数</span>
    </h2>
    <ul>
      <li>
        <span>
          <i>*</i> 选择分类：
        </span>
        <select></select>
      </li>
      <li style="vertical-align: middle;">
        <span>已有参数：</span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </li>
      <li style="margin-top:123px;">
        <span>参数名称：</span>
        <input type="text" placeholder="请输入参数名称">
      </li>
      <li style="width:120px;height:36px;background:#00bfbf;position:absolute;bottom:12px;left:50%;margin-left:-60px;text-align:center;line-height:36px;color:#fff;font-size:14px;">
          保存
      </li>
    </ul>
  </div>
</template>

<script>
//添加奖品参数
export default {};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  margin: 0 auto;
  padding-top: 90px;
  h2 {
    margin-top: 13px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #eee;
    span {
      margin-left: 15px;
      font-size: 16px;
    }
  }
  ul {
    width: 1118px;
    height: 644px;
    margin: 0 auto;
    border: 1px solid #ccc;
    position: relative;
    li {
      width: 568px;
      height: 84px;
      line-height: 84px;
      list-style: none;
      margin: 0 auto;
      span {
        display: inline-block;
        width: 150px;
        text-align: right;
        i {
          color: red;
        }
      }
      input {
        width: 300px;
        height: 46px;
        margin-left: 13px;
      }
      select {
        width: 300px;
        height: 46px;
        margin-left: 13px;
      }
      ul {
        width: 300px;
        height: auto;
        border: none;
        line-height: 0;
        float: right;
        margin-right: 114px;
        li {
          width: 298px;
          height: 28px;
          border: 1px solid #ccc;
          margin-left: 13px;
        }
      }
    }
  }
}
</style>
