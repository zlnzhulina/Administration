<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >访问统计</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <div class="title">
      <b>转化漏斗</b>
    </div>
    <div class="head">
      <b>创建漏斗</b>
    </div>
    <div class="content">
      <p>
        <span>选择活动</span>
        <select>
          <option>请选择要添加转化漏斗的活动</option>
        </select>
      </p>
      <p>
        <span>漏斗名称</span>
        <input type="text" />
      </p>
    </div>
    <ul>
        <li v-for="(item,index) in step">
            <i>*</i><span>{{index==0?"第一步起始动作":"第"+index+1+"步"}}</span><input type="text" placeholder="请输入步骤名称"/><select><option>请选择事件</option></select>
            <a>删除</a>
            </li>
    </ul>
    <span style="display:inline-block;padding:11px 19px 11px 19px;border:1px solid #02a7f0;color:#02a7f0;font-size:12px;border-radius: 6px;margin-top:10px;">重置</span>
    <span style="display:inline-block;padding:11px 19px 11px 19px;border:1px solid #02a7f0;color:#02a7f0;font-size:12px;border-radius: 6px;margin:10px 0 0 15px;">添加步骤</span>
    <p style="margin-top:30px;">创建说明：</p>
    <p>1、每个转化分析模型最多可设置8个步骤;</p>
    <p>2、新转化分析模型创建后数据次日生成;</p>
  </div>
</template>
<script>
//创建漏斗
export default {
  data() {
    return {
        step:[{},{}]
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1120px;
  height: auto;
  padding-top: 60px;
  margin: 0 auto;
  .header {
    width: 100%;
    height: 62px;
  }
  .title {
    width: 100%;
    height: 38px;
    line-height: 38px;
    b {
      font-size: 18px;
    }
  }
  .head {
    width: 100%;
    height: 60px;
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    margin-bottom: 0;
    line-height: 60px;
    b {
      font-size: 18px;
      color: #555;
      margin-left: 13px;
    }
  }
  .content {
    width: 860px;
    height: 200px;
    margin: 0 auto;
    p {
        margin-top: 40px;
        span{
           width: 190px; 
           height: 30px;
           text-align: right;
           display: inline-block;
           font-size: 18px;
           font-weight: bold;
        }
      select {
        width: 422px;
        height: 40px;
        border: 1px solid #d7d7d7;
        border-radius: 4px;
        margin-left: 13px;
      }
      input {
        width: 422px;
        height: 40px;
        border: 1px solid #d7d7d7;
        border-radius: 4px;
         margin-left: 13px;
      }
    }
  }
  ul{
      width: 100%;
      height: auto;
      li{
          width: 100%;
          height: 38px;
          line-height: 38px;
          background: #f3f3f3;
          margin-bottom: 10px;
          list-style: none;
          i{
              color: red;
              margin-left: 80px;
              margin-right: 6px;
          }
          span{
              display: inline-block;
              width: 107px;
              text-align: left;
          }
          input{
              width: 286px;
              height: 24px;
              border: 1px solid #d7d7d7;
              color: #c7c7c7;
          }
          select{
              width: 286px;
              height: 24px;
              border: 1px solid #d7d7d7;
              color: #c7c7c7;
              margin-left: 14px;
          }
          a{
              float: right;
              padding-right: 15px;
              color: #169bd5;
          }
      }
  }
}
</style>