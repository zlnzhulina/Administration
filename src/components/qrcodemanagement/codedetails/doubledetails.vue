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
        <input placeholder="请输入码的编号"/>
        
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
      <el-table-column prop="goodsid" label="ID" width="104px"></el-table-column>
      <el-table-column prop="goodsname" label="批次名称" width="156"></el-table-column>
      <el-table-column prop="goodsclass" label="批次类型" width="76"></el-table-column>
      <el-table-column prop="data" label="消费者活动" width="146"></el-table-column>
      <el-table-column prop="data" label="消费者状态" width="90"></el-table-column>
      <el-table-column prop="data" label="IMG"></el-table-column>
      <el-table-column prop="data" label="渠道活动" width="146"></el-table-column>
<el-table-column prop="data" label="渠道状态" width="90"></el-table-column>
<el-table-column prop="data" label="IMG"></el-table-column>
<el-table-column prop="data" label="关联商品" width="142"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="moreoperations(scope.row)">更多操作</el-button>
          <!-- <el-button type="text" size="small" @click="edit(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
          <el-button type="text" size="small" @click="relation(scope.row)">关联</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="withdraw(scope.$index,scope.row)">撤回</el-button> -->
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


    <div class="relationcanvas" v-if="relationcanvas">
      <div class="scroll">
        <h3>
          <span>关联</span>
          <img src="@/assets/no.png" @click="exit">
        </h3>
        <div class="main">
          <span>关联数量：</span>
          <input type="text"/>
          <span>
            <i>*</i>关联渠道活动：
          </span>
          <select name="active">
            <option></option>
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
          <select name="useractive">
            <option></option>
          </select>
          <span></span>
          <select name="useractive">
            <option></option>
          </select>
          <span></span>
          <select name="useractive">
            <option></option>
          </select>
          <span></span>
          <select name="useractive">
            <option></option>
          </select>
          <div style="width:152px;height:36px;margin:0px auto;clear:both;padding-top:45px;">
            <span style="width:152px;height:50px;background:#1abc9c;text-align:center;line-height:50px;margin:30px auto;clear:both;">确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//双码详情
export default {
  data() {
    return {
      //更多操作弹框
      moreoperationscanvas:false,
        relationcanvas:false,
        tabledata: [
        {
          batchname: "wefw",
          batchid: "834576356",
          batchclass: "adf",
          batchnum: "2361",
          Occupy: "8068",
          Unoccupied: "5454",
          consumeractivity: "扫码领红包",
          activity: "扫码领红包"
        },
        {
          batchname: "wefw",
          batchid: "834576356",
          batchclass: "adf",
          batchnum: "2361",
          Occupy: "8068",
          Unoccupied: "5454",
          consumeractivity: "扫码领红包",
          activity: "扫码领红包"
        },
        {
          batchname: "wefw",
          batchid: "834576356",
          batchclass: "adf",
          batchnum: "2361",
          Occupy: "8068",
          Unoccupied: "5454",
          consumeractivity: "扫码领红包",
          activity: "扫码领红包"
        },
        {
          batchname: "wefw",
          batchid: "834576356",
          batchclass: "adf",
          batchnum: "2361",
          Occupy: "8068",
          Unoccupied: "5454",
          consumeractivity: "扫码领红包",
          activity: "扫码领红包"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    //跟多操作
    moreoperations(row){
      this.moreoperationscanvas=true;
    },
     details(){
      //查看详情
      // this.$router.push({
      //   path:"/doubledetails"
      // })
    },
    download(){
      //下载
    },
    relation(){
      //关联
      this.relationcanvas=true;
    
    },
    exit(){
        this.relationcanvas=false;
    },
    del(){
      //删除
    },
    withdraw(){
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
        padding-left:24px;
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
  .el-table td, .el-table th{
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
       input{
           width: 404px;
          height: 38px;
          float: left;
          margin-left: 20px;
          margin-top: 13px;
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
  .moreoperationscanvas{
    width: 124px;
    height: 195px;
    position: absolute;
    left: 1434px;
    top: 405px;
    ul{
      width: 100%;
      height: 100%;
      li{
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
