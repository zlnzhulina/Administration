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
        @click="refresh"
        style="display:block;width:102px;height:30px;float:right;margin-right:10px;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >刷新</span>
    </div>
    <div class="content">
      <div class="tab">
        <div class="activitytype">
          <img />
          <p>类型：扫码领红包</p>
        </div>
        <div class="tdtwo">
          <p>活动名称</p>
          <p>已关联小程序码</p>
          <p>活动时间</p>
        </div>
        <div class="tdthree">
          <p>{{activitydetails.activityName}}</p>
          <p>54543组</p>
          <p>{{activitydetails.startTime.trim().split(/\s+/)[0]}}至{{activitydetails.endTime.trim().split(/\s+/)[0]}}</p>
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
              <input type="text" placeholder="请输入用户账号" v-model="phoneNumber" />
            </li>
            <li class="right">
              <span>领取时间：</span>
              <el-date-picker
                style="width:163px;"
                v-model="receiveBeginTime"
                type="date"
                placeholder="选择日期"
                format="yyyy--MM--dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>-
              <el-date-picker
                style="width:163px;"
                v-model="receiveEndTime"
                type="date"
                placeholder="选择日期"
                format="yyyy--MM--dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </li>
            <li class="left">
              <span>领取状态：</span>
              <select name="receivetype" v-model="status">
                <option value>全部</option>
                <option value="1">已领取</option>
                <option value="0">未领取</option>
              </select>
            </li>
            <li class="right">
              <span>扫码时间：</span>
              <el-date-picker
                style="width:163px;"
                v-model="scanBeginTime"
                type="date"
                placeholder="选择日期"
                format="yyyy--MM--dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>-
              <el-date-picker
                style="width:163px;"
                v-model="scanEndTime"
                type="date"
                placeholder="选择日期"
                format="yyyy--MM--dd HH:mm:ss"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </li>

            <li class="left">
              <span>奖品类型：</span>
              <select>
                <option>微信红包</option>
              </select>
            </li>
            <li class="right">
              <span>网点查询：</span>
              <!-- <select style="width:58px;" class="province"></select>
              <select style="width:58px;" class="city"></select>
              <select style="width:66px;" class="county"></select>-->
              <select style="width:208px;" class="wd" v-model="networkCode">
                <option :value="initdetails">--请选择网点--</option>
                <option
                  v-for="(item,index) in dotlist"
                  :value="item.networkCode"
                >{{item.networkName}}</option>
              </select>
            </li>

            <li class="left">
              <span>商品名称:</span>
              <select v-model="productId">
                <option value>全部</option>
                <option
                  v-for="(item,index) in productList"
                  :value="item.productId"
                >{{item.productName}}</option>
              </select>
            </li>
            <li class="right">
              <span>奖品名称：</span>
              <input type="text" v-model="activityPrizeName" />
            </li>
          </ul>
        </div>
        <h2 style="width:100%;height:60px;background:#eee;line-height:60px;margin-top:30px;">
          <span style="margin-left:20px;font-size:14px;">出奖列表</span>
          <span
            style="display：block;float:right;width:94px;height:32px;text-align:center;line-height:32px;background:#fff;border:1px solid #ccc;font-size:14px;font-weight:normal;margin-right:13px;margin-top:13px;"
            @click="exporttab"
          >导出</span>
        </h2>
        <el-table :data="tableData" stripe style="width: 100%;">
          <el-table-column prop="phoneNumber" label="用户账号" width="130"></el-table-column>
          <el-table-column prop="activityPrizeName" label="奖项名称" width="110">
            <template>{{"微信红包"}}</template>
          </el-table-column>
          <el-table-column prop="activityPrizeName" label="奖品名称" width="110"></el-table-column>
          <el-table-column prop="activityPrizeCount" label="全部/剩余" width="110">
            <template
              slot-scope="scope"
            >{{scope.row.activityPrizeCount}}/{{scope.row.activityPrizeResidueCount}}</template>
          </el-table-column>
          <el-table-column prop="money" label="金额" width="110"></el-table-column>
          <el-table-column prop="networkName" label="网点名称" width="112"></el-table-column>
          <el-table-column prop="recevideDate" label="领取时间" width="160"></el-table-column>
          <el-table-column prop="scanDate" label="扫码时间" width="160"></el-table-column>
          <el-table-column prop="status" label="领取状态">
            <template slot-scope="scope">{{scope.row.status==1?"已领取":scope.row.status==0?"未领取":""}}</template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script>
//出奖详情
import Axios from "axios";
export default {
  created() {
    this.activitydetails = this.$route.query.activitydetails;
    this.activityId = this.$route.query.activitydetails.activityId;
    // console.log(this.activitydetails);
    this.awardlist();

    Axios({
        method: "get",
        url: "api/networkUserManager/initUserCatAndNetworkList"
      }).then(data => {
          console.log(data);

        this.dotlist = data.data.data.networkList;
      });
    Axios({
      url: "api/activityManager/getProductListByActivityId",
      method: "get",
      params: {
        activityId: this.$route.query.activitydetails.activityId
      }
    }).then(data => {
      // console.log(data);
      this.productList = data.data.data.productList;
    });
  },
  data() {
    return {
      tableData: [
        {
          data: "",
          name: "",
          address: ""
        }
      ],
      productList: [],
      productId: "",
      pagesize: 10,
      currentPage: 1,
      activitydetails: {},
      //活动id
      activityId: "",
      pageNo: "1",
      //筛选查询
      //网点列表
      dotlist: [],
      //用户账号
      initdetails: "",
      phoneNumber: "",

      //扫码开始时间
      scanBeginTime: "",
      //扫码结束时间
      scanEndTime: "",
      //开始领取时间
      receiveBeginTime: "",
      //领取结束时间
      receiveEndTime: "",
      //领取状态
      status: "",
      activityPrizeName: "",
      networkCode: "",
      pagesize: 10,
      currentPage: 1,
      totalCount: 1
    };
  },
  methods: {
    awardlist() {
      Axios({
        url: "api/activityManager/activityDetail",
        method: "get",
        params: {
          pageNo: this.currentPage,
          // pageSize: this.pagesize,
          activityId: this.activityId,
          phoneNumber: this.phoneNumber,
          scanBeginTime: this.scanBeginTime,
          scanEndTime: this.scanEndTime,
          receiveBeginTime: this.receiveBeginTime,
          receiveEndTime: this.receiveEndTime,
          status: this.status,
          activityPrizeName: this.activityPrizeName,
          networkCode: this.networkCode,
          productId: this.productId
        }
      }).then(data => {
        // console.log(data);
        this.tableData = data.data.data.map.records;
        this.totalCount = data.data.data.map.total;
        this.pagesize = data.data.data.map.size;
        this.currentPage = data.data.data.map.current;
      });
    },
    //刷新
    refresh() {

      this.awardlist();
// this.productList=[];
      Axios({
        method: "get",
        url: "api/networkUserManager/initUserCatAndNetworkList"
      }).then(data => {
          console.log(data);

        this.dotlist = data.data.data.networkList;
      });
      Axios({
        url: "api/activityManager/getProductListByActivityId",
        method: "get",
        params: {
          activityId: this.$route.query.activitydetails.activityId
        }
      }).then(data => {
        if(data.data.code==0){
         this.$message.success("刷新成功！");
        }
        // console.log(data);
        this.productList = data.data.data.productList;
      });
    },
    back() {
      this.$router.push("/operatemanagement");
    },
    //分页功能
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.awardlist();
    },
    //导出数据
    exporttab() {
      window.location.href =
        "api/activityManager/outExcelData?activityId=" +
        this.activityId +
        "&pageNo=1" +
        "&phoneNumber=" +
        this.phoneNumber +
        "&status=" +
        this.status +
        "&activityPrizeName=" +
        this.activityPrizeName +
        "&networkCode=" +
        this.networkCode;
    }
  },
  watch: {
    phoneNumber(val) {
      this.awardlist();
    },
    status(val) {
      this.awardlist();
    },
    activityPrizeName(val) {
      this.awardlist();
    },
    networkCode(val) {
      this.awardlist();
    },
    productId(val) {
      // console.log(val);
      this.awardlist();
    },
    scanBeginTime(val) {
      this.awardlist();
    },
    scanEndTime(val) {
      this.awardlist();
    },
    receiveBeginTime(val) {
      this.awardlist();
    },
    receiveEndTime(val) {
      this.awardlist();
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
  width: 1217px;
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
      height: 150px;
      text-align: center;
      margin: 30px auto;
      display: flex;
      justify-content: center;
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
        height: 150px;
        background: #ddd;

        p {
          height: 48px;
          border: 1px solid #ccc;
        }
      }
      .tdthree {
        height: 150px;

        p {
          width: 346px;
          height: 48px;
          border: 1px solid #ccc;
        }
      }
    }
    .activityrule {
      width: 1100px;
      border: 1px solid #ccc;
      padding: 4px 68px 0 68px;

      .search {
        width: 1038px;
        height: 302px;
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
