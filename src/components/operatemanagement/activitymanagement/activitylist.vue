<template>
  <div class="container">
    <div class="search">
      <span v-on:click="createactivity">创建</span>
      <span class="delete">批量删除</span>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="activityName" label="活动名称" width="185"></el-table-column>
      <el-table-column prop="endTime" label="有效时间" width="185"></el-table-column>
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
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">结束</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  // 活动列表
  data() {
    return {
      tableData: [
        
      ]
    };
  },
  created(){
    this.activitylist()
  },
  methods:{
    activitylist(){
      Axios({
        url:"api/activityManager/activityList",
        method:"get",
        params:{
          pageNo:"1",
          pageSize:"8",
        }
      }).then(data=>{
        console.log(data);
        this.tableData=data.data.data.activityPage.records;
      })
    },
    createactivity:function(){
      this.$router.push("/createactivity")
    },
    //查看活动详情
    details(row){
      this.$router.push({
        path:"/activitydetails",

      })
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
