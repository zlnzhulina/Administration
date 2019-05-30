<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addgoods">添加商品</span>
      <span class="add" @click="deleteall">批量删除</span>
      <input type="text" placeholder="账号"><img src="@/assets/sousuo.png"/>
    </div>

    <div class="search">
      <select name="userclass">
        <option>商品库</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <select name="userclass">
        <option>商品类型</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <select name="userclass">
        <option>商品品牌</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <i>添加时间</i><input type="text"/>
      <span>搜索</span>
    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column prop="goodsid" label="商品编号" width="120px"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="284"></el-table-column>
      <el-table-column prop="goodsclass" label="商品分类" width="194px"></el-table-column>
      <el-table-column prop="data" label="时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="146px">
        <el-button type="text" size="small" @click="seedetails(id)">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
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
export default {
  //商品列表
  data() {
    return {
      delcanvas: false,
      tabledata: [
        {
          goodsid: "12543245543",
          goodsname: "wddws",
          goodsclass: "afsefw",
          data: "2019-3-4"
        }
      ]
    };
  },
  methods: {
    //查看
    seedetails(id) {
      this.$router.push({
        path: "/distributordetails"
        // params: {Id:id}
      });
    },
    //添加
    addgoods() {
      this.$router.push({
        path: "/addgoods"
      });
    },
    //编辑
    deleteall() {
      this.delcanvas = true;
    },
    exit() {
      this.delcanvas = false;
    },

    del() {
      this.delcanvas = false;
    }
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
    .add {
      display: block;
      width: 122px;
      height: 36px;
      margin-top: 10px;
      
      border: 1px solid #555;
      color: #7f7f7f;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      border-radius: 5px;
      float: left;
      margin-right: 8px;
    }
    input{
        width:216px;
        height:34px;
        margin-top: 10px;
        border-radius: 15px;
        float: right;
        border: 1px solid #ddd;
        padding-left: 8px;
        outline:none;
    }
    img{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 932px;
        top: 18px;
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
      width: 170px;
      height: 34px;
      margin-left: 16px;
      background: #f2f2f2;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #dfdfdf;
    }
    select {
      width: 150px;
      height: 34px;
      margin-left: 16px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    i{
        font-style: normal;
        margin-left: 15px;

    }
    span {
      display: inline-block;
      width: 80px;
      height: 36px;
      background: #169bd5;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      color: #fff;
      float: right;
      margin-top: 18px;
      margin-right: 16px;
      border-radius: 4px;
    }
  }
  .el-table {
    margin-top: 13px;
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
