import wepy from 'wepy';
import {
  wxStorage
} from './wxHelpers';

export default class AuthService {
  static set loginData(v) {
    wepy.$instance.globalData.loginData = v;
    wxStorage.set('loginData', v);
  }

  static set userInfo(v) {
    wepy.$instance.globalData.userInfo = v;
    wxStorage.set('userInfo', v);
  }

  static get loginData() {
    let __loginData = wepy.$instance.globalData.loginData || {};
    if (!__loginData.openid) {
      __loginData = wxStorage.getSync('loginData');
      wepy.$instance.globalData.loginData = __loginData;
    }
    return __loginData;
  }

  static get userInfo() {
    let __userInfo = wepy.$instance.globalData.userInfo || {};
    if (!__userInfo.openid) {
      __userInfo = wxStorage.getSync('userInfo');
      wepy.$instance.globalData.userInfo = __userInfo;
    }
    return __userInfo;
  }

  static destroyed() {
    wepy.$instance.globalData.userInfo = null;
    wepy.$instance.globalData.loginData = null;
    wxStorage.clear();
  }
}
