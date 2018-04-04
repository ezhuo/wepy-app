import wepy from 'wepy';
import base from './base';

export default class http extends base {
  static async __ajax($app, op, complete) {
    funcInit.call(this);
    return funcAjax.call(this);

    // ------------------------
    function funcInit() {
      if (op.url.charAt(op.url.length - 1) === '/') {
        op.url = op.url.slice(0, op.url.length - 1);
      }
      op.method = (op.method || 'GET').toUpperCase();
      if ($app && $app.$apply) {
        $app.httpLoading = true;
        $app.$apply();
      }
      // 增强体验：加载中
      wx.showNavigationBarLoading();
      console.log('http start----');
      this.$notice.load('请稍等');
      // op = Object.assign(op)
      // console.table(op);
    }

    async function funcAjax() {
      let res = {};
      try {
        res = await wepy.request(op);
        return funcSuccess.call(this, res);
      } catch (err) {
        return funcError.call(this, err);
      } finally {
        funcFinally.call(this, res);
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
      if (this.helpers.isFunction(complete)) {
        complete(res);
      }
      if ($app && $app.$apply) {
        // 隐藏加载提示
        $app.httpLoading = false;
        $app.$apply();
      }
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      this.$notice.clearLoad();
      console.log('http end----', res);
    }
  };

  static async __ajaxList($app, op, complete) {
    let loginData = wepy.$instance.globalData.loginData;
    if (loginData && loginData.openid) {
      // 已登录
      return this.__ajax($app, op, complete);
    } else {
      return timeOutAjax.call(this);
    }

    async function timeOutAjax() {
      // 1500 毫秒后，再执行
      const that = this;
      const to = 1500;
      return new Promise((resolve, reject) => {
        that.$notice.load('等待登录');
        setTimeout(async () => {
          try {
            const res = await this.__ajax($app, op, complete);
            return resolve(res);
          } catch (err) {
            return reject(err);
          } finally {
            that.$notice.clearLoad();
          }
        }, to);
      })
    }
  }

  static async http($app, method, api, body = {}, complete = null) {
    return this.__ajax($app, {
      url: api,
      data: body,
      method: method
    }, complete)
  }

  static async httpNoWait($app, method, api, body = {}, complete = null) {
    return this.__ajax($app, {
      url: this.appConfig.api.base + '/' + api,
      data: body,
      method: method
    }, complete)
  }

  static async get($app, api, body = {}, complete = null) {
    return this.__ajaxList($app, {
      url: this.appConfig.api.base + '/' + api,
      data: body,
      method: 'GET'
    }, complete)
  }

  static async post($app, api, body = {}, complete = null) {
    return this.__ajaxList($app, {
      url: this.appConfig.api.base + '/' + api,
      data: body,
      method: 'POST'
    }, complete)
  }

  static async put($app, api, body = {}, complete = null) {
    return this.__ajaxList($app, {
      url: this.appConfig.api.base + '/' + api,
      data: body,
      method: 'PUT'
    }, complete)
  }

  static async del($app, api, body = {}, complete = null) {
    return this.__ajaxList($app, {
      url: this.appConfig.api.base + '/' + api,
      data: body,
      method: 'DELETE'
    }, complete)
  }
}
