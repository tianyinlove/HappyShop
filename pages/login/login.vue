<template>
	<form class='loginView' @submit="login">
		<view class="input-view">
			<view class="label-view">
				<text class="label">账号 </text>
			</view>
			<input class="input" type="text" placeholder="请输入用户名" name="nameValue" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">密码</text>
			</view>
			<input class="input" type="password" placeholder="请输入密码" name="passwordValue" />
		</view>
		<view class="button-view">
			<button type="default" class="login" hover-class="hover" formType="submit">登录</button>
			<button type="default" class="register" hover-class="hover" @click="goRegister">免费注册</button>
			<button-user-info class="button-open button-open2" @click="wxlogin" buttonText="微信登录"></button-user-info>
			<button-phone-number class="button-open button-open2" @click="wxlogin" buttonText="获取手机号"></button-phone-number>
		</view>
	</form>
</template>

<script>
	export default {
		data() {
			return {};
		},
		computed:{
			state() {
				return this.$store.state
			},
			isLogin(){
				return this.state.isLogin
			},
			loginCode(){
				return this.state.loginCode
			}
		},
		onLoad(options) {
			if (this.isLogin) {
				wx.navigateBack({
				  delta: 1
				})
			}else if(!this.loginCode&&this.loginCode!=''){
				const {
					dispatch,
					commit
				} = this.$store
				
				dispatch('login');
			}
		},
		methods: {
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			async login(e) {
				const {
					dispatch,
					commit
				} = this.$store
				const accountName = e.detail.value.nameValue;
				const passWord = e.detail.value.passwordValue;
				if (!accountName) {
					uni.showModal({
						title: '温馨提示',
						content: '账号不能为空'
					});
					return;
				}
				if (!passWord) {
					uni.showModal({
						title: '温馨提示',
						content: '密码不能为空'
					});
					return;
				}
				const data = {
					phoneNumber: accountName,
					email: accountName,
					passWord: passWord,
				};
				console.log("登录参数", data);
				const isLogin = await dispatch('loginApi', data);
				console.log("登录结果", isLogin)
				if (isLogin) {
					wx.navigateBack({
					  delta: 1
					})
				}
			},
			async wxlogin() {
				const {
					dispatch,
					commit
				} = this.$store

				const isOk = await dispatch('loginApi');
				console.log("登录结果", isOk)
				if (isOk) {
					wx.navigateBack({
					  delta: 1
					})
				}
			}
		}
	}
</script>

<style>

</style>
