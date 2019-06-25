<template>
  <div class="container">
    <h2>
      <span>奖品参数列表</span>
      <span @click="addprizeattribute"
        style="display：block;float:right;width:94px;height:32px;text-align:center;line-height:32px;background:#fff;border:1px solid #ccc;font-size:14px;font-weight:normal;margin-right:13px;margin-top:13px;padding:0;"
      >添加参数</span>
    </h2>
    <el-table :data="tableData" stripe :header-cell-style="{background:'#ccd1e0',height:'32'}" style="width: 100%;background:#eee;">
          
          <el-table-column prop="id" label="编号" ></el-table-column>
          <el-table-column prop="name" label="分类名称" ></el-table-column>
          <el-table-column prop="address" label="参数名称" ></el-table-column>
           <el-table-column label="操作">
               <template>
                   <el-button>默认不可删除</el-button>
               </template>
           </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  // 奖品参数
  data(){
    return {
      tableData:[
        {
          id:"",
          name:"",
          address:"",
        }
      ]
    }
  },
  methods:{
    addprizeattribute(){
      this.$router.push({
        path:"/addprizeattribute"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  h2 {
    width: 100%;
    height: 54px;
    background: #eee;
    line-height: 54px;
    span {
      padding-left: 13px;
      font-size: 14px;
    }
  }
}
</style>
