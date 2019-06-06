<template>
  <div class="container">
    <header>运营管理>创建活动</header>
    <div class="activityselect">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <div class="preview"></div>
      <div class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本设置" name="first">
            <div class="basic">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动类型">
                  <el-button>扫码领红包</el-button>
                  <el-button>滚动抽奖</el-button>
                </el-form-item>
                <el-form-item label="活动名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.date1"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <p></p>
                <!-- 展示图 -->
              </el-form>
              <el-form :model="form" label-width="100px">
                <el-form-item label="是否首页推广">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="页面链接">
                  <el-input v-model="form.alink"></el-input>
                </el-form-item>
                <el-form-item label="活动说明">
                  <el-input type="textarea" v-model="form.describe"></el-input>
                </el-form-item>
              </el-form>
              <el-form :model="form" label-width="130px">
                <el-form-item label="消费者码状态条件">
                  <el-radio-group v-model="form.customerstate">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.region" placeholder="请选择消费者码状态条件">
                    <el-option label="已关联" value="shanghai"></el-option>
                    <el-option label="已查询(防伪查询)" value="shanghai"></el-option>
                    <el-option label="已激活" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="消费者延时扫码">
                  <el-radio-group v-model="form.delay">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-input style="width:240px;" placeholder="只能输入整数"></el-input>
                  <el-select v-model="form.time" placeholder="单位" style="width:100px;">
                    <el-option label="小时" value="hour"></el-option>
                    <el-option label="分钟" value="Minute"></el-option>
                    <el-option label="秒" value="second"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="白名单">
                  <el-radio-group v-model="form.white">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="条码占用期">
                  <el-radio-group v-model="form.occupy">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-input style="width:240px;" placeholder="只能输入整数"></el-input>
                  <el-select v-model="form.occupytime" placeholder="单位" style="width:100px;">
                    <el-option label="小时" value="hour"></el-option>
                    <el-option label="分钟" value="Minute"></el-option>
                    <el-option label="秒" value="second"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="条码保护期">
                  <el-radio-group v-model="form.protect">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-input style="width:240px;" placeholder="只能输入整数"></el-input>
                  <el-select v-model="form.protecttime" placeholder="单位" style="width:100px;">
                    <el-option label="小时" value="hour"></el-option>
                    <el-option label="分钟" value="Minute"></el-option>
                    <el-option label="秒" value="second"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="next">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="派奖设置" name="second">
            <div class="send">
              <div
                style="width:97%;height:44px;border-bottom:1px solid #ccc;line-height:48px;margin:0 auto;font-size:14px;color:#555"
              >派奖规则</div>
              <div style="width:646px;heigth:90px;margin-left:30px;">
                <p style="height:52px;line-height:52px;">
                  <span style="display:inline-block;width:86px; font-weight:bold;">每人可领</span>
                  <el-checkbox>不限</el-checkbox>
                  <input
                    type="number"
                    placeholder="设置数量"
                    style="width:98px;height:24px;border:1px solid #ccc"
                  >个
                </p>
                <p style="height:52px;line-height:52px;">
                  <sapn style="display:inline-block;width:86px;font-weight:bold;">每人每天可领</sapn>
                  <el-checkbox>不限</el-checkbox>
                  <input
                    type="number"
                    placeholder="设置数量"
                    style="width:98px;height:24px;border:1px solid #ccc"
                  >个
                </p>
                <p style="height:52px;line-height:52px;">
                  <sapn style="display:inline-block;width:86px;font-weight:bold;">每辆车可领</sapn>
                  <el-checkbox>不限</el-checkbox>
                  <input
                    type="number"
                    placeholder="设置数量"
                    style="width:98px;height:24px;border:1px solid #ccc"
                  >个
                </p>
              </div>
              <div
                style="width:97%;height:44px;border-bottom:1px solid #ccc;line-height:48px;margin:0 auto;font-size:14px;color:#555"
              >领奖规则</div>
              <div class="receive" style="width:97%;">
                <p>
                  <span style="font-weight:bold;text-align:right">1.是否需要添加车辆</span>
                  <el-radio v-model="creatcar" label="1">是</el-radio>
                  <el-radio v-model="creatcar" label="2">否</el-radio>
                </p>
                <p>
                  <span style="text-align:right">是否需认证</span>
                  <el-radio v-model="Authentication" label="1">是</el-radio>
                  <el-radio v-model="Authentication" label="2">否</el-radio>
                </p>
                <p>
                  <span style="text-align:right">车辆信息</span>
                  <el-radio v-model="Authentication" label="1">是</el-radio>
                  <el-radio v-model="Authentication" label="2">否</el-radio>
                </p>
                <p
                  style="width:350px;height:80px;border:2px dashed #ccc;margin:10px 0 0 80px;"
                >开启车辆信息，用户需填写：车牌号、车型、排量、年款、当前历程、拥有量、发动机号、发动机型号、VIN等信息</p>
              </div>
              <div class="receive" style="width:97%;">
                <p>
                  <span style="font-weight:bold;text-align:right">1.是否需要实名认证</span>
                  <el-radio v-model="Authenticationpeople" label="1">是</el-radio>
                  <el-radio v-model="Authenticationpeople" label="2">否</el-radio>
                </p>
                <p>
                  <span style="text-align:right">是否分享</span>
                  <el-radio v-model="identity" label="1">是</el-radio>
                  <el-radio v-model="identity" label="2">否</el-radio>
                </p>
              </div>
            </div>
            <el-form style="text-align:center;">
              <el-form-item>
                <el-button type="primary" @click="nexttwo">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="奖项设置" name="third">
            <div class="prizeset">
              <div class="relation">
                <span v-for="item in relationgoods">{{item}}</span>
                <span @click="addgoods">添加</span>
              </div>

              <div class="selectgoods" v-if="selectgoods">
                <p style="height:40px;">
                  <span>选择商品</span>
                  <a>添加商品</a>
                </p>
                <p>
                  <el-dropdown>
                    <el-button type="primary">
                      选择商品库
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>选择商品库</el-dropdown-item>
                      <el-dropdown-item>润滑油</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary">
                      选择商品类型
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>选择商品类型</el-dropdown-item>
                      <el-dropdown-item>发动机油</el-dropdown-item>
                      <el-dropdown-item>齿轮油</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary">
                      选择商品品牌
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>选择商品品牌</el-dropdown-item>
                      <el-dropdown-item>壳牌</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary">
                      选择商品系列
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>选择商品系列</el-dropdown-item>
                      <el-dropdown-item>解放专用</el-dropdown-item>
                      <el-dropdown-item>喜力</el-dropdown-item>
                      <el-dropdown-item>劲霸</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown>
                    <el-button type="primary">
                      选择商品
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
              <div class="setprize">
                <p style="height:40px;">
                  <span>设置奖项</span>
                  <router-link :to="addprize">添加奖项</router-link>
                </p>
                <div class="tab">
                  <el-table :data="prizedata" stripe style="width: 100%">
                    <el-table-column prop="priority" label="优先级" width="68"></el-table-column>
                    <el-table-column prop="prize" label="奖品" width="100"></el-table-column>
                    <el-table-column prop="prizename" label="奖品名称" width="100"></el-table-column>
                    <el-table-column prop="Amount " label="金额" width="68"></el-table-column>
                    <el-table-column prop="prizenum" label="奖品数量" width="100"></el-table-column>
                    <el-table-column prop="setprize" label="出奖设置" width="78"></el-table-column>
                    <el-table-column prop="Tips" label="提示信息" width="188"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="48">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, tableData4)"
                          type="text"
                          size="small"
                        >移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectgoods:false,
      active: "0",
      // addgoods: "/addgoods",
      addprize: "/addprize",
      creatcar: "1", //是否添加车辆
      Authentication: "1", //是否认证
      Authenticationpeople: "1", //是否需要实名认证
      identity: "1", //是否上传身份证
      activeName: "first",
      carcode: false, //车牌号
      carclass: false, //车型
      displacement: false, //排量
      yearclass: false, //年款
      VIN: false,
      currentmileage: false, //当前里程
      oilamount: false, //用油量
      enginenmb: false, //发动机号
      enginecode: false, //发动机型号
      relationgoods: ["关联商品1", "关联商品2"],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      prizedata: [
        {
          priority: "",
          prize: "",
          prizename: "",
          Amount: "",
          prizenum: "",
          setprize: "",
          Tips: ""
        }
      ]
    };
  },
  methods: {
    handleClick() {
      alert("button click");
    },
    next() {
      if (this.active++ > 3) this.active = 0;
      this.activeName = "second";
    },
    nexttwo() {
      if (this.active++ > 3) this.active = 0;
      this.activeName = "third";
    },
    addgoods(){
      this.selectgoods=true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1120px;
  margin: 0 auto;
  padding-top: 90px;

  header {
    width: 1120px;
    height: 58px;
    font-size: 16px;
    color: #7f7f7f;
    line-height: 58px;
  }
  .activityselect {
    width: 1120px;
    height: 90px;
    border-bottom: 3px solid #f2f2f2;
  }
  .main {
    width: 1120px;
    height: 640px;
    .preview {
      width: 338px;
      height: 600px;
      background: firebrick;
      float: left;
      .bgselect {
        width: 20px;
        height: 13px;
        font-size: 1px;
        color: #fff;
      }
    }
    .right {
      width: 764px;
      float: right;
      .deposit {
        width: 100%;
        height: 60px;
        line-height: 60px;
        button {
          width: 126px;
          height: 30px;
          background: #169bd5;
          border: none;
          font-size: 12px;
          color: #fff;
          margin-left: 638px;
        }
      }
      .basic {
        width: 100%;
        .el-form {
          p {
            width: 100%;
            height: 2px;
            background: #ccc;
          }
        }
      }
      .send {
        width: 764px;
        .receive {
          width: 97%;
          margin-left: 13px;
          p {
            width: 100%;
            height: 32px;
            line-height: 32px;
            span {
              display: inline-block;
              width: 130px;
            }
          }
        }
      }
      .prizeset {
        width: 764px;
        .relation {
          width: 100%;
          height: 58px;
          border-bottom: 1px solid #ccc;
          span {
            display: block;
            float: left;
            width: 76px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            background: #f2f2f2;
            color: #555;
            margin-right: 13px;
          }
        }
        .selectgoods {
          width: 100%;
          height: 80px;
          p {
            width: 100%;
            .el-dropdown {
              vertical-align: top;
              .el-button {
                background: #fff;
                border: 1px solid #ccc;
                color: #555;
                padding: 12px 10px;
              }
            }
            .el-dropdown + .el-dropdown {
              margin-left: 15px;
            }
            .el-icon-arrow-down {
              font-size: 12px;
            }
            span {
              display: block;
              width: 76px;
              height: 40px;
              float: left;
              text-align: center;
              line-height: 40px;
              font-size: 12px;
              color: #555;
            }
            a {
              display: block;
              float: right;
              width: 76px;
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
          }
        }
        .setprize {
          width: 100%;
          p {
            span {
              display: block;
              width: 76px;
              height: 40px;
              float: left;
              text-align: center;
              line-height: 40px;
              font-size: 12px;
              color: #555;
            }
            a {
              display: block;
              float: right;
              width: 76px;
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
          }
          .tab {
            .el-table {
              th > .cell {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
