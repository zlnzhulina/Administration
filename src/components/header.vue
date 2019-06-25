<template>
    <div class="header">
        <p class="logo">解放渠道产品分销系统</p>
        <ul>
            <li v-for="(item,index) in navlist">
                <router-link :to="{name:item.name}">{{item.title}}</router-link>
            </li>
        </ul>
        <ul class="search">
            <li><img style="width:30px;margin-right:8px;" src="../assets/wode.png"/>{{name}}</li>
            
            <li><img src="../assets/shouye.png" @click="first"/></li>
            <li><img src="../assets/zhedie.png"/></li>
            <li><img src="../assets/nitification.png"/></li>
            <li><img src="../assets/guanbi.png" @click="exit"/></li>
        </ul>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
            name:"",
            navlist:[
                    {title:"首页",name:"index"},
                    {title:"运营管理",name:"operatemanagement"},
                    {title:"网点用户管理",name:"Membershipmanagement"},
                    {title:"二维码管理",name:"qrcodemanagement"},
                    {title:"商品管理",name:"goodsmanagement"},
                    {title:"统计",name:"statistics"},
                    {title:"系统管理",name:"systemmanagement"}
                ]
        }
    },
    created(){
        this.name=localStorage.getItem("name")
    },
    methods:{
        first(){
            this.$router.push("/index");
        },
        exit(){
             this.$confirm('请确定是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push("/login");
            localStorage.removeItem('name');
            localStorage.removeItem('ADMINLOGINTOKEN');
            if(!localStorage.getItem('ADMINLOGINTOKEN')){
                 this.$message({
            type: 'success',
            message: '成功退出登录!'
          });
            }
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出登录'
          });          
        });
        }
    }
} 
</script>
<style lang="scss"scoped>
*{
    margin: 0;
    padding: 0;
}
.header{
    width: 100%;
    height: 60px;
    background: #595e6c;
    margin: -0 auto;
    position: absolute;
    top: 0;
    .logo{
        width: 250px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        float: left;
        color: rgba(255, 255, 255, 0.801);
    }
    ul{
        width: 543px;
        height: 60px;
        display: flex;
        float: left;
        justify-content: space-between;
        li{
            line-height: 60px;
            list-style: none;
            a{
                color: #fff;
                font-size: 14px;
            }
        }

    }
    .search{
        width: auto;
        height: 60px;
        line-height: 60px;
        float: right;
        //background: #eee;
        // margin-left: 50px;
        li{
            padding: 0 10px 0 10px;
            justify-content:flex-start;
            line-height: 60px;
            color: #fff;
            img{
                width: 16px;
                vertical-align: middle;
            }
            
        }
    }
}

</style>
