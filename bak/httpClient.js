import wepy from 'wepy'
import * as helpers from '../helpers';
import * as config from '../config';

export default class httpClientMixin extends wepy.mixin {
  data = {
    httpLoading: false
  }

  $httpAjax(op, complete) {
    const self = this;
    if (op.url.charAt(op.url.length - 1) === '/') {
      op.url = op.url.slice(0, op.url.length - 1);
    }
    return new Promise((resolve, reject) => {
      self.httpLoading = true;
      self.$apply();
      // 增强体验：加载中
      wx.showNavigationBarLoading();
      console.log('http start----');
      op = Object.assign(op, {
        success({
          header,
          errMsg,
          data,
          statusCode
        }) {
          if (statusCode === 200) {
            return resolve(data);
          } else {
            return reject(data);
          }
        },
        fail({
          header,
          errMsg,
          data,
          statusCode
        }) {
          return reject(data);
        },
        complete(res) {
          // 隐藏加载提示
          self.httpLoading = false;
          if (helpers.isFunction(complete)) {
            complete();
          }
          self.$apply();
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          console.log('http end----', res);
        }
      });
      console.table(op);
      return wepy.request(op)
    });
  };

  $http(method, api, body = {}, complete = null) {
    return this.$httpAjax({
      url: api,
      data: body,
      method: method
    }, complete)
  }

  $httpGet(api, body = {}, complete = null) {
    return this.$httpAjax({
      url: config.api.base + '/' + api,
      data: body,
      method: 'GET'
    }, complete)
  }

  $httpPost(api, body = {}, complete = null) {
    return this.$httpAjax({
      url: config.api.base + '/' + api,
      data: body,
      method: 'POST'
    }, complete)
  }

  $httpPut(api, body = {}, complete = null) {
    return this.$httpAjax({
      url: config.api.base + '/' + api,
      data: body,
      method: 'PUT'
    }, complete)
  }

  $httpDelete(api, body = {}, complete = null) {
    return this.$httpAjax({
      url: config.api.base + '/' + api,
      data: body,
      method: 'DELETE'
    }, complete)
  }
}
