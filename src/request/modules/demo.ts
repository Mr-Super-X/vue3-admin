import request from '../index';
/**
 * 模块接口示例，默认情况下只需要在创建方法时进行配置即可
 * 如需动态传参，需提供options参数以覆盖默认配置，config所有参数与axios保持一致
 */

const modulePath = '/demo';

// 示例
export function demoPost<T>(options?: T) {
  const config = {
    url: modulePath + '/demoPost',
    method: 'post',
    data: {}, // post请求传data
    ...options,
  }
  return request(config);
}

export function demoGet<T>(options?: T) {
  const config = {
    url: modulePath + '/demoGet',
    method: 'get',
    params: {}, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...options,
  }
  return request(config);
}

// 获取订单列表
export function getOrderList<T>(options?: T) {
  const config = {
    url: 'http://localhost:8080/test/test.json',
    method: 'get',
    ...options,
  }
  return request(config);
}

// 创建订单
export function makeOrder<T>(options?: T) {
  const config = {
    url: 'http://localhost:8080/test/test.json',
    method: 'post',
    data: {
      a: 'test',
    },
    ...options,
  }
  return request(config);
}
