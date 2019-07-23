<template>
  <div class="container">
    <div class="header">
      <b>昨日数据</b>
    </div>
    <div class="yesterdaydata">
      <ul>
        <li>
          <b>338</b>
          <span>服务站数量</span>
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
          <span>新增服务站</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>用户数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>338</b>
          <span>新增用户</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>78%</b>
          <span>出奖数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>78%</b>
          <span>新增出奖数量</span>
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
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="selectdot" @change="handledot(selectdot)">
          <option value>选择服务站</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <!-- <option value="30">最近30天</option> -->
        </select>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="datacompare">
      <!-- <h2>
        <span>新增访问人数：3201 新增注册用户数：235 注册访问比：19%</span>
      </h2>-->
      <div class="datacomparecontent" id="datacomparecontent"></div>
    </div>
    <div class="header">
      <b>服务站分布</b>
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
            <b>城市服务站数据NO.10</b>
            <a style="font-size:14px;" @click="exportdata">导出</a>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;align:center;"
            :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
          >
            <el-table-column prop="province" label="城市"></el-table-column>
            <el-table-column prop="dotnum" label="服务站数量"></el-table-column>
            <el-table-column prop="proportion" label="占比"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="header">
      <b>服务站数据
        <select v-model="province">
          <option value>选择省</option>
        </select>
        <select v-model="city">
          <option value>选择城市</option>
        </select>
         <select v-model="selectdaynum" @change="handledot(selectdaynum)">
          <option value>选择时间</option>
          <option value="30">最近30天</option>
          <option value="7">最近7天</option>
          <option value="1">自定义</option>
        </select>
      </b>
      <a @click="exportdata">导出</a>
    </div>
    <div class="dotdata">
      <el-table
        :data="cityData"
        stripe
        style="width: 100%;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="dotname" label="服务站名称"></el-table-column>
        <el-table-column prop="awardnum" label="出奖数量"></el-table-column>
        <el-table-column prop="Awardproportion" label="出奖占比"></el-table-column>
        <el-table-column prop="usernum" label="用户数量"></el-table-column>
        <el-table-column prop="userproportion" label="用户占比"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="details(scope.row)">查看各奖项情况</el-button>
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
    
    
  },
  data() {
    return {
      //选择天数
      daynum:"",
      selectdaynum:"",
      datatime:"",
      selectdot: "",
      tableData: [
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        },
        {
          province: "河北省",
          dotnum: "399",
          proportion: "52%"
        }
      ],
      cityData: [
        {
          dotname: "111",
          awardnum: "10",
          Awardproportion: "30%",
          usernum: "200",
          userproportion: "20%"
        }
      ],
      province:"",
      city:"",
    };
  },
  methods: {
    // selectdot(val) {},
    handledot(val) {},
    //查看各奖项情况
    details(row) {
      console.log(row),
      this.$router.push({
        path:"/dotawarddetails",
        query:{
          rowdata:row
        }
      })
    },
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
    
    height: auto;
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
  .dotdata {
    width: 80%;
    margin: 0 auto;
    height: auto;
  }
}
</style>

