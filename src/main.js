// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'babel-polyfill'
require('es5-shim')
require('es5-shim/es5-sham')
// 就是个兼容
import App from './App';
import router from './router';
import "./assets/css/style.css";
import "./assets/js/rem.js";
import "./assets/js/cookie.js";
import './assets/js/float.js';

import COM from './assets/js/com.js';
import Global from './assets/js/environment';
import md5 from 'js-md5';
import iView from 'iview';
import VueI18n from "vue-i18n";
import VueParticles from 'vue-particles'
import { FetchGet, FetchPost, FetchAll } from './axios';
import { requestUrl } from './api/requestUrl.js';
import MetaInfo from 'vue-meta-info'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(iView);
Vue.use(VueParticles)
Vue.use(MetaInfo)
Vue.prototype.FetchGet = FetchGet;
Vue.prototype.FetchPost = FetchPost;
Vue.prototype.requestUrl = requestUrl;
Vue.prototype.FetchAll = FetchAll;
Vue.prototype.md5 = md5;
Vue.prototype.COM = COM;
Vue.prototype.Global = Global;
// console.log(Global)
COM.init()
// console.log(new BigDecimal("2.40").subtract(new BigDecimal("2")))
const i18n = new VueI18n({
  // locale:getCookie('PLAY_LANG','zh'),
  locale: 'zh',
  messages: {
    'zh': require('./assets/js/zh.js'),
    'en': require('./assets/js/en.js')
  }
})
//登陆状态下地址栏输入登陆网址跳回到首页 to.fullPath地址栏输入
let isLogin = Number(localStorage.getItem("iflogin"));
router.beforeEach((to, from, next) => {

  if (to.fullPath == '/login' && isLogin) {
    router.push({ name: '/index' })
  }

  next()
})
var num = 1;//牛逼
const newVue = new Vue({
  store,
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
// console.log(newVue)

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  //console.log(to.name)
  //console.log(from.name)
  // 永远不跳转登录
  var toName = to.name
  var fromName = from.name

  var noTranArr = ['tradingETF', 'tradingETH', 'tradingAIRDROP']
  if (toName != '/login') {
    if (noTranArr.indexOf(toName) > -1) {
      toName = 'tradingCNHA'
    }
    localStorage.setItem("toname", toName)
  } else {

    if (fromName != '/login') {
      // 判断第一次点安全中心或 c2c交易得路由改变

      if (num == 1) {

        if (noTranArr.indexOf(fromName) > -1) {
          fromName = 'tradingCNHA'
        }
        localStorage.setItem("toname", fromName)
      }

    }
  }

  const centerRoute = ['tradingCNHA', 'tradingETF', 'tradingETH', 'tradingAIRDROP'];
  const nextRoute = ['/security/config', '/financial/account', '/twoCen', '/financial/deposit', '/financial/withdraw'];
  let isLogin = Number(localStorage.getItem("iflogin"));  // 是否登录
  let istran = Number(localStorage.getItem("iftranspw")); //是否设置交易密码
  let FirstId;
  let areaList = [];
  // 未登录状态；当路由到nextRoute指定页时，跳转至login

  let _this = this;
  if (nextRoute.indexOf(to.name) >= 0) {

    if (isLogin && istran) { //如果登录和密码都设置

      next();

    } else {
      if (!isLogin) {  //如果没有设置登录
        num++;
        router.push({ name: '/login' })
        newVue.$Notice.warning({ title: newVue.$t('seo.bbb') })
      } else {  //设置登录 
        if (!istran) {  //如果没有设置交易密码
          router.push({ name: '/setZpsd' })
          newVue.$Notice.warning({ title: newVue.$t('seo.bbbb') })
        } else {
          next();
        }
      }
    }
  } else {
    if (centerRoute.indexOf(to.name) >= 0) {
      // newVue.FetchGet(newVue.requestUrl.tradingCenter.bList)
      //   .then(res => {
      //     if (res.data['CNHA']) {
      //       localStorage.setItem("FirstId1", Number(res.data['CNHA'][0].id))
      //     }
      //     if (res.data['ETH']) {
      //       localStorage.setItem("FirstId3", Number(res.data['ETH'][0].id))
      //     } 
      //     if (res.data['ETF']) {
      //       localStorage.setItem("FirstId2", Number(res.data['ETF'][0].id))
      //     } 
      //     if (res.data['airdrop']) {
      //       localStorage.setItem("FirstId4", Number(res.data['airdrop'][0].id))
      //     }
      //   })
      next();
    } else {
      next();
    }
  }

  // 已登录状态；当路由到login时，跳转至home 
});

//进入交易中心前得到第一个id


// 已登录状态；当路由到login时，跳转至home 

/* eslint-disable no-new */


//跨组件通信
Vue.prototype.$eventBus = new Vue()
//
String.prototype.delFixed = function (s) {
  let str = this
    , index = str.indexOf('.')
    , fornt
    , end;
  typeof s == Number ? "" : s = Number(s)
  if (index > -1) {
    fornt = str.substring(0, index)
    end = str.substring(index, index + s + 1)
    if (end.length < s + 1) {
      //位数不够补领
      let l = Math.abs(s + 1 - end.length)
      for (let i = 0; i < l; i++) {
        end += '0'
      }
    }
  } else {
    //整数加0
    fornt = str
    end = '.'
    for (let i = 0; i < s; i++) {
      end += '0'
    }
  }
  str = fornt + end
  return str
}
