<template>
  <div class="wrap">
    <div class="header">
      <b
        style="display:block;float:left;width:82px;border-left:3px solid #027db4;height:16px;font-size:12px;text-align:center;color:#666;margin-top:23px;"
      >创建批次</b>
      <span
        @click="back()"
        style="display:block;width:102px;height:30px;float:right;text-align:center;line-height:30px;border:1px solid #555;font-size:14px;margin-top:16px;"
      >返回</span>
    </div>
    <div class="main">
      <h3>
        <span>创建批次码</span>
        
      </h3>
      <ul>
        <li>
          <span><i>*</i> 码的类型：</span>
          <p style="width:176px;height:40px;display:inline-block;color:#fff;background:#1abc9c;border-radius: 0;">双码</p>
        </li>
        <li>
          <span><i>*</i> 批次名称：</span>
          <input type="text" placeholder="请输入批次名称" v-model="batchname">
        </li>
        <li>
          <span><i>*</i> 批次数量：</span>
          <input type="text" placeholder="请输入批次数量" v-model="batchnum">
        </li>
        <li style="margin-top:80px;">
            <p @click="create">创建</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
//添加二维码批次
export default {
  data() {
    return {
        batchname:"",
        batchnum:"",
        //创建二维码类型
        type:""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    create(){
      console.log(1)
        Axios({
            url:"qrcode/codeManager/createQrCode",
            method:"post",
            data:{
                batchName:this.batchname,
                count:this.batchnum,
                type:"2",
            }

        }).then(data=>{
          console.log(data)
          if(data.data.code==0){
            this.$router.push("/qrcodemanagement")
          }

        })
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;
  .header {
    width: 100%;
    height: 62px;
  }
  .main {
    width: 100%;
    height: auto;
    h3 {
      width: 100%;
      height: 60px;
      font-size: 18px;
      background: #f2f2f2;
      line-height: 60px;

      span {
        padding-left: 20px;
      }
    }
    ul{
        width: 80%;
        margin: 0 auto;
        li{
            list-style: none;
            width: 870px;
            height: 86px;
            line-height: 86px;
            margin: 0 auto;
            span{
                display: inline-block;
                width: 164px;
                height: 46px;
                text-align: right;
                font-size: 16px;
                color: #7f7f7f;
                i{
                    color: red;
                }
            }
            input{
                width: 598px;
                height:46px; 
                color: darkgray;
            }
            p{
                width: 216px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 12px;
                margin: 0 auto;
                border: 1px solid #ccc;
                border-radius: 8px;
            }
        }
    }
  }
}
</style>
