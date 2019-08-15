<template>
  <div class="wrap">
    <h3>
      <span>网点用户详情>经销商名称...</span>
    </h3>
    <div class="tab">
      <div class="activitytype">
        <img :src="frongImg" style="width:85%;height:92px;margin-top:6px;" />
        <p>{{rowdata.networkName}}</p>
      </div>
      <div class="tdtwo">
        <p>经销商编号</p>
        <p>网点名称</p>
        <p>网点地址</p>
      </div>
      <div class="tdthree">
        <p>{{rowdata.networkCode==null?"暂无":rowdata.networkCode}}</p>
        <p>{{rowdata.networkName==null?"暂无":rowdata.networkName}}</p>
        <p>{{rowdata.area==null?"暂无":rowdata.area+rowdata.city+rowdata.address}}</p>
      </div>
      <div class="tdtwo">
        <p>联系人</p>
        <p>联系电话</p>
        <p>网点区域</p>
      </div>
      <div class="tdthree">
        <p>{{rowdata.linkman==null?"暂无":rowdata.linkman}}</p>
        <p>{{rowdata.phoneNumber==null?"暂无":rowdata.phoneNumber}}</p>
        <p>暂无</p>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="network.networkCode" label="经销商编号" width="290"></el-table-column>
      <el-table-column prop="network.networkId" label="网点名称" width="310"></el-table-column>
      <el-table-column prop="userCat.userCatName" label="职位"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="账号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deluser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //查看经销商详细信息
  data() {
    return {
      networkId: "",
      rowdata: {},
      //
      frongImg: "",
      tableData: []
    };
  },
  created: function() {
    this.init();
    // console.log(this.$route.query);
    this.rowdata = this.$route.query.rowdata;
    this.frongImg = this.$route.query.frongImg;
  },
  methods: {
    init: function() {
      if (this.$route.query.flag == 1) {
        //网点详情
        this.networkId = this.$route.query.rowdata.networkId;
        this.networkDetail(this.networkId);
      } else if (this.$route.query.flag == 2) {
        // console.log(this.$route.query.data)
      }
    },
    networkDetail(netId) {
      Axios({
        method: "get",
        url: "api/networkUserManager/networkDetail" + "?networkId=" + netId
      }).then(data => {
        // console.log(data);
        this.tableData = data.data.data.userList;
      });
    },
    edit(row) {
      this.$router.push({
        path:"/adduser",
        query:{
          flag:"2",
          rowdata:row,
        }
        });
    },
    deluser(row){
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
            // console.log(data);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 60px;
  margin: 0 auto;
  h3 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
  .tab {
    width: 982px;
    height: 150px;
    display: flex;
    text-align: center;
    margin: 30px auto;
    p {
      line-height: 48px;
    }
    .activitytype {
      width: 214px;
      height: 148px;
      text-align: center;
      background: #ddd;
      border: 1px solid #ccc;
    }
    .tdtwo {
      width: 124px;
      height: 150px;
      background: #ddd;

      p {
        width: 124px;
        height: 48px;
        border: 1px solid #ccc;
      }
    }
    .tdthree {
      width: 266px;
      height: 150px;

      p {
        width: 266px;
        height: 48px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>

