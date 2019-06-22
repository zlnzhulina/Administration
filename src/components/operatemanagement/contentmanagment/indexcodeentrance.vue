<template>
  <div class="container">
    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
    >
      <!-- stripe="true" -->
      <el-table-column prop="title" label="名称" width="215px"></el-table-column>
      <el-table-column prop="imgUrl" label="展示图" width="220px">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" style="width:140px;height:79px;">
        </template>
      </el-table-column>

      <el-table-column prop="url" label="页面链接">
        <template slot-scope="scope">
          <input type="text" :value="scope.row.url" style="width:100%;height:50px;border:none">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="195px">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="replace(scope.row)">替换</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>删除账号后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>-->
    <div class="addcanvas" v-if="editcanvas">
      <div class="edit">
        <h3>编辑</h3>
        <ul>
          <li>
            <span>奖品名称</span>
            <input type="text" v-model="name">
          </li>
          <li>
            <span>链接</span>
            <input type="text" v-model="alink">
          </li>
          <li>
            <span style="float:left">图片</span>
            <div style="margin-top:12px;float:left;margin-left:17px;">
              <el-upload
                class="avatar-uploader"
                action="api/upload/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" style="width:144px;display:block">
                <i v-else>
                  <img src="@/assets/tianjia.png">
                </i>
              </el-upload>
            </div>
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="ok">确认</button>
          <button class="no">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //商品列表
  data() {
    return {
      dui: require("@/assets/yes.png"),
      cuo: require("@/assets/no.png"),
      delcanvas: false,
      editcanvas: false,
      name: "",
      alink: "",
      imageUrl: "",
      tabledata: []
    };
  },
  created() {
    this.codelist();
  },
  methods: {
    codelist() {
      Axios({
        url: "api/contentManager/pageSetList",
        method: "get",
        params: {
          type: 1
        }
      }).then(data => {
        console.log(data);
        this.tabledata = data.data.data.pageSetList;
      });
    },
    //编辑
    replace(row) {
      this.id = row.id;
      this.editcanvas = true;
      console.log(row);
      this.name = row.title;
      this.alink = row.url;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == 0) {
        //图片显示的本地路径
        this.imageUrl = URL.createObjectURL(file.raw);
        //图片上传的网络路径
        this.imgurl = res.data.fileUrl;
      }
    },
    //确认更改
    ok() {
      Axios({
        url: "api/contentManager/editScanQrPage",
        method: "post",
        data: {
          id: this.id,
          title: this.name,
          url: this.alink,
          imgUrl: this.imgurl
        }
      }).then(data => {
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        }
        this.name = "";
        this.link = "";
        this.imgurl = "";
        this.bannerlist();
        this.bannerList();
      });
    },

    //编辑

    exit() {
      this.editcanvas = false;
    },
    del() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
height: 100%;
  position: relative;

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
