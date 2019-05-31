<template>
  <div class="wrap">
    <div class="login">
      <h2>渠道分销激励系统管理</h2>
      <form>
        <label>
          <img src="@/assets/zhanghao.png">
          账号：
          <input type="text" pattern="请输入账号" v-model="username">
        </label>
        <label>
          <img src="@/assets/mima.png">
          密码：
          <input type="password" pattern="请输入密码" v-model="userpwd">
        </label>
      </form>
      <span @click="login">登录</span>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      username: "",
      userpwd: ""
    };
  },
  methods: {
    login() {
      Axios({
        method: "post",
        url: "http://192.168.1.128:8001/loginManager/userLogin",
        data: {
          adminUserName: this.username,
          adminPassword: this.userpwd
        }
      }).then(data => {
        console.log(data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/login.png") no-repeat;
  background-size: 100% 100%;
  padding-bottom: -90px;
  .login {
    width: 500px;
    height: 370px;
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    left: 50%;
    top: 25%;
    margin-left: -250px;
    h2 {
      width: 100%;
      height: 104px;
      line-height: 80px;
      text-align: center;
      font-size: 24px;
    }
    label {
      display: block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #8e7f7f;
      font-weight: bold;
      position: relative;
      img {
        position: absolute;
        left: 139px;
        /* right: 102px; */
        top: 22px;
      }

      input {
        width: 246px;
        height: 30px;
        border-radius: 9px;
        border: 1px solid #ccc;
        padding-left: 30px;
        font-size: 14px;
        color: #555;
      }
    }
    span {
      display: block;
      width: 150px;
      height: 40px;
      text-align: center;
      background: #79986a;
      margin: 43px auto;
      line-height: 40px;
      border-radius: 10px;
      color: #fff;
    }
  }
}
</style>

