<template>
  <div class="wrap">
    <h3>
      <span>运营管理>资讯列表>添加资讯</span>
    </h3>
    <div class="title">
      <p>基本信息</p>
    </div>
    <ul class="information">
      <li>
        <span>标题</span>
        <input type="text">
      </li>
      <li style="height:100px;">
        <span>资讯摘要</span>
        <textarea></textarea>
      </li>
      <li>
          <span>资讯封面图：</span>
          <div class="coverimg"></div>
      </li>
    </ul>
    <div class="title">
      <p>详细信息</p>
    </div>
  </div>
</template>

<script>
export default {
  //添加活动资讯
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1000px;
  padding-top: 90px;
  margin: 0 auto;
  h3 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
  .title {
    width: 910px;
    height: 27px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto;

    p {
      width: 100px;
      height: 27px;
      line-height: 27px;
      font-size: 12px;
      color: #555;
      text-align: center;
      border-bottom: 2px solid red;
    }
  }
  .information {
    width: 50%;
    height: auto;
    margin: 0 auto;
    li {
      width: 100%;
      height: 58px;
      line-height: 58px;
      list-style: none;
      text-align: center;
      span {
        display: inline-block;
        width: 75px;
        height: 58px;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
        color: #555;
      }
      input {
        width: 320px;
        height: 38px;
        font-size: 12px;
        color: #555;
        margin-left: 17px;
        border: 1px solid #555;
        border-radius: 5px;
      }
      textarea{
          width: 320px;
          height: 80px;
          margin-right: 42px;
          border: 1px solid #555;
          border-radius: 5px;
          display: block;
          float: right;
      }
      .coverimg{
        
      }
    }
  }
}
</style>
