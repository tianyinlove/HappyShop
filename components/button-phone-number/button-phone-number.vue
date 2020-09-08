<template>
	<view>
		<!-- #ifdef MP -->
		<button v-if="hasPhoneNumber || hasOldUser" class="button button-open" :class="{'button-plain': plain}" @click="handleClick">{{buttonText}}</button>
		<button v-else class="button button-open" :class="{'button-plain': plain}" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">{{buttonText}}</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
<!-- 		<wx-open-launch-weapp id="launch-btn" username="gh_ff1c8ec34b72" path="/pages/index/index.html">
			<script type="text/wxtag-template">
				<style>.btn { width: 129rpx;height: 44rpx;font-size: 22rpx; color: #fff; background-color: #2D8BFF; border: none; border-radius: 100rpx; margin-top: 30rpx; }</style>
				<button class="button button-open"  type="default">打开直播</button>
			</script>
		</wx-open-launch-weapp> -->
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'ButtonPhoneNumber',
		props: {
			buttonText: String,
			plain: Boolean
		},
		data() {
			return {}
		},
		computed: {
			state() {
				return this.$store.state
			},
			hasOldUser() {
				return this.state.hasOldUser
			},
			hasPhoneNumber() {
				return this.state.hasPhoneNumber
			},
			userInfo() {
				return this.state.userInfo
			}
		},
		methods: {
			onGetPhoneNumber({
				detail
			}) {
				console.info('onGetPhoneNumberDetail:', detail)
				if (detail.errMsg === 'getPhoneNumber:ok') {
					this.$store.commit('setPhoneNumberDetail', detail)
					this.handleClick()
				}
			},
			handleClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.button-plain {
		background-color: transparent;
		border: none;

		&::after {
			border: none;
		}
	}
</style>
