<template>
  <div class="container">
    <div class="search">
      <span @click="addpost">添加岗位</span>
      <span class="delete" @click="delpost">删除选中</span>
      <input type="text" placeholder="请输入关键字搜索" v-model="postName">
    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="postdata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column fixed="left" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editpost(scope.$index,scope.row)">重命名</el-button>
          <el-button type="text" size="small" @click="deletepost(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="postName" label="岗位" align="center" width="440px"></el-table-column>
      <el-table-column prop="departmentName" label="部门" align="center"></el-table-column>
    </el-table>

    <!-- 添加弹窗 -->
    <div class="addcanvas" v-if="addpostcanvas">
      <div class="edit">
        <h3>添加岗位</h3>
        <ul>
          <li>
            <span>部门</span>
            <!-- <select name="department" id="department" class="department">
              <option value="volvo">—请选择—</option>
              
            </select>-->
            <select
              v-model="postModel.departmentId"
              class="department"
              name="department"
              id="department"
            >
              <option
                v-for="(department,index) in departmentList"
                :key="index"
                :value="department.departmentId"
              >{{ department.departmentName }}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理部门</span>
          </li>
          <li>
            <span>名称</span>
            <input type="text" v-model="postModel.postName">
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yes">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    <div class="editpostcanvas" v-if="editpostcanvas">
      <div class="edit">
        <h3>修改岗位</h3>
        <ul>
          <li>
            <span>名称</span>
            <input type="text" v-model="nowpostname"  >
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="update">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
    <!-- <div class="delcanvas" v-if="delpostcanvas">
      <h3>温馨提示</h3>
      <p>岗位信息删除后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div> -->
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
  </div>
</template>

<script>
import Axios from "axios";
export default {
  // 岗位管理
  data() {
    return {
      
      select: "",
      postName: "",
      addpostcanvas: false,
      delpostcanvas: false,
      editpostcanvas: false,
      nowpostname:"",
      pagesize: 10,
      currentPage: 1,
      totalCount: 0,
      postdata: [],
      departmentList: [],
      postModel: {
        postName: "",
        departmentId: ""
      }
    };
  },
  created: function() {
    this.postList();
    this.initDepartment();
  },
  watch:{
    postName(){
      this.postList();
    }
  },
  methods: {
    //初始化部门列表
    initDepartment: function() {
      Axios({
        method: "get",
        url:
          "api/systemManager/departmengList" +
          "?pageNo=" +
          this.currentPage +
          "&pageSize=100"
      }).then(data => {
        this.departmentList = data.data.data.departmentPage.records;
        //console.log(this.departmentList);
      });
    },
    postList: function() {
      Axios({
        method: "get",
        url:
          "api/systemManager/postList" +
          "?pageNo=" +
          this.currentPage +
          "&pageSize=" +
          this.pagesize +
          "&postName=" +
          this.postName
      }).then(data => {
        this.totalCount = data.data.data.postPage.total;
        this.pagesize = data.data.data.postPage.size;
        this.currentPage = data.data.data.postPage.current;
        this.postdata = data.data.data.postPage.records;
        //console.log(this.postdata);
      });
    },
    addpost() {
      this.addpostcanvas = true;
    },
    yes() {
      //console.log(this.postModel);
      // this.$axios.post(this.url, {"post":JSON.stringify(this.postModel)}
      Axios({
        method: "post",
        url:
          "api/systemManager/addPost" +
          "?postName=" +
          this.postModel.postName +
          "&departmentId=" +
          this.postModel.departmentId
        // data:{
        // "post":JSON.stringify(this.postModel)
        // "postName":this.postModel.postName,
        // "departmentId":this.postModel.departmentId
        // }
      }).then(data => {
        this.addpostcanvas = false;
        this.postList();
      });
    },
    exit() {
      this.addpostcanvas = false;
      this.delpostcanvas = false;
      this.editpostcanvas=false;

    },
    //重命名岗位
    editpost(index, row) {
      this.nowpostname=row.postName;
      this.postId = row.postId;
      this.departmentId = row.departmentId;
      this.editpostcanvas=true;
    },
    update(){
      Axios({
            url: "api/systemManager/editPost",
            method: "post",
            data: {
              postId: this.postId,
              postName: this.nowpostname,
              departmentId: this.departmentId
            }
          }).then(data => {
            
            if (data.data.code == 0) {
              this.editpostcanvas=false;
              this.$message({
                type: "success",
                message: "更改成功"
              });
              this.postList();
            }
          });
    },

    //删除岗位
    deletepost(index, row) {
      this.postId = row.postId;
      this.$confirm("此操作将永久删除该岗位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "api/systemManager/delPost",
            method: "get",
            params:{
              postIds:this.postId
            }
          }).then(data => {
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.postList();
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
    delpost() {
      this.delpostcanvas = true;
    },
    del() {
      this.delpostcanvas = false;
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable();
    }
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
      margin-left: -180px;
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
  .editpostcanvas {
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
}
</style>
