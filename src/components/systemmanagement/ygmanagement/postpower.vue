<template>
  <div class="container">
    <div class="search">
      <input type="text" placeholder="请输入关键字搜索" v-module="searchval">
    </div>
    <div class="tab">
      <el-table
        :header-cell-style="{background:'#ccd1e0',height:'32'}"
        ref="multipleTable"
        :data="jurisdictionData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
      >
        <!-- stripe="true" -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="departmentName" label="部门" width="124"></el-table-column>
        <el-table-column prop="postName" label="岗位" width="124"></el-table-column>
        <el-table-column prop="menuList" label="权限">
          <template slot-scope="scope">
            <span
              style="padding:0 8px 0;"
              v-for="(item,index) in scope.row.menuList"
            >{{item.menuName}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="设置岗位权限" width="124">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="set(scope.$index,scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="canvaswrap" v-if="canvas">
      <div class="setwrap">
        <p>
          <span>网站管理员权限设置</span>
          <img src="@/assets/no.png">
        </p>
        <div class="information">
          <span>部门名称：</span>
          <p></p>
        </div>
        <div class="information">
          <span>岗位名称：</span>
          <p></p>
        </div>
        <div class="information">
          <span>岗位权限：</span>
          <div class="selectpostpower">
            <div class="header">

              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="systemmanagementcheckAll"
                @change="handleCheckAllChange"
              >运营管理</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedsystemmanagement" @change="handleCheckedsystemmanagementChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
              
            </div>
            <div></div>
            <div class="header">
              <span>网点用户管理</span>
            </div>
            <div class="header">
              <span>二维码管理</span>
            </div>
            <div class="header">
              <span>商品管理</span>
            </div>
            <div class="header">
              <span>统计</span>
            </div>
            <div class="header">
              <span>系统管理</span>
            </div>
          </div>
        </div>

        <div class="but">
          <button @click="sure">保存</button>
          <button @click="exit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  // 岗位权限
  data() {
    return {
      searchval: "",
    cities:["1","2","3"],
      canvas: false,
       data: {
          menuList: [
            {
              menuId: "MENU0001",
              menuName: "首页",
              superMenuId: null,
              url: null,
              secondMenuList: []
            },
            {
              menuId: "MENU0002",
              menuName: "运营管理",
              superMenuId: null,
              url: null,
              secondMenuList: [
                {
                  menuId: "MENU00021",
                  menuName: "活动管理",
                  superMenuId: "MENU0002",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000211",
                      menuName: "活动列表",
                      superMenuId: "MENU00021",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                },
                {
                  menuId: "MENU00022",
                  menuName: "奖品管理",
                  superMenuId: "MENU0002",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000221",
                      menuName: "奖品列表",
                      superMenuId: "MENU00022",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000222",
                      menuName: "奖品分类",
                      superMenuId: "MENU00022",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000223",
                      menuName: "奖品参数",
                      superMenuId: "MENU00022",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000224",
                      menuName: "中奖信息",
                      superMenuId: "MENU00022",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                },
                {
                  menuId: "MENU00023",
                  menuName: "内容管理",
                  superMenuId: "MENU0002",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000231",
                      menuName: "首页banner图",
                      superMenuId: "MENU00023",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000232",
                      menuName: "首页扫码入口图",
                      superMenuId: "MENU00023",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000233",
                      menuName: "首页活动咨询",
                      superMenuId: "MENU00023",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000234",
                      menuName: "登录页",
                      superMenuId: "MENU00023",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                }
              ]
            },
            {
              menuId: "MENU0003",
              menuName: "经销商用户管理",
              superMenuId: null,
              url: null,
              secondMenuList: [
                {
                  menuId: "MENU00031",
                  menuName: "网点用户管理",
                  superMenuId: "MENU0003",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000311",
                      menuName: "用户列表",
                      superMenuId: "MENU00031",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000312",
                      menuName: "网点列表",
                      superMenuId: "MENU00031",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000313",
                      menuName: "批量维护",
                      superMenuId: "MENU00031",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000314",
                      menuName: "职位管理",
                      superMenuId: "MENU00031",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                }
              ]
            },
            {
              menuId: "MENU0004",
              menuName: "二维码管理",
              superMenuId: null,
              url: null,
              secondMenuList: [
                {
                  menuId: "MENU00041",
                  menuName: "二维码管理",
                  superMenuId: "MENU0004",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000411",
                      menuName: "二维码批次",
                      superMenuId: "MENU00041",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                }
              ]
            },
            {
              menuId: "MENU0005",
              menuName: "商品管理",
              superMenuId: null,
              url: null,
              secondMenuList: [
                {
                  menuId: "MENU00051",
                  menuName: "商品管理",
                  superMenuId: "MENU0005",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000511",
                      menuName: "商品列表",
                      superMenuId: "MENU00051",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000512",
                      menuName: "商品分类管理",
                      superMenuId: "MENU00051",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000513",
                      menuName: "商品参数管理",
                      superMenuId: "MENU00051",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                }
              ]
            },
            {
              menuId: "MENU0006",
              menuName: "统计",
              superMenuId: null,
              url: null,
              secondMenuList: []
            },
            {
              menuId: "MENU0007",
              menuName: "系统管理",
              superMenuId: null,
              url: null,
              secondMenuList: [
                {
                  menuId: "MENU00071",
                  menuName: "员工管理",
                  superMenuId: "MENU0007",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000711",
                      menuName: "员工列表",
                      superMenuId: "MENU00071",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000712",
                      menuName: "岗位管理",
                      superMenuId: "MENU00071",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000713",
                      menuName: "部门管理",
                      superMenuId: "MENU00071",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000714",
                      menuName: "岗位权限",
                      superMenuId: "MENU00071",
                      url: null,
                      secondMenuList: null
                    },
                    {
                      menuId: "MENU000715",
                      menuName: "密码管理",
                      superMenuId: "MENU00071",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                },
                {
                  menuId: "MENU00072",
                  menuName: "日志查询",
                  superMenuId: "MENU0007",
                  url: null,
                  secondMenuList: [
                    {
                      menuId: "MENU000721",
                      menuName: "操作日志",
                      superMenuId: "MENU00072",
                      url: null,
                      secondMenuList: null
                    }
                  ]
                }
              ]
            }
          ]
        },
      jurisdictionData: [
        {
          department: "研发部",
          post: "开发工程师",
          jurisdiction: ""
        }
      ],
      selectjurisdictionclass: 3,
      designcheckAll: false,
      checkeddesign: [],
      design: ["网站设计", "模块管理", "微信设置"],
      isIndeterminate: true,
      //全选
      systemmanagementcheckAll:[],
       checkedsystemmanagement:[],
    };
  },
  created() {
    this.postpowerlist();
  },
  watch: {
    // searchval(val){
    //   this.
    // }
  },
  methods: {
    postpowerlist() {
      Axios({
        url: "api/systemManager/menuEntList",
        method: "get",
        params: {
          pageNo: "1",
          pageSize: "10"
        }
      }).then(data => {
        console.log(data);
        this.jurisdictionData = data.data.data.postPage.records;
        for (var i = 0; i < this.jurisdictionData.length; i++) {}
      });
    },
    set: function(index, row) {
      this.canvas = true;
    },
    designAllChange: function(val) {
      this.checkeddesign = val ? design : [];
      this.isIndeterminate = false;
    },
    handleCheckedsystemmanagementChange(value) {
     console.log(value)
    },
    sure: function() {
      this.canvas = false;
      //保存  进行ajax请求，保存信息
    },
    exit: function() {
      this.canvas = false;
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .search {
    width: 100%;
    height: 58px;
    line-height: 60px;
    overflow: hidden;
    text-align: right;
    input {
      width: 240px;
      height: 24px;
      border: 1px solid #009dda;
      font-size: 12px;
      border-radius: 7px;
    }
  }
  .tab {
    width: 100%;
    height: 536px;
    position: relative;
    .el-table {
      th > .cell {
        text-align: center;
      }
    }
  }
  .canvaswrap {
    width: 100%;
    height: 100%;
    background: rgba(#ccc, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 111;
    .setwrap {
      width: 802px;
      height: auto;
      position: absolute;
      left: 50%;
      margin-left: -401px;
      background: rgba(248, 241, 241, 1);
      z-index: 9999;
      p {
        width: 100%;
        height: 35px;
        line-height: 35px;

        font-size: 12px;
        background: #eee;
        color: #555;
        span {
          padding-left: 13px;
          font-size: 14px;
        }
        img {
          float: right;
          margin-right: 13px;
          margin-top: 8px;
        }
      }
      .information {
        width: 682px;
        height: auto;
        display: flex;
        justify-content: space-around;
        margin: 20px auto;
        span {
          display: block;
          height: 30px;
          line-height: 30px;
        }
        p {
          width: 550px;
          height: 30px;
          background: #ebebe4;
        }
        .selectpostpower {
          width: 548px;
          height: auto;
          border: 1px solid #6f6f6f;
          .header {
            width: 100%;
            height: 32px;
            background: #efefef;
            line-height: 32px;
            span {
              padding-left: 13px;
            }
          }
        }
      }
    }
  }
}
</style>

