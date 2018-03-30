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
