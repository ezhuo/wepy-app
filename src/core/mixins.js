import wepy from 'wepy';
import http from './http.js';
import wxService from './service/wxService.js';

import caseCart from './data/cart';

export default class IndexMixin extends wepy.mixin {
  data = {
    httpLoading: false
  }
  wxService = wxService;

  $storage = http.$storage;
  $notice = http.$notice;
  $alert = http.$alert;
  $auth = http.$auth;
  helpers = http.helpers;
  appConfig = http.appConfig;
  caseCart = caseCart;

  http = {
    async http(method, api, body = {}, complete = null) {
      return http.http(this, method, api, body, complete);
    },
    async get(api, body = {}, complete = null) {
      return http.get(this, api, body, complete);
    },
    async post(api, body = {}, complete = null) {
      return http.post(this, api, body, complete);
    },
    async put(api, body = {}, complete = null) {
      return http.put(this, api, body, complete);
    },
    async delete(api, body = {}, complete = null) {
      return http.del(this, api, body, complete);
    }
  }
}
