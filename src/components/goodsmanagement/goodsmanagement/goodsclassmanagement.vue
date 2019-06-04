<template>
  <div class="container">
    <div class="header">
      <span class="add" @click="addgoodsbank">添加商品库</span>
    </div>
    <div class="tabhand"><span style="margin-left:19px;">分类名称</span><span style="display:block;height:32px;line-height:32px;float:right;margin-right:124px;">操作</span></div>
    <div class="tabbody"></div>
    <div class="addcanvas" v-if="addcanvas">
      <h3>添加商品库</h3>
      <p>名称<input type="text"></p>
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
export default {
  //商品分类管理
  data() {
    return {
      addcanvas: false,
      tabledata: [
        {
          goodsid: "12543245543",
          goodsname: "wddws",
          goodsclass: "afsefw",
          data: "2019-3-4"
        }
      ]
    };
  },
  methods: {
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
    //编辑
    deleteall() {
      this.addcanvas = true;
    },
    exit() {
      this.addcanvas = false;
    },

    ok() {
      this.addcanvas = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 960px;
  height: 622px;
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
    input{
        width:216px;
        height:34px;
        margin-top: 10px;
        border-radius: 15px;
        float: right;
        border: 1px solid #ddd;
        padding-left: 8px;
        outline:none;
    }
    img{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 932px;
        top: 18px;
    }
  }
  .tabhand{
      width: 958px;
      height: 32px;
      background: #9decff;
      margin: 0 auto;
      line-height: 32px;
  }
  .tabbody{
      width: 956px;
      height: 456px;
      margin: 0 auto;
      border: 1px solid #797979;
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
      input{
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
  .btn{
      width: 290px;
      height: 40px;
      margin: 34px auto;
      display: flex;
      justify-content: space-between;

      span{
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
