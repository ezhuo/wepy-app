import wxStorage from '../wxService/wxStorage';

class Auth {
  __app = null;
  __loginData = null;
  __userInfo = null;

  constructor(e) {
    this.app = e;
  }

  set app(v) {
    if (v) {
      if (v.globalData) {
        this.__app = v;
      } else if (v.$parent) {
        this.__app = v.$parent
      }
    }
  }

  set loginData(v) {
    this.__loginData = v;
    this.__app.globalData.loginData = v;
    wxStorage.set('loginData', v);
  }

  set userInfo(v) {
    this.__userInfo = v;
    this.__app.globalData.userInfo = v;
    wxStorage.set('userInfo', v);
  }

  get loginData() {
    this.__loginData = this.__loginData || this.__app.globalData.loginData || {};
    if (!this.__loginData.openid) {
      this.__loginData = wxStorage.getSync('loginData');
      this.__app.globalData.loginData = this.__loginData;
    }
    return this.__loginData;
  }

  get userInfo() {
    this.__userInfo = this.__userInfo || this.__app.globalData.userInfo || {};
    if (!this.__userInfo.openid) {
      this.__userInfo = wxStorage.getSync('userInfo');
      this.__app.globalData.userInfo = this.__userInfo;
    }
    return this.__userInfo;
  }

  destroyed() {
    this.__loginData = null;
    this.__userInfo = null;
    this.__app.globalData.userInfo = null;
    this.__app.globalData.loginData = null;
    wxStorage.clear();
  }
}

export default Auth;
