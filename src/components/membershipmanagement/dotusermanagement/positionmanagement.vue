<template>
    <div class="container">
        <div class="top">
            <span class="title">职位名称</span>
            <span class="addbtn" @click="showinput">添加</span>
        </div>
        <ul>
            <li v-for="(item,index) in position">
                <span>{{item}}</span>
                <div><i>编辑</i><i>删除</i></div>
                
            </li>
        </ul>
        <div class="addcontent" v-if="addinput">
            <input type="text" placeholder="请输入设备类型" v-model="addcontent">
        </div>
        <div class="ok" @click="ok">保存</div>
    </div>
</template>

<script>
export default {
//职位管理
data(){
    return {
        addcontent:"",
        addinput:false,
        position:["网点负责人","机修工","SA"]
    }
},
methods:{
showinput(){
    this.addinput=true;
},
ok(){
    this.position.push(this.addcontent);
    console.log(this.position);
    this.addcontent="";
    this.addinput=false;
}
}
}
</script>

<style lang="scss" scoped>
.container{
     width: 960px;
  height: 622px;
  position: relative;
  .top{
      width: 100%;
      height: 60px;
      background: #eaedf1;
      line-height: 60px;
      border: 1px solid #d7d7d7;
      .title{
          font-size: 16px;
          font-weight: bold;
          color: #555;
          margin-left: 43px;
      }
      .addbtn{
          display: inline-block;
          width: 105px;
          height: 35px;
          font-size: 18px;
          background: #f2f2f2;
          text-align: center;
          line-height: 35px;
          float: right;
          margin-top: 12px;
          margin-right: 14px;

      }
  }
  ul{
      width:100%;
      li{
          list-style: none;
          width: 100%;
          height: 60px;
          line-height: 60px;
          border: 1px solid #d7d7d7;
          span{
              margin-left: 106px;
              font-size: 18px;
              color: #000;
          }
          div{
              display: inline-block;
              width: 105px;height: 35px;
              line-height: 35px;
              float: right;
              margin-top: 12px;
              margin-right: 14px;
              text-align: center;
              i{
                  margin-left: 6px;
                  font-style:normal;
                  color: #169bd5;
              }
          }
      }
  }
  .addcontent{
       width: 100%;
      height: 60px;
      line-height: 60px;
      border: 1px solid #d7d7d7;
      input{
          margin-left: 106px;
          border: none;
          outline:0;
      }
  }
  .ok{
      width: 180px;
      height: 50px;
      background: #169bd5;
      margin: 80px auto;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      color: #fff;
      border-radius: 8px;
  }
}
</style>
