<template>
  <div class="container">
    <div class="left" style="width:342px;float:left;
    height:606px;background:#ccc"></div>
    <div class="right" style="float:left;width:75%;margin-left:18px;">
      <el-table
        :header-cell-style="{background:'#ccd1e0',height:'32'}"
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="bannerName" label="名称" width="182px"></el-table-column>
        <el-table-column prop="img" label="展示图" width="136px">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:140px;height:79px;">
          </template>
        </el-table-column>
        <el-table-column prop="xcxid" label="小程序ID" width="186px"></el-table-column>

        <el-table-column prop="url" label="链接">
          <template slot-scope="scope">
            <input type="text" :value="scope.row.url" style="width:100%;height:50px;border:none">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="82px">
          <template slot-scope="scope">
              <el-button size="small" @click="replace(scope.row)">更换</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  // 消费者活动说明页
  data(){
      return {
          tabledata:[],

      }
  },
  created(){
this.activityexplainlist();
  },
  methods:{
    activityexplainlist(){
       Axios({
        url:"api/contentManager/pageSetList",
        method:"get",
        params:{
          type:3
        }
      }).then(data=>{
        // console.log(data)
        this.tabledata=data.data.data.pageSetList;
      })
    },
      replace(){

      }
  }
};
</script>

<style>
</style>
