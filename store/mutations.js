export function setLoginCode(state,data){
	state.loginCode=data;
}

export function setUserInfo(state,data){
	state.userInfo=data;
}

export function setLoginUser(state,data){
	state.isLogin=true;
	if(data.phoneNumber){
		state.hasPhoneNumber = true;
	}
	if(data.email){
		state.hasEmail=true;
	}
	if(data.nickName){
		state.hasNickName=true;
	}
	state.loginUser=data;
}

export function setPhoneData(state, payload) {
	state.phoneData = payload
}
