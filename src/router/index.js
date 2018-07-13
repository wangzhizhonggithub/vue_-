import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
const home = r => require.ensure([], () => r(require('@/components/SafeCenter/home.vue')), 'home')
const security = r => require.ensure([], () => r(require('@/components/SafeCenter/security.vue')), 'security')
const config = r => require.ensure([], () => r(require('@/components/SafeCenter/config.vue')), 'config')
const history = r => require.ensure([], () => r(require('@/components/SafeCenter/history.vue')), 'history')
const authentication = r => require.ensure([], () => r(require('@/components/SafeCenter/authentication.vue')), 'authentication')
const phone = r => require.ensure([], () => r(require('@/components/SafeCenter/phone.vue')), 'phone')
const email = r => require.ensure([], () => r(require('@/components/SafeCenter/email.vue')), 'email')
const loginPassword = r => require.ensure([], () => r(require('@/components/SafeCenter/loginPassword.vue')), 'loginPassword')
const tradePassword = r => require.ensure([], () => r(require('@/components/SafeCenter/tradePassword.vue')), 'tradePassword')
//const securityPro = r => require.ensure([], () => r(require('@/components/SafeCenter/securityPro.vue')), 'securityPro')
const verification = r => require.ensure([], () => r(require('@/components/SafeCenter/verification.vue')), 'verification')
const emailSuccess = r => require.ensure([], () => r(require('@/components/indexCenter/emailSuccess.vue')), 'emailSuccess')
const emailError = r => require.ensure([], () => r(require('@/components/indexCenter/emailError.vue')), 'emailError')

const withdrawalSuss = r => require.ensure([], () => r(require('@/components/FinanceCenter/withdrawalSuss.vue')), 'withdrawalSuss')
const withdrawalErr = r => require.ensure([], () => r(require('@/components/FinanceCenter/withdrawalErr.vue')), 'withdrawalErr')

const Gdetail = r => require.ensure([], () => r(require('@/components/indexCenter/Gdetail.vue')), 'Gdetail')
const index = r => require.ensure([], () => r(require('@/components/indexCenter/index.vue')), 'index')
//const indexBanner = r => require.ensure([], () => r(require('@/components/indexCenter/indexBanner.vue')), 'indexBanner')
const setZpsd = r => require.ensure([], () => r(require('@/components/indexCenter/setZpsd.vue')), 'setZpsd')
const problem = r => require.ensure([], () => r(require('@/components/indexCenter/problem.vue')), 'problem')
const rate = r => require.ensure([], () => r(require('@/components/indexCenter/rate.vue')), 'rate')
const userAgrement = r => require.ensure([], () => r(require('@/components/indexCenter/userAgrement.vue')), 'userAgrement')
const login = r => require.ensure([], () => r(require('@/components/indexCenter/loginin.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/components/indexCenter/register.vue')), 'register')

const account = r => require.ensure([], () => r(require('@/components/FinanceCenter/account.vue')), 'account')
const financial = r => require.ensure([], () => r(require('@/components/FinanceCenter/financial.vue')), 'financial')
const funds = r => require.ensure([], () => r(require('@/components/FinanceCenter/funds.vue')), 'funds')
const deposit = r => require.ensure([], () => r(require('@/components/FinanceCenter/recharge.vue')), 'deposit')
const withdraw = r => require.ensure([], () => r(require('@/components/FinanceCenter/withdrawal.vue')), 'withdraw')
const record = r => require.ensure([], () => r(require('@/components/FinanceCenter/record.vue')), 'record')
const collection = r => require.ensure([], () => r(require('@/components/FinanceCenter/collection.vue')), 'collection')

const tradingCNHA = r => require.ensure([], () => r(require('@/components/TradingCenter/index.vue')), 'tradingCNHA')
const tradingETF = r => require.ensure([], () => r(require('@/components/TradingCenter/index_etf.vue')), 'tradingETF')
const tradingETH = r => require.ensure([], () => r(require('@/components/TradingCenter/index_eth.vue')), 'tradingETH')
const tradingAIRDROP = r => require.ensure([], () => r(require('@/components/TradingCenter/index_airdrop.vue')), 'tradingAIRDROP')


const tradMoreRecode = r => require.ensure([], () => r(require('@/components/TradingCenter/more/recodeMore.vue')), 'tradMoreRecode')
const tradMoreDepth = r => require.ensure([], () => r(require('@/components/TradingCenter/more/depthMore.vue')), 'tradMoreDepth')

const twoCen = r => require.ensure([], () => r(require('@/components/c2cCenter/home.vue')), 'twoCen')
Vue.use(Router)
Vue.use(iView);

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    //console.log(1)
    //window.scrollTo(0,0)
    //return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/tradingCNHA',
          name: "tradingCNHA",
          component: tradingCNHA,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/tradingETF',
          name: "tradingETF",
          component: tradingETF,
          meta: {
            requireAuth: true, 
          },
        },
        {
          path: '/tradingAIRDROP',
          name: "tradingAIRDROP",
          component: tradingAIRDROP,
          meta: {
            requireAuth: true, 
          },
        },
        {
          path: '/tradingETH',
          name: "tradingETH",
          component: tradingETH,
          meta: {
            requireAuth: true, 
          },
        },
        {
          path: '/twoCen',
          name: "/twoCen",
          component: twoCen,
          // meta: {
          //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          // }
        },
        {path:"/emailError",component:emailError},
        {path:"/emailSuccess",component:emailSuccess},
        {path:"/withdrawalSuss",component:withdrawalSuss},
        {path:"/withdrawalErr",component:withdrawalErr},
        {path:"/setZpsd",name:'/setZpsd',component:setZpsd},
        { path: '/tradMoreRecode', component: tradMoreRecode },
        { path: '/tradMoreDepth', component: tradMoreDepth },
        { path: '/login',name:"/login",component: login },
        { path: '/index',name:'/index', component: index },
        // { path: '/home/indexBanner',name: 'home/indexBanner', component: indexBanner },
        { path: '/Gdetail',name: 'Gdetail',component: Gdetail },
        { path: '/rate',name:'Rate', component: rate },
        { path: '/problem',name:'problem', component: problem },
        { path: '/userAgrement',name:'UserAgrement', component: userAgrement },
        {
          path: '/financial',
          component: financial,
          name: "/financial",
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          redirect: '/financial/account',
          children: [
            { path: '/financial/account',name:'/financial/account',component: account},
            { path: '/financial/funds', component: funds },
            { path: '/financial/deposit',name:'/financial/deposit', component: deposit },
            { path: '/financial/withdraw', name:'/financial/withdraw',component: withdraw },
            { path: '/financial/record', component: record },
            { path: '/financial/collection', component: collection },
            
          ]
        },
        {
          path: '/security',
          name: '/security',
          component: security,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          redirect: '/security/config',
          children: [
            { path: '/security/config',name:'/security/config',component: config },
            { path: '/security/history', component: history },
            { path: '/security/phone', component: phone },
            { path: '/security/authentication', component: authentication },
            { path: '/security/email', component: email },
            { path: '/security/loginPassword', component: loginPassword },
            { path: '/security/tradePassword', component: tradePassword, name: 'tradePassword' },
            //  {path: '/home/security/securityPro', component: securityPro },
            { path: '/security/verification', component: verification }
          ]
        },
        { path: '/register', component: register,name:'register' },
      ]
    }
  ],
})
