<template>
  <div class="container">
    <span class="add" @click="adddot">添加网点</span>
    <span class="add">批量导入</span>
    <span class="add" @click="deleteall">批量删除网点</span>
    <span class="add">下载导入模板</span>
    <div class="search">
      <input type="text" placeholder="网点名称/编号">
      <span>查询</span>
    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="distributorid" label="经销商编号" width="168px"></el-table-column>
      <el-table-column prop="dotname" label="网点名称" width="248px"></el-table-column>
      <el-table-column prop="dotaddress" label="网点地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130px">
        <el-button type="text" size="small" @click="seedetails(id)">查看</el-button>
        <el-button type="text" size="small" @click="edit(id)">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>岗位信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>
  </div>
</template>

<script>
export default {
  //网点列表
  data() {
    return {
      delcanvas: false,
      tabledata: [
        {
          distributorid: "12543245543",
          dotname: "北京xxxxx汽车服务销售有限公司",
          dotaddress: "北京市海淀区中关村"
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
    adddot() {
      this.$router.push({
        path: "/adddot"
        // params: {Id:id}
      });
    },
    //编辑
    edit(id) {
      this.$router.push({
        path: "/adddot",
        params: { Id: id }
      });
    },
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
  .add {
    display: block;
    width: 122px;
    height: 36px;
    margin-top: 10px;
    margin-bottom: 13px;
    border: 1px solid #555;
    color: #7f7f7f;
    text-align: center;
    line-height: 36px;
    font-size: 12px;
    border-radius: 5px;
    float: left;
    margin-right: 8px;
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
    width: 300px;
    height: 170px;
    position: absolute;
    left: 50%;
    margin-left: -252px;
    top: 190px;
    background: #eff1f5;
    h3{
            width: 100%;
            height: 60px;
            font-size: 18px;
            text-align: center;
            line-height:60px;
          }
          p{
            width: 100%;
            height: 54px;
            margin-top: 16px;
            text-align: center;
            font-size: 12px;
          }
          span{
            display: block;
            width: 150px;
            float: left;
            height: 40px;
            text-align: center;
            line-height: 40px;
          }
  }
}
</style>
