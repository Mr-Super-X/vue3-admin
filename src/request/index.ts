/**
 * 请求封装：基于promise的时间窗口架构
 * 在一定时间内参数相同的请求无论发起多少次，最终只会发起一次请求
 * 并将该次请求的结果返回给对应的方法
 */

// 使用示例如下：
// 默认情况下只需要在创建方法时进行配置即可
// 如需动态传参，需提供options参数以覆盖默认配置，config所有参数与axios保持一致
/* export function demoPost<T>(options?: T) {
  const config = {
    url: '/demoPost',
    method: 'post',
    data: {}, // post请求传data
    ...options,
  };
  return request(config);
}

export function demoGet<T>(options?: T) {
  const config = {
    url: '/demoGet',
    method: 'get',
    params: {}, // get请求传params，参数会拼在url后面
    ...options,
  };
  return request(config);
} */
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
          axios: f,
          args: { ...params },
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
            // 获取请求方法、请求参数、resolvers、rejecters
            const { axios, args, resolvers, rejecters } = w[key];
            // 发起请求，传入的参数会跟axiosConfig合并
            axios(args)
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

      // 将时间窗口内所有相同请求的resolve、reject都存到对应位置
      w[hash(params)].resolvers.push(resolve);
      w[hash(params)].rejecters.push(reject);
    });
  };
}

const request = window_it(axios, 50);

export default request;
