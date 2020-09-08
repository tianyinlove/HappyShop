<template>
	<view class="container">
		<view class="wrapper">
			<image class="img img1" src="../../static/images/detail/img1.png" mode="aspectFill"></image>
			<button-phone-number class="button-open" plain @click="pay"></button-phone-number>
		</view>
		<image class="title" src="../../static/images/detail/bs.png" mode="aspectFit"></image>
		<image class="title" src="../../static/images/detail/title1.png" mode="aspectFit"></image>
		<image class="title" src="../../static/images/detail/title2.png" mode="aspectFit"></image>
		<image class="open" src="../../static/images/detail/open.png" mode="aspectFit"></image>
		<view class="icon-wrapper">
			<image class="icon" src="../../static/images/detail/icon.png" mode="aspectFit"></image>
		</view>
		<view class="risk-warning">风险提示：本页面数据仅供参考，不代表未来趋势；需要投资者根据不同行情合理应用、控制风险。</view>
		<view class="footer">
			<view class="price"><text class="symbol">￥</text>288</view>
			<view class="text">开通享15个月，再送3个月五星研报</view>
			<button-phone-number class="button-open2" buttonText="立即购买" plain @click="pay"></button-phone-number>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			pay() {
				this.$store.dispatch('initiatePayment')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f43846;
		padding-bottom: 110rpx;
	}

	.wrapper {
		position: relative;
		display: flex;
	}


	.img {
		width: 100%;
	}

	.img1 {
		height: 723rpx;
	}

	.button-open {
		/deep/ .button {
			bottom: 50rpx;
			width: 608rpx;
			height: 94rpx;
		}
	}

	.title {
		width: 100%;
		height: 86rpx;
	}

	.open {
		width: 100%;
		height: 40rpx;
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 692rpx;
		height: 254rpx;
		margin: 30rpx;
		border-radius: 12rpx;
		background-color: #ffffff;
	}

	.icon {
		width: 593rpx;
		height: 192rpx;
	}

	.risk-warning {
		padding: 20rpx 30rpx;
		font-size: 22rpx;
		line-height: 30rpx;
		color: #770810;
		opacity: 0.78;
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		height: 110rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20px;

		.price {
			line-height: 36rpx;
			color: #f43846;
			font-size: 44rpx;
			color: #f43846;

			.symbol {
				font-size: 30rpx;
			}
		}

		.text {
			font-size: 24rpx;
			line-height: 42rpx;
			color: #000000;
		}
	}

	.button-open2 {
		/deep/ .button {
			right: 24rpx;
			left: auto;
			top: 14rpx;
			width: 254rpx;
			height: 80rpx;
			transform: none;
			background-color: #f6ce13;
			border-radius: 39rpx;
			font-size: 32rpx;
			color: #3f1a06;
		}

	}
</style>
