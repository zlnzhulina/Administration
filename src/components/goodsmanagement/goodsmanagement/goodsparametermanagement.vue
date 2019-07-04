<template>
  <div class="container">
    <div class="search">
      <span>商品库</span>
      <select name="userclass" v-model="firstlist">
        <option>请选择商品库</option>
        <option
          v-for="(firstlist,index) in goodsclasslist"
          :value="firstlist"
        >{{firstlist.productCatName}}</option>
      </select>
      <span>商品类型</span>
      <select name="userclass" v-model="secodslist">
        <option>商品类型</option>

        <option
          v-for="(secodslist,index) in firstlist.productCatList"
          :value="secodslist"
        >{{secodslist.productCatName}}</option>
      </select>
      <span>商品品牌</span>
      <select name="userclass" v-model="threelist" @change="selectok(threelist.productCatId)">
        <option>商品品牌</option>

        <option
          v-for="(threelist,index) in secodslist.productCatList"
          :value="threelist"
          @click="selectok(threelist.productCatId)"
        >{{threelist.productCatName}}</option>
      </select>
      <span class="add" @click="addparameter">添加参数</span>
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
      <el-table-column prop="productParamSetName" label="参数名称" width="362px"></el-table-column>
      <el-table-column prop="start" label="启用" width="194px">
        <template slot-scope="scope">
          <img :src="scope.row.start==1?dui:cuo" style="width:25px;height:25px;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="metermageval(scope.row)">管理值</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- -------------------添加参数 -->
    <div class="addparametercanvas" v-if="addparametercanvas">
      <h3>添加参数</h3>
      <p>
        参数名称：
        <input type="text" v-model="parametername" />
      </p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="add">确认</span>
    </div>
    <div class="editparametercanvas" v-if="editparametercanvas">
      <h3>修改参数</h3>
      <p>
        参数名称：
        <input type="text" v-model="parametername" />
      </p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="editok">确认</span>
    </div>
    <div class="editparametercanvas" v-if="editparametercanvas" style="z-index:33;">
      <h3>添加值</h3>
      <p>
        值名称：
        <input type="text" v-model="valuename" />
      </p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="addvalok">确认</span>
    </div>
    <div class="metermagevalcanvas" v-if="metermagevalcanvas">
      <header>
        <span>管理值</span>
        <i>
          <img src="../../../assets/no.png" @click="exit" />
        </i>
      </header>
      <div class="title">
        <span>参数名称：</span>
        {{productParamSetName}}
      </div>
      <div class="btn">
        <span @click="addval">添加值</span>
        <span @click="delval">删除选中</span>
      </div>
      <el-table
        :header-cell-style="{height:'32'}"
        ref="multipleTable"
        :data="metermagevallist"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
      >
        <!-- stripe="true" -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productParamValueVal" label="值" width="362px"></el-table-column>
        <!-- <el-table-column prop="start" label="启用" width="194px">
          <template  slot-scope="scope">
              <img :src="scope.row.start==1?dui:cuo" style="width:25px;height:25px;">
              
          </template>
        </el-table-column>-->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editval(scope.rpw)">编辑</el-button>
            <el-button type="text" size="small" @click="delval(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //商品列表
  data() {
    return {
      dui: require("@/assets/yes.png"),
      cuo: require("@/assets/no.png"),
      delcanvas: false,
      row: {},
      //添加参数的弹窗
      addparametercanvas: false,
      //编辑值弹窗：
      editparametercanvas: false,
      //管理值弹窗
      metermagevalcanvas: false,
      //添加值弹框
      addvaluecanvas: false,
      //要添加参数的名称
      parametername: "",
      //选中的商品库列表
      firstlist: [],
      //选中的商品分类列表
      secodslist: [
        {
          productCatList: ""
        }
      ],
      //选中的商品品牌列表
      threelist: [],
      //商品分类列表
      goodsclasslist: [],
      //商品参数列表
      tabledata: [],
      //管理值列表
      metermagevallist: [],
      //管理值类名
      productParamSetName: "",
      //管理参数id
      productParamSetId: "",
      productCatId: "",
      //添加管理值名称
      valuename: ""
    };
  },
  created() {
    this.goodclasslist();
    // this.goodsparameterlist()
  },
  methods: {
    //商品分类列表
    goodclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        method: "get"
      }).then(data => {
        // console.log(data);
        this.goodsclasslist = data.data.data.firstCatList;
      });
    },
    //商品参数列表
    goodsparameterlist() {
      Axios({
        url: "api/productsManager/productParamSetList",
        method: "get",
        params: {
          // productParamSetId:"1139513859602653185",
          productCatId: this.productCatId
        }
      }).then(data => {
        this.tabledata = data.data.data.productParamSetList;
        // console.log(data);
      });
    },
    //选中商品品牌
    selectok(productCatId) {
      this.productCatId = productCatId;
      this.goodsparameterlist();
    },
    //编辑参数

    edit(row) {
      this.row = row;
      this.editparametercanvas = true;
      this.parametername = row.productParamSetName;
      console.log(row);
    },
    //确定修改参数
    editok() {
      if(this.parametername){
          Axios({
        url: "api/productsManager/updateProductParamSet",
        method: "post",
        data: {
          productParamSetId: this.row.productParamSetId,
          productParamSetName: this.parametername,
          isEdit: this.isEdit,
          isUse: this.isUse,
          productCatId: this.productCatId
        }
      }).then(data=>{
        if(data.data.code==0){
          this.$message({
          message: '修改成功！',
          type: 'success'
        });
        this.goodsparameterlist();
        }else{
           this.$message({
          message: '修改失败！',
          type: 'error'
        });
        }
        this.editparametercanvas = false;
      });
      }else{
        this.$message({
          message: '参数名称不能为空',
          type: 'warning'
        });
      }
    

    },
    //添加参数
    addparameter() {
      this.addparametercanvas = true;
    },
    add() {
      //确定添加参数
      if (this.threelist.productCatId && this.parametername) {
        // console.log(this.threelist);

        Axios({
          url: "api/productsManager/addProductParamSet",
          method: "post",
          data: {
            productParamSetId: "",
            productParamSetName: this.parametername,
            isEdit: "",
            isUse: "",
            productCatId: this.threelist.productCatId
          }
        }).then(data => {
          // console.log(data);
          this.parametername = "";
          if (data.data.code == 0) {
            this.$message({
                type: "success",
                message: "添加成功!"
              });
            this.addparametercanvas = false;
            this.goodsparameterlist();
          }
        });
      }else{
        this.$message({
          message: '参数名称不能为空',
          type: 'warning'
        });
      }
    },
    //管理值
    //管理值列表
    metermagevaluelist() {
      // console.log(this.productParamSetId)

      Axios({
        url: "api/productsManager/productParamValueList",
        method: "get",
        params: {
          productParamSetId: this.productParamSetId
        }
      }).then(data => {
        // console.log(data);
        this.metermagevallist = data.data.data.productParamValueList;
      });
    },
    metermageval(val) {
      this.metermagevalcanvas = true;
      // console.log(val);
      this.productParamSetName = val.productParamSetName;
      this.productParamSetId = val.productParamSetId;
      this.metermagevaluelist();
    },
    //添加值
    addval() {
      this.addvaluecanvas = true;
    },
    //确定添加
    addvalok() {
      if(this.valuename){
         Axios({
        url: "api/productsManager/addProductParamValue",
        method: "post",
        data: {
          productParamValueId: "",
          productParamValueVal: this.valuename,
          productParamSetId: this.productParamSetId,
          isEdit: ""
        }
      }).then(data => {
        this.addvaluecanvas = false;
        // console.log(data);
        if (data.data.code == 0) {
          this.metermagevaluelist();
        }
      });
      }else{
        this.$message({
          message: '参数名称不能为空',
          type: 'warning'
        });
      }
     
    },
    //编辑值
    editval(val) {},
    //删除值
    delval(val) {
      console.log("aaa");
    },
    //编辑
    deleteall() {
      this.delcanvas = true;
    },
    exit() {
      this.delcanvas = false;
      this.addparametercanvas = false;
      this.metermagevalcanvas = false;
      this.addvaluecanvas = false;
    },
    //删除参数
    del(val) {
      console.log(val.productParamSetId);
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios({
            url: "api/productsManager/delProductParamSet",
            method: "get",
            params: {
              productParamSetId: val.productParamSetId
            }
          }).then(data => {
            console.log(data);
            if (data.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.goodsparameterlist();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
  // watch: {
  //   firstlist(val) {
  //     console.log(val);
  //     this.secodslist = val;
  //   },
  //   secodslist(val) {
  //     console.log(val);
  //     this.threelist = val;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
    i {
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
      input {
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
  .editparametercanvas {
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
      input {
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
  .metermagevalcanvas {
    width: 800px;
    height: 542px;
    position: absolute;
    left: 50%;
    margin-left: -400px;
    top: 30px;
    background: #eee;
    border: 1px solid #555;
    z-index: 22;
    header {
      width: 100%;
      height: 44px;
      line-height: 44px;
      span {
        padding-left: 13px;
        font-size: 14px;
      }
      i {
        float: right;
        margin-right: 13px;
      }
    }
    .title {
      width: 100%;
      height: 44px;
      line-height: 44px;
      span {
        padding-left: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .btn {
      width: 700px;
      height: 40px;
      span {
        width: 88px;
        height: 30px;
        border-radius: 5px;
        display: inline-block;
        float: right;
        text-align: center;
        border: 1px solid #555;
        line-height: 30px;
        margin-right: 13px;
      }
    }
  }
}
</style>
