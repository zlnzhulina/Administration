<template>
  <div class="wrap">
    <h3>
      <span>网点用户详情>经销商名称...</span>
    </h3>
    <el-table :data="tableData" border style="width: 100%" stripe >
      <el-table-column prop="network.networkCode" label="经销商编号" width="290"></el-table-column>
      <el-table-column prop="network.networkId" label="网点名称" width="310"></el-table-column>
      <el-table-column prop="userCat.userCatName" label="职位"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="账号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130px">
        <el-button type="text" size="small" @click="edit">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  //查看经销商详细信息
  data() {
    return {
      networkId:'',

      tableData: [
        {
          distributorNumber:"116574564568348",
          dotname:"熬过去啊u影的根源穷啊u哦过去",
          position:"qwetw",
          name:"zjgvau",
          number:"12345673563"
        }
      ]
    };
  },
  created:function(){
      this.init();
  },
  methods:{
    init:function(){
      if(this.$route.query.flag == 1){
        //网点详情
        this.networkId = this.$route.query.networkId;
        this.networkDetail(this.networkId);
      }else if(this.$route.query.flag == 2){
        // console.log(this.$route.query.data)
      }
      
    },
    networkDetail(netId){
      Axios(
            {
            method: "get",
            url: "api/networkUserManager/networkDetail"+'?networkId='+netId,
            }
        ).then(data => {
          // console.log(data)
            this.tableData = data.data.data.userList;
        })
    },
      edit(){
          this.$router.push("/modify")
      }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 60px;
  margin: 0 auto;
  h3 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
}
</style>

