<template>
  <div class="wrap">
    <h3>
      <span>网点维护>添加网点</span>
    </h3>
    <ul class="fromlist">
      <li>
        <span>
          <i>*</i>经销商代码
        </span>
        <input type="text">
      </li>
      <li>
        <span>网点编号</span>
        <input
          type="text"
          readonly="readonly"
          value="提交后自动生成"
          style="background:#f2f2f2;color:#bbb"
        >
      </li>
      <li>
        <span>
          <i>*</i>网点名称
        </span>
        <input type="text">
        <span>
          <i>*</i>网点电话
        </span>
        <input type="text">
      </li>
      <li>
        <span>负责人</span>
        <input type="text">
        <span>联系方式</span>
        <input type="text">
      </li>
      <li>
        <span>
          <i>*</i>详细地址
        </span>
        <select name="province" id="province" class="province">
          <option value="volvo">请选择省</option>
          <option value="saab">研发部</option>
          <option value="opel">销售部</option>
        </select>
        <select name="city" id="city" class="city">
          <option value="volvo">请选择市</option>
          <option value="saab">研发部</option>
          <option value="opel">销售部</option>
        </select>
        <select name="county" id="county" class="county">
          <option value="volvo">请选择县</option>
          <option value="saab">研发部</option>
          <option value="opel">销售部</option>
        </select>
      </li>
      <li><span></span><input type="text"/></li>
    </ul>
    <div class="map">
        <p>地图锚点</p>
    </div>
  </div>
</template>

<script>
export default {
  //添加网点
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1200px;
  height: 600px;
  margin: 90px auto;
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
  .fromlist {
    width: 1060px;
    height: 416px;
    margin-left: 62px;
    li {
      width: 100%;
      height: 56px;
      line-height: 56px;
      list-style: none;
      span {
        display: inline-block;
        width: 128px;
        height: 38px;
        line-height: 38px;
        text-align: right;
        font-size: 16px;
        font-weight: bold;
        i {
          color: red;
          margin-right: 8px;
        }
      }
      input {
        width: 368px;
        height: 38px;
        border: 1px solid #bbb;
        margin-left: 5px;
        text-align: center;
        border-radius: 6px;
      }
      select{
          width:90px;
          height: 30px;
          margin-left: 13px;
          
      }
    }
  }
  .map{
      width: 892px;
      margin: 0 auto;
      p{font-size: 12px;color: #aaa;}
  }
}
</style>
