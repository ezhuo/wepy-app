/* ========================================================
                        小程序配置文件
======================================================== */

// 域名
const host = 'http://127.0.0.1:3091';
// const host = 'https://wxapp.thunf.cn';

// 下面的地址配合云端 Demo 工作
export const service = {
  // 主域
  host,

  // 列表接口 GET
  list: `${host}/bookmall/list`,

  // 筛选页接口 GET
  tags: `${host}/bookmall/tags`,

  // 假装有收藏接口 POST
  collect: `${host}/bookmall/list`
};

export default {
  service
};
