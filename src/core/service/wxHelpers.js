export const $alert = {
  alert(op) {
    return wx.showModal(op);
  },
  info(content, title = '温馨提示') {
    return this.alert({
      title,
      content,
      showCancel: false
    });
  },
  confirm(content, title = '询问？') {
    return new Promise((resolve, reject) => {
      return this.alert({
        title,
        content,
        showCancel: true,
        confirmText: '好的',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            return resolve(res);
          } else if (res.cancel) {
            return reject(res);
          }
        },
        fail(res) {
          return reject(res);
        }
      });
    });
  }
}

export const $notice = {
  notice(op) {
    return wx.showToast(Object.assign(op, {
      duration: 2000
    }));
  },
  info(title) {
    return this.notice({
      title,
      icon: 'none'
    })
  },
  ok(title = '操作成功') {
    return this.notice({
      title,
      icon: 'success'
    })
  },
  load(title = '加载中') {
    return wx.showLoading({
      title
    })
  },
  loadAutoHide(title = '加载中') {
    return this.notice({
      title,
      icon: 'loading'
    })
  },
  clear() {
    wx.hideToast();
    wx.hideLoading();
  },
  clearLoad() {
    wx.hideLoading();
  }
}

export const wxStorage = {
  set(k, v) {
    return wx.setStorage({
      key: k,
      data: v
    });
  },

  get(k) {
    return new Promise((resolve, reject) => {
      return wx.getStorage({
        key: k,
        success(res) {
          return resolve(res.data);
        },
        fail(res) {
          return reject(res);
        }
      });
    });
  },

  getSync(k) {
    return wx.getStorageSync(k);
  },

  remove(k) {
    return new Promise((resolve, reject) => {
      return wx.removeStorage({
        key: k,
        success(res) {
          return resolve(res.data);
        },
        fail(res) {
          return reject(res);
        }
      });
    });
  },

  removeSync(k) {
    try {
      wx.removeStorageSync(k)
    } catch (e) {
      // Do something when catch error
    }
  },

  clear() {
    wx.clearStorage()
  }
}
