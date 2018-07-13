/*
 * @Author: gc 
 * @Date: 2018-06-19 11:55:45 
 * @Last Modified by: guanyuhao
 * @Last Modified time: 2018-06-20 10:12:43
 */

// 同步状态值的修改 

import {
    SET_INDEXS
  } from './mutation-types'
  
  export default {

    [SET_INDEXS](state, data){
      
      state.TradingArea = data
      
    }

  }
  