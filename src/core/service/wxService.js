import wepy from 'wepy';
import http from '../http';

export default class wxService extends http {
  static async userLogin($app) {
    try {
      let $auth = $app.$auth;
      if (!$auth) {
        $auth = this.$auth;
      }
      if ($auth && $auth.loginData && $auth.loginData.openid) {
        return Promise.resolve({
          loginData: $auth.loginData,
          userInfo: $auth.userInfo
        });
      }
      const loginInfo = (await this.login($app)) || {};
      $auth.loginData = loginInfo.loginData;
      $auth.userInfo = Object.assign(loginInfo.userInfo, {
        openid: loginInfo.loginData.openid
      });
      return Promise.resolve(loginInfo);
    } catch (err) {
      console.error(err);
      this.$alert.info('登录失败');
      return Promise.reject(err);
    }
  }

  static async login($app) {
    try {
      const login = (await wepy.login()) || {};
      if (login.code) {
        const res = await this.httpNoWait($app, 'GET', 'login', {
          code: login.code
        }) || {};
        res.data = res.data || {};
        if (res.data.data) {
          $app.globalData.loginData = $app.globalData.loginData || {};
          const loginData = Object.assign($app.globalData.loginData, res.data.data, {
            code: login.code
          });
          $app.globalData.loginData = loginData;
          // 开始获取用户信息
          const userInfo = await this.getUserInfo($app, loginData);
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

  static async getUserInfo($app, loginData) {
    // 请求权限
    try {
      await this.authorize('userInfo');
      // 权限通过 ,获取用户资料
      const userInfo = await wepy.getUserInfo() || {};
      if (userInfo.userInfo) {
        // throw new Error('error');
        const res = await this.httpNoWait($app, 'POST', 'userInfo', {
          loginData,
          userInfo: userInfo.userInfo
        });
        if (res.data.data) {
          // 合并一些默认字段
          return Object.assign({}, this.appConfig.userInfo, userInfo.userInfo);
        } else {
          return Promise.reject(res);
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
