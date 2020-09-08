<template>
	<view class="container">
		<view class="wrapper">
			<image class="img img1" src="../../static/images/index/img1.png" mode="aspectFit"></image>
			<image v-if="sharerAvatar" class="img-avatar" :src="sharerAvatar"></image>
			<button-phone-number class="button-open" buttonText="立即开通" @click="pay"></button-phone-number>
		</view>
		<image class="img img2" src="../../static/images/index/img2.png" mode="aspectFit"></image>
		<view class="wrapper">
			<image class="img img3" src="../../static/images/index/img3.png" mode="aspectFit"></image>
			<view class="stock-list">
				<view v-for="(item, index) in stockList" :key="index" class="stock-item">
					<view class="stock">{{item.stockName}}</view>
					<view class="date">{{dayjs(item.selDate).format('YYYY-MM-DD')}}</view>
					<view class="percent">{{item.maxRatio}}%</view>
					<view class="days">{{item.deffDays}}</view>
				</view>
			</view>
			<button-phone-number class="button-more" plain @click="pay"></button-phone-number>
		</view>
		<view class="wrapper">
			<image class="img img4" src="../../static/images/index/img4.png" mode="aspectFit"></image>
			<button-phone-number class="button-open button-open2" buttonText="立即开通" @click="pay"></button-phone-number>
			<view class="share-info">
				<view class="user-list">
				</view>
				<view class="nick-name">{{sharerNickName}}的{{userCount}}位好友已开通</view>
			</view>

		</view>
		<view class="buttons">
			<button class="button-introduce" @click="navigateToDetail">了解智盈</button>
			<button class="button-download">下载APP</button>
		</view>
		<view class="footer">
			<view class="text">益盟股份是腾讯旗下中国领先的金融信息服务集团，深耕服务于个人投资者18年，为用户提供互联网化的深度金融服务。全面覆盖证券辅助决策软件、投资者教育、投资顾问三大业务，致力于提高用户获利能力。</view>
			<view class="text">风险提示：本页面数据仅供参考，不代表未来趋势；需要投资者根据不同行情合理应用、控制风险。</view>
		</view>
	</view>
</template>

<script>
	import ButtonPhoneNumber from '../../components/button-phone-number/button-phone-number.vue'
	import dayjs from 'dayjs'

	export default {
		components: {
			ButtonPhoneNumber
		},
		data() {
			return {
				/**
				 * 分享者的昵称
				 */
				sharerNickName: '',
				sharerAvatar:'',
				stockList: [],
				userCount: 0,
				userShareNews:[]
			}
		},
		computed: {
			state() {
				return this.$store.state
			},
			phoneNumberDetail() {
				return this.state.phoneNumberDetail
			},
			hasOldUser() {
				return this.state.hasOldUser
			},
			userInfo() {
				return this.state.userInfo
			}
		},
		onLoad(options) {
			console.info('onLoad:options', options);
			// #ifdef MP-WEIXIN
			const {
				dispatch,
				commit
			} = this.$store
			dispatch('getUserInfo')

			if (options) {
				if (options.passKey) {
					commit('setPasskey', options.passKey);
				}
			}
			
			if (process.env.NODE_ENV === 'production') {
				// 打开调试
				wx.setEnableDebug({
					enableDebug: true
				})
			}
			// #endif
			this.getShareUser();
			
			// const jweixin = require('jweixin-module')

			// jweixin.config({
			// 	debug: true,
			// 	appId: '', // 必填，公众号的唯一标识
			// 	timestamp: '', // 必填，生成签名的时间戳
			// 	nonceStr: '', // 必填，生成签名的随机串
			// 	signature: '', // 必填，签名
			// 	jsApiList: [], // 必填，需要使用的JS接口列表
			// 	openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
			// })


			// jweixin.ready(function() {
			// 	console.info(11111111)
			// })
		},
		methods: {
			dayjs,
			pay() {
				this.$store.dispatch('initiatePayment')
			},
			/**
			 * 获取分享者的信息
			 */
			async getShareUser() {
				const {
					result,
					detail
				} = await this.$store.dispatch('getShareUser')

				if (result.code === 0) {
					this.sharerNickName=detail.nickName;
					this.sharerAvatar=detail.avatar;
					this.userCount = detail.userCount;
					this.stockList = detail.stockList;
					this.userShareNews=detail.userShareNews;
				}
			},
			navigateToDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail',
					success: data => {},
					fail: data => {

						console.log(data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #ffe9c4;
	}

	.wrapper {
		position: relative;
		display: flex;
	}


	.img {
		width: 100%;
	}

	.img1 {
		height: 1032rpx;
	}


	.img2 {
		height: 447rpx;
		margin: 30rpx auto 46rpx;
	}

	.img3 {
		height: 690rpx;
	}

	.img4 {
		height: 799rpx;
		margin: 64rpx auto 36rpx;
	}

	.button-open {
		/deep/ .button {
			bottom: 50rpx;
			width: 608rpx;
			height: 94rpx;
			line-height: 94rpx;
			color: #8a2f07;
			font-size: 42rpx;
			border-radius: 94rpx;
			background-image: linear-gradient(to bottom, #ffba34, #ffe436);
			box-shadow: 0 8rpx 0 #e36b01;

			&:active {
				box-shadow: none;
				bottom: 46rpx
			}
		}
	}

	.button-open2 {
		/deep/ .button {
			bottom: 170rpx;

			&:active {
				bottom: 166rpx
			}
		}
	}

	.button-more {
		/deep/ .button {
			bottom: 50rpx;
			width: 608rpx;
			height: 94rpx;
		}
	}


	.img-avatar {
		position: absolute;
		top: 116rpx;
		left: 313rpx;
		width: 122rpx;
		height: 122rpx;
		border-radius: 50%;
	}

	.stock-list {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		top: 150rpx;
		font-size: 26rpx;
		color: #7b522b;

		.stock-item {
			display: flex;
			align-items: center;
			height: 80rpx;
		}

		.stock,
		.date,
		.percent,
		.days {
			width: 0;
			flex: auto;
			text-align: center;
			box-sizing: border-box;
		}


		.date {
			margin-left: 20rpx;
		}

		.percent {
			padding-left: 24rpx;
		}
	}

	.share-info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 60rpx;
		text-align: center;

		.user-list {
			height: 44rpx;
			margin-bottom: 20rpx;
		}

		.nick-name {
			font-size: 24rpx;
			color: #fde6bd;
		}
	}


	.buttons {
		display: flex;
		justify-content: space-between;
	}

	.button-introduce,
	.button-download {
		width: 250rpx;
		line-height: 82rpx;
		color: #FFFFFF;
		border-radius: 82rpx;
		font-size: 15px;

		&::after {
			border: none;
		}
	}

	.button-introduce {
		background-color: #ffb136;
	}

	.button-download {
		background-color: #36a8ff;
	}

	.footer {
		padding: 40rpx 44rpx 10rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #af8c53;

		.text {
			padding-bottom: 20rpx;
		}
	}
</style>
