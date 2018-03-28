import wepy from 'wepy';
import wxStorage from './wxStorage';
import * as config from '../config.js';
import * as wxNotice from './wxNotice';
import * as wxHttp from './wxHttp';

export async function getSetting() {
  return await wepy.getSetting();
}

export async function auth(scope) {
  try {
    const res = await getSetting();
    f(!res.authSetting['scope.' + scope]) {
      wepy.authorize({
        scope: 'scope.' + scope
      }).then(resolve).catch(reject)
    } else {
      resolve(res);
    }
  } catch (err) {
    
  }

  // return new Promise((resolve, reject) => {
  //   try {
  //     var res = await getSetting();

  //   } catch (err) {

  //   }
  //   getSetting().then((res) => {
  //     if (!res.authSetting['scope.' + scope]) {
  //       wepy.authorize({
  //         scope: 'scope.' + scope
  //       }).then(resolve).catch(reject)
  //     } else {
  //       resolve(res);
  //     }
  //   }).catch(reject)
  // });
}

export function getUserInfo() {}

export function login() {

  return new Promise((resolve, reject) => {
    wepy.login({
      success(res) {
        console.log(res);
        if (res.code) {
          wxHttp.get(null, 'login', {
            code: res.code
          }).then((res) => {

            console.log(res);
          }).catch(reject);
        }
      },
      fail() {
        wxNotice.$alert.info('登录失败');
      }
    });
  });
}
