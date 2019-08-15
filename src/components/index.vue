<template>
  <div class="wrap">
    <div class="welimg">
      <img src="../assets/welcome.png" />
    </div>
    <div class="welsay">
      <h1>欢迎！{{name}} 登录壳家人-福田戴姆勒管理系统</h1>
      <h2>美好的一天从微笑开始,加油、加油、加油......</h2>

      <h2></h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name
    };
  },
  created() {
    this.name = localStorage.getItem("name");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap {
  width: 100%;

  margin: 0 auto;
  padding-top: 60px;

  .welimg {
    width: 164px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 30px;
    padding-top: 180px;
    img {
      width: 100%;
    }
  }
  .welsay {
    width: 600px;
    height: 200px;
    margin: 20px auto;
    text-align: center;
    h2 {
      margin-top: 20px;
    }
  }
}
</style>
