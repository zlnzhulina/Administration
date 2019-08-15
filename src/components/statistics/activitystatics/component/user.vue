<template>
  <div class="main">
    <div class="header">
      <b>
        数据对比
        <select v-model="contrastdaynum" @change="handlecontrastdaynum(daynum)">
          <option value>选择时间</option>
          <option value="3">最近30天</option>
          <option value="2">最近7天</option>
          <option value="1">昨天</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="contrast" @change="handlecontrast(contrast)">
          <option value>添加对比数据</option>
          <option value="30">访问次数</option>
         
        </select>
        <span v-for="(item,index) in contrastlist">{{item}}</span>
      </b>
    </div>
    <ul class="datanav">
      <li style="margin-left:13px;line-height:14px;">
        <span style="display:inline-block;width:14px;height:14px;background:red"></span>
        首次参与人数： 活动参与比:
      </li>
      <li style="margin-left:13px;line-height:14px;">
        <span style="display:inline-block;width:14px;height:14px;background:red"></span>
        首次参与人数： 活动参与比:
      </li>
    </ul>
    <div class="datacompare">
      <div class="datacomparecontent" id="datacontrastcontent"></div>
    </div>
    <div class="header">
      <b>
        参与用户数据
        <select v-model="daynum" @change="handledaynum(daynum)">
          <option value>选择时间</option>
          <option value="2">最近30天</option>
          <option value="1">最近7天</option>
          <option value="0">自定义</option>
        </select>
        <el-date-picker
          v-if="daynum==0?true:false"
          v-model="userbeginTime"
          value-format="yyyyMMdd"
          type="date"
          placeholder="起始日期"
        ></el-date-picker>
        <el-date-picker
          v-if="daynum==0?true:false"
          v-model="userendTime"
          value-format="yyyyMMdd"
          type="date"
          placeholder="结束日期"
        ></el-date-picker>
        <i>{{datatime}}</i>
        <select v-model="activity" @change="handleactivity(contrast)">
          <option value>选择活动</option>
          <option value="30">活动一</option>
          <option value="7">访问人数</option>
          <option value="7">注册用户</option>
          <option value="7">参与用户</option>
          <option value="7">退出次数</option>
        </select>
        <span v-for="(item,index) in contrastlist">{{item}}</span>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <el-table
      :data="tabledata"
      stripe
      style="width: 100%;margin:0 auto;border:1px solid #d6d6d6;"
      :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
    >
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="activityname" label="活动名称"></el-table-column>
      <el-table-column prop="visitcount" label="首次参与用户数"></el-table-column>
      <el-table-column prop="visitpeoplecount" label="参与用户数"></el-table-column>
      <el-table-column prop="exitcount" label="累计参与用户数"></el-table-column>
      <el-table-column prop="exitcount" label="注册转化比"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  created(){
    this.this.time(7);
    this.userbeginTime=this.beginTime;
    this.userendTime=this.endTime;
  },
  data() {
    return {
      //选择的天数
      contrastdaynum: "2",
      datatime: "",
      //选择对比项
      contrast: "",
      //对比项列表
      contrastlist: ["活动1", "活动2"],
      // 用户参与数据的起始时间
      userbeginTime: "",
      userendTime: "",
      daynum: "1",
      activity: "",
      tabledata: [{}],

      //算出的起止日期
      beginTime:"",
      endTime:"",

    };
  },
  mounted() {

    this.contrastdata();
  },
  methods: {
    //创建数据报表
    contrastdata() {
      // Axios({
      //   url:"api/dataCenterManager/activityDataContrast",
      //   method:"get",
      //   params:{
      //     type:this.contrastdaynum,
      //     activityIds:
      //   }
      // })
      var contrastlist = this.contrastlist;
      let datacontrastChart = echarts.init(
        document.getElementById("datacontrastcontent")
      );
      datacontrastChart.setOption({
        color: ["#d9001b", "#f59a23", "#02a7f0"],
        legend: {
          data: contrastlist,
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
          formatter:
            "{b0}<br/>出售数量:{c0}<br />出售数量:{c1}<br/>出售数量:{c2}"
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
            name: contrastlist[0],
            data: [10, 100, 100, 50, 60, 110, 60],
            type: "line"
          },
          {
            name: contrastlist[1],
            data: [120, 50, 110, 80, 70, 110, 100],
            type: "line"
          }
        ]
      });
    },
    // 算起始日期
    time(n) {
      var date1 = new Date();
      this.beginTime =(date1.getFullYear() +"" +((date1.getMonth() + 1)<10?'0'+(date1.getMonth() + 1):(date1.getMonth() + 1)) +"" +date1.getDate()-1).toString();
      
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() - n);
      this.endTime =(date2.getFullYear() +"" +((date2.getMonth() + 1)<10?'0'+(date2.getMonth() + 1):(datdate2e1.getMonth() + 1)) +"" +date2.getDate()).toString();
      console.log(this.beginTime);
      console.log(this.endTime);

    },
    //选择天数

    handlecontrastdaynum(val) {
      if(val==1){
        this.time(7);
        this.userbeginTime=this.beginTime;
        this.userendTime=this.endTime;
        
      }else if(val==2){
        this.time(30);
        this.userbeginTime=this.beginTime;
        this.userendTime=this.endTime;
      }
      else{
        this.userbeginTime="";
        this.userendTime="";
      }
    },
    //选择对比数据
    handlecontrast(vla) {},
    handledaynum(val) {},
    handleactivity(val) {},
    exportdata() {}
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
  // background: #ccc;
  .header {
    width: 100%;
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
  .datacompare {
    width: 100%;
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
}
</style>

