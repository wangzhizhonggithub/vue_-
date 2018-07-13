/*
 * @Author: gc 
 * @Date: 2018-06-19 11:54:58 
 * @Last Modified by: guanyuhao
 * @Last Modified time: 2018-06-20 10:16:12
 */
// 异步修改状态值


import {
    FetchGet,
    FetchPost
} from '../axios/index'

import {GlobalUrl} from '../api/requestUrl'

import {
    UPDATE_INDEXS,
    SET_INDEXS
} from './mutation-types'


export default {
    async [UPDATE_INDEXS]( { commit, state, getters } ){
        let data = await FetchGet(GlobalUrl.TradingArea,)
        commit(SET_INDEXS,data)
        return data
    }
}