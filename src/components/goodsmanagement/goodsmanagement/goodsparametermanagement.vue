<template>
  <div class="container">
    <!-- <div class="header">
      <span class="add" @click="addgoods">添加商品</span>
      <span class="add" @click="deleteall">批量删除</span>
      <input type="text" placeholder="账号"><img src="@/assets/sousuo.png"/>
    </div> -->

    <div class="search">
        <span>
        商品库
        </span>
      <select name="userclass">
        <option>润滑油</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <span>
      商品类型
      </span>
      <select name="userclass">
        <option>商品类型</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <span>
      商品品牌
      </span>
      <select name="userclass">
        <option>商品品牌</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click=editrow
    >
      <!-- stripe="true" -->
      <el-table-column prop="parametername" label="参数名称" width="362px"></el-table-column>
      <el-table-column prop="start" label="启用" width="194px">
          <template  slot-scope="scope">
              <img :src="scope.row.start==1?dui:cuo" style="width:25px;height:25px;">
              
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <el-button type="text" size="small" @click="edit(rowdata)">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>删除账号后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>
  </div>
</template>

<script>
export default {
  //商品列表
  data() {
    return {
        dui: require('@/assets/yes.png'),
        cuo: require('@/assets/no.png'),
      delcanvas: false,
      tabledata: [
        {
          parametername: "12543245543",
          start: "0"
          
        },
        {
          parametername: "12543245543",
          start: "1"
        },
        {
          parametername: "12543245543",
          start: "1"
        }
      ]
    };
  },
  methods: {
    //编辑
     editrow(row){
        this.rowdata=row;
        if(this.cl){
            this.edit(row)
        }
    },
    edit(val) {
        this.cl=true;
        console.log(val);
    },
    //添加
    addgoods() {
      this.$router.push({
        path: "/addgoods"
      });
    },
    //编辑
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
//   .header {
//       width: 100%;
//       height: 60px;
//     .add {
//       display: block;
//       width: 122px;
//       height: 36px;
//       margin-top: 10px;
      
//       border: 1px solid #555;
//       color: #7f7f7f;
//       text-align: center;
//       line-height: 36px;
//       font-size: 12px;
//       border-radius: 5px;
//       float: left;
//       margin-right: 8px;
//     }
//     input{
//         width:216px;
//         height:34px;
//         margin-top: 10px;
//         border-radius: 15px;
//         float: right;
//         border: 1px solid #ddd;
//         padding-left: 8px;
//         outline:none;
//     }
//     img{
//         width: 20px;
//         height: 20px;
//         position: absolute;
//         left: 932px;
//         top: 18px;
//     }
//   }

  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    select {
      width: 128px;
      height: 34px;
      margin-left: 10px;
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
      margin-left: 15px;
    }
  }
  .el-table {
    margin-top: 13px;
  }
  .delcanvas {
    width: 360px;
    height: 240px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    top: 190px;
    background: #eff1f5;
    border-radius: 8px;
    overflow: hidden;
    z-index: 99;
    border: 1px solid #dfdfdf;
    h3 {
      width: 100%;
      height: 60px;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
    }
    p {
      width: 100%;
      height: 114px;
      margin-top: 16px;
      text-align: center;
      font-size: 12px;
    }
    span {
      display: block;
      width: 180px;
      font-size: 12px;
      float: left;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
