<template>
  <div class="container">
    <div class="createbatch" @click="createbatch">创建批次</div>
    <div class="search">
      <span>消费者活动</span>
      <select name="user">
        <option>负责人</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <span>渠道活动</span>
      <select name="userclass">
        <option>负责人</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <span>批次查询</span>
      <select name="userclass">
        <option>负责人</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
      <span>批次类型</span>
      <select name="userclass">
        <option>负责人</option>
        <option>机修工</option>
        <option>SA</option>
      </select>
    </div>
    <el-table
      :header-cell-style="{background:'#ccd1e0',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      
      stripe
    >
      <!-- stripe="true" -->
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="batchId" label="批次编号" width="188px"></el-table-column>
      <el-table-column prop="batchName" label="批次名称" width="158px"></el-table-column>
      <el-table-column prop="type" label="批次类型" width="100px">
        <template slot-scope="scope">{{scope.row.type==2?"双码":"单码"}}</template>
      </el-table-column>
      <el-table-column prop="count" label="批次数量"></el-table-column>
      <el-table-column prop="Occupy" label="占用"></el-table-column>
      <el-table-column prop="residueCount" label="未占用"></el-table-column>
      <el-table-column prop="consumeractivity" label="消费者活动"></el-table-column>
      <el-table-column prop="activity" label="渠道活动"></el-table-column>

      <el-table-column fixed="right" label="操作" width="300px">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="moreoperations(scope.row)">更多操作</el-button> -->
          <el-button type="text" size="small" @click="details(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
          <el-button type="text" size="small" @click="relation(scope.row)">关联</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="withdraw(scope.row)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block fr" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,  prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <!-- ----------二维码撤回 -->
    <div class="withdrawcanvaswrap" v-if="withdrawcanvas">
      <div class="withdrawcanvas">
        <div class="header">
          <span>撤回码</span>
        </div>
        <div class="withdrawnum">
          <b>撤回数量：</b>
          <input type="text" v-model="withdrawnum">
        </div>
        <div class="withdrawnumbtn">
          <span style="background:#1abc9c;border:none;color:#fff;" @click="withdrawok">确定</span>
          <span @click="exit">取消</span>
        </div>
      </div>
    </div>
    <!-- ----------二维码批次关联活动和商品 ---------------->
    <div class="relationcanvastwowrap" v-if="relationcanvas"></div>
    <div class="relationcanvastwo" v-if="relationcanvas">
      <img src="../../assets/no.png" @click="exit">
      <div class="relationSA" style="width:100%;">
        <div class="membershow">
          <span>批次编号：</span>
          <i>{{row.batchId}}</i>
          <span>批次名称：</span>
          <i>{{row.batchName}}</i>
        </div>
      </div>
      <div class="relationSA" v-for="(item,index) in memberrelationlist">
        <div class="membershow">
          <span>消费者活动：</span>
          <p>{{item.qrActivityName}}</p>
          <span>关联商品：</span>
          <p>{{item.productsName}}</p>
        </div>
        <div class="membershow">
          <span>可用数量：</span>
          <i>{{item.useCount}}</i>
        </div>
        <div class="membershow" style="margin-bottom:20px;">
          <span>请选择关联SA活动：</span>
          <select v-model="relationarr[index].activity" @change="aaa(index,item)">
            <option>--请选择--</option>
            <option
              v-for="(val,index) in SAactivityarr[item.productsId]"
              :value="val"
            >{{val.activityName}}</option>
          </select>
          <span>关联数量：</span>
          <input type="text" v-model="relationarr[index].joinCount">
          <span>个</span>
        </div>
        <button @click="subrelation(index)">确定关联</button>
        <hr>
      </div>
      <!-- 裸码关联 -->
      <div class="relationSA">
        <div class="membershow">
          <span style="padding:0px;">裸码关联</span>
        </div>
        <div class="membershow">
          <span>
            <i>*</i> 关联渠道活动：
          </span>
          <select name="active" v-model="SAactivity">
            <option v-for="(item,index) in SAactivitylist" :value="item">{{item.activityName}}</option>
          </select>
        </div>
        <div class="membershow">
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
            <option v-for="(item,index) in goodslist" :value="item">{{item.productSName}}</option>
          </select>
        </div>
        <div class="membershow">
          <span>可关联数量：</span>
          <i>{{residueCount}}</i>
        </div>
        <div class="membershow">
          <span>请输入关联数量：</span>
          <input type="text" v-model="residuenum">
        </div>
        <button @click="residueok">确认关联</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  created() {
    this.qrcodelist();
  },
  data() {
    return {
      //更多操作弹框
      moreoperationscanvas: false,
      //关联码弹窗
      relationcanvas: false,
      //操作当前行的数据
      row: {},
      tabledata: [],
      //关联批次的批次列表
      relationlist: [],
      //要关联的二维码批次的码的数量
      relationconten: "",
      //渠道活动列表
      SAactivitylist: [],
      //关联的渠道活动
      SAactivity: {},
      //商品三级分类列表
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
      timer: "",
      totalCount: 1,
      pagesize: 10,
      currentPage: 1,
      //撤回弹框
      withdrawcanvas: false,
      //撤回数量
      withdrawnum: "",
      //二维码关联的会员活动及商品列表
      memberrelationlist: [],
      productsIds: [],
      SAactivityarr: [],
      relationarr: [
        {
          productsId: "",
          activity: {},
          joinCount: "",

          productsName: ""
        }
      ],
      //裸码数量
      residueCount: "",
      //关联裸码数量
      residuenum: ""
    };
  },
  methods: {
    aaa(i, val) {
      // console.log(i);
      // console.log(val);
      this.relationarr[i].productsId = val.productsId;
      this.relationarr[i].productsName = val.productsName;

      // console.log(this.relationarr);
    },
    qrcodelist() {
      Axios({
        //url:"http://192.168.1.128:8101/codeManager/batchList",
        url: "qrcode/codeManager/batchList",
        method: "get",
        params: {
          pageNo: this.currentPage,
          batchCode: "",
          type: "",
          from: "2"
        }
      }).then(data => {
        // console.log(data);
        this.totalCount = data.data.data.batchPage.total;
        this.pagesize = data.data.data.batchPage.size;
        this.currentPage = data.data.data.batchPage.current;
        this.tabledata = data.data.data.batchPage.records;
      });
    },
    //创建批次
    createbatch() {
      this.$router.push({
        path: "/addqrcode"
      });
    },
    //更多操作
    // moreoperations(row) {
    //   console.log(row);
    //   this.moreoperationscanvas = true;
    //   this.row = row;
    // },
    details(row) {
      // console.log(1)
      if (row.type == 2) {
        //查看详情
        this.$router.push({
          path: "/doubledetails",
          query: { flag: "2", data: row }
        });
      } else {
        //单码
        this.$router.push({
          path: "/singledetails",
          query: { flag: "2", data: row }
        });
      }
    },
    //下载批次二维码图片
    download(row) {
      Axios({
        url: "qrcode/codeManager/batchDownloadFileToZIP",
        method: "get",
        params: {
          batchId: row.batchId
        }
      }).then(data => {
        // console.log(data);
        if (data.data.code == 0) {
          // console.log(row.batchId);
          this.timer = setInterval(() => {
            Axios({
              url: "qrcode/codeManager/validationZIP",
              method: "get",
              params: {
                batchId: row.batchId
              }
            }).then(res => {
              // console.log(res);
              if (res.data.code == 0) {
                //表示压缩包压缩完成 开始下载
                clearInterval(this.timer);

                window.location.href =
                  "qrcode/codeManager/downloadZIP?batchId=" + row.batchId;
              }
            });
          }, 3000);
        }
      });
    },
    con() {
      // console.log(1);
    },
    relation(row) {
      //关联
      this.row = row;
      this.relationcanvas = true;
      Axios({
        url: "qrcode/codeManager/beforeJoinActivity",
        method: "get",
        params: {
          batchId: row.batchId
        }
      }).then(data => {
        // console.log(data);
        this.memberrelationlist=[];
        this.memberrelationlist = data.data.data.list;
        this.residueCount = data.data.data.residueCount;
        // console.log(this.memberrelationlist);
        for (var i = 0; i < this.memberrelationlist.length; i++) {
          this.productsIds.push(this.memberrelationlist[i].productsId);
        }

        if (data.data.code == 0) {
          Axios({
            url: "api/activityManager/selectActivityByProductId",
            method: "get",
            params: {
              productsIds: this.productsIds.toString()
            }
          }).then(res => {
            // console.log(res);
            this.productsIds.length = 0;
            if (res.data.code == 0) {
              this.SAactivityarr = res.data.data;
              var count = Object.keys(this.SAactivityarr);
              this.relationarr.length = 0;
              for (var i = 0; i < count.length; i++) {
                this.relationarr.push({
                  productsId: "",
                  joinCount: "",
                  activity: {},
                  productsName: ""
                });
              }
            }
          });
        }
      });
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
      this.goodclasslist();
    },
    //获取三级分类列表
    goodclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
        // console.log(data);
        this.goodsclasslist = data.data.data.firstCatList;
      });
    },
    //选择三级分类后
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
    //选择商品之后
    selegood() {
       console.log(this.selectgood);
    },
    //确认关联

    subrelation(i) {
      // console.log(
      //   this.relationarr[i].productsId,
      //   this.relationarr[i].productsName
      // );
      Axios({
        url: "qrcode/codeManager/joinSAActivity",
        method: "get",
        params: {
          activityId: this.relationarr[i].activity.activityId,
          activityName: this.relationarr[i].activity.activityName,
          productsId: this.relationarr[i].productsId,
          productsName: this.relationarr[i].productsName,
          joinCount: this.relationarr[i].joinCount,
          batchId: this.row.batchId,
          type:"",
        }
      }).then(data => {
        // console.log(data);
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "关联成功!"
          });
          this.relationcanvas=false;
          this.relationarr.length = 0;
          // console.log(this.relationarr)
          
        }
      });
    },
    //确认关联裸码
    residueok() {
        console.log("SA活动id"+this.SAactivity.activityId,"SA活动name"+this.SAactivity.activityName,"商品id"+this.selectgood.productSId,"商品名称"+this.selectgood.productSName,"数量"+this.residuenum,this.row.batchId)
      Axios({
        url: "qrcode/codeManager/joinSAActivity",
        method: "get",
        params: {
          activityId: this.SAactivity.activityId,
          activityName: this.SAactivity.activityName,
          productsId: this.selectgood.productSId,
          productsName: this.selectgood.productSName,
          joinCount: this.residuenum,
          batchId: this.row.batchId,
          type:"1",
        }
      }).then(data => {
        // console.log(data);
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "关联成功!"
          });
          this.relationcanvas=false;
          
        }
        
      });
    },
    del(row) {
      //删除
      this.$confirm("此操作将永久删除该二维码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "qrcode/codeManager/delBatch",
            method: "get",
            params: {
              batchIds: row.batchId
            }
          }).then(data => {
            // console.log(data);
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.qrcodelist();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    withdraw(row) {
      //撤回
      this.row = row;
      this.withdrawcanvas = true;
    },
    //确认撤回
    withdrawok() {
      Axios({
        url: "qrcode/codeManager/recallCodeFromBatch",
        method: "get",
        params: {
          batchId: this.row.batchId,
          recallCount: this.withdrawnum,
          type:"1",
        }
      }).then(data=>{
        // console.log(data);
        if(data.data.code==0){
          this.withdrawnum="";
          this.withdrawcanvas = false;
        }
      });
    },
    
    exit() {
      this.relationcanvas = false;
      this.withdrawcanvas = false;
    },
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计关联数量";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (column.property === "num") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    //分页功能
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.qrcodelist();
    }
    // getTable(){

    // }
  }
};
//二维码列表
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .createbatch {
    width: 80px;
    height: 24px;

    font-size: 12px;
    text-align: center;
    border: 1px solid #797979;
    line-height: 24px;
    border-radius: 6px;
  }
  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    background: #f2f2f2;
    input {
      width: 212px;
      height: 34px;
      margin-left: 16px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #dfdfdf;
    }
    select {
      width: 150px;
      height: 34px;
      margin-left: 16px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    span {
      display: inline-block;

      text-align: center;
      line-height: 36px;
      font-size: 12px;
      margin-top: 18px;
      margin-left: 16px;
      border-radius: 4px;
    }
  }
  .relationcanvas {
    width: 832px;
    height: 100%;
    //height: 764px;
    position: absolute;
    left: 50%;
    top: 20px;
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
  .el-table {
    font-size: 12px;
  }
  .moreoperationscanvas {
    width: 124px;
    height: 195px;
    position: absolute;
    left: 960px;
    top: 152px;

    z-index: 999;
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
  .withdrawcanvaswrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(#fff, 0.6);
    z-index: 111;
    .withdrawcanvas {
      width: 828px;
      height: 260px;
      position: absolute;
      left: 50%;
      top: 100px;
      z-index: 111;
      background: #eee;
      margin-left: -414px;
      border: 1px solid #555;
      .header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #555;
        line-height: 60px;
        span {
          padding-left: 20px;
          font-size: 16px;
          font-weight: bold;
          color: #555;
        }
      }
      .withdrawnumbtn {
        width: 300px;
        height: 50px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -150px;
        display: flex;
        justify-content: space-around;
        span {
          display: block;
          width: 130px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          border: 1px solid #555;
          background: #fff;
          border-radius: 8px;
        }
      }
      .withdrawnum {
        width: 60%;
        height: 50px;
        margin: 20px auto;
        input {
          width: 400px;
          height: 43px;
          border-radius: 5px;
          border: 1px solid #555;
          text-align: center;
        }
      }
    }
  }
  .relationcanvastwowrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(#eee, 0.6);
    z-index: 110;
  }
  .relationcanvastwo {
    width: 64%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -35%;
    z-index: 111;
    border: 1px solid #555;
    img {
      position: absolute;
      right: 13px;
      top: 13px;
    }
    .relationSA {
      width: 90%;

      margin: 0 auto;
      .membershow {
        width: 100%;
        height: 44px;
        margin-top: 20px;
        color: #555;
        display: flex;
        align-items: center;

        span {
          padding-left: 16px;
          font-size: 16px;
          font-weight: bold;
        }
        i {
          color: goldenrod;
        }
        p {
          width: 100px;
          height: 34px;
          line-height: 34px;
          border: 1px solid #555;
          border-radius: 6px;
          text-align: center;
          margin-left: 14px;
        }
        select {
          width: 160px;
          height: 36px;
        }
        input {
          width: 90px;
          height: 30px;
        }
      }
      button {
        width: 100px;
        height: 36px;
        border: none;
        background: #1abc9c;
        margin-bottom: 20px;
        color: #fff;
        border-radius: 6px;
      }
    }
  }
}
</style>
