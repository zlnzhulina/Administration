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
          <span>新增访问人数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>新增注册用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>累计注册用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>78%</b>
          <span>占比</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
      </ul>
    </div>
    <div class="header">
      <b>
        数据对比
        <select v-model="daynum" @change="handledaynum(daynum)">
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <!-- <option value="30">最近30天</option> -->
        </select>
        <i>{{datatime}}</i>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="datacompare">
      <h2>
        <span>新增访问人数：3201 新增注册用户数：235 注册访问比：19%</span>
      </h2>
      <div class="datacomparecontent" id="datacomparecontent"></div>
    </div>
    <!-- 用户年龄画像 -->
    <div class="header">
      <b>用户年龄画像</b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="useragecontent">
      <div class="circular" id="circular"></div>
      <div class="circularright" id="circularright"></div>
    </div>
    <!-- 用户区域画像 -->
    <div class="header">
      <b>用户区域画像</b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="region">
      <h2>用户分布 201 个城市</h2>
      <div class="mapdata">
        <div class="left">
          <img src="../../assets/normal_u487.png" style="width:100%;margin-top:20px;" />
        </div>
        <div class="right">
          <div
            class="header"
            style="margin-top:0;height:56px;line-height:56px;background:#fff;width:100%;font-size:24px;"
          >
            <b>省级用户数NO.10</b>
            <a style="font-size:14px;" @click="exportdata">导出</a>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;align:center;"
            :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
          >
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="usernum" label="用户量"></el-table-column>
            <el-table-column prop="proportion" label="占比"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="header" style="background:#fff;width:100%;">
        <b>城市分布</b>
        <a @click="exportdata">导出</a>
      </div>
      <el-table
        :data="cityData"
        stripe
        style="width: 100%;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="province" label="城市"></el-table-column>
        <el-table-column prop="usernum" label="用户数量"></el-table-column>
        <el-table-column prop="newusernum" label="新增用户数量"></el-table-column>
        <el-table-column prop="proportion" label="占比"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// 用户统计
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  mounted() {
    let datacompareChart = echarts.init(
      document.getElementById("datacomparecontent")
    );
    datacompareChart.setOption({
      color: ["#d9001b", "#f59a23", "#02a7f0"],
      legend: {
        data: ["新增访问人数", "新增注册用户数", "注册访问比"],
        bottom: 0
      },
      grid: {
        show: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
        formatter: "{b0}<br/>出售数量:{c0}<br />出售数量:{c1}<br/>出售数量:{c2}"
      },
      xAxis: {
        type: "category",
        data: this.sevendata
      },
      yAxis: {
        type: "value"
        // show: false
      },
      series: [
        {
          name: "新增访问人数",
          data: [10, 100, 100, 50, 60, 110, 60],
          type: "line"
        },
        {
          name: "新增注册用户数",
          data: [120, 50, 110, 80, 70, 110, 100],
          type: "line"
        },
        {
          name: "注册访问比",
          data: [10, 50, 50, 60, 30, 80, 110],
          type: "line"
        }
      ]
    });
    let circularChart = echarts.init(document.getElementById("circular"));
    circularChart.setOption({
      color: ["#f59a23", "#95f204", "#027db4", "#00ffff", "#81d3f8", "#d9001b"],

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //     orient: 'vertical',
      //     left: 'left',

      // },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          data: [
            { value: 203, name: "16-25岁" },
            { value: 310, name: "26-35岁" },
            { value: 234, name: "36-45岁" },
            { value: 135, name: "46-55岁" },
            { value: 1548, name: "56岁以上" },
            { value: 100, name: "未知" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });
    let circularrightChart = echarts.init(
      document.getElementById("circularright")
    );
    circularrightChart.setOption({
      color: ["#d9001b", "#f59a23"],
      legend: {
        data: ["男", "女"],
        bottom: 0
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
        // formatter: '{b0}<br/>{a0}:{c0}<br />{a1}:{c1}<br/>"注册访问比：'
      },
      xAxis: {
        type: "category",
        data: ["16-25", "26-35", "36-45", "46-55", "56以上"]
      },
      yAxis: {
        type: "value"

        // show: false
      },
      series: [
        {
          name: "男",
          data: [120, 200, 150, 80, 70],
          type: "bar"
        },
        {
          name: "女",
          data: [120, 200, 150, 80, 70],
          type: "bar"
        }
      ]
    });
  },
  data() {
    return {
      daynum: "",
      datatime: "日期起止时间",
      tableData: [
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          proportion: "52%"
        }
      ],
      cityData: [
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        },
        {
          province: "河北省",
          usernum: "399",
          newusernum: "20",
          proportion: "52%"
        }
      ]
    };
  },
  methods: {
    handledaynum(val) {
      console.log(val);
    },
    //导出数据
    exportdata() {}
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
    margin: 30px auto;
    margin-bottom: 0;
    line-height: 60px;
    b {
      font-size: 18px;
      color: #555;
      margin-left: 13px;
      select {
        width: 108px;
        height: 28px;
        border: 1px solid #d7d7d7;
      }
      i {
        font-size: 14px;
        font-style: normal;
        color: #aaa;
      }
    }
    a {
      color: #169bd5;
      padding-right: 13px;
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
  .datacompare {
    width: 80%;
    height: 348px;
    border: 1px solid #f3f3f3;
    margin: 0 auto;
    border-top: 0px;
    h2 {
      font-size: 12px;
      color: #aaa;
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      span {
        margin-left: 15px;
      }
    }
    .datacomparecontent {
      width: 100%;
      height: 318px;
    }
  }
  .useragecontent {
    width: 80%;
    height: 370px;
    margin: 0 auto;
    border: 1px solid #f3f3f3;
    display: flex;
    .circular {
      width: 35%;
      height: 100%;
      // background: #ccc
    }
    .circularright {
      width: 63%;
      height: 100%;
    }
  }
  .region {
    width: 80%;
    min-height: 1273px;
    height:auto;
    border: 1px solid #d6d6d6;
    box-sizing: border-box;
    font-family: "Arial Regular", "Arial";
    color: #333333;

    margin: 0 auto;
    h2 {
      width: 50%;
      padding-left: 15px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      font-weight: normal;
    }
    .mapdata {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-around;
      .left {
        width: 495px;
        height: 457px;
        // background: #cccccc;
      }
      .right {
        width: 556px;
        height: auto;
        background: #eee;
      }
    }
  }
}
</style>
