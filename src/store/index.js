import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  TradingArea: null, // 行情接口
  user: {
    
  },
  isloginPremissios: false
}

export default () => {
    return new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })
  }