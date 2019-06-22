<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >员工详情</b>

      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;margin-right:10px;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <div class="content">
      <div class="tab">
        <div class="activitytype">
          <img>
          <p>用户账号</p>
        </div>
        <div class="tdtwo">
          <p>员工名称</p>
          <p>网点名称</p>
          <p>网点地址</p>
        </div>
        <div class="tdthree">
          <p>Eric</p>
          <p>北辰第一维修站</p>
          <p>天津市北辰区123号</p>
        </div>
        <div class="tdtwo">
          <p>员工账号</p>
          <p>注册时间</p>
          <p>员工职位</p>
        </div>
        <div class="tdthree">
          <p>1455555254</p>
          <p>yy--mm--dd至yy--mm--dd</p>
          <p>SA</p>
        </div>
      </div>
      <div class="activityrule">
        <h3>
          <b>活动信息</b>
        </h3>
        <el-table :data="tableData" stripe style="width: 100%;background:#eee;">
          <el-table-column prop="date" label="活动名称" width="166"></el-table-column>
          <el-table-column prop="name" label="扫码时间" width="166"></el-table-column>
          <el-table-column prop="address" label="奖励类型" width="166"></el-table-column>
          <el-table-column prop="date" label="价值" width="166"></el-table-column>
          <el-table-column prop="name" label="领取时间" width="166"></el-table-column>
          <el-table-column prop="address" label="领取状态"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
//员工详情
export default {
    created(){
        console.log(this.$route.query);
        
    },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;
  .header {
    width: 100%;
    height: 62px;
  }
  .content {
    width: 100%;
    height: auto;
    margin: 30px auto;
    .tab {
      width: 982px;
      height: 150px;
      display: flex;
      text-align: center;
      margin: 30px auto;
      p {
        line-height: 48px;
      }
      .activitytype {
        width: 214px;
        height: 148px;
        text-align: center;
        background: #ddd;
        border: 1px solid #ccc;
      }
      .tdtwo {
        width: 124px;
        height: 150px;
        background: #ddd;

        p {
          width: 124px;
          height: 48px;
          border: 1px solid #ccc;
        }
      }
      .tdthree {
        width: 266px;
        height: 150px;

        p {
          width: 266px;
          height: 48px;
          border: 1px solid #ccc;
        }
      }
    }
     .activityrule {
      width: 992px;
      min-height: 430px;
      border: 1px solid #ccc;
      padding: 44px 68px 0 68px;
      h3 {
        height: 40px;
        b {
          display: inline-block;
         padding-left:8px;
         padding-right:8px; 
          height: 16px;
          border-left: 8px solid #ddd;
          font-size: 14px;
          text-align: center;
        }
      }
      .el-table td, .el-table th{
      text-align: center;
  }
    }
  }
}
</style>
