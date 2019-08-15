<template>
  <div class="main">
    <div class="header">
      <b>
        数据对比
        <select v-model="contrastdaynum" @change="handlecontrastdaynum(daynum)">
          <option :value="1">选择时间</option>
          <option value="1">最近7天</option>
          <option value="2">最近30天</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="contrast" @change="handlecontrast(contrast)">
          <option value>添加对比数据</option>
          <option
            v-for="(item,index) in activityList"
            :value="item"
          >{{item.activityName}}</option>
        </select>

        <span v-for="(item,index) in contrastlist" style="position:relative">
          {{item.activityName}}
          <img
            @click="removeactivity(index)"
            src="../../../../assets/no.png"
            style="width:12px;position:absolute;top:-5px;right:-3px;"
          />
        </span>
      </b>
    </div>
    <div class="datacompare">
      <div class="datacomparecontent" id="datacontrastcontent"></div>
    </div>
    <!-- <div class="header"> -->
      <!-- <b>
        活动数据
        <select v-model="activity" @change="handleactivity(activity)">
          <option value>选择活动</option>
          <option
            v-for="(item,index) in activityList"
            :value="item"
          >{{item.activityName}}</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="datanum" @change="handledatanum(datanum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">访问人数</option>
          <option value="7">注册用户</option>
          <option value="7">参与用户</option>
          <option value="7">退出次数</option>
        </select>
        <i style="color:#02a7f0">查看各奖项情况</i>
      </b>
      <a @click="exportdata">导出</a> -->
    <!-- </div> -->
    <!-- <el-table
      :data="tabadata"
      stripe
      style="width: 100%;margin:0 auto;border:1px solid #d6d6d6;"
      :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
    >
      <el-table-column prop="time" label="时间"></el-table-column>

      <el-table-column prop="pageurl" label="活动名称"></el-table-column>
      <el-table-column prop="visitcount" label="出奖数量"></el-table-column>
      <el-table-column prop="visitpeoplecount" label="领取数量"></el-table-column>
      <el-table-column prop="exitcount" label="占比"></el-table-column>
      <el-table-column prop="exitcount" label="应发金额"></el-table-column>
      <el-table-column prop="exitcount" label="实发金额"></el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  created() {
     Axios({
      url: "api/dataCenterManager/activityList",
      method: "get"
    }).then(data => {
       console.log(data);
      if (data.data.code == 0) {
        this.activityList = data.data.data.activityList;
        this.contrast = data.data.data.activityList[0];
        // console.log(this.contrast)
        this.contrastlist.push(this.activityList[0]);
         
      this.contrastdata();
        
      }
    });
  },
  data() {
    return {
      contrastdaynum: "1",
      datatime: "",
      //选择页面分析天数
      datanum: "",
      analysisdaynum: "",
      // 对比项选择
      contrast: "",
      //选择的活动
      activity: "",
      //对比项列表
      contrastlist: [],
      tabadata: [],
      activityList: [],
      arr:[]
    };
  },
  mounted() {
  },
  methods: {
    contrastdata() {
      this.arr=[];
      for (var i = 0; i < this.contrastlist.length; i++) {
      this.arr.push(this.contrastlist[i].activityId);
      }
     Axios({
       url:"api/dataCenterManager/prizeData",
       method:"get",
       params:{
         type:this.contrastdaynum,
         activityIds:this.arr.toString()

       }
     }).then(data=>{
       console.log(data)
     })
      // var contrastlist = this.contrastlist;
      // let datacontrastChart = echarts.init(
      //   document.getElementById("datacontrastcontent")
      // );
      // datacontrastChart.setOption({
      //   color: ["#d9001b", "#f59a23", "#02a7f0"],
      //   legend: {
      //     data: contrastlist,
      //     bottom: 0
      //   },
      //   grid: {
      //     show: true
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross"
      //     },
      //     formatter:
      //       "{b0}<br/>出售数量:{c0}<br />出售数量:{c1}<br/>出售数量:{c2}"
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: this.sevendata
      //   },
      //   yAxis: {
      //     type: "value"
      //     // show: false
      //   },
      //   series: [
      //     {
      //       name: contrastlist[0],
      //       data: [10, 100, 100, 50, 60, 110, 60],
      //       type: "line"
      //     },
      //     {
      //       name: contrastlist[1],
      //       data: [120, 50, 110, 80, 70, 110, 100],
      //       type: "line"
      //     }
      //   ]
      // });
    },
    //对比项选择天数
    handlecontrastdaynum(day) {},
    //选择要对比的选项
    handlecontrast(value) {
         this.contrastlist.push(value);
         this.contrastdata()
        //  console.log(this.contrastlist)
    },
    //删除选项
    removeactivity(i) {
this.contrastlist.splice(i,1)
console.log(this.contrastlist)
// this.contrastdata()
    },
    //页面分析选择天数
    handledatanum(value) {},
    handleactivity(val) {},
    exportdata() {}
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
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

