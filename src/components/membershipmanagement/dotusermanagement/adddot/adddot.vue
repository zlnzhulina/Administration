<template>
  <div class="wrap">
    <h3>
      <span>网点维护>{{flag?"编辑网点":"添加网点"}}</span>
    </h3>
    <ul class="fromlist">
      <li>
        <span>
          <i>*</i>经销商代码
        </span>
        <input type="text" v-model="networkCode">
      </li>
      <li>
        <span>网点编号</span>
        <input
          type="text"
          readonly="readonly"
          value="提交后自动生成"
          style="background:#f2f2f2;color:#bbb"
        >
      </li>
      <li>
        <span>
          <i>*</i>网点名称
        </span>
        <input type="text" v-model="networkName">
        <span>
          <i>*</i>网点电话
        </span>
        <input type="text" v-model="phoneNumber">
      </li>
      <li>
        <span>负责人</span>
        <input type="text" v-model="linkman">
        <span>联系方式</span>
        <input type="text" v-model="linkPhone">
      </li>
      <li>
        <span>
          <i>*</i>详细地址
        </span>
        <div style="display:inline-block;">
          <v-distpicker @selected="onSelected" :province="prov" :city="city" :area="district"></v-distpicker>
          <!-- <v-distpicker province="北京市" city="北京" area="海淀区"></v-distpicker> -->
          <!-- <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker> -->
        </div>
      </li>
      <li>
        <span></span>
        <input type="text" v-model="addressdetails">
      </li>
    </ul>
    <div class="map">
        <!-- <baidu-map class="baidumap" :center="{lng:108.927154,lat:34.229159}" :zoom="15" :scroll-wheel-zoom="true" mapType="BMAP_NORMAL_MAP)"></baidu-map> -->
        <!-- <baidu-map class="map"
        :center="{lng:114.065537,lat:22.553321}"
        :zoom='13'
        :scroll-wheel-zoom='true'
    >
    <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
    <bm-marker :position="{lng:114.065537,lat:22.553321}" :dragging="true" animation='BMAP_ANIMATION_BOUNCE'>
        <bm-label content='深圳市市民之家' :labelStyle="{color:'red',fontSize:'12px'}" :offset="{width:-35,height:30}" />  
    </bm-marker>
  </baidu-map> -->
  <baidu-map class="map" id="mapID" center="site"  :scroll-wheel-zoom="true" >
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-local-search :keyword="site" :auto-viewport="true" zoom="12.8" style="display: none"></bm-local-search>
    
     <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
  </baidu-map>
    </div>
    <!-- <div class="map">
        <p>地图锚点</p>
    </div>-->
    <div align="center">
      <el-button type="text" size="big" @click="saveNetwork">保存</el-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import VDistpicker from "v-distpicker";

export default {
  components: { VDistpicker },
  //添加网点
  data() {
    return {
      prov: "北京市",
      city: "北京城区",
      district: "东城区",
      cityArr: [],
      districtArr: [],
      networkCode: "",
      networkName: "",
      phoneNumber: "",
      linkman: "",
   
      linkPhone: "",
      address: "",
      addressdetails:"",
      site:"北京市海淀区",
      networkdata: {
        networkId: "",
        networkCode: "",
        networkName: "",
        phoneNumber: "",
        linkman: "",
        linkPhone: "",
        province: "",
        city: "",
        area: "",
        address: ""
      },
      demp: "",
      flag:false,
    };
  },
  created: function() {
    this.init();
  },
  
  methods: {
    init: function() {
      this.demp = this.$route.query.networkParm;
      console.log(this.$route.query.networkParm)
      if (this.$route.query.flag == 1) {
        this.flag=true;
        //编辑
        this.addressdetails=this.demp.address;
        
        this.networkCode = this.demp.networkCode;
        this.networkName = this.demp.networkName;
        this.phoneNumber = this.demp.phoneNumber;
        this.linkman = this.demp.linkman;
        this.linkPhone = this.demp.linkPhone;
        this.address = this.demp.address;
        this.prov = this.demp.province;
        this.city = this.demp.city;
        this.district = this.demp.area;
        // this.networkdata.networkId = this.demp.networkId;
      
      }
      console.log(this.networkdata.networkId);
    },
    saveNetwork: function() {
      this.networkdata.networkCode = this.networkCode;
      this.networkdata.networkName = this.networkName;
      this.networkdata.phoneNumber = this.phoneNumber;
      this.networkdata.linkman = this.linkman;
      this.networkdata.linkPhone = this.linkPhone;
      this.networkdata.address = this.addressdetails;
      this.networkdata.province = this.prov;
      this.networkdata.city = this.city;
      this.networkdata.area = this.district;
      console.log(this.networkdata);
      console.log(JSON.stringify(this.networkdata));
      // var jsondata = JSON.stringify(this.networkdata);
      if (this.$route.query.flag == 1) {
        //编辑
        Axios({
          method: "post",
          url: "api/networkUserManager/editNetwork",
          data: JSON.stringify(this.networkdata),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(data => {
          if (data.data.code == "0") {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
          }
          if (data.data.code == "-1") {
            this.$message({
              message: data.data.msg,
              type: "error"
            });
          }
        });
      }
      if (this.$route.query.flag == 0) {
        //添加网点
        if(networkCode=="" && networkName=="" && phoneNumber==""){
          this.$message({
              message: "必填项未填写",
              type: "error"
            });
        }else{
          Axios({
          method: "post",
          url: "api/networkUserManager/addNetwork",
          data: JSON.stringify(this.networkdata),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(data => {
          if (data.data.code == "0") {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
            this.$router.push("/Membershipmanagement/dotlist")
          }
          if (data.data.code == "-1") {
            this.$message({
              message: data.data.msg,
              type: "error"
            });
          }
        });
        }
        
      }
    },
    //选择区域
    onSelected(data) {
      console.log(data);
      this.area = data.area.value;
      this.city = data.city.value;
      this.province = data.province.value;
       this.address=data.province.value+data.city.value+data.area.value;
    },
//       baiduMap () {
//     var map = new BMap.Map('allmap')
//     var point = new BMap.Point(111.742579, 40.818675)
//     map.centerAndZoom(point, 12)
//     var marker = new BMap.Marker(point)  // 创建标注
//     map.addOverlay(marker)              // 将标注添加到地图中
//   }
  },
  watch: {
    addressdetails(value) {
       console.log(value);
       this.site=this.address+value;
       console.log(this.site)
     
    }
  }
  //     beforeMount: function () {
  //     this.updateCity();
  //     this.updateDistrict();
  //     },
  //     watch: {
  //     prov: function () {
  //         this.updateCity();
  //         this.updateDistrict();
  //     },
  //     city: function () {
  //         this.updateDistrict();
  //     }
  // }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 1200px;
  padding-top: 60px;
  margin: 0 auto;
  h3 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    span {
      margin-left: 20px;
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
  .fromlist {
    width: 1060px;
    height: 416px;
    margin-left: 62px;
    li {
      width: 100%;
      height: 56px;
      line-height: 56px;
      list-style: none;
      span {
        display: inline-block;
        width: 128px;
        height: 38px;
        line-height: 38px;
        text-align: right;
        font-size: 16px;
        font-weight: bold;
        i {
          color: red;
          margin-right: 8px;
        }
      }
      input {
        width: 368px;
        height: 38px;
        border: 1px solid #bbb;
        margin-left: 5px;
        text-align: center;
        border-radius: 6px;
      }
      select {
        width: 90px;
        height: 30px;
        margin-left: 13px;
      }
    }
  }
  .map {
    width: 892px;
    height: 333px;
    margin: 0 auto;
    p {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>
