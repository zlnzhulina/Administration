<template>
    <div class="wrap">
    <h3>
      <span>商品管理>添加商品</span>
    </h3>
    <div class="content">
        <div class="left">
            <p>基本信息</p>
            <ul>
                <li><span>商品名称:</span><input type="text"/></li>
                <li><span>商品库:</span><input type="text"/></li>
                <li><span>类型:</span><input type="text"/></li>
                <li><span>品牌:</span><input type="text"/></li>
            </ul>
            <p>商品参数</p>
            <ul>
                <li><span>编号:</span><input type="text" value="保存后自动生成" readonly="readonly" style="outline:none;background:#f2f2f2;text-align:center; color:#7f7f7f;"/></li>
                <li><span>系列:</span><input type="text"/></li>
                <li><span>规格:</span><input type="text"/></li>
                <li><span>粘度:</span><input type="text"/></li>
                <li><span>价格:</span><input type="text"/></li>
            </ul>
        </div>
        <div class="right">
            <span>图片</span>
            <div class="addimg"><img src="@/assets/jiahao.png"/><span>添加图片</span></div>
        </div>
    </div>
    <div class="btn">
        <span style="background:#169bd5;border:1px solid #169bd5;color:#fff;">保存</span>
        <span>取消</span>
    </div>
    </div>
</template>

<script>
export default {

}
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
  .content{
      width:1152px;
      height: 570px;
      margin: 18px 0 0 68px;
      .left{
          width: 634px;
          height:100%;
          float: left;
          border-right: 1px solid #ccc;
          p{
              width:598px;
              height: 36px;
              background: #f2f2f2;
              line-height: 36px;
              font-size: 12px;
              color: #555;
              font-weight: bold;
              padding-left: 16px;
          }
          ul{
              width: 542px;
              margin-left: 72px;
              margin-top:7px; 
              li{
                  width:100%;
                  height:54px;
                  line-height: 54px;
                  list-style: none;
                  span{
                      display: inline-block;
                      width: 98px;
                      height: 100%;
                      line-height: 60px;
                      text-align: right;
                      font-size: 12px;
                      color: #000;
                  }
                  input{
                      width: 300px;
                      height: 38px;
                      border: 1px solid #ccc;
                      margin-left: 11px;
                      
                  }
              }
          }
      }
      .right{
          float: left;
          padding-left:22px;
          font-size: 12px;
          .addimg{
              width: 298px;
              height: 74px;
              margin-top: 15px;
              border: 2px dashed #ccc;
              text-align: center;
              line-height: 74px;
              img{
                  width: 26px;
                  height: 26px;
                  display: block;
                  float: left;
                  margin-left:112px;
                  margin-top: 24px;
              }
              span{
                  
                   display: block;
                   float: left;
              }
          }
      }

  }
  .btn{
      width: 290px;
      height: 40px;
      margin: 86px auto;
      margin-bottom: 0;
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

