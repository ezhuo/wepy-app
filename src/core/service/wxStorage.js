const wxStorage = {
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

export default wxStorage;
