import * as config from '../config';

class Intercept {
  // 发出请求时的回调函数
  config(params) {
    // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
    params.timestamp = +new Date();
    params.header = params.header || {};

    this.globalData = this.globalData || {};
    this.globalData.loginData = this.globalData.loginData || {};
    const openid = this.globalData.loginData.openid;
    const tokenid = this.globalData.loginData.session_key;
    params.header = Object.assign(
      params.header, {
        'content-type': 'application/json'
      },
      config.setRequestHeader(params.data, tokenid, openid));

    // console.log('config request: ', params);
    // 必须返回OBJECT参数对象，否则无法发送请求到服务端
    return params;
  }

  // 请求成功后的回调函数
  success(params) {
    // 可以在这里对收到的响应数据对象进行加工处理
    // console.log('request success: ', params);
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return params;
  }

  // 请求失败后的回调函数
  fail(params) {
    // console.log('request fail: ', params);
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return params;
  }

  // 请求完成时的回调函数(请求成功或失败都会被执行)
  complete(params) {
    return params;
  }
};

export function InterceptRequest() {
  return new Intercept(this);
}
