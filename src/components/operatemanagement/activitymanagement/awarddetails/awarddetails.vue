<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >出奖详情</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >关闭</span>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;margin-right:10px;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >刷新</span>
    </div>
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
          <p>54543组</p>
          <p>yy--mm--dd至yy--mm--dd</p>
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
        <h2 style="width:100%;height:60px;background:#eee;line-height:60px;margin-top:30px;">
          <span style="margin-left:20px;font-size:14px;">筛选查询</span>
        </h2>
        <div class="search">
          <ul>
            <li class="left">
              <span>用户账号：</span>
              <input type="text" placeholder="请输入用户账号">
            </li>
            <li class="right">
              <span>活动时间：</span>
              <el-date-picker style="width:153px;" v-model="gotime" type="date" placeholder="选择日期"></el-date-picker>至
              <el-date-picker
                style="width:153px;"
                v-model="overtime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </li>
            <li class="left">
              <span>领取状态：</span>
              <select name="receivetype">
                <option>全部</option>
                <option>已领取</option>
                <option>未领取</option>
              </select>
            </li>
            <li class="right">
              <span>网点查询：</span>
              <select style="width:58px;" class="province"></select>
              <select style="width:58px;" class="city"></select>
              <select style="width:66px;" class="county"></select>
              <select style="width:128px;" class="wd"></select>
            </li>
            <li class="left">
              <span>奖品类型：</span>
              <select></select>
            </li>
            <li class="right">
              <span>奖项查询：</span>
              <select></select>
            </li>
          </ul>
        </div>
        <h2 style="width:100%;height:60px;background:#eee;line-height:60px;margin-top:30px;">
          <span style="margin-left:20px;font-size:14px;">出奖列表</span>
          <span
            style="display：block;float:right;width:94px;height:32px;text-align:center;line-height:32px;background:#fff;border:1px solid #ccc;font-size:14px;font-weight:normal;margin-right:13px;margin-top:13px;"
          >导出</span>
        </h2>
        <el-table :data="tableData" stripe style="width: 100%;">
          <el-table-column prop="date" label="用户账号" width="110"></el-table-column>
          <el-table-column prop="name" label="奖项名称" width="110"></el-table-column>
          <el-table-column prop="address" label="奖品名称" width="110"></el-table-column>
          <el-table-column prop="name" label="数量/剩余" width="110"></el-table-column>
          <el-table-column prop="name" label="数量/剩余" width="110"></el-table-column>
          <el-table-column prop="name" label="网点名称" width="112"></el-table-column>
          <el-table-column prop="name" label="领取时间" width="110"></el-table-column>
          <el-table-column prop="name" label="扫码时间" width="110"></el-table-column>
          <el-table-column prop="name" label="领取状态" width="110"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
//出奖详情
export default {
  data() {
    return {
      tableData:[
        {
          data:"",
          name:"",
          address:"",
        }
      ],
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.wrap {
  width: 1120px;
  height: auto;
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
      border: 1px solid #ccc;
      padding: 4px 68px 0 68px;
      .search {
        width: 930px;
        height: 236px;
        padding: 0 30px 0;
        border: 1px solid #ddd;
        ul {
          width: 870px;
          height: 100%;
          li {
            list-style: none;

            height: 78px;
            line-height: 78px;
            input {
              width: 252px;
              height: 36px;
            }
            select {
              width: 252px;
              height: 36px;
            }
          }
        }
      }
    }
  }
}
</style>
