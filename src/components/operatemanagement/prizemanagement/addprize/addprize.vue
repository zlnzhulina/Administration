<template>
  <div class="wrap">
    <h2>
      <span>添加奖品</span>
    </h2>
    <div class="content">
      <p>基本信息</p>
      <ul>
        <li>
          <span>
            <i>*</i> 奖品名称：
          </span>
          <input type="text" placeholder="请输入奖品名称">
        </li>
        <li>
          <span>
            <i>*</i> 选择奖品类型：
          </span>
          <select v-model="prizetype">
            <option>请选择奖品类型</option>
            <option value="jdk">京东卡</option>
            <option value="lpk">礼品卡</option>
            <option value="sjczk">手机充值卡</option>
          </select>
        </li>
      </ul>
      <p>设置奖品</p>
      <!-- 京东卡 -->
      <ul style="height:auto; border:none;" v-if="jdk">
        <li>
          <span>
            <i>*</i> 选择奖品：
          </span>
          <input type="text" placeholder="请设置奖品面值">
        </li>
        <li style="height:auto;line-height:0;">
          <span></span>
          <el-table
            :header-cell-style="{background:'#eee',height:'32'}"
            ref="multipleTable"
            :data="tabledata"
            tooltip-effect="dark"
          >
            <!-- stripe="true" -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="goodsid" label="奖品类型" width="100px"></el-table-column>
            <el-table-column prop="goodsname" label="面值" width="100px"></el-table-column>
            <el-table-column prop="goodsclass" label="可用数量" width="100px"></el-table-column>
          </el-table>
        </li>
        <li>
          <span>
            <i>*</i> 奖品数量：
          </span>
          <input type="text" placeholder="请设置奖品数量">
        </li>
      </ul>
      <!-- 礼品卡 -->
      <ul style="height:auto; border:none;" v-if="lpk">
        <li>
          <span>
            <i>*</i> 礼品名称：
          </span>
          <input type="text" placeholder="请填写礼品名称">
        </li>
        <li style="height:auto;line-height:0;">
          <span>礼品描述：</span>
          <textarea></textarea>
        </li>
        <li>
          <span style="float:left;">有效图：</span>
          <div style="margin-top:12px;float:left;margin-left:17px;">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" style="width:144px;display:block">
              <i v-else>
                <img src="../../../../assets/tianjia.png">
              </i>
            </el-upload>
          </div>
        </li>
        <li>
          <span style="float:left;clear:both;">失效图：</span>
          <div style="margin-top:12px;float:left;margin-left:17px;">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" style="width:144px;display:block">
              <i v-else>
                <img src="../../../../assets/tianjia.png">
              </i>
            </el-upload>
          </div>
        </li>
        <li style="clear:both;">
          <span>
            <i>*</i> 奖品数量：
          </span>
          <input type="text" placeholder="请设置奖品数量">
        </li>
      </ul>
      <!-- 手机充值卡 -->
      <ul style="height:auto; border:none;" v-if="sjczk">
        <li>
          <span>
            <i>*</i> 选择运营商：
          </span>
          <select>
              <option>三网合一</option>
              <option>中国移动</option>
              <option>中国电信</option>
              <option>中国联通</option>
          </select>
        </li>
        <li>
          <span>
            <i>*</i> 选择奖品：
          </span>
          <input type="text" placeholder="请设置奖品面值">
        </li>
        <li style="height:auto;line-height:0;">
          <span></span>
          <el-table
            :header-cell-style="{background:'#eee',height:'32'}"
            ref="multipleTable"
            :data="tabledata"
            tooltip-effect="dark"
          >
            <!-- stripe="true" -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="goodsid" label="奖品类型" width="100px"></el-table-column>
            <el-table-column prop="goodsname" label="面值" width="100px"></el-table-column>
            <el-table-column prop="goodsclass" label="可用数量" width="100px"></el-table-column>
          </el-table>
        </li>
        <li>
          <span>
            <i>*</i> 奖品数量：
          </span>
          <input type="text" placeholder="请设置奖品数量">
        </li>
      </ul>
      <div class="confirm">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
//添加奖品
export default {
  data() {
    return {
      prizetype:"",
      jdk: true,
      sjczk: false,
      lpk: false,
      imageUrl:"",
      imgurl:"",
      tabledata:[{
        goodsid:"",
        goodsname:"",
        goodsclass:"",
      }]
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      // console.log(res);
      if (res.code == 0) {
        //图片显示的本地路径
        this.imageUrl = URL.createObjectURL(file.raw);
        //图片上传的网络路径
        this.imgurl = res.data.fileUrl;
      }
    }
  },
  watch: {
    prizetype(val) {
        // console.log(val)
      switch (val) {
        case "jdk": {
          this.jdk = true;
          this.sjczk = false;
          this.lpk = false;
          break;
        }
        case "lpk": {
          this.jdk = false;
          this.sjczk = false;
          this.lpk = true;
          break;
        }
        case "sjczk": {
          this.jdk = false;
          this.sjczk = true;
          this.lpk = false;
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;
  h2 {
    margin-top: 13px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #eee;
    span {
      margin-left: 15px;
      font-size: 16px;
    }
  }
  .content {
    width: 926px;
    height: auto;
    padding: 0 40px 10px 152px;
    border: 1px solid #ccc;
    p {
      margin-top: 42px;
      font-size: 18px;
      height: 28px;
      font-weight: bold;
      line-height: 28px;
    }
    ul {
      width: auto;
      height: 178px;
      border-bottom: 1px solid #ccc;
      li {
        width: 622px;
        height: 76px;
        line-height: 76px;
        margin: 0 auto;
        list-style: none;
        span {
          display: inline-block;
          width: 130px;
          text-align: right;
          font-size: 16px;
          font-weight: bold;
          color: #7f7f7f;
          i {
            color: red;
          }
        }
        input {
          width: 298px;
          height: 44px;
        }
        select {
          width: 298px;
          height: 44px;
        }
        textarea {
          width: 298px;
          height: 60px;
          resize: none;
        }
        .el-table {
          width: 355px;
          margin-left: 82px;
        }
      }
    }
    .confirm {
      width: 100%;
      height: 32px;
      margin-top: 30px;
      span {
        width: 104px;
        height: 32px;
        display: block;
        margin: 0 auto;
        background: #00bfbf;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>
