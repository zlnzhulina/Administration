<template>
  <div class="wrap">
    <h3>
      <span>用户维护>添加用户</span>
    </h3>
    <ul>
      <li>
        <span>选择用户类型</span>
        <select name="department" id="department" class="department">
          <option value="volvo">会员类型</option>
          <option value="saab">研发部</option>
          <option value="opel">销售部</option>
        </select>
      </li>
      <li>
        <span>选择所属网点</span>
        <select name="department" id="department" class="department">
          <option value="volvo">请选择所属网点</option>
          <option value="saab">研发部</option>
          <option value="opel">销售部</option>
        </select>
      </li>
      <li>
        <span>姓名</span>
        <input type="text" placeholder="请填写使用者姓名">
      </li>
      <li>
        <span>手机号</span>
        <input type="text" placeholder="请填写使用者手机号">
      </li>

      <div class="tips">账号添加成功后将发送短信至该手机号，其内容包含：账号信息（该手机号）、初始密码以及要登录的小程序名称</div>
      <div class="tips" style="color:#aaaaaa;margin-top:15px;">【解放渠道产品分销系统】张xx您好！登录账号：xxxxxxxx，初始密码：15613512，请您尽快登录小程序“解放渠道分销平台”修改密码。</div>
      <span class="sub">提交</span>
    </ul>

  </div>
</template>

<script>
export default {
  //经销商用户编辑
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
  ul {
    width: 438px;
    margin: 0 auto;
    li {
      width: 100%;
      height: 58px;
      line-height: 58px;
      list-style: none;
      span {
        display: inline-block;
        width: 75px;
        height: 58px;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
        color: #555;
      }
      .department {
        width: 320px;
        height: 38px;
        background: #eff1f5;
        font-size: 12px;
        color: #555;
        margin-left: 17px;
        text-align: center;
        border: none;
      }
      input {
        width: 320px;
        height: 38px;
        font-size: 12px;
        color: #555;
        background: #f0f0f0;
        margin-left: 17px;
        border: 1px solid #555;
        border-radius: 5px;
      }
     
    }
    .tips{
        width: 438px;
        
        color: #d9001b;
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
    }
    .sub{
        display: block;
        width: 182px;
        height: 50px;
        color: #fff;
        background: #169bd5;
        text-align: center;
        line-height: 50px;
        margin: 0 auto;
    }
  }
}
</style>
