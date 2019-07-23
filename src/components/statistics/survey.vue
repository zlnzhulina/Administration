<template>
  <div class="container">
    <div class="header">
      <b>昨日数据</b>
    </div>
    <div class="yesterdaydata">
      <ul>
        <li>
          <b>338</b>
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
          <b>12</b>
          <span>注册用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>参与用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>出奖数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>出售商品数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
      </ul>
    </div>
    <div class="survey">
      <div class="surveylist">
        <div class="header">
          <b>用户统计概况<span style="font-size:14px;color:#555;margin-left:13px;">最近7天注册访问比：95%</span></b>
          <a @click="more('userstatistics')">更多>></a>
        </div>
        <div class="usercontent" id="usercontent"></div>
      </div>
      <div class="surveylist">
        <div class="header">
          <b>活动统计概况<span style="font-size:14px;color:#555;margin-left:13px;">最近7天注册参与比：95%</span></b>
          <a @click="more('activitystatistics')">更多>></a>
        </div>
        <div class="usercontent" id="activitycontent"></div>
      </div>
      <div class="surveylist">
        <div class="header">
          <b>服务站统计概况</b>
          <a @click="more('dotstatistics')">更多>></a>
        </div>
      </div>
      <div class="surveylist">
        <div class="header">
          <b>商品统计概况</b>
          <a @click="more('goodsstatistics')">更多>></a>
        </div>
        <div class="usercontent" id="goodscontent"></div>
      </div>
      <div class="surveylist-visit">
        <div class="header">
          <b>行为统计</b>
          <a @click="more('visitstatistics')">更多>></a>
        </div>
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
    var myDate = new Date();

    for (let i = 0; i < 7; i++) {
      var sevendata =
        myDate.getFullYear() +
        "" +
        (myDate.getMonth() + 1) +
        "" +
        myDate.getDate();
      this.sevendata.push(sevendata);
      
    }
    // for (let i=0;i<7;i++) {
    //前一天
    // var Date7 = new Date(myDate.getTime() - i*24*60*60*1000).format('yyyy.MM.dd');
    // this.sevendata.push(Date7);
    // }
    console.log(this.sevendata);
  },
  data() {
    return {
      sevendata: []
    };
  },
  mounted() {
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
        data: this.sevendata
      },
      yAxis: {
        type: "value",
        show: false
      },
      series: [
        {
          name: "新增访问",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        },
        {
          name: "新增注册",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        }
      ]
    });
    let activityChart=echarts.init(document.getElementById("activitycontent"));
    activityChart.setOption({
      color: ["#d9001b", "#f59a23"],
      legend: {
        data: ["参与用户", "出奖"]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: '{b0}<br/>{a0}:{c0}<br />{a1}:{c1}<br/>'
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
          name: "参与用户",
          data: [10, 100, 180, 50, 60, 150, 60],
          type: "line"
        },
        {
          name: "出奖",
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "line"
        }
      ]
    });
    let goodsChart=echarts.init(document.getElementById("goodscontent"));
    goodsChart.setOption({
      color: ["#d9001b", "#f59a23","#02a7f0"],
      legend: {
        data: ["壳牌福田戴姆勒专用齿轮油18L 80W-90 GL-5", "壳牌福田戴姆勒专用齿轮油4L 85W-140 GL-5","壳牌福田戴姆勒专用柴油机油4L 20W-50 CH-5"]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: '{b0}<br/>出售数量:{c0}<br />出售数量:{c1}<br/>出售数量:{c2}'
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
  },
  methods:{
      more(url){
          console.log(url)
          var path="/statistics/"+url;
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
    }
  }
}
</style>
