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

    <!-- ----------二维码批次关联活动和商品 ---------------->
    <div class="relationcanvas" v-if="relationcanvas">
      <div class="scroll">
        <h3>
          <span>关联</span>
          <img src="@/assets/no.png" @click="exit">
        </h3>
        <div class="main">
          <span>关联数量：</span>
          <el-table
            ref="multipleTable"
            :header-cell-style="{background:'#eaedf1',height:'32',}"
            :data="relationlist"
            tooltip-effect="dark"
            :summary-method="getTotal"
            style="width:404px;float:left;margin-left:20px;"
          >
            <el-table-column prop="batchId" label="批次编号" width="92"></el-table-column>
            <el-table-column prop="batchName" label="批次名称" width="130"></el-table-column>
            <el-table-column prop="residueCount" label="可用数量"></el-table-column>
            <el-table-column prop="batchnum" label="关联数量">
              <template>
                <input
                  type="text"
                  style="width:50px;height:25px;font-size:12px;"
                  v-model="relationconten"
                >
              </template>
            </el-table-column>
          </el-table>
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
    <div class="withdrawcanvaswrap" v-if="withdrawcanvas">
      <div class="withdrawcanvas">
        <div class="header">
          <span>撤回码</span>
        </div>
        <div class="withdrawnum">
          <b>撤回数量：</b><input type="text" v-model="withdrawnum"/>
        </div>
        <div class="withdrawnumbtn"><span style="background:#1abc9c;border:none;color:#fff;" @click="withdrawok">确定</span><span @click="exit">取消</span>
        </div>
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
      pagesize: "10",
      currentPage: 1,
      //撤回弹框
      withdrawcanvas: false,
      //撤回数量
      withdrawnum:"",
    };
  },
  methods: {
    qrcodelist() {
      Axios({
        //url:"http://192.168.1.128:8101/codeManager/batchList",
        url: "api/qrcode/codeManager/batchList",
        method: "get",
        params: {
          pageNo: this.currentPage,
          batchCode: "",
          type: ""
        }
      }).then(data => {
        console.log(data);
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
        url: "api/qrcode/codeManager/batchDownloadFileToZIP",
        method: "get",
        params: {
          batchId: row.batchId
        }
      }).then(data => {
        console.log(data);
        if (data.data.code == 0) {
          console.log(row.batchId);
          this.timer = setInterval(() => {
            Axios({
              url: "api/qrcode/codeManager/validationZIP",
              method: "get",
              params: {
                batchId: row.batchId
              }
            }).then(res => {
              console.log(res);
              if (res.data.code == 0) {
                //表示压缩包压缩完成 开始下载
                clearInterval(this.timer);

                window.location.href =
                  "api/qrcode/codeManager/downloadZIP?batchId=" +
                  this.row.batchId;
              }
            });
          }, 3000);
        }
      });
    },
    con() {
      console.log(1);
    },
    relation(row) {
      //关联
      this.row = row;
      this.relationcanvas = true;
      this.relationlist.push(row);
      console.log(this.relationlist);
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
      this.goodclasslist();
    },
    //获取三级分类列表
    goodclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
        console.log(data);
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
        console.log(data);
        this.goodslist = data.data.data.productList;
      });
    },
    //选择商品之后
    selegood() {
      console.log(this.selectgood);
    },
    //确认关联
    subrelation() {
      Axios({
        url: "api/qrcode/codeManager/joinActivityFromBatch",
        method: "post",
        data: {
          batchList: [
            {
              batchId: this.row.batchId,
              joinCount: this.relationconten
            }
          ],
          activityId: this.SAactivity.activityId,
          activityName: this.SAactivity.activityName,
          productsId: this.selectgood.productCatId,
          productsName: this.selectgood.productSName
        }
      }).then(data => {
        console.log(data);
        if (data.data.code == 0) {
          this.$message({
            type: "success",
            message: "关联成功!"
          });
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
            url: "api/qrcode/codeManager/delBatch",
            method: "get",
            params: {
              batchIds: row.batchId
            }
          }).then(data => {
            console.log(data);
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
    withdrawok(){
      Axios({
        url:"api/qrcode/codeManager/recallCodeFromBatch",
        method:"get",
        params:{
          batchId:this.row.batchId,
          recallCount:this.withdrawnum,
        }
      })
    },
    exit() {
      this.relationcanvas = false;
      this.withdrawcanvas=false;
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
      console.log(val);
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
    background: rgba(#fff, .6);
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
      .withdrawnumbtn{
        width: 300px;
        height: 50px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -150px;
        display: flex;
        justify-content: space-around;
        span{
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
      .withdrawnum{
        width: 60%;
        height: 50px;
        margin: 20px auto;
        input{
          width: 400px;
          height: 43px;
          border-radius: 5px;
          border: 1px solid #555;
          text-align: center;

        }

      }
    }
  }
}
</style>
