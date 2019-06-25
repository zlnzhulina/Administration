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
      <!-- 预览区 -->
      <div class="preview">
        <div class="one" v-show="one">
          <div class="bgimg">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlebgimgSuccess"
            >
              <img v-if="imagebgUrl" :src="imagebgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="titleimg">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handletitleimgSuccess"
            >
              <img v-if="imagetitleUrl" :src="imagetitleUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <div class="codebtn">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlecodebtnSuccess"
            >
              <img v-if="imagecodebtnUrl" :src="imagecodebtnUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <div class="bonus">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlebonusSuccess"
            >
              <img v-if="imagebonusUrl" :src="imagebonusUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="two" v-show="two">
          <div class="bgimg">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlereceivebgimgSuccess"
            >
              <img v-if="imagereceivebgUrl" :src="imagereceivebgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="titleimg">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlereceivetitleimgSuccess"
            >
              <img v-if="imagereceivetitleUrl" :src="imagereceivetitleUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="amount">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlereceiveamountimgSuccess"
            >
              <img v-if="imagereceiveamountUrl" :src="imagereceiveamountUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="draw">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handlereceivedrawimgSuccess"
            >
              <img v-if="imagereceivedrawUrl" :src="imagereceivedrawUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="three" v-show="three">
          <div class="title">
            <el-upload
              class="avatar-uploader"
              action="api/upload/uploadImage"
              :show-file-list="false"
              :on-success="handleactivitytitleSuccess"
            >
              <img v-if="imageactivitytitleUrl" :src="imageactivitytitleUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="right">
        <el-tabs v-model="activeName" @tab-click="check">
          <el-tab-pane label="基本设置" name="first">
            <div class="basic">
              <el-form ref="form" :model="activity" label-width="80px">
                <el-form-item label="活动类型">
                  <span
                    @click="redpacket"
                    :class="type==1?'selection':''"
                    style="width:111px;height:39px;display:inline-block;border:1px solid #ccc;text-align:center;"
                  >扫码领红包</span>
                  <span
                    @click="rollingdraw"
                    :class="type==2?'selection':''"
                    style="width:111px;height:39px;display:inline-block;border:1px solid #ccc;text-align:center;"
                  >滚动抽奖</span>
                </el-form-item>
                <el-form-item label="活动名称">
                  <el-input v-model="activity.activityName"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      format="yyyy--MM--dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="activity.startTime"
                      @change="startime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="activity.endTime"
                      format="yyyy--MM--dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <p></p>
                <!-- 展示图 -->
              </el-form>

              <el-form label-width="100px">
                <!--占位 -->
                <el-form-item></el-form-item>
                <el-form-item label="页面链接">
                  <el-input v-model="activity.page"></el-input>
                </el-form-item>
              </el-form>
              <el-form :model="activity" label-width="130px">
                <el-form-item label="消费者码状态条件">
                  <el-radio-group v-model="usercodetype">
                    <el-radio label="-1">否</el-radio>
                    <el-radio label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-show="usercodetype == -1 ? false:true">
                  <el-select v-model="activity.isQrcodeStatus" placeholder="请选择消费者码状态条件">
                    <el-option label="未关联" value="1"></el-option>
                    <el-option label="已关联" value="2"></el-option>
                    <el-option label="已查询(防伪查询)" value="6"></el-option>
                    <el-option label="已激活" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="消费者延时扫码">
                  <el-radio-group v-model="userdelayed">
                    <el-radio value="0" label="0">否</el-radio>
                    <el-radio value="1" label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-show="userdelayed==0?false:true">
                  <el-input style="width:240px;" placeholder="只能输入整数" v-model="activity.scanTime"></el-input>
                  <template>
                    <span>小时</span>
                  </template>
                </el-form-item>
                <el-form-item label="白名单">
                  <el-radio-group v-model="activity.isWhiteList">
                    <el-radio value="-1" label="-1">否</el-radio>
                    <el-radio value="1" label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="条码占用期">
                  <el-radio-group v-model="isbarTakeUpTime">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-show="isbarTakeUpTime==0?false:true">
                  <el-input
                    style="width:240px;"
                    placeholder="只能输入整数"
                    v-model="activity.barTakeUpTime"
                  ></el-input>
                  <template>
                    <span>小时</span>
                  </template>
                </el-form-item>
                <el-form-item label="条码保护期">
                  <el-radio-group v-model="isbarProtectTime">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-show="isbarProtectTime==0?false:true">
                  <el-input
                    type="number"
                    style="width:240px;"
                    placeholder="只能输入整数"
                    v-model="activity.barProtectTime"
                  ></el-input>
                  <template>
                    <span>小时</span>
                  </template>
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
                    v-model="activity.personCount"
                  >个
                </p>
                <p style="height:52px;line-height:52px;">
                  <span style="display:inline-block;width:86px;font-weight:bold;">每人每天可领</span>
                  <el-checkbox>不限</el-checkbox>
                  <input
                    type="number"
                    placeholder="设置数量"
                    style="width:98px;height:24px;border:1px solid #ccc"
                    v-model="activity.personDayCount"
                  >个
                </p>
                <p style="height:52px;line-height:52px;">
                  <span style="display:inline-block;width:86px;font-weight:bold;">每辆车可领</span>
                  <el-checkbox>不限</el-checkbox>
                  <input
                    type="number"
                    placeholder="设置数量"
                    style="width:98px;height:24px;border:1px solid #ccc"
                    v-model="activity.catCount"
                  >个
                </p>
              </div>
              <div
                style="width:97%;height:44px;border-bottom:1px solid #ccc;line-height:48px;margin:0 auto;font-size:14px;color:#555"
              >领奖规则</div>
              <div class="receive" style="width:97%;">
                <p>
                  <span style="font-weight:bold;text-align:right">1.是否需要添加车辆</span>
                  <el-radio v-model="activity.needCar" label="1" value="1">是</el-radio>
                  <el-radio v-model="activity.needCar" label="0" value="0">否</el-radio>
                </p>
                <p>
                  <span style="text-align:right">是否需认证</span>
                  <el-radio v-model="activity.needAuthentication" label="1" value="1">是</el-radio>
                  <el-radio v-model="activity.needAuthentication" label="0" value="0">否</el-radio>
                </p>
                <p
                  style="width:350px;height:80px;border:2px dashed #ccc;margin:10px 0 0 80px;"
                >开启车辆信息，用户需填写：车牌号、车型、排量、年款、当前历程、拥有量、发动机号、发动机型号、VIN等信息</p>
              </div>
              <div class="receive" style="width:97%;">
                <p>
                  <span style="font-weight:bold;text-align:right">1.是否需要实名认证</span>
                  <el-radio v-model="activity.isRealName" label="1" value="1">是</el-radio>
                  <el-radio v-model="activity.isRealName" label="0" value="0">否</el-radio>
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
                <span
                  v-for="(item,index) in relationgoods"
                  style="width:auto;padding:0 4px 0 4px;"
                >{{item.productSName}}</span>
                <span @click="addgoods">添加</span>
              </div>

              <div class="selectgoods" v-if="selectgoods">
                <p style="height:40px;">
                  <span>选择商品</span>
                  <a>添加商品</a>
                </p>
                <p>
                  <select v-model="firstlist">
                    <!-- <option selected="selected" value="">选择商品库</option> -->
                    <option
                      v-for="(firstlist,index) in goodsclasslist"
                      :value="firstlist"
                    >{{firstlist.productCatName}}</option>
                  </select>
                  <select v-model="secondlist">
                    <!-- <option selected="selected" value="">选择商品类型</option> -->
                    <option
                      v-for="(secondlist,index) in firstlist.productCatList"
                      :value="secondlist"
                    >{{secondlist.productCatName}}</option>
                  </select>
                  <select v-model="threelist" @change="selectthree">
                    <!-- <option selected="selected" value="null">选择商品品牌</option> -->
                    <option
                      v-for="(threelist,index) in secondlist.productCatList"
                      :value="threelist"
                    >{{threelist.productCatName}}</option>
                  </select>

                  <select v-model="selectgood" @change="addgood">
                    <option>选择商品</option>
                    <option
                      v-for="(goodsitem,index) in goodslist"
                      :value="goodsitem"
                    >{{goodsitem.productSName}}</option>
                  </select>
                </p>
              </div>
              <div class="setprize">
                <p style="height:40px;">
                  <span>设置奖项</span>
                  <span
                    @click="addprize"
                    style="height:30px;margin-top:5px;margin-right:10px;line-height:30px;background:#1abc9c;color:#fff;float:right; border-radius:5px;"
                  >添加奖项</span>
                </p>
                <div class="tab">
                  <el-table :data="prizedata" stripe style="width: 100%;font-size:12px;">
                    <el-table-column prop="priority" label="优先级" width="68">
                      <!-- <template slot-scoped="scoped">
                        <div>{{scoped.row}}</div>
                      </template>-->
                    </el-table-column>
                    <el-table-column prop="prize" label="奖品" width="100"></el-table-column>
                    <el-table-column prop="prizename" label="奖品名称" width="100">
                      <template slot-scope="scope">
                        <input
                          type="text"
                          style="width:100%;height:26px;outline:none;font-size:12px;"
                          v-model="scope.row.prizename"
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="Amount " label="金额" width="68">
                      <template slot-scope="scope">
                        <input
                          type="text"
                          style="width:100%;height:26px;outline:none;font-size:12px;"
                          v-model="scope.row.Amount"
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="prizenum" label="奖品数量" width="100">
                      <template slot-scope="scope">
                        <input
                          type="text"
                          style="width:100%;height:26px;outline:none;font-size:12px;"
                          v-model="scope.row.prizenum"
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="setprize" label="出奖设置" width="78">
                      <template slot-scope="scope">
                        <input
                          type="text"
                          style="width:30%;height:26px;outline:none;font-size:12px;"
                          v-model="scope.row.setprize"
                        >
                        <span>:1</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Tips" label="提示信息" width="188">
                      <template slot-scope="scope">
                        <input
                          type="text"
                          style="width:68%;height:26px;outline:none;font-size:12px;"
                          v-model="scope.row.Tips"
                        >现金红包
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="50">
                      <template slot-scope="scope">
                        <el-button
                          @click="deleteRow(scope.$index,scope.row)"
                          type="text"
                          size="small"
                        >移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="addreq" @click="preservationsub">保存 关联码</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="createsuccesscanvas" v-if="createsuccesscanvas">
        <h3>
          <span>√</span>活动创建成功
        </h3>
        <ul>
          <li>
            <span>活动名称：</span>
            {{activity.activityName}}
          </li>
          <li>
            <span>活动时效：</span>
            {{activity.startTime}}--{{activity.endTime}}
          </li>
        </ul>

        <!-- <el-table
          :header-cell-style="{background:'#eee',height:'32'}"
          ref="multipleTable"
          :data="tabledata"
          tooltip-effect="dark"
          style="width: 540px"
          stripe
        >
  

          <el-table-column prop="goodsid" label="奖品名称" width="335px"></el-table-column>
          <el-table-column prop="goodsname" label="奖品分类"></el-table-column>
        </el-table>-->
        <div class="btn">
          <span @click="exit">暂不关联</span>
          <span style="background:#1abc9c;color:#fff;" @click="code">关联相关码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  created() {
    this.goodclasslist();
    // console.log(this.$route.query);
    // this.flag=this.$route.query.flag;
    // this.activity.activityName=this.$route.query.rowdata.activityName;
    // this.imagebgUrl=this.$route.query.rowdata.backgroundUrl;
    // this.activity.endTime=this.$route.query.rowdata.endTime;
    // this.activity.startTime=this.$route.query.rowdata.startTime;
  },
  data() {
    return {
      flag: "",
      one: true,
      two: false,
      three: false,
      //背景图路径
      imagebgUrl: "",
      //标题图路径
      imagetitleUrl: "",
      //扫码按钮图片
      imagecodebtnUrl: "",
      //奖金图片
      imagebonusUrl: "",
      //领奖背景
      imagereceivebgUrl: "",
      //领奖标题
      imagereceivetitleUrl: "",
      //领取金额
      imagereceiveamountUrl: "",
      //抽取按钮
      imagereceivedrawUrl: "",
      //领奖活动标题
      imageactivitytitleUrl: "",
      //消费者码状态
      usercodetype: "",
      //消费者延迟扫码
      userdelayed: "1",
      isbarTakeUpTime: "1",
      isbarProtectTime: "1",
      selectgoods: false,
      active: 0,
      type: "",
      createtype: "1",
      // addgoods: "/addgoods",
      // addprize: "/addprize",
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
      relationgoods: [],
      activityPrizeList: [],
      prizeList: [],
      //商品分类列表
      goodsclasslist: [],
      //一级分类列表
      firstlist: [],
      //二级分类列表
      secondlist: [],
      //三级分类列表
      threelist: [],
      //商品列表
      goodslist: [],
      //选中的商品列表
      selectgoodslist: [],
      //选中的商品、
      selectgood: {},
      productsId: "",
      activity: {
        //活动名称ok
        activityName: "",
        //起始时间ok
        startTime: "",
        //结束时间ok
        endTime: "",
        //每人可领ok
        personCount: "",
        //每人每天可领ok
        personDayCount: "",
        //每辆车可领ok
        catCount: "",
        //是否需要车
        needCar: "",
        //是否需要认证
        needAuthentication: "",
        //身份认证
        isRealName: "",
        //活动类型ok
        activityType: "",
        //页面路径ok
        page: "",
        //消费者扫码状态ok
        isQrcodeStatus: "",
        //是否开启白名单ok
        isWhiteList: "",
        //扫码延迟时间ok
        scanTime: "",
        //条码占用时间ok
        barTakeUpTime: "",
        //条码保护时间ok
        barProtectTime: "",
        //背景图
        backgroundUrl: "",
        //标题图
        titleUrl: "",
        //按钮图
        buttonUrl: "",
        //奖励背景图
        prizeUrl: ""
      },
      //要提交的奖品列表
      list: [],
      //奖项列表
      prizedata: [],
      //创建成功弹窗
      createsuccesscanvas: false
    };
  },
  methods: {
    goodclasslist() {
      Axios({
        url: "api/productsManager/productCatList",
        methods: "get"
      }).then(data => {
        // console.log(data);
        this.goodsclasslist = data.data.data.firstCatList;
      });
    },
    startime(val) {
      console.log(val);
    },
    handleClick() {
      alert("button click");
    },
    //活动类型为扫码领红包
    redpacket() {
      this.activity.activityType = "1";
      this.type = 1;
    },
    //扫码类型为滚动抽奖
    rollingdraw() {
      this.activity.activityType = "滚动抽奖";
      this.type = 2;
    },
    next() {
      if (this.active == 0) {
        this.active = 1;
        this.activeName = "second";
        this.one = false;
        this.two = true;
        this.three = false;
      } else {
        this.active = this.active;
        this.activeName = "second";
        this.one = false;
        this.two = true;
        this.three = false;
      }
      //  console.log(this.activity);
    },
    nexttwo() {
      // console.log(this.activity);
      if (this.active == 1) {
        this.active = 2;
        this.activeName = "third";
        this.one = false;
        this.two = false;
        this.three = true;
      } else {
        this.active = this.active;
        this.activeName = "third";
        this.one = false;
        this.two = false;
        this.three = true;
      }
    },
    addgoods() {
      this.selectgoods = true;
      //请求商品三级分类列表
      this.goodclasslist();
    },
    //选择三级分类后
    selectthree() {
      // console.log(this.threelist);
      // if(this.)
      Axios({
        url: "api/productsManager/getProductsForCatId",
        method: "get",
        params: {
          productCatId: this.threelist.productCatId
        }
      }).then(data => {
        this.goodslist = data.data.data.productList;
      });
    },
    //选择商品后弹出添加关联商品框
    addgood() {
      // console.log(this.selectgood);
      this.$confirm("请确认是否添加该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认添加商品
          if (this.relationgoods.length == 0) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            //记录添加的商品的id
            this.productsId = this.selectgood.productSId;
            this.relationgoods.push(this.selectgood);
            // console.log(this.selectgood);
            this.selectgoods = false;
            this.firstlist = [];
            this.secondlist = [];
            this.goodslist = [];
            this.prizedata.push({
              productsId: this.productsId,
              priority: "基础奖",
              prize: "微信红包",
              prizename: "",
              Amount: "",
              prizenum: "",
              setprize: "1",
              Tips: ""
            });
          } else {
            // console.log("已有选中的商品");
            for (let i = 0; i < this.prizedata.length; i++) {
              // console.log(this.prizedata)
              this.activityPrizeList.push({
                activityPrizeName: this.prizedata[i].prizename,
                activityPrizeCount: this.prizedata[i].prizenum,
                activityPrizeInfo: this.prizedata[i].Tips,
                probability: this.prizedata[i].setprize,
                productsId: this.productsId
              });
              // console.log("列表一：",this.activityPrizeList)
              this.prizeList.push({
                prizeName: this.prizedata[i].prizename,
                count: this.prizedata[i].prizenum,
                price: this.prizedata[i].Amount
              });
              // console.log("列表二：",this.prizeList)
            }
            // console.log(this.list)
            this.list.push({
              activityPrizeList: this.activityPrizeList,
              prizeList: this.prizeList
            });
            this.prizedata = [];
            this.activityPrizeList = [];
            this.prizeList = [];
            // console.log("添加另外商品是保存list", this.list);
            //再次选择另外商品是，初始化商品id 和奖品列表
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            //记录添加的商品的id
            this.productsId = this.selectgood.productSId;
            this.relationgoods.push(this.selectgood);
            // console.log(this.selectgood);
            this.selectgoods = false;
            this.firstlist = [];
            this.secondlist = [];
            this.goodslist = [];
            this.prizedata.push({
              productsId: this.productsId,
              priority: "基础奖",
              prize: "微信红包",
              prizename: "",
              Amount: "",
              prizenum: "",
              setprize: "1",
              Tips: ""
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
          this.selectgoods = false;
          this.firstlist = [];
          this.secondlist = [];
          this.goodslist = [];
        });
    },
    //添加奖项
    addprize() {
      if(this.prizedata.length==0){
        this.prizedata.push({
          priority: "",
          prize: "微信红包",
          prizename: "",
          Amount: "",
          prizenum: "",
          setprize: "",
          Tips: ""
        });
      }else{
        var lestnum = this.prizedata.length - 1;
      if (
        this.prizedata[lestnum].prizename &&
        this.prizedata[lestnum].Amount &&
        this.prizedata[lestnum].prizenum &&
        this.prizedata[lestnum].Tips
      ) {
        this.prizedata.push({
          priority: "",
          prize: "微信红包",
          prizename: "",
          Amount: "",
          prizenum: "",
          setprize: "",
          Tips: ""
        });
        // this.prizeList.push({
        //   prizeName:""
        // })
      } else {
        // console.log(lestnum);
      }
      }
      

      // console.log(this.prizedata);
    },
    //删除奖项
    deleteRow(index, row) {
      console.log(index);
      console.log(row);
      this.prizedata.splice(index, 1);
    },
    check(value) {
      if (value.name == "first") {
        this.one = true;
        this.two = false;
        this.three = false;
      } else if (value.name == "second") {
        this.one = false;
        this.two = true;
        this.three = false;
      } else if (value.name == "third") {
        this.one = false;
        this.two = false;
        this.three = true;
      }
    },
    //提交创建活动
    preservationsub() {
      if (this.createtype == 1) {
        for (let i = 0; i < this.prizedata.length; i++) {
          this.activityPrizeList.push({
            activityPrizeName: this.prizedata[i].prizename,
            activityPrizeCount: this.prizedata[i].prizenum,
            activityPrizeInfo: this.prizedata[i].Tips,
            probability: this.prizedata[i].setprize,
            productsId: this.productsId
          });

          this.prizeList.push({
            prizeName: this.prizedata[i].prizename,
            count: this.prizedata[i].prizenum,
            price: this.prizedata[i].Amount
          });
        }

        this.list.push({
          activityPrizeList: this.activityPrizeList,
          prizeList: this.prizeList
        });
        this.prizedata = [];
        this.activityPrizeList = [];
        this.prizeList = [];
        // console.log(this.list);
        // console.log(this.activity);
        this.createtype = "0";
      }
      // console.log(this.list)
      Axios({
        url: "api/activityManager/addActivity",
        method: "post",
        data: {
          activity: this.activity,
          list: this.list
        }
      }).then(data => {
        if (data.data.code == 0) {
          //说明活动创建成功
          this.createsuccesscanvas = true;
          // this.$router.push("/operatemanagement");
        }
      });
    },
    //背景图片上传成功
    handlebgimgSuccess(res, file) {
      if (file.response.code == 0) {
        this.imagebgUrl = URL.createObjectURL(file.raw);
        // console.log(file);
        this.activity.backgroundUrl = file.response.data.fileUrl;
      } else {
        this.$message({
          message: "网络延迟请稍后再试！",
          type: "warning"
        });
      }
    },
    //标题图片上传成功
    handletitleimgSuccess(res, file) {
      this.imagetitleUrl = URL.createObjectURL(file.raw);
      this.activity.titleUrl = file.response.data.fileUrl;
    },
    //扫码按钮图片上传成功
    handlecodebtnSuccess(res, file) {
      this.imagecodebtnUrl = URL.createObjectURL(file.raw);
      this.activity.buttonUrl = file.response.data.fileUrl;
    },
    //奖励图片
    handlebonusSuccess(res, file) {
      this.imagebonusUrl = URL.createObjectURL(file.raw);
    },
    //领取奖励背景图prizeUrl
    handlereceivebgimgSuccess(res, file) {
      this.imagereceivebgUrl = URL.createObjectURL(file.raw);
      this.activity.prizeUrl = file.response.data.fileUrl;
    },
    //领取奖励标题图
    handlereceivetitleimgSuccess(res, file) {
      this.imagereceivetitleUrl = URL.createObjectURL(file.raw);
    },
    //领取金额图
    handlereceiveamountimgSuccess(res, file) {
      this.imagereceiveamountUrl = URL.createObjectURL(file.raw);
    },
    //抽奖按钮
    handlereceivedrawimgSuccess(res, file) {
      this.imagereceivedrawUrl = URL.createObjectURL(file.raw);
    },
    //领取奖励活动title
    handleactivitytitleSuccess(res, file) {
      this.imageactivitytitleUrl = URL.createObjectURL(file.raw);
    },
    exit() {
      this.$router.push("/operatemanagement");
    },
    code() {
      this.$router.push("/qrcodemanagement");
    }
  },
  watch: {
    prizedata: {
      handler(val) {
        // console.log(val);
        if (!this.prizedata.length == 0) {
          var index = val.length - 1;
          if (!index == 0) {
            var num = Math.round(
              this.prizedata[0].prizenum / this.prizedata[index].prizenum
            );
            this.prizedata[index].setprize = num.toString();
            //  console.log(this.prizedata)
          }
        }
      },
      deep: true
    },
    usercodetype(val) {
      // console.log(val)
      if (val == -1) {
        this.activity.isQrcodeStatus = "-1";
      } else {
        this.activity.isQrcodeStatus = "";
      }
    },
    userdelayed(val) {
      if (val == 0) {
        this.activity.scanTime = "-1";
      } else {
        this.activity.scanTime = "";
      }
    },
    isbarTakeUpTime(val) {
      if (val == 0) {
        this.activity.barTakeUpTime = "-1";
      } else {
        this.activity.barTakeUpTime = "";
      }
    },
    isbarProtectTime(val) {
      if (val == 0) {
        this.activity.barProtectTime = "-1";
      } else {
        this.activity.barProtectTime = "";
      }
    }
  }
  // active(value) {},
};
</script>

<style lang="scss" scoped>
.selection {
  background: #1abc9c;
  color: #fff;
}
.container {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;

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
    position: relative;
    .preview {
      width: 338px;
      height: 600px;
      background: firebrick;
      position: relative;
      float: left;
      .one {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;

        .bgimg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 338px;
            height: 600px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 338px;
            height: 600px;
            display: block;
          }
        }
        .titleimg {
          width: 270px;
          height: 107px;
          position: absolute;
          background: #ccc;

          left: 50%;
          top: 58px;
          margin-left: -135px;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 270px;
            height: 107px;
            line-height: 107px;
            text-align: center;
          }
          .avatar {
            width: 270px;
            height: 107px;
            display: block;
          }
        }
        .codebtn {
          width: 124px;
          height: 36px;
          border-radius: 4px;
          overflow: hidden;
          position: absolute;
          left: 50%;
          background: #409eff;
          top: 333px;
          margin-left: -62px;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 124px;
            height: 36px;
            line-height: 36px;
            text-align: center;
          }
          .avatar {
            width: 124px;
            height: 36px;
            display: block;
          }
        }
        .bonus {
          width: 62px;
          height: 56px;
          position: absolute;
          left: 50%;
          top: 430px;
          background: rebeccapurple;
          margin-left: -31px;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 62px;
            height: 56px;
            line-height: 56px;
            text-align: center;
          }
          .avatar {
            width: 62px;
            height: 56px;
            display: block;
          }
        }
      }
      .two {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #555;

        .bgimg {
          width: 244px;
          height: 481px;
          position: absolute;
          z-index: 11;
          left: 50%;
          top: 34px;
          margin-left: -122px;
          background: #eee;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 244px;
            height: 481px;
            line-height: 81px;
            text-align: center;
          }
          .avatar {
            width: 244px;
            height: 481px;
            display: block;
          }
        }
        .titleimg {
          width: 204px;
          height: 78px;
          position: absolute;
          left: 50%;
          top: 138px;
          margin-left: -102px;
          z-index: 22;
          background: #169bd5;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 204px;
            height: 78px;
            line-height: 78px;
            text-align: center;
          }
          .avatar {
            width: 204px;
            height: 78px;
            display: block;
          }
        }
        .amount {
          width: 86px;
          height: 38px;
          position: absolute;
          left: 50%;
          top: 267px;
          margin-left: -43px;
          z-index: 22;
          background: #169bd5;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 86px;
            height: 38px;
            line-height: 38px;
            text-align: center;
          }
          .avatar {
            width: 86px;
            height: 38px;
            display: block;
          }
        }
        .draw {
          width: 72px;
          height: 72px;
          position: absolute;
          left: 50%;
          top: 382px;
          z-index: 22;
          margin-left: -36px;
          background: firebrick;
          border-radius: 50%;
          overflow: hidden;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 72px;
            height: 72px;
            line-height: 72px;
            text-align: center;
          }
          .avatar {
            width: 72px;
            height: 72px;
            display: block;
          }
        }
        //display: none;
      }
      .three {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .title {
          width: 260px;
          height: 24px;
          position: absolute;
          left: 50%;
          top: 114px;
          margin-left: -130px;
          background: #ccc;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          .avatar-uploader-icon {
            font-size: 20px;
            color: #8c939d;
            width: 260px;
            height: 24px;
            line-height: 24px;
            text-align: center;
          }
          .avatar {
            width: 260px;
            height: 24px;
            display: block;
          }
        }
        //display: none;
      }
    }
    .right {
      width: 764px;
      float: right;
      .el-tabs__content {
        overflow: visible;
      }
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
            select {
              width: 125px;
              height: 30px;
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
          .addreq {
            width: 80px;
            height: 40px;
            background: #409eff;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin: 20px auto;
            border-radius: 6px;
          }
        }
      }
    }
    // 创建成功弹窗
    .createsuccesscanvas {
      width: 100%;
      height: 1050px;
      position: absolute;
      z-index: 111;
      left: 0;
      top: 0;
      background: #fff;
      h3 {
        width: 100%;
        height: 54px;
        text-align: center;
        line-height: 54px;
        font-size: 34px;
        margin-top: 33px;
        color: #aaa;
        span {
          display: inline-block;
          width: 45px;
          height: 45px;
          background: #1abc9c;
          color: #fff;
          margin-right: 13px;
          border-radius: 50%;
        }
      }
      ul {
        width: 100%;
        height: auto;
        li {
          margin-left: 435px;
          list-style: none;
          font-size: 14px;
          height: 73px;
          line-height: 73px;
          span {
            font-size: 15px;
          }
        }
      }
      .el-table {
        margin: 13px auto;
      }
      .btn {
        width: 410px;
        height: 38px;
        margin: 40px auto;
        display: flex;
        justify-content: space-between;
        span {
          display: block;
          width: 164px;
          height: 36px;
          text-align: center;
          line-height: 38px;
          font-size: 12px;
          border: 1px solid #ddd;
        }
      }
    }
  }
}
</style>
