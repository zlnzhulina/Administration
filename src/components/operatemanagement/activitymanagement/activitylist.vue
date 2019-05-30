<template>
  <div class="container">
    <div class="search">
      <span v-on:click="createactivity">创建</span>
      <span class="delete">批量删除</span>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="name" label="有效时间" width="180"></el-table-column>
      <el-table-column prop="address" label="活动状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="320">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">结束</el-button>
        <el-button type="text" size="small">二维码管理</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // 活动列表
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods:{
    createactivity:function(){
      this.$router.push("/createactivity")
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  .search {
    width: 100%;
    height: 26px;
    span {
      width: 80px;
      height: 24px;
      float: left;
      display: block;
      font-size: 12px;
      text-align: center;
      border: 1px solid #797979;
      line-height: 24px;
      border-radius: 6px;
    }
    .delete {
      margin-left: 22px;
    }
  }
  .el-table-column{
      text-align: center;
  }
}
</style>
