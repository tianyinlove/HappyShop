import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations.js'
import * as actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 是否登录
		hasLogin: false,
		// 是否已经是益盟老用户
		hasOldUser: false,
		// 微信登录code
		loginCode: null,
		// 微信用户信息
		userInfo: null,
		// 是否已经获取手机号
		hasPhoneNumber: false,
		// 分享者的唯一标识
		passKey: '',
		// 包含微信返回的加密手机号
		phoneNumberDetail: null,
		//商品信息
		goodsData:null,
		//当前购买商品Id
		goodsId:0,
		//已创建订单号
		orderNumber:'',
		//当前登录用户passkey
		loginUser:null
	},
	mutations,
	actions
})

export default store
