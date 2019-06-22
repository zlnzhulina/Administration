<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addprizeclass">添加分类</span>
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
      <el-table-column prop="prizeid" label="编号" width="180px"></el-table-column>
      <el-table-column prop="prizeclassname" label="分类名称" width="200px"></el-table-column>
      <el-table-column prop="grade" label="级别" width="126px"></el-table-column>
      <el-table-column prop="butnum" label="分类下设奖品数量"></el-table-column>
      <el-table-column prop="num" label="分类关联奖品数量"></el-table-column>

      <el-table-column fixed="right" label="操作" >
        <template>
          <el-button type="text" size="small" @click="prizedetails">查看</el-button>
          <el-button type="text" size="small" @click="addthisclassprize">添加分类奖品</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="addclasswrap" v-if="addclasscanvas">
      <div class="addclasscanvas">
        <h3>添加分类</h3>
        <ul>
          <li>
            <span>分类名称</span>
            <input type="text" v-model="goodsName">
          </li>
          <li>
            <span>是否允许下设奖品</span>
            <div class="redio">
              <template>
                <el-radio v-model="allow" label="1">允许</el-radio>
                <el-radio v-model="allow" label="2">不允许</el-radio>
              </template>
            </div>
          </li>
          
        </ul>
        <div class="but">
          <button class="yes" style="background:#169bd5;color:#fff;border:none" @click="yesedit">保存</button>
          <button class="no" @click="exit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
</template>

<script>
export default {
  // 奖品分类
  data() {
    return {
      addclasscanvas: false,
      //是否允许下设奖品
      allow:"",
      tabledata: [
        {
          prizeid: 121,
          prizeclassname: "bwreg",
          grade: 21,
          butnum: 232,
          num: 365
        }
      ]
    };
  },
  methods: {
    //添加奖品分类
    addprizeclass() {
      this.addclasscanvas = true;
    },
    //查看奖品分类详情
    prizedetails() {
      this.$router.push("/prizeclassdetails");
    },
    //添加奖品
    addthisclassprize() {
      this.$router.push("/addthisclassprize");
    },
    //保存添加分类
    yesedit(){
        this.addclasscanvas=false;
    },
    exit(){
        this.addclasscanvas=false;
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
  }
  .addclasswrap {
    width: 100%;
    height: 100%;
    background: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 44;
    .addclasscanvas {
      width: 620px;
      height: 532px;
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -310px;
      background: rgb(253, 253, 253);
      border: 1px solid #000;
      h3 {
        width: 100%;
        height: 84px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 84px;
      }
      ul {
        width: 463px;
        margin: 0 auto;
        li {
          width: 100%;
          height: 58px;
          line-height: 58px;
          list-style: none;
          span {
            display: inline-block;
            width: 100px;
            height: 58px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            color: #555;
          }
          .department {
            width: 252px;
            height: 38px;
            background: #eff1f5;
            font-size: 12px;
            color: #555;
            margin-left: 17px;
            text-align: center;
            border: none;
          }
          input {
            width: 252px;
            height: 38px;
            font-size: 12px;
            color: #555;
            margin-left: 17px;
            border: 1px solid #555;
            border-radius: 5px;
          }
          .redio{
              display: inline-block;
              margin-left: 66px;
          }
        }
      }
      .but {
        width: 308px;
        height: 40px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        margin-top: 86px;
        button {
          width: 140px;
          height: 40px;
          background: #fff;
          border: 1px solid #aaa;
          border-radius: 8px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
