<template>
  <div class="wrap">
    <h3>
      <span>添加京东卡</span>
      <span @click="back"
        style="width:100px;height:34px;background-color:#ccc;border-radius:5px;float:right;margin-top:26px;line-height:34px;font-size:16px;text-align:center;font-weight:normal"
      >返回</span>
    </h3>
    <div class="content">
      <div class="header">
        <span>添加京东卡</span>
      </div>
      <div style="width:100%;">
        <label style="display: flex;align-items: center;
          justify-content:space-around;">
          <span>
            <b>*</b>面值：
          </span>
          <div>50元</div>
          <div>100元</div>
          <div>500元</div>
          <div>1000元</div>
        </label>
        <label>
          <input class="money" type="text" placeholder="输入面值">
        </label>
        <label>
          <span style="float:left;margin-left:15px;">有效期：</span>
          <div style="width:520px;display:flex;float:left;margin-left:24px;border:none;">
            <input type="text">
            <span
              style="display:block;width:50px;height:38px;line-height:38px; text-align:center;"
            >——</span>
            <input type="text">
            <el-checkbox style="width:30px;height:20px;margin:0 0 0 8px;" v-model="onle">永久有效</el-checkbox>
          </div>
        </label>
        <label>
          <span style="float:left;margin-left:15px;">单位：</span>
          <input class="money" type="text" placeholder="输入单位">
        </label>
        <label>
          <span style="width:78px;float:left;margin-left:-12px;">
            <b>*</b>卡号和密码：
          </span>
          <el-table
            :header-cell-style="{background:'#d7d7d7'}"
            ref="multipleTable"
            :data="tabledata"
            tooltip-effect="dark"
            style="width: 520px;float: right;
    margin: 5px 10px 0 0;"
          >
          <el-table-column prop="cordnum" label="账号："></el-table-column>
      <el-table-column prop="pwd" label="密码："></el-table-column>
          </el-table>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //添加奖品
  data() {
    return {
      onle: "true",
      tabledata:[
          {
              cordnum:"2342567842",
              pwd:"236751"
          }
      ]
    };
  },
  methods:{
    back(){
      this.$router.back()
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 60px;
  margin: 0 auto;
  h3 {
    width: 86%;
    height: 88px;
    line-height: 88px;
    margin: 0 auto;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
  .content {
    width: 86%;
    height: auto;
    margin: 0 auto;
    .header {
      width: 100%;
      height: 48px;
      background: #eee;
      line-height: 48px;
      font-size: 18px;
      font-weight: bold;
      span {
        margin-left: 19px;
      }
    }
    label {
      display: block;
      width: 60%;
      height: 50px;

      margin: 20px auto;
      line-height: 50px;
      span {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: right;
        b {
          color: red;
        }
      }
      div {
        width: 108px;
        height: 40px;
        border: 1px solid #555;
        line-height: 40px;
        text-align: center;
      }
      .money {
        width: 518px;
        height: 40px;
        border: 1px solid #555;
        float: right;
        margin: 5px 10px 0 0;
      }
      .el-table{
          
      }
    }
  }
}
</style>
