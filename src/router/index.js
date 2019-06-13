import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login/login'
//运营管理
import operatemanagement from '@/components/operatemanagement'
    //活动管理-活动列表
      import activitylist from '@/components/operatemanagement/activitymanagement/activitylist'
        //创建活动
        import createactivity from '@/components/operatemanagement/activitymanagement/createactivity/createactivity'
        //活动详情页面
        import activitydetails from '@/components/operatemanagement/activitymanagement/activitydetails/activitydetails'
        //出奖详情
        import awarddetails from '@/components/operatemanagement/activitymanagement/awarddetails/awarddetails'
    //奖品管理
      //奖品列表
      import prizelist from '@/components/operatemanagement/prizemanagement/prizelist'
      //奖品分类
      import prizeclass from '@/components/operatemanagement/prizemanagement/prizeclass'
        //查看奖品分类详情
        import prizeclassdetails from '@/components/operatemanagement/prizemanagement/prizeclassdetails/prizeclassdetails'
        //添加奖品(一类奖品)
        import addprize from '@/components/operatemanagement/prizemanagement/addprize/addprize'
        //添加此类奖品
        import addthisclassprize from '@/components/operatemanagement/prizemanagement/prizeclassdetails/addthisclassprize/addthisclassprize'
      //奖品参数
      import prizeattribute from '@/components/operatemanagement/prizemanagement/prizeattribute'
          //添加奖品参数
          import addprizeattribute from '@/components/operatemanagement/prizemanagement/addprizeattribute/addprizeattribute'
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
        //查看用户详情
        import userdetails from '@/components/membershipmanagement/dotusermanagement/userdetails/userdetails'
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
      //二维码列表
      import qrcodelist from '@/components/qrcodemanagement/qrcodelist'
      //创建二维码
      import addqrcode from '@/components/qrcodemanagement/addqrcode/addqrcode'
      //查看单码详情
      import singledetails from '@/components/qrcodemanagement/codedetails/singledetails'
      
      //查看双码详情
      import doubledetails from '@/components/qrcodemanagement/codedetails/doubledetails'
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
        requireAuth:true,
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
        requireAuth:true,
      },
      redirect:'operatemanagement/activitylist',
      children:[
        {
          path:"activitylist",
          name:"activitylist",
          component:activitylist,
          meta:{
            flag:true,
            requireAuth:true,
          }
        },
        {
          path:"prizelist",
          name:"prizelist",
          component:prizelist,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"prizeclass",
          name:"prizeclass",
          component:prizeclass,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"prizeattribute",
          name:"prizeattribute",
          component:prizeattribute,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"prizeinformation",
          name:"prizeinformation",
          component:prizeinformation,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"indexbanner",
          name:"indexbanner",
          component:indexbanner,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"indexcodeentrance",
          name:"indexcodeentrance",
          component:indexcodeentrance,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"indexactivityinformation",
          name:"indexactivityinformation",
          component:indexactivityinformation,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        
        {
          path:"loginverifytruthshow",
          name:"loginverifytruthshow",
          component:loginverifytruthshow,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"activityexplain",
          name:"activityexplain",
          component:activityexplain,
          meta:{
            flag:true,
            requireAuth:true,
          },
        }
      ]
    },
    //查看奖品详情
    {
      path:"/prizeclassdetails",
      name:"prizeclassdetails",
      component:prizeclassdetails,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    //添加奖品(添加一类商品)
    {
      path:"/addprize",
      name:"addprize",
      component:addprize,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    //添加此类奖品
    {
      path:"/addthisclassprize",
      name:"addthisclassprize",
      component:addthisclassprize,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    //添加奖品参数
    {
      path:"/addprizeattribute",
      name:"addprizeattribute",
      component:addprizeattribute,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:"/addactivitynews",
      name:"addactivitynews",
      component:addactivitynews,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:"/createactivity",
      name:"createactivity",
      component:createactivity,
      meta:{
        flag:true,
        requireAuth:true,
      },

    },
//查看活动详情
    {
      path:"/activitydetails",
      name:"activitydetails",
      component:activitydetails,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    //出奖详情
    {
      path:"/awarddetails",
      name:"awarddetails",
      component:awarddetails,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:'/Membershipmanagement',
      name:'Membershipmanagement',
      component:Membershipmanagement,
      meta:{
        flag:true,
        requireAuth:true,
      },
      redirect:"Membershipmanagement/userlist",
      children:[
        {
          path:"userlist",
          name:"userlist",
          component:userlist,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"dotlist",
          name:"dotlist",
          component:dotlist,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"batchmaintenance",
          name:"batchmaintenance",
          component:batchmaintenance,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"positionmanagement",
          name:"positionmanagement",
          component:positionmanagement,
          meta:{
            flag:true,
            requireAuth:true,
          },
        }
      ]
    },
    //查看用户详情
    {
      path:"/userdetails",
      name:"userdetails",
      component:userdetails,
      meta:{
        flag:true,
        requireAuth:true,
      }

    },
    
    {
      path:"/distributordetails",
      name:"distributordetails",
      component:distributordetails,
      props:true,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    {
      path:"/adddot",
      name:"adddot",
      component:adddot,
      props:true,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    {
      path:"/adduser",
      name:"adduser",
      component:adduser,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    {
      path:"/modify",
      name:"modify",
      component:modify,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    {
      path:'/qrcodemanagement',
      name:'qrcodemanagement',
      component:qrcodemanagement,
      meta:{
        flag:true,
        requireAuth:true,
      },
      redirect:"qrcodemanagement/qrcodelist",
      children:[
        {
          path:"qrcodelist",
          name:"qrcodelist",
          component:qrcodelist,
          meta:{
            flag:true,
            requireAuth:true,
          }
        }
      ]
    },
    //创建二维码批次
    {
      path:"/addqrcode",
      name:"addqrcode",
      component:addqrcode,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:"/singledetails",
      name:"singledetails",
      component:singledetails,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:"/doubledetails",
      name:"doubledetails",
      component:doubledetails,
      meta:{
        flag:true,
        requireAuth:true,
      }
    },
    {
      path:'/goodsmanagement',
      name:'goodsmanagement',
      component:goodsmanagement,
      meta:{
        flag:true,
        requireAuth:true,
      },
      redirect:"goodsmanagement/goodslist",
      children:[
        {
          path:"goodslist",
          name:"goodslist",
          component:goodslist,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"goodsclassmanagement",
          name:"goodsclassmanagement",
          component:goodsclassmanagement,
          meta:{
            flag:true,
            requireAuth:true,
          },
        },
        {
          path:"goodsparametermanagement",
          name:"goodsparametermanagement",
          component:goodsparametermanagement,
          meta:{
            flag:true,
            requireAuth:true,
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
        requireAuth:true,
      },
    },
    {
      path:'/statistics',
      name:'statistics',
      component:statistics,
      meta:{
        flag:true,
        requireAuth:true,
      },
    },
    {
      path:'/systemmanagement',
      name:'systemmanagement',
      component:systemmanagement,
      meta:{
        flag:true,
        requireAuth:true,
      },
      redirect:"systemmanagement/yglist",
      children:[{
        path:"yglist",
        name:"yglist",
        component:yglist,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },{
        path:"postmanagement",
        name:"postmanagement",
        component:postmanagement,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },{
        path:"departmentmanagement",
        name:"departmentmanagement",
        component:departmentmanagement,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },{
        path:"postpower",
        name:"postpower",
        component:postpower,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },{
        path:"pwdmanagement",
        name:"pwdmanagement",
        component:pwdmanagement,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },{
        path:"journal",
        name:"journal",
        component:journal,
        meta:{
          flag:true,
          requireAuth:true,
        },
      },]
    }
  ]
})
