import wepy from 'wepy';
import wxStorage from '../wxService/wxStorage';
import * as WxService from '../wxService/wxService.js';
import * as wxNotice from '../wxService/wxNotice.js';
import * as helpers from '../../core/helpers.js';
import * as wxHttp from '../wxService/wxHttp.js';
import $Auth from '../data/auth.js';

export default class IndexMixin extends wepy.mixin {
  data = {
    httpLoading: false
  }

  $storage = wxStorage;

  $notice = wxNotice.$notice;

  $alert = wxNotice.$alert;

  $auth = (() => {
    return new $Auth(this)
  })(this);

  helpers = (() => {
    return helpers
  })(this);

  wxService = WxService;

  async $http(method, api, body = {}, complete = null) {
    return wxHttp.http(this, method, api, body, complete);
  }

  async $httpGet(api, body = {}, complete = null) {
    return wxHttp.get(this, api, body, complete);
  }

  async $httpPost(api, body = {}, complete = null) {
    return wxHttp.post(this, api, body, complete);
  }

  async $httpPut(api, body = {}, complete = null) {
    return wxHttp.put(this, api, body, complete);
  }

  async $httpDelete(api, body = {}, complete = null) {
    return wxHttp.del(this, api, body, complete);
  }
}
