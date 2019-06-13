<template>
  <el-container>
    <el-aside width="200px">
      <div class="twomenu" v-for="(item,index) in twomenu">
        <h3>{{item.title}}</h3>
        <h6 v-for="(itemtwo,index) in item.threemenu" v-on:click="getheader(itemtwo)"><router-link :to="itemtwo.navto">{{itemtwo.title}}</router-link></h6>
      </div>
    </el-aside>
    <el-container>
      <el-header style="height:49px;color:#fff;">{{itemtwo.title}}</el-header>
      <el-main class="content">
         <router-view></router-view>
        <!-- <yglist-com v-if="false"></yglist-com>
        <prizelist-com v-if="false"></prizelist-com>
        <activitylist-com></activitylist-com> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import yglist from "../systemmanagement/ygmanagement/yglist"; 
// import prizelist from "../operatemanagement/prizemanagement/prizelist";
// import activitylist from "../operatemanagement/activitymanagement/activitylist"
export default {
  props: {
        twomenu: Array
    },
  created(){
    this.itemtwo=this.twomenu[0].threemenu[0];
  },
  data() {
    return {
      itemtwo:{
        title:"",
        navto:""
      }
    };
  },
  methods:{
   getheader:function(val){
     this.itemtwo=val; 
   }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 1200px;
  height: 722px;
  .el-aside {
    height: 722px;
    background: #7a8899;
    .twomenu {
      color: #fff;
      h3 {
        width: 180px;
        height: 36px;
        line-height: 36px;
        margin: 12px auto;
        font-size: 16px;
        border-bottom: 1px solid #adadad;
        padding-left: 8px;
      }
      h6 {
        width: 160px;
        height: 34px;
        margin-left: 30px;
        font-size: 13px;
        font-weight: normal;
        a{
          display: block;
          width: 100%;
          height: 100%;
          line-height: 34px;
        text-align: center;
        color: #fff;
        }
        .router-link-active{
          background-color: rgba(255, 255, 255, .8);
          color:#000;
          font-weight: bolder;
        font-size: 15px;
        }
      }
      h6:hover {
        font-weight: bolder;
        font-size: 15px;
        background:rgba($color: #adadad, $alpha: .3);
      }
    }
  }
  .is-vertical {
    width: 1000px;
    .el-header {
      width: 1000px;
      height: 60px;
    }
  }
  .el-header {
    // width: 982px;
    // height: 49px;
     line-height: 50px;
    font-size: 18px;
    color: black;
    font-weight: bold;
    background: #7a8899;
    margin-bottom: 15px;
  }
  .el-main{
    overflow: visible;
  }
  .content{
      padding-top: 0;
  }
}
</style>
