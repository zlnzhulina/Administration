<template>
  <div class="container">
    <div class="search">
      <input type="text" placeholder="请输入关键字搜索" v-model="searchval">
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
              :key="index"
            >{{item.menuName}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="设置岗位权限" width="124">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="set(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="canvaswrap" v-if="canvas">
      <div class="setwrap">
        <p>
          <span>网站管理员权限设置</span>
          <img src="../../../assets/no.png" @click="exit">
        </p>
        <div class="information">
          <span>部门名称：</span>
          <p>{{row.departmentName}}</p>
        </div>
        <div class="information">
          <span>岗位名称：</span>
          <p>{{row.postName}}</p>
        </div>
        <div class="information">
          <span>岗位权限：</span>
          <div class="selectpostpower">
            <div class="header" v-for="(firstlist,firstindex) in menuList" :key="firstindex">
              <el-checkbox v-model="firstlist.checked" @change="handlechange(firstindex,firstlist.checked)">
                <span>{{firstlist.menuName}}</span>
              </el-checkbox>
              <div class="selectsecondmenu" v-for="(secondlist,secondindex) in firstlist.secondMenuList" :key="secondindex">
                <el-checkbox style="margin-left:13px;" v-model="secondlist.checked" @change="handlechangesecondlist(firstindex,secondindex,secondlist.checked)">
                  <span style="padding-left:13px;">{{secondlist.menuName}}</span>
                </el-checkbox>
                <div class="threemenuwrap">
                  <div
                    class="selectthreemenu"
                    v-for="(threelist,threeindex) in secondlist.secondMenuList"
                    :key="threeindex"
                  >
                    <el-checkbox v-model="threelist.checked" @change="handlechangethreelist(firstindex,secondindex,threeindex,threelist.checked)">
                      <span>{{threelist.menuName}}</span>
                    </el-checkbox>
                  </div>
                </div>
              </div>
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
      canvas: false,
      row: {},
      menuList: [
        {
          menuId: "MENU0001",
          menuName: "首页",
          secondMenuList: [],
          checked: false
        },
        {
          menuId: "MENU0002",
          menuName: "运营管理",
          checked: false,
          secondMenuList: [
            {
              menuId: "MENU00021",
              menuName: "活动管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000211",
                  menuName: "活动列表",
                  secondMenuList: null,
                  checked: false
                }
              ]
            },
            {
              menuId: "MENU00022",
              menuName: "奖品管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000221",
                  menuName: "奖品列表",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000222",
                  menuName: "奖品分类",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000223",
                  menuName: "奖品参数",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000224",
                  menuName: "中奖信息",
                  checked: false,
                  secondMenuList: null
                }
              ]
            },
            {
              menuId: "MENU00023",
              menuName: "内容管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000231",
                  menuName: "首页banner图",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000232",
                  menuName: "首页扫码入口图",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000233",
                  menuName: "首页活动咨询",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000234",
                  menuName: "登录页",
                  checked: false,
                  secondMenuList: null
                }
              ]
            }
          ]
        },
        {
          menuId: "MENU0003",
          menuName: "经销商用户管理",
          checked: false,
          secondMenuList: [
            {
              menuId: "MENU00031",
              menuName: "网点用户管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000311",
                  menuName: "用户列表",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000312",
                  menuName: "网点列表",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000313",
                  menuName: "批量维护",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000314",
                  menuName: "职位管理",
                  checked: false,
                  secondMenuList: null
                }
              ]
            }
          ]
        },
        {
          menuId: "MENU0004",
          menuName: "二维码管理",
          checked: false,
          secondMenuList: [
            {
              menuId: "MENU00041",
              menuName: "二维码管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000411",
                  menuName: "二维码批次",
                  checked: false,
                  secondMenuList: null
                }
              ]
            }
          ]
        },
        {
          menuId: "MENU0005",
          menuName: "商品管理",
          checked: false,
          secondMenuList: [
            {
              menuId: "MENU00051",
              menuName: "商品管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000511",
                  menuName: "商品列表",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000512",
                  menuName: "商品分类管理",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000513",
                  menuName: "商品参数管理",
                  checked: false,
                  secondMenuList: null
                }
              ]
            }
          ]
        },
        {
          menuId: "MENU0006",
          menuName: "统计",
          checked: false,
          secondMenuList: []
        },
        {
          menuId: "MENU0007",
          menuName: "系统管理",
          checked: false,
          secondMenuList: [
            {
              menuId: "MENU00071",
              menuName: "员工管理",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000711",
                  menuName: "员工列表",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000712",
                  menuName: "岗位管理",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000713",
                  menuName: "部门管理",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000714",
                  menuName: "岗位权限",
                  checked: false,
                  secondMenuList: null
                },
                {
                  menuId: "MENU000715",
                  menuName: "密码管理",
                  checked: false,
                  secondMenuList: null
                }
              ]
            },
            {
              menuId: "MENU00072",
              menuName: "日志查询",
              checked: false,
              secondMenuList: [
                {
                  menuId: "MENU000721",
                  menuName: "操作日志",
                  checked: false,
                  secondMenuList: null
                }
              ]
            }
          ]
        }
      ],

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
      isIndeterminate: true,
      //全选
      systemmanagementcheckAll: [],
      checkedsystemmanagement: []
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
        // console.log(data);
        this.jurisdictionData = data.data.data.postPage.records;
        for (var i = 0; i < this.jurisdictionData.length; i++) {}
      });
    },
    set: function(row) {
      this.canvas = true;
      // console.log(row);
      this.row = row;
    },
    //一级全选
    handlechange(index,val){
      // console.log(index);
     if(val==true){
       for(var i=0;i<this.menuList[index].secondMenuList.length;i++){
         this.menuList[index].secondMenuList[i].checked=true;
         if(this.menuList[index].secondMenuList[i].secondMenuList){
           for(var j=0;j<this.menuList[index].secondMenuList[i].secondMenuList.length;j++){
             this.menuList[index].secondMenuList[i].secondMenuList[j].checked=true;
           }
         }
       }
      //  console.log(this.menuList[index].secondMenuList);
     }else if(val==false){
        for(var i=0;i<this.menuList[index].secondMenuList.length;i++){
         this.menuList[index].secondMenuList[i].checked=false;
         if(this.menuList[index].secondMenuList[i].secondMenuList){
           for(var j=0;j<this.menuList[index].secondMenuList[i].secondMenuList.length;j++){
             this.menuList[index].secondMenuList[i].secondMenuList[j].checked=false;
           }
         }
       }
     }
      
    },
    //二级全选
    handlechangesecondlist(firstindex,index,val){
      // console.log(firstindex,index,val)
      if(val==true){
        for(var i=0;i<this.menuList[firstindex].secondMenuList[index].secondMenuList.length;i++){
          this.menuList[firstindex].secondMenuList[index].secondMenuList[i].checked=true;
        }
        // this.menuList[firstindex].secondMenuList[index]
      }else if(val==false){
          for(var i=0;i<this.menuList[firstindex].secondMenuList[index].secondMenuList.length;i++){
          this.menuList[firstindex].secondMenuList[index].secondMenuList[i].checked=false;
        }
        }
        // console.log(this.menuList[firstindex])
    },
    //三级选择
    handlechangethreelist(firstindex,secondindex,threeindex,val){
      if(val==true){
        this.menuList[firstindex].checked=true;
        this.menuList[firstindex].secondMenuList[secondindex].checked=true;
        this.menuList[firstindex].secondMenuList[secondindex].secondMenuList[threeindex].checked=true;
      }else if(val==false){
        this.menuList[firstindex].secondMenuList[secondindex].secondMenuList[threeindex].checked=false;
        for(var i=0;i<this.menuList[firstindex].secondMenuList[secondindex].secondMenuList.length;i++){
          if(this.menuList[firstindex].secondMenuList[secondindex].secondMenuList[i].checked==true){
             this.menuList[firstindex].secondMenuList[secondindex].checked=true;
             return;
            //  for(var j=0;j< this.menuList[firstindex].secondMenuList.length;j++){
            //    if(this.menuList[firstindex].secondMenuList[j].checked==true){
            //      this.menuList[firstindex].checked=true;
            //      return;
            //    }else{
            //      this.menuList[firstindex].checked=false;
            //    }
            //  }

          }else{
            this.menuList[firstindex].checked=false;
        this.menuList[firstindex].secondMenuList[secondindex].checked=false;
        this.menuList[firstindex].secondMenuList[secondindex].secondMenuList[threeindex].checked=false;
       
          }
        }
      }
    },
  
    //选择权限
    firstchange(i) {
      // console.log(i);
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
      height: 792px;
      position: absolute;
      left: 50%;
      overflow: scroll;
      margin-left: -401px;
      border: 1px solid #555;
      background: #fff;
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
            background: #efefef;
            line-height: 32px;
            // span {
            //   padding-left: 13px;
            // }
            .selectsecondmenu {
              width: 100%;
              height: auto;
              .threemenuwrap {
                width: 94%;
                margin: 0 auto;
                height: auto;
                display: flex;
                border: 1px solid #555;
                .selectthreemenu {
                  margin-left: 13px;

                  .menu {
                    display: block;
                    padding: 3px 6px 3px;
                  }
                }
              }
            }
          }
        }
      }
      .but {
        width: 40%;
        height: 40px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        button {
          width: 100px;
          height: 36px;
          border: none;
          background: #1abc9c;
          color: #fff;
        }
      }
    }
  }
}
</style>

