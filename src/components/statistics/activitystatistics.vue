<template>
  <div class="container">
    <div class="header">
      <b>昨日数据</b>
    </div>
    <div class="yesterdaydata">
      <ul>
        <li>
          <b>{{yesterday.joinUserNum}}</b>
          <span>参与用户数</span>
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
          <b>{{yesterday.newJoinNum}}</b>
          <span>新增参与用户数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.outPrizeNum}}</b>
          <span>出奖数量</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.joinUserNum}}</b>
          <span>累计参与人数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.countOutPrizeNum}}</b>
          <span>累计出奖数</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
        <li>
          <b>{{yesterday.registerJoinProportion}}</b>
          <span>注册转化比</span>
          <i>同比日</i>
          <i>同比周</i>
          <i>同比月</i>
        </li>
      </ul>
    </div>
    <div class="component">
      <div class="nav">
        <span v-for="(item,index) in navlist" :class="(index==flag)?'active':''" @click="selectnav(index)">{{item}}</span>
        <!-- <span>ugui</span> -->
      </div>
      <component :is="currentComp"></component>
    </div>
  </div>
</template>
<script>
//活动统计
import user from "./activitystatics/component/user.vue";
import region from "./activitystatics/component/region.vue";
import prize from "./activitystatics/component/prize.vue";
import Axios from 'axios';
export default {
  components: {
    user,
    region,
    prize
  },
  created(){
    Axios({
      url:"api/dataCenterManager/activityYeasterdayData",
      method:"get",

    }).then(data=>{
      console.log(data)
      if(data.data.code==0){
        this.yesterday = data.data.data;

      }
    })
  },
  data() {
    return {
      navlist:["参与用户统计","参与区域统计","奖项统计"],
      flag:"",
      currentComp: "user",
      yesterday:{}
    };
  },
  methods:{
    selectnav(i){
      this.flag=i;
      switch(i){
        case 0:{
          this.currentComp="user"
          break;
        }
        case 1:{
          this.currentComp="region"
          break;
        }
        case 2:{
          this.currentComp="prize"
          break;
        }
      }
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
  .component {
    width: 80%;
    height: auto;
    margin: 0 auto;
    .nav{
      height: 68px;
      line-height: 68px;
      font-size: 14px;
      span{
        
        padding: 0 12px 0;
      }
    }
  }
}
.active{
  color: #02a7f0;
}
</style>

