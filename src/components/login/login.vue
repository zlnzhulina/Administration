<template>
  <div class="wrap">
    <div class="login">
      <h2>壳家人-福田戴姆勒</h2>
      <form>
        <label>
          <img src="../../assets/zhanghao.png">
          账号：
          <input type="tel" pattern="请输入账号" v-model="username">
        </label>
        <label>
          <img src="../../assets/mima.png">
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
      userpwd: "",
      a: {
        code: "0",
        msg: "操作成功",
       
      }
    };
  },
  methods: {
    testtel() {
      var regtel = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.username == "") {
        this.$message.error("账号不能为空，请重新填写");
        return false;
      } else if (!regtel.test(this.username)) {
        this.$message.error("账号填写有误，请重新填写");
        return false;
      } else {
        return true;
      }
    },
    testpwd() {
      if (this.userpwd == "") {
        this.$message.error("密码不能为空，请重新填写");
        return false;
      } else {
        return true;
      }
    },
    login() {
      if (this.testtel() && this.testpwd()) {
        Axios({
          method: "post",
          url: "api/loginManager/userLogin",
          data: {
            adminUserName: this.username,
            adminPassword: this.userpwd
          }
        })
          .then(data => {
            // console.log(data);
            if (data.data.code == 0) {
              // console.log(1);
              // this.set("ADMINLOGINTOKEN",data.data.data.userInfo.nickName,1)
              localStorage.setItem(
                "ADMINLOGINTOKEN",
                data.data.data.ADMINLOGINTOKEN
              );
              localStorage.setItem("name", data.data.data.userInfo.nickName);
              Axios({
                url: "api/loginManager/info",
                method: "get",
                headers: {
                  ADMINLOGINTOKEN: data.data.data.ADMINLOGINTOKEN
                }
              }).then(data => {
                // console.log(data);
                this.$router.push("/index");
              });
              // this.$router.push("/index")
            } else {
              this.$message.error("账号和密码不匹配，请重新填写！");
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    }
    // set(key, value, expired) {
    //   let source = this.source;
    //   source[key] = JSON.stringify(value);
    //   if (expired) {
    //     source[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
    //   }
    //   return value;
    // },
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fbc107;
  background-size: 100% 100%;
  padding-bottom: -90px;
  .login {
    width: 500px;
    height: 370px;
    background:hsla(0,0%,100%,0.7);
    position: absolute;
    left: 50%;
    top: 25%;
    margin-left: -250px;
    h2 {
      width: 100%;
      height: 104px;
      line-height: 100px;
      text-align: center;
      font-size: 32px;
      color: #dd1d21;
    }
    label {
      display: block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #404040;
      font-weight: 700;
      position: relative;
      img {
        position: absolute;
        left: 139px;
        /* right: 102px; */
        top: 22px;
      }

      input {
        width: 246px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding-left: 32px;
        font-size: 14px;
        // color: #555;
      }
    }
    span {
      display: block;
      width: 220px;
      height: 50px;
      text-align: center;
      background: #003c88;
      margin: 43px auto;
      line-height: 50px;
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>

