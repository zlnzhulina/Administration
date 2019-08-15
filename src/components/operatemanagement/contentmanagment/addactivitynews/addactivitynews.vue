<template>
  <div class="wrap">
    <h3>
      <span>运营管理>资讯列表>{{flag=="1"?"编辑":"添加"}}资讯</span>
    </h3>
    <div class="title">
      <p>基本信息</p>
    </div>
    <ul class="information">
      <li>
        <span>标题</span>
        <input type="text" v-model="newstitle" />
      </li>
      <li style="height:100px;">
        <span>资讯摘要</span>
        <textarea v-model="newscontent"></textarea>
      </li>
      <li>
        <span style="float:left;margin-left:13px;">资讯封面图：</span>
        <div class="coverimg">
          <el-upload
            class="avatar-uploader"
            action="api/upload/uploadImage"
            :show-file-list="false"
            :on-success="handlenewcoverSuccess"
          >
            <img v-if="imagenewcoverUrl" :src="imagenewcoverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </li>
    </ul>
    <div class="title">
      <p>详细信息</p>
    </div>
    <div class="detailsinfo">
      <div class="left">
        <span>上传视频</span>
        
        <el-upload
          class="avatar-uploader el-upload--text"
          action="api/upload/uploadVideo"
          :show-file-list="false"
          accept=".mp4"
          :on-success="handleVideoSuccess"
          :before-upload="beforeUploadVideo"
          :on-progress="uploadVideoProcess"
        >
          <video v-if="showVideoPath !='' && !videoFlag" :src="showVideoPath" style="width:100%;height:102px;position:absolute;top:0;margin-top:0;">您的浏览器不支持视频播放</video>
          <img @click="reomvevideo($event)" v-if="showVideoPath !='' && !videoFlag"  src="../../../../assets/no.png" style="position:absolute;top:-3px;right:-3px;"/>
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :width="50"
            :height="50"
            style="position: absolute;left: 65px;top: 25px;z-index:111"
            :percentage="videoUploadPercent"
          ></el-progress>
        </el-upload>
        <div class="previewdetailsimg" v-for="(item,index) in newsdetailsimglist" :key="index">
          <div
            class="mouseover"
            @mouseover="removepreviewimg(index)"
            @mouseout="removepreviewimgno(index)"
          >
            <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
            <div class="removeimg" v-show="item.showremovecanvas">
              <i @click="removedetailsimg(index)">
                <img src="../../../../assets/deleteIcon.png" />
              </i>
            </div>
          </div>
        </div>
        <span>上传详情图</span>
        <el-upload
          class="avatar-uploader"
          action="api/upload/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="right">
        <video
          v-if="showVideoPath !='' && !videoFlag"
          :src="showVideoPath"
          class="avatar video-avatar"
          controls="controls"
          poster="../../../../assets/video.jpg"
        >您的浏览器不支持视频播放</video>
        <div v-for="(item,index) in newsdetailsimglist" :key="index">
          <img :src="item.imageUrl" style="width:100%;" />
        </div>
      </div>
    </div>
    <span class="addnews" @click="addnews">保存</span>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //添加活动资讯
  data() {
    return {
      flag: "0",
      imagenewcoverUrl: "",
      newId: "",
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮
      global: {},
      //资讯详情视频地址
      showVideoPath: "",
      imageUrl: "",
      //资讯标题
      newstitle: "",
      //资讯摘要
      newscontent: "",
      //资讯封面图
      newscoverimg: "",
      //资讯详情图片
      newsdetailsimg: "",
      newsdetailsimglist: [],
      imgurlarr: []
    };
  },
  created() {
    if (this.$route.query.flag) {
      this.flag = this.$route.query.flag;
      // console.log(this.$route.query);
      this.status = this.$route.query.rowdata.status;

      this.newId = this.$route.query.rowdata.newId;
      this.newstitle = this.$route.query.rowdata.title;
      this.newscontent = this.$route.query.rowdata.information;
      this.newscoverimg = this.$route.query.rowdata.coverImageUrl;
      this.imagenewcoverUrl = this.$route.query.rowdata.coverImageUrl;
      this.showVideoPath = this.$route.query.rowdata.videoUrl;
      for (let i = 0; i < this.$route.query.rowdata.imageList.length; i++) {
        this.newsdetailsimglist.push({
          imageUrl: this.$route.query.rowdata.imageList[i].imageUrl,
          newsdetailsimg: this.$route.query.rowdata.imageList[i].imageUrl,
          showremovecanvas: true
        });
      }
      // console.log( this.newsdetailsimglist)
    }
  },
  methods: {
    handlenewcoverSuccess(res, file) {
      this.imagenewcoverUrl = URL.createObjectURL(file.raw);
      //设置资讯封面图路径
      // console.log(file)
      this.newscoverimg = file.response.data.fileUrl;
    },
    beforeUploadVideo(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (["video/mp4"].indexOf(file.type) == -1) {
        //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传视频大小不能超过20MB哦!");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //视频上传成功回调
    handleVideoSuccess(res, file) {
      // console.log(file);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (file.response.code == 0) {
        this.showVideoPath = file.response.data.fileUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    //资讯图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.newsdetailsimg = file.response.data.fileUrl;
      this.newsdetailsimglist.push({
        imageUrl: this.imageUrl,
        newsdetailsimg: this.newsdetailsimg,
        showremovecanvas: false
      });
    },
    removepreviewimg(i) {
      this.newsdetailsimglist[i].showremovecanvas = true;
    },
    removepreviewimgno(i) {
      this.newsdetailsimglist[i].showremovecanvas = false;
    },
    //删除预览图片
    removedetailsimg(i) {
      this.newsdetailsimglist.splice(i, 1);
    },
    //保存，添加资讯
    addnews() {
      // console.log(this.newsdetailsimglist);
      for (var i = 0; i < this.newsdetailsimglist.length; i++) {
        this.imgurlarr.push(this.newsdetailsimglist[i].newsdetailsimg);
      }
      if (this.flag == 1) {
        // console.log(this.imgurlarr);
        Axios({
          url: "api/contentManager/editNews",
          method: "post",
          data: {
            news: {
              newId: this.newId,
              title: this.newstitle,
              information: this.newscontent,
              coverImageUrl: this.newscoverimg,
              videoUrl: this.showVideoPath
            },
            imgList: this.imgurlarr
          }
        }).then(data => {
          if (data.data.code == 0) {
            this.$message.success("修改成功");
            this.$router.push("/operatemanagement/indexactivityinformation");
          }
          // console.log(data);
        });
      } else {
        Axios({
          url: "api/contentManager/addInformation",
          method: "post",
          data: {
            newsData: {
              newsId: "",
              title: this.newstitle,
              information: this.newscontent,
              coverImageUrl: this.newscoverimg,
              videoUrl: this.showVideoPath
            },
            imgList: this.imgurlarr
          }
        }).then(data => {
          if (data.data.code == 0) {
            this.$router.push("/operatemanagement/indexactivityinformation");
          }
          // console.log(data)
        });
      }
      // console.log(this.imgurlarr);
    },
    //删除上传的视频
    reomvevideo(e){
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      // this.isShowUploadVideo = true;
        this.showVideoPath = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1000px;
  padding-top: 90px;
  margin: 0 auto;
  h3 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
  .title {
    width: 910px;
    height: 27px;
    border-bottom: 1px solid #ccc;
    margin: 15px auto;
    p {
      width: 100px;
      height: 27px;
      line-height: 27px;
      font-size: 12px;
      color: #555;
      text-align: center;
      border-bottom: 2px solid red;
    }
  }
  .information {
    width: 50%;
    height: auto;
    margin: 0 auto;
    li {
      width: 100%;
      height: 58px;
      line-height: 58px;
      list-style: none;
      text-align: center;
      span {
        display: inline-block;
        width: 75px;
        height: 58px;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
        color: #555;
      }
      input {
        width: 320px;
        height: 38px;
        font-size: 12px;
        color: #555;
        margin-left: 17px;
        border: 1px solid #555;
        border-radius: 5px;
      }
      textarea {
        width: 320px;
        height: 80px;
        margin-right: 42px;
        border: 1px solid #555;
        border-radius: 5px;
        display: block;
        float: right;
        resize: none;
      }
      .coverimg {
        width: 128px;
        height: 76px;
        float: left;
        margin-left: 48px;
        background: #ccc;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 128px;
          height: 76px;
          line-height: 76px;
          text-align: center;
        }
        .avatar {
          width: 128px;
          height: 76px;
          display: block;
        }
      }
    }
  }
  .detailsinfo {
    width: 878px;
    height: 333px;
    margin: 0 auto;
    .left {
      width: 182px;
      min-height: 216px;
      float: left;
      .avatar-uploader {
        position: relative;
        margin-top: 13px;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #409eff;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 180px;
        height: 100px;
        line-height: 100px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        text-align: center;
      }
      .avatar {
        width: 182px;
        height: 90px;
        display: block;
        margin-top: 13px;
      }
      .video-avatar {
        width: 400px;
        height: 200px;
      }
      .videoactive {
        width: 180px;
        height: 100px;
      }
      .previewdetailsimg {
        width: 180px;
        height: 100px;

        .mouseover {
          width: 100%;
          height: 100%;
          position: relative;
          .removeimg {
            width: 182px;
            height: 90px;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(#fff, 0.6);
            text-align: center;
            i {
              display: block;
              margin: 30px auto;
            }
          }
        }
      }
    }
    .right {
      width: 672px;
      min-height: 400px;
      float: right;
      .avatar {
        width: 100%;
        height: 290px;
        display: block;
      }
      .video-avatar {
        width: 100%;
        height: 290px;
      }
    }
  }
  .addnews {
    width: 100px;
    height: 40px;
    background: darkcyan;
    color: #fff;
    display: block;
    margin: 30px auto;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    clear: both;
  }
}
</style>