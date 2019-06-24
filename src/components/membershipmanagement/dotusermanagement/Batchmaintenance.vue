<template>
  <div class="container">
    <div style="display:flex;">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="api/networkUserManager/importUser"
        :on-success="handlePreview"
        :file-list="fileList"
      >
        <span class="add" type="primary">批量导入经销商用户</span>
      </el-upload>
      <span class="add">
        <a style="display:block;width:100%;height:100%;color:#000;"
          href="api/networkUserManager/downloadTemplateForNetwork?type=2"
          rel="external nofollow"
          download="user"
        >下载模板</a>
      </span>
      <!-- <span class="add" @click="dowmodule">下载导入模板</span> -->
    </div>

    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
    >
      <!-- stripe="true" -->
      <el-table-column prop="phoneNumber" label="用户账号" width="208px">
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.phoneNumber"
            style="width:100%;height:30px;border:none;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="126px">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name" style="width:100%;height:30px;border:none;">
        </template>
      </el-table-column>
      <el-table-column prop="userCat" label="用户类型" width="126px">
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.userCat.userCatName"
            style="width:100%;height:30px;border:none;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="network" label="经销商编号" width="224px">
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.network.networkCode"
            style="width:100%;height:30px;border:none;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="network" label="网点名称">
        <template slot-scope="scope">
          <input
            type="text"
            v-model="scope.row.network.networkName"
            style="width:100%;height:30px;border:none;"
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="126px">
        <!-- <el-button type="text" size="small" @click="edit(id)">编辑</el-button> -->
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>岗位信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>

    <div class="subtable">
      <span @click="subuserdata" style="background:#169bd5;color:#fff;">提交</span>
      <span @click="exit" style="border:1px solid #555;">取消</span>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //网点列表
  data() {
    return {
      delcanvas: false,
      tabledata: [],
      imageUrl: "",
      childValue: false,
      //批量导入弹窗
      uploadexcelcanvas: false,
      excelData: [],
      fileList: []
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
    // edit() {
    //   this.$router.push("/modify");
    // },
    exit() {
      this.delcanvas = false;
      this.uploadexcelcanvas = false;
      this.$refs.upload.clearFiles();
    },

    del() {
      this.delcanvas = false;
    },
    //下载导入模板
    // dowmodule(){
    //   this.$http.get("api/networkUserManager/downloadTemplateForNetwork").then(data=>{
    //     console.log(data)
    //   })
    // },
    //提交批量导入的用户数据
    subuserdata() {
      if (this.tabledata.length == 0) {
        this.$message.error("上传数据为空，请重新上传表");
        this.uploadexcelcanvas = false;
        this.$refs.upload.clearFiles();
      } else {
        Axios({
          url: "api/networkUserManager/saveData",
          method: "post",
          data: {
            userList: this.tabledata
          }
        }).then(data => {
          console.log(data);
          if (data.data.code == 0) {
            this.$message.success("批量添加成功！");
            // this.$router.push();
            this.$refs.upload.clearFiles();
          }
        });
      }
    },

    handlePreview(file) {
      if (file.code == 0) {
        this.$message.success("文件上传成功！");
        //文件上传成功，弹框编辑

        this.tabledata = file.data.userList;
        console.log(file);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
  // .uploadexcelcanvas {
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   left: 0;
  //   top: 0px;
  //   background: #eee;
  //   z-index: 111;
  //   .el-table {
  //     .el-table--border {
  //       td:first-child {
  //         .cell {
  //           padding: 0;
  //         }
  //       }
  //     }
  //     .cell {
  //       padding: 0;
  //     }
  //     td {
  //       padding: 0px;
  //     }
  //   }
  //}
  .subtable {
    width: 300px;
    height: 40px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 120px;
      height: 40px;
      background: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 8px;
    }
  }
}
</style>
