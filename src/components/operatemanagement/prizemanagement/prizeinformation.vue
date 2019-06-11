<template>
  <div class="container">
    <div class="header">
      <span class="waitdeliver" @click="waitdeliver ">待发货</span>
    </div>
    <div class="search">
      <h3>
        <span>筛选查询</span>
      </h3>
      <select>
        <option>奖品类型</option>
      </select>
      <select>
        <option>邮寄状态</option>
      </select>
      <select>
        <option>用户账号</option>
      </select>
    </div>
    <div class="content">
      <h3>
        <span>申请列表</span>
      </h3>
      <el-table
        :header-cell-style="{background:'#fafafa',height:'32'}"
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- stripe="true" -->

        <el-table-column prop="goodsid" label="用户账号" width="160px"></el-table-column>
        <el-table-column prop="goodsname" label="邮寄地址" width="234px"></el-table-column>
        <el-table-column prop="goodsclass" label="奖品名称" width="140px"></el-table-column>
        <el-table-column prop="data" label="状态"></el-table-column>
        <el-table-column prop="data" label="操作"></el-table-column>
        <el-table-column prop="data" label="备注" width="234px"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  // 中奖信息
  data() {
    return {};
  },
  methods: {
    waitdeliver() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;
  .header {
    width: 100%;
    height: 60px;
    .waitdeliver {
      display: block;
      width: 122px;
      height: 36px;
      margin-top: 10px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      background: #1abc9c;

      float: left;
      margin-right: 8px;
    }
  }
  .search {
    width: 100%;
    height: 105px;
    border: 1px solid #ccc;
    h3 {
      width: 100%;
      height: 46px;
      background: #eee;
      border-bottom: 1px solid #ddd;
      line-height: 46px;
      span {
        margin-left: 14px;
        font-size: 14px;
      }
    }
    select {
      width: 114px;
      height: 28px;
      margin-top: 13px;
      margin-left: 13px;
    }
  }
  .content {
    width: 100%;
    height: 300px;
    margin-top: 13px;
    h3 {
      width: 100%;
      height: 46px;
      line-height: 46px;
      background: #eee;
      span {
        margin-left: 13px;
        font-size: 14px;
      }
    }
  }
}
</style>
