<template>
  <div class="container">
    <!-- ------------------------------------昨日数据 -->
    <div class="header">
      <b>昨日数据</b>
    </div>
    <div class="yesterdaydata">
      <ul>
        <li>
          <b>{{yesterday.visitUv}}</b>
          <span>访问人数</span>
          <i>
            同比日
            <a style=" font-weight:bold;color:#d9001b">1.32↑</a>
          </i>
          <i>
            同比周
            <a style=" font-weight:bold;color:#70b603">1.32↓</a>
          </i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.registerNum}}</b>
          <span>注册用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.joinNum}}</b>
          <span>参与用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.joinNum}}</b>
          <span>出奖数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.sellNum}}</b>
          <span>出售商品数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
      </ul>
    </div>
    <div class="survey">
      <!-- ---------------------------------用户统计概况 -->
      <div class="surveylist">
        <div class="header">
          <b>
            用户统计概况
            <span style="font-size:14px;color:#555;margin-left:13px;">最近7天注册访问比：95%</span>
          </b>
          <a @click="more('userstatistics')">更多>></a>
        </div>
        <div class="usercontent" id="usercontent"></div>
      </div>
      <!-- ----------------------------------活动统计概况 -->
      <div class="surveylist">
        <div class="header">
          <b>
            活动统计概况
            <span style="font-size:14px;color:#555;margin-left:13px;">最近7天注册参与比：95%</span>
          </b>
          <a @click="more('activitystatistics')">更多>></a>
        </div>
        <div class="usercontent" id="activitycontent"></div>
      </div>
      <!-- ---------------------------------服务站统计概况 -->
      <div class="surveylist">
        <div class="header">
          <b>服务站统计概况</b>
          <a @click="more('dotstatistics')">更多>></a>
        </div>
        <div class>
          <table cellspacing="1" bgcolor="green" width="610">
            <tr bgcolor="#aaa" align="center" height="44">
              <td>
                <font size="3" color="white">服务站名称</font>
              </td>
              <td>
                <font size="3" color="white">出奖数量</font>
              </td>
              <td>
                <font size="3" color="white">出奖占比</font>
              </td>
              <td>
                <font size="3" color="white">参与用户数量</font>
              </td>
              <td>
                <font size="3" color="white">参与占比</font>
              </td>
            </tr>
            <tr bgcolor="white" v-for="(item,index) in dotdata" height="42" align="center">
              <td>{{item.networkName}}</td>
              <td>{{item.outPrizeNum}}</td>
              <td>{{item.proportion}}</td>
              <td>{{item.userJoinNum}}</td>
              <td>{{item.userProportion}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- ----------------------------------商品统计概况 -->
      <div class="surveylist">
        <div class="header">
          <b>商品统计概况</b>
          <a @click="more('goodsstatistics')">更多>></a>
        </div>
        <div class="usercontent" id="goodscontent"></div>
      </div>
      <!-- ----------------------------------行为统计概况 -->
      <div class="surveylist-visit">
        <div class="header">
          <b>行为统计</b>
          <a @click="more('visitstatistics')">更多>></a>
        </div>
        <div class="usercontent" id="visitcontent"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 概况
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  created() {
    this.yesterdaydata();
    this.dotsurvey();
  },
  data() {
    return {
      sevendata: [],
      // 昨日数据
      yesterday: {},
      //活动概况数据
      activitydata: {
        time: [],
        joinActivityUserCount: [],
        outActivityPrizeNum: []
      },
      // 服务站数据
      dotdata: [],
      //商品数据
      goodsdata: {},
      // 访问数据
      visitdata: {
        time: []
      },
      //用户统计数据
      userdata: {    
        registerNum: [],
        visitUvNew: [],
        proportion: [],
        time: []
      }
    };
  },
  mounted() {
    this.usersurvey();
    this.activitysurvey();

    this.goodssurvey();
    this.visitsurver();
  },
  methods: {
    // 昨日数据
    yesterdaydata() {
      Axios({
        url: "api/dataCenterManager/yesterdayData",
        method: "get"
      }).then(data => {
        // console.log(data);
        this.yesterday = data.data.data;
        //数据对比
      });
    },
    //用户统计概况
    usersurvey() {
      // dataCenterManager/userData
      Axios({
        url: "api/dataCenterManager/registerAccessData",
        method: "get"
      }).then(data => {
        
        if (data.data.code == 0) {
          // console.log(data);
          for (var i = 0; i < data.data.data.dataList.length; i++) {
            this.userdata.time.push(data.data.data.dataList[i].time);
            this.userdata.registerNum.push(
              data.data.data.dataList[i].registerNum
            );
            this.userdata.visitUvNew.push(
              data.data.data.dataList[i].visitUvNew
            );
            this.userdata.proportion.push(
              data.data.data.dataList[i].proportion
            );
          }
          // console.log(this.userdata)
          let userChart = echarts.init(document.getElementById("usercontent"));
          userChart.setOption({
            color: ["#d9001b", "#f59a23"],
            legend: {
              data: ["新增访问", "新增注册"]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              },
              formatter: '{b0}<br/>{a0}:{c0}<br />{a1}:{c1}<br/>"注册访问比：'
            },
            xAxis: {
              type: "category",
              data: this.userdata.time
            },
            yAxis: {
              type: "value",
              show: false
            },
            series: [
              {
                name: "新增访问",
                data: this.userdata.visitUvNew,
                type: "bar",
                barGap: 0
              },
              {
                name: "新增注册",
                data: this.userdata.proportion,
                type: "bar"
              }
            ]
          });
        }
      });
    },
    //活动统计概况
    activitysurvey() {
      Axios({
        url: "api/dataCenterManager/activityCountData",
        method: "get"
      }).then(data => {
        if (data.data.code == 0) {
          for (var i = 0; i < data.data.data.dataList.length; i++) {
            this.activitydata.time.push(data.data.data.dataList[i].time);
            this.activitydata.outActivityPrizeNum.push(
              data.data.data.dataList[i].outActivityPrizeNum
            );
            this.activitydata.joinActivityUserCount.push(
              data.data.data.dataList[i].joinActivityUserCount
            );
          }
          let activityChart = echarts.init(
            document.getElementById("activitycontent")
          );
          activityChart.setOption({
            color: ["#d9001b", "#f59a23"],
            legend: {
              data: ["参与用户", "出奖"]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              },
              formatter: "{b0}<br/>{a0}:{c0}<br />{a1}:{c1}<br/>"
            },
            xAxis: {
              type: "category",
              data: this.activitydata.time
            },
            yAxis: {
              type: "value",
              show: false
            },
            series: [
              {
                name: "参与用户",
                data: this.activitydata.joinActivityUserCount,
                type: "line"
              },
              {
                name: "出奖",
                data: this.activitydata.outActivityPrizeNum,
                type: "line"
              }
            ]
          });
        }
      });
    },
    //服务站统计概况
    dotsurvey() {
      Axios({
        url: "api/dataCenterManager/networkCountData",
        method: "get"
      }).then(data => {
        // console.log(data)
        this.dotdata = data.data.data.data;
      });
    },
    // 商品统计概况
    goodssurvey() {
      Axios({
        url: "api/dataCenterManager/productCountData",
        method: "get"
      }).then(data => {
        //  console.log(data)
        if (data.data.data.code == 0) {
          let goodsChart = echarts.init(
            document.getElementById("goodscontent")
          );
          goodsChart.setOption({
            color: ["#d9001b", "#f59a23", "#02a7f0"],
            legend: {
              data: [
                "壳牌福田戴姆勒专用齿轮油18L 80W-90 GL-5",
                "壳牌福田戴姆勒专用齿轮油4L 85W-140 GL-5",
                "壳牌福田戴姆勒专用柴油机油4L 20W-50 CH-5"
              ]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              },
              formatter:
                "{b0}<br/>出售数量:{c0}<br />出售数量:{c1}<br/>出售数量:{c2}"
            },
            xAxis: {
              type: "category",
              data: this.sevendata
            },
            yAxis: {
              type: "value",
              show: false
            },
            series: [
              {
                name: "壳牌福田戴姆勒专用齿轮油18L 80W-90 GL-5",
                data: [10, 100, 100, 50, 60, 110, 60],
                type: "line"
              },
              {
                name: "壳牌福田戴姆勒专用齿轮油4L 85W-140 GL-5",
                data: [120, 50, 110, 80, 70, 110, 100],
                type: "line"
              },
              {
                name: "壳牌福田戴姆勒专用柴油机油4L 20W-50 CH",
                data: [10, 50, 50, 60, 30, 80, 110],
                type: "line"
              }
            ]
          });
        }
      });
    },
    //访问统计概况
    visitsurver() {
      Axios({
        url: "api/dataCenterManager/accessCountData",
        method: "get"
      }).then(data => {
          console.log(data);
        if (data.data.code == 0) {
          for (var i = 0; i < data.data.data.dataList.length; i++) {
            this.visitdata.time.push(data.data.data.dataList.length[i].time);
          }
          // echarts折线图
          let visitChart = echarts.init(
            document.getElementById("visitcontent")
          );
          visitChart.setOption({
            color: ["#d9001b", "#f59a23"],
            legend: {
              data: ["参与用户", "出奖"]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              },
              formatter: "{b0}<br/>{a0}:{c0}<br />{a1}:{c1}<br/>"
            },
            xAxis: {
              type: "category",
              data: this.activitydata.time
            },
            yAxis: {
              type: "value",
              show: false
            },
            series: [
              {
                name: "参与用户",
                data: this.activitydata.joinActivityUserCount,
                type: "line"
              },
              {
                name: "出奖",
                data: this.activitydata.outActivityPrizeNum,
                type: "line"
              }
            ]
          });
        }
      });
    },
    more(url) {
      // console.log(url)
      var path = "/statistics/" + url;
      this.$router.push(path);
    }
  }
};
</script>

 <style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    width: 80%;
    height: 60px;
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    line-height: 60px;
    b {
      font-size: 18px;
      color: #555;
      margin-left: 13px;
    }
  }
  .yesterdaydata {
    width: 100%;
    height: 190px;

    ul {
      width: 80%;
      height: 182px;
      margin: 0 auto;
      border: 1px solid #f3f3f3;
      display: flex;
      justify-content: space-around;
      li {
        width: 158px;
        height: 100%;
        list-style: none;
        text-align: center;
        b {
          height: 52px;
          line-height: 52px;
          display: block;
          font-size: 16px;
          font-weight: bolder;
        }
        span {
          display: block;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: #aaaabd;
        }
        i {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #aaaabd;
        }
      }
    }
  }
  .survey {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    //   background: #cccccc;
    margin: 0 auto;
    .surveylist {
      width: 610px;
      min-height: 430px;
      margin-top: 20px;
      border: 1px solid #d7d7d7;
      .header {
        width: 100%;

        a {
          color: #555;
          font-weight: bold;
        }
      }
      .usercontent {
        width: 600px;
        height: 90%;
      }
    }
    .surveylist-visit {
      width: 99%;
      min-height: 443px;

      border: 1px solid #d7d7d7;
      margin: 20px auto;
      .header {
        width: 100%;
        a {
          color: #555;
          font-weight: bold;
        }
      }
      .usercontent {
        width: 80%;
        height: 80%;
      }
    }
  }
}
</style>
