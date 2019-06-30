<template>
  <div class="container">
    <div class="search">
      <span v-on:click="createactivity">创建</span>
      <span class="delete">批量删除</span>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="endTime" label="有效时间"></el-table-column>
      <el-table-column prop="activityType" label="活动状态">
        <template slot-scope="scope">
          {{scope.row.activityType==0?"未结束":""}}
          {{scope.row.activityType==1?"已结束":""}}
          {{scope.row.activityType==2?"已取消":""}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="310">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="small">结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block fr" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  // 活动列表
  data() {
    return {
      tableData: [],
      totalCount: 1,
      pagesize: 10,
      currentPage: 1
    };
  },
  created() {
    this.activitylist();
  },
  methods: {
    activitylist() {
      Axios({
        url: "api/activityManager/activityList",
        method: "get",
        params: {
          pageNo: this.currentPage,
          pageSize: this.pagesize,
        }
      }).then(data => {
        // console.log(data);
        this.tableData = data.data.data.activityPage.records;
        this.totalCount = data.data.data.activityPage.total;
        this.pagesize = data.data.data.activityPage.size;
        this.currentPage = data.data.data.activityPage.current;
      });
    },
    createactivity: function() {
      this.$router.push("/createactivity");
    },
    //查看活动详情
    details(row) {
      this.$router.push({
        path: "/activitydetails",
        query:{
          flag:1,
          data:row,
        }
      });
    },
    //编辑
    edit(row){
      this.$router.push({
        path:"/createactivity",
        query:{flag:1,rowdata:row}
      })
    },
    //分页功能
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.activitylist();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
  .el-table {
    margin-top: 13px;
    .el-table-column {
      text-align: center;
    }
  }
}
</style>
