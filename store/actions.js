import Urls from '../config/Urls.js'
import {ACOUNT_ID} from '../config/constant.js'

/*
 * 微信用户登录
 */
export function login({
	state:{
		loginCode
	},
	commit,
	dispatch
}){
	if(!loginCode){
		wx.login({
		  success (res) {
			  console.log("微信登录",res);
			  if (res.code) {
				  commit("setLoginCode",res.code);
				  dispatch("getUserInfo");
			  }
		  }
		});
	}else{
		dispatch("getUserInfo");
	}
}

/*
 * 获取微信用户信息
 */
export function getUserInfo({
	state:{
		userInfo
	},
	commit,
	dispatch
}){
	if(!userInfo){
		wx.getUserInfo({
			success:function(data){
				console.log("微信用户",data.userInfo);
				commit('setUserInfo', data.userInfo);
				dispatch("loginApi");
			}
		});
	}else{
		dispatch("loginApi");
	}
}

/*
 * 获取登录用户信息
 */
export async function loginApi({
	state:{
		loginCode,
		userInfo,
		phoneData
	},
	commit,
	dispatch
},param){
	const data={
		acountId:ACOUNT_ID,
		code:loginCode,
		headImg:userInfo?.avatarUrl??'',
		nickName:userInfo?.nickName??'',
		iv:phoneData?.iv??'',
		encryptedData:phoneData?.encryptedData??'',
		phoneNumber:param?.phoneNumber??'',
		email:param?.email??'',
		passWord:param?.passWord??''
	};
	const url=`${Urls.DOMAIN_ApiService}/shopapi/user/login`;
	const [error, ret] = await uni.request({
		url: url,
		method: 'POST',
		data
	});
	
	console.log("调用登录服务",data,ret);
	
	if(ret.statusCode==200){
		if(ret.data.result.code==0){
			commit('setLoginUser',ret.data.detail);
			return true;
		}else{
			uni.showModal({
				title: '温馨提示',
				content: ret.data.result.msg
			});
		}
	}
	return false;
}

/*
 * 用户绑定
 */
export async function userBind({
	commit,
	dispatch
},data){
	const url=`${Urls.DOMAIN_ApiService}/shopapi/user/binduser`;
	const [error, ret] = await uni.request({
		url: url,
		method: 'POST',
		data
	});
	
	console.log("调用用户服务",data,ret);
	
	if(ret.statusCode==200){
		if(ret.data.result.code==0){
			commit('setLoginUser',ret.data.detail);
			return true;
		}else{
			uni.showModal({
				title: '温馨提示',
				content: ret.data.result.msg
			});
		}
	}
	return false;
}
