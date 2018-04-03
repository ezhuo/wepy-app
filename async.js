function fetchUser() {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/superman66')
      .then((data) => {
        resolve(data.json());
      }, (error) => {
        reject(error);
      })
  });
}

async function getUserByAsync() {
  let user = await fetchUser();
  return user;
}
getUserByAsync().then(v => console.log(v));


async function e() {
  throw new Error('error');
}
e().then(v => console.log(v))
  .catch(e => console.log(e));


const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
async function f() {
  await delay(1000);
  await delay(2000);
  await delay(3000);
  return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'

let a;
async function f() {
  try {
    await Promise.reject('error');
  } catch (err) {
    console.error(err);
  }
  a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));


class test {
  static a() {
    return 'test';
  }

  constructor() {
    console.log('test-----------');
  }
}

class test2 extends test {
  constructor() {
    super();
    console.log('test2-----------');
  }
  static b() {
    console.log('b');
    return this.a();
  }
}



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

 function isString(obj) {
  return isTypeCheck(isString.name, obj);
}

 function $json(item) {
  let str = {
    type: Object.prototype.toString.call(item)
  }
  try {
    str = JSON.stringify(item)
  } catch (e) {
    str.error = (e && e.stack) || ''
  }
  return isString(str) ? str : $json(str)
}