<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addgoods">添加</span>
    </div>

    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="editrow"
    >
      <!-- stripe="true" -->
      <el-table-column prop="index" label="序" width="30px"></el-table-column>
      <el-table-column prop="name" label="名称" width="185px"></el-table-column>
      <el-table-column prop="showphoto" label="展示图" width="220px">
        <template slot-scope="scope">
          <img :src="scope.row.showphoto" style="width:140px;height:79px;">
        </template>
      </el-table-column>

      <el-table-column prop="alink" label="链接">
        <template slot-scope="scope">
          <input type="text" :value="scope.row.alink" style="width:100%;height:50px;border:none"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="195px">
        <template>
          <div style="width:100%;height:46px;vertical-align: middle;">
            <div style="float:left;heigth:46px;">
                <div>上移</div>
                <div>下移</div>
            </div>
            <span style="margin-top:22px">更换</span>
            <span>删除</span>
          </div>
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
        },
        {
          index: 1,
          name: "name",
          showphoto: require("@/assets/welcome.png"),
          alink: "https:www.baidu.com"
        },
        {
          index: 1,
          name: "name",
          showphoto: require("@/assets/welcome.png"),
          alink: "https:www.baidu.com"
        }
      ]
    };
  },
  methods: {
    //编辑
    editrow(row) {
      this.rowdata = row;
      if (this.cl) {
        this.edit(row);
      }
    },
    edit(val) {
      this.cl = true;
      console.log(val);
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
  }

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
