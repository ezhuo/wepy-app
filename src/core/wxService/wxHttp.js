import wepy from 'wepy';
import * as helpers from '../helpers';
import * as config from '../config';

/*
export function __ajaxPromise(self, op, complete) {
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
    // console.table(op);
    return wepy.request(op)
  });
};
*/

async function __ajax(self, op, complete) {
  funcInit();
  return funcAjax();

  // ------------------------
  function funcInit() {
    if (op.url.charAt(op.url.length - 1) === '/') {
      op.url = op.url.slice(0, op.url.length - 1);
    }
    op.method = (op.method || 'GET').toUpperCase();
    if (self && self.$apply) {
      self.httpLoading = true;
      self.$apply();
    }
    // 增强体验：加载中
    wx.showNavigationBarLoading();
    console.log('http start----');
    // op = Object.assign(op)
    // console.table(op);
  }

  async function funcAjax() {
    let res = {};
    try {
      res = await wepy.request(op);
      return funcSuccess(res);
    } catch (err) {
      return funcError(err);
    } finally {
      funcFinally(res);
    }
  }

  function funcSuccess(res) {
    if (res.statusCode === 200) {
      return Promise.resolve(res);
    } else {
      return funcError(res);
    }
  }

  function funcError(err) {
    return Promise.reject(err);
  }

  function funcFinally(res) {
    if (helpers.isFunction(complete)) {
      complete(res);
    }
    if (self && self.$apply) {
      // 隐藏加载提示
      self.httpLoading = false;
      self.$apply();
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    console.log('http end----', res);
  }
};

async function __ajaxList(self, op, complete) {
  console.log(self);
  // let list = {};
  let loginData = {};
  if (self.$parent) {
    // list = self.$parent.globalData.ajaxList;
    loginData = self.$parent.globalData.loginData;
  } else {
    // list = self.globalData.ajaxList;
    loginData = self.globalData.loginData;
  }
  if (loginData && loginData.openid) {
    // 已登录
    return __ajax(self, op, complete);
  } else {
    // 未登录
    // 放到队列里，等待用户成功登录后，再操作
    // const ajaxId = md5(JSON.stringify(op));
    // if (!list[ajaxId]) {
    //   list[ajaxId] = {
    //     self,
    //     op,
    //     complete
    //   };
    // }
    return timeOutAjax();
  }

  async function timeOutAjax() {
    // 800 毫秒后，再执行
    return new Promise((resolve, reject) => {
      const to = 800;
      console.log(' 由于没有登录，进入等待' + to + ' ms 后，再操作...');
      setTimeout(async () => {
        try {
          const res = await __ajax(self, op, complete);
          return resolve(res);
        } catch (err) {
          return reject(err);
        }
      }, to);
    })
  }
}

export async function http(self, method, api, body = {}, complete = null) {
  return __ajax(self, {
    url: api,
    data: body,
    method: method
  }, complete)
}

export async function httpNoWait(self, method, api, body = {}, complete = null) {
  return __ajax(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: method
  }, complete)
}

export async function get(self, api, body = {}, complete = null) {
  return __ajaxList(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'GET'
  }, complete)
}

export async function post(self, api, body = {}, complete = null) {
  return __ajaxList(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'POST'
  }, complete)
}

export async function put(self, api, body = {}, complete = null) {
  return __ajaxList(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'PUT'
  }, complete)
}

export async function del(self, api, body = {}, complete = null) {
  return __ajaxList(self, {
    url: config.api.base + '/' + api,
    data: body,
    method: 'DELETE'
  }, complete)
}
