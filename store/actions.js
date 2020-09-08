import Urls from '../config/Urls.js'
import {
	APP_ID,
	ACOUNT_ID,
	ACTIVITY_CODE
} from '../config/constant.js'


/**
 * 获取微信用户信息
 */
export function getUserInfo({
	commit,
	dispatch
}) {
	wx.login({
		success: ({
			code
		}) => {
			console.info('微信登录授权码:', code)
			commit('login', code);
			dispatch('getUser');

			wx.getUserInfo({
				success: ({
					userInfo
				}) => {
					console.info('微信用户信息: ', userInfo)
					commit('setUserInfo', userInfo)
				}
			})
		}
	})
}

/**
 * 查询是否是老用户
 */
export function getUser({
	state: {
		loginCode
	},
	commit,
	dispatch
}) {
	const data = {
		acountId: ACOUNT_ID,
		code: loginCode,
		appId: APP_ID,
		activityCode: ACTIVITY_CODE
	}
	uni.request({
		url: `${Urls.DOMAIN_EMAPP}/activity/Share/GetUser`,
		method: 'POST',
		data,
		success: ({
			data
		}) => {
			console.info('获取已授权用户: ', data)
			var pids = ['888010000', '888020000', '888080000'];
			if (data.result.code === 0 && data.detail && data.detail.passKey) {
				if (pids.includes(data.detail.pcPid)) {
					commit('setOldUser');
				}
				if (data.detail.phoneGuid) {
					commit('setPhoneNumberDetail');
				}
				commit('setLoginUser', data.detail);
				//加载商品信息
				dispatch('getLogisticsByPids');
			}
			return data.detail;
		}
	})
}


/**
 * 创建用户
 */
export async function createUser({
	state: {
		loginCode,
		passKey,
		phoneNumberDetail,
		userInfo,
		loginUser
	},
	commit,
	dispatch
}) {
	const data = {
		activityCode: ACTIVITY_CODE,
		appId: APP_ID,
		acountId: ACOUNT_ID,
		iv: phoneNumberDetail.iv,
		encryptedData: phoneNumberDetail.encryptedData,
		code: loginCode,
		passKey,
		markPhone: loginUser.markPhone,
		headImg: loginUser.headImg,
		nickName: loginUser.nickName,
		unionid: loginUser.unionid,
		openId: loginUser.openId,
		phoneGuid: loginUser.phoneGuid
	}

	if (userInfo) {
		data.headImg = userInfo.avatarUrl
		data.nickName = userInfo.nickName
	}

	const [error, res] = await uni.request({
		url: `${Urls.DOMAIN_EMAPP}/activity/Share/CreateUser`,
		method: 'POST',
		data,
	});

	console.info('创建分享用户关系: ', res.data)

	commit('setLoginUser', res.data.detail);
	//加载商品信息
	await dispatch('getLogisticsByPids');

	return res.data.detail;
}

/**
 * 获取分享者的信息
 */
export async function getShareUser({
	state: {
		passKey
	}
}) {
	const [error, res] = await uni.request({
		url: `${Urls.DOMAIN_EMAPP}/activity/Share/GetShareUser`,
		data: {
			passKey
		},
	});
	console.info("分享者信息：",res.data);
	return res.data;
}

/**
 * 获取物流包
 */
export async function getLogisticsByPids({
	state: {
		loginUser
	},
	commit
}) {
	const data = {
		pid: '888010000',
		passKey: loginUser.passKey
	};
	const [error, res] = await uni.request({
		url: `${Urls.DOMAIN_EMAPP}/buy/Wechat/GetLogisticsByPids`,
		method: 'POST',
		data
	});
	if (res.data.result.code === 0 && res.data.detail) {
		commit('setGoodsInfo', res.data.detail);
		commit('setGoodsId', res.data.detail[0].list[0].id);
	}
}

/**
 * 创建订单
 */
export async function createOrder({
	state: {
		orderNumber,
		goodsId,
		loginUser
	},
	commit
}) {
	const data = {
		appId: APP_ID,
		goodsId,
		paymentMethodId: 202,
		openId: loginUser.openId,
		orderNumber,
		passKey: loginUser.passKey,
	};

	const [error, res] = await uni.request({
		url: `${Urls.DOMAIN_EMAPP}/buy/Wechat/CreateOrder`,
		method: 'POST',
		data
	});
	console.info('创建订单: ', res.data);

	commit('setOrderNumber', res.data.detail.orderNumber);

	return res.data.detail;
}

/**
 * 尝试发起支付
 */
export async function initiatePayment({
	state,
	commit,
	dispatch
}) {
	if(!state.goodsId||state.goodsId==0){
		//提示联系客服
		return;
	}
	console.info('立即购买: ', state.goodsId);
	if (state.hasOldUser) {
		// 老用户
		uni.showModal({
			content: '您已经是智盈用户了，无需购买'
		})
	} else {
		if (!state.loginUser || !state.loginUser.passKey) {
			//创建用户
			await dispatch('createUser');
		}
		//发起支付
		const order = await dispatch('createOrder');
		wx.requestPayment({
			timeStamp: order.pay.timeStamp,
			nonceStr: order.pay.nonceStr,
			package: order.pay.package,
			signType: order.pay.signType,
			paySign: order.pay.paySign,
			success: function(res) {
				commit("setOrderNumber","");
				wx.showToast({
					title: '支付成功',
					icon: 'success',
					mask: true
				});
			},
			fail:function(res){
				console.info('支付失败: ', res);
			}
		});
	}

}
