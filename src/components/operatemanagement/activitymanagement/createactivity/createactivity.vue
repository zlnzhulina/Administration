<template>
  <div class="container">
    <header>运营管理>创建活动</header>
    <div class="activityselect"></div>
    <div class="main">
      <div class="preview"></div>
      <div class="right">
        <div class="deposit">
          <button>保存</button>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本设置" name="first">
            <div class="basic">
              <el-form ref="form" :model="form" label-width="80px">
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="派奖设置" name="second">
            <div class="send">
              <div
                style="width:97%;height:44px;border-bottom:1px solid #ccc;line-height:48px;margin:0 auto;font-size:14px;color:#555"
              >抽奖限制</div>
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
              </div>
              <div
                style="width:97%;height:44px;border-bottom:1px solid #ccc;line-height:48px;margin:0 auto;font-size:14px;color:#555"
              >领奖限制</div>
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
                  <span style="width:80%;border-bottom:1px solid #ccc; color:red">添加车辆时需填写的字段</span>
                </p>
                <div class="select">
                  <p>
                    车牌号&nbsp;
                    <el-switch v-model="carcode"></el-switch>
                    &nbsp;{{carcode?"是":"关"}}
                  </p>
                  <p>
                    车型&nbsp;
                    <el-switch v-model="carclass"></el-switch>
                    &nbsp;{{carclass?"是":"关"}}
                  </p>
                  <p>
                    排量&nbsp;
                    <el-switch v-model="displacement"></el-switch>
                    &nbsp;{{displacement?"是":"关"}}
                  </p>
                  <p>
                    年款&nbsp;
                    <el-switch v-model="yearclass"></el-switch>
                    &nbsp;{{yearclass?"是":"关"}}
                  </p>
                  <p>
                    VIN&nbsp;
                    <el-switch v-model="VIN"></el-switch>
                    &nbsp;{{VIN?"是":"关"}}
                  </p>
                </div>
                <div class="select">
                  <p>
                    当前里程&nbsp;
                    <el-switch v-model="currentmileage"></el-switch>
                    &nbsp;{{currentmileage?"是":"关"}}
                  </p>
                  <p>
                    用油量&nbsp;
                    <el-switch v-model="oilamount"></el-switch>
                    &nbsp;{{oilamount?"是":"关"}}
                  </p>
                  <p>
                    发动机号&nbsp;
                    <el-switch v-model="enginenmb"></el-switch>
                    &nbsp;{{enginenmb?"是":"关"}}
                  </p>
                  <p>
                    发动机型号&nbsp;
                    <el-switch v-model="enginecode"></el-switch>
                    &nbsp;{{enginecode?"是":"关"}}
                  </p>
                </div>
              </div>
              <div class="receive" style="width:97%;">
                <p>
                  <span style="font-weight:bold;text-align:right">1.是否需要实名认证</span>
                  <el-radio v-model="Authenticationpeople" label="1">是</el-radio>
                  <el-radio v-model="Authenticationpeople" label="2">否</el-radio>
                </p>
                <p>
                  <span style="text-align:right">上传身份证</span>
                  <el-radio v-model="identity" label="1">是</el-radio>
                  <el-radio v-model="identity" label="2">否</el-radio>
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="奖项设置" name="third">
            <div class="prizeset">
              <div class="relation">
                <span v-for="item in relationgoods">{{item}}</span>
                <span>添加</span>
              </div>

              <div class="selectgoods">
                <p style="height:40px;">
                  <span>选择商品</span>
                  <router-link :to="addgoods">添加商品</router-link>
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
      addgoods: "/addgoods",
      addprize: "/addprize",
      creatcar: "1", //是否添加车辆
      Authentication: "1", //是否认证
      Authenticationpeople:"1",//是否需要实名认证
      identity: "1", //是否上传身份证
      activeName: "second",
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
          .select {
            width: 80%;
            display: flex;
            justify-content: space-around;
            margin-left: 90px;
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
