<template>
    <div class="container">
        <div class="top">
            <span class="title">职位名称</span>
            <span class="addbtn" @click="showinput">添加</span>
        </div>
        <ul>
            <li v-for="(item,index) in position">
                <span>{{item.userCatName}}</span>
                <div>
                    <el-button type="text" size="big" @click="updateUserCat(item)">编辑</el-button>
                      
                    <el-button type="text" size="big" @click="deleteUserCat(item.userCatId)">删除</el-button>
                    <!-- <i @click="updateUserCat(item)">编辑</i> -->
                    <!-- <i @click="deleteUserCat(item.userCatId)">删除</i> -->
                    
                    </div>
                
            </li>
        </ul>
      
        <div class="addcontent" v-if="addinput">
            <input type="text" placeholder="请输入设备类型" v-model="addcontent">
        </div>
        <div class="editcanvas" v-if="editdepartmentcanvas">
                        <div class="edit">
                            <h3>修改职位</h3>
                            <ul>
                            <li>
                                <span align="center">名称</span>
                                <input type="text" align="center" v-model="editInput"  >
                            </li>
                            </ul>
                            <div class="but">
                            <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="update(editId,editInput)">确认</button>
                            <button class="no" @click="exit">取消</button>
                            </div>
                        </div>
                    </div>
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
        <div class="ok" @click="ok">保存</div>
        
    </div>
    
</template>

<script>
import Axios from 'axios';
export default {
//职位管理
data(){
    return {
        editdepartmentcanvas:false,
        addcontent:"",
        addinput:false,
        position:[],
        pagesize: 10,
        currentPage: 1,
        totalCount: 0,
        editId:'',
        editInput:''
    }
    
},
created: function () {
    this.selectUserCatList();
  },
methods:{
    update(userCatId,userCatName){

        Axios(
        {
          method: "post",
          url: "api/networkUserManager/editUserCat"+'?userCatId='+userCatId+'&userCatName='+userCatName,
        }
      ).then(data => {
          this.editdepartmentcanvas = false;
          this.selectUserCatList();
          this.$message({
            message: data.data.msg,
            type: 'success'
        });
      })
    },
    updateUserCat:function(item){
        this.editId = item.userCatId;
        this.editInput = item.userCatName;
        this.editdepartmentcanvas = true;
    },
    selectUserCatList:function(){
        Axios(
        {
          method: "get",
          url: "api/networkUserManager/UserCatList"+'?pageNo='+this.currentPage+'&pageSize='+this.pagesize,
        }
      ).then(data => {
        //   console.log(data)
          this.totalCount = data.data.data.userCatPage.total;
        this.pagesize = data.data.data.userCatPage.size;
        this.currentPage = data.data.data.userCatPage.current;
        this.position = data.data.data.userCatPage.records;
        // console.log(this.position)
      })
    },
    deleteUserCat(userCatId){
        this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Axios(
                        {
                        method: "get",
                        url: "api/networkUserManager/delUserCat"+'?userCatIds='+userCatId,
                        }
                    ).then(data => {
                        this.selectUserCatList();
                        // console.log(data)
                        if(data.data.code == '0'){
                            this.$message({
                                message: data.data.msg,
                                type: 'success'
                            });
                        }
                        if(data.data.code == '-1'){
                            this.$message({
                                message: data.data.msg,
                                type: 'error'
                            });
                        }
                        
                        
                    })
                    
                    
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
                });
        
    },
showinput(){
    this.addinput=true;
},
ok(){
    
     if(this.addcontent){
       Axios(
        {
          method: "post",
          url: "api/networkUserManager/addUserCat?userCatName="+this.addcontent,
        //   data:{
        //       "userCatName":this.addcontent
        //   }
        }
      ).then(data => {
          this.addcontent="";
         this.addinput=false;
         this.selectUserCatList();
          this.$message({
                            message: '添加成功!!!',
                            type: 'success'
                            });
        //   console.log/(data)
        
      })
     }else{
       this.$message({
          showClose: true,
          message: '请输入职位名称',
          type: 'warning'
        });
     }

    
    
},
  handleSizeChange(val) {
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getTable();
    },
    exit() {
      this.editdepartmentcanvas=false;
    },
}
}
</script>

<style lang="scss" scoped>
.container{
     width: 100%;
  height: 100%;
  position: relative;
  .top{
      width: 100%;
      height: 60px;
      background: #eaedf1;
      line-height: 60px;
      border: 1px solid #d7d7d7;
      .title{
          font-size: 16px;
          font-weight: bold;
          color: #555;
          margin-left: 43px;
      }
      .addbtn{
          display: inline-block;
          width: 105px;
          height: 35px;
          font-size: 18px;
          background: #f2f2f2;
          text-align: center;
          line-height: 35px;
          float: right;
          margin-top: 12px;
          margin-right: 14px;

      }
  }
  ul{
      width:100%;
      li{
          list-style: none;
          width: 100%;
          height: 60px;
          line-height: 60px;
          border: 1px solid #d7d7d7;
          span{
              margin-left: 106px;
              font-size: 18px;
              color: #000;
          }
          div{
              display: inline-block;
              width: 105px;height: 35px;
              line-height: 35px;
              float: right;
              margin-top: 12px;
              margin-right: 14px;
              text-align: center;
              i{
                  margin-left: 6px;
                  font-style:normal;
                  color: #169bd5;
              }
          }
      }
  }
  .addcontent{
       width: 100%;
      height: 60px;
      line-height: 60px;
      border: 1px solid #d7d7d7;
      input{
          margin-left: 106px;
          border: none;
          outline:0;
      }
  }
  .ok{
      width: 180px;
      height: 50px;
      background: #169bd5;
      margin: 80px auto;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      color: #fff;
      border-radius: 8px;
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
          border: none;
          span {
            display: inline-block;
            width: 75px;
            height: 58px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            color: #555;
            margin-left: 13px;
          }
          // .department {
          //   width: 252px;
          //   height: 38px;
          //   background: #eff1f5;
          //   font-size: 12px;
          //   color: #555;
          //   margin-left: 17px;
          //   text-align: center;
          //   border: none;
          // }
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
