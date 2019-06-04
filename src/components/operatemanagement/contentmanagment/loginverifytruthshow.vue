<template>
  <div class="container">
    <div class="left" style="width:342px;float:left;
    height:606px;background:#ccc"></div>
    <div class="right" style="float:right;width:600px;">
      <el-table
        :header-cell-style="{background:'#9decff',height:'32'}"
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="bannerName" label="名称" width="82px"></el-table-column>
        <el-table-column prop="img" label="展示图" width="136px">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:140px;height:79px;">
          </template>
        </el-table-column>
        <el-table-column prop="xcxid" label="小程序ID" width="146px"></el-table-column>

        <el-table-column prop="url" label="链接">
          <template slot-scope="scope">
            <input type="text" :value="scope.row.url" style="width:100%;height:50px;border:none">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="82px">
          <template slot-scope="scope">
              <el-button size="small" @click="replace(scope.row)">更换</el-button>
              <el-button size="small" @click="del(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  // 登陆页验真展示
  data(){
      return {
          tabledata:[],

      }
  },
  methods:{
      replace(){

      },
      del(){
          
      }
  }
};
</script>

<style>
</style>
