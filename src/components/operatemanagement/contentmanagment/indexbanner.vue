<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addbanner">添加</span>
    </div>

    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column prop="orderNum" label="序" width="30px"></el-table-column>
      <el-table-column prop="bannerName" label="名称" width="185px"></el-table-column>
      <el-table-column prop="img" label="展示图" width="220px">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width:140px;height:79px;">
        </template>
      </el-table-column>

      <el-table-column prop="url" label="链接">
        <template slot-scope="scope">
          <input type="text" :value="scope.row.url" style="width:100%;height:50px;border:none">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="195px">
        <template slot-scope="scope">
          <el-button type="text" size="small">上移</el-button>
          <el-button type="text" size="small">下移</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">更换</el-button>
          <el-button type="text" size="small" @click="delbanner(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="delcanvas" v-if="delcanvas">
      <h3>温馨提示</h3>
      <p>删除账号后不可恢复，确认删除？</p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="del">确认</span>
    </div>-->
    <div class="addcanvas" v-if="addbannercanvas">
      <div class="edit">
        <h3>添加广告</h3>
        <ul>
          <li>
            <span>奖品名称</span>
            <input type="name" v-model="name">
          </li>
          <li>
            <span>链接</span>
            <input type="link" v-model="link">
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
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yes">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
     <div class="addcanvas" v-if="editbannercanvas">
      <div class="edit">
        <h3>编辑</h3>
        <ul>
          <li>
            <span>奖品名称</span>
            <input type="name" v-model="name">
          </li>
          <li>
            <span>链接</span>
            <input type="link" v-model="link">
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
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="edit">确认</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //banner
  data() {
    return {
      imageUrl: "",
      //添加奖品名称
      name: "",
      //添加链接
      link: "",
      //添加图片上传路径
      imgurl: "",
      dui: require("@/assets/yes.png"),
      cuo: require("@/assets/no.png"),
      delcanvas: false,
      addbannercanvas: false,
      editbannercanvas:false,
      tabledata: [
        {
          index: 1,
          name: "name",
          showphoto: require("@/assets/welcome.png"),
          alink: "https:www.baidu.com"
        }
      ]
    };
  },
  created() {
    this.bannerlist();
  },
  watch: {
    imagesrc(val) {
      if (val) {
        this.addimg = false;
      } else {
        this.addimg = true;
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == 0) {
        //图片显示的本地路径
        this.imageUrl = URL.createObjectURL(file.raw);
        //图片上传的网络路径
        this.imgurl = res.data.fileUrl;
      }
    },
    bannerlist() {
      Axios({
        url: "api/contentManager/bannerList",
        method: "get"
      }).then(data => {
        console.log(data);
        this.tabledata = data.data.data.bannerList;
      });
    },
    //编辑
    edit(row) {
      // console.log(row)
      // this.name = row;
      
    },
    //添加
    addbanner() {
      this.addbannercanvas = true;
    },
    //确定添加广告
    yes() {
      if (!this.name) {
        this.$message({
          type: "error",
          message: "活动名不能为空"
        });
      } else if (!this.link) {
        this.$message({
          type: "error",
          message: "链接不能为空"
        });
      } else if (!this.imgurl) {
        this.$message({
          type: "error",
          message: "未上传图片"
        });
      } else {
        Axios({
          url: "api/contentManager/addBanner",
          method: "post",
          data: {
            img: this.imgurl,
            url: this.link,
            bannerName: this.name,
            orderNum: 5
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.addbannercanvas = false;
            this.name = "";
            this.link = "";
            this.imgurl = "";
            this.bannerlist();
          }
        });
        // this.addbannercanvas = false;
      }
    },
    //编辑
    deleteall() {
      this.delcanvas = true;
    },
    exit() {
      this.delcanvas = false;
      this.addbannercanvas = false;
    },

    delbanner(row) {
      console.log(row);
      this.bannerId = row.bannerId;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "api/contentManager/delBanner",
            method: "get",
            params: {
              bannerId: this.bannerId
            }
          }).then(data => {
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.bannerlist();
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
.container {
  width: 960px;
  height: 622px;
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
