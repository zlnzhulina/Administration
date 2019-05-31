<template>
  <div class="wrap">
    <h3>
      <span>网点用户详情>经销商名称...</span>
    </h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="distributorNumber" label="经销商编号" width="290"></el-table-column>
      <el-table-column prop="dotname" label="网点名称" width="310"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="number" label="账号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130px">
        <el-button type="text" size="small" @click="edit">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  //查看经销商详细信息
  data() {
    return {
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
  methods:{
      edit(){
          this.$router.push("/modify")
      }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 90px;
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

