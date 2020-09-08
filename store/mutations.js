export function login(state, payload) {
	state.hasLogin = true
	state.loginCode = payload
}

export function setOldUser(state){
	// state.hasOldUser = true
}

export function setUserInfo(state, payload) {
	state.userInfo = payload
}

export function setPhoneNumberDetail(state, payload) {
	state.hasPhoneNumber = true
	state.phoneNumberDetail = payload
}

export function setPasskey(state, payload) {
	state.passKey = payload
}

export function setLoginUser(state, payload) {
	state.loginUser = payload
}

export function setGoodsInfo(state, payload) {
	state.goodsData = payload
}

export function setGoodsId(state, payload) {
	state.goodsId = payload
}

export function setOrderNumber(state, payload) {
	state.orderNumber = payload
}
