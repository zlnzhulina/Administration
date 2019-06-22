<template>
  <div class="container">
    <div class="search">
      <span @click="addstaff">添加员工</span>
      <span class="delete" @click="delstaff">删除选中</span>
      <input type="text" placeholder="请输入关键字搜索" v-model="searchval">
    </div>
    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      stripe
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55" v-model="checkList"></el-table-column>
      <el-table-column fixed="left" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delyg(scope.$index,scope.row)">移除</el-button>
          <el-button type="text" size="small" @click="edityg(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="adminName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="phoneNumber" label="联系方式" width="180"></el-table-column>
      <el-table-column prop="departmentName" label="部门" show-overflow-tooltip></el-table-column>
      <el-table-column prop="postName" label="岗位" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="addcanvas" v-if="addstaffcanvas">
      <div class="edit">
        <h3>添加员工</h3>
        <ul>
          <li>
            <span>部门</span>
            <select
              name="department"
              id="department"
              class="department"
              v-model="departmentmodle.departmentid"
            >
              <option value="volvo">—请选择—</option>
              <option
                v-for="(item,index) in department"
                :value="item.departmentId"
              >{{item.departmentName}}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理部门</span>
          </li>
          <li>
            <span>岗位</span>
            <select
              name="department"
              id="department"
              class="department"
              v-model="departmentmodle.postId"
            >
              <option>—请选择—</option>
              <option v-for="(item,index) in post" :value="item.postId">{{item.postName}}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理岗位</span>
          </li>
          <li>
            <span>姓名</span>
            <input type="text" v-model="departmentmodle.adminName">
          </li>
          <li>
            <span>联系方式</span>
            <input type="tel" v-model="departmentmodle.phoneNumber">
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yes">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    <div class="addcanvas" v-if="editstaffcanvas">
      <div class="edit">
        <h3>编辑员工</h3>
        <ul>
          <li>
            <span>部门</span>
            <select
              name="department"
              id="department"
              class="department"
              v-model="editmodle.departmentid"
            >
              <option value="volvo">—请选择—</option>
              <option
                v-for="(item,index) in department"
                :value="item.departmentId"
              >{{item.departmentName}}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理部门</span>
          </li>
          <li>
            <span>岗位</span>
            <select
              name="department"
              id="department"
              class="department"
              v-model="editmodle.postId"
            >
              <option>—请选择—</option>
              <option v-for="(item,index) in post" :value="item.postId">{{item.postName}}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理岗位</span>
          </li>
          <li>
            <span>姓名</span>
            <input type="text" v-model="editmodle.adminName">
          </li>
          <li>
            <span>联系方式</span>
            <input type="tel" v-model="editmodle.phoneNumber">
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yesedit">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    <!-- <div class="delcanvas" v-if="delstaffcanvas">
      <h3>温馨提示</h3>
      <p>员工信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div> -->
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      useridarr:[],
      checkList:[],
      searchval:"",
      delstaffcanvas: false,
      addstaffcanvas: false,
      editstaffcanvas: false,
      pageNo: 1,
      pageSize: 7,
      department: [],
      departmentName: "",
      postName: "",
      tableData: [],
      departmentmodle: {
        departmentid: "",
        adminName: "",
        postId: "",
        phoneNumber: ""
      },
      editmodle: {
        departmentid: "",
        adminName: "",
        postId: "",
        phoneNumber: ""
      }
    };
  },
  created() {
    this.yglist();
    this.postlist();
    this.departmentlist();
  },
  watch:{
    searchval(){
      this.yglist();
    },
    checkList(val){
      console.log(val);
    }
  },
  methods: {
    handleSelectionChange(val) {
       this.useridarr.length=0;
      for(var i=0;i<val.length;i++){
        this.useridarr.push(val[i].adminUserId)
      };
        
        this.deluserids=this.useridarr.toString()
      },
     //搜索功能
    yglist() {
      Axios({
        method: "get",
        url: "api/systemManager/adminUserList",
        params: {
          pageNo: this.pageNo,
          adminPassword: this.userpwd,
          adminName: this.searchval,
        },
        headers: {
          ADMINLOGINTOKEN: localStorage.ADMINLOGINTOKEN
        }
      }).then(data => {
        this.tableData = data.data.data.userPage.records;
        console.log(data);
      });
    },
    postlist() {
      Axios({
        method: "get",
        url: "api/systemManager/postList",
        params: {
          pageNo: "1",
          pageSize: "30",
          postName: ""
        },
        headers: {
          ADMINLOGINTOKEN: localStorage.ADMINLOGINTOKEN
        }
      }).then(data => {
        this.post = data.data.data.postPage.records;
        console.log(data);
      });
    },
    departmentlist() {
      Axios({
        method: "get",
        url: "api/systemManager/departmengList",
        params: {
          pageNo: "1",
          pageSize: "30",
          departmentName: ""
        },
        headers: {
          ADMINLOGINTOKEN: localStorage.ADMINLOGINTOKEN
        }
      }).then(data => {
        this.department = data.data.data.departmentPage.records;
        console.log(data);
      });
    },
    addstaff() {
      this.addstaffcanvas = true;
    },
    // 添加员工
    yes() {
      Axios({
        url: "api/systemManager/addAdminUser",
        method: "post",
        data: {
          adminUserName: localStorage.name,
          adminName: this.departmentmodle.adminName,
          departmentId: this.departmentmodle.departmentid,
          postId: this.departmentmodle.postId,
          phoneNumber: this.departmentmodle.phoneNumber
        }
      }).then(data => {
        console.log(data);
        this.yglist();
      });
      this.addstaffcanvas = false;
    },
    //编辑员工
    edityg(index, row) {
      console.log(row);
      
      this.editmodle.departmentid = row.departmentId;
      this.editmodle.postId=row.postId;
      this.editmodle.adminName=row.adminName;
      this.editmodle.adminUserName=row.adminUserName;
      this.editmodle.phoneNumber=row.phoneNumber;
      this.editmodle.adminUserId=row.adminUserId;
      this.editstaffcanvas = true;
    },
    yesedit(){
      Axios({
        url:"api/systemManager/editAdminUser",
        method:"post",
        data:{
          adminUserName:this.editmodle.adminUserName,
          adminName:this.editmodle.adminName,
          departmentId:this.editmodle.departmentid,
          postId:this.editmodle.postId,
          phoneNumber:this.editmodle.phoneNumber,
          adminUserId:this.editmodle.adminUserId,
        }
      }).then(data=>{
        if(data.data.code==0){
          this.yglist();
           this.editstaffcanvas = false;
        }
        console.log(data);
      })
    },
    exit() {
      this.addstaffcanvas = false;
      this.delstaffcanvas = false;
      this.editstaffcanvas = false;
    },
   delyg(index,row){
     this.adminUserIds=row.adminUserId
     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios({
            url:"api/systemManager/delAdminUser",
            method:"get",
            params:{
              adminUserIds:this.adminUserIds
            }
          }).then(data=>{
            if(data.data.code==0){
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.yglist();
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
   //删除选中
   delstaff(){
     this.$confirm('此操作将永久删除多条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios({
            url:"api/systemManager/delAdminUser",
            method:"get",
            params:{
              adminUserIds:this.deluserids,
            }
          }).then(data=>{
            console.log(data);
            if(data.data.code==0){
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.yglist();
            }else{
              this.$message({
            type: 'error',
            message: '删除失败!'
          });
            }

          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .search {
    width: 100%;
    height: 26px;
    span {
      width: 80px;
      height: 24px;
      float: left;
      display: block;
      font-size: 12px;
      text-align: center;
      border: 1px solid #797979;
      line-height: 24px;
      border-radius: 6px;
    }
    .delete {
      margin-left: 22px;
    }
    input {
      width: 242px;
      height: 24px;
      float: right;
      border: 1px solid #a5dcf2;
      border-radius: 5px;
      font-size: 12px;
      color: #999999;
      padding-left: 6px;
    }
  }
  .el-table {
    margin-top: 13px;
    .el-table__header-wrapper {
      height: 34px;
    }
  }
  .addcanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    .edit {
      width: 620px;
      height: 532px;
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -310px;
      background: rgb(253, 253, 253);
      border: 1px solid #000;
      h3 {
        width: 100%;
        height: 84px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 84px;
      }
      ul {
        width: 438px;
        margin: 0 auto;
        li {
          width: 100%;
          height: 58px;
          line-height: 58px;
          list-style: none;
          span {
            display: inline-block;
            width: 75px;
            height: 58px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            color: #555;
          }
          .department {
            width: 252px;
            height: 38px;
            background: #eff1f5;
            font-size: 12px;
            color: #555;
            margin-left: 17px;
            text-align: center;
            border: none;
          }
          input {
            width: 252px;
            height: 38px;
            font-size: 12px;
            color: #555;
            margin-left: 17px;
            border: 1px solid #555;
            border-radius: 5px;
          }
        }
      }
      .but {
        width: 308px;
        height: 40px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        margin-top: 86px;
        button {
          width: 140px;
          height: 40px;
          background: #fff;
          border: 1px solid #aaa;
          border-radius: 8px;
          font-size: 13px;
        }
      }
    }
  }
  .delcanvas {
    width: 300px;
    height: 170px;
    position: absolute;
    left: 50%;
    margin-left: -150px;
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