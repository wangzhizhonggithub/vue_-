<template>
  <div class="footer">
    <div class="footer_main">
      <div class="top">
        <ul class="uls" style="flex:1.5">
          <li>
            <h4>{{$t("message.footer6")}}</h4>
          </li>
          <router-link :to='{path:"/rate",name:"Rate"}' tag="li" style="cursor:pointer;"> {{$t("index.action4")}}</router-link>
          <router-link :to='{name:"problem",params:{id:2}}' tag="li" style="cursor:pointer;"> {{$t("index.action5")}}</router-link>
          <router-link :to='{path:"/userAgrement",name:"UserAgrement"}' tag="li" style="cursor:pointer;"> {{$t("index.action6")}}</router-link>
          <!-- <li>{{$t("message.footer7")}}</li>
                      <li>{{$t("message.footer8")}}</li>
                      <li>{{$t("message.footer9")}}</li>
                      <li>{{$t("message.footer10")}}</li> -->
        </ul>
        <ul class="uls" style="flex:1.5">
          <li>
            <h4>{{$t("message.footer11")}}</h4>
          </li>
          <li>{{$t("message.footer12")}}</li>
          <li>{{$t("message.footer13")}}</li>
          <li>{{$t("message.footer14")}}</li>
        </ul>
        <ul class="uls" style="flex:1.5">
            <li>
              <h4>{{$t("message.footer1")}}</h4>
            </li>
            <li style="cursor:pointer;"><a href="http://cn.mikecrm.com/4W2CnwY" target="http://cn.mikecrm.com/4W2CnwY" style="color:#d9d9da">{{$t("message.footer2")}}</a></li>
            <!-- <li>{{$t("message.footer3")}}</li>
            <li>{{$t("message.footer4")}}</li>
            <li>{{$t("message.footer5")}}</li> -->
          </ul>
        <ul class="uls" style="flex:3">
          <li>
            <h4>{{$t("message.footer15")}}</h4>
          </li>
          <!-- <li>{{$t("message.footer16")}}：2354367475</li>
          <li>{{$t("message.footer17")}}：2354367475</li> -->
          <li >{{$t("message.footer18")}}：<a href="mailto:support@btcfoo.com" style="color:#d9d9da">support@btcfoo.com</a></li>
          <li >{{$t("message.footer21")}}：<a href="mailto:Suggestion@btcfoo.com" style="color:#d9d9da">suggestion@btcfoo.com</a></li>
          <!-- <li>{{$t("message.footer19")}}：3457658436</li>
          <li>{{$t("message.footer20")}}：3457658436</li> -->
        </ul>
        <dl class="dls" style="margin-top:0.45rem;flex:1;">
          <dt @click="goIndex" style="cursor:pointer;">
            <img src="/static/img/logodown.png" v-if="lan=='zh'" alt="">
            <img src="/static/img/elogo.png" v-if="lan=='en'" alt="">
          </dt>
        </dl>
        <!-- <dl class="dls" style="text-align:right;cursor:pointer;">
          <dt>
            <img  src="/static/img/sweep.png" alt="">
            <div style="margin-top: 12px;width: 100px;float: right;font-size: 14px;text-align:center">{{$t("message.sweep")}}</div>
          </dt>
        </dl> -->
      </div>
      <p>2018 BtcFoo.com All Rights Reserved</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lan: "zh"
      }
    },
    methods: {
      goIndex() {

        var pathName = location.pathname
        if (pathName == '/index') {
          delete sessionStorage.isReload
          this.COM.jumpScroll()
          delete sessionStorage.isReload
        } else {
          this.$router.push({
            name: "/index",
            params: {
              type: 1
            }
          })
        }

      },
    },
    created () {
      this.lan=localStorage.getItem("lan") || 'zh';
    }
  }
</script>
<style lang="scss">
  .footer {
    width: 100%;
    height: 260px;
    background: #2b3034;    
    position: relative;
    .footer_main {
      width: 62.5%;
      min-width: 1200px;
      margin: 0 auto;
      background: #2b3034;
    }
    .top {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      color: #d9d9da;
      overflow: hidden;
      border-bottom: 1px solid #43494d;
      display: flex;
      .uls {
        float: left;
        flex: 1;
        li {
          font-size: 12px;
          margin: 6px 0;
          h4 {
            padding-bottom: 2px;
            border-bottom: 2px solid #00aedd;
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 0.08rem;
            display: inline-block;
          }
        }
      }
      .dls {
        flex: 1;
        float: left;
        line-height: 12px;
      }
    }
    p {
      color: #ffffff;
      /* margin-top: 0.1rem; */
      font-size: 12px;
      line-height: 54px;
    }
    .clearfix:after {
      content: "\0020";
      display: block;
      height: 0;
      clear: both;
    }
    .clearfix {
      zoom: 1;
    }
  }
</style>