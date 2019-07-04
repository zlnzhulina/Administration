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
        <select name="user" v-model="activityid">
          <option value>请选择活动</option>
          <option
            v-for="(item,index) in activitylist"
            :value="item.activityId"
          >{{item.activityName}}</option>
        </select>
        <span>条码状态：</span>
        <select v-model="SAcodetype">
          <option value="">请选择状态</option>
         <option value="1">未关联</option>
         <option value="2">已关联</option>
         <option value="5">已激活</option>
         <option value="3">已占用</option>
         <option value="4">已保护</option>
          
         
        </select>
        <span>小程序码状态：</span>
        <select v-model="usercodetype">
          <option value="">请选择状态</option>
          <option value="1">未关联</option>
          <option value="2">已关联</option>
          <option value="5">已激活</option>
          <option value="6">已查询</option>
        </select>
        <span>编号查询：</span>
        <input placeholder="请输入码的编号" v-model="codeid">
        <div class="all">
          <b>删除选中</b>
          <b>关联选中</b>
          <b>撤回选中</b>
        </div>
      </div>
      <div class="searchactivity">
        <span>商品：</span>
        <select name="userw" v-model="searchfirstlist">
          <option value="">请选择商品库</option>
          <option
            v-for="searchfirstitem in searchgoodsclasslist"
            :key="searchfirstitem.productCatId"
            :value="searchfirstitem"
          >{{searchfirstitem.productCatName}}</option>
        </select>
        <select name="userw" v-model="searchsecondlist">
          <option value="">请选择商品类型</option>
          <option
            v-for="searchseconditem in searchfirstlist.productCatList"
            :key="searchseconditem.productCatId"
            :value="searchseconditem"
          >{{searchseconditem.productCatName}}</option>
        </select>
        <select name="userw" v-model="searchthreelist" @change="searchselectthree()">
          <option value="">请选择商品品牌</option>
          <option
            v-for="searchthreeitem in searchsecondlist.productCatList"
            :key="searchthreeitem.productCatId"
            :value="searchthreeitem"
          >{{searchthreeitem.productCatName}}</option>
        </select>
        <!-- <select name="userw">
          <option>请选择商品系列</option>
          <option>机修工</option>
          <option>SA</option>
        </select>-->
        <select name="userw" v-model="productSId" @change="selegoodsearch">
          <option value="">请选择商品</option>
          <option
            v-for="goodsitem in searchgoodslist"
            :key="goodsitem.productSId"
            :value="goodsitem.productSId"
          >{{goodsitem.productSName}}</option>
        </select>
      </div>
    </div>

    <!-- 二维码列表 -->
    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px;"></el-table-column>
      <el-table-column prop="qrId" label="ID" width="154px"></el-table-column>
      <el-table-column prop="goodsname" label="批次名称" width="156">
        <template>{{batchName}}</template>
      </el-table-column>
      <el-table-column prop="type" label="批次类型" width="90">
        <template slot-scope="scope">{{scope.row.type==1?"单码":"双码"}}</template>
      </el-table-column>
      <el-table-column prop="qrActivityName" label="消费者活动" width="186">
        <template
          slot-scope="scope"
        >{{scope.row.qrActivityName==null?"未关联消费者活动":scope.row.qrActivityName}}</template>
      </el-table-column>
      <el-table-column prop="qrStatus" label="消费者状态" width="120">
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
      <el-table-column prop="barActivityName" label="渠道活动" width="186">
        <template
          slot-scope="scope"
        >{{scope.row.barActivityName==null?"未关联渠道活动":scope.row.barActivityName}}</template>
      </el-table-column>
      <el-table-column prop="barStatus" label="渠道状态" width="120">
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
      <el-table-column prop="productsName" label="关联商品" width="182">
        <template slot-scope="scope">{{scope.row.productsName==null?"未关联商品":scope.row.productsName}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260px">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="moreoperations(scope.row)">更多操作</el-button> -->
          <el-button type="text" size="small" @click="details(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
          <el-button type="text" size="small" @click="relation(scope.row)">关联</el-button>
          <el-button type="text" size="small">删除</el-button>
          <!--  @click="del(scope.row)" -->
          <el-button type="text" size="small" @click="withdraw(scope.row)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block fr" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <!-- 码详情弹窗 -->
    <div class="qrdetails" v-if="qrdetailscanvas">
      <div class="tab">
        <div class="header">
          <span>码详情</span>
          <img @click="exit" src="../../../assets/no.png">
        </div>
        <ul>
          <li><div style="width:128px; border:1px solid #555;">消费者码</div><div style="width:128px;border:1px solid #555;">扫码时间</div><div style="width:128px;border:1px solid #555;">用户姓名</div><div style="width:128px;border:1px solid #555;">用户账号</div><div style="width:53px;border:1px solid #555;">区域</div><div style="width:128px;border:1px solid #555;">奖项</div><div style="width:53px;border:1px solid #555;">状态</div></li>
          <li style="background:#eee;"><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:53px;"></div><div style="width:128px;"></div><div style="width:53px;"></div></li>
        </ul>
        <ul>
          <li><div style="width:128px; border:1px solid #555;">渠道码</div><div style="width:128px;border:1px solid #555;">扫码时间</div><div style="width:128px;border:1px solid #555;">用户姓名</div><div style="width:128px;border:1px solid #555;">用户账号</div><div style="width:53px;border:1px solid #555;">区域</div><div style="width:128px;border:1px solid #555;">奖项</div><div style="width:53px;border:1px solid #555;">状态</div></li>
          <li style="background:#eee;"><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:128px;"></div><div style="width:53px;"></div><div style="width:128px;"></div><div style="width:53px;"></div></li>
        </ul>
      </div>
    </div>
    <!-- 关联码弹窗 -->
    <div class="relationcanvas" v-if="relationcanvas">
      <div class="scroll">
        <h3>
          <span>关联</span>
          <img src="../../../assets/no.png" @click="exit">
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
          <span
            style="width:404px;margin-left:20px;text-align:center;"
            v-show="row.qrActivityId==null?true:false"
          >未关联消费者活动</span>
          <span
            v-show="row.qrActivityId"
            style="display:inline-block;background:#1abc9c;color:#fff;height:30px;text-align:center;line-height:30px;width:auto;padding:0 15px 0;"
          >{{row.qrActivityName}}</span>
          <span>关联商品：</span>
          <!-- 如果商品已关联 显示关联的商品 -->
          <span
            v-show="row.productsId==null?false:true"
            style="display:inline-block;background:#1abc9c;color:#fff;height:30px;text-align:center;line-height:30px;width:auto;padding:0 15px 0;"
          >{{row.productsName}}</span>
          <select name="useractive" v-model="firstlist" v-show="row.productsId==null?true:false">
            <option
              v-for="(firstlist,index) in goodsclasslist"
              :value="firstlist"
            >{{firstlist.productCatName}}</option>
          </select>
          <span v-show="row.productsId==null?true:false"></span>
          <select name="useractive" v-model="secondlist" v-show="row.productsId==null?true:false">
            <option
              v-for="(secondlist,index) in firstlist.productCatList"
              :value="secondlist"
            >{{secondlist.productCatName}}</option>
          </select>
          <span v-show="row.productsId==null?true:false"></span>
          <select
            name="useractive"
            v-model="threelist"
            @change="selectthree"
            v-show="row.productsId==null?true:false"
          >
            <option
              v-for="(threelist,index) in secondlist.productCatList"
              :value="threelist"
            >{{threelist.productCatName}}</option>
          </select>
          <!--     选择商品       -->
          <span v-show="row.productsId==null?true:false"></span>
          <select
            name="useractive"
            v-model="selectgood"
            @change="selegood"
            v-show="row.productsId==null?true:false"
          >
            <option v-for="(item,index) in goodslist" :value="item">{{item.productSName}}</option>
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
      //查询
      //二维码id
      codeid: "",
      //商品id
      productSId: "",
      //渠道活动id
      activityid: "",
      //SA码状态
      SAcodetype:"",
      //小程序码状态
      usercodetype:"",
      barActivityId: "",
      //活动列表
      activitylist: "",
      row: {},
       searchgoodsclasslist: [],
      //一级分类列表
      searchfirstlist: [],
      //二级分类列表
      searchsecondlist: [],
      //三级分类列表
      searchthreelist: [],
      //商品列表
      searchgoodslist: [],
      //渠道活动列表
      SAactivitylist: [],
      //
      SAactivity: [],
      //三级分类列表
      goodsclasslist: [],
      //一级分类列表
      firstlist: [],
      //二级分类列表
      secondlist: [],
      //三级分类列表
      threelist: [],
      //商品列表
      goodslist: [],
      //选择商品
      selectgood: {},
      //码详情
      qrdetailscanvas: false,
      totalCount: 1,
      pagesize: 10,
      currentPage: 1
    };
  },
  created() {
    // console.log(this.$route.query);
    this.batchId = this.$route.query.data.batchId;
    this.batchName = this.$route.query.data.batchName;
    this.detailslist();
    this.classlist();
    this.barActivitylist();
  },
  methods: {
    //详情列表
    detailslist() {
      Axios({
        url: "qrcode/codeManager/batchDetail",
        method: "get",
        params: {
          batchId: this.batchId,
          pageNo: this.currentPage,
          barActivityId: this.activityid,
          qrStatus:this.usercodetype,
          barStatus: this.SAcodetype,
          qrId: this.codeid,
          productSId: this.productSId,
        }
      }).then(data => {
        // console.log(data);
        this.totalCount = data.data.data.codePage.total;
        this.pagesize = data.data.data.codePage.size;
        this.currentPage = data.data.data.codePage.current;
        this.tabledata = data.data.data.codePage.records;
        // for (var i = 0; i < this.tabledata.length; i++) {
        //   this.barStatuslist.push()
        // }
      });
    },
    //商品分类列表
    classlist() {
      Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
        //  console.log(data);
        this.searchgoodsclasslist = data.data.data.firstCatList;
      });
    },
    //活动列表
    barActivitylist() {
      Axios({
        url: "api/activityManager/activityList",
        method: "get",
        params: {
          pageNo: "1",
          pageSize: ""
        }
      }).then(data => {
        // console.log(data);
        this.activitylist = data.data.data.activityPage.records;
      });
    },

    back() {
      this.$router.back();
    },
    //跟多操作
    // moreoperations(row) {
    //   this.moreoperationscanvas = true;
    //   this.row = row;
    //   console.log(row);
    // },
    details(row) {
      //查看详情
      this.qrdetailscanvas = true;
    },
    //下载单码
    download(row) {},
    relation(row) {
      // console.log(row);
      this.row = row;
      //关联
      // this.relationcanvas = true;

      if (row.barActivityId !== null && row.productsId !== null) {
        this.$message({
          type: "warning",
          message: "此码已关联!"
        });
        this.relationcanvas = false;
      } else if (row.productsId !== null && row.barActivityId == null) {
        //说明关联商品但并未关联SA活动
        //获取活动列表
        this.relationcanvas = true;
        Axios({
          url: "api/activityManager/activityList",
          method: "get",
          params: {
            pageNo: "1"
          }
        }).then(data => {
          // console.log(data);
          this.SAactivitylist = data.data.data.activityPage.records;
        });
      } else {
        //未关联商品和SA活动
        this.relationcanvas = true;
        Axios({
          url: "api/activityManager/activityList",
          method: "get",
          params: {
            pageNo: "1"
          }
        }).then(data => {
          // console.log(data);
          this.SAactivitylist = data.data.data.activityPage.records;
        });
        Axios({
          url: "api/productsManager/productCatList",
          methods: "get"
        }).then(data => {
          // console.log(data);
          this.goodsclasslist = data.data.data.firstCatList;
        });
      }

      //获取商品三级列表
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
        // console.log(data);
        this.goodslist = data.data.data.productList;
      });
    },
    searchselectthree(){
      // console.log(this.searchgoodsclasslist)
       Axios({
        url: "api/productsManager/getProductsForCatId",
        method: "get",
        params: {
          productCatId: this.searchthreelist.productCatId
        }
      }).then(data => {
        // console.log(data);
        this.searchgoodslist = data.data.data.productList;
      });
    },
    selegoodsearch(val) {
      // console.log(val);
     this.detailslist();
    },
    //选择商品之后
    selegood() {
      // console.log(this.selectgood);
    },
    //提交关联
    subrelation() {
      // console.log(this.row.qrId);
      // console.log(this.SAactivity);
      // console.log(this.selectgood);
      Axios({
        url: "qrcode/codeManager/joinActivity",
        method: "get",
        params: {
          qrIds: this.row.qrId,
          activityId: this.SAactivity.activityId,
          activityName: this.SAactivity.activityName,
          productsId:
            this.row.productsId == null
              ? this.selectgood.productSId
              : this.row.productsId,
          productsName:
            this.row.productsName == null
              ? this.selectgood.productSName
              : this.row.productsName
        }
      }).then(data => {
        // console.log(data);
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "关联成功!"
          });
          this.detailslist();
        } else {
          this.$message({
            type: "error",
            message: "关联失败，请重新尝试!"
          });
        }
        this.relationcanvas = false;
        this.SAactivitylist = [];
        this.goodsclasslist = [];
        this.goodslist = [];
        this.SAactivity = [];
        this.firstlist = [];
        this.secondlist = [];
        this.threelist = [];
      });
    },
    exit() {
      this.relationcanvas = false;
      this.qrdetailscanvas = false;
      this.SAactivitylist = [];
      this.goodsclasslist = [];
      this.goodslist = [];
      this.SAactivity = [];
      this.firstlist = [];
      this.secondlist = [];
      this.threelist = [];
      var aaa = {};
      this.row = aaa;
    },
    del() {
      //删除
    },
    //撤回码
    withdraw(row) {
      //撤回
      Axios({
        url: "qrcode/codeManager/recallCode",
        method: "get",
        params: {
          qrIds: row.qrId
        }
      }).then(data => {
        // console.log(data);
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "撤回成功！"
          });
          this.detailslist();
        }else{
          this.$message({
            type: "error",
            message: "撤回失败！"
          });
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.detailslist();
    }
  },
  watch: {
    codeid(val) {
      this.detailslist();
    },
    activityid(val){
      this.detailslist();
    },
    SAcodetype(val){
      this.detailslist();

    },
    usercodetype(val){
      this.detailslist();
    },
    productSId(val){
      this.detailslist();

    }

  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 90%;
  margin: 0 auto;
  padding-top: 60px;
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
      .all {
        float: right;
        margin-right: 13px;
        height: 72px;
        line-height: 54px;
        vertical-align: middle;
        b {
          display: inline-block;
          height: 30px;
          padding: 0 15px 0;
          background: darkcyan;
          color: #fff;
          text-align: center;
          line-height: 30px;
          margin-right: 15px;
        }
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
  .qrdetails {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(167, 165, 165, 0.6);
    z-index: 11;
    .tab {
      width: 830px;
      height: 336px;
      position: absolute;
      left: 50%;
      top: 220px;
      margin-left: -415px;
      background: #fff;
      z-index: 12;
      .header {
        width: 100%;
        height: 58px;
        border-bottom: 1px solid #555;
        background: #eee;
        line-height: 58px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        span {
          padding-left: 13px;
        }
      }
      img {
        float: right;
        margin-right: 13px;
        margin-top: 15px;
      }
      ul{
        width: 760px;
        height: 80px;
        margin: 20px auto;
        li{
          width: 100%;
          list-style: none;
          height: 40px;
          display: flex;
          div{
            height: 38px;
            text-align: center;
            line-height: 38px;
          }
        }
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
