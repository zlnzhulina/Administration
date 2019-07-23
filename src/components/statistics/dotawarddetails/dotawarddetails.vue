<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >活动统计</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <h3>{{dotname}}  至 各个奖项出奖详情</h3>
    <div class="headertwo">
        <b>各奖项出奖详情</b>
        <a>导出</a>
    </div>
    <div class="content">
         <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        :header-cell-style="{background:'#aaa',height:'32',color:'#fff'}"
      >
        <el-table-column prop="prizename" label="奖品名称" width="175"></el-table-column>
        <el-table-column prop="prizetype" label="奖项类型" width="130"></el-table-column>
        <el-table-column prop="prize" label="价值" width="130"></el-table-column>
        <el-table-column prop="awardnum" label="出奖数量" width="150"></el-table-column>
        <el-table-column prop="receivenum" label="领取数量" width="150"></el-table-column>
        <el-table-column prop="proportion" label="占比" width="150"></el-table-column>
        <el-table-column prop="surplusnum" label="剩余数量" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
//服务站出奖详情
export default {
    created(){
        if(this.$route.query){
            this.dotname=this.$route.query.rowdata.dotname;
        }
    },
    data(){
        return{
            tableData:[
                {
                    prizename:"q",
                    prizetype:"2",
                    prize:"4",
                    awardnum:"f",
                    receivenum:"d",
                    proportion:" w",
                    surplusnum:"e"
                }
            ]
        }
    }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1120px;
  height: auto;
  padding-top: 60px;
  margin: 0 auto;
  h3{
      width: 100%;
      height: 64px;
      line-height: 64px;
    //   background: #ccc;

      font-size: 16px;
      margin: 60px auto;
      margin-bottom: 0;
  }
  .headertwo {
    width: 100%;
    height: 60px;
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
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
}
</style>
