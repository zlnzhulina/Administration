<template>
  <div class="container">
    <div class="left" style="width:342px;float:left;height:606px;background:#ccc">
      <div class="bgimg"></div>
      <div class="title"></div>
      
    </div>
    <div class="right" style="float:left;width:74%;margin-left:20px;">
      <el-table
        :header-cell-style="{background:'#ccd1e0',height:'32'}"
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width:100%"
        stripe
      >
        <el-table-column prop="title" label="名称" width="182px"></el-table-column>
        <el-table-column prop="imgUrl" label="展示图" width="226px">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" style="width:114px;height:62px;">
          </template>
        </el-table-column>
        <el-table-column prop="id" label="小程序ID" width="186px"></el-table-column>

        <el-table-column prop="url" label="链接">
          <template slot-scope="scope">
            <p>{{scope.row.url}}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="102px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="replace(scope.row)">更换</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="addcanvas" v-if="editcanvas">
      <div class="edit">
        <h3>编辑</h3>
        <ul>
          <li>
            <span>名称</span>
            <input type="text" v-model="name">
          </li>
          <li>
            <span>链接</span>
            <input type="text" v-model="url">
          </li>
          <li>
            <span>小程序ID</span>
            <input type="text" v-model="id">
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
                <img v-if="imgurl" :src="imgurl" style="width:144px;display:block">
                <i v-else>
                  <img src="../../../assets/tianjia.png">
                </i>
              </el-upload>
            </div>
          </li>
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="ok">确认</button>
          <button class="no" @click="no">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  // 登陆页验真展示
  data() {
    return {
      tabledata: [],
      name: "",
      url: "",
      id: "",
      imageUrl: "",
      imgurl: "",
      editcanvas: false
    };
  },
  created() {
    this.activityinfolist();
  },
  methods: {
    activityinfolist() {
      Axios({
        url: "api/contentManager/pageSetList",
        method: "get",
        params: {
          type: 2
        }
      }).then(data => {
        console.log(data);
        this.tabledata = data.data.data.pageSetList;
      });
    },
    replace(row) {
      console.log(row);
      this.name = row.title;
      this.url = row.url;
      this.id = row.id;
      (this.imageUrl = row.imageUrl), (this.editcanvas = true);
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
    //确定更换
    ok() {
      Axios({
        url: "api/contentManager/editScanQrPage",
        method: "post",
        data: {
          id: this.id,
          title: this.name,
          url: this.url,
          imgUrl: this.imgurl
        }
      }).then(data => {
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.editcanvas = false;
        }
        this.name = "";
        this.link = "";
        this.imgurl = "";
        this.activityinfolist();
      });
    },
    //取消
    no() {
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
