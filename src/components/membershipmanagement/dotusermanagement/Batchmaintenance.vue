<template>
  <div class="container">
    <el-upload
      class="upload-demo"
      action="api/networkUserManager/importUser"
      :on-success="handlePreview"
    >

      <span class="add" @click="uploadexcel" type="primary">批量导入经销商用户</span>
    </el-upload>
    <span class="add">下载导入模板</span>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column prop="VIPid" label="用户账号" width="128px"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="126px"></el-table-column>
      <el-table-column prop="userclass" label="用户类型" width="126px"></el-table-column>
      <el-table-column prop="distributornum" label="经销商编号" width="184px"></el-table-column>
      <el-table-column prop="dotname" label="网点名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="126px">
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
          VIPid: "12543245543",
          userclass: "机修工",
          distributornum: "22431151515",
          name: "张三",
          dotname: "北京xxxxx汽车服务销售有限公司"
        }
      ],
      imageUrl: "",
      childValue: false
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
    adduser() {
      this.$router.push({
        path: "/adduser"
      });
    },
    //编辑
    edit() {
      this.$router.push("/modify");
    },
    exit() {
      this.delcanvas = false;
    },

    del() {
      this.delcanvas = false;
    },
    //批量导入
    uploadexcel() {},
    bbb() {
      return this.GLOBAL.excelUrl;
    },
    handlePreview(file) {
      if (file.code == 0) {
        this.$message.success("文件上传成功！");
        console.log(file);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isXls = file.type === "application/vnd.ms-excel";
      if (!isXlsx && !isXls) {
        this.$message.error("上传文件只能是xls/xlsx格式!");
      }
      return isXlsx || isXls;
    },
    uploadError() {},
    uploadSuccess() {
      console.log(this.childValue);
      this.$emit("childByValue", this.childValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;
  .el-upload {
    float: left;
  }
  .el-upload--text {
    float: left;
  }
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
    h3 {
      width: 100%;
      height: 60px;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
    }
    p {
      width: 100%;
      height: 54px;
      margin-top: 16px;
      text-align: center;
      font-size: 12px;
    }
    span {
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
