<template>
	<form class='loginView'>
		<view class="input-view">
			<view class="label-view">
				<text class="label">手机 </text>
			</view>
			<input class="input" type="text" placeholder="请输入手机号" v-model="loginUser.phoneNumber" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">密码 </text>
			</view>
			<input class="input" type="password" placeholder="请输入密码" v-model="loginUser.passWord" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">昵称 </text>
			</view>
			<input class="input" type="text" placeholder="请输入昵称" v-model="loginUser.nickName" />
		</view>
		<view class="button-view">
			<button type="default" class="login" hover-class="hover" @click="bindUser">保存</button>
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
			loginUser(){
				return this.state.loginUser
			}
		},
		onLoad(options) {
			if (!this.isLogin) {
				wx.navigateTo({
					url:'../login/login'
				});
			}
		},
		methods: {
			async bindUser() {
				const {
					dispatch,
					commit
				} = this.$store
				
				const data={
					id:this.loginUser?.id,
					nickName:this.loginUser?.nickName,
					phoneNumber:this.loginUser?.phoneNumber,
					headImg:this.loginUser?.headImg,
					passWord:this.loginUser?.passWord
				};
				console.log("用户信息",data);
				if(!data.phoneNumber){
					uni.showModal({
						title: '温馨提示',
						content: '手机号不能为空'
					});
					return;
				}
				if(!data.nickName){
					uni.showModal({
						title: '温馨提示',
						content: '昵称不能为空'
					});
					return;
				}
				const isOk=await dispatch('userBind',data);
				if (isOk) {
					wx.reLaunch({
						url:'./center'
					});
				}
			}
		}
	}
</script>

<style>
	
</style>
