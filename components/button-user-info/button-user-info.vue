<template>
	<view>
		<button v-if="userInfo" class="register" @click="handleClick">{{buttonText}}</button>
		<button v-else class="register" open-type="getUserInfo" @getuserinfo="onGetUserInfo">{{buttonText}}</button>
	</view>
</template>

<script>
	export default {
		name: 'ButtonUserInfo',
		props: {
			buttonText: String
		},
		data() {
			return {}
		},
		computed: {
			state() {
				return this.$store.state
			},
			userInfo() {
				return this.state.userInfo
			}
		},
		methods: {
			onGetUserInfo({
				detail
			}) {
				console.info('获取微信用户:', detail)
				if (detail.errMsg === 'getUserInfo:ok') {
					this.$store.commit('setUserInfo', detail.userInfo);
					this.handleClick();
				}
			},
			handleClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
</style>
