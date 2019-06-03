<template>
  <div class="container">
    <div class="search">
      <span @click="adddepartment">添加部门</span>
      <span class="delete" @click="deldepartment">删除选中</span>
      <input type="text"   placeholder="请输入关键字搜索" v-model="departmentName">
      
    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="departmentData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed="left" label="操作" width="148">
        <template slot-scope="scope">
        <el-button type="text" size="small"  @click="editDepartment(scope.$index,scope.row)">重命名</el-button>
        <el-button type="text" size="small"  @click="deleteDepartment(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" row-click label="部门"  align="center"  show-overflow-tooltip></el-table-column></el-table>
    <!-- 分页功能-->
        <div class="block fr" style="margin-top: 10px;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total,  prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
    <!-- 添加弹窗 -->
    <div class="addcanvas" v-if="adddepartmentcanvas">
      <div class="edit">
        <h3>添加部门</h3>
        <ul>
          <li>
            <span>名称</span>
            <input type="text" v-model="addInput"  >
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yes">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    

    <div class="editcanvas" v-if="editdepartmentcanvas">
      <div class="edit">
        <h3>修改部门</h3>
        <ul>
          <li>
            <span>名称</span>
            <input type="text" v-model="addInput"  >
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="update(editId,addInput)">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    <div class="delcanvas" v-if="deldepartmentcanvas">
      <h3>温馨提示</h3>
      <p>部门信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>
  </div>

  
</template>

<script>
import Axios from 'axios';
export default {
  // 部门管理
  data() {
    return {
      adddepartmentcanvas:false,
      editdepartmentcanvas:false,
      deldepartmentcanvas:false,
      check: false,
      pagesize: 10,
      currentPage: 1,
      totalCount: 0,
      departmentData: [],
      departmentName:'',
      addInput:'',
      editId:'',
      deName:'',
    };
  },
  created: function () {
            this.departmentList();
  },
  watch:{
    departmentName(){
      this.departmentList();
    }
  },
  methods: {
    departmentList: function(){
      Axios(
        {
          method: "get",
          url: "api/systemManager/departmengList"+'?pageNo='+this.currentPage+'&pageSize='+this.pagesize+'&departmentName='+this.departmentName,
          
        }
      ).then(data => {
        this.totalCount = data.data.data.departmentPage.total;
        this.pagesize = data.data.data.departmentPage.size;
        this.currentPage = data.data.data.departmentPage.current;
        this.departmentData = data.data.data.departmentPage .records;
        
      })
    },
    adddepartment() {
      this.adddepartmentcanvas=true;
      
    },
    deleteDepartment(index,row){
      this.editId = row.departmentId;
      this.deldepartmentcanvas=true;
    },
    deldepartment() {
      this.deldepartmentcanvas=true;
    },
    yes() {
      
      Axios(
        {
          method: "post",
          url: "api/systemManager/addDepartment"+'?departmentName='+this.addInput,
          // data:{
          //   departmentName:this.addInput,
          // }
        }
      ).then(data => {
        if(data.data.code == '-1'){
          this.$message({
                    type: 'error',
                    message: data.data.msg,
                    });  
        }
        console.log(this.addInput);
        this.adddepartmentcanvas=false;
        this.addInput = '',
        this.departmentList();
      })
    },
    editDepartment(index,row){
      console.log(row.departmentId);
      this.addInput = row.departmentName;
      this.editId=row.departmentId;
      this.editdepartmentcanvas=true;
      
    },
    update(index,row){
         Axios(
        {
          method: "post",
          url: "api/systemManager/editDepartment"+'?departmentId='+this.editId+'&departmentName='+this.addInput,
          // data:{
          //   departmentName:this.addInput,
          // }
        }
      ).then(data => {
        console.log(data.data.code)
        if(data.data.code == '-1'){
          this.$message({
                    type: 'error',
                    message: data.data.msg,
                    });  
        }
        this.editdepartmentcanvas=false;
        this.addInput = '',
        this.editId = '',
        this.departmentList();
      })
    },
    exit() {
      this.adddepartmentcanvas=false;
      this.editdepartmentcanvas=false;
      this.deldepartmentcanvas=false;
    },
     del(){
       Axios(
        {
          method: "get",
          url: "api/systemManager/delDepartment"+'?departmentids='+this.editId,
          // data:{
          //   departmentName:this.addInput,
          // }
        }
      ).then(data => {
        this.deldepartmentcanvas=false;
        this.editId = '',
        this.departmentList();
      })
    
  },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getTable();
    },
  }
 
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  
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
  .editcanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    .edit {
      width: 510px;
      height: 360px;
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -252px;
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
  
  .addcanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    .edit {
      width: 510px;
      height: 360px;
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -252px;
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
