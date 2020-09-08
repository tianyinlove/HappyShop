const Urls = {
  get DOMAIN_APPSTATIC() {
    return process.env.__ENV === 'test'
      ? 'http://mobiletest.emoney.cn/appstatic'
      : 'https://appstatic.emoney.cn'
  },
  get DOMAIN_EMAPP() {
    return 'http://mobiletest.emoney.cn/emapp'
  }
}

export default Urls
