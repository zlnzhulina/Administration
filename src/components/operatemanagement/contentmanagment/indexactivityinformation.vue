<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addeventnews">添加</span>
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

      <el-table-column prop="title" label="标题" width="278px"></el-table-column>
      <el-table-column prop="coverImageUrl" label="橱窗图" width="178px">
        <template slot-scope="scope">
          <img :src="scope.row.coverImageUrl" style="width:140px;height:79px;">
        </template>
      </el-table-column>

      <el-table-column prop="information" label="描述">
        <template slot-scope="scope">
          <p style="width:300px;height:80px;">{{scope.row.information}}</p>
          <!-- <textarea :value="scope.row.information" style="width:300px;height:80px;border:none;resize:none"></textarea> -->
        </template>
        <textarea></textarea>
      </el-table-column>
      <el-table-column prop="url" label="置顶" width="78px">
        <!-- <template slot-scope="scope">
          <span>{{scope}}</span>
        </template>-->
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="98px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="replic(scope.row)">编辑</el-button>
          
          <el-button type="text" size="small" @click="deldata(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //首页活动咨询
  data() {
    return {
      // dui: require("../../../assets/yes.png"),
      // cuo: require("../../../assets/no.png"),
      newsId: "",
      tabledata: [
        {
          
        }
      ]
    };
  },
  created() {
    this.activityinfolist();
  },
  methods: {
    activityinfolist() {
      Axios({
        url: "api/contentManager/newsList",
        method: "get"
      }).then(data => {
        console.log(data);
        this.tabledata = data.data.data.newsList;
      });
    },
    //添加
    addeventnews() {
      this.$router.push("/addactivitynews");
    },
    //编辑
    replic(row) {
      console.log(row)
    },
    edit(val) {
      // this.cl = true;
      // console.log(val);
    },
    //删除
    deldata(row){
      console.log(row);
      this.newId = row.newId;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "api/contentManager/delNews",
            method: "post",
            data: {
              newsId: this.newId
            }
          }).then(data => {
            console.log(data);
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
             this.activityinfolist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    exit() {
      this.delcanvas = false;
    },
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
  }

  .el-table {
    margin-top: 13px;
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent !important;
    }
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
