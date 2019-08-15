<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >访问统计</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <div class="title">
      <b>转化漏斗</b>
      <span>活动名称</span>
    </div>
    <div class="head">
      <b>
        访问注册转化率
        <select v-model="daynum" @change="handlecontrastdaynum(daynum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
        <i>{{datatime}}</i>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="chart" id="chart"></div>
    <el-table
        :data="tabaData"
        stripe
        style="width: 100%;margin:0 auto;border:1px solid #d6d6d6;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="stepname" label="步骤名称"></el-table-column>
        <el-table-column prop="triggercount" label="触发用户数"></el-table-column>
        <el-table-column prop="befor" label="较上一步转化率"></el-table-column>
        <el-table-column prop="last" label="最终转化率"></el-table-column>
      </el-table>
  </div>
</template>
<script>
//查看
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
        daynum:"",
        datatime:"",
        tabaData:[{
            stepname:"",
            triggercount:"",
            befor:"",
            last:""
        }]
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      let Chart = echarts.init(document.getElementById("chart"));
      Chart.setOption({
        color: ["#d9001b", "#f59a23"],
        legend: {
          data: ["打开小程序", "登录成功"],
          bottom:0,
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
          
        },
        series: [
          {
            name: "打开小程序",
            data: [100],
            type: "bar"
          },
          {
            name: "登录成功",
            data: [98],
            type: "bar"
          }
        ]
      });
    },
    handlecontrastdaynum() {},
    exportdata(){},
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1120px;
  height: auto;
  padding-top: 60px;
  margin: 0 auto;
  .header {
    width: 100%;
    height: 62px;
  }
  .title {
    width: 100%;
    height: 38px;
    line-height: 38px;
    b {
      font-size: 18px;
    }
    span {
      margin-left: 16px;
      font-size: 16px;
    }
  }
  .head {
    width: 100%;
    height: 60px;
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
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
      span {
        display: inline-block;
        height: 28px;
        margin-left: 13px;
        line-height: 28px;
        padding: 0 8px 0 8px;
        font-size: 16px;
        border: 1px solid #e0e0e0;
      }
    }
    a {
      color: #169bd5;
      padding-right: 13px;
    }
  }
  .chart{
      width: 100%;
      height: 380px;

  }
}
</style>
