<template>
    <div class="header">
        <p class="logo">解放渠道产品分销系统</p>
        <ul>
            <li v-for="(item,index) in navlist">
                <router-link :to="{name:item.name}">{{item.title}}</router-link>
            </li>
        </ul>
        <div class="search">
            <input type="text" placeholder="请输入要操作的事件">
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
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
    }
} 
</script>
<style lang="scss"scoped>
*{
    margin: 0;
    padding: 0;
}
.header{
    width: 1200px;
    height: 60px;
    background: #f2f2f2;
    margin: -0 auto;
    position: absolute;
    left: 50%;
    margin-left: -600px;
    top: 30px;
    .logo{
        width: 250px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        float: left;
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
                color: #169bd5;
                font-size: 14px;
            }
        }

    }
    .search{
        width: 230px;
        height: 60px;
        line-height: 60px;
        float: left;
        margin-left: 50px;
        input{
            width: 200px;
            height: 35px;
            border-radius: 20px;
            border: none;
            margin: 0 auto;
            font-size: 12px;
            color: darkgrey;
            padding-left:5px; 
        }
    }
}

</style>
