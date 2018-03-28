import md5 from 'blueimp-md5';

export const app = {
  key: 'zs',
  name: 'ezhuo',
  description: 'hello app',
  year: 2018
};

export const host = 'http://localhost:8090/api/weixin/v1';
// export const host = 'https://wxapp.thunf.cn';

export const api = {
  host: 'http://localhost:8090/api/weixin/v1',
  base: host,
  upload: '/api/file/upload',
  down: '/uploads/',
  canton: 'canton/selectselectselect' // 获取区域的默认URL
};

// 下面的地址配合云端 Demo 工作
export const service = {
  // 列表接口 GET
  list: `bookmall/list`,

  // 筛选页接口 GET
  tags: `bookmall/tags`,

  // 假装有收藏接口 POST
  collect: `bookmall/list`,

  // 主域
  host
}

/**
 *区域设置
 */
export const canton = {
  id: null, // 默认区域ID
  fdn: null, // 默认区域
  name: null
};

/**
 *默认定义
 */
export const define = {

  // 用户默认图片
  user_images: 'assets/images/default/no-user.png',

  // 默认用户的图片
  user_cut_images: 'assets/images/user/default_user.png',

  // table page size
  table_page_size: 10

};

/**
 *路由配置
 */
export const router = {
  home: '/app/dashboard',
  login: '/passport/login'
};

/**
 *HTTP配置
 */
export const http = {
  // 数据包发送格式，10是明文 11是密文
  style: 10,

  // 请求验证代码
  check: 'ezhuo@20161016'
};

export const httpCode = {
  200: '',
  201: '',
  202: '',
  204: '',
  203: '',
  205: '',

  400: '',
  401: '',
  403: '',
  404: '在服务器端，没有找到该请求服务！',
  406: '重要：',
  410: '',
  411: '',
  412: '',
  422: '验证：',
  500: '服务器端异常！'
};

export const setRequestHeader = function ($data, $token = null) {
  let headers = {}
  let rData = $data || {}
  rData = JSON.stringify(rData)
  console.log($data)
  try {
    // 数据发送类型
    headers.style = http.style || '10';
    // token
    headers.token = $token || '' // 用户TOKEN
    // check
    // let md5_src = headers.style + headers.token + JSON.stringify(rData) + _app_options.define_config.REQUEST_CHECK_CODE;
    let md5Src = headers.style + headers.token + rData + http.check;
    // check
    headers.validate = md5(md5Src)
    // console.log(md5_src, headers.validate);
    // console.log(rData);
  } catch (e) {
    console.error(e)
  }
  return headers
}
