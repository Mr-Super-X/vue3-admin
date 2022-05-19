import request from '../index';
/* 
  模块接口示例，默认情况下只需要配置即可，如果需要动态传参，则提供params参数以覆盖默认配置，
  params所有参数与axios保持一致
 */

const modulePath = '/order';

// 示例
export function demo<T>(params?: T) {
  const options = {
    url: modulePath + '/demo',
    method: 'post',
    data: {},
    ...params,
  }
  return request(options);
}

// 获取订单列表
export function getOrderList<T>(params?: T) {
  const options = {
    url: 'http://localhost:8080/test/test.json',
    method: 'get',
    ...params,
  }
  return request(options);
}

// 创建订单
export function makeOrder<T>(params?: T) {
  const options = {
    url: 'http://localhost:8080/test/test.json',
    method: 'post',
    data: {
      a: 'test',
    },
    ...params,
  }
  return request(options);
}
