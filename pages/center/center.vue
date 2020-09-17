<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!isLogin ? 'logo-hover' : ''">
			<image class="logo-img" :src="isLogin ? loginUser.headImg :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{isLogin ? loginUser.nickName : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!isLogin">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60c;</text>
				<text class="list-text">收藏图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe60d;</text>
				<text class="list-text">收藏图集</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">管理图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe61a;</text>
				<text class="list-text">上传图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">关于</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="goUser" v-if="isLogin">
				<text class="list-icon">&#xe609;</text>
				<text class="list-text">账号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '/static/logo.png'
			}
		},
		computed:{
			state() {
				return this.$store.state
			},
			isLogin(){
				return this.state.isLogin
			},
			loginUser(){
				return this.state.loginUser
			}
		},
		onLoad(options) {
			if(!this.isLogin){
				const {
					dispatch,
					commit
				} = this.$store
				
				dispatch("login");
			}
		},
		methods: {
			goLogin() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			goUser() {
				uni.navigateTo({
					url: './user'
				});
			}
		}
	}
</script>

<style>
</style>
