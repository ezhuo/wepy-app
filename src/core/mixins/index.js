import wepy from 'wepy';
import wxStorage from '../data/wxStorage';
import * as helpers from '../../core/helpers.js';
import * as WxApi from '../data/wxApi.js';
import * as wxNotice from '../data/wxNotice.js';
import * as wxHttp from '../data/wxHttp.js';

export default class IndexMixin extends wepy.mixin {
  $storage = wxStorage;

  $notice = wxNotice.$notice;

  $alert = wxNotice.$alert;

  helpers = (function () {
    return helpers
  })(this);

  wxApi = (function () {
    return WxApi
  })(this);

  $http(method, api, body = {}, complete = null) {
    return wxHttp.http(this, method, api, body, complete);
  }

  $httpGet(api, body = {}, complete = null) {
    return wxHttp.get(this, api, body, complete);
  }

  $httpPost(api, body = {}, complete = null) {
    return wxHttp.post(this, api, body, complete);
  }

  $httpPut(api, body = {}, complete = null) {
    return wxHttp.put(this, api, body, complete);
  }

  $httpDelete(api, body = {}, complete = null) {
    return wxHttp.del(this, api, body, complete);
  }
}
