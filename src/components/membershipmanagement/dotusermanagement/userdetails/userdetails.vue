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
          <img />
          <p>{{rowdata.nickname}}</p>
        </div>
        <div class="tdtwo">
          <p>员工名称</p>
          <p>网点名称</p>
          <p>网点地址</p>
        </div>
        <div class="tdthree">
          <p>{{rowdata.name==null?"暂无":rowdata.name}}</p>
          <p>{{rowdata.network.networkName==null?"暂无":rowdata.network.networkName}}</p>
          <p>{{rowdata.network.area==null?"暂无":rowdata.network.area+rowdata.network.city+rowdata.network.address}}</p>
        </div>
        <div class="tdtwo">
          <p>员工账号</p>
          <p>注册时间</p>
          <p>员工职位</p>
        </div>
        <div class="tdthree">
          <p>{{rowdata.phoneNumber==null?"暂无":rowdata.phoneNumber}}</p>
          <p>{{rowdata.regeditDate==null?"暂无":rowdata.regeditDate}}</p>
          <p>{{rowdata.userCatName==null?"暂无":rowdata.userCatName}}</p>
        </div>
      </div>
      <div class="activityrule">
        <h3>
          <b>活动信息</b>
        </h3>
        <el-table :data="tableData" stripe style="width: 100%;background:#eee;">
          <el-table-column prop="activityName" label="活动名称" width="186"></el-table-column>
          <el-table-column prop="addDate" label="扫码时间" width="206"></el-table-column>
          <el-table-column label="奖励类型" width="146">
            <template>现金红包</template>
          </el-table-column>
          <el-table-column prop="money" label="价值" width="86"></el-table-column>
          <el-table-column prop="receiveDate" label="领取时间" width="206"></el-table-column>
          <el-table-column label="领取状态">
            <template slot-scope="scope">{{scope.row.status==1?"已领取":scope.row.status==0?"未领取":""}}</template>
          </el-table-column>
        </el-table>
        
      </div>
      <!-- 分页功能 -->
        <div class="block fr" style="margin-top: 10px;">
          <el-pagination
            @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="totalCount"
          ></el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
//员工详情
export default {
  created() {
    // console.log(this.$route.query);
    this.rowdata = this.$route.query.rowdata;
    if (this.$route.query.flag == "2") {
      this.init();
    }
  },
  data() {
    return {
      rowdata: {},
      tableData: [],
      currentPage:1,
      totalCount:1,
      pagesize:10,

    };
  },
  methods: {
    init() {
      Axios({
        url: "api/networkUserManager/userDetail",
        method: "get",
        params: {
          userId: this.rowdata.userId,
          pageNo: 1
        }
      }).then(data => {
        // console.log(data);
        this.tableData = data.data.data.userReceivePage.records;
          this.totalCount = data.data.data.userReceivePage.total;
        this.currentPage = data.data.data.userReceivePage.current;
      });
    },
    //分页功能
     handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    back() {
      this.$router.back();
    }
    },
  
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
          padding-left: 8px;
          padding-right: 8px;
          height: 16px;
          border-left: 8px solid #ddd;
          font-size: 14px;
          text-align: center;
        }
      }
      .el-table td,
      .el-table th {
        text-align: center;
      }
    }
  }
}
</style>
