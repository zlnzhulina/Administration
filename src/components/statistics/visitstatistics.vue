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
          <span>访问次数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>次均停留时长</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>78%</b>
          <span>退出页面数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>78%</b>
          <span>退出率</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
      </ul>
    </div>
    <div class="header">
      <b>
        数据对比
        <select v-model="contrastdaynum" @change="handlecontrastdaynum(daynum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="contrast" @change="handlecontrast(contrast)">
          <option value>选择对比项</option>
          <option value="30">访问次数</option>
          <option value="7">访问人数</option>
          <option value="7">注册用户</option>
          <option value="7">参与用户</option>
          <option value="7">退出次数</option>
        </select>
        <span v-for="(item,index) in contrastlist">{{item}}</span>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="datacompare">
      <div class="datacomparecontent" id="datacontrastcontent"></div>
    </div>
    <!-- 页面分析 -->
    <div class="header">
      <b>
        页面分析
        <select v-model="analysisdaynum" @change="handleanalysisdaynum(daynum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
        <i>{{datatime}}</i>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="dotdata">
      <el-table
        :data="analysisData"
        stripe
        style="width: 97%;margin:0 auto;border:1px solid #d6d6d6;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="pageurl" label="页面路径" width="360"></el-table-column>
        <el-table-column prop="pagename" label="页面名称"></el-table-column>
        <el-table-column prop="visitcount" label="访问次数"></el-table-column>
        <el-table-column prop="visitpeoplecount" label="访问人数"></el-table-column>
        <el-table-column prop="exitcount" label="退出页次数"></el-table-column>
        <el-table-column prop="eachtime" label="次均时长（S）"></el-table-column>
        <el-table-column prop="exitprobability" label="退出率"></el-table-column>
        
      </el-table>
    </div>
    <div class="header">
      <b>
        数据对比
        <select v-model="contrastdaynum" @change="handlecontrastdaynum(daynum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="activity" @change="handlesctivity(activity)">
          <option value>选择活动</option>
        </select>
        <span @click="funnelEvent">查看漏斗事件</span>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="funnel">
      <h3><span @click="createfunnel">创建漏斗</span></h3>
      <el-table
        :data="analysisData"
        stripe
        style="width: 97%;margin:0 auto;border:1px solid #d6d6d6;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="pageurl" label="活动名称" width="360"></el-table-column>
        <el-table-column prop="pagename" label="漏斗名称"></el-table-column>
        <el-table-column prop="visitcount" label="初始动作"></el-table-column>
        <el-table-column prop="visitpeoplecount" label="目标动作"></el-table-column>
        <el-table-column prop="exitcount" label="最终转化率"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="details(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
//商品统计
import Axios from "axios";
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      //选择对比天数
      contrastdaynum: "",
      datatime: "",
      //选择页面分析天数
      analysisdaynum: "",
      // 对比项选择
      contrast: "",
      // 
      activity:"",
      //对比项列表
      contrastlist: ["访问人数", "注册用户"],
      analysisData: [
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        },
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        },
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        },
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        },
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        },
        {
          pageurl: "http:dsdj/dva",
          pagename: "抽奖页面",
          visitcount: "3",
          visitpeoplecount: "5244",
          exitcount: "30",
          eachtime: "645",
          exitprobability: "8%"
        }
      ]
    };
  },
  mounted() {
    this.contrastdata();
  },
  methods: {
    contrastdata() {
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
    //对比项选择天数
    handlecontrastdaynum(day) {},
    //选择要对比的选项
    handlecontrast(value) {},

    //页面分析选择天数
    handleanalysisdaynum(value) {},
    exportdata() {},
    //查看漏斗事件
    funnelEvent() {
      this.$router.push({
        path:"/funnelEvent",
       
      })
    },
    //创建漏斗
    createfunnel(){
      this.$router.push({
        path:"/createfunnel"
      })
    },
    //查看
    details(row){
      this.$router.push({
        path:"/funneldetails",
        query:{
          flag:"1",
          rowdata:row
        }
      })
    },
    //删除
    del(row){

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
  .dotdata {
    width: 80%;
    margin: 0 auto;
    height: auto;
    border: 1px solid #d6d6d6;
  }
  .funnel {
    width: 80%;
    margin: 0 auto;
    height: auto;
    border: 1px solid #d6d6d6;
    h3 {
      width: 90%;
      height: 44px;
      line-height: 44px;
      text-align: right;
      margin: 0 auto;
      font-size: 14px;
      color: #169bd5;
      font-weight: normal;
    }
  }
}
</style>

