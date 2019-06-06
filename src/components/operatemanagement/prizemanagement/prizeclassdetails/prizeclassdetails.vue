<template>
  <div class="wrap">
    <h3>
      <span>京东卡</span>
      <span
        style="width:100px;height:34px;background-color:#ccc;border-radius:5px;float:right;margin-top:26px;line-height:34px;font-size:16px;text-align:center;font-weight:normal"
      >返回</span>
    </h3>
    <div class="search">
      <span>面值：</span>
      <select name="userclass">
        <option>全部</option>
      </select>
      <span>状态：</span>
      <select name="userclass">
        <option>全部</option>
      </select>
      <span>有效期：</span>
      <input type="text">
    </div>
    <h3 style="height:42px;background:#ddd;line-height:42px;">
      <span>京东卡</span>
      <span
        style="width:100px;height:34px;background-color:#ccc;border-radius:5px;float:right;margin-right:5px;margin-top:4px;line-height:34px;font-size:16px;text-align:center;font-weight:normal"
        @click="addprize()"
      >添加</span>
    </h3>
    <el-table
      :header-cell-style="{background:'#9decff'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->

      <el-table-column prop="prizeclassname" label="分类名称" width="140px"></el-table-column>
      <el-table-column prop="money" label="面值" width="126px"></el-table-column>
      <el-table-column prop="term" label="有效期"></el-table-column>
      <el-table-column prop="num" label="账号"></el-table-column>
      <el-table-column prop="pwd" label="密码"></el-table-column>
      <el-table-column prop="isstor" label="状态"></el-table-column>

      <el-table-column fixed="right" label="操作" width="176px">
        <template>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//奖品分类详情
export default {
  data() {
    return {
      tabledata: [
        {
          prizeclassname: "京东卡",
          money: "20",
          term: "2019-6-26",
          num: "1211314",
          pwd: "********",
          isstor: "已占用"
        }
      ]
    };
  },
  methods:{
    addprize() {
      this.$router.push("/addprize");
    }
  }
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

      text-align: center;
      line-height: 36px;
      font-size: 12px;

      margin-left: 10px;
    }
  }
}
</style>
