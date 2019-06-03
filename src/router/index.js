import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login/login'
//运营管理
import operatemanagement from '@/components/operatemanagement'
    //活动管理-活动列表
      import activitylist from '@/components/operatemanagement/activitymanagement/activitylist'
        //
        import createactivity from '@/components/operatemanagement/activitymanagement/createactivity/createactivity'
    //奖品管理
      //奖品列表
      import prizelist from '@/components/operatemanagement/prizemanagement/prizelist'
      //奖品分类
      import prizeclass from '@/components/operatemanagement/prizemanagement/prizeclass'
      //奖品参数
      import prizeattribute from '@/components/operatemanagement/prizemanagement/prizeattribute'
      //中奖信息
      import prizeinformation from '@/components/operatemanagement/prizemanagement/prizeinformation'
    //内容管理
      //首页BANNER
      import indexbanner from '@/components/operatemanagement/contentmanagment/indexbanner'
      //首页扫码入口
      import indexcodeentrance from '@/components/operatemanagement/contentmanagment/indexcodeentrance'
      //首页活动资讯
      import indexactivityinformation from '@/components/operatemanagement/contentmanagment/indexactivityinformation'
          //添加资讯
          import addactivitynews from '@/components/operatemanagement/contentmanagment/addactivitynews/addactivitynews'
      //登陆页验真展示
      import loginverifytruthshow from '@/components/operatemanagement/contentmanagment/loginverifytruthshow'
      //消费者活动说明
      import activityexplain from '@/components/operatemanagement/contentmanagment/activityexplain'
// 网点会员管理
import Membershipmanagement from '@/components/membershipmanagement'
      //网点用户列表
      import userlist from '@/components/membershipmanagement/dotusermanagement/userlist'
        //添加用户
        import adduser from '@/components/membershipmanagement/dotusermanagement/adduser/adduser'
      //网点列表
      import dotlist from '@/components/membershipmanagement/dotusermanagement/dotlist'
         //查看网点详情
         import distributordetails from '@/components/membershipmanagement/dotusermanagement/distributordetails/distributordetails'
            //编辑网点详细内部信息
            import modify from '@/components/membershipmanagement/dotusermanagement/distributordetails/modify/modify'
         //添加网点（编辑网点）
         import adddot from '@/components/membershipmanagement/dotusermanagement/adddot/adddot'
         //职位管理
      import positionmanagement from '@/components/membershipmanagement/dotusermanagement/positionmanagement'
      //批量维护
      import batchmaintenance from '@/components/membershipmanagement/dotusermanagement/Batchmaintenance'
// 二维码管理
import qrcodemanagement from '@/components/qrcodemanagement'
//商品管理 
import goodsmanagement from '@/components/goodsmanagement'
    //商品列表
     import goodslist from '@/components/goodsmanagement/goodsmanagement/goodslist'
        //添加商品
        import addgoods from '@/components/goodsmanagement/goodsmanagement/addgoods/addgoods'
     //商品分类管理
     import goodsclassmanagement from '@/components/goodsmanagement/goodsmanagement/goodsclassmanagement'
     //商品参数管理
     import goodsparametermanagement from '@/components/goodsmanagement/goodsmanagement/goodsparametermanagement'

// 统计
import statistics from '@/components/statistics'
//系统管理
import systemmanagement from '@/components/systemmanagement'
  //员工列表
  import yglist from '@/components/systemmanagement/ygmanagement/yglist'
  //岗位管理
  import postmanagement from '@/components/systemmanagement/ygmanagement/postmanagement'
  //部门管理
  import departmentmanagement from '@/components/systemmanagement/ygmanagement/departmentmanagement'
  //岗位权限
  import postpower from '@/components/systemmanagement/ygmanagement/postpower'
  //密码管理 
  import pwdmanagement from '@/components/systemmanagement/ygmanagement/pwdmanagement'
  //操作日志
  import journal from '@/components/systemmanagement/journalselect/journal'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        flag:true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        floag:false
      }
    },
    {
      path:'/operatemanagement',
      name: 'operatemanagement',
      component: operatemanagement,
      meta:{
        flag:true,
      },
      redirect:'operatemanagement/activitylist',
      children:[
        {
          path:"activitylist",
          name:"activitylist",
          component:activitylist,
          meta:{
            flag:true,
          }
        },
        {
          path:"prizelist",
          name:"prizelist",
          component:prizelist,
          meta:{
            flag:true,
          },
        },
        {
          path:"prizeclass",
          name:"prizeclass",
          component:prizeclass,
          meta:{
            flag:true,
          },
        },
        {
          path:"prizeattribute",
          name:"prizeattribute",
          component:prizeattribute,
          meta:{
            flag:true,
          },
        },
        {
          path:"prizeinformation",
          name:"prizeinformation",
          component:prizeinformation,
          meta:{
            flag:true,
          },
        },
        {
          path:"indexbanner",
          name:"indexbanner",
          component:indexbanner,
          meta:{
            flag:true,
          },
        },
        {
          path:"indexcodeentrance",
          name:"indexcodeentrance",
          component:indexcodeentrance,
          meta:{
            flag:true,
          },
        },
        {
          path:"indexactivityinformation",
          name:"indexactivityinformation",
          component:indexactivityinformation,
          meta:{
            flag:true,
          },
        },
        
        {
          path:"loginverifytruthshow",
          name:"loginverifytruthshow",
          component:loginverifytruthshow,
          meta:{
            flag:true,
          },
        },
        {
          path:"activityexplain",
          name:"activityexplain",
          component:activityexplain,
          meta:{
            flag:true,
          },
        }
      ]
    },
    {
      path:"/addactivitynews",
      name:"addactivitynews",
      component:addactivitynews,
      meta:{
        flag:true
      }
    },
    {
      path:"/createactivity",
      name:"createactivity",
      component:createactivity,
      meta:{
        flag:true,
      },

    },

    {
      path:'/Membershipmanagement',
      name:'Membershipmanagement',
      component:Membershipmanagement,
      meta:{
        flag:true,
      },
      redirect:"Membershipmanagement/userlist",
      children:[
        {
          path:"userlist",
          name:"userlist",
          component:userlist,
          meta:{
            flag:true,
          },
        },
        {
          path:"dotlist",
          name:"dotlist",
          component:dotlist,
          meta:{
            flag:true,
          },
        },
        {
          path:"batchmaintenance",
          name:"batchmaintenance",
          component:batchmaintenance,
          meta:{
            flag:true,
          },
        },
        {
          path:"positionmanagement",
          name:"positionmanagement",
          component:positionmanagement,
          meta:{
            flag:true,
          },
        }
      ]
    },
    
    {
      path:"/distributordetails",
      name:"distributordetails",
      component:distributordetails,
      props:true,
      meta:{
        flag:true,
      },
    },
    {
      path:"/adddot",
      name:"adddot",
      component:adddot,
      props:true,
      meta:{
        flag:true,
      },
    },
    {
      path:"/adduser",
      name:"adduser",
      component:adduser,
      meta:{
        flag:true,
      },
    },
    {
      path:"/modify",
      name:"modify",
      component:modify,
      meta:{
        flag:true,
      },
    },
    {
      path:'/qrcodemanagement',
      name:'qrcodemanagement',
      component:qrcodemanagement,
      meta:{
        flag:true,
      },
    },
    
    {
      path:'/goodsmanagement',
      name:'goodsmanagement',
      component:goodsmanagement,
      meta:{
        flag:true,
      },
      redirect:"goodsmanagement/goodslist",
      children:[
        {
          path:"goodslist",
          name:"goodslist",
          component:goodslist,
          meta:{
            flag:true,
          },
        },
        {
          path:"goodsclassmanagement",
          name:"goodsclassmanagement",
          component:goodsclassmanagement,
          meta:{
            flag:true,
          },
        },
        {
          path:"goodsparametermanagement",
          name:"goodsparametermanagement",
          component:goodsparametermanagement,
          meta:{
            flag:true,
          },
        }
      ]
    },
    {
      path:"/addgoods",
      name:"addgoods",
      component:addgoods,
      meta:{
        flag:true,
      },
    },
    {
      path:'/statistics',
      name:'statistics',
      component:statistics,
      meta:{
        flag:true,
      },
    },
    {
      path:'/systemmanagement',
      name:'systemmanagement',
      component:systemmanagement,
      meta:{
        flag:true,
      },
      redirect:"systemmanagement/yglist",
      children:[{
        path:"yglist",
        name:"yglist",
        component:yglist,
        meta:{
          flag:true,
        },
      },{
        path:"postmanagement",
        name:"postmanagement",
        component:postmanagement,
        meta:{
          flag:true,
        },
      },{
        path:"departmentmanagement",
        name:"departmentmanagement",
        component:departmentmanagement,
        meta:{
          flag:true,
        },
      },{
        path:"postpower",
        name:"postpower",
        component:postpower,
        meta:{
          flag:true,
        },
      },{
        path:"pwdmanagement",
        name:"pwdmanagement",
        component:pwdmanagement,
        meta:{
          flag:true,
        },
      },{
        path:"journal",
        name:"journal",
        component:journal,
        meta:{
          flag:true,
        },
      },]
    }
  ]
})
