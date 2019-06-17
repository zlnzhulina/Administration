<template>
  <div class="wrap">
    <h3>
      <span>商品管理>添加商品</span>
    </h3>
    <div class="content">
      <div class="left">
        <p>基本信息</p>
        <ul>
          <li>
            <span>商品名称:</span>
            <input type="text" v-model="productS.productSName">
          </li>
          <li>
            <span>商品库:</span>
            <select v-model="firstlist">
              <option
                v-for="(firstlist,index) in goodsclasslist"
                :value="firstlist"
              >{{firstlist.productCatName}}</option>
            </select>
          </li>
          <li>
            <span>类型:</span>
            <select v-model="secondlist">
              <option
                v-for="(secondlist,index) in firstlist.productCatList"
                :value="secondlist"
              >{{secondlist.productCatName}}</option>
            </select>
          </li>
          <li>
            <span>品牌:</span>
            <select v-model="threelist" @change="selectthree">
              <option
                v-for="(threelist,index) in secondlist.productCatList"
                :value="threelist"
              >{{threelist.productCatName}}</option>
            </select>
          </li>
        </ul>
        <p>商品参数</p>
        <ul>
          <li>
            <span>编号:</span>
            <input
              type="text"
              value="保存后自动生成"
              readonly="readonly"
              style="outline:none;background:#f2f2f2;text-align:center; color:#7f7f7f;"
            >
          </li>

          <li v-for="(goodsparameter,index) in selectlist">
            <span>{{goodsparameter.name}}</span>
            <select @change="selectparameter(index,goodsparameter.children[i])">
              <option>请选择</option>
              <option
                v-for="(valitem,i) in goodsparameter.children"
                :value="i"
              >{{valitem.productParamValueVal}}</option>
            </select>
          </li>
        </ul>
      </div>
      <div class="right">
        <span>图片</span>
        <div class="addimg">
          <el-upload
            action="api/upload/uploadImage"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="updatesuccess"
            style="width:490px;display:inline-block;"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="btn">
      <span style="background:#169bd5;border:1px solid #169bd5;color:#fff;" @click="addgoods">保存</span>
      <span>取消</span>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      i:"",
      selectitemlist:[],
      productS: {
        productSName: "",
        status: "",
        cityName: "",
        productCatId: "",
        productImgUrl: ""
      },
      productParamSetSelectList: {},
      //商品类列表
      goodsclasslist: [],
      //一级分类列表
      firstlist: [],
      //二级分类列表
      secondlist: [],
      threelist: [],
      //商品参数列表
      tabledata: [],
      selectlist: [],

      dialogImageUrl: "",
      dialogVisible: false,
      //商品图片集合
      goodsimg: []
    };
  },
  created() {
    this.goodclasslist();
  },
  methods: {
    //商品分类列表
    goodclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        method: "get"
      }).then(data => {
        this.goodsclasslist = data.data.data.firstCatList;
      });
    },
    //商品参数列表加载
    selectthree() {
      this.goodsparameterlist();
    },
    //商品参数列表
    goodsparameterlist() {
      console.log(this.threelist);
      Axios({
        url: "api/productsManager/productParamSetList",
        method: "get",
        params: {
          // productParamSetId:"1139513859602653185",
          productCatId: this.threelist.productCatId
        }
      }).then(data => {
        this.tabledata = data.data.data.productParamSetList;
        var obj = {};
        var arr = [];
        for (let i = 0; i < this.tabledata.length; i++) {
          Axios({
            url: "api/productsManager/productParamValueList",
            method: "get",
            params: {
              productParamSetId: this.tabledata[i].productParamSetId
            }
          }).then(data => {
            var paramobj = {};
            paramobj["name"] = this.tabledata[i].productParamSetName;
            paramobj["children"] = data.data.data.productParamValueList;
            obj[this.tabledata[i].productParamSetId] = paramobj;
            // this.tabledata[i].productParamValueList=data.data.data.productParamValueList
            // console.log(paramobj)
            arr.push(paramobj);
            this.selectlist = arr;
            console.log(this.selectlist)
          });
        }
      });
    },
    // productParamSetId  参数id
    //选择参数
    selectparameter(i,val){
      console.log(i)
      console.log(val)
      this.selectitemlist.push(val)
      console.log(this.selectitemlist)
    },
    //添加商品
    addgoods() {
      Axios({
        url: "api/productManager/addProductS",
        method: "post",
        data: {
          productS: {
            productSName: this.productS.productSName,
            status: "",
            cityName: "",
            productSName: this.productSName,
            productImgUrl: this.goodsimg
          },
          productParamSetSelectList: [
            {
              productParamValueId: "",
              productParamValueVal: "",
              productParamSetId: "",
              isEdit: ""
            }
          ]
        }
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    updatesuccess(res, file) {
      if (res.code == 0) {
        this.goodsimg.push(file.response.data.fileUrl);
        console.log(this.goodsimg);
      }
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
  .content {
    width: 1152px;
    height: 570px;
    margin: 18px 0 0 68px;
    .left {
      width: 634px;
      height: 100%;
      float: left;
      border-right: 1px solid #ccc;
      p {
        width: 598px;
        height: 36px;
        background: #f2f2f2;
        line-height: 36px;
        font-size: 12px;
        color: #555;
        font-weight: bold;
        padding-left: 16px;
      }
      ul {
        width: 542px;
        margin-left: 72px;
        margin-top: 7px;
        li {
          width: 100%;
          height: 54px;
          line-height: 54px;
          list-style: none;
          span {
            display: inline-block;
            width: 98px;
            height: 100%;
            line-height: 60px;
            text-align: right;
            font-size: 12px;
            color: #000;
          }
          input {
            width: 300px;
            height: 38px;
            border: 1px solid #ccc;
            margin-left: 11px;
          }
          select {
            width: 300px;
            height: 38px;
            border: 1px solid #ccc;
            margin-left: 11px;
          }
        }
      }
    }
    .right {
      float: left;
      padding-left: 22px;
      font-size: 12px;
      .addimg {
        width: auto;
        height: auto;
        margin-top: 15px;
        text-align: center;
        line-height: 74px;
        div {
          .el-upload-list--picture-card {
            display: inline-block;
            width: 300px;
          }
        }
      }
    }
  }
  .btn {
    width: 290px;
    height: 40px;
    margin: 86px auto;
    margin-bottom: 0;
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

