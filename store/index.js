import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations.js'
import * as actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		//微信登录Code
		loginCode:'',
		//微信用户信息
		userInfo:null,
		//是否已经获取手机号
		hasPhone: false,
		//是否已经有昵称
		hasNickName: false,
		//是否已经有邮箱
		hasEmail: false,
		//包含微信返回的加密手机号
		phoneData: null,
		//登录用户
		loginUser:null,
		//是否服务登录
		isLogin:false
	},
	mutations,
	actions
});

export default store;