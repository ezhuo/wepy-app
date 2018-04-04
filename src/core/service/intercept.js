import wepy from 'wepy';
import base from '../base';

const build = (params) => {
  params = params || {};
  params.data = params.data || {};

  const $httpCode = params.statusCode;
  let $httpMessage = '';
  let $noticeInfo = '';
  if (base.appConfig.httpCode.hasOwnProperty($httpCode)) {
    $httpMessage += base.appConfig.httpCode[$httpCode];
  }
  if (base.helpers.isObject(params.data) && params.data.message) {
    $noticeInfo = $httpMessage + params.data.message;
  }
  if ($noticeInfo.trim().toLowerCase() === 'success') {
    $noticeInfo = '';
  }
  if ($noticeInfo.trim().toLowerCase() === 'error') {
    $noticeInfo = '';
  }

  switch ($httpCode) {
    case 200:
      break;
    case 201:
      break;
    case 202:
      break;
    case 203:
      break;
    case 204:
      break;
    case 205:
      break;
  }

  switch ($httpCode) {
    case 400:
      break;
    case 401:
      // 重要通知，签权失败
      base.$auth.destroyed();
      $noticeInfo = '登录已失效，请重新登录';
      break;
    case 403:
      break;
    case 404:
      break;
    case 406:
      break;
    case 410:
      break;
    case 411:
      break;
    case 412:
      break;
    case 422:
      // 数据验证
      $noticeInfo = '';
      break;
    case 500:
      break;
  }
  if ($noticeInfo) {
    base.$notice.info($noticeInfo);
  }
}

export default class Intercept {
  globalData = {};
  // 发出请求时的回调函数
  config(params) {
    // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
    params.timestamp = +new Date();
    params.header = params.header || {};
    this.globalData = wepy.$instance.globalData || {};
    this.globalData.loginData = this.globalData.loginData || {};
    const openid = this.globalData.loginData.openid;
    const tokenid = this.globalData.loginData.session_key;
    params.header = Object.assign(
      params.header, {
        'content-type': 'application/json'
      },
      base.setRequestHeader(params.data, tokenid, openid));

    // console.log('config request: ', params);
    // 必须返回OBJECT参数对象，否则无法发送请求到服务端
    return params;
  }

  // 请求成功后的回调函数
  success(params) {
    // 可以在这里对收到的响应数据对象进行加工处理
    // console.log('request success: ', params);
    build(params);
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return params;
  }

  // 请求失败后的回调函数
  fail(params) {
    // console.log('request fail: ', params);
    build(params);
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return params;
  }

  // 请求完成时的回调函数(请求成功或失败都会被执行)
  complete(params) {
    build(params);
    return params;
  }
};
