<template>
  <div class="wrap">
    <div class="welimg"><img src="../assets/welcome.png"></div>
    <div class="welsay">
      <h1>欢迎你！XXX</h1>
<h2>美好的一天从微笑开始</h2>

<h2>加油、加油、加油......</h2></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap {
  width: 1200px;
  height: 600px;
  margin: 90px auto;
  
  .welimg{
    width: 270px;
    height: 208px;
    margin: 0 auto;
    padding-top: 180px;
    img{
      width: 100%;
    }
  }
  .welsay{
    width: 270px;
    height: 200px;
    margin: 20px auto;
    text-align: center;

  }
}
</style>
