<template>
    <div class="container">
<el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column prop="bannerName" label="名称" width="185px"></el-table-column>
      <el-table-column prop="img" label="展示图" width="220px">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width:140px;height:79px;">
        </template>
      </el-table-column>

      <el-table-column prop="url" label="页面链接">
        <template slot-scope="scope">
          <input type="text" :value="scope.row.url" style="width:100%;height:50px;border:none"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="195px">
        <template slot-scope="scope">
        <span @click="replace(scope.row)">替换</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>删除账号后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  //商品列表
  data() {
    return {
      dui: require("@/assets/yes.png"),
      cuo: require("@/assets/no.png"),
      delcanvas: false,
      
      tabledata: [
        {
          index: 1,
          name: "name",
          showphoto: require("@/assets/welcome.png"),
          alink: "https:www.baidu.com"
        }
      ]
    };
  },
  created(){
    //this.cerdlist();
  },
  methods: {
      
    // cerdlist(){
    //   Axios({
    //     url:"api/contentManager/bannerList",
    //     method:"get",
    //   }).then(data=>{
    //     console.log(data)
    //     this.tabledata=data.data.data.bannerList;
    //   })
    // },
    //编辑
    replace(row){
console.log(row);
    },
  
    //编辑
  
    exit() {
      this.delcanvas = false;
    },
    del(){

    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;

  .el-table {
    margin-top: 13px;
   .el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: transparent !important;
}
  }
   
  .delcanvas {
    width: 360px;
    height: 240px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    top: 190px;
    background: #eff1f5;
    border-radius: 8px;
    overflow: hidden;
    z-index: 99;
    border: 1px solid #dfdfdf;
    h3 {
      width: 100%;
      height: 60px;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
    }
    p {
      width: 100%;
      height: 114px;
      margin-top: 16px;
      text-align: center;
      font-size: 12px;
    }
    span {
      display: block;
      width: 180px;
      font-size: 12px;
      float: left;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
