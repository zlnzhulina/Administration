<template>
  <div class="main">
    <div class="header">
      <b>
        活动区域数据
        <select v-model="daynum" @change="handledaynum(daynum)">
         
          <option value="2">最近30天</option>
          <option value="1">最近7天</option>
        </select>
        <i>{{datatime}}</i>
        <select v-model="activityId" @change="handleactivity(activityId)">
          <option :value="1">全部活动</option>
          <option
            v-for="(item,index) in activityList"
            :value="item.activityId"
          >{{item.activityName}}</option>
        </select>
        <!-- <span v-for="(item,index) in activityList">{{item}}</span> -->
      </b>
    </div>
    <div class="region">
      <h2>201 个城市参与活动</h2>
      <div class="mapdata">
        <div class="left">
          <img src="../../../../assets/u924.png" style="width:100%;margin-top:20px;" />
        </div>
        <div class="right">
          <div
            class="header"
            style="margin-top:0;height:56px;line-height:56px;background:#fff;width:100%;font-size:24px;"
          >
            <b>省级用户NO.10</b>
            <a style="font-size:14px;" @click="exportdata">导出</a>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;align:center;"
            :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
          >
            <el-table-column prop="province" label="省份"></el-table-column>
            <el-table-column prop="dotnum" label="用户数量"></el-table-column>
            <el-table-column prop="proportion" label="占比"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="header">
        <b>
          活动城市分布
          <select v-model="selectActivity" @change="handleactivity(selectActivity)">
            <option value>选择时间</option>
            <option value="30">最近30天</option>
            <option value="7">最近7天</option>
            <option value="1">自定义</option>
          </select>

          <select v-model="city" @change="handlecity(city)">
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
  </div>
</template>
<script>
import Axios from "axios";
export default {
  created() {
    Axios({
      url: "api/dataCenterManager/activityList",
      method: "get"
    }).then(data => {
      console.log(data);
      if(data.data.code==0){
        this.activityList = data.data.data.activityList;
        this.activitydata();
      }
      
      
    });
  },
  data() {
    return {
      daynum: "1",
      datatime: "",
      activity: "",
      activityId: "1",
      city: "",
      selectActivity: "",
      activityList: [],
      tabledata: [],
      contrastlist: [],
      tableData: []
    };
  },
  methods: {
    activitydata() {
      Axios({
        url: "api/dataCenterManager/activityAreaData",
        method: "get",
        params: {
          type: this.daynum,
          activityId: this.activityId==1?"":this.activityId
        }
      }).then(data=>{
        console.log(data)
      });
    },
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
  .region {
    width: 100%;

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
}
</style>

