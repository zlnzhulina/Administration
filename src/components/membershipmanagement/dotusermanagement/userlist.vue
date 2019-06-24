<template>
  <div class="container">
    <span class="add" @click="adduser">添加用户</span>
    <span class="add" @click="batchmaintenance">批量导入用户</span>
    <span class="add" @click="deleteall">批量删除用户</span>
    <span class="add">下载导入模板</span>
    <div class="search">
      <select name="userclass" v-model="userCatId">
        <option value="">--请选择用户类型--</option>
       <option v-for="(item,index) in position" :value="item.userCatId">{{item.userCatName}}</option>
      </select>
      <input type="text" placeholder="用户账号" v-model="phoneNumber">
      <span @click="search">查询</span>
    </div>
    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="phoneNumber" label="会员账号" width="208px"></el-table-column>
      <el-table-column prop="userCat.userCatName" label="用户类型" width="158px"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="180px"></el-table-column>
      <el-table-column prop="network.networkName" label="网点名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="240px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="seedetails(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能-->
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
    <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>岗位信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
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
      phoneNumber:"",
      pagesize: 7,
      currentPage: 1,
      totalCount: 0,
      tabledata: [],
      //选中的用户列表
      useridarr: [],
      //删除的用户id
      deluserids: "",
      //职位列表
      position:[],
      //选中的职位id
      userCatId:""
    };
  },
  created: function() {
    this.init();
    this.selectUserCatList();
  },
  methods: {
    deleteUser(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            method: "get",
            url: "api/networkUserManager/delUser" + "?userIds=" + row.userId
          }).then(data => {
            this.init();
            console.log(data);
            if (data.data.code == "0") {
              this.$message({
                message: data.data.msg,
                type: "success"
              });
            }
            if (data.data.code == "-1") {
              this.$message({
                message: data.data.msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //搜索功能
    search(){
      this.init();
    },
    batchmaintenance() {
      this.$router.push("/Membershipmanagement/batchmaintenance");
    },
     selectUserCatList:function(){
        Axios(
        {
          method: "get",
          url: "api/networkUserManager/UserCatList"+'?pageNo=1&pageSize=10',
        }
      ).then(data => {
          console.log(data)
          
        this.position = data.data.data.userCatPage.records;
        console.log(this.position)
      })
    },
    init: function() {
      Axios({
        method: "get",
        url:
          "api/networkUserManager/userList" +
          "?pageNo=" +
          this.currentPage +
          "&pageSize=" +
          this.pagesize+"&phoneNumber="+this.phoneNumber+"&userCatId="+this.userCatId
      }).then(data => {
        console.log(data);
        this.totalCount = data.data.data.userPage.total;
        this.pagesize = data.data.data.userPage.size;
        this.currentPage = data.data.data.userPage.current;
        this.tabledata = data.data.data.userPage.records;
      });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable();
    },
    //查看
    seedetails(row) {
      this.$router.push({
        path: "/userdetails",
        query: { flag: "2", data: row }
        // params: {Id:id}
      });
    },
    //添加
    adduser() {
      this.$router.push({
        path: "/adduser"
      });
    },
    edit(row) {
      this.$router.push({
        path: "/adduser",
        query: { flag: "1", networkParm: row }
      });
    },
    //批量删除
    deleteall() {
      this.$confirm("此操作将永久删除多条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "api/networkUserManager/delUser",
            method: "get",
            params: {
              userIds: this.deluserids
            }
          }).then(data => {
            console.log(data);
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量选中
    handleSelectionChange(val) {
      console.log(val)
      this.useridarr.length = 0;
      for (var i = 0; i < val.length; i++) {
        this.useridarr.push(val[i].userId);
      }

      this.deluserids = this.useridarr.toString();
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
  width: 100%;
  height: 100%;
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
