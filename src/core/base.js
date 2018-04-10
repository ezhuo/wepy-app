import wepy from 'wepy';
import md5 from 'blueimp-md5';
import AuthService from './service/authService.js';
import * as wxHelpers from './service/wxHelpers.js';
import * as helpers from './helpers.js';
import * as appConfig from './config';

export default class base {
  static $notice = wxHelpers.$notice;
  static $alert = wxHelpers.$alert;
  static $storage = wxHelpers.wxStorage;
  static $auth = AuthService;
  static helpers = helpers;
  static appConfig = appConfig;

  static async authorize(scope) {
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

  static setRequestHeader($data, $token = null, $openid = null) {
    let headers = {}
    let rData = $data || {}
    rData = JSON.stringify(rData)
    // console.log($data)
    try {
      // 数据发送类型
      headers.style = appConfig.http.style || '10';
      // token
      headers.token = $token || '' // 用户TOKEN
      headers.openid = $openid || '' // openid
      headers.weixin = '10';
      // check
      // let md5_src = headers.style + headers.token + JSON.stringify(rData) + _app_options.define_config.REQUEST_CHECK_CODE;
      let md5Src = headers.style + headers.token + rData + appConfig.http.check;
      // check
      headers.validate = md5(md5Src)
      // console.log(md5_src, headers.validate);
      // console.log(rData);
    } catch (e) {
      console.error(e)
    }
    return headers
  }
}
