<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addprize">添加奖品</span>
      <span class="add" @click="deleteall">批量删除</span>
      <!-- <input type="text" placeholder="账号"><img src="@/assets/sousuo.png"/> -->
    </div>

    <div class="search">
       <i>奖品名称</i><input type="text"/>
      <span>搜索</span>
      <i>
      奖品分类：
      </i>
      <select name="userclass">
        <option>商品库</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="goodsid" label="奖品名称" width="180px"></el-table-column>
      <el-table-column prop="goodsname" label="奖品分类" ></el-table-column>
      <el-table-column prop="goodsclass" label="面值" ></el-table-column>
      <el-table-column prop="data" label="奖品数量"></el-table-column>
      <el-table-column prop="data" label="已占用"></el-table-column>

      <el-table-column prop="data" label="未占用"></el-table-column>
      <el-table-column prop="data" label="已使用"></el-table-column>

      <el-table-column fixed="right" label="操作" width="146px">
        <template >
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <div class="addcanvas" v-if="editgoodlistcanvas">
      <div class="edit">
        <h3>编辑员工</h3>
        <ul>
          
         
          <li>
            <span>商品名称</span>
            <input type="text" v-model="goodsName">
          </li>
           <li>
            <span>商品分类</span>
            <select
              name="department"
              id="department"
              class="department"
              v-model="goodclass"
            >
              <option>—请选择—</option>
              <option v-for="(item,index) in post" :value="item.goodsId">{{item.postName}}</option>
            </select>
            <span style="display:inline;margin-left:17px;color:#a6a6a6;">管理岗位</span>
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yesedit">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  //商品列表
  data() {
    return {
     
     editgoodlistcanvas:false,
     goodsclass:"",
     goodsName:"",
      tabledata: [
        {
          goodsid: "12543245543",
          goodsname: "wddws",
          goodsclass: "afsefw",
          data: "2019-3-4"
        }
      ]
    };
  },
  created(){
    this.prizelist()
  },
  methods: {
    prizelist(){
      // Axios({
      //   url:"api/",
      //   method:"get"
      // }).then(data=>{
      //   console.log(data)
      //   this.tabledata=data.data.data;
      // })
    },
    //查看
    seedetails(row) {
      console.log(row);
      this.goodsName=row.goodsname;
      this.goodsId=row.goodsid
      this.editgoodlistcanvas=true;
    },
    //添加
    addprize() {
      this.$router.push({
        path: "/addprize"
      });
    },
    //编辑
    yesedit(){

    },
    //批量删除
    deleteall(){

    },
    exit() {
      this.delcanvas = false;
      this.editgoodlistcanvas=false;
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
    input{
        width:216px;
        height:34px;
        margin-top: 10px;
        border-radius: 15px;
        float: right;
        border: 1px solid #ddd;
        padding-left: 8px;
        outline:none;
    }
    img{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 932px;
        top: 18px;
    }
  }

  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    background: #f2f2f2;
    input {
      width: 170px;
      height: 34px;
      margin-left: 16px;
      background: #f2f2f2;
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
    i{
        font-style: normal;
        margin-left: 15px;

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
  
}
</style>
