<template>
  <div class="container">
    <div class="search">
      <input type="text" placeholder="请输入关键字搜索" v-module="searchval">
    </div>
    <div class="tab">
      <el-table
        :header-cell-style="{background:'#9decff',height:'32'}"
        ref="multipleTable"
        :data="jurisdictionData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- stripe="true" -->
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="departmentName" label="部门" width="124"></el-table-column>
        <el-table-column prop="postName" label="岗位" width="124"></el-table-column>
        <el-table-column prop="menuList" label="权限" show-overflow-tooltip></el-table-column>

        <el-table-column fixed="right" label="设置岗位权限" width="124">
          <template slot-scope="scope">
          <el-button type="text" size="small" @click="set(scope.$index,scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="canvas" v-if="canvas">
        <div class="setwrap">
          <p>网站管理员权限设置</p>
          <div class="selectjurisdictionclass">
            <span>&nbsp;&nbsp;&nbsp;网站管理员：</span>
            <el-radio-group v-model="selectjurisdictionclass">
              <el-radio :label="3">所有权限</el-radio>
              <el-radio :label="6">部分权限</el-radio>
              <el-radio :label="9">没有权限</el-radio>
            </el-radio-group>
          </div>
          <ul>
            <li>
              <div class="all">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="designcheckAll"
                  @change="designAllChange"
                ></el-checkbox>
              </div>
              <div class="option">
                <el-checkbox-group v-model="checkeddesign" @change="handleCheckedDesignChange">
                  <el-checkbox v-for="item in design" :label="design" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li>
              <div class="all">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="designcheckAll"
                  @change="designAllChange"
                ></el-checkbox>
              </div>
              <div class="option">
                <el-checkbox-group v-model="checkeddesign" @change="handleCheckedDesignChange">
                  <el-checkbox v-for="item in design" :label="design" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li>
              <div class="all">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="designcheckAll"
                  @change="designAllChange"
                ></el-checkbox>
              </div>
              <div class="option">
                <el-checkbox-group v-model="checkeddesign" @change="handleCheckedDesignChange">
                  <el-checkbox v-for="item in design" :label="design" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li>
              <div class="all">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="designcheckAll"
                  @change="designAllChange"
                ></el-checkbox>
              </div>
              <div class="option">
                <el-checkbox-group v-model="checkeddesign" @change="handleCheckedDesignChange">
                  <el-checkbox v-for="item in design" :label="design" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li>
              <div class="all">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="designcheckAll"
                  @change="designAllChange"
                ></el-checkbox>
              </div>
              <div class="option">
                <el-checkbox-group v-model="checkeddesign" @change="handleCheckedDesignChange">
                  <el-checkbox v-for="item in design" :label="design" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
          </ul>
          <div class="but">
            <button @click="sure">保存</button>
            <button @click="exit">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  // 岗位权限
  data() {
    return {
      searchval:"",
      canvas: false,
      
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
      isIndeterminate: true
    };
  },
  created(){
    this.postpowerlist();
  },
  watch:{
    // searchval(val){
    //   this.
    // }
  },
  methods: {
   
    postpowerlist(){
      Axios({
        url:"api/systemManager/menuEntList",
        method:"get",
        params:{
          pageNo:"1",
          pageSize:"10",
        }
      }).then(data=>{
        console.log(data);
        this.jurisdictionData=data.data.data.postPage.records
      })
    },
    set: function(index,row) {
      this.canvas = true;

    },
    designAllChange: function(val) {
      this.checkeddesign = val ? design : [];
      this.isIndeterminate = false;
    },
    handleCheckedDesignChange(value) {
      let checkedCount = value.length;
      this.designcheckAll = checkedCount === this.design.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.design.length;
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
  width: 960px;
  height: 622px;
  
  .search {
    width: 960px;
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
    width: 960px;
    height: 536px;
    position: relative;
    .el-table {
      th > .cell {
        text-align: center;
      }
    }
    .canvas {
      width: 100%;
      height: 100%;

      position: absolute;
      top: -20px;
      .setwrap {
        width: 620px;
        height: 532px;
        position: absolute;
        left: 50%;
        margin-left: -310px;
        background: rgba(248, 241, 241, 1);
        z-index: 9999;
        p {
          width: 612px;
          height: 28px;
          line-height: 28px;
          padding-left: 8px;
          font-size: 12px;
          background: #7a8899;
          color: #fff;
        }
        .selectjurisdictionclass {
          width: 562px;
          height: 74px;
          line-height: 74px;
        }
        ul {
          width: 562px;
          height: 322px;
          margin: 0 auto;
          li {
            width: 100%;
            height: 64px;
            .all {
              width: 122px;
              height: 64px;
              line-height: 64px;
              float: left;
              border: 1px solid #ccc;
            }
            .option {
              float: right;
              width: 437px;
              height: 64px;
              line-height: 64px;
              display: flex;
              justify-content: space-between;
              border: 1px solid #ccc;
              border-left: none;
            }
          }
        }
        .but {
          width: 140px;
          height: 52px;
          margin: 58px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          button {
            width: 51px;
            height: 26px;
          }
        }
      }
    }
  }
}
</style>

