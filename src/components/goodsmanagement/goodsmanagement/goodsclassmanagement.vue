<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addgoodsbank">添加商品库</span>
    </div>
    <div class="search">
      <select name="userclass" v-model="firstlist">
        <option value>全部商品库</option>
        <option
          v-for="(firstlist,index) in classlist"
          @change="ccc(firstlist)"
          :value="firstlist"
        >{{firstlist.productCatName}}</option>
      </select>
      <select name="userclass" v-model="secondlist">
        <option>商品类型</option>
        <option
          v-for="(secondlist,index) in firstlist.productCatList"
          :value="secondlist"
        >{{secondlist.productCatName}}</option>
      </select>
      <select v-model="threelist" @change="selectthree">
        <option
          v-for="(threelist,index) in secondlist.productCatList"
          :value="threelist"
        >{{threelist.productCatName}}</option>
      </select>
      <i>添加时间</i>

      <el-date-picker v-model="littleTime" type="date" placeholder="选择日期"></el-date-picker>
      <span @click="search">搜索</span>
    </div>
    <div class="tabhand">
      <span style="margin-left:19px;">分类名称</span>
      <span style="display:block;height:32px;line-height:32px;float:right;margin-right:124px;">操作</span>
    </div>
    <div class="tabbody">
      <el-collapse
        :v-model="firstitem.productCatId"
        accordion
        v-for="(firstitem,index) in classlist"
        :key="index"
        @expand-on-click-node="false"
      >
        <el-collapse-item>
          <template slot="title">
            {{firstitem.productCatName}}
            <span
              style="right:120px"
              @click="addnextclass(firstitem.productCatId,$event)"
            >添加下级分类</span>
            <span style="right:70px" @click="editclass(firstitem,$event)">编辑</span>
            <span style="right:26px;" @click="deleteclass(firstitem.productCatId,$event)">删除</span>
          </template>
          <div>
            <el-collapse
              v-model="seconditem.productCatId"
              v-for="(seconditem,index) in firstitem.productCatList"
              :key="index"
            >
              <el-collapse-item>
                <template slot="title">
                  {{seconditem.productCatName}}
                  <span
                    style="right:120px"
                    @click="addnextclass(seconditem.productCatId,$event)"
                  >添加下级分类</span>
                  <span style="right:70px" @click="editclass(seconditem,$event)">编辑</span>
                  <span style="right:26px;" @click="deleteclass(seconditem.productCatId,$event)">删除</span>
                </template>
                <div
                  v-for="(threeitem,index) in seconditem.productCatList"
                  :key="index"
                  style="position:relative;"
                >
                  <b style="font-weight: normal;margin-left:30px;">{{threeitem.productCatName}}</b>
                  <span
                    style="display: block;position: absolute;width: auto;height: 30px;line-height: 30px;text-align: center;color: #169bd5;font-size: 14px;right:50px;top:0;"
                    @click="editclass(threeitem,$event)"
                  >编辑</span>
                  <span
                    style="display: block;position: absolute;width: auto;height: 30px;line-height: 30px;text-align: center;color: #169bd5;font-size: 14px;right:6px;top:0;"
                    @click="deleteclass(threeitem.productCatId,$event)"
                  >删除</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- :title="firstitem.title" name="1"<span>编辑</span> -->
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="addcanvas" v-if="addcanvas">
      <h3>添加商品库</h3>
      <p>
        名称
        <input type="text" v-model="classname" />
      </p>
      <span style="background:#fff" @click="exit">取消</span>
      <span style="background:#169bd5" @click="ok">确认</span>
    </div>
    <div class="btn">
      <span style="background:#169bd5;border:1px solid #169bd5;color:#fff;">保存</span>
      <span>取消</span>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  //商品分类管理
  data() {
    return {
      classlist: [],
      classname: "",
      addcanvas: false,
      first: 1,
      second: 2,
      tabledata: [
        {
          goodsid: "12543245543",
          goodsname: "wddws",
          goodsclass: "afsefw",
          data: "2019-3-4"
        }
      ],
      superior: "",
      productCatId: "",
      superCatId: "",
      //用来判断是添加还是编辑
      flag: "",
      // goodsclasslist: [],
      //一级分类列表
      firstlist: [],
      //二级分类列表
      secondlist: [],
      threelist: [],
      productCatIds: "",
      littleTime: ""
    };
  },
  created() {
    this.goodsclasslist();
    // Axios({
    //   url: "api/productsManager/productCatList",
    //   method: "get"
    // }).then(data => {
    //   this.goodsclasslist= data.data.data.firstCatList;
    //   console.log(this.goodsclasslist);
    // });
  },
  methods: {
    goodsclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
        // console.log(data);
        this.classlist = data.data.data.firstCatList;
      });
    },
    selectthree() {
      this.productCatId = this.threelist.productCatId;
    },
    search() {
      // this.goodslist();
      this.productCatId = "";
      this.littleTime = "";
    },
    //查看
    seedetails(id) {
      this.$router.push({
        path: "/distributordetails"
        // params: {Id:id}
      });
    },
    //添加
    addgoodsbank() {
      this.addcanvas = true;
    },
    addnextclass(val, e) {
      this.classname = "";
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      // console.log(val);
      // console.log(e);
      if (typeof val == "object") {
        this.superior = val[0];
      } else {
        this.superior = val;
      }
      this.addcanvas = true;
    },
    //编辑
    editclass(list, e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      this.addcanvas = true;
      this.flag = "1";
      // console.log(list);
      this.classname = list.productCatName;
      this.productCatId = list.productCatId;
      this.superCatId = list.superCatId;
    },
    //编辑

    //删除
    deleteclass(val, e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      // console.log(val);
      if (typeof val == "object") {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Axios({
              url: "api/productsManager/delProductCat",
              methods: "get",
              params: {
                productCatIds: val[0]
              }
            }).then(data => {
              // console.log(data)
              if (data.data.code == 0) {
                this.goodsclasslist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else if (typeof val == "string") {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Axios({
              url: "api/productsManager/delProductCat",
              methods: "get",
              params: {
                productCatIds: val
              }
            }).then(data => {
              // console.log(data)
              if (data.data.code == 0) {
                this.goodsclasslist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
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
    },
    exit() {
      this.addcanvas = false;
    },

    ok() {
      // console.log(this.classname, this.superCatId);
      if (this.flag == 1) {
        // console.log("编辑");
        Axios({
          url: "api/productsManager/editProductCat",
          method: "post",
          data: {
            productCatId: this.productCatId,
            productCatName: this.classname,
            superCatId: this.superCatId
          }
        }).then(data => {
          this.classname = "";
          this.superCatId = "";
          // console.log(data);
          if (data.data.code == 0) {
            this.goodsclasslist();
            this.$message({
              type: "success",
              message: data.data.msg
            });
          }
        });
        this.flag = "";
      } else {
        Axios({
          url: "api/productsManager/addProductCat",
          method: "post",
          data: {
            productCatId: "",
            productCatName: this.classname,
            superCatId: this.superior
          }
        }).then(data => {
          this.classname = "";
          this.superior = "";
          // console.log(data);
          if (data.data.code == 0) {
            this.goodsclasslist();
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        });
      }

      this.addcanvas = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    width: 100%;
    height: 60px;
    .add {
      display: block;
      width: 122px;
      height: 36px;
      margin-top: 10px;

      border: 1px solid #555;
      color: #7f7f7f;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      border-radius: 5px;
      float: left;
      margin-right: 8px;
    }
    input {
      width: 216px;
      height: 34px;
      margin-top: 10px;
      border-radius: 15px;
      float: right;
      border: 1px solid #ddd;
      padding-left: 8px;
      outline: none;
    }
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 932px;
      top: 18px;
    }
  }
  .search {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    line-height: 70px;
    clear: both;
    background: #f2f2f2;
    input {
      width: 170px;
      height: 34px;
      margin-left: 16px;
      background: #f2f2f2;
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
    i {
      font-style: normal;
      margin-left: 15px;
    }
    span {
      display: inline-block;
      width: 80px;
      height: 36px;
      background: #169bd5;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      color: #fff;
      float: right;
      margin-top: 18px;
      margin-right: 16px;
      border-radius: 4px;
    }
  }
  .tabhand {
    width: 958px;
    height: 32px;
    background: #ccd1e0;
    margin: 15px auto;
    margin-bottom: 0;
    line-height: 32px;
  }
  .tabbody {
    width: 956px;
    height: 456px;
    margin: 0 auto;
    border: 1px solid #797979;
    .el-collapse-item__header {
      span {
        display: block;
        position: absolute;
        width: auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #169bd5;
        font-size: 14px;
      }
    }
    .el-collapse {
      width: 916px;
      margin: 0 auto;
      border: none;
      position: relative;
      .el-collapse {
        width: 900px;
        margin: 0 auto;
      }
    }
  }
  .addcanvas {
    width: 358px;
    height: 238px;
    border: 1px solid #f2f2f2;

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
        width: 228px;
        height: 38px;
        border: 1px solid #d7d7d7;
        margin-left: 14px;
      }
    }
    span {
      display: block;
      width: 179px;
      border-top: 1px solid #d7d7d7;
      font-size: 12px;
      float: left;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
  .btn {
    width: 290px;
    height: 40px;
    margin: 34px auto;
    display: flex;
    justify-content: space-between;

    span {
      display: block;
      width: 138px;
      height: 38px;
      border-radius: 8px;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
      border: 1px solid #555;
      color: #555;
    }
  }
}
</style>
