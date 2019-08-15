<template>
  <div class="wrap">
    <h3>
      <span>用户维护>{{flag==1||flag==2?"编辑用户":"添加用户"}}</span>
    </h3>
    <ul>
      <li>
        <span>选择用户类型</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="user.userCatId" placeholder="请选择用户职位">
          <el-option
            v-for="item in initUserCat"
            :key="item.userCatName"
            :label="item.userCatName"
            :value="item.userCatId"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span>选择所属网点</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="user.networkId" placeholder="请选择所属网点">
          <el-option
            v-for="item in initNetwork"
            :key="item.networkId"
            :label="item.networkName"
            :value="item.networkId"
          > </el-option>
        </el-select>
      </li>
      <li>
        <span>姓名</span>
        <input type="text" v-model="user.name" placeholder="请填写用户姓名">
      </li>
      <li>
        <span>手机号</span>
        <input type="text" v-model="user.phoneNumber" placeholder="请填写用户手机号">
      </li>

      <div class="tips">账号添加成功后将发送短信至该手机号，其内容包含：账号信息（该手机号）、初始密码以及要登录的小程序名称</div>
      <div
        class="tips"
        style="color:#aaaaaa;margin-top:15px;"
      >【解放渠道产品分销系统】张xx您好！登录账号：xxxxxxxx，初始密码：15613512，请您尽快登录小程序“解放渠道分销平台”修改密码。</div>
      <span class="sub" @click="addUser">提交</span>
    </ul>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  //经销商用户编辑
  data() {
    return {
      initUserCat: [],
      initNetwork: [],
      flag: false,
      user: {
        userId: "",
        phoneNumber: "",
        name: "",
        networkId: "",
        userCatId: ""
      }
    };
  },
  created: function() {
    this.initData();
    this.init();
  },
  methods: {
    init() {
      // console.log(this.$route.query);
      if (this.$route.query.flag == 1) {
        this.flag = this.$route.query.flag;
        this.user.userCatId = this.$route.query.networkParm.userCatId;
        this.user.networkId = this.$route.query.networkParm.networkId;
        this.user.name = this.$route.query.networkParm.name;
        this.user.phoneNumber = this.$route.query.networkParm.phoneNumber;
        this.user.userId = this.$route.query.networkParm.userId;
      }else if(this.$route.query.flag==2){
         this.flag = this.$route.query.flag;
          this.user.userCatId = this.$route.query.rowdata.userCatId;
        this.user.networkId = this.$route.query.rowdata.networkId;
        this.user.name = this.$route.query.rowdata.name;
        this.user.phoneNumber = this.$route.query.rowdata.phoneNumber;
        this.user.userId = this.$route.query.rowdata.userId;
      }
    },
    addUser: function() {
      // console.log(this.user);
      if (this.$route.query.flag) {
        //更改员工信息
        if (!/^1[0-9]{10}$/.test(this.user.phoneNumber)) {
          this.$message({
            message: "手机号填写有误，请重新填写",
            type: "error"
          });
        } else if (this.user.userCatId == "") {
          this.$message({
            message: "请选择用户职位",
            type: "error"
          });
        } else if (!this.user.networkId) {
          this.$message({
            message: "请选择所属网点",
            type: "error"
          });
        } else if (this.user.name == "") {
          //
          this.$message({
            message: "请填写用户名称",
            type: "error"
          });
        } else {
          Axios({
            method: "post",
            url: "api/networkUserManager/editUser",
            data: JSON.stringify(this.user),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(data => {
            if (data.data.code == "0") {
              this.$message({
                message: data.data.msg,
                type: "success"
              });
              this.$router.back();
            }
            if (data.data.code == "-1") {
              this.$message({
                message: data.data.msg,
                type: "error"
              });
            }
          });
        }
      } else {
        //添加员工信息
        if (!/^1[0-9]{10}$/.test(this.user.phoneNumber)) {
          this.$message({
            message: "手机号填写有误，请重新填写",
            type: "error"
          });
        } else if (this.user.userCatId == "") {
          this.$message({
            message: "请选择用户职位",
            type: "error"
          });
        } else if (!this.user.networkId) {
          this.$message({
            message: "请选择所属网点",
            type: "error"
          });
        } else if (this.user.name == "") {
          //
          this.$message({
            message: "请填写用户名称",
            type: "error"
          });
        } else {
          // console.log(JSON.stringify(this.user));
          Axios({
            method: "post",
            url: "api/networkUserManager/addUser",
            data: JSON.stringify(this.user),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(data => {
            if (data.data.code == "0") {
              this.$message({
                message: data.data.msg,
                type: "success"
              });
              this.$router.back();
            }
            if (data.data.code == "-1") {
              this.$message({
                message: data.data.msg,
                type: "error"
              });
            }
          });
        }
      }
    },
    initData: function() {
      Axios({
        method: "get",
        url: "api/networkUserManager/initUserCatAndNetworkList"
      }).then(data => {
        
        this.initNetwork = data.data.data.networkList;
        this.initUserCat = data.data.data.userCatList;
        // console.log(this.initNetwork);
        // console.log(this.userCatList)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 60px;
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
      .el-select {
        width: 258px;
        // height: 38px;
      }
      input {
        width: 258px;
        height: 38px;
        font-size: 12px;
        color: #555;
        background: #f0f0f0;
        margin-left: 17px;
        border: 1px solid #555;
        border-radius: 5px;
      }
    }
    .tips {
      width: 438px;

      color: #d9001b;
      font-size: 14px;
      font-weight: bold;
      margin-top: 10px;
    }
    .sub {
      display: block;
      width: 182px;
      height: 50px;
      color: #fff;
      background: #169bd5;
      text-align: center;
      line-height: 50px;
      margin: 0 auto;
      border-radius: 6px;
    }
  }
}
</style>
