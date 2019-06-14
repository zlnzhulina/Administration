<template>
  <div class="container">
      

    <div class="search">
        <span>
        商品库
        </span>
      <select name="userclass" v-model="firstlist">
        <option>请选择商品库</option>
        <option v-for="(firstlist,index) in goodsclasslist" :value="firstlist">{{firstlist.productCatName}}</option>
        
      </select>
      <span>
      商品类型
      </span>
      <select name="userclass" v-model="secodslist">
        <option>商品类型</option>
        
        <option v-for="(secodslist,index) in firstlist.productCatList" :value="secodslist">{{secodslist.productCatName}}</option>
      </select>
      <span>
      商品品牌
      </span>
      <select name="userclass" v-model="threelist">
        <option>商品品牌</option>
        
        <option v-for="(threelist,index) in secodslist.productCatList" :value="threelist" @click="selectok">{{threelist.productCatName}}</option>
      </select>
      <span class="add" @click="addparameter">添加参数</span>

    </div>
    <el-table
      :header-cell-style="{background:'#9decff',height:'32'}"
      ref="multipleTable"
      :data="tabledata"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click=editrow
    >
      <!-- stripe="true" -->
      <el-table-column prop="parametername" label="参数名称" width="362px"></el-table-column>
      <el-table-column prop="start" label="启用" width="194px">
          <template  slot-scope="scope">
              <img :src="scope.row.start==1?dui:cuo" style="width:25px;height:25px;">
              
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <el-button type="text" size="small" @click="edit(rowdata)">编辑</el-button>
        <el-button type="text" size="small" @click="del">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="addparametercanvas" v-if="addparametercanvas">
      <h3>添加参数</h3>
      <p>参数名称：<input type="text" v-model="parametername"></p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="add">确认</span>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  //商品列表
  data() {
    return {
        dui: require('@/assets/yes.png'),
        cuo: require('@/assets/no.png'),
      delcanvas: false,
      addparametercanvas:false,
      //要添加参数的名称
      parametername:"",
      //选中的商品库列表
      firstlist:[
      ],
      //选中的商品分类列表
      secodslist:[
        {
          productCatList:"",
        }
      ],
      //选中的商品品牌列表
      threelist:[
        
      ],
      //商品分类列表
      goodsclasslist:[],
      tabledata: [
        {
          parametername: "12543245543",
          start: "0"
          
        },
        {
          parametername: "12543245543",
          start: "1"
        },
        {
          parametername: "12543245543",
          start: "1"
        }
      ]
    };
  },
  created(){
    this.goodclasslist();
    this.goodsparameterlist()
  },
  methods: {
    //商品分类列表
    goodclasslist(){
      Axios({
        url:"api/productsManager/productCatList",
        methods:"get",

      }).then(data=>{
        console.log(data);
        this.goodsclasslist=data.data.data.firstCatList;
      })
    },
    //商品参数列表
    goodsparameterlist(){
      Axios({
        url:"api/productsManager/productParamValueList",
        methods:"get"
      }).then(data=>{
        console.log(data)
      })
    },
    //选中商品品牌   
    selectok(){
      
    },
    //编辑
     editrow(row){
        this.rowdata=row;
        if(this.cl){
            this.edit(row)
        }
    },
    edit(val) {
        this.cl=true;
        console.log(val);
    },
    //添加参数
    addparameter() {
      this.addparametercanvas=true;
    },
    add(){
      //确定添加参数
      // Axios({
      //   url:"api/productsManager/addProductParamSet",
      //   methods:"post",
      //   data:{
      //     productParamSetId:"",
      //     productParamSetName:"",
      //     isEdit:"",
      //     isUse:"",
      //     productCatId:"",
      //   }
      // }).then(data=>{
      //   console.log(data)
      // })

    },
    //编辑
    deleteall() {
      this.delcanvas = true;
    },
    exit() {
      this.delcanvas = false;
       this.addparametercanvas = false;
    },

    del() {
      
    }
  },
  watch:{
    firstlist(val){
      console.log(val);
      this.secodslist=val;
    },
    secodslist(val){
      console.log(val)
      this.threelist=val;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
  position: relative;
  .add {
      display: block;
      width: 122px;
      height: 36px;
     float: right;
     margin-top: 15px;
      border: 1px solid #555;
      color: #7f7f7f;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      border-radius: 5px;
      
      margin-right: 8px;
    }

  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    select {
      width: 128px;
      height: 34px;
      margin-left: 10px;
      background: #fff;
      border: 1px solid #dfdfdf;
      text-align: center;
      font-size: 12px;
      color: #555;
    }
    i{
        font-style: normal;
        margin-left: 15px;

    }
    span {
      margin-left: 15px;
    }
  }
  .el-table {
    margin-top: 13px;
  }
  .addparametercanvas {
    width: 360px;
    height: 240px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    top: 190px;
    background: #eff1f5;
    border-radius: 8px;
    overflow: hidden;
    z-index: 99;
    border: 1px solid #dfdfdf;
    h3 {
      width: 100%;
      height: 60px;
      font-size: 18px;
      text-align: center;
      line-height: 60px;
    }
    p {
      width: 100%;
      height: 114px;
      margin-top: 16px;
      text-align: center;
      font-size: 12px;
      input{
        width: 200px;
        height: 30px;

      }
    }
    span {
      display: block;
      width: 180px;
      font-size: 12px;
      float: left;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
