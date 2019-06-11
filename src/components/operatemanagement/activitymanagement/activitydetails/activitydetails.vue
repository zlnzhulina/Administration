<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >活动详情</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <span @click="awarddetails"
      style="width:140px;height:34px;color:#fff;font-size:14px;text-align:center;line-height:34px;display:block;margin-top:30px;background:#1abc9c;"
    >查看出奖详情</span>
    <div class="content">
      <div class="tab">
        <div class="activitytype">
          <img>
          <p>类型：扫码领红包</p>
        </div>
        <div class="tdtwo">
          <p>活动名称</p>
          <p>已关联小程序码</p>
          <p>活动时间</p>
        </div>
        <div class="tdthree">
          <p>活动名称</p>
          <p>已关联小程序码</p>
          <p>活动时间</p>
        </div>
        <div class="tdtwo">
          <p>活动状态</p>
          <p>已激活小程序码</p>
          <p>活动区域</p>
        </div>
        <div class="tdthree">
          <p>进行中</p>
          <p>2362组</p>
          <p>全国</p>
        </div>
      </div>
      <div class="activityrule">
        <h3>
          <b>活动规则</b>
          <span>修改</span>
        </h3>
        <el-table :data="tableData" stripe style="width: 100%;background:#eee;">
          
          <el-table-column prop="date" label="规则类型" width="327"></el-table-column>
          <el-table-column prop="name" label="规则名称" width="327"></el-table-column>
          <el-table-column prop="address" label="结果"></el-table-column>
        </el-table>

        <h3 style="margin-top:80px;">
          <b>奖项与奖品信息</b>
          <span>修改</span>
        </h3>
        <el-table :data="tableData" stripe style="width: 100%;background:#eee;">
          
          <el-table-column prop="date" label="奖品名称" width="142"></el-table-column>
          <el-table-column prop="name" label="奖项名称" width="142"></el-table-column>
          <el-table-column prop="address" label="奖项属性" width="142"></el-table-column>
           <el-table-column prop="name" label="奖品类型" width="142"></el-table-column>
            <el-table-column prop="name" label="奖品名称" width="142"></el-table-column>
             <el-table-column prop="name" label="数量/剩余" width="141"></el-table-column>
              <el-table-column prop="name" label="中奖概率"></el-table-column>
        </el-table>
        <h2 style="width:100%;height:60px;background:#ddd;line-height:60px;margin-top:30px;"><span style="margin-left:20px;font-size:14px;">关联条码</span></h2>
        <el-table :data="tableData" stripe style="width: 100%;background:#eee;">
          
          <el-table-column prop="date" label="活动名称" width="199"></el-table-column>
          <el-table-column prop="name" label="关联商品" width="199"></el-table-column>
          <el-table-column prop="address" label="奖品数量" width="199"></el-table-column>
           <el-table-column prop="name" label="已关联条码数量" width="199"></el-table-column>
            <el-table-column prop="name" label="操作">
                <template>
                    <el-button type="text" size="small" >关联</el-button>
                </template>
            </el-table-column>
            
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
//活动详情
export default {
    data(){
        return{

        }
    },
    methods:{
        awarddetails(){
            this.$router.push({
                path:"/awarddetails"
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  height: auto;
  padding-top: 90px;
  margin: 0 auto;
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
        span {
          display: inline-block;
          width: 66px;
          height: 18px;
          text-align: center;
          background: #1abc9c;
          color: #fff;
          font-size: 12px;
          line-height: 18px;
          font-weight: normal;
        }
      }
      .el-table td, .el-table th{
      text-align: center;
  }
    }
    
  }
}
</style>
