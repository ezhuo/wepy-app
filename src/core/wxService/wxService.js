import wepy from 'wepy';
import * as wxNotice from './wxNotice';
import * as wxHttp from './wxHttp';
import * as config from '../config';
import $Auth from '../data/auth';

export async function authorize(scope) {
  try {
    const res = await wepy.getSetting();
    if (!res.authSetting['scope.' + scope]) {
      try {
        return await wepy.authorize({
          scope: 'scope.' + scope
        });
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.resolve(res);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function userLogin(self) {
  try {
    let $auth = self.$auth;
    if (!$auth) {
      $auth = new $Auth(self);
    }
    $auth.app = self;
    if ($auth && $auth.loginData && $auth.loginData.openid) {
      return Promise.resolve({
        loginData: $auth.loginData,
        userInfo: $auth.userInfo
      });
    }
    const loginInfo = (await login(self)) || {};
    $auth.loginData = loginInfo.loginData;
    $auth.userInfo = Object.assign(loginInfo.userInfo, {
      openid: loginInfo.loginData.openid
    });
    return Promise.resolve(loginInfo);
  } catch (err) {
    console.error(err);
    wxNotice.$alert.info('登录失败，请稍后重试！');
    return Promise.reject(err);
  }
}

export async function login(self) {
  try {
    const login = (await wepy.login()) || {};
    if (login.code) {
      const res = await wxHttp.httpNoWait(self, 'GET', 'login', {
        code: login.code
      }) || {};
      res.data = res.data || {};
      if (res.data.data) {
        self.globalData.loginData = self.globalData.loginData || {};
        const loginData = Object.assign(self.globalData.loginData, res.data.data, {
          code: login.code
        });
        self.globalData.loginData = loginData;
        // 开始获取用户信息
        const userInfo = await getUserInfo(self, loginData);
        if (userInfo) {
          return {
            userInfo,
            loginData
          };
        } else {
          return Promise.reject(userInfo);
        }
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserInfo(self, loginData) {
  // 请求权限
  try {
    await authorize('userInfo');
    // 权限通过 ,获取用户资料
    const userInfo = await wepy.getUserInfo() || {};
    if (userInfo.userInfo) {
      // throw new Error('error');
      const res = await wxHttp.httpNoWait(self, 'POST', 'userInfo', {
        loginData,
        userInfo: userInfo.userInfo
      });
      if (res.data.data) {
        // 合并一些默认字段
        return Object.assign({}, config.userInfo, userInfo.userInfo);
      } else {
        return Promise.reject(res);
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
