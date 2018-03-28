import wepy from 'wepy';
import * as helpers from '../helpers';
import * as config from '../config';

export function __ajax(self, op, complete) {
  if (op.url.charAt(op.url.length - 1) === '/') {
    op.url = op.url.slice(0, op.url.length - 1);
  }
  return new Promise((resolve, reject) => {
    if (self) {
      self.httpLoading = true;
      self.$apply();
    }
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
        if (helpers.isFunction(complete)) {
          complete();
        }
        if (self) {
          self.httpLoading = false;
          self.$apply();
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log('http end----', res);
      }
    });
    console.table(op);
    return wepy.request(op)
  });
};

export function http(self, method, api, body = {}, complete = null) {
  return this.__ajax(self, {
    url: api,
    data: body,
    method: method
  }, complete)
}

export function get(self, api, body = {}, complete = null) {
  return this.__ajax(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'GET'
  }, complete)
}

export function post(self, api, body = {}, complete = null) {
  return this.__ajax(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'POST'
  }, complete)
}

export function put(self, api, body = {}, complete = null) {
  return this.__ajax(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'PUT'
  }, complete)
}

export function del(self, api, body = {}, complete = null) {
  return this.__ajax(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'DELETE'
  }, complete)
}
