<template>
  <div class="layout">
    <div :class="!isIndex?'layout_conent':'layout_conent_index'">
      <div class="layout_main">
        <div class="layout-logo" @click="goIndex">
          <!-- <img src="/static/img/logodown.png" v-if="lan=='zh' && !isIndex" alt=""> -->
          <img src="/static/img/logodown.png" v-if="lan=='zh'" alt="">
          <img src="/static/img/elogo.png" v-if="lan=='en'" alt="">
        </div>
        <ul :class="!isIndex?'layout_uls':'layout_uls_index'">
          <router-link to="/index" tag="li" active-class="cur">{{$t("message.title1")}}</router-link>
          <router-link to="/tradingCNHA" :class="cur?'cur':''" tag="li" active-class="cur">{{$t("message.title5")}}</router-link>
          <router-link to="/twoCen" tag="li" active-class="cur">{{$t("seo.b16")}}</router-link>
          <router-link to="/security/" tag="li" active-class="cur">{{$t("message.title2")}}</router-link>
          <router-link to="/financial/" tag="li" active-class="cur">{{$t("message.title3")}}</router-link>
        </ul>
        <ul class="loginUl" @mouseleave="noStyle">
          <router-link to="/login" tag="li" @click.native="load_d" v-if="!user" :class="isIndex?'longinli1':'longinli'">{{$t("loginin.title4")}}</router-link>
          <router-link to="/register" tag="li" v-if="!user" :class="isIndex?'longinli1':'longinli'">{{$t("loginin.title7")}}</router-link>
          <li v-if="user" class="sep" style="margin-top:2px;cursor:default;opacity:0.7" @mouseover="lanStyle">
            <img src="/static/img/ilogin.png" alt="" style="width:15px;height:15px;" v-if="isIndex">
            <img src="/static/img/elogin.png" alt="" style="width:15px;height:15px;" v-if="!isIndex">
          </li>
          <li v-if="user" :class="!isIndex?'sep':'sep_index'" @click="gosec" style="margin-left:10px;opacity:0.7" @mouseover="lanStyle">
            {{user}}
            <Icon :type="lanBox?'arrow-up-b':'arrow-down-b'":class="!isIndex?'icon_i':'icon_index'"></Icon>
          </li>

          <li v-if="user" :class="!isIndex?'sep1':'sep_index1'" @click="exit">
            {{$t("message.title4")}}
          </li>
          <div class="lanBox" v-show="lanBox" @mouseleave="noStyle">
            <p @click="gocz" style="cursor:pointer;">
              <span class="">
                充币
              </span>
            </p>
            <p @click="gotx" style="cursor:pointer;">
              <span>提币</span>
            </p>
          </div>
        </ul>

      </div>
    </div>
    <router-view :type='type'></router-view>
  </div>
</template>
<script>
  import bus from "../../assets/js/bus.js";
  export default {
    data() {
      return {
        user: '',
        lanBox: false,
        zh: true,
        en: false,
        showData: [],
        locale: null,
        type: 0,
        cur: false,
        stopRouter: false,
        isForgetPwd: false,
        lan: "zh",
        isIndex:true,
      }
    },
    methods: {
      exit() {
        this.FetchGet(this.requestUrl.login.out, {}).then(res => {   //调用get方法
          if (res.status == 200) {
            //退出时清楚localstorag
            localStorage.removeItem("user");
            localStorage.removeItem("userid");
            localStorage.removeItem("chkAuth");
            localStorage.removeItem("chkEmail");
            localStorage.removeItem("current");
            localStorage.removeItem("currIndex")
            localStorage.removeItem("id");
            localStorage.removeItem("step");
            localStorage.removeItem("phone");
            localStorage.removeItem("ifchkMoble");
            localStorage.removeItem("iftranspw");
            localStorage.removeItem("iflogin");
            localStorage.removeItem("chkReal");
            localStorage.removeItem("country");
            localStorage.removeItem("type");
            localStorage.removeItem("level");
            localStorage.removeItem("res");
            localStorage.removeItem('money');
            this.$router.push("/login")
          } else {
            this.$Notice.warning({
              title: res.message

            });
          }
        })

      },
      load_d() {
        //  window.location.reload();
        this.stopRouter = true
        //调用方法 观察查模式
        if (this.isForgetPwd) {
          this.$eventBus.$emit('goLoginEvent')
        }

      },
      lanStyle() {
        this.lanBox = true;
      },
      noStyle() {
        this.lanBox = false;
      },
      goIndex() {
        this.$router.push("/index")
      },
      gocz(){
        this.$router.push("/financial/deposit")
      },
      gotx(){
        this.$router.push("/financial/withdraw")
      },
      gosec() {
        this.$router.push("/security")
      },
      getUser() {
        this.user = localStorage.getItem("user");  //
        var id = localStorage.getItem("jyqIndex");
        if(this.$route.path == "/index"){
          this.isIndex=true;
        }else{
          this.isIndex=false;
        }
        if (this.$route.path == "/tradingCNHA" && id == 1) {  //如何
          this.$router.push("/tradingETF")
        } else if (this.$route.path == "/tradingCNHA" && id == 2) {
          this.$router.push("/tradingETH")
        } else if (this.$route.path == "/tradingCNHA" && id == 3) {
          this.$router.push("/tradingAIRDROP")
        }
        if (this.$route.path == "/tradingETF" || this.$route.path == "/tradingETH" || this.$route.path == "/tradingAIRDROP") {
          this.cur = true;
        } else {
          this.cur = false;
        }
      },
      sendUser(sendUser) {
        // console.log(sendUser)
      }
    },
    created() {
      this.lan = localStorage.getItem("lan") || 'zh';
      this.user = localStorage.getItem("user");
      bus.$on("type", function (a) {
        this.type = a;
        // console.log(this.type)
      }.bind(this));
      this.$eventBus.$on('user', function (user) {
        this.user = user;
        // console.log(user)
      }.bind(this))
      this.$eventBus.$on('isForgetEvent', (drag) => {
        this.isForgetPwd = drag
      })

      this.getUser();
    },
    watch: {
      '$route': 'getUser',
    },
    beforeRouteLeave(to, from, next) {
      if (this.stopRouter) {
        next(false)
      } else {
        next()
      }

    },
  }
</script>
<style lang="scss">
  .layout {
    // background: #f5f7f9;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    position: relative;
    .layout_conent {
      width: 100%;
      background-color:#ffffff;
      height: 80px;
      z-index: 1000;
      line-height: 80px;
      .layout_main {
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        /* overflow: hidden; */
        position: relative;
        /* display: inline; */
      }
    }
    .layout_conent_index {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      height: 80px;
      z-index: 1000;
      position: absolute;
      line-height: 80px;
      .layout_main {
        width: 62.5%;
        min-width: 1200px;
        margin: 0 auto;
        /* overflow: hidden; */
        position: relative;
      }
    }
    .layout-logo {
      float: left;
      cursor: pointer;
      img {
        width: 100%;
        line-height: 80px;
        vertical-align: middle;
      }
    }
    .icon_i{
      color:#00adee;
      margin-left:5px;
    }
    .icon_index{
      color:#ffffff;
    }
    .layout_uls{
        float: left;
        height: 100%;
        margin-left: 100px;
        li{
          font-size:16px;
          float: left;
          position: relative;
          cursor: pointer;
          padding:0 23px;

      }li:hover{
        color: #00aedd;
      }
      }
    .layout_uls_index{
      float: left;
      height: 100%;
      margin-left: 100px;
      li {
        font-size: 16px;
        float: left;
        position: relative;
        cursor: pointer;
        padding: 0 23px;
        color: #ffffff;
        opacity: 0.7;
        /* padding-bottom: 100px; */
      }
      li:hover {
        color: #ffffff;
        opacity: 1;
      }
    }
    .loginUl {
      float: right;
      height: 80px;
      position: relative;
      /* padding-bottom: 200px; */
      li {
        float: left;
        border-radius: 3px;
        text-align: center;
        line-height: 40px;
        margin-left: 30px;
        line-height: 80px;
        font-size: 16px;
        color: #ffffff;
        opacity: 0.7;
        cursor: pointer;
      }
      .longinli{
        color: #00aedd;
      }
      .longinli1{
        color: #ffffff;
        opacity: 0.7;
      }
      .longinli1:hover{
        color: #ffffff;
        opacity: 1;
      }
      .sep {
        width: auto;
        margin-left: 30px;
        color: #00adee;
        opacity: 0.7;
      }
      .sep_index{
        color: #ffffff;
        opacity: 0.7;
      }
      .sep1 {
        width: auto;
        margin-left: 30px;
        color: #495060;
        opacity: 0.7;
      }
      .sep1:hover{
        color: #00adee;
      }
      .sep_index1{
        color: #ffffff;
        opacity: 0.7;
      }
      .sep_index:hover {
        color: #ffffff;
        opacity: 1;
      }
    }
    .lanBox {
      position: absolute;
      background: #fff;
      box-shadow: 1px 2px 6px #c5c5c5;
      border: solid 1px #eee;
      border-radius: 0 0 3px 3px;
      z-index: 10000;
      top: 80px;
      right: 60px;
      p {
        width: 100px;
        text-align: center;
        padding: 6px 3px;
        line-height: 20px;
        color: #555555;
        font-size:14px;
        color:#999999;
      }
      p:nth-child(1){
        margin-top: 10px;
      }
      p:hover {
        background: #eeeeee;
      } // right: 0;
    }
    /* .cur {
      color: #00aedd;
      border-bottom: 2px solid #00aedd;
    } */
  }
</style>