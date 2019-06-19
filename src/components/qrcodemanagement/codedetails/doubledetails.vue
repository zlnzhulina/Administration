<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >批次详情</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <div class="search">
      <div class="title">
        <b>筛选查询</b>
      </div>
      <div class="searchactivity">
        <span>活动：</span>
        <select name="user">
          <option>请选择活动</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <span>条码状态：</span>
        <select name="user">
          <option>请选择状态</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <span>小程序码状态：</span>
        <select name="user">
          <option>请选择状态</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <span>编号查询：</span>
        <input placeholder="请输入码的编号">
      </div>
      <div class="searchactivity">
        <span>商品：</span>
        <select name="userw">
          <option>请选择商品库</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <select name="userw">
          <option>请选择商品类型</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <select name="userw">
          <option>请选择商品品牌</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <select name="userw">
          <option>请选择商品系列</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
        <select name="userw">
          <option>请选择商品</option>
          <option>机修工</option>
          <option>SA</option>
        </select>
      </div>
    </div>

    <!-- 二维码列表 -->
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px;"></el-table-column>
      <el-table-column prop="qrId" label="ID" width="104px"></el-table-column>
      <el-table-column prop="goodsname" label="批次名称" width="156">
        <template>{{batchName}}</template>
      </el-table-column>
      <el-table-column prop="type" label="批次类型" width="76">
        <template slot-scope="scope">{{scope.row.type==1?"单码":"双码"}}</template>
      </el-table-column>
      <el-table-column prop="barActivityName" label="消费者活动" width="146">
        <template
          slot-scope="scope"
        >{{scope.row.barActivityName==null?"未关联消费者活动":scope.row.barActivityName}}</template>
      </el-table-column>
      <el-table-column prop="qrStatus" label="消费者状态" width="90">
        <template slot-scope="scope">
          {{scope.row.qrStatus==1?"未关联":""}}
          {{scope.row.qrStatus==2?"已关联":""}}
          {{scope.row.qrStatus==5?"已激活":""}}
          {{scope.row.qrStatus==6?"已查询":""}}
        </template>
      </el-table-column>
      <el-table-column prop="qrCodeUrl" label="IMG">
        <template slot-scoped="scoped">
          <img src="scoped.row.qrCodeUrl">
        </template>
      </el-table-column>
      <el-table-column prop="barActivityName" label="渠道活动" width="146">
        <template slot-scope="scope">{{scope.row.barActivityName==null?"未关联渠道活动":scope.row.barActivityName}}</template>
      </el-table-column>
      <el-table-column prop="barStatus" label="渠道状态" width="90">
        <template slot-scope="scope">
          {{scope.row.barStatus==1?"未关联":""}}
          {{scope.row.barStatus==2?"已关联":""}}
          {{scope.row.barStatus==5?"已激活":""}}
          {{scope.row.barStatus==3?"已占用":""}}
          {{scope.row.barStatus==4?"已保护":""}}
        </template>
      </el-table-column>
      <el-table-column prop="barCodeUrl" label="IMG">
        <template slot-scoped="scope">
          <img src="scope.row.barCodeUrl">
        </template>
      </el-table-column>
      <el-table-column prop="productsName" label="关联商品" width="142">
        <template slot-scope="scope">
          {{scope.row.productsName?scope.row.productsName:"未关联商品"}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="moreoperations(scope.row)">更多操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="moreoperationscanvas" v-show="moreoperationscanvas">
      <ul>
        <li @click="details">详情</li>
        <li @click="download">下载</li>
        <li @click="relation">关联</li>
        <li @click="del">删除</li>
        <li @click="withdraw">撤回</li>
      </ul>
    </div>
    <!-- 码详情弹窗 -->
    <div class="qrdetails" v-if="qrdetailscanvas">
      <div class="tab">
        <div class="header"><span>码详情</span><img @click="exit" src="@/assets/no.png"/></div>
      </div>
    </div>
<!-- 关联码弹窗 -->
    <div class="relationcanvas" v-if="relationcanvas">
      <div class="scroll">
        <h3>
          <span>关联</span>
          <img src="@/assets/no.png" @click="exit">
        </h3>
        <div class="main">
          <span>关联数量：</span>
          <input type="text" readonly="readonly" value="1">
          <span>
            <i>*</i>关联渠道活动：
          </span>
          <select name="active" v-model="SAactivity">
            <option v-for="(item,index) in SAactivitylist" :value="item">{{item.activityName}}</option>
          </select>
          <span>已关联消费者活动：</span>
          <select name="useractive">
            <option></option>
          </select>
          <span></span>
          <select name="useractive">
            <option></option>
          </select>
          <span>关联商品：</span>
          <select name="useractive" v-model="firstlist">
            <option
              v-for="(firstlist,index) in goodsclasslist"
              :value="firstlist"
            >{{firstlist.productCatName}}</option>
          </select>
          <span></span>
          <select name="useractive" v-model="secondlist">
            <option
              v-for="(secondlist,index) in firstlist.productCatList"
              :value="secondlist"
            >{{secondlist.productCatName}}</option>
          </select>
          <span></span>
          <select name="useractive" v-model="threelist" @change="selectthree">
            <option
              v-for="(threelist,index) in secondlist.productCatList"
              :value="threelist"
            >{{threelist.productCatName}}</option>
          </select>
          <!--     选择商品       -->
          <span></span>
          <select name="useractive" v-model="selectgood" @change="selegood">
            <option v-for="(item,index) in goodslist" :value="item" >{{item.productSName}}</option>
          </select>
          <div style="width:152px;height:36px;margin:0px auto;clear:both;padding-top:45px;">
            <span
              style="width:152px;height:50px;background:#1abc9c;text-align:center;line-height:50px;margin:30px auto;clear:both;"
              @click="subrelation"
            >确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
//双码详情

export default {
  data() {
    return {
      batchId: "",
      //更多操作弹框
      moreoperationscanvas: false,
      relationcanvas: false,
      tabledata: [
        //
      ],
      row:{},
      //渠道活动列表
      SAactivitylist:[],
      //
      SAactivity:[],
      //三级分类列表
      goodsclasslist:[],
      //一级分类列表
      firstlist: [],
      //二级分类列表
      secondlist: [],
      //三级分类列表
      threelist: [],
      //商品列表
      goodslist: [],
      //选择商品
      selectgood:{},
      //码详情
      qrdetailscanvas:false,
    };
  },
  created() {
    console.log(this.$route.query);
    this.batchId = this.$route.query.data.batchId;
    this.batchName = this.$route.query.data.batchName;
    this.detailslist();
  },
  methods: {
    //详情列表
    detailslist() {
      Axios({
        url: "api/qrcode/codeManager/batchDetail",
        method: "get",
        params: {
          batchId: this.batchId,
          pageNo: "1",
          barActivityId: "",
          qrStatus: "",
          barStatus: "",
          qrId: "",
          productSId: ""
        }
      }).then(data => {
        console.log(data);
        this.tabledata = data.data.data.codePage.records;
      });
    },
    back() {
      this.$router.back();
    },
    //跟多操作
    moreoperations(row) {
      this.moreoperationscanvas = true;
      this.row=row;
       console.log(row)
    },
    details() {
      //查看详情
      this.qrdetailscanvas=true;
    },
    download() {
      //下载
    },
    relation() {
      //关联
      this.relationcanvas = true;
      //获取活动列表
       Axios({
        url: "api/activityManager/activityList",
        method: "get",
        params: {
          pageNo: "1"
        }
      }).then(data => {
        console.log(data);
        this.SAactivitylist = data.data.data.activityPage.records;
      });
      //获取商品三级列表
       Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
         console.log(data);
        this.goodsclasslist = data.data.data.firstCatList;
      });
    },
    //选择三级列表后获取商品列表
    selectthree() {
      Axios({
        url: "api/productsManager/getProductsForCatId",
        method: "get",
        params: {
          productCatId: this.threelist.productCatId
        }
      }).then(data => {
        console.log(data)
        this.goodslist = data.data.data.productList;
      });
    },
    //选择商品之后
    selegood(){
      console.log(this.selectgood)
    },
    //提交关联
    subrelation(){
       console.log(this.row.qrId)
       console.log(this.SAactivity)
       console.log(this.selectgood)
      Axios({
        url:"api/qrcode/codeManager/joinActivity",
        method:"get",
        params:{
          qrIds:this.row.qrId,
          activityId:this.SAactivity.activityId,
          activityName:this.SAactivity.activityName,
          productsId:this.selectgood.productSId,
          productsName:this.selectgood.productSName,
        }
      }).then(data=>{
        console.log(data);
        if(data.data.code==0){
           this.$message({
                type: "success",
                message: "关联成功!"
              });
              
        }
      })
    },
    exit() {
      this.relationcanvas = false;
      this.qrdetailscanvas=false;
    },
    del() {
      //删除
    },
    withdraw() {
      //撤回
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  margin: 0 auto;
  padding-top: 90px;
  .header {
    width: 100%;
    height: 62px;
  }
  .search {
    width: 100%;
    height: 206px;
    .title {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #f3f3f3;
      b {
        margin-left: 14px;
        font-size: 18px;
      }
    }
    .searchactivity {
      width: 100%;
      height: 72px;
      span {
        padding-left: 24px;
        height: 43px;
        display: inline-block;
        line-height: 43px;
        font-size: 18px;
        color: #7f7f7f;
      }
      input {
        width: 170px;
        height: 34px;

        background: #f2f2f2;
        border: 1px solid #dfdfdf;
        text-align: center;
        font-size: 12px;
      }
      select {
        width: 150px;
        height: 34px;

        background: #fff;
        border: 1px solid #dfdfdf;
        text-align: center;
        font-size: 12px;
        color: #555;
      }
    }
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }
  .relationcanvas {
    width: 832px;
    height: auto;
    //height: 764px;
    position: absolute;
    left: 50%;
    top: 136px;
    margin-left: -416px;
    border: 1px solid #555;
    background: #fff;
    z-index: 999;
    overflow-y: auto;
    .scroll {
      width: 100%;
      height: auto;

      h3 {
        width: 100%;
        height: 60px;
        background: #f2f2f2;
        span {
          display: inline-block;
          height: 100%;
          line-height: 60px;
          font-size: 18px;
          padding-left: 13px;
        }
        img {
          width: 16px;
          float: right;
          margin-top: 19px;
          margin-right: 13px;
        }
      }
      .main {
        width: 688px;
        margin: 10px auto;
        span {
          display: inline-block;
          width: 184px;
          float: left;
          font-size: 16px;
          color: #9d9d9d;
          text-align: right;
          margin-top: 16px;
          font-weight: bold;
        }
        input {
          width: 404px;
          height: 38px;
          float: left;
          margin-left: 20px;
          margin-top: 13px;
          background: #ddd;
          border: 1px solid #666;
        }
        select {
          width: 404px;
          height: 38px;
          float: left;
          margin-left: 20px;
          margin-top: 13px;
        }
      }
    }
  }
  .qrdetails{
    width: 100%;
    height:100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(167, 165, 165, 0.6);
    z-index: 11;
    .tab{
      width: 830px;
      height: 336px;
      position: absolute;
      left: 50%;
      top: 220px;
      margin-left: -415px;
      background: #fff;
      z-index: 12;
      .header{
        width: 100%;
        height: 58px;
        border-bottom: 1px solid #555;
        background: #eee;
        line-height: 58px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        span{
          padding-left: 13px;
        }
      }
      img{
        float: right;
        margin-right: 13px;
        margin-top: 15px;
      }
    }
  }
  .moreoperationscanvas {
    width: 124px;
    height: 195px;
    position: absolute;
    left: 1434px;
    top: 405px;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 29px;
        line-height: 29px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #ccc;
        list-style: none;
      }
    }
  }

  .el-table {
    font-size: 12px;
  }
}
</style>
