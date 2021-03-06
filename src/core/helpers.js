/**
 * 判断类型
 * @param {*} o
 */
const typeCheck = function (o) {
  const s = Object.prototype.toString.call(o);
  return s
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase()
    .trim();
};

const isTypeCheck = function (typeName, obj) {
  return (
    typeName
    .toLowerCase()
    .slice(2)
    .trim() === typeCheck(obj)
  );
};

export function isNull(obj) {
  return isTypeCheck(isNull.name, obj);
}

export function isUndefined(obj) {
  return isTypeCheck(isUndefined.name, obj);
}

export function isDefined(obj) {
  return !isUndefined(obj);
}

export function isObject(obj) {
  return isTypeCheck(isObject.name, obj);
}

export function isArray(obj) {
  return isTypeCheck(isArray.name, obj);
}

export function isString(obj) {
  return isTypeCheck(isString.name, obj);
}

export function isNumber(obj) {
  return isTypeCheck(isNumber.name, obj);
}

export function isBoolean(obj) {
  return isTypeCheck(isBoolean.name, obj);
}

export function isFunction(obj) {
  return isTypeCheck(isFunction.name, obj);
}

export function isRegExp(obj) {
  return isTypeCheck(isRegExp.name, obj);
}

export function IsEmpty(obj) {
  if (obj == null || obj === undefined) return true;

  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  if (isArray(obj)) {
    return obj.length === 0;
  }

  return !Boolean(obj);
}

/**
 * [功能方法]
 * @param  {[type]}  item [description]
 * @return {Boolean}      [description]
 */
export function isPhone(str) {
  return /^1\d{10}$/.test(str)
}

export function noop() {
  return null;
}

export function hasOwn(obj, type) {
  return Object.prototype.hasOwnProperty.call(obj, type);
}

export function getNow() {
  return timestampToDate(new Date().getTime(),'Y-M-D h:m:s');
}

export function ifString(item, defaultStr) {
  if (isString(item)) return item.trim();
  if (isNumber(item)) return `${item}`.trim();
  return defaultStr || '';
}

export function ifNumber(item, defaultNum) {
  var matches = ifString(item).match(/\d+/);
  return isNumber(matches && +matches[0]) ? +matches[0] : defaultNum;
}

export function ifArray(item, defaultArr) {
  return isArray(item) ? item : (defaultArr || []);
}

export function ifObject(item, defaultObj) {
  return isObject(item) ? item : (defaultObj || {});
}

export function ifFunction(item) {
  return isFunction(item) ? item : noop;
}

/**
 * [JSON方法]
 * @param  {[type]}  item [description]
 * @return {Boolean}      [description]
 */
export function parseString(item) {
  if (item == null || item === undefined) {
    return item;
  }
  let str = {
    type: Object.prototype.toString.call(item)
  }
  try {
    str = JSON.stringify(item)
  } catch (e) {
    str.error = (e && e.stack) || ''
  }
  return isString(str) ? str : parseString(str)
}

export function parseJson(item) {
  if (item == null || item === undefined) {
    return item;
  }
  let obj = {
    type: Object.prototype.toString.call(item)
  }
  try {
    obj = JSON.parse(item)
  } catch (e) {
    obj.error = (e && e.stack) || ''
  }
  return isObject(obj) ? obj : parseJson(obj)
}

export function jsonToUrl(obj) {
  let result = ''
  if (obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result += '&' + prop + '=' + obj[prop]
      }
    }
  }
  return result
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const timestampToDate = (number, format) => {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number); // 此处，要是传过来的时间戳 是秒 ，则要*1000，如果是毫秒，则不用
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
