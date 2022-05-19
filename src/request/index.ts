import axios from './axiosConfig';

function hash(params: any) {
  return JSON.stringify(params);
}

function window_it(f: any, time = 50) {
  let w: any = {};
  let flag = false;
  
  return (params: any) => {
    return new Promise((resolve, reject) => {
      // 以请求url和参数拼接成的字符串作为key缓存起来
      if (!w[hash(params)]) {
        w[hash(params)] = {
          func: f,
          args: {...params},
          resolvers: [],
          rejecters: [],
        };
      }
      if (!flag) {
        flag = true; // 开启标记，防止重复调用
        // time时间内的相同请求只发起一次http请求
        // 然后遍历相同时间内的所有resolvers，将请求结果resolve回去
        setTimeout(() => {
          Object.keys(w).forEach((key) => {
            const { func, args, resolvers, rejecters } = w[key];
            func(args)
              .then((response: any) => {
                resolvers.forEach((r: any) => {
                  r(response);
                });
              })
              .catch((e: any) => {
                rejecters.forEach((r: any) => {
                  r(e);
                });
              })
              .finally(() => {
                // 无论请求成功还是失败，完成后重置状态
                flag = false;
                w = {};
              });
          });
        }, time);
      }

      // 将同一时间窗口内所有相同的请求的resolve都存到缓存对象相应的resolvers上
      w[hash(params)].resolvers.push(resolve);
      w[hash(params)].rejecters.push(reject);
    });
  };
}

const request = window_it(axios, 50);

export default request;
